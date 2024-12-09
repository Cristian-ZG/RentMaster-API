import { Request, Response } from 'express';
import { Payment } from '../models/payment';
import { Tenant } from '../models/tenant';

//Obtener Historial de Pagos
export const getPayments = async (req: Request, res: Response) => {

    const listPayments = await Payment.findAll();

    res.json(listPayments)
}

//Obtener un Historial de pagos para un arrendatario especifico
export const getPayment = async (req: Request, res: Response) => {

    const { tenant_id } = req.params;

    // Busca el historial de pagos para el arrendatario específico
    const payment = await Payment.findAll({
        where: {tenant_id: tenant_id},
        include:[{
            model: Tenant,
            attributes: ["tenant_id","name","email"]
        }],
        order:[['createdAt', 'DESC']]
    });

    if (payment.length > 0){
        res.json(payment);
    } else {
        res.status(404).json({
            msg: 'No existe un historial de pagos para el arrendatario con el id: ' + tenant_id
        })
    }
}

//Agregar un pago
export const postPayment = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        await Payment.create(body);
        res.json({
            msg: 'El pago fue agregado correctamente.'
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}

//Actualizar un pago
export const updatePayment = async (req: Request, res: Response) => {

    const { body } = req;
    const { payment_id } = req.params;

    try {
        const payment = await Payment.findByPk(payment_id);

        if(payment){
            await payment.update(body);
            res.json({
                msg: 'El historial de pago fue actulizado correctamente.'
            })
        } else {
            res.status(404).json({
                msg: 'No existe un historial de pago con el id: ' + payment_id
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}