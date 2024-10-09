import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Tenant } from './tenant';

export const Payment = sequelize.define('payment',{
    apyment_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    tenant_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Tenant,
            key: 'tenant_id'
        },
        allowNull: false
    },
    amount:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    payment_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    payment_method:{
        type: DataTypes.CHAR(20),
        allowNull: false
    },
    status:{
        type: DataTypes.CHAR(20),
        allowNull: false
    }
});

Payment.belongsTo(Tenant,{foreignKey:'tenant_id'});
Tenant.hasMany(Payment,{foreignKey: 'tenant_id'});