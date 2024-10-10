"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apartment = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const admin_1 = require("./admin");
const tenant_1 = require("./tenant");
exports.Apartment = connection_1.default.define('apartment', {
    apartment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    admin_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: admin_1.Admin,
            key: 'admin_id'
        },
        allowNull: false
    },
    tenant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: tenant_1.Tenant,
            key: 'tenant_id'
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false
    },
    rent_price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    }
});
exports.Apartment.belongsTo(admin_1.Admin, { foreignKey: 'admin_id' });
admin_1.Admin.hasMany(exports.Apartment, { foreignKey: 'admin_id' });
exports.Apartment.belongsTo(tenant_1.Tenant, { foreignKey: 'tenant_id' });
tenant_1.Tenant.hasMany(exports.Apartment, { foreignKey: 'tenant_id' });
