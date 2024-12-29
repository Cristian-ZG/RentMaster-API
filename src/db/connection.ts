import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

//Asegúrese de definir las variables en su archivo .env
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
    throw new Error("Faltan variables de entorno necesarias para conectar a la base de datos.");
}

const sequelize = new Sequelize(
    process.env.DB_NAME || 'default_db_name',
    process.env.DB_USER || 'default_db_user',
    process.env.DB_PASSWORD || 'default_db_password',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: (process.env.DB_DIALECT as Dialect) || 'mysql',
    }
);

export default sequelize;