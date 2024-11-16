import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Tenant } from './tenant';
import { Apartment } from './apartment';

export const Ticket = sequelize.define('ticket',{
    ticket_id:{
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
    apartment_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Apartment,
            key: 'apartment_id'
        },
        allowNull: false
    },
    subject:{
        type: DataTypes.CHAR(50),
        allowNull: false
    },
    description:{
        type: DataTypes.CHAR(100),
        allowNull: false
    },
    technician_name:{
        type: DataTypes.CHAR(20),
        allowNull: false
    },
    status:{
        type: DataTypes.CHAR(20),
        allowNull: false
    }
});

Ticket.belongsTo(Tenant,{foreignKey:'tenant_id'});
Tenant.hasMany(Ticket,{foreignKey:'tenant_id'});

Ticket.belongsTo(Apartment,{foreignKey: 'apartment_id'});
Apartment.hasMany(Ticket,{foreignKey: 'apartment_id'});