/**
 * Sistema de logging para la aplicación
 * Reemplaza los console.log por un sistema más robusto
 */

// Niveles de log
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

// Nivel actual basado en el entorno
const currentLevel = process.env.NODE_ENV === 'production' 
  ? LOG_LEVELS.WARN  // En producción, solo mostrar advertencias y errores
  : LOG_LEVELS.DEBUG; // En desarrollo, mostrar todo

/**
 * Formatea un mensaje de log
 */
const formatMessage = (level: string, message: string, meta: any = {}) => {
  const timestamp = new Date().toISOString();
  const metaString = Object.keys(meta).length > 0 
    ? `\n${JSON.stringify(meta, null, 2)}` 
    : '';
  
  return `[${timestamp}] [${level}] ${message}${metaString}`;
};

/**
 * Loggea un mensaje de error
 */
export const error = (message: string, err: any = {}) => {
  if (currentLevel >= LOG_LEVELS.ERROR) {
    const meta = err instanceof Error 
      ? { message: err.message, stack: err.stack } 
      : err;
    
    console.error(formatMessage('ERROR', message, meta));
  }
};

/**
 * Loggea una advertencia
 */
export const warn = (message: string, meta: any = {}) => {
  if (currentLevel >= LOG_LEVELS.WARN) {
    console.warn(formatMessage('WARN', message, meta));
  }
};

/**
 * Loggea información
 */
export const info = (message: string, meta: any = {}) => {
  if (currentLevel >= LOG_LEVELS.INFO) {
    console.info(formatMessage('INFO', message, meta));
  }
};

/**
 * Loggea mensajes de depuración
 */
export const debug = (message: string, meta: any = {}) => {
  if (currentLevel >= LOG_LEVELS.DEBUG) {
    console.debug(formatMessage('DEBUG', message, meta));
  }
};

export default {
  error,
  warn,
  info,
  debug
};
