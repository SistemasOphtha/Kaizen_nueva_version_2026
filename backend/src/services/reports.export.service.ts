/**
 * Servicio para la exportación de reportes
 * Centraliza la lógica de negocio relacionada con la exportación de reportes
 */
import { Op } from 'sequelize';
import moment from 'moment-timezone';
import logger from '../utils/logger';
import Third from '../models/Third';
import ThirdType from '../models/ThirdType';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import User from '../models/User';
import Visit from '../models/Visit';
import Region from '../models/Region';
import Config from '../models/Config';
import queryService from './query.service';

/**
 * Genera un reporte de impactos de terceros
 * @param {number} userId - ID del usuario
 * @param {string} rol - Rol del usuario
 * @returns {Promise<object>} - Datos del reporte
 */
const generateThirdImpactsReport = async (userId, rol) => {
  try {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
    const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();
    
    let thirdImpacts;
    
    if (rol === "Administrador") {
      // Consulta para administradores (todos los terceros)
      thirdImpacts = await Third.findAll({
        attributes: [
          'id',
          'identification',
          'name',
          'impact',
          [
            queryService.literal(`(
              SELECT COUNT(*)
              FROM "visits" AS v
              WHERE v."thirdId" = "third"."id"
              AND v.date BETWEEN ? AND ?
            )`),
            'visits'
          ]
        ],
        replacements: [firstDayOfCurrentMonth, lastDayOfCurrentMonth],
        where: {
          [Op.and]: [
            queryService.where(
              queryService.literal(`(
                SELECT COUNT(*)
                FROM "thirds_portfolios" AS tp
                WHERE tp."thirdId" = "third"."id"
                AND tp.approved = true
              )`),
              '>',
              0
            )
          ]
        }
      });
    } else {
      // Consulta para usuarios normales (solo sus terceros asignados)
      thirdImpacts = await Third.findAll({
        attributes: [
          'id',
          'identification',
          'name',
          'impact',
          [
            queryService.literal(`(
              SELECT COUNT(*)
              FROM "visits" AS v
              WHERE v."thirdId" = "third"."id"
              AND v.date BETWEEN ? AND ?
              AND v."userId" = ?
            )`),
            'visits'
          ]
        ],
        where: {
          [Op.and]: [
            queryService.where(
              queryService.literal(`(
                SELECT COUNT(*)
                FROM "thirds_portfolios" AS tp
                WHERE tp."thirdId" = "third"."id"
                AND tp."portfolioId" = (
                  SELECT id
                  FROM "portfolios" AS p
                  WHERE p."userId" = ?
                )
                AND tp.approved = true
              )`),
              '>',
              0
            )
          ]
        },
        replacements: [firstDayOfCurrentMonth, lastDayOfCurrentMonth, userId, userId]
      });
    }
    
    // Formatear los resultados
    const thirdImpactsObject = {
      "thirdImpacts": thirdImpacts.map((third) => {
        return {
          "panel": third.name,
          "impact": third.impact,
          "visits": third.dataValues.visits
        };
      })
    };
    
    logger.info(`Reporte de impactos de terceros generado para usuario ${userId}`);
    return thirdImpactsObject;
  } catch (error) {
    logger.error("Error al generar reporte de impactos de terceros", error);
    throw error;
  }
};

/**
 * Calcula los días laborables en un mes
 * @param {number} year - Año
 * @param {number} month - Mes (0-11)
 * @param {string} timezone - Zona horaria
 * @param {Array<string>} holidays - Lista de días festivos en formato DD-MM-YYYY
 * @returns {number} - Número de días laborables
 */
const getWorkingDays = (year, month, timezone, holidays = []) => {
  const inicioMes = moment.tz(new Date(year, month, 1), timezone).add(1, 'day');
  const finMes = moment.tz(new Date(year, month + 1, 0), timezone).endOf('day');
  
  let workingDays = 0;
  for (let dia = inicioMes; dia.isSameOrBefore(finMes); dia.add(1, 'day')) {
    const diaString = dia.format('DD-MM-YYYY');
    if (dia.day() !== 0 && dia.day() !== 6) {
      if (!holidays.includes(diaString)) {
        workingDays++;
      }
    }
  }
  
  return workingDays;
};

/**
 * Genera un reporte de impactos por usuario
 * @param {object} filters - Filtros para el reporte
 * @returns {Promise<object>} - Datos del reporte
 */
const generateReportImpactsByUser = async (filters) => {
  try {
    let region = 0;
    let date = null;
    
    // Aplicar filtros si existen
    if (filters) {
      if (filters.region) {
        region = filters.region;
      }
      
      if (filters.date) {
        date = moment(filters.date).tz('America/Bogota').format('YYYY-MM-DD');
      }
    }
    
    const dateParam = date || moment().subtract(1, 'month').format('YYYY-MM-DD');
    const isPostgres = process.env.DB_DIALECT === 'postgres';
    
    let query;
    let params;
    
    if (isPostgres) {
      const startOfMonth = moment(dateParam).startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment(dateParam).endOf('month').format('YYYY-MM-DD');
      const startOfMonthTimestamp = startOfMonth + ' 00:00:00';
      const todayStr = moment().tz('America/Bogota').format('YYYY-MM-DD');
      const endOfMonthOrToday = moment(endOfMonth).isAfter(todayStr) ? todayStr : endOfMonth;
      
      query = `
      SELECT 
        r.name, 
        u."firstName", 
        u."lastName", 
        u.category,
       (
          SELECT SUM(t.impact) 
          FROM "portfolios" p
            INNER JOIN "thirds_portfolios" tp ON p.id = tp."portfolioId"
            INNER JOIN "third" t ON tp."thirdId" = t.id
          WHERE p."userId" = u.id
            AND tp.approved = true
        ) AS "assignedImpacts",
        (
          SELECT SUM(t.impact) 
          FROM "portfolios" p
            INNER JOIN "thirds_portfolios" tp ON p.id = tp."portfolioId"
            INNER JOIN "third" t ON tp."thirdId" = t.id 
          WHERE p."userId" = u.id 
            AND t."typeId" = 1
            AND tp.approved = true
        ) AS "assignedImpacts_1",
        (
          SELECT SUM(t.impact) 
          FROM "portfolios" p
            INNER JOIN "thirds_portfolios" tp ON p.id = tp."portfolioId"
            INNER JOIN "third" t ON tp."thirdId" = t.id 
          WHERE p."userId" = u.id 
            AND t."typeId" = 2
            AND tp.approved = true
        ) AS "assignedImpacts_2",
        (
          SELECT SUM(t.impact) 
          FROM "portfolios" p
            INNER JOIN "thirds_portfolios" tp ON p.id = tp."portfolioId"
            INNER JOIN "third" t ON tp."thirdId" = t.id 
          WHERE p."userId" = u.id 
            AND t."typeId" = 3
            AND tp.approved = true
        ) AS "assignedImpacts_3",
        (
          SELECT 
            COUNT(v.id)
          FROM
            "visits" v
          WHERE
              v."thirdId" in (
                SELECT tp."thirdId" 
                FROM "thirds_portfolios" tp
                INNER JOIN "portfolios" p ON p.id = tp."portfolioId"
                WHERE p."userId" = u.id 
              )
            AND v.date::date >= ?::date
            AND v.date::date <= ?::date
        ) AS "impactsRealized",
        (
          SELECT 
            COUNT(v.id)
          FROM
            "visits" v
          WHERE
              v."thirdId" in (
                SELECT tp."thirdId" 
                FROM "thirds_portfolios" tp
                INNER JOIN "portfolios" p ON p.id = tp."portfolioId"
                WHERE p."userId" = u.id
              )
          AND v.date::date >= ?::date
          AND v.date::date <= ?::date
          AND v."typeId" = 1
        ) AS "impactsRealized_1",
        (
          SELECT 
            COUNT(v.id)
          FROM
            "visits" v
          WHERE
              v."thirdId" in (
                SELECT tp."thirdId" 
                FROM "thirds_portfolios" tp
                INNER JOIN "portfolios" p ON p.id = tp."portfolioId"
                WHERE p."userId" = u.id
              )
          AND v.date::date >= ?::date
          AND v.date::date <= ?::date
          AND v."typeId" = 2
        ) AS "impactsRealized_2",
        (
          SELECT 
            COUNT(v.id)
          FROM
            "visits" v
          WHERE
              v."thirdId" in (
                SELECT tp."thirdId" 
                FROM "thirds_portfolios" tp
                INNER JOIN "portfolios" p ON p.id = tp."portfolioId"
                WHERE p."userId" = u.id
              )
          AND v.date::date >= ?::date
          AND v.date::date <= ?::date
          AND v."typeId" = 3
        ) AS "impactsRealized_3",
        (
          SELECT COUNT(t.id) 
          FROM "portfolios" p
            INNER JOIN "thirds_portfolios" tp ON p.id = tp."portfolioId"
            INNER JOIN "third" t ON tp."thirdId" = t.id
          WHERE p."userId" = u.id
            AND tp.approved = true
        ) AS "assignedPanels",
        (
          SELECT COUNT(t.id) 
          FROM "portfolios" p
            INNER JOIN "thirds_portfolios" tp ON p.id = tp."portfolioId"
            INNER JOIN "third" t ON tp."thirdId" = t.id 
          WHERE p."userId" = u.id 
            AND t."typeId" = 1
            AND tp.approved = true
        ) AS "assignedPanels_1",
        (
          SELECT COUNT(t.id) 
          FROM "portfolios" p
            INNER JOIN "thirds_portfolios" tp ON p.id = tp."portfolioId"
            INNER JOIN "third" t ON tp."thirdId" = t.id 
          WHERE p."userId" = u.id 
            AND t."typeId" = 2
            AND tp.approved = true
        ) AS "assignedPanels_2",
        (
          SELECT COUNT(t.id) 
          FROM "portfolios" p
            INNER JOIN "thirds_portfolios" tp ON p.id = tp."portfolioId"
            INNER JOIN "third" t ON tp."thirdId" = t.id 
          WHERE p."userId" = u.id 
            AND t."typeId" = 3
            AND tp.approved = true
        ) AS "assignedPanels_3",
        /* Cálculo de ausencias en Postgres */
        (SELECT 
            COALESCE(
              SUM(
                CASE
                  /* Caso 1: Ausencia completamente dentro del mes */
                  WHEN w."startDate"::date >= ?::date AND w."endDate"::date <= ?::date
                  THEN 
                    CASE WHEN w."startDate"::date = w."endDate"::date THEN
                      LEAST(EXTRACT(EPOCH FROM (w."endDate" - w."startDate")) / 3600, 9.2)
                    ELSE
                      EXTRACT(EPOCH FROM (w."endDate" - w."startDate")) / 3600
                    END
                  /* Caso 2: Ausencia comienza antes del mes y termina después */
                  WHEN w."startDate"::date < ?::date AND w."endDate"::date > ?::date
                  THEN 
                    (?::date - ?::date) * 9.2
                  /* Caso 3: Ausencia comienza antes del mes y termina dentro */
                  WHEN w."startDate"::date < ?::date AND w."endDate"::date <= ?::date
                  THEN 
                    EXTRACT(EPOCH FROM (w."endDate" - ?::timestamp)) / 3600
                  /* Caso 4: Ausencia comienza dentro del mes y termina después */
                  WHEN w."startDate"::date >= ?::date AND w."endDate"::date > ?::date
                  THEN 
                    EXTRACT(EPOCH FROM ((?::date + interval '1 day') - w."startDate")) / 3600
                  ELSE 0
                END
              ), 0
            )
          FROM "workplans" w
          WHERE w."userId" = u.id
            AND w."typeEventId" = 1
            AND (
              (w."startDate"::date >= ?::date AND w."startDate"::date <= ?::date)
              OR (w."endDate"::date >= ?::date AND w."endDate"::date <= ?::date)
              OR (w."startDate"::date <= ?::date AND w."endDate"::date >= ?::date)
            )
        ) AS absences
      FROM 
        "region" r
        INNER JOIN "users" u ON r.id = u."regionId"
      WHERE 
        u."classificationId" = 2
        ${region !== 0 ? 'AND r.id = ?' : ''}
        AND u.status = 'active';
      `;
      
      params = [
        // Realized impacts
        startOfMonth, endOfMonthOrToday,
        startOfMonth, endOfMonthOrToday,
        startOfMonth, endOfMonthOrToday,
        startOfMonth, endOfMonthOrToday,
        
        // Ausencias casos
        startOfMonth, endOfMonth, // Caso 1
        startOfMonth, endOfMonth, // Caso 2
        endOfMonth, startOfMonth, // Caso 2 continuacion: (?::date - ?::date)
        startOfMonth, endOfMonth, // Caso 3
        startOfMonthTimestamp, // Caso 3 continuacion
        startOfMonth, endOfMonth, // Caso 4
        endOfMonth, // Caso 4 continuacion
        
        // Ausencias condiciones de filtro
        startOfMonth, endOfMonth, // Comienza en el mes
        startOfMonth, endOfMonth, // Termina en el mes
        startOfMonth, endOfMonth  // Abarca todo el mes
      ];
      
    } else {
      query = `
      SELECT 
        r.name, 
        u.firstName, 
        u.lastName, 
        u.category,
       (
          SELECT SUM(t.impact) 
          FROM portfolios p
            INNER JOIN thirds_portfolios tp ON p.id = tp.portfolioId
            INNER JOIN third t ON tp.thirdId = t.id
          WHERE p.userId = u.id
            AND tp.approved = true
        ) AS assignedImpacts,
        (
          SELECT SUM(t.impact) 
          FROM portfolios p
            INNER JOIN thirds_portfolios tp ON p.id = tp.portfolioId
            INNER JOIN third t ON tp.thirdId = t.id 
          WHERE p.userId = u.id 
            AND t.typeId = 1
            AND tp.approved = true
        ) AS assignedImpacts_1,
        (
          SELECT SUM(t.impact) 
          FROM portfolios p
            INNER JOIN thirds_portfolios tp ON p.id = tp.portfolioId
            INNER JOIN third t ON tp.thirdId = t.id 
          WHERE p.userId = u.id 
            AND t.typeId = 2
            AND tp.approved = true
        ) AS assignedImpacts_2,
        (
          SELECT SUM(t.impact) 
          FROM portfolios p
            INNER JOIN thirds_portfolios tp ON p.id = tp.portfolioId
            INNER JOIN third t ON tp.thirdId = t.id 
          WHERE p.userId = u.id 
            AND t.typeId = 3
            AND tp.approved = true
        ) AS assignedImpacts_3,
        (
          SELECT 
            COUNT(v.id)
          FROM
            visits v
          WHERE
              v.thirdId in (
              SELECT tp.thirdId 
                  FROM thirds_portfolios tp
                  INNER JOIN portfolios p ON p.id = tp.portfolioId
                  WHERE p.userId = u.id 
              )
            AND DATE(v.date) >= DATE_FORMAT(?, '%Y-%m-01')
          AND DATE(v.date) <= LEAST(LAST_DAY(?), CURDATE())
        ) AS impactsRealized,
        (
          SELECT 
            COUNT(v.id)
          FROM
            visits v
          WHERE
              v.thirdId in (
              SELECT tp.thirdId 
                  FROM thirds_portfolios tp
                  INNER JOIN portfolios p ON p.id = tp.portfolioId
                  WHERE p.userId = u.id
              )
          AND DATE(v.date) >= DATE_FORMAT(?, '%Y-%m-01')
          AND DATE(v.date) <= LEAST(LAST_DAY(?), CURDATE())
          AND v.typeId = 1
        ) AS impactsRealized_1,
        (
          SELECT 
            COUNT(v.id)
          FROM
            visits v
          WHERE
              v.thirdId in (
              SELECT tp.thirdId 
                  FROM thirds_portfolios tp
                  INNER JOIN portfolios p ON p.id = tp.portfolioId
                  WHERE p.userId = u.id
              )
          AND DATE(v.date) >= DATE_FORMAT(?, '%Y-%m-01')
          AND DATE(v.date) <= LEAST(LAST_DAY(?), CURDATE())
          AND v.typeId = 2
        ) AS impactsRealized_2,
        (
          SELECT 
            COUNT(v.id)
          FROM
            visits v
          WHERE
              v.thirdId in (
                SELECT tp.thirdId 
                FROM thirds_portfolios tp
                  INNER JOIN portfolios p ON p.id = tp.portfolioId
                WHERE p.userId = u.id
              )
          AND DATE(v.date) >= DATE_FORMAT(?, '%Y-%m-01')
          AND DATE(v.date) <= LEAST(LAST_DAY(?), CURDATE())
          AND v.typeId = 3
        ) AS impactsRealized_3,
        (
          SELECT COUNT(t.id) 
          FROM portfolios p
            INNER JOIN thirds_portfolios tp ON p.id = tp.portfolioId
            INNER JOIN third t ON tp.thirdId = t.id
          WHERE p.userId = u.id
            AND tp.approved = true
        ) AS assignedPanels,
        (
          SELECT COUNT(t.id) 
          FROM portfolios p
            INNER JOIN thirds_portfolios tp ON p.id = tp.portfolioId
            INNER JOIN third t ON tp.thirdId = t.id 
          WHERE p.userId = u.id 
            AND t.typeId = 1
            AND tp.approved = true
        ) AS assignedPanels_1,
        (
          SELECT COUNT(t.id) 
          FROM portfolios p
            INNER JOIN thirds_portfolios tp ON p.id = tp.portfolioId
            INNER JOIN third t ON tp.thirdId = t.id 
          WHERE p.userId = u.id 
            AND t.typeId = 2
            AND tp.approved = true
        ) AS assignedPanels_2,
        (
          SELECT COUNT(t.id) 
          FROM portfolios p
            INNER JOIN thirds_portfolios tp ON p.id = tp.portfolioId
            INNER JOIN third t ON tp.thirdId = t.id 
          WHERE p.userId = u.id 
            AND t.typeId = 3
            AND tp.approved = true
        ) AS assignedPanels_3,
        /* Cálculo de ausencias */
        (SELECT 
            COALESCE(
              SUM(
                CASE
                  /* Caso 1: Ausencia completamente dentro del mes */
                  WHEN DATE(w.startDate) >= DATE_FORMAT(?, '%Y-%m-01') AND DATE(w.endDate) <= LAST_DAY(?)
                  THEN 
                    IF(DATE(w.startDate) = DATE(w.endDate),
                      LEAST(TIMESTAMPDIFF(MINUTE, w.startDate, w.endDate) / 60, 9.2),
                      TIMESTAMPDIFF(MINUTE, w.startDate, w.endDate) / 60
                    )
                  /* Caso 2: Ausencia comienza antes del mes y termina después */
                  WHEN DATE(w.startDate) < DATE_FORMAT(?, '%Y-%m-01') AND DATE(w.endDate) > LAST_DAY(?)
                  THEN 
                    TIMESTAMPDIFF(DAY, DATE_FORMAT(?, '%Y-%m-01'), LAST_DAY(?)) * 9.2
                  /* Caso 3: Ausencia comienza antes del mes y termina dentro */
                  WHEN DATE(w.startDate) < DATE_FORMAT(?, '%Y-%m-01') AND DATE(w.endDate) <= LAST_DAY(?)
                  THEN 
                    TIMESTAMPDIFF(MINUTE, DATE_FORMAT(?, '%Y-%m-01 00:00:00'), w.endDate) / 60
                  /* Caso 4: Ausencia comienza dentro del mes y termina después */
                  WHEN DATE(w.startDate) >= DATE_FORMAT(?, '%Y-%m-01') AND DATE(w.endDate) > LAST_DAY(?)
                  THEN 
                    TIMESTAMPDIFF(MINUTE, w.startDate, LAST_DAY(?) + INTERVAL 1 DAY - INTERVAL 1 SECOND) / 60
                  ELSE 0
                END
              ), 0
            )
          FROM workplans w
          WHERE w.userId = u.id
            AND w.typeEventId = 1
            AND (
              (DATE(w.startDate) >= DATE_FORMAT(?, '%Y-%m-01') AND DATE(w.startDate) <= LAST_DAY(?))
              OR (DATE(w.endDate) >= DATE_FORMAT(?, '%Y-%m-01') AND DATE(w.endDate) <= LAST_DAY(?))
              OR (DATE(w.startDate) <= DATE_FORMAT(?, '%Y-%m-01') AND DATE(w.endDate) >= LAST_DAY(?))
            )
        ) AS absences
      FROM 
        region r
        INNER JOIN users u ON r.id = u.regionId
      WHERE 
        u.classificationId = 2
        ${region !== 0 ? 'AND r.id = ?' : ''}
        AND u.status = 'active'; 
      `;
      
      params = [
        dateParam, dateParam,
        dateParam, dateParam,
        dateParam, dateParam,
        dateParam, dateParam,
        dateParam, dateParam, // Caso 1
        dateParam, dateParam, // Caso 2
        dateParam, dateParam, // Caso 2 continuación
        dateParam, dateParam, // Caso 3
        dateParam, dateParam, // Caso 3 continuación
        dateParam, dateParam, // Caso 4
        dateParam, // Caso 4 continuación
        dateParam, dateParam, // Comienza en el mes
        dateParam, dateParam, // Termina en el mes
        dateParam, dateParam  // Abarca todo el mes
      ];
    }
    
    if (region !== 0) {
      params.push(region);
    }
    
    // Ejecutar la consulta
    const results = await queryService.executeQuery(query, params);
    
    // Obtener la configuración de horas diarias (valor por defecto: 9.2)
    const dailyHours_config = await Config.findOne({ where: { name: 'daily_hours' } });
    const dailyHours = dailyHours_config ? Number(dailyHours_config.dataValues.value) : 9.2;
    
    // Obtener la configuración de días festivos
    const holidays_config = await Config.findOne({ where: { name: 'holidays' } });
    let holidays = ['07-08-2024', '19-08-2024', '14-10-2024', '04-11-2024', '11-11-2024', '08-12-2024', '25-12-2024']; // Valor por defecto
    
    // Si existe configuración de días festivos, usarla
    if (holidays_config && holidays_config.dataValues.value) {
      try {
        const configHolidays = JSON.parse(holidays_config.dataValues.value);
        if (Array.isArray(configHolidays)) {
          holidays = configHolidays;
        }
      } catch (error) {
        logger.warn("Error al parsear la configuración de días festivos, usando valores por defecto", error);
      }
    }
    
    // Obtener el mes y año para el cálculo de días laborables
    const reportDate = date ? new Date(date) : new Date();
    const reportYear = reportDate.getFullYear();
    const reportMonth = reportDate.getMonth() - 1; // Mes anterior
    
    const workingDays = getWorkingDays(reportYear, reportMonth, 'America/Bogota', holidays);
    
    // Procesar los resultados
    const regions = (results as any[]).reduce((acc: any, current: any) => {
      const hourMonths = workingDays * dailyHours;
      const realHours = hourMonths - (current.absences || 0); // Usar 0 si absences es null
      
      const hoursWorked = realHours / dailyHours;
      const foundRegion = acc.find(r => r.name === current.name);
      
      if (!foundRegion) {
        acc.push({
          name: current.name,
          representatives: [
            {
              name: `${current.firstName} ${current.lastName}`,
              post: current.category,
              assignedImpacts: Number(current.assignedImpacts),
              impactsRealized: Number(current.impactsRealized),
              assignedPanels: Number(current.assignedPanels),
              hoursWorked: hoursWorked.toFixed(2),
              percentageCompliance: Number((Number(current.impactsRealized) / hoursWorked) * 100).toFixed(2),
              averageVisits: Number(Number(current.impactsRealized) / hoursWorked).toFixed(2),
              // --- MEDICO ---
              assignedImpacts_1: Number(current.assignedImpacts_1),
              impactsRealized_1: Number(current.impactsRealized_1),
              assignedPanels_1: Number(current.assignedPanels_1),
              hoursWorked_1: hoursWorked.toFixed(2),
              percentageCompliance_1: Number((Number(current.impactsRealized_1) / hoursWorked) * 100).toFixed(2),
              averageVisits_1: Number(Number(current.impactsRealized_1) / hoursWorked).toFixed(2),
              // --- DOGUERIA ---
              assignedImpacts_2: Number(current.assignedImpacts_2),
              impactsRealized_2: Number(current.impactsRealized_2),
              assignedPanels_2: Number(current.assignedPanels_2),
              hoursWorked_2: hoursWorked.toFixed(2),
              percentageCompliance_2: Number((Number(current.impactsRealized_2) / hoursWorked) * 100).toFixed(2),
              averageVisits_2: Number(Number(current.impactsRealized_2) / hoursWorked).toFixed(2),
              // --- Comercial ---
              assignedImpacts_3: Number(current.assignedImpacts_3),
              impactsRealized_3: Number(current.impactsRealized_3),
              assignedPanels_3: Number(current.assignedPanels_3),
              hoursWorked_3: hoursWorked.toFixed(2),
              percentageCompliance_3: Number((Number(current.impactsRealized_3) / hoursWorked) * 100).toFixed(2),
              averageVisits_3: Number(Number(current.impactsRealized_3) / hoursWorked).toFixed(2),
            }
          ]
        });
      } else {
        foundRegion.representatives.push({
          name: `${current.firstName} ${current.lastName}`,
          post: current.category,
          assignedImpacts: Number(current.assignedImpacts),
          impactsRealized: Number(current.impactsRealized),
          hoursWorked,
          percentageCompliance: Number((Number(current.impactsRealized) / hoursWorked) * 100).toFixed(2),
          averageVisits: Number(Number(current.impactsRealized) / hoursWorked).toFixed(2)
        });
      }
      return acc;
    }, []);
    
    logger.info(`Reporte de impactos por usuario generado`);
    return { regions };
  } catch (error) {
    logger.error("Error al generar reporte de impactos por usuario", error);
    throw error;
  }
};

export {
  generateThirdImpactsReport,
  generateReportImpactsByUser
};


export default {
  generateThirdImpactsReport,
  generateReportImpactsByUser
};
