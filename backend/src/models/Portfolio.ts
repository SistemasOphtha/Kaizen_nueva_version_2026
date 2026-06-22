import { DataTypes } from 'sequelize';
import dbConection from '../database';
import User from './User';

const Portfolio = dbConection.define('portfolios', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: DataTypes.STRING(80),
      allowNull: false
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
      User.hasMany(Portfolio, { foreignKey: 'userId' });
      Portfolio.belongsTo(User, { foreignKey: 'userId' });
      // Las relaciones ya están definidas correctamente en ambos sentidos
   }
)();

export default Portfolio;