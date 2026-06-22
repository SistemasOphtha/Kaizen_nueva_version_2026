/**
 * Servicio para la gestión de widgets
 * Centraliza la lógica de negocio relacionada con widgets
 */
import { QueryTypes, Op } from 'sequelize';
import dbConection from '../database';
import logger from '../utils/logger';
import Third from '../models/Third';
import ThirdType from '../models/ThirdType';
import User from '../models/User';

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
 * Obtiene los terceros que no han sido visitados lo suficiente en el mes anterior
 * @param {number} userId - ID del usuario
 * @param {string} rol - Rol del usuario
 * @returns {Promise<Array>} - Lista de terceros
 */
const getUndervisitedThirdsLastMonth = async (userId, rol) => {
  const today = new Date();
  
  // Calcular fechas del mes anterior
  const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString();
  const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).toISOString();
  
  // Calcular primer día del mes actual
  const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
  
  let query = `
    SELECT t.*, 
           (SELECT COUNT(*) FROM "visits" v WHERE v."thirdId" = t.id AND v.date BETWEEN ? AND ?) as visit_count
    FROM "third" t
    WHERE t.impact > (SELECT COUNT(*) FROM "visits" v WHERE v."thirdId" = t.id AND v.date BETWEEN ? AND ?)
    AND EXISTS (SELECT 1 FROM "thirds_portfolios" tp WHERE tp."thirdId" = t.id AND tp.approved = true
  `;
  
  const replacements: any[] = [firstDayOfLastMonth, lastDayOfLastMonth, firstDayOfLastMonth, lastDayOfLastMonth];
  
  // Si no es administrador, filtrar por portafolios del equipo del usuario
  if (rol !== "Administrador") {
    const userIds = await getManagedUserIds(userId, rol);
    query += ` AND tp."portfolioId" IN (SELECT id FROM "portfolios" WHERE "userId" IN (?))`;
    replacements.push(userIds);
  }
  
  query += `)
    AND NOT EXISTS (SELECT 1 FROM "justifications" j WHERE j."thirdId" = t.id AND j."dateToJustify" BETWEEN ? AND ?)
    AND t."createdAt" < ?
  `;
  
  replacements.push(firstDayOfLastMonth, lastDayOfLastMonth, firstDayOfCurrentMonth);
  
  try {
    const results = await dbConection.query(query, {
      replacements,
      type: QueryTypes.SELECT
    }) as any[];
    
    logger.info(`Se encontraron ${results.length} terceros no visitados suficientemente el mes pasado`);
    return results;
  } catch (error) {
    logger.error("Error al obtener terceros no visitados el mes pasado", error);
    throw error;
  }
};

/**
 * Obtiene los terceros que no han sido visitados lo suficiente en el mes actual
 * @param {number} userId - ID del usuario
 * @param {string} rol - Rol del usuario
 * @returns {Promise<Array>} - Lista de terceros
 */
const getUndervisitedThirdsCurrentMonth = async (userId, rol) => {
  const today = new Date();
  
  // Calcular fechas del mes actual
  const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
  // Solo contar visitas YA REALIZADAS en el mes actual (hasta hoy), no futuras
  const todayISO = today.toISOString();
  
  let query = `
    SELECT t.*, 
           (SELECT COUNT(*) FROM "visits" v WHERE v."thirdId" = t.id AND v.date BETWEEN ? AND ?) as visit_count
    FROM "third" t
    WHERE t.impact > (SELECT COUNT(*) FROM "visits" v WHERE v."thirdId" = t.id AND v.date BETWEEN ? AND ?)
    AND EXISTS (SELECT 1 FROM "thirds_portfolios" tp WHERE tp."thirdId" = t.id AND tp.approved = true
  `;
  
  // Usar rango [primer día del mes actual, hoy] para considerar solo visitas realizadas
  const replacements: any[] = [firstDayOfCurrentMonth, todayISO, firstDayOfCurrentMonth, todayISO];
  
  // Si no es administrador, filtrar por portafolios del equipo del usuario
  if (rol !== "Administrador") {
    const userIds = await getManagedUserIds(userId, rol);
    query += ` AND tp."portfolioId" IN (SELECT id FROM "portfolios" WHERE "userId" IN (?))`;
    replacements.push(userIds);
  }
  
  query += `)`;
  
  try {
    const results = await dbConection.query(query, {
      replacements,
      type: QueryTypes.SELECT
    }) as any[];
    
    logger.info(`Se encontraron ${results.length} terceros no visitados suficientemente el mes actual`);
    return results;
  } catch (error) {
    logger.error("Error al obtener terceros no visitados el mes actual", error);
    throw error;
  }
};

/**
 * Obtiene el impacto por tipo de tercero
 * @param {object} filter - Filtros para la consulta
 * @returns {Promise<object>} - Datos de impacto
 */
const getImpactsByType = async (filter) => {
  const { startDate, endDate, region, user } = filter;
  
  // Si no hay región ni usuario específico, obtener impacto para todos los tipos
  if (region === 0 && user === 0) {
    try {
      // Obtener todos los tipos de tercero
      const types = await ThirdType.findAll({
        attributes: ['id', 'name']
      });
      
      // Para cada tipo, obtener los terceros y sus visitas
      const impactsByType = await Promise.all(types.map(async (type) => {
        // Consulta segura para obtener terceros por tipo con sus visitas
        const query = `
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
        
        const thirds = await dbConection.query(query, {
          replacements: [startDate, endDate, type.id],
          type: QueryTypes.SELECT
        }) as any[];
        
        // Si no hay terceros de este tipo, devolver objeto vacío
        if (thirds.length === 0) {
          return {
            countImpactsObject: {
              "title": type.name,
              "data": {
                "name": "Impacto",
                "count": 0,
                "extra": {
                  "name": "Visita realizadas",
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
                "VISITAS",
              ],
              "rows": []
            }
          };
        }
        
        // Obtener usuarios para cada tercero
        for (const third of thirds) {
          const user = await dbConection.query(
            'SELECT id, "firstName", "lastName" FROM "users" WHERE id = ?',
            {
              replacements: [third.user_id],
              type: QueryTypes.SELECT
            }
          ) as any[];
          
          if (user.length > 0) {
            third.user = user[0];
          }
        }
        
        // Calcular totales
        let sumImpact = 0;
        let sumVisit = 0;
        
        thirds.forEach(third => {
          sumImpact += parseInt(third.impact || 0);
          sumVisit += parseInt(third.visits || 0);
        });
        
        // Formatear objetos de respuesta
        const countImpactsObject = {
          "title": type.name,
          "data": {
            "name": sumImpact === 1 ? "Impacto" : "Impactos",
            "count": sumImpact,
            "extra": {
              "name": "Visita realizadas",
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
            "VISITAS",
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
        // Unificar las columnas
        accumulator.columns = [...new Set([...accumulator.columns, ...currentTable.columns])];
        
        // Unificar las filas
        accumulator.rows = accumulator.rows.concat(currentTable.rows);
        
        return accumulator;
      }, { columns: [], rows: [] });
      
      // Formatear respuesta final
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
      logger.error("Error al obtener impactos por tipo", error);
      throw error;
    }
  }
  
  // Implementar filtros por región y usuario si es necesario
  return null;
};

/**
 * Obtiene datos para widgets de seguimiento
 * @param {number} userId - ID del usuario
 * @param {string} rol - Rol del usuario
 * @returns {Promise<object>} - Datos para widgets
 */
const getTrackingAlertData = async (userId, rol) => {
  try {
    // Obtener terceros no visitados suficientemente
    const thirdNotVisitLastMonth = await getUndervisitedThirdsLastMonth(userId, rol);
    const thirdNotVisitCurrentMonth = await getUndervisitedThirdsCurrentMonth(userId, rol);
    
    // Formatear datos para widgets
    const tableThirdNotVisitLastMonth = {
      "columns": [
        "id",
        "Identificación",
        "Nombres",
        "Cantidad de Visitas",
        "Impacto"
      ],
      "rows": thirdNotVisitLastMonth.map((third) => {
        return {
          "id": third.id,
          "identification": third.identification,
          "name": third.name + " " + (third.additionalName || ""),
          "count": third.visit_count,
          "impact": third.impact
        };
      })
    };
    
    const tableThirdNotVisitCurrentMonth = {
      "columns": [
        "id",
        "Identificación",
        "Nombres",
        "Cantidad de Visitas",
        "Impacto"
      ],
      "rows": thirdNotVisitCurrentMonth.map((third) => {
        return {
          "id": third.id,
          "identification": third.identification,
          "name": third.name + " " + (third.additionalName || ""),
          "count": third.visit_count,
          "impact": third.impact
        };
      })
    };
    
    return {
      "thirdNotVisitLastMonth": tableThirdNotVisitLastMonth,
      "thirdNotVisitCurrentMonth": tableThirdNotVisitCurrentMonth
    };
  } catch (error) {
    logger.error("Error al obtener datos de alertas de seguimiento", error);
    throw error;
  }
};

export {
  getUndervisitedThirdsLastMonth,
  getUndervisitedThirdsCurrentMonth,
  getImpactsByType,
  getTrackingAlertData
};


export default {
  getUndervisitedThirdsLastMonth,
  getUndervisitedThirdsCurrentMonth,
  getImpactsByType,
  getTrackingAlertData
};
