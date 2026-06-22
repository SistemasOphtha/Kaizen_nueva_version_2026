import ThirdClassification from '../models/ThirdClassification';

const createClassification = async (req: any, res: any) => {
  const {
    name
  } = req.body;

  const classificationFound = await ThirdClassification.findOne({ where: { name } });

  if (classificationFound) {
    return res.status(400).json({ message: 'El nombre de la clasificación ya existe!' });
  }

  try {
    const newClassification = await ThirdClassification.create({
      name
    });

    // const classification = await ThirdClassification.findByPk(newClassification.dataValues.id);

    res.status(201).json(newClassification);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
};

const getClassificationById = async (req: any, res: any) => {
  const { classificationId } = req.params;

  const classification = await ThirdClassification.findByPk(classificationId);

  if (!classification) {
    return res.status(400).json({ message: 'La clasificación no existe!' });
  }

  res.status(200).json(classification);
};

const getClassifications = async (req: any, res: any) => {

  const classifications = await ThirdClassification.findAll();

  if (!classifications) {
    return res.status(400).json({ message: 'No existen clasificationes' });
  }

  return res.status(200).json(classifications);
};

const updateClassificationById = async (req: any, res: any) => {
  const { classificationId } = req.params;

  const classificationFound = await ThirdClassification.findByPk(
    classificationId
  );

  if (!classificationFound) {
    return res.status(400).json({ message: 'La clasificación no existe en la base de datos.' });
  }

  await ThirdClassification.update(req.body, {
    where: { id: classificationId }
  });

  res.status(200).json(classificationFound);
};

const deleteClassificationById = async (req: any, res: any) => {
  const { classificationId } = req.params;

  const classificationFound = await ThirdClassification.findByPk(
    classificationId
  );

  if (!classificationFound) {
    return res.status(400).json({ message: 'La clasificación no existe en la base de datos.' });
  }

  await ThirdClassification.destroy({
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
