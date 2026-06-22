import { DataTypes } from 'sequelize';
import dbConection from '../database';
import User from './User';

const SessionLog = dbConection.define('session_logs', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true
   },
   userAgent: {
      type: DataTypes.TEXT,
      allowNull: true
   },
   loginTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
   },
   logoutTime: {
      type: DataTypes.DATE,
      allowNull: true
   },
   duration: {
      type: DataTypes.INTEGER,
      allowNull: true
   },
   details: {
      type: DataTypes.JSON,
      allowNull: true
   }
}, {
   freezeTableName: true,
   timestamps: true,
   updatedAt: 'updatedAt',
   paranoid: true,
   deletedAt: 'deletedAt',
});

(async () => {
   SessionLog.belongsTo(User, { foreignKey: 'userId' });
   User.hasMany(SessionLog, { foreignKey: 'userId' });
})();

export default SessionLog;
