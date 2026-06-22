import axios from 'axios';
import { HolidaysResponseType, HolidaysRequestType } from '../types/HolidaysType';

/**
 * Obtiene los días festivos
 * @returns {Promise<HolidaysResponseType>} - Respuesta con los días festivos
 */
export const getHolidays = async (): Promise<HolidaysResponseType> => {
  const response = await axios.get<HolidaysResponseType>('/api/configs/holidays');
  return response.data;
};

/**
 * Actualiza los días festivos
 * @param {HolidaysRequestType} data - Datos de días festivos a actualizar
 * @returns {Promise<HolidaysResponseType>} - Respuesta con los días festivos actualizados
 */
export const updateHolidays = async (data: HolidaysRequestType): Promise<HolidaysResponseType> => {
  const response = await axios.put<HolidaysResponseType>('/api/configs/holidays', data);
  return response.data;
};
