/**
 * Script para actualizar el esquema de la tabla de configuración
 * Ejecutar con: node src/scripts/update-config-schema.js
 */
const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');
const dbConection = require('../database');

async function updateConfigSchema() {
  try {
    logger.info('Iniciando actualización del esquema de la tabla de configuración...');
    
    // Modificar la columna value para que sea de tipo TEXT
    await dbConection.query(`
      ALTER TABLE configs 
      MODIFY COLUMN value TEXT NOT NULL;
    `);
    
    logger.info('Esquema de la tabla de configuración actualizado correctamente.');
    process.exit(0);
  } catch (error) {
    logger.error('Error al actualizar el esquema de la tabla de configuración:', error);
    process.exit(1);
  }
}

// Ejecutar la función
updateConfigSchema();
