import UserClassification from '../models/UserClassification';

const createClassification = async (req: any, res: any) => {
  const {
    name,
    status
  } = req.body;

  const classificationFound = await UserClassification.findOne({ where: { name } });

  if (classificationFound) {
    return res.status(400).json({ message: 'El nombre de la clasificación ya existe!' });
  }

  try {
    const newClassification = await UserClassification.create({
      name,
      status
    });

    // const classification = await UserClassification.findByPk(newClassification.dataValues.id);

    res.status(201).json(newClassification);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
};

const getClassificationById = async (req: any, res: any) => {
  const { classificationId } = req.params;

  const classification = await UserClassification.findByPk(classificationId);

  if (!classification) {
    return res.json({ message: 'La clasificación no existe!' });
  }

  res.status(200).json(classification);
};

const getClassifications = async (req: any, res: any) => {

  const classifications = await UserClassification.findAll();

  if (!classifications) {
    return res.json({ message: 'No existen clasificationes' });
  }

  return res.json(classifications);
};

const updateClassificationById = async (req: any, res: any) => {
  const { classificationId } = req.params;

  const classificationFound = await UserClassification.findByPk(
    classificationId
  );

  if (!classificationFound) {
    return res.json({ message: 'La clasificación no existe en la base de datos.' });
  }

  await UserClassification.update(req.body, {
    where: { id: classificationId }
  });

  const classification = await UserClassification.findByPk(classificationId);

  res.status(200).json(classification);
};

const deleteClassificationById = async (req: any, res: any) => {
  const { classificationId } = req.params;

  const classificationFound = await UserClassification.findByPk(
    classificationId
  );

  if (!classificationFound) {
    return res.json({ message: 'La clasificación no existe en la base de datos.' });
  }

  await UserClassification.destroy({
    where: {
      id: classificationId
    }
  });

  // code 200 is ok too
  res.status(204).json();
};

export {
  createClassification,
  getClassificationById,
  getClassifications  ,
  updateClassificationById,
  deleteClassificationById
};
