import dbConection from '../database';
import { DataTypes } from 'sequelize';
import User from './User';
import TypeEvent from './TypeEvent';

const WorkPlan = dbConection.define('workplans', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Eliminamos las referencias aquí para evitar índices duplicados
   },
   typeEventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Eliminamos las referencias aquí para evitar índices duplicados
   },
   startDate: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   endDate: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   description: {
      type: DataTypes.TEXT,
      allowNull: false,
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
      //await WorkPlan.sync();
      WorkPlan.belongsTo(User, { foreignKey: 'userId' })
      WorkPlan.belongsTo(TypeEvent, { foreignKey: 'typeEventId' })
   }
)();

export default WorkPlan;