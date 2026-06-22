/**
 * Script para probar la API de días festivos directamente
 * Ejecutar con: node src/scripts/test-holidays-api.js
 */
const axios = require('axios');
const logger = require('../utils/logger');

// URL base de la API (ajustar según corresponda)
const API_BASE_URL = 'http://localhost:3001/api';

// Token de autenticación (reemplazar con un token válido)
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Reemplazar con un token válido

// Días festivos de prueba
const testHolidays = [
  '01-01-2024', // Año Nuevo
  '08-01-2024', // Día de los Reyes Magos
  '19-03-2024', // Día de San José
  '28-03-2024', // Jueves Santo
  '29-03-2024'  // Viernes Santo
];

async function testHolidaysAPI() {
  try {
    logger.info('Probando API de días festivos...');
    
    // Configurar axios con el token de autenticación
    const axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Probar GET /api/configs/holidays
    logger.info('Probando GET /api/configs/holidays...');
    try {
      const getResponse = await axiosInstance.get('/configs/holidays');
      logger.info(`Respuesta GET: ${JSON.stringify(getResponse.data)}`);
    } catch (error) {
      logger.error(`Error en GET: ${error.message}`);
      if (error.response) {
        logger.error(`Detalles del error: ${JSON.stringify(error.response.data)}`);
      }
    }
    
    // Probar PUT /api/configs/holidays
    logger.info('Probando PUT /api/configs/holidays...');
    try {
      const putResponse = await axiosInstance.put('/configs/holidays', { holidays: testHolidays });
      logger.info(`Respuesta PUT: ${JSON.stringify(putResponse.data)}`);
    } catch (error) {
      logger.error(`Error en PUT: ${error.message}`);
      if (error.response) {
        logger.error(`Detalles del error: ${JSON.stringify(error.response.data)}`);
      }
    }
    
    process.exit(0);
  } catch (error) {
    logger.error(`Error al probar API de días festivos: ${error.message}`, error);
    process.exit(1);
  }
}

// Ejecutar la función
testHolidaysAPI();
