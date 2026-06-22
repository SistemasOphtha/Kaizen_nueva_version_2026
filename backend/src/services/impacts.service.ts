import Sequelize, { Op, QueryTypes } from 'sequelize';
import logger from '../utils/logger';
import Third from '../models/Third';
import ThirdType from '../models/ThirdType';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import User from '../models/User';
import Visit from '../models/Visit';
import dbConection from '../database';

/**
 * Obtiene la lista de IDs de usuario bajo la responsabilidad del rol actual
 */
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

/**
 * Genera datos del gráfico de impactos por mes para todo el año
 * @param {number} userId - ID del usuario
 * @param {string} rol - Rol del usuario
 * @returns {Promise<object>} - Datos del gráfico
 */
const generateYearlyImpactsChart = async (userId, rol) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const userIds = await getManagedUserIds(userId, rol);
  
  const visitsPerMonth = [];
  const impactsPerMonth = [];
  const impactsPercentsForVisits = [];
  
  for (let month = 1; month <= 12; month++) {
    const firstDayOfMonth = new Date(currentYear, month - 1, 1);
    const lastDayOfMonth = new Date(currentYear, month, 0);
    
    let totalImpact = 0;
    let totalVisits = 0;
    
    if (rol === "Administrador") {
      // Calcular impacto total de terceros aprobados hasta ese mes
      totalImpact = await Third.sum('impact', {
        where: {
          createdAt: {
            [Op.lte]: lastDayOfMonth
          },
          [Op.and]: [
            Sequelize.where(Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "thirds_portfolios" AS tp
              WHERE tp."thirdId" = "third"."id"
              AND tp.approved = true
            )`), '>', 0)
          ]
        }
      }) || 0;
      
      // Contar visitas del mes
      totalVisits = await Visit.count({
        where: {
          date: {
            [Op.between]: [firstDayOfMonth, lastDayOfMonth]
          },
          [Op.and]: [
            Sequelize.where(Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "thirds_portfolios" AS tp
              WHERE tp."thirdId" = "visits"."thirdId"
              AND tp.approved = true
            )`), '>', 0)
          ]
        }
      }) || 0;
    } else {
      // Para usuarios normales o coordinadores, filtrar por su portafolio/equipo
      totalImpact = await Third.sum('impact', {
        where: {
          createdAt: {
            [Op.lte]: lastDayOfMonth
          },
          [Op.and]: [
            Sequelize.where(Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "thirds_portfolios" AS tp
              WHERE tp."thirdId" = "third"."id"
              AND tp."portfolioId" IN (
                SELECT id
                FROM "portfolios" AS p
                WHERE p."userId" IN (${userIds.join(',')})
              )
              AND tp.approved = true
            )`), '>', 0)
          ]
        }
      }) || 0;
      
      totalVisits = await Visit.count({
        where: {
          date: {
            [Op.between]: [firstDayOfMonth, lastDayOfMonth]
          },
          userId: {
            [Op.in]: userIds
          },
          [Op.and]: [
            Sequelize.where(Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "thirds_portfolios" AS tp
              WHERE tp."thirdId" = "visits"."thirdId"
              AND tp."portfolioId" IN (
                SELECT id
                FROM "portfolios" AS p
                WHERE p."userId" IN (${userIds.join(',')})
              )
              AND tp.approved = true
            )`), '>', 0)
          ]
        }
      }) || 0;
    }
    
    impactsPerMonth.push(totalImpact);
    visitsPerMonth.push(totalVisits);
    
    // Calcular porcentaje
    let percent = totalImpact > 0 ? Math.round((totalVisits / totalImpact) * 100) : 0;
    impactsPercentsForVisits.push(percent);
  }
  
  // Calcular acumulados hasta el mes actual
  const addsImpactToDate = impactsPerMonth.slice(0, currentMonth).reduce((a, b) => a + b, 0);
  const addsVisitsToDate = visitsPerMonth.slice(0, currentMonth).reduce((a, b) => a + b, 0);
  const totalMissingVisits = addsImpactToDate - addsVisitsToDate;
  const addsPercentToDate = impactsPercentsForVisits.slice(0, currentMonth).reduce((a, b) => a + b, 0);
  
  return {
    title: {
      amounts: "Impactos asignados y visitas realizadas por mes",
      percents: "Porcentaje de visitas"
    },
    overview: {
      amounts: {
        "cumulative-impacts": addsImpactToDate,
        "cumulative-visits": addsVisitsToDate,
        "missing-visit": totalMissingVisits,
        "total-percent": addsPercentToDate
      },
      percents: {
        "cumulative-impacts": addsImpactToDate,
        "cumulative-visits": addsVisitsToDate,
        "missing-visit": totalMissingVisits,
        "total-percent": addsPercentToDate
      }
    },
    ranges: {
      amounts: "Cantidades",
      percents: "Porcentajes"
    },
    labels: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    series: {
      amounts: [
        {
          name: "Impactos - Objetivos",
          type: "line",
          data: impactsPerMonth
        },
        {
          name: "Visitas",
          type: "column",
          data: visitsPerMonth
        }
      ],
      percents: [
        {
          name: "Metas de impacto",
          type: "line",
          data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
        },
        {
          name: "Porcentaje visitas",
          type: "column",
          data: impactsPercentsForVisits
        }
      ]
    }
  };
};

/**
 * Genera lista de terceros con sus impactos y visitas del mes actual
 * @param {number} userId - ID del usuario
 * @param {string} rol - Rol del usuario
 * @returns {Promise<Array>} - Lista de terceros con impactos
 */
const generateThirdImpactsList = async (userId, rol) => {
  const today = new Date();
  const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const userIds = await getManagedUserIds(userId, rol);
  
  let thirdImpacts;
  
  if (rol === "Administrador") {
    thirdImpacts = await Third.findAll({
      attributes: [
        'id',
        'identification',
        'name',
        'impact',
        [Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "visits" AS v
          WHERE v."thirdId" = "third"."id"
          AND v.date BETWEEN '${firstDayOfCurrentMonth.toISOString()}' AND '${lastDayOfCurrentMonth.toISOString()}'
        )`), 'visits']
      ],
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "thirds_portfolios" AS tp
            WHERE tp."thirdId" = "third"."id"
            AND tp.approved = true
          )`), '>', 0)
        ]
      }
    });
  } else {
    thirdImpacts = await Third.findAll({
      attributes: [
        'id',
        'identification',
        'name',
        'impact',
        [Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "visits" AS v
          WHERE v."thirdId" = "third"."id"
          AND v.date BETWEEN '${firstDayOfCurrentMonth.toISOString()}' AND '${lastDayOfCurrentMonth.toISOString()}'
          AND v."userId" IN (${userIds.join(',')})
        )`), 'visits']
      ],
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "thirds_portfolios" AS tp
            WHERE tp."thirdId" = "third"."id"
            AND tp."portfolioId" IN (
              SELECT id
              FROM "portfolios" AS p
              WHERE p."userId" IN (${userIds.join(',')})
            )
            AND tp.approved = true
          )`), '>', 0)
        ]
      }
    });
  }
  
  return thirdImpacts.map((third) => ({
    panel: third.name,
    impact: third.impact,
    visits: third.dataValues.visits
  }));
};

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
    
    // Crear objeto de respuesta con la estructura exacta que espera el frontend
    const widgets: any = {
      // Widget para ThirdsImpactAssignedWidget.tsx
      countImpactsAssignedObject: {
        title: "Impacto Objetivo",
        data: {
          name: "Impactos asignados",
          count: 0,
          extra: {
            name: "",
            count: 0
          }
        },
        detail: "Suma de impactos asignados en el portafolio"
      },
      // Widget para ThirdsAssignedWidget.tsx
      countThirdsAssignedObject: {
        title: "Paneles Asignados",
        data: {
          name: "Terceros en panel",
          count: 0,
          extra: {
            name: "",
            count: 0
          }
        },
        detail: "Cantidad de paneles/médicos asignados al usuario actual"
      },
      // Widget para ThirdsVisitsWidget.tsx
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
      // Widget para ThirdsNotVisitsWidget.tsx
      countThirdsNotVisitsObject: {
        title: "No visitados",
        data: {
          name: "Terceros sin visitas",
          count: 0,
          extra: {
            name: "Impacto pendiente",
            count: 0
          }
        },
        detail: "Cantidad de terceros sin visitas en el mes actual"
      },
      // Widget para mostrar el porcentaje de cumplimiento
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
    
    // Generar gráfico de impactos por mes (datos completos del año)
    widgets.impactsDataObject = await generateYearlyImpactsChart(userId, rol);
    
    // Generar lista de terceros con sus impactos y visitas
    widgets.thirdImpactsObject = await generateThirdImpactsList(userId, rol);
    
    // Obtener datos según el rol
    if (rol === "Administrador") {
      // Contar terceros asignados a portafolios
      const approvedThirdsCount = await ThirdsPortfolio.count({
        where: { approved: true }
      });
      
      // Calcular impacto total por ASIGNACIÓN (cada relación tercero-portafolio cuenta)
      const thirdsAssignments = await ThirdsPortfolio.findAll({
        where: { approved: true },
        include: [{
          model: Third,
          required: true
        }]
      });
      
      let totalImpact = 0;
      thirdsAssignments.forEach(tp => {
        totalImpact += parseInt(tp.third.impact || 0);
      });
      
      // Contar visitas del mes actual YA REALIZADAS (hasta hoy, no futuras)
      const visits = await Visit.findAll({
        where: {
          date: {
            [Op.between]: [firstDayOfCurrentMonth, today]
          }
        },
        attributes: ['thirdId']
      });
      
      // Calcular terceros únicos visitados
      const uniqueThirdsVisited = new Set();
      visits.forEach(visit => uniqueThirdsVisited.add(visit.thirdId));
      
      // Calcular total de visitas realizadas (hasta hoy)
      const totalVisits = await Visit.count({
        where: {
          date: {
            [Op.between]: [firstDayOfCurrentMonth, today]
          }
        }
      });
      
      // Calcular porcentaje de cumplimiento
      const percentageCompliance = totalImpact > 0 ? 
        Math.round((totalVisits / totalImpact) * 100) : 0;
      
      // Calcular terceros no visitados
      const notVisitedCount = approvedThirdsCount - uniqueThirdsVisited.size;
      const pendingImpact = totalImpact - totalVisits;
      
      // Actualizar widgets
      widgets.countImpactsAssignedObject.data.count = totalImpact;
      widgets.countThirdsAssignedObject.data.count = approvedThirdsCount;
      widgets.countThirdsVisitsObject.data.count = uniqueThirdsVisited.size;
      widgets.countThirdsVisitsObject.data.extra.count = totalVisits;
      widgets.countThirdsNotVisitsObject.data.count = notVisitedCount;
      widgets.countThirdsNotVisitsObject.data.extra.count = pendingImpact;
      widgets.percentageComplianceObject.data.count = `${percentageCompliance}%`;
      widgets.percentageComplianceObject.data.extra.count = totalVisits;
    } 
    else {
      // Buscar los portafolios del equipo del usuario
      const userIds = await getManagedUserIds(userId, rol);
      const portfolios = await Portfolio.findAll({
        where: { userId: { [Op.in]: userIds } }
      });
      
      const portfolioIds = portfolios.map(p => p.id);
      
      if (portfolioIds.length > 0) {
        // Contar terceros asignados a los portafolios del equipo
        const approvedThirdsCount = await ThirdsPortfolio.count({
          where: { 
            portfolioId: { [Op.in]: portfolioIds },
            approved: true 
          }
        });
        
        // Calcular impacto total
        const thirds = await Third.findAll({
          include: [{
            model: ThirdsPortfolio,
            where: { 
              portfolioId: { [Op.in]: portfolioIds },
              approved: true 
            },
            required: true
          }]
        });
        
        let totalImpact = 0;
        thirds.forEach(third => {
          totalImpact += parseInt(third.impact || 0);
        });
        
        // Contar visitas del mes actual YA REALIZADAS por el equipo (hasta hoy)
        const visits = await Visit.findAll({
          where: {
            userId: { [Op.in]: userIds },
            date: {
              [Op.between]: [firstDayOfCurrentMonth, today]
            }
          },
          attributes: ['thirdId']
        });
        
        // Calcular terceros únicos visitados
        const uniqueThirdsVisited = new Set();
        visits.forEach(visit => uniqueThirdsVisited.add(visit.thirdId));
        
        // Calcular total de visitas realizadas por el equipo (hasta hoy)
        const totalVisits = await Visit.count({
          where: {
            userId: { [Op.in]: userIds },
            date: {
              [Op.between]: [firstDayOfCurrentMonth, today]
            }
          }
        });
        
        // Calcular porcentaje de cumplimiento
        const percentageCompliance = totalImpact > 0 ? 
          Math.round((totalVisits / totalImpact) * 100) : 0;
        
        // Calcular terceros no visitados
        const notVisitedCount = approvedThirdsCount - uniqueThirdsVisited.size;
        const pendingImpact = totalImpact - totalVisits;
        
        // Actualizar widgets
        widgets.countImpactsAssignedObject.data.count = totalImpact;
        widgets.countThirdsAssignedObject.data.count = approvedThirdsCount;
        widgets.countThirdsVisitsObject.data.count = uniqueThirdsVisited.size;
        widgets.countThirdsVisitsObject.data.extra.count = totalVisits;
        widgets.countThirdsNotVisitsObject.data.count = notVisitedCount;
        widgets.countThirdsNotVisitsObject.data.extra.count = pendingImpact;
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
    
    // Obtener todos los tipos de tercero
    const types = await ThirdType.findAll({
      attributes: ['id', 'name']
    });
    
    // Para cada tipo, obtener los terceros y sus visitas
    const impactsByType = await Promise.all(types.map(async (type) => {
      let query = `
        SELECT tp."thirdId", 
               t.name as full_name, 
               t.identification, 
               t.impact,
               (SELECT COUNT(*) FROM "visits" v 
                WHERE v."thirdId" = tp."thirdId" 
                AND v.date BETWEEN ? AND ?
                AND v."userId" = p."userId") as visits,
               p."userId" as user_id
        FROM "thirds_portfolios" tp
        JOIN "third" t ON t.id = tp."thirdId"
        JOIN "portfolios" p ON p.id = tp."portfolioId"
        WHERE t."typeId" = ?
        AND tp.approved = true
      `;
      
      const replacements: any[] = [startDate, endDate, type.id];
      
      if (region && Number(region) !== 0) {
        query += ` AND t."regionId" = ?`;
        replacements.push(Number(region));
      }
      
      if (user && Number(user) !== 0) {
        query += ` AND p."userId" = ?`;
        replacements.push(Number(user));
      }
      
      const thirds = await dbConection.query(query, {
        replacements,
        type: QueryTypes.SELECT
      }) as any[];
      
      if (thirds.length === 0) {
        return {
          countImpactsObject: {
            "title": type.name,
            "data": {
              "name": "Impactos",
              "count": 0,
              "extra": {
                "name": "Visitas realizadas",
                "count": 0
              }
            },
            "detail": "Cantidad de impactos"
          },
          tableThirdsObject: {
            "columns": [
              "ID",
              "REPRESENTANTE",
              "IDENTIFICACIÓN",
              "TIPO",
              "PANEL",
              "IMPACTO",
              "VISITAS"
            ],
            "rows": []
          }
        };
      }
      
      // Obtener nombre del representante para cada tercero
      for (const third of thirds) {
        const userFound = await dbConection.query(
          'SELECT id, "firstName", "lastName" FROM "users" WHERE id = ?',
          {
            replacements: [third.user_id],
            type: QueryTypes.SELECT
          }
        ) as any[];
        
        if (userFound.length > 0) {
          third.user = userFound[0];
        }
      }
      
      // Calcular totales
      let sumImpact = 0;
      let sumVisit = 0;
      
      thirds.forEach(third => {
        sumImpact += parseInt(third.impact || 0);
        sumVisit += parseInt(third.visits || 0);
      });
      
      const countImpactsObject = {
        "title": type.name,
        "data": {
          "name": sumImpact === 1 ? "Impacto" : "Impactos",
          "count": sumImpact,
          "extra": {
            "name": "Visitas realizadas",
            "count": sumVisit
          }
        },
        "detail": "Cantidad de impactos"
      };
      
      const tableThirdsObject = {
        "columns": [
          "ID",
          "REPRESENTANTE",
          "IDENTIFICACIÓN",
          "TIPO",
          "PANEL",
          "IMPACTO",
          "VISITAS"
        ],
        "rows": thirds.map((third) => {
          return {
            "id": third.thirdId,
            "user": third.user ? `${third.user.firstName} ${third.user.lastName}` : "N/A",
            "identification": third.identification,
            "type": type.name,
            "name": third.full_name,
            "impact": third.impact,
            "visits": third.visits,
          };
        })
      };
      
      return {
        countImpactsObject,
        tableThirdsObject
      };
    }));
    
    // Unificar tablas
    const tables = impactsByType.map(item => item.tableThirdsObject);
    
    let unifiedObject = tables.reduce((accumulator, currentTable) => {
      accumulator.columns = [...new Set([...accumulator.columns, ...currentTable.columns])];
      accumulator.rows = accumulator.rows.concat(currentTable.rows);
      return accumulator;
    }, { columns: [], rows: [] });
    
    return {
      "title": {
        "filters": "Impactos",
        "tables": "Lista Paneles"
      },
      "overview": {
        "filters": impactsByType.map(item => item.countImpactsObject),
        "tables": unifiedObject
      },
      "ranges": {
        "filters": "Impactos",
        "tables": "Paneles"
      }
    };
  } catch (error) {
    logger.error("Error al filtrar impactos", error);
    return null;
  }
};

export {
  getImpactsWidgetData,
  filterImpacts,
  generateYearlyImpactsChart,
  generateThirdImpactsList
};


export default {
  getImpactsWidgetData,
  filterImpacts,
  generateYearlyImpactsChart,
  generateThirdImpactsList
};
