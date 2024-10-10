import { Request, Response } from 'express';
import { TenantHistory } from '../models/tenantHistory';
import { Apartment } from '../models/apartment';
import { Tenant } from '../models/tenant';

//Obtener Historial de arrendatarios
export const getTenantHistorys = async (req: Request, res: Response) => {

    const listTenantHistorys = await TenantHistory.findAll();

    res.json(listTenantHistorys)
}

//Obtener un Historial arrendatarios para un apartamento especifico
export const getApartmentHistory = async (req: Request, res: Response) => {

    const { apartment_id } = req.params;

    // Busca el historial de arrendatarios para el apartamento específico
    const history = await TenantHistory.findAll({
        where: {apartment_id: apartment_id},
        include:[{
            model: Tenant,
            attributes: ["tenant_id","name","email"]
        }],
        order:[['createdAt', 'DESC']]
    });

    if (history.length > 0){
        res.json(history);
    } else {
        res.status(404).json({
            msg: 'No existe un historial para el apartamento con el id: ' + apartment_id
        })
    }
}

//Obtener un Historial apartamentos para un arrendatario especifico
export const getTenantHistory = async (req: Request, res: Response) => {

    const { tenant_id } = req.params;

    // Busca el historial de apartamentos para el arrendatario específico
    const history = await TenantHistory.findAll({
        where: {tenant_id: tenant_id},
        include:[{
            model: Apartment,
            attributes: ["apartment_id","name","address"]
        }],
        order:[['createdAt', 'DESC']]
    });

    if (history.length > 0){
        res.json(history);
    } else {
        res.status(404).json({
            msg: 'No existe un historial para el arrendatario con el id: ' + tenant_id
        })
    }
}

//Agregar un historial
export const postTenantHistory = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        await TenantHistory.create(body);
        res.json({
            msg: 'El historial fue agregado correctamente.'
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}