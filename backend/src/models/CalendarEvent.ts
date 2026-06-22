import dbConection from '../database';
import { DataTypes } from 'sequelize';

const CalendarEvent = dbConection.define('calendar_events', {
   id: {
      type: DataTypes.STRING,
      primaryKey: true,
   },
   title: {
      type: DataTypes.STRING(50),
      allowNull: false,
   },
   allDay: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
   },
   start: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   end: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   extendedProps: {
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

(
   async () => {
      //await CalendarEvent.sync();
   }
)();

export default CalendarEvent;