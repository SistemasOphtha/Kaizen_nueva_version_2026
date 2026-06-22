import ThirdSubSpecialty from '../models/ThirdSubSpecialty';

const createSubSpecialty = async (req: any, res: any) => {
  const {
    name
  } = req.body;

  const subSpecialtyFound = await ThirdSubSpecialty.findOne({ where: { name } });

  if (subSpecialtyFound) {
    return res.status(400).json({ message: 'El nombre de la subespecialidad ya existe!' });
  }

  try {
    const newSubSpecialty = await ThirdSubSpecialty.create({
      name
    });

    // const subSpecialty = await ThirdSubSpecialty.findByPk(newSubSpecialty.dataValues.id);

    res.status(201).json(newSubSpecialty);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
};

const getSubSpecialtyById = async (req: any, res: any) => {
  const { subSpecialtyId } = req.params;

  const subSpecialty = await ThirdSubSpecialty.findByPk(subSpecialtyId);

  if (!subSpecialty) {
    return res.status(400).json({ message: 'La subespecialidad no existe!' });
  }

  res.status(200).json(subSpecialty);
};

const getSubSpecialtys = async (req: any, res: any) => {

  const subSpecialtys = await ThirdSubSpecialty.findAll();

  if (!subSpecialtys) {
    return res.status(400).json({ message: 'No existen subespecialidades' });
  }

  return res.status(200).json(subSpecialtys);
};

const updateSubSpecialtyById = async (req: any, res: any) => {
  const { subSpecialtyId } = req.params;

  const subSpecialtyFound = await ThirdSubSpecialty.findByPk(
    subSpecialtyId
  );

  if (!subSpecialtyFound) {
    return res.status(400).json({ message: 'La subespecialidad no existe en la base de datos.' });
  }

  await ThirdSubSpecialty.update(req.body, {
    where: { id: subSpecialtyId }
  });

  res.status(200).json(subSpecialtyFound);
};

const deleteSubSpecialtyById = async (req: any, res: any) => {
  const { subSpecialtyId } = req.params;

  const subSpecialtyFound = await ThirdSubSpecialty.findByPk(
    subSpecialtyId
  );

  if (!subSpecialtyFound) {
    return res.status(400).json({ message: 'La subespecialidad no existe en la base de datos.' });
  }

  await ThirdSubSpecialty.destroy({
    where: {
      id: subSpecialtyId
    }
  });

  // code 200 is ok too
  res.status(204).json();
};

export {
  createSubSpecialty,
  getSubSpecialtyById,
  getSubSpecialtys  ,
  updateSubSpecialtyById,
  deleteSubSpecialtyById
};
