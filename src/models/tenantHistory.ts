import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Apartment } from './apartment';
import { Tenant } from './tenant';

export const TenantHistory = sequelize.define('tenantHistory',{
    history_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    apartment_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Apartment,
            key: 'apartment_id'
        },
        allowNull: false
    },
    tenant_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Tenant,
            key: 'tenant_id'
        },
        allowNull: false
    }
});

TenantHistory.belongsTo(Apartment,{foreignKey: 'apartment_id'});
Apartment.hasMany(TenantHistory,{foreignKey: 'apartment_id'});

TenantHistory.belongsTo(Tenant,{foreignKey: 'tenant_id'});
Tenant.hasMany(TenantHistory,{foreignKey: 'tenant_id'});