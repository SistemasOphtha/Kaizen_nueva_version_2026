/**
 * Script para configurar los días festivos en la base de datos
 * Ejecutar con: node src/scripts/setup-holidays-config.js
 */
const Config = require('../models/Config');
const logger = require('../utils/logger');
require('../database');

// Días festivos por defecto para 2024
const defaultHolidays = [
  '01-01-2024', // Año Nuevo
  '08-01-2024', // Día de los Reyes Magos
  '19-03-2024', // Día de San José
  '28-03-2024', // Jueves Santo
  '29-03-2024', // Viernes Santo
  '01-05-2024', // Día del Trabajo
  '13-05-2024', // Día de la Ascensión
  '03-06-2024', // Corpus Christi
  '10-06-2024', // Sagrado Corazón
  '01-07-2024', // San Pedro y San Pablo
  '20-07-2024', // Día de la Independencia
  '07-08-2024', // Batalla de Boyacá
  '19-08-2024', // La Asunción de la Virgen
  '14-10-2024', // Día de la Raza
  '04-11-2024', // Todos los Santos
  '11-11-2024', // Independencia de Cartagena
  '08-12-2024', // Día de la Inmaculada Concepción
  '25-12-2024'  // Navidad
];

async function setupHolidaysConfig() {
  try {
    // Buscar si ya existe la configuración de días festivos
    let holidaysConfig = await Config.findOne({ where: { name: 'holidays' } });
    
    if (holidaysConfig) {
      logger.info('La configuración de días festivos ya existe. Actualizando...');
      
      // Actualizar la configuración existente
      holidaysConfig.value = JSON.stringify(defaultHolidays);
      await holidaysConfig.save();
      
      logger.info('Configuración de días festivos actualizada correctamente.');
    } else {
      logger.info('Creando nueva configuración de días festivos...');
      
      // Crear nueva configuración
      await Config.create({
        name: 'holidays',
        value: JSON.stringify(defaultHolidays),
        description: 'Días festivos en formato DD-MM-YYYY'
      });
      
      logger.info('Configuración de días festivos creada correctamente.');
    }
    
    // Verificar si existe la configuración de horas diarias
    const dailyHoursConfig = await Config.findOne({ where: { name: 'daily_hours' } });
    
    if (!dailyHoursConfig) {
      logger.info('Creando configuración de horas diarias...');
      
      // Crear configuración de horas diarias
      await Config.create({
        name: 'daily_hours',
        value: '9.2',
        description: 'Horas laborables por día'
      });
      
      logger.info('Configuración de horas diarias creada correctamente.');
    }
    
    logger.info('Configuración completada con éxito.');
    process.exit(0);
  } catch (error) {
    logger.error('Error al configurar días festivos:', error);
    process.exit(1);
  }
}

// Ejecutar la función
setupHolidaysConfig();
