/**
 * Servicio para consultas SQL seguras
 * Proporciona métodos para realizar consultas complejas de manera segura
 */
import { Op, QueryTypes, literal as sequelizeLiteral, where as sequelizeWhere } from 'sequelize';
import dbConection from '../database';
import CalendarEvent from '../models/CalendarEvent';

/**
 * Obtiene el conteo de visitas para un tercero en un período específico
 * @param {number} thirdId - ID del tercero
 * @param {string} startDate - Fecha de inicio (formato ISO)
 * @param {string} endDate - Fecha de fin (formato ISO)
 * @returns {Promise<number>} - Número de visitas
 */
const getVisitCountForThird = async (thirdId, startDate, endDate) => {
  const result = await dbConection.query(
    'SELECT COUNT(*) as count FROM "visits" WHERE "thirdId" = ? AND date BETWEEN ? AND ?',
    {
      replacements: [thirdId, startDate, endDate],
      type: QueryTypes.SELECT
    }
  );
  
  return (result[0] as any).count;
};

/**
 * Verifica si un tercero tiene portafolios aprobados
 * @param {number} thirdId - ID del tercero
 * @returns {Promise<boolean>} - True si tiene portafolios aprobados
 */
const hasApprovedPortfolios = async (thirdId) => {
  const result = await dbConection.query(
    'SELECT COUNT(*) as count FROM "thirds_portfolios" WHERE "thirdId" = ? AND approved = true',
    {
      replacements: [thirdId],
      type: QueryTypes.SELECT
    }
  );
  
  return (result[0] as any).count > 0;
};

/**
 * Verifica si un tercero tiene justificaciones en un período específico
 * @param {number} thirdId - ID del tercero
 * @param {string} startDate - Fecha de inicio (formato ISO)
 * @param {string} endDate - Fecha de fin (formato ISO)
 * @returns {Promise<boolean>} - True si tiene justificaciones
 */
const hasJustificationsInPeriod = async (thirdId, startDate, endDate) => {
  const result = await dbConection.query(
    'SELECT COUNT(*) as count FROM "justifications" WHERE "thirdId" = ? AND "dateToJustify" BETWEEN ? AND ?',
    {
      replacements: [thirdId, startDate, endDate],
      type: QueryTypes.SELECT
    }
  );
  
  return (result[0] as any).count > 0;
};

/**
 * Obtiene los terceros que no han sido visitados lo suficiente en un período
 * @param {string} startDate - Fecha de inicio (formato ISO)
 * @param {string} endDate - Fecha de fin (formato ISO)
 * @param {number} userId - ID del usuario (opcional, para filtrar por portafolio)
 * @returns {Promise<Array>} - Lista de terceros
 */
const getUndervisitedThirds = async (startDate, endDate, userId = null) => {
  let query = `
    SELECT t.*, 
           (SELECT COUNT(*) FROM "visits" v WHERE v."thirdId" = t.id AND v.date BETWEEN ? AND ?) as visit_count
    FROM "third" t
    WHERE t.impact > (SELECT COUNT(*) FROM "visits" v WHERE v."thirdId" = t.id AND v.date BETWEEN ? AND ?)
    AND EXISTS (SELECT 1 FROM "thirds_portfolios" tp WHERE tp."thirdId" = t.id AND tp.approved = true
  `;
  
  const replacements = [startDate, endDate, startDate, endDate];
  
  if (userId) {
    query += ` AND tp."portfolioId" IN (SELECT id FROM "portfolios" WHERE "userId" = ?)`;
    replacements.push(userId);
  }
  
  query += `)
    AND NOT EXISTS (SELECT 1 FROM "justifications" j WHERE j."thirdId" = t.id AND j."dateToJustify" BETWEEN ? AND ?)
    AND t."createdAt" < ?
  `;
  
  replacements.push(startDate, endDate, new Date().toISOString());
  
  const results = await dbConection.query(query, {
    replacements,
    type: QueryTypes.SELECT
  });
  
  return results;
};

/**
 * Obtiene eventos de calendario por componente
 * @param {string} componentType - Tipo de componente
 * @param {number} componentId - ID del componente
 * @returns {Promise<Array>} - Lista de eventos
 */
const getCalendarEventsByComponent = async (componentType, componentId) => {
  const results = await (CalendarEvent as any).findAll({
    where: {
      'extendedProps.component.type': componentType,
      'extendedProps.component.id': componentId
    }
  });
  
  return results;
};

/**
 * Elimina eventos de calendario por componente
 * @param {string} componentType - Tipo de componente
 * @param {number} componentId - ID del componente
 * @returns {Promise<number>} - Número de filas afectadas
 */
const deleteCalendarEventsByComponent = async (componentType, componentId) => {
  const affectedRows = await (CalendarEvent as any).destroy({
    where: {
      'extendedProps.component.type': componentType,
      'extendedProps.component.id': componentId
    }
  });
  
  return affectedRows;
};

/**
 * Ejecuta una consulta SQL parametrizada
 * @param {string} query - Consulta SQL
 * @param {Array} replacements - Valores para reemplazar en la consulta
 * @param {string} type - Tipo de consulta (SELECT, INSERT, UPDATE, DELETE)
 * @returns {Promise<Array>} - Resultados de la consulta
 */
const executeQuery = async (query, replacements, type = QueryTypes.SELECT) => {
  const results = await dbConection.query(query, {
    replacements,
    type
  });
  
  return results;
};

/**
 * Crea una expresión literal SQL de manera segura
 * @param {string} sql - Expresión SQL
 * @returns {object} - Expresión literal de Sequelize
 */
const literal = (sql) => {
  return sequelizeLiteral(sql);
};

/**
 * Crea una condición where con una expresión literal
 * @param {object} literal - Expresión literal
 * @param {string} operator - Operador de comparación
 * @param {any} value - Valor para comparar
 * @returns {object} - Condición where de Sequelize
 */
const where = (literal, operator, value) => {
  return sequelizeWhere(literal, operator, value);
};

export {
  getVisitCountForThird,
  hasApprovedPortfolios,
  hasJustificationsInPeriod,
  getUndervisitedThirds,
  getCalendarEventsByComponent,
  deleteCalendarEventsByComponent,
  executeQuery,
  literal,
  where
};

export default {
  getVisitCountForThird,
  hasApprovedPortfolios,
  hasJustificationsInPeriod,
  getUndervisitedThirds,
  getCalendarEventsByComponent,
  deleteCalendarEventsByComponent,
  executeQuery,
  literal,
  where
};
