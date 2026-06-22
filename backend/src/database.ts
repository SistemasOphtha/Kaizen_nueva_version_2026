import { Sequelize, Options } from 'sequelize';
import { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } from './config';

// Configuración de la conexión a la base de datos
const dbConection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: (process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql') || 'mysql',
  port: DB_PORT,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // Configuración para manejar errores de conexión
  retry: {
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /ETIMEDOUT/,
      /ESOCKETTIMEDOUT/,
      /EHOSTUNREACH/,
      /EPIPE/,
      /EAI_AGAIN/,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/
    ] as any[],
    max: 5
  }
} as Options);

// Función para verificar la conexión
export const testConnection = async (): Promise<boolean> => {
  try {
    await dbConection.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
    return true;
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    return false;
  }
};

export default dbConection;
