import dbConection from '../database';
import { DataTypes } from 'sequelize';

const CalendarLabel = dbConection.define('calendar_labels', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   title: {
      type: DataTypes.STRING(50),
      allowNull: false,
   },
   color: {
      type: DataTypes.STRING(10),
      allowNull: false,
   },
   type: {
      type: DataTypes.STRING(6),
      allowNull: false,
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
      //await CalendarLabel.sync();
   }
)();

export default CalendarLabel;