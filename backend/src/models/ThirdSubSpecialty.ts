import dbConection from '../database';
import { DataTypes } from 'sequelize';
import ThirdSpecialty from './ThirdSpecialty';

const ThirdSubSpecialty = dbConection.define('third_subspecialty', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   name: {
      type: DataTypes.STRING(50),
      allowNull: false,
   },
   specialtyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Eliminamos las referencias aquí para evitar índices duplicados
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
      //await ThirdSubSpecialty.sync();
      ThirdSubSpecialty.belongsTo(ThirdSpecialty, { foreignKey: 'specialtyId' })
   }
)();

export default ThirdSubSpecialty;