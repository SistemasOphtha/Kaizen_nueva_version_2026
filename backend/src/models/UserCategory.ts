import { DataTypes } from 'sequelize';
import dbConection from '../database';

const UserCategory = dbConection.define('userCategories', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
         notEmpty: true
      }
   },
   canCreate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   },
   canRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
   },
   canUpdate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   },
   canDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   }
});

export default UserCategory;
