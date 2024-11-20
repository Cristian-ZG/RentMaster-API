"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportDocument = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const tenant_1 = require("./tenant");
exports.SupportDocument = connection_1.default.define('supportDocument', {
    document_id: {
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
    document_type: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    file_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.SupportDocument.belongsTo(tenant_1.Tenant, { foreignKey: 'tenant_id' });
tenant_1.Tenant.hasMany(exports.SupportDocument, { foreignKey: 'tenant_id' });
