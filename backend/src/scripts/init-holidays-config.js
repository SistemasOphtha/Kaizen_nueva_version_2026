/**
 * Script para inicializar la configuración de días festivos
 * Ejecutar con: node src/scripts/init-holidays-config.js
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

async function initHolidaysConfig() {
  try {
    // Buscar si ya existe la configuración de días festivos
    let holidaysConfig = await Config.findOne({ where: { name: 'holidays' } });
    
    if (holidaysConfig) {
      logger.info('La configuración de días festivos ya existe.');
      process.exit(0);
    } else {
      logger.info('Creando configuración de días festivos...');
      
      // Crear nueva configuración
      await Config.create({
        name: 'holidays',
        label: 'Días Festivos',
        type: 'custom',
        value: JSON.stringify(defaultHolidays)
      });
      
      logger.info('Configuración de días festivos creada correctamente.');
      process.exit(0);
    }
  } catch (error) {
    logger.error('Error al inicializar configuración de días festivos:', error);
    process.exit(1);
  }
}

// Ejecutar la función
initHolidaysConfig();
