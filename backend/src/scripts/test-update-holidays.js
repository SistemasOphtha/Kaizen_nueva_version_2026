/**
 * Script para probar la actualización de días festivos directamente
 * Ejecutar con: node src/scripts/test-update-holidays.js
 */
const Config = require('../models/Config');
const logger = require('../utils/logger');
require('../database');

// Días festivos de prueba
const testHolidays = [
  '01-01-2024', // Año Nuevo
  '08-01-2024', // Día de los Reyes Magos
  '19-03-2024', // Día de San José
  '28-03-2024', // Jueves Santo
  '29-03-2024'  // Viernes Santo
];

async function testUpdateHolidays() {
  try {
    logger.info('Probando actualización de días festivos...');
    
    // Buscar configuración existente
    let holidaysConfig = await Config.findOne({ where: { name: 'holidays' } });
    logger.debug(`Configuración existente: ${holidaysConfig ? 'Sí' : 'No'}`);
    
    if (holidaysConfig) {
      // Mostrar valor actual
      try {
        const currentHolidays = JSON.parse(holidaysConfig.value);
        logger.info(`Días festivos actuales: ${JSON.stringify(currentHolidays)}`);
      } catch (error) {
        logger.warn(`Error al parsear días festivos actuales: ${error.message}`);
      }
      
      // Actualizar configuración existente
      holidaysConfig.value = JSON.stringify(testHolidays);
      await holidaysConfig.save();
      logger.info(`Configuración de días festivos actualizada. ID: ${holidaysConfig.id}`);
    } else {
      // Crear nueva configuración
      holidaysConfig = await Config.create({
        name: 'holidays',
        label: 'Días Festivos',
        type: 'custom',
        value: JSON.stringify(testHolidays)
      });
      logger.info(`Nueva configuración de días festivos creada. ID: ${holidaysConfig.id}`);
    }
    
    // Verificar la actualización
    const updatedConfig = await Config.findOne({ where: { name: 'holidays' } });
    if (updatedConfig) {
      try {
        const updatedHolidays = JSON.parse(updatedConfig.value);
        logger.info(`Días festivos actualizados: ${JSON.stringify(updatedHolidays)}`);
      } catch (error) {
        logger.warn(`Error al parsear días festivos actualizados: ${error.message}`);
      }
    }
    
    process.exit(0);
  } catch (error) {
    logger.error(`Error al probar actualización de días festivos: ${error.message}`, error);
    process.exit(1);
  }
}

// Ejecutar la función
testUpdateHolidays();
