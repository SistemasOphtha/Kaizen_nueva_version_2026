/**
 * Controlador refactorizado para la gestión de visitas
 */
import visitService from '../services/visit.service';
import logger from '../utils/logger';
import { ErrorResponseDTO, SuccessResponseDTO } from '../dtos';

/**
 * Crea una nueva visita
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const createVisit = async (req: any, res: any) => {
  try {
    const visitData = req.body;
    const userId = req.userId;
    
    logger.debug(`Creando visita para tercero: ${visitData.thirdId}`);
    
    const newVisit = await visitService.createVisit(visitData, userId);
    
    logger.info(`Visita creada con ID: ${newVisit.id}`);
    return res.status(201).json(newVisit);
  } catch (error) {
    logger.error("Error al crear visita", error);
    return res.status(400).json(
      ErrorResponseDTO(error.message || "Error al crear la visita")
    );
  }
};

/**
 * Obtiene una visita por su ID
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const getVisitById = async (req: any, res: any) => {
  try {
    const { visitId } = req.params;
    
    logger.debug(`Obteniendo visita con ID: ${visitId}`);
    
    const visit = await visitService.getVisitById(visitId);
    
    logger.info(`Visita encontrada: ${visit.id}`);
    return res.status(200).json(visit);
  } catch (error) {
    logger.error(`Error al obtener visita con ID: ${req.params.visitId}`, error);
    return res.status(404).json(
      ErrorResponseDTO(error.message || "Error al obtener la visita", 404)
    );
  }
};

/**
 * Obtiene todas las visitas según filtros
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const getVisits = async (req: any, res: any) => {
  try {
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      thirdId: req.query.thirdId
    };
    const userId = req.userId;
    const rol = req.rol;
    
    logger.debug(`Obteniendo visitas con filtros: ${JSON.stringify(filters)}`);
    
    const visits = await visitService.getVisits(filters, userId, rol);
    
    logger.info(`Se encontraron ${visits.length} visitas`);
    return res.status(200).json(visits);
  } catch (error) {
    logger.error("Error al obtener visitas", error);
    return res.status(500).json(
      ErrorResponseDTO("Error al obtener las visitas", 500)
    );
  }
};

/**
 * Actualiza una visita por su ID
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const updateVisitById = async (req: any, res: any) => {
  try {
    const { visitId } = req.params;
    const visitData = req.body;
    
    logger.debug(`Actualizando visita con ID: ${visitId}`);
    
    const updatedVisit = await visitService.updateVisit(visitId, visitData);
    
    logger.info(`Visita actualizada: ${updatedVisit.id}`);
    return res.status(200).json(updatedVisit);
  } catch (error) {
    logger.error(`Error al actualizar visita con ID: ${req.params.visitId}`, error);
    return res.status(400).json(
      ErrorResponseDTO(error.message || "Error al actualizar la visita")
    );
  }
};

/**
 * Elimina una visita por su ID
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const deleteVisitById = async (req: any, res: any) => {
  try {
    const { visitId } = req.params;
    
    logger.debug(`Eliminando visita con ID: ${visitId}`);
    
    await visitService.deleteVisit(visitId);
    
    logger.info(`Visita eliminada: ${visitId}`);
    return res.status(204).json();
  } catch (error) {
    logger.error(`Error al eliminar visita con ID: ${req.params.visitId}`, error);
    return res.status(400).json(
      ErrorResponseDTO(error.message || "Error al eliminar la visita")
    );
  }
};

export {
  createVisit,
  getVisitById,
  getVisits,
  updateVisitById,
  deleteVisitById
};
