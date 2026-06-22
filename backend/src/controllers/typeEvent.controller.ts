import TypeEvent from '../models/TypeEvent';

const createTypeEvent = async (req: any, res: any) => {
  const {
    name
  } = req.body;

  const typeEventFound = await TypeEvent.findOne({ where: { name } });

  if (typeEventFound) {
    return res.status(400).json({ message: 'El nombre del tipo de evento ya existe!' });
  }

  try {
    const newTypeEvent = await TypeEvent.create({
      name
    });

    // const typeEvent = await TypeEvent.findByPk(newTypeEvent.dataValues.id);

    res.status(201).json(newTypeEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
};

const getTypeEventById = async (req: any, res: any) => {
  const { typeEventId } = req.params;

  const typeEvent = await TypeEvent.findByPk(typeEventId);

  if (!typeEvent) {
    return res.status(400).json({ message: 'El tipo de evento no existe!' });
  }

  res.status(200).json(typeEvent);
};

const getTypeEvents = async (req: any, res: any) => {

  const typeEvents = await TypeEvent.findAll();

  if (!typeEvents) {
    return res.status(400).json({ message: 'No existen tipos de eventos' });
  }

  return res.status(200).json(typeEvents);
};

const updateTypeEventById = async (req: any, res: any) => {
  const { typeEventId } = req.params;

  const typeEventFound = await TypeEvent.findByPk(
    typeEventId
  );

  if (!typeEventFound) {
    return res.status(400).json({ message: 'El tipo de evento no existe en la base de datos.' });
  }

  await TypeEvent.update(req.body, {
    where: { id: typeEventId }
  });

  res.status(200).json(typeEventFound);
};

const deleteTypeEventById = async (req: any, res: any) => {
  const { typeEventId } = req.params;

  const typeEventFound = await TypeEvent.findByPk(
    typeEventId
  );

  if (!typeEventFound) {
    return res.status(400).json({ message: 'El tipo de evento no existe en la base de datos.' });
  }

  await TypeEvent.destroy({
    where: {
      id: typeEventId
    }
  });

  // code 200 is ok too
  res.status(204).json();
};

export {
  createTypeEvent,
  getTypeEventById,
  getTypeEvents  ,
  updateTypeEventById,
  deleteTypeEventById
};
