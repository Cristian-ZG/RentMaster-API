"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const tenant_1 = require("./tenant");
exports.Payment = connection_1.default.define('payment', {
    payment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    tenant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tenant_1.Tenant,
            key: 'tenant_id'
        },
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    payment_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    payment_method: {
        type: sequelize_1.DataTypes.CHAR(20),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.CHAR(20),
        allowNull: false
    }
});
exports.Payment.belongsTo(tenant_1.Tenant, { foreignKey: 'tenant_id' });
tenant_1.Tenant.hasMany(exports.Payment, { foreignKey: 'tenant_id' });
