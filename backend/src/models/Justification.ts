import dbConection from '../database';
import { DataTypes } from 'sequelize';
import Third from './Third';
import User from './User';

const Justification = dbConection.define('justifications', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   thirdId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Third,
        key: 'id',
      },
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
         model: User,
         key: 'id',
       },
   },
   date: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   dateToJustify: {
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
      //await Justification.sync();
      Justification.belongsTo(Third, { foreignKey: 'thirdId' })
      Justification.belongsTo(User, { foreignKey: 'userId' })
   }
)();

export default Justification;