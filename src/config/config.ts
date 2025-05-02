import { DbConfig } from './index';

const config = {
  development: {
    username: DbConfig.DB_USER,
    password: DbConfig.DB_PASSWORD,
    database: DbConfig.DB_NAME,
    host: DbConfig.DB_HOST,
    dialect: 'mysql',
  }
}


export default config;