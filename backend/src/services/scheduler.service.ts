import moment from 'moment-timezone';
import Config from '../models/Config';
import logger from '../utils/logger';
import { closeMonthLogic } from './closeMonth.service';
import { processBirthdays } from './birthday.service';

const CHECK_INTERVAL_MS = 60 * 60 * 1000; // Ejecutar verificación cada hora

/**
 * Inicia el planificador de tareas en segundo plano
 */
export const startScheduler = () => {
  logger.info('[Scheduler] Iniciando demonio de tareas programadas...');

  // Ejecución inmediata al iniciar y luego programada cada hora
  runSchedulerChecks();
  setInterval(runSchedulerChecks, CHECK_INTERVAL_MS);
};

const runSchedulerChecks = async () => {
  try {
    const todayStr = moment().format('YYYY-MM-DD');
    const previousMonthStr = moment().subtract(1, 'month').format('YYYY-MM');

    logger.debug(`[Scheduler] Corriendo verificaciones de tareas. Hoy: ${todayStr}, Mes anterior a cerrar: ${previousMonthStr}`);

    // --- 1. Verificación de Cumpleaños Diarios ---
    let bdayConfig = await Config.findOne({ where: { name: 'last_birthday_check' } });
    
    if (!bdayConfig || bdayConfig.value !== todayStr) {
      logger.info(`[Scheduler] Ejecutando envío de cumpleaños diario. Última ejecución: ${bdayConfig ? bdayConfig.value : 'Ninguna'}`);
      
      await processBirthdays();
      
      if (bdayConfig) {
        bdayConfig.value = todayStr;
        await bdayConfig.save();
      } else {
        await Config.create({
          name: 'last_birthday_check',
          label: 'Última verificación de cumpleaños',
          type: 'custom',
          value: todayStr
        });
      }
    }

    // --- 2. Verificación de Cierre de Mes Automatizado ---
    let closeMonthConfig = await Config.findOne({ where: { name: 'last_closed_month' } });

    if (!closeMonthConfig || closeMonthConfig.value !== previousMonthStr) {
      logger.info(`[Scheduler] Ejecutando cierre de mes automático para el mes anterior. Última ejecución: ${closeMonthConfig ? closeMonthConfig.value : 'Ninguna'}`);
      
      await closeMonthLogic();

      if (closeMonthConfig) {
        closeMonthConfig.value = previousMonthStr;
        await closeMonthConfig.save();
      } else {
        await Config.create({
          name: 'last_closed_month',
          label: 'Último mes cerrado e impactos justificados',
          type: 'custom',
          value: previousMonthStr
        });
      }
    }

  } catch (error) {
    logger.error('[Scheduler] Error en la ejecución de verificaciones programadas:', error);
  }
};
