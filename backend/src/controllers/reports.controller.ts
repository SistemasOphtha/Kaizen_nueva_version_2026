import { Op } from 'sequelize';
import Third from '../models/Third';
import ThirdType from '../models/ThirdType';
import ThirdClassification from '../models/ThirdClassification';
import ThirdSpecialty from '../models/ThirdSpecialty';
import ThirdSubSpecialty from '../models/ThirdSubSpecialty';
import Region from '../models/Region';
import User from '../models/User';
import Visit from '../models/Visit';
import Justification from '../models/Justification';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import logger from '../utils/logger';

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

export const getCustomReport = async (req: any, res: any) => {
  const { module, startDate, endDate, regionId, userId: filterUserId } = req.body;
  const userId = req.userId;
  const rol = req.rol;

  try {
    const userIds = await getManagedUserIds(userId, rol);

    if (module === 'visits') {
      const where: any = {};
      if (startDate && endDate) {
        where.date = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }
      
      if (rol !== 'Administrador') {
        where.userId = { [Op.in]: userIds };
      } else if (filterUserId) {
        where.userId = Number(filterUserId);
      }

      const visits = await Visit.findAll({
        where,
        include: [
          {
            model: Third,
            required: true,
            include: [
              { model: ThirdType, required: false },
              { model: Region, required: false },
              { model: ThirdSpecialty, required: false },
              { model: ThirdSubSpecialty, required: false },
              { model: ThirdClassification, required: false }
            ]
          },
          {
            model: User,
            required: true
          }
        ],
        order: [['date', 'DESC']]
      });

      return res.status(200).json(visits);
    } 
    
    if (module === 'thirds') {
      const where: any = {};
      if (regionId) {
        where.regionId = Number(regionId);
      }

      let includeTp: any = {
        model: ThirdsPortfolio,
        required: false,
        include: [{
          model: Portfolio,
          required: true,
          include: [{ model: User, required: true }]
        }]
      };

      if (rol !== 'Administrador') {
        const portfolios = await Portfolio.findAll({
          where: { userId: { [Op.in]: userIds } }
        });
        const pIds = portfolios.map(p => p.id);
        
        includeTp = {
          model: ThirdsPortfolio,
          where: { portfolioId: { [Op.in]: pIds }, approved: true },
          required: true,
          include: [{
            model: Portfolio,
            required: true,
            include: [{ model: User, required: true }]
          }]
        };
      } else if (filterUserId) {
        const portfolios = await Portfolio.findAll({
          where: { userId: Number(filterUserId) }
        });
        const pIds = portfolios.map(p => p.id);

        includeTp = {
          model: ThirdsPortfolio,
          where: { portfolioId: { [Op.in]: pIds } },
          required: true,
          include: [{
            model: Portfolio,
            required: true,
            include: [{ model: User, required: true }]
          }]
        };
      }

      const thirds = await Third.findAll({
        where,
        include: [
          { model: ThirdType, required: false },
          { model: Region, required: false },
          { model: ThirdSpecialty, required: false },
          { model: ThirdSubSpecialty, required: false },
          { model: ThirdClassification, required: false },
          includeTp
        ]
      });

      return res.status(200).json(thirds);
    }

    if (module === 'justifications') {
      const where: any = {};
      if (startDate && endDate) {
        where.dateToJustify = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      }

      if (rol !== 'Administrador') {
        where.userId = { [Op.in]: userIds };
      } else if (filterUserId) {
        where.userId = Number(filterUserId);
      }

      const justifications = await Justification.findAll({
        where,
        include: [
          {
            model: Third,
            required: true,
            include: [
              { model: ThirdType, required: false },
              { model: Region, required: false }
            ]
          },
          {
            model: User,
            required: true
          }
        ]
      });

      return res.status(200).json(justifications);
    }

    return res.status(400).json({ message: 'Módulo no válido' });
  } catch (error: any) {
    logger.error('Error al generar reporte customizado', error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};
