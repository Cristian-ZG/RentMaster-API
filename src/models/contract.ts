import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Apartment } from './apartment';
import { Tenant } from './tenant';
import { Admin } from './admin';

export const Contract = sequelize.define('contract',{
    contract_id:{
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
    },
    admin_id:{
        type: DataTypes.INTEGER,
        references:{
            model:Admin,
            key:'admin_id'
        },
        allowNull: false
    },
    amount:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    warranty:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    type_contract:{
        type: DataTypes.CHAR(20),
        allowNull: false
    },
    payment_Method:{
        type: DataTypes.CHAR(20),
        allowNull: false
    },
    status:{
        type: DataTypes.CHAR(20),
        allowNull: false
    },
    terms_conditions:{
        type: DataTypes.CHAR(100),
        allowNull: false
    },
    signed_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    start_date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date:{
        type: DataTypes.DATE,
        allowNull: false
    }
});

Contract.belongsTo(Apartment,{foreignKey: 'apartment_id'});
Apartment.hasMany(Contract,{foreignKey: 'apartment_id'});

Contract.belongsTo(Tenant, {foreignKey: 'tenant_id'});
Tenant.hasMany(Contract,{foreignKey: 'tenant_id'});

Contract.belongsTo(Admin, {foreignKey: 'admin_id'});
Admin.hasMany(Contract,{foreignKey: 'admin_id'});