"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const tenant_1 = require("./tenant");
const apartment_1 = require("./apartment");
exports.Ticket = connection_1.default.define('ticket', {
    ticket_id: {
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
    apartment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: apartment_1.Apartment,
            key: 'apartment_id'
        },
        allowNull: false
    },
    subject: {
        type: sequelize_1.DataTypes.CHAR(50),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.CHAR(100),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.CHAR(20),
        allowNull: false
    }
});
exports.Ticket.belongsTo(tenant_1.Tenant, { foreignKey: 'tenant_id' });
tenant_1.Tenant.hasMany(exports.Ticket, { foreignKey: 'tenant_id' });
exports.Ticket.belongsTo(apartment_1.Apartment, { foreignKey: 'apartment_id' });
apartment_1.Apartment.hasMany(exports.Ticket, { foreignKey: 'apartment_id' });
