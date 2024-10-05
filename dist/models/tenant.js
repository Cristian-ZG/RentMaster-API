"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Tenant = connection_1.default.define('tenant', {
    tenant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(30),
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    payment_status: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false
    }
});
