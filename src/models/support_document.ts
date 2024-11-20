import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Tenant } from './tenant';

export const SupportDocument = sequelize.define('supportDocument',{
    document_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    tenant_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Tenant,
            key:'tenant_id'
        },
        allowNull: false
    },
    document_type: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    file_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

SupportDocument.belongsTo(Tenant,{foreignKey:'tenant_id'});
Tenant.hasMany(SupportDocument,{foreignKey:'tenant_id'});