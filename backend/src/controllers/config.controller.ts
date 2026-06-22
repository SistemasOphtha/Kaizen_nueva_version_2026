import Sequelize, { Op } from 'sequelize';
import Config from '../models/Config';
import logger from '../utils/logger';
import User from '../models/User';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import Third from '../models/Third';
import Visit from '../models/Visit';
import Justification from '../models/Justification';
import moment from 'moment-timezone';
import { closeMonthLogic } from '../services/closeMonth.service';

const createConfig = async (req: any, res: any) => {
    try {
        const {
            name,
            label,
            type,
            value
        } = req.body;

        const newConfig = await Config.create({
            name,
            label,
            type: type || "custom",
            value
        });

        return res.status(200).json(newConfig);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error.errors);
    }
};

const getConfigs = async (req: any, res: any) => {
    const configs = await Config.findAll();
    return res.json(configs);
};

const updateConfigById = async (req: any, res: any) => {
    try {
        const { configId } = req.params;

        const configFound = await Config.findByPk(configId);

        if (!configFound) {
            return res
                .status(400)
                .json({ message: "El elemento no existe" });
        }

        await Config.update(req.body, {
            where: { id: configId },
            fields: [
                "value"
            ],
        });

        res.status(200).json(configFound);
    } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
    }
};

const updateAllFields = async (req: any, res: any) => {
    try {
        const resp = await Config.bulkCreate(req.body, {
            updateOnDuplicate: ["value"],
        })

        return res.status(200).json({
            message: "Configuraciones actualizadas",
            data: resp
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
    }
}

/**
 * Obtiene la configuración de días festivos
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const getHolidays = async (req: any, res: any) => {
    try {
        const holidaysConfig = await Config.findOne({ where: { name: 'holidays' } });
        
        if (!holidaysConfig) {
            return res.status(404).json({
                message: "No se encontró la configuración de días festivos"
            });
        }
        
        let holidays = [];
        try {
            holidays = JSON.parse(holidaysConfig.value);
        } catch (error) {
            logger.error("Error al parsear la configuración de días festivos", error);
        }
        
        return res.status(200).json({
            holidays
        });
    } catch (error) {
        logger.error("Error al obtener días festivos", error);
        return res.status(500).json({
            message: "Error al obtener días festivos",
            error: error.message
        });
    }
};

/**
 * Actualiza la configuración de días festivos
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const updateHolidays = async (req: any, res: any) => {
    try {
        // Registrar la solicitud para depuración
        logger.info(`Solicitud de actualización de días festivos recibida. Usuario: ${req.userId}`);
        logger.debug(`Datos recibidos: ${JSON.stringify(req.body)}`);
        
        const { holidays } = req.body;
        
        if (!Array.isArray(holidays)) {
            logger.warn(`Formato incorrecto de días festivos: ${typeof holidays}`);
            return res.status(400).json({
                message: "El formato de días festivos es incorrecto. Debe ser un array."
            });
        }
        
        // Validar formato de fechas (DD-MM-YYYY)
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        const invalidDates = holidays.filter(date => !dateRegex.test(date));
        
        if (invalidDates.length > 0) {
            logger.warn(`Fechas con formato incorrecto: ${invalidDates.join(', ')}`);
            return res.status(400).json({
                message: "Algunas fechas tienen formato incorrecto. Use DD-MM-YYYY.",
                invalidDates
            });
        }
        
        // Buscar configuración existente
        let holidaysConfig = await Config.findOne({ where: { name: 'holidays' } });
        logger.debug(`Configuración existente: ${holidaysConfig ? 'Sí' : 'No'}`);
        
        if (holidaysConfig) {
            // Actualizar configuración existente
            holidaysConfig.value = JSON.stringify(holidays);
            await holidaysConfig.save();
            logger.info(`Configuración de días festivos actualizada. ID: ${holidaysConfig.id}`);
        } else {
            // Crear nueva configuración
            holidaysConfig = await Config.create({
                name: 'holidays',
                label: 'Días Festivos',
                type: 'custom',
                value: JSON.stringify(holidays)
            });
            logger.info(`Nueva configuración de días festivos creada. ID: ${holidaysConfig.id}`);
        }
        
        return res.status(200).json({
            message: "Días festivos actualizados correctamente",
            holidays
        });
    } catch (error) {
        logger.error(`Error al actualizar días festivos: ${error.message}`, error);
        return res.status(500).json({
            message: "Error al actualizar días festivos",
            error: error.message
        });
    }
};

const closeMonth = async (req: any, res: any) => {
  try {
    const { date } = req.body;
    let targetDate: moment.Moment | undefined;
    
    if (date) {
      targetDate = moment(date);
    }

    const result = await closeMonthLogic(targetDate);

    return res.status(200).json({
      message: `Cierre de mes para ${result.monthName} ${result.year} completado con éxito.`,
      justificationsCreated: result.justificationsCreated,
      details: result.details
    });
  } catch (error: any) {
    logger.error("Error en el cierre de mes", error);
    return res.status(500).json({
      message: "Error en el cierre de mes",
      error: error.message
    });
  }
};

export {
  createConfig,
    getConfigs,
    updateConfigById,
    updateAllFields,
    getHolidays,
    updateHolidays,
    closeMonth
};
