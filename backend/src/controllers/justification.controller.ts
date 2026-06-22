import Justification from '../models/Justification';
import Third from '../models/Third';
import User from '../models/User';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const createJustification = async (req: any, res: any) => {
  const {
    thirdId,
    userId,
    description,
  } = req.body;

  const today = new Date();
  const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
  const todayString = today.toISOString();
  const lastMonthString = lastMonth.toISOString();

  try {

    const searchPortfolio = await Portfolio.findOne({
      where: {
        userId
      }
    });

    if (req.rol !== 'Administrador') {
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

      if (searchThirdPortfolio.dataValues.approved === false) {
        return res.status(400).json({ message: 'El tercero no está aprobado' });
      }
    } else {
      const thirdExists = await Third.findByPk(thirdId);
      if (!thirdExists) {
        return res.status(400).json({ message: 'El tercero no existe' });
      }

      const userExists = await User.findByPk(userId);
      if (!userExists) {
        return res.status(400).json({ message: 'El usuario no existe' });
      }
    }

    const newJustification = await Justification.create({
      thirdId,
      userId,
      date: todayString,
      dateToJustify: lastMonthString,
      description
    });

    if (!newJustification) {
      return res.status(400).json({ message: 'No se pudo crear la justificación' });
    }

    // const justification = await Justification.findByPk(newJustification.dataValues.id);

    res.status(201).json(newJustification);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
};

const getJustificationById = async (req: any, res: any) => {
  const { justificationId } = req.params;
  const userId = req.userId;
  const rol = req.rol;

  try {
    const justification = await Justification.findOne({
      where: {
        id: justificationId
      },
      include: [
        {
          model: User,
          required: true
        }
      ]
    });

    if (!justification) {
      return res.status(400).json({ message: 'La justificación no existe' });
    }

    if (rol === 'Administrador') {
      return res.status(200).json(justification);
    }

    if (rol === 'Coordinador') {
      if (justification.userId === userId || justification.user.coordinatorId === userId) {
        return res.status(200).json(justification);
      }
    }

    if (justification.userId === userId) {
      return res.status(200).json(justification);
    }

    return res.status(403).json({ message: 'No tiene permisos para ver esta justificación' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getJustifications = async (req: any, res: any) => {
  const userId = req.userId;
  const rol = req.rol;

  if (rol === 'Administrador' || rol === 'Coordinador') {
    let userWhereClause = {};
    if (rol === 'Coordinador') {
      userWhereClause = { coordinatorId: userId };
    }

    const justifications = await Justification.findAll(
      {
        include: [
          {
            model: Third,
            required: true
          },
          {
            model: User,
            required: true,
            where: userWhereClause
          }
        ]
      }
    );

    if (!justifications) {
      return res.status(400).json({ message: 'No existen justificaciones' });
    }

    return res.status(200).json(justifications);

  } else {
    
    const justifications = await Justification.findAll(
      {
        include: [
          {
            model: Third,
            required: true
          },
          {
            model: User,
            required: true
          }
        ],
        where: {
          userId
        }
      }
    );

    if (!justifications) {
      return res.status(400).json({ message: 'No existen justificaciones' });
    }

    return res.status(200).json(justifications);
  }
};

const updateJustificationById = async (req: any, res: any) => {
  const { justificationId } = req.params;

  const justificationFound = await Justification.findByPk(
    justificationId
  );

  if (!justificationFound) {
    return res.status(400).json({ message: 'La justificación no existe' });
  }

  await Justification.update(req.body, {
    where: { id: justificationId },
    fields: ['description']
  });

  const justificationUpdated = await Justification.findByPk(
    justificationId
  );

  res.status(200).json(justificationUpdated);
};

const deleteJustificationById = async (req: any, res: any) => {
  const { justificationId } = req.params;

  const justificationFound = await Justification.findByPk(
    justificationId
  );

  if (!justificationFound) {
    return res.status(400).json({ message: 'La justificación no existe' });
  }

  await Justification.destroy({
    where: {
      id: justificationId
    }
  });

  // code 200 is ok too
  res.status(204).json();
};

export {
  createJustification,
  getJustificationById,
  getJustifications,
  updateJustificationById,
  deleteJustificationById
};
