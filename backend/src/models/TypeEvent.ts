import { DataTypes } from 'sequelize';
import dbConection from '../database';

const TypeEvent = dbConection.define('type_events', {
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

(
   async () => {
      //await TypeEvent.sync();
   }
)();

export default TypeEvent;