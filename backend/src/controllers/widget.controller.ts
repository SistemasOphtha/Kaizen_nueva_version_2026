/**
 * Controlador refactorizado para la gestión de widgets
 */
import widgetService from '../services/widget.service';
import reportsService from '../services/reports.service';
import impactsService from '../services/impacts.service';
import reportsExportService from '../services/reports.export.service';
import logger from '../utils/logger';
import { ErrorResponseDTO } from '../dtos';

/**
 * Obtiene datos para widgets de seguimiento
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const trackingAlert = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const rol = req.rol;
    const filters = req.query;
    
    logger.debug(`Obteniendo datos de alertas de seguimiento para usuario: ${userId}, rol: ${rol} con filtros: ${JSON.stringify(filters)}`);
    
    const widgets = await widgetService.getTrackingAlertData(userId, rol, filters);
    
    logger.info(`Datos de alertas de seguimiento obtenidos correctamente`);
    return res.status(200).json(widgets);
  } catch (error) {
    logger.error("Error al obtener datos de alertas de seguimiento", error);
    return res.status(500).json(
      ErrorResponseDTO("Error al obtener datos de alertas de seguimiento", 500)
    );
  }
};

/**
 * Obtiene datos de impacto por tipo de tercero
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const filterImpacts = async (req: any, res: any) => {
  try {
    const filter = req.body;
    
    logger.debug(`Obteniendo datos de impacto por tipo con filtros: ${JSON.stringify(filter)}`);
    
    const data = await widgetService.getImpactsByType(filter);
    
    if (!data) {
      return res.status(400).json(
        ErrorResponseDTO("Filtros no válidos o no implementados")
      );
    }
    
    logger.info(`Datos de impacto por tipo obtenidos correctamente`);
    return res.status(200).json(data);
  } catch (error) {
    logger.error("Error al obtener datos de impacto por tipo", error);
    return res.status(500).json(
      ErrorResponseDTO("Error al obtener datos de impacto por tipo", 500)
    );
  }
};

/**
 * Genera reportes de terceros
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const reportsWidget = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const rol = req.rol;
    const filter = req.query.filter;
    
    logger.debug(`Generando reporte de terceros con filtro: ${filter || 'ninguno'}`);
    
    // Decodificar y parsear el filtro si existe
    let filters = null;
    if (filter && filter !== '') {
      try {
        const decodedString = Buffer.from(filter, 'base64').toString('utf8');
        filters = JSON.parse(decodedString);
        logger.debug(`Filtros decodificados: ${JSON.stringify(filters)}`);
      } catch (error) {
        logger.error(`Error al decodificar filtros: ${error.message}`);
      }
    }
    
    // Generar el reporte
    const thirdsReport = await reportsService.generateThirdsReport(filters, userId, rol);
    
    logger.info(`Reporte generado con ${thirdsReport.count} terceros`);
    return res.status(200).json({
      thirdsReport
    });
  } catch (error) {
    logger.error("Error al generar reporte de terceros", error);
    return res.status(500).json(
      ErrorResponseDTO("Error al generar reporte de terceros", 500)
    );
  }
};

/**
 * Obtiene datos de impacto para widgets
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const impactsWidget = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const rol = req.rol;
    const filter = req.query.filter;
    
    logger.debug(`Obteniendo datos de impacto para usuario: ${userId}, rol: ${rol}`);
    
    // Decodificar y parsear el filtro si existe
    let filters = null;
    if (filter && filter !== '') {
      try {
        const decodedString = Buffer.from(filter, 'base64').toString('utf8');
        filters = JSON.parse(decodedString);
        logger.debug(`Filtros decodificados: ${JSON.stringify(filters)}`);
      } catch (error) {
        logger.error(`Error al decodificar filtros: ${error.message}`);
      }
    }
    
    // Obtener datos de impacto
    const impactsData = await impactsService.getImpactsWidgetData(userId, rol, filters);
    
    logger.info(`Datos de impacto obtenidos correctamente para usuario ${userId}`);
    return res.status(200).json(impactsData);
  } catch (error) {
    logger.error("Error al obtener datos de impacto", error);
    return res.status(500).json(
      ErrorResponseDTO("Error al obtener datos de impacto", 500)
    );
  }
};

/**
 * Genera reporte de impactos de terceros
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const thirdImpactsReport = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const rol = req.rol;
    
    logger.debug(`Generando reporte de impactos de terceros para usuario: ${userId}, rol: ${rol}`);
    
    // Generar el reporte
    const thirdImpactsObject = await reportsExportService.generateThirdImpactsReport(userId, rol);
    
    logger.info(`Reporte de impactos de terceros generado correctamente`);
    return res.status(200).json(thirdImpactsObject);
  } catch (error) {
    logger.error("Error al generar reporte de impactos de terceros", error);
    return res.status(500).json(
      ErrorResponseDTO("Error al generar reporte de impactos de terceros", 500)
    );
  }
};

/**
 * Genera reporte de impactos por usuario
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const reportImpactsByUser = async (req: any, res: any) => {
  try {
    const filter = req.query.filter;
    
    logger.debug(`Generando reporte de impactos por usuario con filtro: ${filter || 'ninguno'}`);
    
    // Decodificar y parsear el filtro si existe
    let filters = null;
    if (filter && filter !== '') {
      try {
        const decodedString = Buffer.from(filter, 'base64').toString('utf8');
        filters = JSON.parse(decodedString);
        logger.debug(`Filtros decodificados: ${JSON.stringify(filters)}`);
      } catch (error) {
        logger.error(`Error al decodificar filtros: ${error.message}`);
      }
    }
    
    // Generar el reporte
    const report = await reportsExportService.generateReportImpactsByUser(filters);
    
    logger.info(`Reporte de impactos por usuario generado correctamente`);
    return res.status(200).json({
      report: {
        all: report
      },
      message: 'Reporte generado con éxito'
    });
  } catch (error) {
    logger.error("Error al generar reporte de impactos por usuario", error);
    return res.status(500).json(
      ErrorResponseDTO("Error al generar reporte de impactos por usuario", 500)
    );
  }
};

export {
  trackingAlert,
  filterImpacts,
  reportsWidget,
  impactsWidget,
  thirdImpactsReport,
  reportImpactsByUser
};
