import { DataTypes } from 'sequelize';
import dbConection from '../database';

const UserClassification = dbConection.define('user_classification', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   permissions: {
      type: DataTypes.JSON,
      allowNull: true
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

// Las relaciones se definen en User.js

export default UserClassification;
