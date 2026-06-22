import { DataTypes } from 'sequelize';
import dbConection from '../database';

const Notification = dbConection.define('notifications', {
   id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
   },
   icon: {
      type: DataTypes.STRING(50),
      allowNull: true
   },
   title: {
      type: DataTypes.STRING(50),
      allowNull: false
   },
   description: {
      type: DataTypes.STRING(120),
      allowNull: false
   },
   time: {
      type: DataTypes.DATE,
      allowNull: false
   },
   read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   },
   variant: {
      type: DataTypes.ENUM('success', 'info', 'warning', 'error'),
      allowNull: false,
      defaultValue: 'info'
   },
   useRouter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
   },
   link: {
      type: DataTypes.TEXT,
      allowNull: true
   },
   image: {
      type: DataTypes.TEXT,
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
      await Notification.sync( { alter: true } );
   }
)();

export default Notification;