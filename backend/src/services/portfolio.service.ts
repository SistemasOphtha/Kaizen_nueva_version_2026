/**
 * Servicio para la gestión de portafolios
 * Centraliza la lógica de negocio relacionada con portafolios
 */
import { withTransaction } from '../utils/transaction';
import Portfolio from '../models/Portfolio';
import ThirdsPortfolio from '../models/ThirdsPortfolio';
import Third from '../models/Third';
import User from '../models/User';
import Notification from '../models/Notification';

/**
 * Busca o crea un portafolio para un usuario
 * @param {number} userId - ID del usuario
 * @param {object} transaction - Transacción de Sequelize (opcional)
 * @returns {Promise<object>} - Portafolio encontrado o creado
 */
const findOrCreatePortfolio = async (userId, transaction = null) => {
  const options = transaction ? { transaction } : {};
  
  // Buscar el portafolio existente
  const existingPortfolio = await Portfolio.findOne({
    where: { userId },
    ...options
  });

  if (existingPortfolio) {
    return existingPortfolio;
  }

  // Crear un nuevo portafolio si no existe
  const newPortfolio = await Portfolio.create({
    name: `Portafolio de Usuario #${userId}`,
    userId,
    status: 'active'
  }, options);

  return newPortfolio;
};

/**
 * Asigna un tercero a un portafolio
 * @param {number} thirdId - ID del tercero
 * @param {number} portfolioId - ID del portafolio
 * @param {boolean} approved - Si está aprobado o no
 * @param {object} transaction - Transacción de Sequelize (opcional)
 * @returns {Promise<object>} - Relación creada
 */
const assignThirdToPortfolio = async (thirdId, portfolioId, approved = false, transaction = null) => {
  const options = transaction ? { transaction } : {};
  
  // Verificar si ya existe la relación
  const existingRelation = await ThirdsPortfolio.findOne({
    where: {
      thirdId,
      portfolioId
    },
    ...options
  });

  if (existingRelation) {
    return existingRelation;
  }

  // Crear la relación si no existe
  const newRelation = await ThirdsPortfolio.create({
    thirdId,
    portfolioId,
    approved,
    status: 'active'
  }, options);

  return newRelation;
};

/**
 * Asigna un tercero al portafolio de un usuario
 * @param {number} thirdId - ID del tercero
 * @param {number} userId - ID del usuario
 * @param {boolean} approved - Si está aprobado o no
 * @param {boolean} skipNotification - Si se debe omitir la creación de notificación (para evitar duplicados)
 * @returns {Promise<boolean>} - Resultado de la operación
 */
const assignThirdToUserPortfolio = async (thirdId, userId, approved = false, skipNotification = false) => {
  return await withTransaction(async (transaction) => {
    // Verificar que el tercero existe
    const third = await Third.findByPk(thirdId, { transaction });
    if (!third) {
      throw new Error('El tercero no existe');
    }

    // Buscar o crear el portafolio
    const portfolio = await findOrCreatePortfolio(userId, transaction);
    
    // Asignar el tercero al portafolio
    const relation = await assignThirdToPortfolio(thirdId, portfolio.id, approved, transaction);
    
    // Si no está aprobado y no se debe omitir la notificación, crear notificación
    if (!approved && !skipNotification) {
      const user = await User.findByPk(userId, { transaction });
      
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
    }
    
    return relation;
  });
};

/**
 * Elimina un tercero del portafolio de un usuario
 * @param {number} thirdId - ID del tercero
 * @param {number} userId - ID del usuario
 * @returns {Promise<boolean>} - Resultado de la operación
 */
const removeThirdFromUserPortfolio = async (thirdId, userId) => {
  return await withTransaction(async (transaction) => {
    // Buscar el portafolio
    const portfolio = await Portfolio.findOne({
      where: { userId },
      transaction
    });
    
    if (!portfolio) {
      throw new Error('El usuario no tiene un portafolio');
    }
    
    // Eliminar la relación
    const result = await ThirdsPortfolio.destroy({
      where: {
        thirdId,
        portfolioId: portfolio.id
      },
      transaction
    });
    
    return result > 0;
  });
};

/**
 * Actualiza el estado de aprobación de un tercero en un portafolio
 * @param {number} thirdId - ID del tercero
 * @param {number} userId - ID del usuario dueño del portafolio
 * @param {boolean} approved - Nuevo estado de aprobación
 * @returns {Promise<boolean>} - Resultado de la operación
 */
const updateThirdApprovalStatus = async (thirdId, userId, approved) => {
  return await withTransaction(async (transaction) => {
    // Buscar el portafolio
    const portfolio = await Portfolio.findOne({
      where: { userId },
      transaction
    });
    
    if (!portfolio) {
      throw new Error('El usuario no tiene un portafolio');
    }
    
    // Actualizar el estado de aprobación
    const [updated] = await ThirdsPortfolio.update({
      approved
    }, {
      where: {
        thirdId,
        portfolioId: portfolio.id
      },
      transaction
    });
    
    return updated > 0;
  });
};

/**
 * Obtiene todos los terceros de un portafolio
 * @param {number} userId - ID del usuario dueño del portafolio
 * @param {boolean} onlyApproved - Si solo se deben devolver los aprobados
 * @returns {Promise<Array>} - Lista de terceros
 */
const getPortfolioThirds = async (userId, onlyApproved = false) => {
  // Buscar el portafolio
  const portfolio = await Portfolio.findOne({
    where: { userId }
  });
  
  if (!portfolio) {
    return [];
  }
  
  // Buscar las relaciones
  const relations = await ThirdsPortfolio.findAll({
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
  
  return relations.map(relation => relation.Third);
};

export {
  findOrCreatePortfolio,
  assignThirdToPortfolio,
  assignThirdToUserPortfolio,
  removeThirdFromUserPortfolio,
  updateThirdApprovalStatus,
  getPortfolioThirds
};


export default {
  findOrCreatePortfolio,
  assignThirdToPortfolio,
  assignThirdToUserPortfolio,
  removeThirdFromUserPortfolio,
  updateThirdApprovalStatus,
  getPortfolioThirds
};
