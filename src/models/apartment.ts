import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Admin } from './admin';
import { Tenant } from './tenant';

export const Apartment = sequelize.define('apartment',{
    apartment_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    admin_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Admin,
            key:'admin_id'
        },
        allowNull: false
    },
    tenant_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Tenant,
            key:'tenant_id'
        }
    },
    address:{
        type: DataTypes.STRING(15),
        allowNull: false
    },
    description:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status:{
        type: DataTypes.STRING(15),
        allowNull: false
    },
    rent_price:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

Apartment.belongsTo(Admin,{foreignKey:'admin_id'});
Admin.hasMany(Apartment,{foreignKey:'admin_id'});

Apartment.belongsTo(Tenant,{foreignKey:'tenant_id'});
Tenant.hasMany(Apartment,{foreignKey:'tenant_id'});
