import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const Tenant = sequelize.define('tenant',{
    tenant_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_status:{
        type: DataTypes.STRING(15),
        allowNull: false
    },
    phone_number:{
        type: DataTypes.STRING(15),
        allowNull: false
    }
});