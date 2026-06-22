import dbConection from '../database';
import { DataTypes } from 'sequelize';
import Third from './Third';
import ThirdType from './ThirdType';
import User from './User';

const Visits = dbConection.define('visits', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   thirdId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   date: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   objective: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
   comment: {
      type: DataTypes.TEXT,
      allowNull: true,
   },
   latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
   },
   longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
   },
   isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
      // Definir relaciones en ambos sentidos
      Visits.belongsTo(Third, { foreignKey: 'thirdId' });
      Third.hasMany(Visits, { foreignKey: 'thirdId' });
      
      Visits.belongsTo(ThirdType, { foreignKey: 'typeId' });
      ThirdType.hasMany(Visits, { foreignKey: 'typeId' });
      
      Visits.belongsTo(User, { foreignKey: 'userId' });
      User.hasMany(Visits, { foreignKey: 'userId' });
   }
)();

export default Visits;