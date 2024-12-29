import { Request, Response } from 'express';
import { Contract } from '../models/contract';
import { Tenant } from '../models/tenant';
import { Apartment } from '../models/apartment';

//Agregar un contrato.
export const postContract = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        await Contract.create(body);
        res.json({
            msg: 'El contrato fue agregado correctamente.'
        });
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
};

//Actualizar un contrato.
export const updateContract = async (req: Request, res: Response) => {

    const { body } = req;
    const { contract_id } = req.params;

    try {
        const contract = await Contract.findByPk(contract_id);

        if(contract){
            await contract.update(body);
            res.json({
                msg: 'El contrato fue actulizado correctamente.'
            });
        } else {
            res.status(404).json({
                msg: 'No existe un contrato con el id: ' + contract_id
            });
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
};

//Obtener contratos.
export const getContracts = async (req: Request, res: Response) => {

    const listContracts = await Contract.findAll();

    res.json(listContracts)
};

//Obtener contratos para un apartamento especifico.
export const getApartmentContract = async (req: Request, res: Response) => {

    const { apartment_id } = req.params;

    //Busca los contratos para el apartamento específico.
    const contract = await Contract.findAll({
        where: {apartment_id: apartment_id},
        include:[{
            model: Tenant,
            attributes: ["tenant_id","name","email"]
        }],
        order:[['createdAt', 'DESC']]
    });

    if (contract.length > 0){
        res.json(contract);
    } else {
        res.status(404).json({
            msg: `No existe un contrato para el apartamento con el id: ${apartment_id}`
        });
    }
};

//Obtener un contrato para un arrendatario especifico.
export const getTenantContract = async (req: Request, res: Response) => {

    const { tenant_id } = req.params;

    // Busca los contratos para el arrendatario específico.
    const contract = await Contract.findAll({
        where: {tenant_id: tenant_id},
        include:[{
            model: Apartment,
            attributes: ["apartment_id","name","address"]
        }],
        order:[['createdAt', 'DESC']]
    });

    if (contract.length > 0){
        res.json(contract);
    } else {
        res.status(404).json({
            msg: `No existe un contrato para el arrendatario con el id: ${tenant_id}`
        });
    }
};