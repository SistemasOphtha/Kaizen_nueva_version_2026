/**
 * Controlador para la gestión de portafolios
 */
import portfolioService from '../services/portfolio.service';
import logger from '../utils/logger';
import { withTransaction } from '../utils/transaction';
import { PortfolioResponseDTO, ErrorResponseDTO, SuccessResponseDTO } from '../dtos';

// Importar modelos
import Third from '../models/Third';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import User from '../models/User';

/**
 * Obtiene los portafolios asociados a un tercero
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const getPortfolioByThirdId = async (req: any, res: any) => {
  try {
    const { thirdId } = req.params;
    
    logger.debug(`Obteniendo portafolios para tercero con ID: ${thirdId}`);

    const third = await Third.findOne({
      where: {
        id: thirdId,
      },
    });

    if (!third) {
      logger.warn(`Tercero con ID ${thirdId} no encontrado`);
      return res.status(404).json(
        ErrorResponseDTO("El tercero no existe", 404)
      );
    }

    const portfolios = await ThirdsPortfolio.findAll({
      where: {
        thirdId,
      },
      include: {
        model: Portfolio,
        include: [
          {
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'email']
          }
        ]
      },
    });

    logger.info(`Se encontraron ${portfolios.length} portafolios para el tercero ${thirdId}`);
    return res.status(200).json(portfolios);
  } catch (error) {
    logger.error(`Error al obtener portafolios para tercero ${req.params.thirdId}`, error);
    return res.status(500).json(
      ErrorResponseDTO("Error al obtener los portafolios", 500)
    );
  }
};

/**
 * Obtiene el portafolio de un usuario
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const getUserPortfolio = async (req: any, res: any) => {
  try {
    const userId = req.params.userId || req.userId;
    
    logger.debug(`Obteniendo portafolio para usuario con ID: ${userId}`);

    const portfolio = await Portfolio.findOne({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ]
    });

    if (!portfolio) {
      logger.info(`No se encontró portafolio para el usuario ${userId}`);
      return res.status(200).json(null);
    }

    logger.info(`Portafolio encontrado para el usuario ${userId}`);
    return res.status(200).json(PortfolioResponseDTO(portfolio));
  } catch (error) {
    logger.error(`Error al obtener portafolio para usuario ${req.params.userId || req.userId}`, error);
    return res.status(500).json(
      ErrorResponseDTO("Error al obtener el portafolio", 500)
    );
  }
};

/**
 * Crea o actualiza un portafolio para un usuario
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const createOrUpdatePortfolio = async (req: any, res: any) => {
  try {
    const userId = req.params.userId || req.userId;
    const { name } = req.body;
    
    logger.debug(`Creando o actualizando portafolio para usuario con ID: ${userId}`);

    const result = await withTransaction(async (transaction) => {
      // Buscar portafolio existente
      let portfolio = await Portfolio.findOne({
        where: { userId },
        transaction
      });

      // Si existe, actualizar
      if (portfolio) {
        await Portfolio.update(
          { name: name || `Portafolio de Usuario #${userId}` },
          {
            where: { id: portfolio.id },
            transaction
          }
        );
        
        portfolio = await Portfolio.findOne({
          where: { id: portfolio.id },
          transaction
        });
        
        logger.info(`Portafolio actualizado para el usuario ${userId}`);
      } 
      // Si no existe, crear
      else {
        portfolio = await Portfolio.create({
          name: name || `Portafolio de Usuario #${userId}`,
          userId,
          status: 'active'
        }, { transaction });
        
        logger.info(`Portafolio creado para el usuario ${userId}`);
      }

      return portfolio;
    });

    return res.status(200).json(
      SuccessResponseDTO(
        "Portafolio creado o actualizado correctamente", 
        PortfolioResponseDTO(result)
      )
    );
  } catch (error) {
    logger.error(`Error al crear o actualizar portafolio para usuario ${req.params.userId || req.userId}`, error);
    return res.status(500).json(
      ErrorResponseDTO("Error al crear o actualizar el portafolio", 500)
    );
  }
};

/**
 * Obtiene los terceros de un portafolio
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const getPortfolioThirds = async (req: any, res: any) => {
  try {
    const userId = req.params.userId || req.userId;
    const onlyApproved = req.query.approved === 'true';
    
    logger.debug(`Obteniendo terceros del portafolio para usuario con ID: ${userId}`);

    const portfolio = await Portfolio.findOne({
      where: { userId }
    });

    if (!portfolio) {
      logger.warn(`No se encontró portafolio para el usuario ${userId}`);
      return res.status(200).json([]);
    }

    const thirdsPortfolio = await ThirdsPortfolio.findAll({
      where: {
        portfolioId: portfolio.id,
        ...(onlyApproved ? { approved: true } : {})
      },
      include: [
        {
          model: Third,
          required: true
        }
      ]
    });

    const thirds = thirdsPortfolio.map(tp => tp.Third);
    
    logger.info(`Se encontraron ${thirds.length} terceros en el portafolio del usuario ${userId}`);
    return res.status(200).json(thirds);
  } catch (error) {
    logger.error(`Error al obtener terceros del portafolio para usuario ${req.params.userId || req.userId}`, error);
    return res.status(500).json(
      ErrorResponseDTO("Error al obtener los terceros del portafolio", 500)
    );
  }
};

export {
  getPortfolioByThirdId,
  getUserPortfolio,
  createOrUpdatePortfolio,
  getPortfolioThirds
};
