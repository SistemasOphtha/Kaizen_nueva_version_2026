import { Transaction } from 'sequelize';
import dbConection from '../database';

/**
 * Ejecuta una función dentro de una transacción
 */
export const withTransaction = async <T>(callback: (t: Transaction) => Promise<T>): Promise<T> => {
  const transaction = await dbConection.transaction();
  
  try {
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
