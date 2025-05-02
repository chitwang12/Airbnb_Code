import { Sequelize } from "sequelize";
import { DbConfig } from "../../config";

const sequelize = new Sequelize({
    dialect: "mysql",
    host: DbConfig.DB_HOST,
    username: DbConfig.DB_USER,
    database: DbConfig.DB_NAME,
    password: DbConfig.DB_PASSWORD,
    logging: true,
});


export default sequelize;