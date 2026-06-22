/**
 * Script para verificar si el usuario tiene permisos de administrador
 * Ejecutar con: node src/scripts/check-admin-permissions.js
 */
const User = require('../models/User');
const UserClassification = require('../models/UserClassification');
const logger = require('../utils/logger');
require('../database');

// ID de usuario a verificar (reemplazar con el ID real)
const userId = 1; // Cambiar por el ID del usuario que está intentando actualizar los días festivos

async function checkAdminPermissions() {
  try {
    logger.info(`Verificando permisos de administrador para el usuario ${userId}...`);
    
    const user = await User.findByPk(userId, {
      include: [
        {
          model: UserClassification
        },
      ],
    });
    
    if (!user) {
      logger.error(`Usuario con ID ${userId} no encontrado`);
      process.exit(1);
    }
    
    const userRole = user.dataValues.user_classification.name;
    logger.info(`El usuario tiene el rol: ${userRole}`);
    
    if (userRole === "Administrador") {
      logger.info(`El usuario tiene permisos de administrador`);
    } else {
      logger.warn(`El usuario NO tiene permisos de administrador`);
    }
    
    process.exit(0);
  } catch (error) {
    logger.error(`Error al verificar permisos de administrador: ${error.message}`, error);
    process.exit(1);
  }
}

// Ejecutar la función
checkAdminPermissions();
