import { DataTypes } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { SECRET, SECRET_REFRESH } from '../config';
import dbConection from '../database';

import UserClassification from './UserClassification';
import Region from './Region';

import UserCategory from './UserCategory';

const User = dbConection.define('users', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   firstName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   lastName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
         notEmpty: true
      }
   },
   email: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      validate: {
         isEmail: true
      }
   },
   phone: {
      type: DataTypes.STRING(15),
      allowNull: true
   },
   mobile: {
      type: DataTypes.STRING(15),
      allowNull: true
   },
   password: {
      type: DataTypes.STRING(180),
      allowNull: false
   },
   categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
   },
   classificationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Eliminamos las referencias aquí para evitar índices duplicados
   },
   regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Eliminamos las referencias aquí para evitar índices duplicados
   },
   coordinatorId: {
      type: DataTypes.INTEGER,
      allowNull: true
   },
   permissions: {
      type: DataTypes.JSON,
      allowNull: true
   },
   shortcuts: {
      type: DataTypes.JSON,
      allowNull: true
   },
   twoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   },
   twoFactorSecret: {
      type: DataTypes.STRING(255),
      allowNull: true
   },
   twoFactorMethod: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: 'totp'
   },
   email2FactorCode: {
      type: DataTypes.STRING(10),
      allowNull: true
   },
   email2FactorExpires: {
      type: DataTypes.DATE,
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

(
   async () => {
      // Definir relaciones en ambos sentidos
      User.belongsTo(UserClassification, {foreignKey: 'classificationId'});
      UserClassification.hasMany(User, {foreignKey: 'classificationId'});

      User.belongsTo(UserCategory, {foreignKey: 'categoryId'});
      UserCategory.hasMany(User, {foreignKey: 'categoryId'});
      
      User.belongsTo(Region, {foreignKey: 'regionId'});
      Region.hasMany(User, {foreignKey: 'regionId'});

      User.belongsTo(User, { as: 'coordinator', foreignKey: 'coordinatorId' });
      User.hasMany(User, { as: 'representatives', foreignKey: 'coordinatorId' });
   }
)();


// Generar token de autenticación para el usuario
User.prototype.generateAuthToken = function (user) {
   const token = jwt.sign({ 
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      classificationId: user.classificationId
   }, SECRET, { expiresIn: '12h' });
   return token;
};

// Generar token refresh de autenticación para el usuario
User.prototype.generateAuthTokenRefresh = function (user) {
   const token = jwt.sign({ 
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      classificationId: user.classificationId
   }, SECRET_REFRESH, { expiresIn: '24h' });
   return token;
};

// Validar token de autenticación para el usuario
User.prototype.validateAuthToken = function (token) {
   try {
      const decoded = jwt.verify(token, SECRET);
      return decoded;
   } catch (error) {
      return null;
   }
};

// Validar token de autenticación para el usuario
User.prototype.refreshToken = function (token) {
   try {
      
      const decoded = jwt.verify(token, SECRET_REFRESH) as any;

      const tokenGen = jwt.sign({
         id: decoded.id,
         firstName: decoded.firstName,
         lastName: decoded.lastName,
         email: decoded.email,
         classificationId: decoded.classificationId
      
      }, SECRET, { expiresIn: '12h' });

      return {
         token: tokenGen,
         id: decoded.id
      };
   } catch (error) {
      console.log(error);
      return null;
   }
};

// Comparar la contraseña del usuario con la que ingresaron
User.prototype.comparePassword = async function (password, passwordFound) {
   return await bcrypt.compare(password, passwordFound);
};

User.prototype.encryptPassword = async function (password) {
   const salt = await bcrypt.genSalt(10);
   return bcrypt.hash(password, salt);
};

export default User;