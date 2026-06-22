/**
 * Servicio para la generación de reportes
 * Centraliza la lógica de negocio relacionada con reportes
 */
import { Op } from 'sequelize';
import logger from '../utils/logger';
import Third from '../models/Third';
import ThirdType from '../models/ThirdType';
import ThirdClassification from '../models/ThirdClassification';
import ThirdSpecialty from '../models/ThirdSpecialty';
import ThirdSubSpecialty from '../models/ThirdSubSpecialty';
import Region from '../models/Region';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import Portfolio from '../models/Portfolio';

/**
 * Genera un reporte de terceros según filtros
 * @param {object} filters - Filtros para el reporte
 * @param {number} userId - ID del usuario
 * @param {string} rol - Rol del usuario
 * @returns {Promise<object>} - Datos del reporte
 */
const generateThirdsReport = async (filters, userId, rol) => {
  try {
    let whereClause: any = {};
    let whereClauseUser: any = {};
    
    // Aplicar filtros si existen
    if (filters) {
      if (filters.type !== 0) {
        whereClause.typeId = filters.type;
      }
      
      if (filters.identification) {
        whereClause.identification = {
          [Op.like]: `%${filters.identification}%`
        };
      }
      
      if (filters.name) {
        whereClause.name = {
          [Op.like]: `%${filters.name}%`
        };
      }
      
      if (filters.region !== 0) {
        whereClause.regionId = filters.region;
      }
      
      if (filters.status) {
        whereClause.status = filters.status;
      }
      
      if (filters.userId !== 0) {
        whereClauseUser.userId = filters.userId;
      }
    }
    
    // Configurar la consulta según el rol
    let queryOptions: any = {
      include: [
        {
          model: ThirdType,
          attributes: ["id", "name"]
        },
        {
          model: ThirdClassification,
          attributes: ["id", "name"]
        },
        {
          model: ThirdSpecialty,
          attributes: ["id", "name"]
        },
        {
          model: ThirdSubSpecialty,
          attributes: ["id", "name"]
        },
        {
          model: Region,
          attributes: ["id", "name"]
        },
        {
          model: ThirdsPortfolio,
          attributes: ["id", "thirdId", "portfolioId", "approved", "status"],
          include: [
            {
              model: Portfolio,
              attributes: ["id", "name", "status", "userId"]
            }
          ]
        }
      ],
      order: [["id", "DESC"]],
      where: whereClause
    };
    
    // Si no es administrador, filtrar por usuario
    if (rol !== "Administrador") {
      (queryOptions.include[5] as any).include[0].where = { userId };
    } else if (Object.keys(whereClauseUser).length > 0) {
      (queryOptions.include[5] as any).include[0].where = whereClauseUser;
    }
    
    // Ejecutar la consulta
    const thirds = await Third.findAll(queryOptions);
    
    // Formatear los resultados
    const report = {
      columns: [
        "TIPO",
        "IDENTIFICACIÓN",
        "NOMBRE Y APELLIDO",
        "REGION",
        "IMPACTOS",
        "ESTADO"
      ],
      rows: thirds.map(third => ({
        type: third.third_type.name,
        identification: `${third.typeIdentification} ${third.identification}`,
        name: `${third.name} ${third.additionalName || ''}`.trim(),
        region: third.region.name,
        impact: third.impact,
        status: third.status
      })),
      count: thirds.length,
      data: thirds
    };
    
    logger.info(`Reporte generado con ${thirds.length} terceros`);
    return report;
  } catch (error) {
    logger.error("Error al generar reporte de terceros", error);
    throw error;
  }
};

export {
  generateThirdsReport
};


export default {
  generateThirdsReport
};
