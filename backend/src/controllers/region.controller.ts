import Region from '../models/Region';

const createRegion = async (req: any, res: any) => {
  const {
    name
  } = req.body;

  const regionFound = await Region.findOne({ where: { name } });

  if (regionFound) {
    return res.status(400).json({ message: 'El nombre de la región ya existe!' });
  }

  try {
    const newRegion = await Region.create({
      name
    });

    // const region = await Region.findByPk(newRegion.dataValues.id);

    res.status(201).json(newRegion);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
};

const getRegionById = async (req: any, res: any) => {
  const { regionId } = req.params;

  const region = await Region.findByPk(regionId);

  if (!region) {
    return res.json({ message: 'La región no existe!' });
  }

  res.status(200).json(region);
};

const getRegions = async (req: any, res: any) => {

  const regions = await Region.findAll();

  if (!regions) {
    return res.status(400).json({ message: 'No existen regiones' });
  }

  return res.status(200).json(regions);
};

const updateRegionById = async (req: any, res: any) => {
  const { regionId } = req.params;

  const regionFound = await Region.findByPk(
    regionId
  );

  if (!regionFound) {
    return res.status(400).json({ message: 'La región no existe en la base de datos.' });
  }

  await Region.update(req.body, {
    where: { id: regionId }
  });

  res.status(200).json(regionFound);
};

const deleteRegionById = async (req: any, res: any) => {
  const { regionId } = req.params;

  const regionFound = await Region.findByPk(
    regionId
  );

  if (!regionFound) {
    return res.json({ message: 'La región no existe en la base de datos.' });
  }

  await Region.destroy({
    where: {
      id: regionId
    }
  });

  // code 200 is ok too
  res.status(204).json();
};

export {
  createRegion,
  getRegionById,
  getRegions  ,
  updateRegionById,
  deleteRegionById
};
