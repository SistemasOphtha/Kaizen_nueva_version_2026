/**
 * Controlador refactorizado para la gestión de terceros
 */
import { withTransaction } from '../utils/transaction';
import logger from '../utils/logger';
import portfolioService from '../services/portfolio.service';
import { uploadFile } from '../services/s3.service';
import queryService from '../services/query.service';
import { ThirdDTO, 
  ThirdResponseDTO, 
  ErrorResponseDTO, 
  SuccessResponseDTO } from '../dtos';

// Importar modelos
import Third from '../models/Third';
import User from '../models/User';
import ThirdType from '../models/ThirdType';
import ThirdClassification from '../models/ThirdClassification';
import ThirdSpecialty from '../models/ThirdSpecialty';
import ThirdSubSpecialty from '../models/ThirdSubSpecialty';
import Region from '../models/Region';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import Portfolio from '../models/Portfolio';
import Visit from '../models/Visit';
import Justification from '../models/Justification';
import Notification from '../models/Notification';

/**
 * Crea un nuevo tercero
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const createThird = async (req: any, res: any) => {
  try {
    const thirdData = ThirdDTO(req.body);
    const { representative } = req.body;
    const userId = req.userId;
    const rol = req.rol;

    // Usar transacción para garantizar la integridad de los datos
    const result = await withTransaction(async (transaction) => {
      // Verificar si ya existe un tercero con la misma identificación
      const identificationFound = await Third.findOne({
        where: { identification: thirdData.identification },
        transaction
      });

      if (identificationFound) {
        throw new Error("El Tercero ya existe!");
      }

      // Crear el nuevo tercero
      const newThird = await Third.create(thirdData, { transaction });
      logger.info(`Tercero creado con ID: ${newThird.id}`);

      // Crear notificación de nuevo panel creado
      await Notification.create({
        icon: 'material-solid:person_add_alt',
        title: '¡Nuevo panel creado!',
        description: 'Se ha creado un nuevo panel',
        time: new Date(),
        read: false,
        variant: 'success',
        useRouter: true,
        link: '/records/thirds/' + newThird.id,
        image: null
      }, { transaction });

      // Si existe un representante, asignar el tercero a su portafolio
      if (representative) {
        const representativeUser = await User.findOne({
          where: { email: representative },
          transaction
        });

        if (!representativeUser) {
          throw new Error("El representante no existe");
        }

        await portfolioService.assignThirdToUserPortfolio(
          newThird.id, 
          representativeUser.id, 
          false,
          true // skipNotification - ya creamos la notificación manualmente
        );

        // Crear notificación de panel por aprobar
        await Notification.create({
          icon: '',
          title: '¡Nuevo panel por aprobar!',
          description: `El representante ${representativeUser.firstName} ${representativeUser.lastName} tiene un panel por aprobar.`,
          time: new Date(),
          read: false,
          variant: 'warning',
          useRouter: true,
          link: '/records/users/' + representativeUser.id,
          image: null
        }, { transaction });
        
        logger.info(`Tercero asignado al portafolio del representante: ${representativeUser.email}`);
      } 
      // Si el rol es Representante, asignar al portafolio del usuario actual
      else if (rol === "Representante") {
        await portfolioService.assignThirdToUserPortfolio(
          newThird.id, 
          userId, 
          false,
          true // skipNotification - ya creamos la notificación manualmente
        );

        // Obtener datos del usuario para la notificación
        const user = await User.findByPk(userId, { transaction });

        // Crear notificación de panel por aprobar
        await Notification.create({
          icon: '',
          title: '¡Nuevo panel por aprobar!',
          description: `El representante ${user.firstName} ${user.lastName} tiene un panel por aprobar.`,
          time: new Date(),
          read: false,
          variant: 'warning',
          useRouter: true,
          link: '/records/users/' + userId,
          image: null
        }, { transaction });
        
        logger.info(`Tercero asignado al portafolio del usuario: ${userId}`);
      }

      return newThird;
    });

    return res.status(200).json(ThirdResponseDTO(result));
  } catch (error) {
    logger.error("Error al crear tercero", error);
    return res.status(400).json(
      ErrorResponseDTO(error.message || "Error al crear el tercero")
    );
  }
};

/**
 * Elimina múltiples terceros por sus IDs
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const deleteThirdsBulk = async (req: any, res: any) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json(
        ErrorResponseDTO('Debe proporcionar una lista de IDs para eliminar')
      );
    }

    const uniqueIds = [...new Set(ids.map((id) => Number(id)))].filter((id) => Number.isInteger(id));

    if (uniqueIds.length === 0) {
      return res.status(400).json(
        ErrorResponseDTO('Los IDs proporcionados no son válidos')
      );
    }

    const result = {
      deleted: [],
      failed: []
    };

    await withTransaction(async (transaction) => {
      for (const thirdId of uniqueIds) {
        const thirdFound = await Third.findOne({
          where: { id: thirdId },
          transaction
        });

        if (!thirdFound) {
          result.failed.push({ id: thirdId, reason: 'NOT_FOUND' });
          continue;
        }

        const hasPortfolio = await ThirdsPortfolio.findOne({ where: { thirdId }, transaction });
        if (hasPortfolio) {
          result.failed.push({ id: thirdId, reason: 'HAS_PORTFOLIO' });
          continue;
        }

        // TODO: Verificar si el tercero tiene visitas asignadas
        // const hasVisits = await Visit.findOne({ where: { thirdId }, transaction });
        // if (hasVisits) {
        //   result.failed.push({ id: thirdId, reason: 'HAS_VISITS' });
        //   continue;
        // }

        // TODO: Verificar si el tercero tiene justificaciones asignadas
        // const hasJustifications = await Justification.findOne({ where: { thirdId }, transaction });
        // if (hasJustifications) {
        //   result.failed.push({ id: thirdId, reason: 'HAS_JUSTIFICATIONS' });
        //   continue;
        // }

        await Third.destroy({
          where: { id: thirdId },
          transaction
        });

        result.deleted.push(thirdId);
      }
    });

    logger.info(`Eliminación masiva de terceros completada. Eliminados: ${result.deleted.length}, Fallidos: ${result.failed.length}`);
    return res.status(200).json(result);
  } catch (error) {
    logger.error('Error al eliminar múltiples terceros', error);
    return res.status(500).json(
      ErrorResponseDTO('Error al eliminar los terceros seleccionados', 500)
    );
  }
};

/**
 * Obtiene todos los terceros según el rol del usuario
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const getThirds = async (req: any, res: any) => {
  try {
    const userId = req.userId;
    const rol = req.rol;
    
    logger.debug(`Obteniendo terceros para usuario: ${userId}, rol: ${rol}`);

    let thirds;
    
    // Si es administrador, obtener todos los terceros
    if (rol === "Administrador") {
      thirds = await Third.findAll({
        include: [
          {
            model: ThirdType,
            attributes: ["id", "name"]
          },
          {
            model: ThirdClassification,
            attributes: ["id", "name"]
          },
          {
            model: ThirdSpecialty,
            attributes: ["id", "name"]
          },
          {
            model: ThirdSubSpecialty,
            required: false,
            attributes: ["id", "name"]
          },
          {
            model: Region,
            attributes: ["id", "name"]
          },
          {
            model: ThirdsPortfolio,
            required: false,
            include: [
              {
                model: Portfolio,
                include: [
                  {
                    model: User,
                    attributes: ["id", "firstName", "lastName", "email"]
                  }
                ]
              }
            ]
          }
        ],
        order: [["id", "DESC"]]
      });
    } 
    // Si no es administrador, obtener solo los terceros de su portafolio
    else {
      thirds = await Third.findAll({
        include: [
          {
            model: ThirdType,
            attributes: ["id", "name"]
          },
          {
            model: ThirdClassification,
            attributes: ["id", "name"]
          },
          {
            model: ThirdSpecialty,
            attributes: ["id", "name"]
          },
          {
            model: ThirdSubSpecialty,
            attributes: ["id", "name"]
          },
          {
            model: Region,
            attributes: ["id", "name"]
          },
          {
            model: ThirdsPortfolio,
            required: true,
            include: [
              {
                model: Portfolio,
                required: true,
                where: { userId }
              }
            ]
          }
        ],
        where: {
          status: "active"
        }
      });
    }

    logger.info(`Se encontraron ${thirds.length} terceros`);
    
    // Aplicar el DTO a cada tercero, asegurándose de que las relaciones se incluyan
    const formattedThirds = thirds.map(third => {
      // Convertir el modelo Sequelize a un objeto plano para evitar problemas con las propiedades
      const plainThird = third.get({ plain: true });
      return ThirdResponseDTO(plainThird);
    });
    
    return res.status(200).json(formattedThirds);
  } catch (error) {
    logger.error("Error al obtener terceros", error);
    return res.status(500).json(
      ErrorResponseDTO("Error al obtener los terceros", 500)
    );
  }
};

/**
 * Obtiene un tercero por su ID
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const getThirdById = async (req: any, res: any) => {
  try {
    const { thirdId } = req.params;
    
    logger.debug(`Buscando tercero con ID: ${thirdId}`);

    const third = await Third.findOne({
      include: [
        {
          model: ThirdType,
          attributes: ["id", "name"]
        },
        {
          model: ThirdClassification,
          attributes: ["id", "name"]
        },
        {
          model: ThirdSpecialty,
          attributes: ["id", "name"]
        },
        {
          model: ThirdSubSpecialty,
          attributes: ["id", "name"]
        },
        {
          model: Region,
          attributes: ["id", "name"]
        },
        {
          model: ThirdsPortfolio,
          required: false,
          include: [
            {
              model: Portfolio,
              required: false,
              include: [
                {
                  model: User,
                  required: false,
                  attributes: ["id", "firstName", "lastName", "email"],
                }
              ]
            }
          ]
        }
      ],
      where: {
        id: thirdId
      }
    });

    if (!third) {
      logger.warn(`Tercero con ID ${thirdId} no encontrado`);
      return res.status(404).json(
        ErrorResponseDTO("El tercero no existe", 404)
      );
    }

    logger.info(`Tercero encontrado: ${third.name}`);
    
    // Convertir el modelo Sequelize a un objeto plano para evitar problemas con las propiedades
    const plainThird = third.get({ plain: true });
    return res.status(200).json(ThirdResponseDTO(plainThird));
  } catch (error) {
    logger.error(`Error al obtener tercero por ID: ${req.params.thirdId}`, error);
    return res.status(500).json(
      ErrorResponseDTO("Error al obtener el tercero", 500)
    );
  }
};

/**
 * Actualiza un tercero por su ID
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const updateThirdById = async (req: any, res: any) => {
  try {
    const { thirdId } = req.params;
    const thirdData = ThirdDTO(req.body);
    
    logger.debug(`Actualizando tercero con ID: ${thirdId}`);

    const thirdFound = await Third.findByPk(thirdId);

    if (!thirdFound) {
      logger.warn(`Tercero con ID ${thirdId} no encontrado para actualizar`);
      return res.status(404).json(
        ErrorResponseDTO("El tercero que desea actualizar no existe", 404)
      );
    }

    await withTransaction(async (transaction) => {
      await Third.update(thirdData, {
        where: { id: thirdId },
        transaction
      });
    });

    const updatedThird = await Third.findOne({
      include: [
        { model: ThirdType, attributes: ["id", "name"] },
        { model: ThirdClassification, attributes: ["id", "name"] },
        { model: ThirdSpecialty, attributes: ["id", "name"] },
        { model: ThirdSubSpecialty, attributes: ["id", "name"] },
        { model: Region, attributes: ["id", "name"] },
        {
          model: ThirdsPortfolio,
          required: false,
          include: [
            {
              model: Portfolio,
              required: false,
              include: [
                { model: User, required: false, attributes: ["id", "firstName", "lastName", "email"] }
              ]
            }
          ]
        }
      ],
      where: { id: thirdId }
    });

    logger.info(`Tercero con ID ${thirdId} actualizado correctamente`);
    const plainThird = updatedThird.get({ plain: true });
    return res.status(200).json(
      SuccessResponseDTO("Tercero actualizado correctamente", ThirdResponseDTO(plainThird))
    );
  } catch (error) {
    logger.error(`Error al actualizar tercero con ID: ${req.params.thirdId}`, error);
    return res.status(500).json(
      ErrorResponseDTO("Error al actualizar el tercero", 500)
    );
  }
};

/**
 * Elimina un tercero por su ID
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const deleteThirdById = async (req: any, res: any) => {
  try {
    const { thirdId } = req.params;
    
    logger.debug(`Eliminando tercero con ID: ${thirdId}`);

    const thirdFound = await Third.findOne({
      where: { id: thirdId }
    });

    if (!thirdFound) {
      logger.warn(`Tercero con ID ${thirdId} no encontrado para eliminar`);
      return res.status(404).json(
        ErrorResponseDTO("El tercero que desea eliminar no existe", 404)
      );
    }

    // Verificar si el tercero tiene relaciones que impidan su eliminación
    const hasPortfolio = await ThirdsPortfolio.findOne({
      where: { thirdId }
    });

    if (hasPortfolio) {
      logger.warn(`No se puede eliminar tercero con ID ${thirdId}: tiene portafolio asignado`);
      return res.status(400).json(
        ErrorResponseDTO("El tercero tiene un portafolio asignado")
      );
    }

    // TODO: Verificar si el tercero tiene visitas asignadas
    // const hasVisits = await Visit.findOne({
    //   where: { thirdId }
    // });

    // if (hasVisits) {
    //   logger.warn(`No se puede eliminar tercero con ID ${thirdId}: tiene visitas asignadas`);
    //   return res.status(400).json(
    //     ErrorResponseDTO("El tercero tiene visitas asignadas")
    //   );
    // }

    // TODO: Verificar si el tercero tiene justificaciones asignadas
    // const hasJustifications = await Justification.findOne({
    //   where: { thirdId }
    // });

    // if (hasJustifications) {
    //   logger.warn(`No se puede eliminar tercero con ID ${thirdId}: tiene justificaciones asignadas`);
    //   return res.status(400).json(
    //     ErrorResponseDTO("El tercero tiene justificaciones asignadas")
    //   );
    // }

    // Eliminar el tercero
    await withTransaction(async (transaction) => {
      await Third.destroy({
        where: { id: thirdId },
        transaction
      });
    });

    logger.info(`Tercero con ID ${thirdId} eliminado correctamente`);
    return res.status(204).json();
  } catch (error) {
    logger.error(`Error al eliminar tercero con ID: ${req.params.thirdId}`, error);
    return res.status(500).json(
      ErrorResponseDTO("Error al eliminar el tercero", 500)
    );
  }
};

/**
 * Verifica si existe un tercero por su identificación
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const checkThirdById = async (req: any, res: any) => {
  try {
    const { identification } = req.params;
    
    logger.debug(`Verificando existencia de tercero con identificación: ${identification}`);

    const thirdFound = await Third.findOne({
      where: { identification }
    });

    if (!thirdFound) {
      return res.status(200).json({
        thirdId: 0,
        exist: false
      });
    }

    logger.info(`Tercero con identificación ${identification} encontrado`);
    return res.status(200).json({
      thirdId: thirdFound.id,
      exist: true
    });
  } catch (error) {
    logger.error(`Error al verificar tercero con identificación: ${req.params.identification}`, error);
    return res.status(500).json(
      ErrorResponseDTO("Error al verificar el tercero", 500)
    );
  }
};

/**
 * Asigna un tercero al portafolio del usuario actual
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const assignThirdPortfolio = async (req: any, res: any) => {
  try {
    const { thirdId } = req.params;
    const userId = req.userId;
    
    logger.debug(`Asignando tercero ${thirdId} al portafolio del usuario ${userId}`);

    await portfolioService.assignThirdToUserPortfolio(thirdId, userId, false);
    
    logger.info(`Tercero ${thirdId} asignado al portafolio del usuario ${userId}`);
    return res.status(200).json(
      SuccessResponseDTO("Tercero asignado al portafolio correctamente")
    );
  } catch (error) {
    logger.error(`Error al asignar tercero ${req.params.thirdId} al portafolio`, error);
    return res.status(400).json(
      ErrorResponseDTO(error.message || "Error al asignar el tercero al portafolio")
    );
  }
};

/**
 * Desasigna un tercero del portafolio del usuario actual
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const unassignThirdPortfolio = async (req: any, res: any) => {
  try {
    const { thirdId } = req.params;
    const userId = req.userId;
    
    logger.debug(`Desasignando tercero ${thirdId} del portafolio del usuario ${userId}`);

    const result = await portfolioService.removeThirdFromUserPortfolio(thirdId, userId);
    
    if (!result) {
      return res.status(400).json(
        ErrorResponseDTO("No se pudo desasignar el tercero del portafolio")
      );
    }
    
    logger.info(`Tercero ${thirdId} desasignado del portafolio del usuario ${userId}`);
    return res.status(200).json(
      SuccessResponseDTO("Tercero desasignado del portafolio correctamente")
    );
  } catch (error) {
    logger.error(`Error al desasignar tercero ${req.params.thirdId} del portafolio`, error);
    return res.status(400).json(
      ErrorResponseDTO(error.message || "Error al desasignar el tercero del portafolio")
    );
  }
};

/**
 * Desasigna múltiples terceros del portafolio de un usuario (solo admin)
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const unassignThirdsPortfolioByAdminBulk = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const { thirdIds } = req.body;

    if (!Array.isArray(thirdIds) || thirdIds.length === 0) {
      return res.status(400).json(
        ErrorResponseDTO("Debe proporcionar una lista de IDs de terceros para desasignar")
      );
    }

    const uniqueIds = [...new Set(thirdIds.map((id) => Number(id)))].filter((id) => Number.isInteger(id));

    if (uniqueIds.length === 0) {
      return res.status(400).json(
        ErrorResponseDTO("Los IDs proporcionados no son válidos")
      );
    }

    const result = {
      removed: [],
      failed: []
    };

    for (const thirdId of uniqueIds) {
      try {
        const removed = await portfolioService.removeThirdFromUserPortfolio(thirdId, Number(userId));
        if (removed) {
          result.removed.push(thirdId);
        } else {
          result.failed.push({ id: thirdId, reason: 'NOT_FOUND' });
        }
      } catch (error) {
        result.failed.push({ id: thirdId, reason: error.message || 'ERROR' });
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    logger.error(`Error al desasignar múltiples terceros del portafolio por admin para el usuario ${req.params.userId}`, error);
    return res.status(500).json(
      ErrorResponseDTO("Error al desasignar los terceros seleccionados del portafolio")
    );
  }
};

const assignThirdsPortfolioByAdminBulk = async (req: any, res: any) => {
  try {
    const { userId } = req.params;
    const { thirdIds } = req.body;

    if (!Array.isArray(thirdIds) || thirdIds.length === 0) {
      return res.status(400).json(
        ErrorResponseDTO("Debe proporcionar una lista de IDs de terceros para asignar")
      );
    }

    const uniqueIds = [...new Set(thirdIds.map((id) => Number(id)))].filter((id) => Number.isInteger(id));

    if (uniqueIds.length === 0) {
      return res.status(400).json(
        ErrorResponseDTO("Los IDs proporcionados no son válidos")
      );
    }

    const result = {
      assigned: [],
      failed: []
    };

    for (const thirdId of uniqueIds) {
      try {
        await portfolioService.assignThirdToUserPortfolio(thirdId, Number(userId), true);
        result.assigned.push(thirdId);
      } catch (error) {
        result.failed.push({ id: thirdId, reason: error.message || 'ERROR' });
      }
    }

    return res.status(200).json(result);
  } catch (error) {
    logger.error(`Error al asignar múltiples terceros al portafolio por admin para el usuario ${req.params.userId}`, error);
    return res.status(500).json(
      ErrorResponseDTO("Error al asignar los terceros seleccionados al portafolio")
    );
  }
};

/**
 * Desasigna un tercero del portafolio de un usuario (solo admin)
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const unassignThirdPortfolioByAdmin = async (req: any, res: any) => {
  try {
    const { thirdId, userId } = req.params;
    
    logger.debug(`Admin desasignando tercero ${thirdId} del portafolio del usuario ${userId}`);

    const result = await portfolioService.removeThirdFromUserPortfolio(thirdId, userId);
    
    if (!result) {
      return res.status(400).json(
        ErrorResponseDTO("No se pudo desasignar el tercero del portafolio")
      );
    }
    
    logger.info(`Admin desasignó tercero ${thirdId} del portafolio del usuario ${userId}`);
    return res.status(200).json(
      SuccessResponseDTO("Tercero desasignado del portafolio correctamente")
    );
  } catch (error) {
    logger.error(`Error al desasignar tercero ${req.params.thirdId} del portafolio por admin`, error);
    return res.status(400).json(
      ErrorResponseDTO(error.message || "Error al desasignar el tercero del portafolio")
    );
  }
};

/**
 * Asigna un tercero al portafolio de un usuario (solo admin)
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const assignThirdPortfolioByAdmin = async (req: any, res: any) => {
  try {
    const { thirdId, userId } = req.params;
    
    logger.debug(`Admin asignando tercero ${thirdId} al portafolio del usuario ${userId}`);

    await portfolioService.assignThirdToUserPortfolio(thirdId, userId, true);
    
    logger.info(`Admin asignó tercero ${thirdId} al portafolio del usuario ${userId}`);
    return res.status(200).json(
      SuccessResponseDTO("Tercero asignado al portafolio correctamente")
    );
  } catch (error) {
    logger.error(`Error al asignar tercero ${req.params.thirdId} al portafolio por admin`, error);
    return res.status(400).json(
      ErrorResponseDTO(error.message || "Error al asignar el tercero al portafolio")
    );
  }
};

/**
 * Asigna o crea un tercero y lo asigna a un portafolio
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 */
const assignOrCreateThird = async (req: any, res: any) => {
  try {
    const thirdData = ThirdDTO(req.body);
    const { representative } = req.body;
    
    logger.debug(`Asignando o creando tercero con identificación: ${thirdData.identification}`);

    const result = await withTransaction(async (transaction) => {
      // Buscar si el tercero ya existe
      let third = await Third.findOne({
        where: { identification: thirdData.identification },
        transaction
      });

      // Si no existe, crearlo
      if (!third) {
        logger.info(`Creando nuevo tercero con identificación: ${thirdData.identification}`);
        third = await Third.create(thirdData, { transaction });
      } else {
        logger.info(`Tercero con identificación ${thirdData.identification} ya existe`);
      }

      // Si hay representante, asignar el tercero a su portafolio
      if (representative) {
        const representativeUser = await User.findOne({
          where: { email: representative },
          transaction
        });

        if (!representativeUser) {
          throw new Error("El representante no existe");
        }

        // Verificar si ya está asignado al portafolio
        const portfolio = await Portfolio.findOne({
          where: { userId: representativeUser.id },
          transaction
        });

        let alreadyAssigned = false;
        if (portfolio) {
          const existingRelation = await ThirdsPortfolio.findOne({
            where: {
              thirdId: third.id,
              portfolioId: portfolio.id
            },
            transaction
          });
          alreadyAssigned = !!existingRelation;
        }

        // Solo asignar y notificar si no está ya asignado
        if (!alreadyAssigned) {
          await portfolioService.assignThirdToUserPortfolio(
            third.id, 
            representativeUser.id, 
            false,
            true // skipNotification - ya creamos la notificación manualmente
          );

          // Crear notificaciones
          await Notification.create({
            icon: 'material-solid:person_add_alt',
            title: '¡Nuevo panel asignado!',
            description: 'Se ha asignado un nuevo panel al representante',
            time: new Date(),
            read: false,
            variant: 'success',
            useRouter: true,
            link: '/records/thirds/' + third.id,
            image: null
          }, { transaction });

          await Notification.create({
            icon: '',
            title: '¡Nuevo panel por aprobar!',
            description: `El representante ${representativeUser.firstName} ${representativeUser.lastName} tiene un panel por aprobar.`,
            time: new Date(),
            read: false,
            variant: 'warning',
            useRouter: true,
            link: '/records/users/' + representativeUser.id,
            image: null
          }, { transaction });
          
          logger.info(`Tercero asignado al portafolio del representante: ${representativeUser.email}`);
        } else {
          logger.info(`Tercero ya estaba asignado al portafolio del representante: ${representativeUser.email}`);
        }
      }

      return third;
    });

    return res.status(200).json(ThirdResponseDTO(result));
  } catch (error) {
    logger.error("Error al asignar o crear tercero", error);
    return res.status(400).json(
      ErrorResponseDTO(error.message || "Error al asignar o crear el tercero")
    );
  }
};

const uploadHabeasData = async (req: any, res: any) => {
  try {
    const { thirdId } = req.params;
    if (!req.file) {
      return res.status(400).json(ErrorResponseDTO('Debe proporcionar un archivo de consentimiento'));
    }

    const third = await Third.findByPk(thirdId);
    if (!third) {
      return res.status(404).json(ErrorResponseDTO('El panel no existe'));
    }

    const fileUrl = await uploadFile(req.file, 'habeas_data');

    await third.update({
      habeasDataConsent: true,
      habeasDataFileUrl: fileUrl
    });

    return res.status(200).json(SuccessResponseDTO('Consentimiento de Habeas Data guardado correctamente', { fileUrl }));
  } catch (error) {
    logger.error('Error al subir Habeas Data:', error);
    return res.status(500).json(ErrorResponseDTO(error.message || 'Error al guardar el Habeas Data'));
  }
};

const saveSignature = async (req: any, res: any) => {
  try {
    const { thirdId } = req.params;
    const { signature } = req.body;

    if (!signature) {
      return res.status(400).json(ErrorResponseDTO('Debe proporcionar una firma digital'));
    }

    const third = await Third.findByPk(thirdId);
    if (!third) {
      return res.status(404).json(ErrorResponseDTO('El panel no existe'));
    }

    let signatureUrl = signature;
    if (signature.startsWith('data:image')) {
      try {
        const base64Data = signature.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const fileObj = {
          buffer,
          originalname: 'signature.png',
          mimetype: 'image/png'
        };
        signatureUrl = await uploadFile(fileObj, 'signatures');
      } catch (err) {
        logger.error('Error uploading signature image, storing as raw base64 instead', err);
      }
    }

    await third.update({
      habeasDataConsent: true,
      habeasDataSignature: signatureUrl
    });

    return res.status(200).json(SuccessResponseDTO('Firma digital guardada correctamente', { signatureUrl }));
  } catch (error) {
    logger.error('Error al guardar firma:', error);
    return res.status(500).json(ErrorResponseDTO(error.message || 'Error al guardar la firma digital'));
  }
};

export {
  createThird,
  getThirdById,
  getThirds,
  updateThirdById,
  deleteThirdById,
  deleteThirdsBulk,
  checkThirdById,
  assignThirdPortfolio,
  unassignThirdPortfolio,
  unassignThirdPortfolioByAdmin,
  assignThirdPortfolioByAdmin,
  assignOrCreateThird,
  unassignThirdsPortfolioByAdminBulk,
  assignThirdsPortfolioByAdminBulk,
  uploadHabeasData,
  saveSignature
};
