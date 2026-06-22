import dbConection from '../database';
import { DataTypes } from 'sequelize';
import Region from './Region';
import ThirdClassification from './ThirdClassification';
import ThirdSpecialty from './ThirdSpecialty';
import ThirdSubSpecialty from './ThirdSubSpecialty';
import ThirdType from './ThirdType';

const Third = dbConection.define('third', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   typeIdentification: {
      type: DataTypes.STRING(50),
      allowNull: false,
   },
   identification: {
      type: DataTypes.STRING(50),
      allowNull: false,
   },
   name: {
      type: DataTypes.STRING(50),
      allowNull: false,
   },
   additionalName: {
      type: DataTypes.STRING(50),
      allowNull: true,
   },
   address: {
      type: DataTypes.STRING(50),
      allowNull: false,
   },
   phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
   },
   mobile: {
      type: DataTypes.STRING(50),
      allowNull: false,
   },
   email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
         isEmail: true
      }
   },
   city: {
      type: DataTypes.STRING(50),
      allowNull: false,
   },
   birthday: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
   },
   impact: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   supplied: {
      type: DataTypes.STRING(50),
      allowNull: true,
   },
   habeasDataConsent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   },
   habeasDataFileUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
   },
   habeasDataSignature: {
      type: DataTypes.TEXT,
      allowNull: true
   },
   typeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
   },
   classificationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
   },
   specialtyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
   },
   subSpecialtyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
   },
   regionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
   },
   longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
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
      Third.belongsTo(Region, {foreignKey: 'regionId'});
      Region.hasMany(Third, {foreignKey: 'regionId'});
      
      Third.belongsTo(ThirdClassification, {foreignKey: 'classificationId'});
      ThirdClassification.hasMany(Third, {foreignKey: 'classificationId'});
      
      Third.belongsTo(ThirdSpecialty, {foreignKey: 'specialtyId'});
      ThirdSpecialty.hasMany(Third, {foreignKey: 'specialtyId'});
      
      Third.belongsTo(ThirdSubSpecialty, {foreignKey: 'subSpecialtyId'});
      ThirdSubSpecialty.hasMany(Third, {foreignKey: 'subSpecialtyId'});
      
      Third.belongsTo(ThirdType, {foreignKey: 'typeId'});
      ThirdType.hasMany(Third, {foreignKey: 'typeId'});
   }
)();

export default Third;