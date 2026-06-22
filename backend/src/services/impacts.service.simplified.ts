/**
 * Servicio simplificado para la gestión de impactos
 * Centraliza la lógica de negocio relacionada con impactos
 */
import { Op } from 'sequelize';
import logger from '../utils/logger';
import Third from '../models/Third';
import ThirdType from '../models/ThirdType';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import User from '../models/User';
import Visit from '../models/Visit';

/**
 * Obtiene datos de impacto para el widget
 * @param {number} userId - ID del usuario
 * @param {string} rol - Rol del usuario
 * @param {object} filters - Filtros opcionales
 * @returns {Promise<object>} - Datos de impacto
 */
const getImpactsWidgetData = async (userId, rol, filters = null) => {
  try {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Crear objeto de respuesta
    const widgets: any = {
      countThirdsAssignedObject: {
        title: "Panel",
        data: {
          name: "",
          count: 0,
          extra: {
            name: "",
            count: 0
          }
        },
        detail: "Cantidad de paneles asignados al usuario actual"
      },
      countThirdsVisitsObject: {
        title: "Visitas",
        data: {
          name: "Terceros visitados",
          count: 0,
          extra: {
            name: "Visitas realizadas",
            count: 0
          }
        },
        detail: "Cantidad de terceros visitados en el mes actual"
      },
      percentageComplianceObject: {
        title: "Cumplimiento",
        data: {
          name: "Porcentaje",
          count: "0%",
          extra: {
            name: "Visitas realizadas",
            count: 0
          }
        },
        detail: "Porcentaje de cumplimiento de visitas"
      }
    };
    
    // Si hay filtros y es administrador, agregar datos filtrados
    if (filters && rol === "Administrador") {
      widgets.impactsFilterObject = await filterImpacts(filters);
    }
    
    // Obtener datos según el rol
    if (rol === "Administrador") {
      // Contar terceros asignados a portafolios
      const approvedThirdsCount = await ThirdsPortfolio.count({
        where: { approved: true }
      });
      
      // Calcular impacto total
      const thirds = await Third.findAll({
        include: [{
          model: ThirdsPortfolio,
          where: { approved: true },
          required: true
        }]
      });
      
      let totalImpact = 0;
      thirds.forEach(third => {
        totalImpact += parseInt(third.impact || 0);
      });
      
      // Contar visitas del mes actual
      const visits = await Visit.findAll({
        where: {
          date: {
            [Op.between]: [firstDayOfCurrentMonth, lastDayOfCurrentMonth]
          }
        },
        attributes: ['thirdId']
      });
      
      // Calcular terceros únicos visitados
      const uniqueThirdsVisited = new Set();
      visits.forEach(visit => uniqueThirdsVisited.add(visit.thirdId));
      
      // Calcular total de visitas
      const totalVisits = await Visit.count({
        where: {
          date: {
            [Op.between]: [firstDayOfCurrentMonth, lastDayOfCurrentMonth]
          }
        }
      });
      
      // Calcular porcentaje de cumplimiento
      const percentageCompliance = totalImpact > 0 ? 
        Math.round((totalVisits / totalImpact) * 100) : 0;
      
      // Actualizar widgets
      widgets.countThirdsAssignedObject.data.count = approvedThirdsCount;
      widgets.countThirdsVisitsObject.data.count = uniqueThirdsVisited.size;
      widgets.countThirdsVisitsObject.data.extra.count = totalVisits;
      widgets.percentageComplianceObject.data.count = `${percentageCompliance}%`;
      widgets.percentageComplianceObject.data.extra.count = totalVisits;
    } 
    else {
      // Buscar el portafolio del usuario
      const portfolio = await Portfolio.findOne({
        where: { userId }
      });
      
      if (portfolio) {
        // Contar terceros asignados al portafolio
        const approvedThirdsCount = await ThirdsPortfolio.count({
          where: { 
            portfolioId: portfolio.id,
            approved: true 
          }
        });
        
        // Calcular impacto total
        const thirds = await Third.findAll({
          include: [{
            model: ThirdsPortfolio,
            where: { 
              portfolioId: portfolio.id,
              approved: true 
            },
            required: true
          }]
        });
        
        let totalImpact = 0;
        thirds.forEach(third => {
          totalImpact += parseInt(third.impact || 0);
        });
        
        // Contar visitas del mes actual
        const visits = await Visit.findAll({
          where: {
            userId,
            date: {
              [Op.between]: [firstDayOfCurrentMonth, lastDayOfCurrentMonth]
            }
          },
          attributes: ['thirdId']
        });
        
        // Calcular terceros únicos visitados
        const uniqueThirdsVisited = new Set();
        visits.forEach(visit => uniqueThirdsVisited.add(visit.thirdId));
        
        // Calcular total de visitas
        const totalVisits = await Visit.count({
          where: {
            userId,
            date: {
              [Op.between]: [firstDayOfCurrentMonth, lastDayOfCurrentMonth]
            }
          }
        });
        
        // Calcular porcentaje de cumplimiento
        const percentageCompliance = totalImpact > 0 ? 
          Math.round((totalVisits / totalImpact) * 100) : 0;
        
        // Actualizar widgets
        widgets.countThirdsAssignedObject.data.count = approvedThirdsCount;
        widgets.countThirdsVisitsObject.data.count = uniqueThirdsVisited.size;
        widgets.countThirdsVisitsObject.data.extra.count = totalVisits;
        widgets.percentageComplianceObject.data.count = `${percentageCompliance}%`;
        widgets.percentageComplianceObject.data.extra.count = totalVisits;
      }
    }
    
    logger.info(`Datos de impacto generados para usuario ${userId}`);
    return widgets;
  } catch (error) {
    logger.error("Error al obtener datos de impacto", error);
    throw error;
  }
};

/**
 * Filtra impactos según criterios
 * @param {object} filters - Criterios de filtrado
 * @returns {Promise<object>} - Datos filtrados
 */
const filterImpacts = async (filters) => {
  try {
    const { startDate, endDate, region, user } = filters;
    
    logger.info(`Filtrando impactos con criterios: ${JSON.stringify(filters)}`);
    
    // Estructura básica de respuesta
    return {
      title: {
        filters: "Impactos",
        tables: "Lista Paneles"
      },
      overview: {
        filters: [],
        tables: {
          columns: [],
          rows: []
        }
      },
      ranges: {
        filters: "Impactos",
        tables: "Paneles"
      }
    };
  } catch (error) {
    logger.error("Error al filtrar impactos", error);
    return null;
  }
};

export {
  getImpactsWidgetData,
  filterImpacts
};


export default {
  getImpactsWidgetData,
  filterImpacts
};
