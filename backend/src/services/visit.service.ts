/**
 * Servicio para la gestión de visitas
 * Centraliza la lógica de negocio relacionada con visitas
 */
import { Op } from 'sequelize';
import { withTransaction } from '../utils/transaction';
import queryService from './query.service';
import logger from '../utils/logger';
import Visit from '../models/Visit';
import Third from '../models/Third';
import User from '../models/User';
import ThirdType from '../models/ThirdType';
import CalendarEvent from '../models/CalendarEvent';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import moment from 'moment-timezone';

const generateUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

function getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Radius of earth in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

/**
 * Crea una nueva visita
 * @param {object} visitData - Datos de la visita
 * @param {number} userId - ID del usuario que crea la visita
 * @returns {Promise<object>} - Visita creada
 */
const createVisit = async (visitData, userId) => {
  return await withTransaction(async (transaction) => {
    // Validar periodo del mes actual
    const visitDate = moment(visitData.date);
    const now = moment();
    if (visitDate.year() !== now.year() || visitDate.month() !== now.month()) {
      throw new Error('No se pueden registrar visitas fuera del mes calendario actual.');
    }

    // Verificar que el tercero existe
    const third = await Third.findByPk(visitData.thirdId, { transaction });
    if (!third) {
      throw new Error('El tercero no existe');
    }

    // Verificar que el tipo existe
    const thirdType = await ThirdType.findByPk(visitData.typeId, { transaction });
    if (!thirdType) {
      throw new Error('El tipo no existe');
    }

    // Verificar que el usuario tiene un portafolio
    const portfolio = await Portfolio.findOne({
      where: { userId },
      transaction
    });

    if (!portfolio) {
      throw new Error('El usuario no tiene un portafolio asociado');
    }

    // Verificar que el tercero está en el portafolio del usuario
    const thirdPortfolio = await ThirdsPortfolio.findOne({
      where: {
        portfolioId: portfolio.id,
        thirdId: visitData.thirdId
      },
      transaction
    });

    if (!thirdPortfolio) {
      throw new Error('El tercero no está asociado al usuario');
    }

    // Verificar que el tercero está aprobado
    if (thirdPortfolio.approved === false) {
      throw new Error('El tercero no está aprobado');
    }

    // Validar y auditar geolocalización
    let isVerified = false;
    const repLat = visitData.latitude;
    const repLng = visitData.longitude;

    if (repLat !== undefined && repLat !== null && repLng !== undefined && repLng !== null) {
      const thirdLat = (third as any).latitude;
      const thirdLng = (third as any).longitude;

      if (thirdLat !== null && thirdLat !== undefined && thirdLng !== null && thirdLng !== undefined) {
        const distance = getDistanceInMeters(repLat, repLng, thirdLat, thirdLng);
        if (distance <= 100) {
          isVerified = true;
        }
      } else {
        // Aprender en primera visita
        await Third.update(
          { latitude: repLat, longitude: repLng },
          { where: { id: third.id }, transaction }
        );
        isVerified = true;
        logger.info(`Coordenadas iniciales auto-establecidas para el Tercero con ID ${third.id}`);
      }
    }

    // Crear la visita
    const newVisit = await Visit.create(
      {
        ...visitData,
        userId,
        latitude: repLat || null,
        longitude: repLng || null,
        isVerified,
        status: 'active'
      },
      { transaction }
    );

    const titleSource = visitData.objective || third.name || 'Visita';
    const eventTitle =
      titleSource.length > 20 ? `${titleSource.substring(0, 20)}...` : titleSource;

    await CalendarEvent.create(
      {
        id: generateUUID(),
        title: eventTitle,
        allDay: true,
        start: visitData.date,
        end: visitData.date,
        extendedProps: {
          desc: visitData.objective || '',
          label: 1,
          component: {
            id: newVisit.id,
            type: 'visits',
            route: `/apps/visits/${newVisit.id}`
          }
        }
      },
      { transaction }
    );

    logger.info(`Visita creada con ID: ${newVisit.id}`);
    return newVisit;
  });
};

/**
 * Obtiene una visita por su ID
 * @param {number} visitId - ID de la visita
 * @returns {Promise<object>} - Visita encontrada
 */
const getVisitById = async (visitId) => {
  const visit = await Visit.findByPk(visitId, {
    include: [
      {
        model: Third,
        required: true
      },
      {
        model: ThirdType,
        required: true
      },
      {
        model: User,
        required: true
      }
    ]
  });

  if (!visit) {
    throw new Error('La visita no existe');
  }

  return visit;
};

/**
 * Obtiene todas las visitas según filtros
 * @param {object} filters - Filtros para la consulta
 * @param {number} userId - ID del usuario
 * @param {string} rol - Rol del usuario
 * @returns {Promise<Array>} - Lista de visitas
 */
const getVisits = async (filters, userId, rol) => {
  const { startDate, endDate, thirdId, representativeId } = filters;
  const where: any = {};

  // Filtrar por fecha
  if (startDate && endDate) {
    where.date = {
      [Op.between]: [startDate, endDate]
    };
  }

  // Filtrar por tercero
  if (thirdId) {
    where.thirdId = thirdId;
  }

  // Filtrar por usuario según el rol
  if (rol === 'Coordinador') {
    const representatives = await User.findAll({
      where: { coordinatorId: userId },
      attributes: ['id']
    });
    const repIds = representatives.map((r: any) => r.id);
    repIds.push(userId); // Incluir al propio coordinador

    if (representativeId) {
      const filterRepId = Number(representativeId);
      if (repIds.includes(filterRepId)) {
        where.userId = filterRepId;
      } else {
        where.userId = -1; // Forzar resultado vacío si no es de su equipo
      }
    } else {
      where.userId = {
        [Op.in]: repIds
      };
    }
  } else if (rol !== 'Administrador') {
    where.userId = userId;
  } else {
    // Si es Administrador y filtra por representante
    if (representativeId) {
      where.userId = Number(representativeId);
    }
  }

  // Obtener las visitas
  const visits = await Visit.findAll({
    where,
    include: [
      {
        model: Third,
        required: true
      },
      {
        model: ThirdType,
        required: true
      },
      {
        model: User,
        required: true
      }
    ],
    order: [['date', 'DESC']]
  });

  return visits;
};

/**
 * Actualiza una visita
 * @param {number} visitId - ID de la visita
 * @param {object} visitData - Datos a actualizar
 * @returns {Promise<object>} - Visita actualizada
 */
const updateVisit = async (visitId, visitData) => {
  return await withTransaction(async (transaction) => {
    // Verificar que la visita existe
    const visit = await Visit.findByPk(visitId, { transaction });
    if (!visit) {
      throw new Error('La visita no existe');
    }

    // Validar si la visita existente pertenece a un mes anterior
    const existingDate = moment(visit.date);
    const now = moment();
    if (existingDate.year() !== now.year() || existingDate.month() !== now.month()) {
      throw new Error('No se pueden modificar visitas de meses anteriores finalizados.');
    }

    // Validar si la nueva fecha está en el mes actual
    if (visitData.date) {
      const newDate = moment(visitData.date);
      if (newDate.year() !== now.year() || newDate.month() !== now.month()) {
        throw new Error('No se pueden asignar visitas a fechas fuera del mes calendario actual.');
      }
    }

    // Actualizar la visita
    await Visit.update(visitData, {
      where: { id: visitId },
      fields: ['date', 'objective', 'comment', 'status', 'latitude', 'longitude', 'isVerified'],
      transaction
    });

    // Obtener la visita actualizada
    const updatedVisit = await Visit.findByPk(visitId, {
      include: [
        {
          model: Third,
          required: true
        },
        {
          model: ThirdType,
          required: true
        },
        {
          model: User,
          required: true
        }
      ],
      transaction
    });

    logger.info(`Visita con ID ${visitId} actualizada`);
    return updatedVisit;
  });
};

/**
 * Elimina una visita
 * @param {number} visitId - ID de la visita
 * @returns {Promise<boolean>} - Resultado de la operación
 */
const deleteVisit = async (visitId) => {
  return await withTransaction(async (transaction) => {
    // Verificar que la visita existe
    const visit = await Visit.findByPk(visitId, { transaction });
    if (!visit) {
      throw new Error('La visita no existe');
    }

    // Validar si la visita existente pertenece a un mes anterior
    const existingDate = moment(visit.date);
    const now = moment();
    if (existingDate.year() !== now.year() || existingDate.month() !== now.month()) {
      throw new Error('No se pueden eliminar visitas de meses anteriores finalizados.');
    }

    // Eliminar eventos de calendario asociados
    await queryService.deleteCalendarEventsByComponent('visits', visitId);

    // Eliminar la visita
    await Visit.destroy({
      where: { id: visitId },
      transaction
    });

    logger.info(`Visita con ID ${visitId} eliminada`);
    return true;
  });
};

export {
  createVisit,
  getVisitById,
  getVisits,
  updateVisit,
  deleteVisit
};


export default {
  createVisit,
  getVisitById,
  getVisits,
  updateVisit,
  deleteVisit
};
