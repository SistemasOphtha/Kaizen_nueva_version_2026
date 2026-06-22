import Sequelize from 'sequelize';
import Workplan from '../models/Workplan';
import CalendarEvent from '../models/CalendarEvent';
import User from '../models/User';
import Region from '../models/Region';
import TypeEvent from '../models/TypeEvent';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const hasTimeComponent = (value) => {
  if (!value) {
    return false;
  }

  if (value instanceof Date) {
    return value.getUTCHours() !== 0 || value.getUTCMinutes() !== 0 || value.getUTCSeconds() !== 0;
  }

  if (typeof value === 'string') {
    return value.includes(':');
  }

  return false;
};

const createWorkplan = async (req: any, res: any) => {
  const {
    userId,
    typeEventId,
    startDate,
    endDate,
    description,
  } = req.body;

  try {

    if (!userId || !typeEventId || !startDate || !endDate || !description) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    const newWorkplan = await Workplan.create({
      userId,
      typeEventId,
      startDate,
      endDate,
      description,
    });

    if (!newWorkplan) {
      return res.status(400).json({ message: 'No se pudo crear el plan de trabajo' });
    }

    const isAllDayEvent = !(hasTimeComponent(startDate) || hasTimeComponent(endDate));

    const newCalendarEvent = await CalendarEvent.create({
      id: generateUUID(),
      title: description.lenght > 20 ? description.substring(0, 20) + '...' : description,
      allDay: false, //Se va a dejar predeterminado en false para que tome la fecha fin (isAllDayEvent)
      start: startDate,
      end: endDate,
      extendedProps: {
        desc: description,
        label: 2,
        component: {
          id: newWorkplan.dataValues.id,
          type: 'workplans',
          route: '/dashboards/workplans/' + newWorkplan.dataValues.id,
        }
      }
    });

    if (!newCalendarEvent) {
      console.log('No se pudo crear el evento en el calendario');
    }

    // const workplan = await Workplan.findByPk(newWorkplan.dataValues.id);

    res.status(201).json(newWorkplan);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
};

const getWorkplanById = async (req: any, res: any) => {
  const { workplanId } = req.params;
  const userId = req.userId;
  const rol = req.rol;

  try {
    const workplan = await Workplan.findOne({
      where: {
        id: workplanId
      },
      include: [
        {
          model: User,
          required: true
        }
      ]
    });

    if (!workplan) {
      return res.status(400).json({ message: 'El plan de trabajo no existe' });
    }

    if (rol === 'Administrador') {
      return res.status(200).json(workplan);
    }

    if (rol === 'Coordinador') {
      if (workplan.userId === userId || workplan.user.coordinatorId === userId) {
        return res.status(200).json(workplan);
      }
    }

    if (workplan.userId === userId) {
      return res.status(200).json(workplan);
    }

    return res.status(403).json({ message: 'No tiene permisos para ver este plan de trabajo' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getWorkplans = async (req: any, res: any) => {
  const userId = req.userId;
  const rol = req.rol;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const filter = req.query.filter;

  let region = 0;
  let user_id = 0;

  if (filter && filter != '') {
    let decodedString = Buffer.from(filter, 'base64').toString('utf8');
    let filters = JSON.parse(decodedString);
    console.log({ filters });

    if (filters.region) {
      region = filters.region;
    }

    if (filters.user) {
      user_id = filters.user;
    }
  }

  if (rol === 'Administrador' || rol === 'Coordinador') {
    let userWhereClause: any = region ? { regionId: region } : {};
    
    if (rol === 'Coordinador') {
      const teamReps = await User.findAll({
        where: { coordinatorId: userId },
        attributes: ['id']
      });
      const teamRepIds = [userId, ...teamReps.map((r: any) => r.id)];

      if (user_id) {
        if (!teamRepIds.includes(Number(user_id))) {
          user_id = -1;
        }
      }
      
      userWhereClause = {
        ...userWhereClause,
        id: { [Sequelize.Op.in]: teamRepIds }
      };
    }

    const workplans = await Workplan.findAll(
      {
        include: [
          {
            model: User,
            required: true,
            where: userWhereClause,
            include: [
              {
                model: Region,
                required: false
              }
            ]
          },
          {
            model: TypeEvent,
            required: true
          }
        ],
        where: {
          startDate: {
            [Sequelize.Op.gte]: startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          },
          endDate: {
            [Sequelize.Op.lte]: endDate || new Date()
          },
          ...user_id ? { userId: user_id } : {}
        }
      }
    );

    if (!workplans) {
      return res.status(400).json({ message: 'No existen planes de trabajo' });
    }

    console.log(workplans);
    

    const mappedWorkplans = workplans.map(workplan => {
      workplan.dataValues['typeEvent'] = workplan.dataValues.type_event;
      delete workplan.dataValues.type_event;
      return workplan;
    });

    return res.status(200).json(mappedWorkplans);
  } else {

    const workplans = await Workplan.findAll(
      {
        include: [
          {
            model: User,
            required: true
          },
          {
            model: TypeEvent,
            required: true
          }
        ],
        where: {
          userId,
          startDate: {
            [Sequelize.Op.gte]: startDate || new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          },
          endDate: {
            [Sequelize.Op.lte]: endDate || new Date()
          }
        }
      }
    );

    if (!workplans) {
      return res.status(400).json({ message: 'No existen planes de trabajo' });
    }

    const mappedWorkplans = workplans.map(workplan => {
      workplan.eventType = workplan.type_event;
      delete workplan.type_event;
      return workplan;
    });

    return res.status(200).json(mappedWorkplans);
  }
};

const updateWorkplanById = async (req: any, res: any) => {
  const { workplanId } = req.params;

  const workplanFound = await Workplan.findByPk(
    workplanId
  );

  const { typeEventId, startDate, endDate, description } = req.body;

  if (!typeEventId || !startDate || !endDate || !description) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  if (!workplanFound) {
    return res.status(400).json({ message: 'El plan de trabajo no existe' });
  }

  await Workplan.update(req.body, {
    where: { id: workplanId },
    fields: ['startDate', 'endDate', 'description', 'typeEventId']
  });

  res.status(200).json(workplanFound);
};

const deleteWorkplanById = async (req: any, res: any) => {
  const { workplanId } = req.params;

  const workplanFound = await Workplan.findByPk(
    workplanId
  );

  if (!workplanFound) {
    return res.status(400).json({ message: 'El plan de trabajo no existe' });
  }

  await CalendarEvent.destroy({
    where: Sequelize.and(
      Sequelize.where(
        Sequelize.literal(`JSON_EXTRACT(extendedProps, '$.component.id')`),
        '=',
        workplanId
      ),
      Sequelize.where(
        Sequelize.literal(`JSON_EXTRACT(extendedProps, '$.component.type')`),
        '=',
        'workplans'
      )
    )
  });

  await Workplan.destroy({
    where: {
      id: workplanId
    }
  });

  // code 200 is ok too
  res.status(204).json();
};

export {
  createWorkplan,
  getWorkplanById,
  getWorkplans,
  updateWorkplanById,
  deleteWorkplanById
};
