import User from '../models/User';
import UserClassification from '../models/UserClassification';
import Region from '../models/Region';
import { sendEmail } from '../libs/sendEmail';
import SessionLog from '../models/SessionLog';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import logger from '../utils/logger';


const signupHandler = async (req: any, res: any) => {
  const { email, password, firstName, lastName, phone, mobile, classificationId, regionId, status } = req.body;

  try {

    // Crea un nuevo usuario
    const newUser = await User.create(
      {
        firstName,
        lastName,
        email,
        password: await User.prototype.encryptPassword(password),
        phone,
        mobile,
        classificationId,
        regionId,
        status
      }
    );
    // Create a token
    const token = User.prototype.generateAuthToken(newUser);

    return res.status(200).json({ user: newUser, access_token: token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const signinHandler = async (req: any, res: any) => {

  const { email, password, recaptchaToken } = req.body;

  try {
    // Verificar Captcha si la clave secreta está configurada
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && recaptchaSecret.trim() !== '') {
      if (!recaptchaToken) {
        return res.status(200).json({
          error: [{
            type: "email",
            message: "Por favor complete la verificación de seguridad (Captcha)."
          }]
        });
      }

      const verifySuccess = await new Promise<boolean>((resolve) => {
        const query = `secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(recaptchaToken)}`;
        const https = require('https');
        const reqPost = https.request({
          hostname: 'www.google.com',
          port: 443,
          path: '/recaptcha/api/siteverify',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(query)
          }
        }, (resPost: any) => {
          let data = '';
          resPost.on('data', (chunk: any) => { data += chunk; });
          resPost.on('end', () => {
            try {
              const result = JSON.parse(data);
              resolve(!!result.success);
            } catch (e) {
              logger.error('Error parsing recaptcha response', e);
              resolve(false);
            }
          });
        });
        reqPost.on('error', (err: any) => {
          logger.error('Recaptcha request error', err);
          resolve(false);
        });
        reqPost.write(query);
        reqPost.end();
      });

      if (!verifySuccess) {
        return res.status(200).json({
          error: [{
            type: "email",
            message: "Captcha incorrecto o expirado. Por favor intente nuevamente."
          }]
        });
      }
    } else {
      logger.warn('Google reCAPTCHA v2 verification bypassed: RECAPTCHA_SECRET_KEY is not configured in .env.');
    }
    // Request body email can be an email or username

    const userFound = await User.findOne(
      {
        where: {
          email
        },
        include: [
          {
            model: UserClassification
          },
          {
            model: Region
          }
        ]
      });
      console.log({userFound});
    if (!userFound) return res.status(200).json(
      {
        error: [{
          type: "email",
          message: "Usuario no encontrado!"
        }]
      }
    );

    if (userFound.status === 'inactive') {
      return res.status(200).json({
        error: [{
          type: "email",
          message: "Su cuenta se encuentra inactiva. Contacte al administrador."
        }]
      });
    }

    const matchPassword = await User.prototype.comparePassword(
      password,
      userFound.password
    );

    console.log(await User.prototype.encryptPassword(password))

    if (!matchPassword)
      return res.status(200).json({
        user: null,
        access_token: null,
        error: [{
          type: "password",
          message: "Contraseña invalida!"
        }]
      });

    // Interceptar si el doble factor de autenticación está habilitado
    if (userFound.twoFactorEnabled) {
      const method = userFound.twoFactorMethod || 'totp';
      if (method === 'email') {
        const emailCode = Math.floor(100000 + Math.random() * 900000).toString();
        await userFound.update({
          email2FactorCode: emailCode,
          email2FactorExpires: new Date(Date.now() + 10 * 60 * 1000)
        });
        sendEmail(
          userFound.email,
          'Código de verificación de dos factores (2FA)',
          `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #1e3a8a; text-align: center;">Código de verificación 2FA</h2>
            <p>Hola <strong>${userFound.firstName} ${userFound.lastName}</strong>,</p>
            <p>Tu código de seguridad Kaizen para iniciar sesión es:</p>
            <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #0f172a;">${emailCode}</span>
            </div>
            <p>Este código es de un solo uso y expira en <strong>10 minutos</strong>.</p>
            <p>Si no has solicitado este código, por favor contáctanos de inmediato.</p>
            <p>Saludos,<br>El equipo de Ophtha</p>
          </div>`
        );
      }
      return res.json({
        require2FA: true,
        userId: userFound.id,
        twoFactorMethod: method
      });
    }

    // Create a token
    const token = User.prototype.generateAuthToken(userFound);
    const refreshToken = User.prototype.generateAuthTokenRefresh(userFound);

    delete userFound.dataValues.password;

    // Log the sign in
    await SessionLog.create({
      userId: userFound.dataValues.id,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      loginTime: new Date(),
      details: { action: 'login' }
    });

    res.json(
      {
        user: {
          id: userFound.dataValues.id,
          uuid: "",
          role: userFound.dataValues.user_classification.name,
          from: "",
          data: {
            displayName: `${userFound.dataValues.firstName} ${userFound.dataValues.lastName}`,
            photoURL: "",
            email: userFound.dataValues.email,
            twoFactorEnabled: userFound.dataValues.twoFactorEnabled,
            twoFactorMethod: userFound.dataValues.twoFactorMethod || 'totp',
            shortcuts: typeof userFound.dataValues.shortcuts === "string" ? JSON.parse(userFound.dataValues.shortcuts) : userFound.dataValues.shortcuts
          }
        },
        access_token: token,
        refreshToken
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      {
        error: {
          type: "root",
          message: "Error interno del servidor! --> " + error.message
        }
      });
  }
};

const signinforTokenHandler = async (req: any, res: any) => {

  const { access_token } = req.body

  try {

    if (!access_token) return res.status(401).json({ message: "access_token is null" });

    const decoded = User.prototype.validateAuthToken(access_token);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const userFound = await User.findByPk(decoded.id, {
      include: [
        {
          model: UserClassification
        },
        {
          model: Region
        }
      ]
    }
    );

    if (!userFound) return res.status(400).json({ token: null, message: "User Not Found" });

    if (userFound.status === 'inactive') {
      return res.status(401).json({ message: "Su cuenta se encuentra inactiva. Contacte al administrador." });
    }

    // Log or restore the sign in session
    const activeLog = await SessionLog.findOne({
      where: { userId: userFound.dataValues.id, logoutTime: null },
      order: [['loginTime', 'DESC']]
    });
    if (!activeLog) {
      await SessionLog.create({
        userId: userFound.dataValues.id,
        ipAddress: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
        loginTime: new Date(),
        details: { action: 'token_login' }
      });
    }

    res.json(
      {
        user: {
          id: userFound.dataValues.id,
          uuid: "",
          role: userFound.dataValues.user_classification.name,
          from: "",
          data: {
            displayName: `${userFound.dataValues.firstName} ${userFound.dataValues.lastName}`,
            photoURL: "",
            email: userFound.dataValues.email,
            twoFactorEnabled: userFound.dataValues.twoFactorEnabled,
            twoFactorMethod: userFound.dataValues.twoFactorMethod || 'totp',
            shortcuts: typeof userFound.dataValues.shortcuts === "string" ? JSON.parse(userFound.dataValues.shortcuts) : userFound.dataValues.shortcuts
          }
        },
        access_token: access_token
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const refreshTokenHandler = async (req: any, res: any) => {

  const { access_token } = req.body

  try {

    if (!access_token) return res.status(401).json({ message: "RefreshToken is null" });


    const newToken = await User.prototype.refreshToken(
      access_token
    );
    console.log(newToken);
    if (newToken === null)
      return res.status(401).json({
        access_token: null,
        message: "Invalid Token",
      });

    const userFound = await User.findByPk(newToken.id);

    if (!userFound) return res.status(400).json({ token: null, message: "User Not Found" });

    const newRefreshToken = await User.prototype.generateAuthTokenRefresh(userFound)

    res.json(
      {
        user: {
          role: [userFound.dataValues.user_classification.name],
          data: {
            displayName: `${userFound.dataValues.firstName} ${userFound.dataValues.lastName}`,
            email: userFound.dataValues.email,
            shortcuts: typeof userFound.dataValues.shortcuts === "string" ? JSON.parse(userFound.dataValues.shortcuts) : userFound.dataValues.shortcuts
          }
        },
        access_token: newToken.token,
        refreshToken: newRefreshToken
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

const restorePassword = async (req: any, res: any) => {
  try {
    const { email } = req.body;

    const userFound = await User.findOne({
      where: {
        email: email
      }
    });

    if (!userFound) {
      return res.status(500).json(
        { 
          message: 'El correo al que intentas restablecer no existe!',
          error: [{
            type: 'email',
            message: 'El correo al que intentas restablecer no existe!'
          }]
        });
    }

    let password = generatePassword();

    await User.update({
      password: await User.prototype.encryptPassword(password)
    }, {
      where: { id: userFound.id }
    });

    sendEmail(
      email,
      '¡Contraseña restablecida!',
      `<div>
        <h2>Tu contraseña ha sido restablecida</h2>
        <p>¡Hola ${userFound.dataValues.firstName} ${userFound.dataValues.lastName}!</p>
        
        <p>Queremos informarte que tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.</p>

        <p>Estos son tus nuevos datos de acceso:</p>
        <ul>
            <li><strong>Usuario:</strong> ${email}</li>
            <li><strong>Contraseña:</strong> ${password}</li>
        </ul>
        
        <p>Si no has solicitado un restablecimiento de contraseña, por favor contáctanos inmediatamente.</p>
        
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
        
        <p>Saludos,</p>
        <p>El equipo de Ophtha</p>
      </div>
    `);

    return res.status(200).json({
      message: '¡Contraseña reestablecida exitosamente!'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
  }
};

const generatePassword = () => {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  let retVal = '';
  for (let i = 0; i < 8; i++) {
    retVal += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  return retVal;
};

const updateUser = async (req: any, res: any) => {
  const userId = req.userId;

  try {
    const userFound = await User.findByPk(userId);
    if (!userFound) return res.status(404).json({ message: "User not found" });

    const { user } = req.body;
    
    await userFound.update({
      shortcuts: user.data.shortcuts
    });

    return res.status(200).json(userFound);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
  }
}

const signoutHandler = async (req: any, res: any) => {
  const userId = req.userId;
  try {
    const latestLog = await SessionLog.findOne({
      where: {
        userId,
        logoutTime: null
      },
      order: [['loginTime', 'DESC']]
    });

    if (latestLog) {
      const now = new Date();
      const loginTime = new Date(latestLog.loginTime);
      const durationSeconds = Math.round((now.getTime() - loginTime.getTime()) / 1000);

      await latestLog.update({
        logoutTime: now,
        duration: durationSeconds,
        details: { ...latestLog.details, action: 'logout' }
      });
    }

    return res.status(200).json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor al cerrar sesión' });
  }
};

const setup2FA = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Generar un secreto TOTP
    const secret = speakeasy.generateSecret({
      name: `Kaizen Ophtha (${user.email})`
    });

    // Generar el código QR en base64
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url || '');

    // Retornar el secreto (en base32 para guardarlo temporalmente o mostrarlo) y la imagen QR
    return res.status(200).json({
      secret: secret.base32,
      qrCode: qrCodeUrl
    });
  } catch (error: any) {
    logger.error('Error al generar 2FA', error);
    return res.status(500).json({ message: 'Error al generar 2FA', error: error.message });
  }
};

const verify2FA = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { token, secret } = req.body;

    if (!token || !secret) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    // Validar el token usando el secreto proporcionado
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 1
    });

    if (!verified) {
      return res.status(400).json({ message: 'Código de verificación incorrecto' });
    }

    // Guardar el secreto en la base de datos y activar 2FA
    await User.update({
      twoFactorEnabled: true,
      twoFactorSecret: secret
    }, {
      where: { id: userId }
    });

    return res.status(200).json({ message: 'Doble factor de autenticación activado correctamente' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error al verificar 2FA', error: error.message });
  }
};

const disable2FA = async (req: any, res: any) => {
  try {
    const userId = req.userId;

    await User.update({
      twoFactorEnabled: false,
      twoFactorSecret: null,
      twoFactorMethod: 'totp',
      email2FactorCode: null,
      email2FactorExpires: null
    }, {
      where: { id: userId }
    });

    return res.status(200).json({ message: 'Doble factor de autenticación desactivado correctamente' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error al desactivar 2FA', error: error.message });
  }
};

const loginVerify2FA = async (req: any, res: any) => {
  const { userId, token } = req.body;

  if (!userId || !token) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const userFound = await User.findOne({
      where: { id: userId },
      include: [
        { model: UserClassification },
        { model: Region }
      ]
    });

    if (!userFound) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    if (userFound.status === 'inactive') {
      return res.status(200).json({
        error: [{
          type: "email",
          message: "Su cuenta se encuentra inactiva. Contacte al administrador."
        }]
      });
    }

    const method = userFound.twoFactorMethod || 'totp';

    if (method === 'email') {
      if (!userFound.email2FactorCode) {
        return res.status(200).json({
          error: [{
            type: "2fa",
            message: "No se ha generado ningún código para este usuario."
          }]
        });
      }

      const isExpired = !userFound.email2FactorExpires || new Date() > new Date(userFound.email2FactorExpires);
      const isMatch = userFound.email2FactorCode === token;

      if (!isMatch || isExpired) {
        return res.status(200).json({
          error: [{
            type: "2fa",
            message: isExpired ? "El código ha expirado!" : "Código de verificación incorrecto!"
          }]
        });
      }

      // Limpiar código
      await userFound.update({
        email2FactorCode: null,
        email2FactorExpires: null
      });
    } else {
      if (!userFound.twoFactorSecret) {
        return res.status(400).json({ message: 'El usuario no tiene 2FA por aplicación configurado' });
      }

      // Validar el token
      const verified = speakeasy.totp.verify({
        secret: userFound.twoFactorSecret,
        encoding: 'base32',
        token: token,
        window: 1
      });

      if (!verified) {
        return res.status(200).json({
          error: [{
            type: "2fa",
            message: "Código de verificación incorrecto!"
          }]
        });
      }
    }

    // Generar JWT
    const jwtToken = User.prototype.generateAuthToken(userFound);
    const refreshToken = User.prototype.generateAuthTokenRefresh(userFound);

    // Log the sign in
    await SessionLog.create({
      userId: userFound.dataValues.id,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      loginTime: new Date(),
      details: { action: 'login' }
    });

    return res.json({
      user: {
        id: userFound.dataValues.id,
        uuid: "",
        role: userFound.dataValues.user_classification.name,
        from: "",
        data: {
          displayName: `${userFound.dataValues.firstName} ${userFound.dataValues.lastName}`,
          photoURL: "",
          email: userFound.dataValues.email,
          twoFactorEnabled: userFound.dataValues.twoFactorEnabled,
          twoFactorMethod: userFound.dataValues.twoFactorMethod || 'totp',
          shortcuts: typeof userFound.dataValues.shortcuts === "string" ? JSON.parse(userFound.dataValues.shortcuts) : userFound.dataValues.shortcuts
        }
      },
      access_token: jwtToken,
      refreshToken
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

const setupEmail2FA = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const testCode = Math.floor(100000 + Math.random() * 900000).toString();

    await user.update({
      email2FactorCode: testCode,
      email2FactorExpires: new Date(Date.now() + 10 * 60 * 1000)
    });

    sendEmail(
      user.email,
      'Código de configuración de Doble Factor (2FA)',
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1e3a8a; text-align: center;">Configuración de 2FA por Correo</h2>
        <p>Hola <strong>${user.firstName} ${user.lastName}</strong>,</p>
        <p>Para activar el doble factor de autenticación por correo electrónico en tu cuenta, ingresa el siguiente código de confirmación:</p>
        <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #0f172a;">${testCode}</span>
        </div>
        <p>Este código expira en <strong>10 minutos</strong>.</p>
        <p>Si no has solicitado activar esta función, por favor ignora este correo.</p>
        <p>Saludos,<br>El equipo de Ophtha</p>
      </div>`
    );

    return res.status(200).json({ message: 'Código de confirmación enviado a su correo registrado.' });
  } catch (error: any) {
    logger.error('Error al generar setup de 2FA por correo', error);
    return res.status(500).json({ message: 'Error al generar setup de 2FA por correo', error: error.message });
  }
};

const verifyEmail2FA = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Falta el código de confirmación.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    if (!user.email2FactorCode) {
      return res.status(400).json({ message: 'No se ha solicitado configuración de 2FA por correo.' });
    }

    const isExpired = !user.email2FactorExpires || new Date() > new Date(user.email2FactorExpires);
    const isMatch = user.email2FactorCode === token;

    if (!isMatch || isExpired) {
      return res.status(400).json({ message: isExpired ? 'El código ha expirado. Solicite uno nuevo.' : 'El código de confirmación es incorrecto.' });
    }

    await user.update({
      twoFactorEnabled: true,
      twoFactorMethod: 'email',
      twoFactorSecret: null,
      email2FactorCode: null,
      email2FactorExpires: null
    });

    return res.status(200).json({ message: 'Doble factor de autenticación por correo activado correctamente.' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error al verificar 2FA por correo', error: error.message });
  }
};

export {
  signupHandler,
  signinHandler,
  signinforTokenHandler,
  refreshTokenHandler,
  restorePassword,
  updateUser,
  signoutHandler,
  setup2FA,
  verify2FA,
  disable2FA,
  loginVerify2FA,
  setupEmail2FA,
  verifyEmail2FA
};
