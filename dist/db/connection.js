"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Asegúrese de definir las variables en su archivo .env
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
    throw new Error("Faltan variables de entorno necesarias para conectar a la base de datos.");
}
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'default_db_name', process.env.DB_USER || 'default_db_user', process.env.DB_PASSWORD || 'default_db_password', {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
});
exports.default = sequelize;
