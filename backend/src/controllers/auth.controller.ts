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

  const { email, password } = req.body;

  try {
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
      return res.json({
        require2FA: true,
        userId: userFound.id
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
      twoFactorSecret: null
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

    if (!userFound || !userFound.twoFactorSecret) {
      return res.status(400).json({ message: 'El usuario no tiene 2FA configurado' });
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
  loginVerify2FA
};
