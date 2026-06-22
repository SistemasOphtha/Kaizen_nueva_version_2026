import { Model } from 'sequelize';

declare module 'sequelize' {
  interface Model {
    [key: string]: any;
  }
}
