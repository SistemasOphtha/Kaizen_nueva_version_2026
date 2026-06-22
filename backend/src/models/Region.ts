import { DataTypes } from 'sequelize';
import dbConection from '../database';

const Region = dbConection.define('region', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: DataTypes.STRING(50),
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

// Las relaciones se definen en los modelos que usan Region
// No es necesario definir relaciones aquí ya que se definen en User.js y Third.js

export default Region;