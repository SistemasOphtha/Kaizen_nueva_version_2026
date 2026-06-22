import { DataTypes } from 'sequelize';
import dbConection from '../database';
import Third from './Third';
import Portfolio from './Portfolio';

const ThirdsPortfolio = dbConection.define('thirds_portfolios', {
   portfolioId: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   thirdId: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
   },
   status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active'
   }
}, {
   freezeTableName: true,
   timestamps: true,
   updatedAt: 'updatedAt',
   paranoid: true,
   deletedAt: 'deletedAt',
});

(
   async () => {
      Third.hasMany(ThirdsPortfolio, { foreignKey: 'thirdId' });
      ThirdsPortfolio.belongsTo(Third, { foreignKey: 'thirdId' });
      Portfolio.hasMany(ThirdsPortfolio, { foreignKey: 'portfolioId' });
      ThirdsPortfolio.belongsTo(Portfolio, { foreignKey: 'portfolioId' });
      // Las relaciones ya están definidas correctamente en ambos sentidos
   }
)();

export default ThirdsPortfolio;