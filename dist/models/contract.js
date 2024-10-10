"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const apartment_1 = require("./apartment");
const tenant_1 = require("./tenant");
const admin_1 = require("./admin");
exports.Contract = connection_1.default.define('contract', {
    contract_id: {
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
    },
    admin_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: admin_1.Admin,
            key: 'admin_id'
        },
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    warranty: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    type_contract: {
        type: sequelize_1.DataTypes.CHAR(20),
        allowNull: false
    },
    payment_Method: {
        type: sequelize_1.DataTypes.CHAR(20),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.CHAR(20),
        allowNull: false
    },
    terms_conditions: {
        type: sequelize_1.DataTypes.CHAR(100),
        allowNull: false
    },
    signed_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    start_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
});
exports.Contract.belongsTo(apartment_1.Apartment, { foreignKey: 'apartment_id' });
apartment_1.Apartment.hasMany(exports.Contract, { foreignKey: 'apartment_id' });
exports.Contract.belongsTo(tenant_1.Tenant, { foreignKey: 'tenant_id' });
tenant_1.Tenant.hasMany(exports.Contract, { foreignKey: 'tenant_id' });
exports.Contract.belongsTo(admin_1.Admin, { foreignKey: 'admin_id' });
admin_1.Admin.hasMany(exports.Contract, { foreignKey: 'admin_id' });
