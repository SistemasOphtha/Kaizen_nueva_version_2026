/**
 * Ejemplo de cómo usar el módulo de transacciones
 * Este archivo es solo un ejemplo y no se ejecuta en la aplicación
 */

const { withTransaction } = require('../utils/transaction');
const Third = require('../models/Third');
const Portfolio = require('../models/Portfolio');
const ThirdsPortfolio = require('../models/ThirdsPortfolio');

/**
 * Ejemplo de cómo crear un tercero y asignarlo a un portafolio
 * usando el módulo de transacciones
 */
const createThirdAndAssignToPortfolio = async (thirdData, portfolioId) => {
  return await withTransaction(async (transaction) => {
    // Crear el tercero
    const newThird = await Third.create(thirdData, { transaction });
    
    // Asignar el tercero al portafolio
    const newThirdsPortfolio = await ThirdsPortfolio.create({
      thirdId: newThird.id,
      portfolioId,
      approved: false,
      status: 'active'
    }, { transaction });
    
    return {
      third: newThird,
      thirdsPortfolio: newThirdsPortfolio
    };
  });
};

/**
 * Ejemplo de cómo actualizar un tercero y su relación con un portafolio
 * usando el módulo de transacciones
 */
const updateThirdAndPortfolioRelation = async (thirdId, thirdData, portfolioId, approved) => {
  return await withTransaction(async (transaction) => {
    // Actualizar el tercero
    await Third.update(thirdData, {
      where: { id: thirdId },
      transaction
    });
    
    // Actualizar la relación con el portafolio
    await ThirdsPortfolio.update(
      { approved },
      {
        where: {
          thirdId,
          portfolioId
        },
        transaction
      }
    );
    
    // Obtener los datos actualizados
    const updatedThird = await Third.findByPk(thirdId, { transaction });
    const updatedRelation = await ThirdsPortfolio.findOne({
      where: {
        thirdId,
        portfolioId
      },
      transaction
    });
    
    return {
      third: updatedThird,
      thirdsPortfolio: updatedRelation
    };
  });
};

module.exports = {
  createThirdAndAssignToPortfolio,
  updateThirdAndPortfolioRelation
};
