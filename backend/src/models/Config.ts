import { DataTypes } from 'sequelize';
import dbConection from '../database';

const Config = dbConection.define('configs', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   label: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   value: {
      type: DataTypes.TEXT,
      allowNull: false
   },
   type: {
      type: DataTypes.ENUM('system', 'custom'),
      allowNull: false,
      defaultValue: 'system'
   }
}, {
   freezeTableName: true,
   timestamps: true,
   updatedAt: 'updatedAt',
   paranoid: true,
   deletedAt: 'deletedAt',
});

// No es necesario sincronizar individualmente, se sincroniza en index.js

export default Config;