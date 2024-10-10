"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantHistory = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const apartment_1 = require("./apartment");
const tenant_1 = require("./tenant");
exports.TenantHistory = connection_1.default.define('tenantHistory', {
    history_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    apartment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: apartment_1.Apartment,
            key: 'apartment_id'
        },
        allowNull: false
    },
    tenant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tenant_1.Tenant,
            key: 'tenant_id'
        },
        allowNull: false
    }
});
exports.TenantHistory.belongsTo(apartment_1.Apartment, { foreignKey: 'apartment_id' });
apartment_1.Apartment.hasMany(exports.TenantHistory, { foreignKey: 'apartment_id' });
exports.TenantHistory.belongsTo(tenant_1.Tenant, { foreignKey: 'tenant_id' });
tenant_1.Tenant.hasMany(exports.TenantHistory, { foreignKey: 'tenant_id' });
