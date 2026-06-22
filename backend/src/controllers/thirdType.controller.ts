import ThirdType from '../models/ThirdType';

const createType = async (req: any, res: any) => {
  const {
    name
  } = req.body;

  const typeFound = await ThirdType.findOne({ where: { name } });

  if (typeFound) {
    return res.status(400).json({ message: 'El nombre del tipo de tercero ya existe!' });
  }

  try {
    const newType = await ThirdType.create({
      name
    });

    // const type = await ThirdType.findByPk(newType.dataValues.id);

    res.status(201).json(newType);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
};

const getTypeById = async (req: any, res: any) => {
  const { typeId } = req.params;

  const type = await ThirdType.findByPk(typeId);

  if (!type) {
    return res.status(400).json({ message: 'El tipo de tercero no existe!' });
  }

  res.status(200).json(type);
};

const getTypes = async (req: any, res: any) => {

  const types = await ThirdType.findAll();

  if (!types) {
    return res.status(400).json({ message: 'No existen los tipos de terceros' });
  }

  return res.status(200).json(types);
};

const updateTypeById = async (req: any, res: any) => {
  const { typeId } = req.params;

  const typeFound = await ThirdType.findByPk(
    typeId
  );

  if (!typeFound) {
    return res.status(400).json({ message: 'El tipo de tercero no existe en la base de datos.' });
  }

  await ThirdType.update(req.body, {
    where: { id: typeId }
  });

  res.status(200).json(typeFound);
};

const deleteTypeById = async (req: any, res: any) => {
  const { typeId } = req.params;

  const typeFound = await ThirdType.findByPk(
    typeId
  );

  if (!typeFound) {
    return res.status(400).json({ message: 'El tipo de tercero no existe en la base de datos.' });
  }

  await ThirdType.destroy({
    where: {
      id: typeId
    }
  });

  // code 200 is ok too
  res.status(204).json();
};

export {
  createType,
  getTypeById,
  getTypes  ,
  updateTypeById,
  deleteTypeById
};
