import ThirdSpecialty from '../models/ThirdSpecialty';

const createSpecialty = async (req: any, res: any) => {
  const {
    name
  } = req.body;

  const specialtyFound = await ThirdSpecialty.findOne({ where: { name } });

  if (specialtyFound) {
    return res.status(400).json({ message: 'El nombre de la especialidad ya existe!' });
  }

  try {
    const newSpecialty = await ThirdSpecialty.create({
      name
    });

    // const specialty = await ThirdSpecialty.findByPk(newSpecialty.dataValues.id);

    res.status(201).json(newSpecialty);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
};

const getSpecialtyById = async (req: any, res: any) => {
  const { specialtyId } = req.params;

  const specialty = await ThirdSpecialty.findByPk(specialtyId);

  if (!specialty) {
    return res.status(400).json({ message: 'La especialidad no existe!' });
  }

  res.status(200).json(specialty);
};

const getSpecialtys = async (req: any, res: any) => {

  const specialtys = await ThirdSpecialty.findAll();

  if (!specialtys) {
    return res.status(400).json({ message: 'No existen especialidades' });
  }

  return res.status(200).json(specialtys);
};

const updateSpecialtyById = async (req: any, res: any) => {
  const { specialtyId } = req.params;

  const specialtyFound = await ThirdSpecialty.findByPk(
    specialtyId
  );

  if (!specialtyFound) {
    return res.status(400).json({ message: 'La especialidad no existe en la base de datos.' });
  }

  await ThirdSpecialty.update(req.body, {
    where: { id: specialtyId }
  });

  res.status(200).json(specialtyFound);
};

const deleteSpecialtyById = async (req: any, res: any) => {
  const { specialtyId } = req.params;

  const specialtyFound = await ThirdSpecialty.findByPk(
    specialtyId
  );

  if (!specialtyFound) {
    return res.status(400).json({ message: 'La especialidad no existe en la base de datos.' });
  }

  await ThirdSpecialty.destroy({
    where: {
      id: specialtyId
    }
  });

  // code 200 is ok too
  res.status(204).json();
};

export {
  createSpecialty,
  getSpecialtyById,
  getSpecialtys,
  updateSpecialtyById,
  deleteSpecialtyById
};
