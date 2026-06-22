import Sequelize, { Op } from 'sequelize';
import CalendarLabel from '../models/CalendarLabel';
import CalendarEvent from '../models/CalendarEvent';
import Third from '../models/Third';
import Visit from '../models/Visit';
import Workplan from '../models/Workplan';
import User from '../models/User';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';

const getManagedUserIds = async (userId: number, rol: string): Promise<number[]> => {
  if (rol === "Administrador") {
    return [];
  }
  if (rol === "Coordinador") {
    const reps = await User.findAll({
      where: { coordinatorId: userId },
      attributes: ['id']
    });
    return [userId, ...reps.map(r => r.id)];
  }
  return [userId];
};

const createLabel = async (req: any, res: any) => {
  try {
    const {
      title,
      color,
      type
    } = req.body;

    const newLabel = await CalendarLabel.create({
      title,
      color,
      type
    });

    return res.status(200).json(newLabel);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
  }
};

const getLabels = async (req: any, res: any) => {
  const labels = await CalendarLabel.findAll();
  return res.json(labels);
};

const updateLabelById = async (req: any, res: any) => {
  const { labelId } = req.params;

  const labelFound = await CalendarLabel.findByPk(labelId);

  if (!labelFound) {
    return res
      .status(400)
      .json({ message: "El elemento no existe" });
  }

  await CalendarLabel.update(req.body, {
    where: { id: labelId },
    fields: [
      "title",
      "color",
    ],
  });

  res.status(200).json(labelFound);
};

const deleteLabelCustomById = async (req: any, res: any) => {
  const { labelId } = req.params;

  const labelFound = await CalendarLabel.findByPk(labelId);

  if (!labelFound) {
    return res
      .status(400)
      .json({ message: "Elemento no encontrado" });
  }

  if (labelFound.type === "system") {
    return res
      .status(400)
      .json({ message: "No se puede eliminar un elemento del sistema" });
  }

  await CalendarLabel.destroy({
    where: {
      id: labelId
    },
  });

  // code 200 is ok too
  res.status(204).json();
};

const createEvent = async (req: any, res: any) => {
  try {
    const {
      title,
      color,
      type
    } = req.body;

    const newLabel = await CalendarLabel.create({
      title,
      color,
      type
    });

    return res.status(200).json(newLabel);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.errors);
  }
};

const getEvents = async (req: any, res: any) => {
  const userId = req.userId;
  const rol = req.rol;

  try {
    const userIds = await getManagedUserIds(userId, rol);
    const events: any[] = [];

    // 1. Fetch Visits
    const visitsWhere: any = {};
    if (rol !== 'Administrador') {
      visitsWhere.userId = { [Op.in]: userIds };
    }
    const visits = await Visit.findAll({
      where: visitsWhere,
      include: [{ model: Third, attributes: ['name', 'additionalName'] }]
    });

    visits.forEach((v: any) => {
      const thirdName = v.third ? `${v.third.name} ${v.third.additionalName || ''}` : '';
      const titleSource = v.objective || thirdName || 'Visita';
      const title = titleSource.length > 20 ? `${titleSource.substring(0, 20)}...` : titleSource;
      events.push({
        id: `visit-${v.id}`,
        title: `📌 ${title}`,
        allDay: true,
        start: v.date,
        end: v.date,
        extendedProps: {
          desc: v.objective || '',
          label: 1,
          component: {
            id: v.id,
            type: 'visits',
            route: `/apps/visits/${v.id}`
          }
        }
      });
    });

    // 2. Fetch Workplans
    const workplansWhere: any = {};
    if (rol !== 'Administrador') {
      workplansWhere.userId = { [Op.in]: userIds };
    }
    const workplans = await Workplan.findAll({
      where: workplansWhere
    });

    workplans.forEach((w: any) => {
      const titleSource = w.description || 'Plan';
      const title = titleSource.length > 20 ? `${titleSource.substring(0, 20)}...` : titleSource;
      events.push({
        id: `workplan-${w.id}`,
        title: `🗓️ ${title}`,
        allDay: false,
        start: w.startDate,
        end: w.endDate,
        extendedProps: {
          desc: w.description || '',
          label: 2,
          component: {
            id: w.id,
            type: 'workplans',
            route: `/dashboards/workplans/${w.id}`
          }
        }
      });
    });

    // 3. Fetch Birthdays based on portfolios
    let thirdsWhere: any = {};
    if (rol !== 'Administrador') {
      const portfolios = await Portfolio.findAll({
        where: { userId: { [Op.in]: userIds } }
      });
      const pIds = portfolios.map(p => p.id);
      
      thirdsWhere = {
        [Op.and]: [
          Sequelize.where(Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "thirds_portfolios" AS tp
            WHERE tp."thirdId" = "third"."id"
            AND tp."portfolioId" IN (${pIds.length > 0 ? pIds.join(',') : '0'})
            AND tp.approved = true
          )`), '>', 0)
        ]
      };
    } else {
      thirdsWhere = {
        [Op.and]: [
          Sequelize.where(Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "thirds_portfolios" AS tp
            WHERE tp."thirdId" = "third"."id"
            AND tp.approved = true
          )`), '>', 0)
        ]
      };
    }

    const thirds = await Third.findAll({
      where: thirdsWhere,
      attributes: ['id', 'name', 'additionalName', 'birthday']
    });

    const currentYear = new Date().getFullYear();
    thirds.forEach((t: any) => {
      if (t.birthday) {
        const bdate = new Date(t.birthday);
        const nameText = `${t.name} ${t.additionalName || ''}`.trim();
        events.push({
          id: `third-birthday-${t.id}`,
          title: `🎂 Cumpleaños: ${nameText}`,
          start: new Date(currentYear, bdate.getMonth(), bdate.getDate(), 6, 0, 0),
          end: new Date(currentYear, bdate.getMonth(), bdate.getDate(), 18, 0, 0),
          allDay: true,
          extendedProps: {
            desc: `Cumpleaños de ${nameText}`,
            label: 3,
            component: {
              id: t.id,
              type: 'thirds',
              route: `/records/thirds/${t.id}`
            }
          }
        });
      }
    });

    return res.json(events);
  } catch (error: any) {
    console.error('Error fetching calendar events:', error);
    return res.status(500).json({ message: 'Error al obtener eventos del calendario', error: error.message });
  }
};

// const getThirdById = async (req: any, res: any) => {
//   const { thirdId } = req.params;
//   const third = await Third.findByPk(thirdId,{
//     include: [
//       {
//         model: ThirdType,
//         attributes: [ 
//           "id",
//           "name",
//         ],
//       },
//       {
//         model: ThirdClassification,
//         attributes: [ 
//           "id",
//           "name",
//         ],
//       },
//       {
//         model: ThirdSpecialty,
//         attributes: [ 
//           "id",
//           "name",
//         ],
//       },
//       {
//         model: ThirdSubSpecialty,
//         attributes: [ 
//           "id",
//           "name",
//         ],
//       },
//       {
//         model: Region,
//         attributes: [ 
//           "id",
//           "name",
//         ],
//       }
//     ],
//   });

//   if (!third) {
//     return res.json({ message: "El tercero no existe" });
//   }

//   return res.json({
//     third: third,
//   });
// };

// const updateThirdById = async (req: any, res: any) => {
//   const { thirdId } = req.params;

//   const thirdFound = await Third.findByPk(thirdId);

//   if (!thirdFound) {
//     return res
//       .status(400)
//       .json({ message: "El tercero que desea actualizar no existe" });
//   }

//   await Third.update(req.body, {
//     where: { id: thirdId },
//     fields: [
//       "identification",
//       "name",
//       "address",
//       "phone",
//       "email",
//       "mobile",
//       "city",
//       "birhtday",
//       "typeId",
//       "classificationId",
//       "specialtyId",
//       "subSpecialtyId",
//       "regionId",
//     ],
//   });

//   res.status(200).json({
//     third: {
//       ...req.body,
//       id: thirdFound.id,
//     },
//   });
// };

// const deleteThirdById = async (req: any, res: any) => {
//   const { thirdId } = req.params;

//   const thirdFound = await Third.findOne({
//     where: {
//       id: thirdId,
//     },
//   });

//   if (!thirdFound) {
//     return res
//       .status(400)
//       .json({ message: "El tercero que desea eliminar no existe" });
//   }

//   await Third.destroy({
//     where: {
//       id: thirdId,
//     },
//   });

//   // code 200 is ok too
//   res.status(204).json();
// };


export {
  createLabel,
  getLabels,
  updateLabelById,
  deleteLabelCustomById,
  getEvents
};
