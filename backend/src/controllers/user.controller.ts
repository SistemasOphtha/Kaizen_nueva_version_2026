import User from '../models/User';
import UserClassification from '../models/UserClassification';
import Region from '../models/Region';
import Portfolio from '../models/Portfolio';
import Visit from '../models/Visit';
import Workplan from '../models/Workplan';
import Justification from '../models/Justification';
import { sendEmail } from '../libs/sendEmail';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import Third from '../models/Third';
import portfolioService from '../services/portfolio.service';
import SessionLog from '../models/SessionLog';
import { Op } from 'sequelize';

const generatePassword = () => {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  let retVal = '';
  for (let i = 0; i < 8; i++) {
    retVal += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  return retVal;
};

const createUser = async (req: any, res: any) => {
  try {
    const { email, firstName, lastName, phone, mobile, classificationId, category, regionId, status, coordinatorId, permissions } = req.body;
    const { userId } = req;

    let password = generatePassword();

    const userFound = await User.findOne({
      where: {
        email: email
      }
    });

    if (userFound) {
      return res.status(400).json({ message: 'El correo ya existe!' });
    }

    const newUser = await User.create(
      {
        firstName,
        lastName,
        email,
        password: await User.prototype.encryptPassword(password),
        phone,
        mobile,
        category,
        classificationId,
        regionId,
        status,
        coordinatorId,
        permissions
      }
    )

    //const token = User.prototype.generateAuthToken(newUser.id);

    sendEmail(
      email,
      '!Bienvenid(a) a Kaizen!',
      `<div>
          <h2>Bienvenido(a)</h2>
          <p>¡Hola ${firstName} ${lastName}!</p>
          
          <p>Te damos la bienvenida a la plataforma. Aquí están tus credenciales de inicio de sesión:</p>
          
          <ul>
              <li><strong>Usuario:</strong> ${email}</li>
              <li><strong>Contraseña:</strong> ${password}</li>
          </ul>
          
          <p>Por favor, mantén tus credenciales seguras y no las compartas con nadie.</p>
          
          <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar al administrador.</p>
                    
          <p>Saludos,</p>
          <p>El equipo de Ophtha</p>
      </div>
        `);

    return res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
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
      return res.status(400).json({ message: 'El correo al que intentas restablecer no existe!' });
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

    return res.status(200).json({ message: '¡Contraseña reestablecida exitosamente!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
  }
};

const changePassword = async (req: any, res: any) => {
  try {
    const { email, password, newPassword, newPasswordConfirm } = req.body;

    const userFound = await User.findOne({
      where: {
        email: email
      }
    });

    if (!userFound) {
      return res.status(400).json({ message: 'El correo no existe!' });
    }

    const isMatch = await User.prototype.comparePassword(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'La contraseña actual no coincide!' });
    }

    if (newPassword !== newPasswordConfirm) {
      return res.status(400).json({ message: 'Las contraseñas no coinciden!' });
    }

    let passwordN = newPassword;

    await User.update({
      password: await User.prototype.encryptPassword(passwordN)
    }, {
      where: { id: userFound.id }
    });

    sendEmail(
      email,
      '¡Contraseña modificada exitosamente!',
      `<h1>¡Contraseña modificada exitosamente!</h1>
      <p>Estos son tus nuevos datos de acceso:</p>
      <p><strong>Usuario:</strong> ${email}</p>
      <p><strong>Contraseña:</strong> ${password}</p>
      `);

    return res.status(200).json({ message: '¡Contraseña modificada exitosamente!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
  }
};

const getUsers = async (req: any, res: any) => {
  const rol = req.rol;
  const userId = req.userId;

  let whereClause = {};
  if (rol === 'Coordinador') {
    whereClause = { coordinatorId: userId };
  }

  const users = await User.findAll({
    where: whereClause,
    attributes: { exclude: ['password'] },
    include: [
      {
        model: UserClassification
      },
      {
        model: Region
      }
    ]
  });

  return res.json(users);
};

const getUser = async (req: any, res: any) => {
  const { userId } = req.params;
  const loggedInUserRole = req.rol;
  const loggedInUserId = req.userId;

  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: UserClassification
      },
      {
        model: Region
      },
      {
        model: Portfolio,
        include: [
          {
            model: ThirdsPortfolio,
            include: [
              {
                model: Third,
                attributes: ['id', 'typeIdentification', 'identification', 'name', 'additionalName', 'email', 'impact', 'status']
              }
            ]
          }
        ]
      }
    ]
  });

  if (!user) {
    return res.json({ message: 'El usuario no existe!' });
  }

  if (loggedInUserRole === 'Coordinador' && user.coordinatorId !== loggedInUserId && user.id !== loggedInUserId) {
    return res.status(403).json({ message: 'No tiene permisos para ver este usuario' });
  }

  return res.json(user);
};

const updateUserById = async (req: any, res: any) => {
  const { userId } = req.params;
  let isChangeEmail = false;
  const userFound = await User.findByPk(
    userId
  );

  if (!userFound) {
    return res.status(400).json({ message: 'El usuario que desea actualizar no existe' });
  }

  if (userFound.email !== req.body.email) {
    const userFoundEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userFoundEmail) {
      return res.status(400).json({ message: 'El correo ya existe!' });
    }
  }

  if (isChangeEmail) {
    const { email, firstName, lastName } = req.body;
    sendEmail(
      email,
      'Cambio de correo electrónico',
      `<div>
          <h2>Notificación</h2>
          <p>¡Hola ${firstName} ${lastName}!</p>
          
          <p>Se ha cambiado exitosamente el correo electrónico a esta cuenta</p>
          
          <ul>
              <li><strong>Usuario:</strong> ${email}</li>
              <li><strong>Contraseña:</strong> ******** </li>
          </ul>
          
          <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactar al administrador.</p>
                    
          <p>Saludos,</p>
          <p>El equipo de Ophtha</p>
      </div>
        `);
  }

  await User.update(req.body, {
    where: { id: userId },
    fields: ['firstName', 'lastName', 'email', 'phone', 'mobile', 'category', 'classificationId', 'regionId', 'status', 'coordinatorId', 'permissions']
  });

  //const token = User.prototype.generateAuthToken(userFound.id);
  //const refreshToken  = User.prototype.generateAuthTokenRefresh(userFound.id);

  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: UserClassification
      },
      {
        model: Region
      }
    ]
  });

  res.status(200).json(user);
};

const deleteUserById = async (req: any, res: any) => {
  const { userId } = req.params;

  const userFound = await User.findOne({
    where: {
      id: userId
    }
  });

  if (!userFound) {
    return res.json({ message: 'El usuario que desea eliminar no existe' });
  }

  const searchPortfolio = await Portfolio.findOne({
    where: {
      userId
    }
  });

  if (searchPortfolio) {
    return res.status(400).json({ type: "root", message: 'El usuario tiene un portafolio asociado' });
  }

  const searchVisit = await Visit.findOne({
    where: {
      userId
    }
  });

  if (searchVisit) {
    return res.status(400).json({ message: 'El usuario tiene una visita asociada' });
  }

  const searchWorkplan = await Workplan.findOne({
    where: {
      userId
    }
  });

  if (searchWorkplan) {
    return res.status(400).json({ message: 'El usuario tiene un plan de trabajo asociado' });
  }

  const searchJustification = await Justification.findOne({
    where: {
      userId
    }
  });

  if (searchJustification) {
    return res.status(400).json({ message: 'El usuario tiene una justificación asociada' });
  }

  await User.destroy({
    where: {
      id: userId
    }
  });

  // code 200 is ok too
  res.status(204).json();
};

const deleteUsersBulk = async (req: any, res: any) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar una lista de IDs para eliminar' });
    }

    const uniqueIds = [...new Set(ids.map((id) => Number(id)))].filter((id) => Number.isInteger(id));

    if (uniqueIds.length === 0) {
      return res.status(400).json({ message: 'Los IDs proporcionados no son válidos' });
    }

    const result = {
      deleted: [],
      failed: []
    };

    for (const id of uniqueIds) {
      const userFound = await User.findOne({
        where: { id }
      });

      if (!userFound) {
        result.failed.push({ id, reason: 'NOT_FOUND' });
        continue;
      }

      const searchPortfolio = await Portfolio.findOne({ where: { userId: id } });
      if (searchPortfolio) {
        result.failed.push({ id, reason: 'HAS_PORTFOLIO' });
        continue;
      }

      const searchVisit = await Visit.findOne({ where: { userId: id } });
      if (searchVisit) {
        result.failed.push({ id, reason: 'HAS_VISITS' });
        continue;
      }

      const searchWorkplan = await Workplan.findOne({ where: { userId: id } });
      if (searchWorkplan) {
        result.failed.push({ id, reason: 'HAS_WORKPLANS' });
        continue;
      }

      const searchJustification = await Justification.findOne({ where: { userId: id } });
      if (searchJustification) {
        result.failed.push({ id, reason: 'HAS_JUSTIFICATIONS' });
        continue;
      }

      await User.destroy({
        where: { id }
      });

      result.deleted.push(id);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error al eliminar múltiples usuarios', error);
    return res.status(500).json({ message: 'Error al eliminar los usuarios seleccionados' });
  }
};

const approveThird = async (req: any, res: any) => {
  const { userId, thirdId } = req.params;
  
  const userFound = await User.findByPk(userId);

  if (!userFound) {
    return res.status(400).json({ message: 'El usuario no existe!' });
  }

  if (req.rol === 'Coordinador' && userFound.coordinatorId !== req.userId) {
    return res.status(403).json({ message: 'No tiene permisos sobre este representante' });
  }

  const thirdFound = await Third.findByPk(thirdId);

  if (!thirdFound) {
    return res.status(400).json({ message: 'El tercero no existe!' });
  }

  const searchPortfolio = await Portfolio.findOne({
    where: {
      userId
    }
  });

  if (!searchPortfolio) {
    return res.status(400).json({ message: 'El usuario no tiene un portafolio asociado' });
  }

  const searchThirdPortfolio = await ThirdsPortfolio.findOne({
    where: {
      portfolioId: searchPortfolio.id,
      thirdId
    }
  });

  if (!searchThirdPortfolio) {
    return res.status(400).json({ message: 'El tercero no está asociado al usuario' });
  }

  await ThirdsPortfolio.update({
    approved: true
  }, {
    where: {
      portfolioId: searchPortfolio.id,
      thirdId
    }
  });

  res.status(200).json({ message: '¡Tercero aprobado exitosamente!' });

};

const approveThirdsBulk = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const { thirdIds } = req.body;

    const userFound = await User.findByPk(userId);
    if (!userFound) {
      return res.status(400).json({ message: 'El usuario no existe!' });
    }
    if (req.rol === 'Coordinador' && userFound.coordinatorId !== req.userId) {
      return res.status(403).json({ message: 'No tiene permisos sobre este representante' });
    }

    if (!Array.isArray(thirdIds) || thirdIds.length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar una lista de IDs de terceros para aprobar' });
    }

    const uniqueIds = [...new Set(thirdIds.map((id) => Number(id)))].filter((id) => Number.isInteger(id));

    if (uniqueIds.length === 0) {
      return res.status(400).json({ message: 'Los IDs proporcionados no son válidos' });
    }

    const result = {
      updated: [],
      failed: []
    };

    for (const thirdId of uniqueIds) {
      try {
        const updated = await portfolioService.updateThirdApprovalStatus(thirdId, Number(userId), true);
        if (updated) {
          result.updated.push(thirdId);
        } else {
          result.failed.push({ id: thirdId, reason: 'NOT_FOUND' });
        }
      } catch (error) {
        result.failed.push({ id: thirdId, reason: error.message || 'ERROR' });
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error al aprobar múltiples terceros del portafolio', error);
    return res.status(500).json({ message: 'Error al aprobar los terceros seleccionados' });
  }
};

const desapproveThirdsBulk = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const { thirdIds } = req.body;

    const userFound = await User.findByPk(userId);
    if (!userFound) {
      return res.status(400).json({ message: 'El usuario no existe!' });
    }
    if (req.rol === 'Coordinador' && userFound.coordinatorId !== req.userId) {
      return res.status(403).json({ message: 'No tiene permisos sobre este representante' });
    }

    if (!Array.isArray(thirdIds) || thirdIds.length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar una lista de IDs de terceros para desaprobar' });
    }

    const uniqueIds = [...new Set(thirdIds.map((id) => Number(id)))].filter((id) => Number.isInteger(id));

    if (uniqueIds.length === 0) {
      return res.status(400).json({ message: 'Los IDs proporcionados no son válidos' });
    }

    const result = {
      updated: [],
      failed: []
    };

    for (const thirdId of uniqueIds) {
      try {
        const updated = await portfolioService.updateThirdApprovalStatus(thirdId, Number(userId), false);
        if (updated) {
          result.updated.push(thirdId);
        } else {
          result.failed.push({ id: thirdId, reason: 'NOT_FOUND' });
        }
      } catch (error) {
        result.failed.push({ id: thirdId, reason: error.message || 'ERROR' });
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error al desaprobar múltiples terceros del portafolio', error);
    return res.status(500).json({ message: 'Error al desaprobar los terceros seleccionados' });
  }
};

const desapproveThird = async (req: any, res: any) => {
  const { userId, thirdId } = req.params;
  
  const userFound = await User.findByPk(userId);

  if (!userFound) {
    return res.status(400).json({ message: 'El usuario no existe!' });
  }

  if (req.rol === 'Coordinador' && userFound.coordinatorId !== req.userId) {
    return res.status(403).json({ message: 'No tiene permisos sobre este representante' });
  }

  const thirdFound = await Third.findByPk(thirdId);

  if (!thirdFound) {
    return res.status(400).json({ message: 'El panel no existe!' });
  }

  const searchPortfolio = await Portfolio.findOne({
    where: {
      userId
    }
  });

  if (!searchPortfolio) {
    return res.status(400).json({ message: 'El usuario no tiene un portafolio asociado' });
  }

  const searchThirdPortfolio = await ThirdsPortfolio.findOne({
    where: {
      portfolioId: searchPortfolio.id,
      thirdId
    }
  });

  if (!searchThirdPortfolio) {
    return res.status(400).json({ message: 'El tercero no está asociado al usuario' });
  }

  await ThirdsPortfolio.update({
    approved: false
  }, {
    where: {
      portfolioId: searchPortfolio.id,
      thirdId
    }
  });

  res.status(200).json({ message: '¡Tercero aprobado exitosamente!' });

};

const getSessionLogs = async (req: any, res: any) => {
  try {
    const { userId, startDate, endDate } = req.query;
    const whereClause: any = {};

    if (userId) {
      whereClause.userId = Number(userId);
    } else if (req.rol === 'Coordinador') {
      const team = await User.findAll({
        where: { coordinatorId: req.userId },
        attributes: ['id']
      });
      const teamIds = team.map((t: any) => t.id);
      teamIds.push(req.userId);
      whereClause.userId = { [Op.in]: teamIds };
    }

    if (startDate || endDate) {
      whereClause.loginTime = {};
      if (startDate) {
        whereClause.loginTime[Op.gte] = new Date(startDate as string);
      }
      if (endDate) {
        const end = new Date(endDate as string);
        end.setHours(23, 59, 59, 999);
        whereClause.loginTime[Op.lte] = end;
      }
    }

    const logs = await SessionLog.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      order: [['loginTime', 'DESC']]
    });

    return res.status(200).json(logs);
  } catch (error) {
    console.error('Error al obtener logs de sesión:', error);
    return res.status(500).json({ message: 'Error interno al obtener los logs de sesión' });
  }
};

export {
  createUser,
  getUsers,
  getUser,
  updateUserById,
  deleteUserById,
  deleteUsersBulk,
  restorePassword,
  changePassword,
  approveThird,
  desapproveThird,
  approveThirdsBulk,
  desapproveThirdsBulk,
  getSessionLogs
};
