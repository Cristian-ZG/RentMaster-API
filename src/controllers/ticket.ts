import { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { Apartment } from '../models/apartment';
import { Tenant } from '../models/tenant';

//Obtener tickets.
export const getTickets = async (req: Request, res: Response) => {

    const listTickets = await Ticket.findAll();

    res.json(listTickets);
};

//Obtener un ticket especifico.
export const getTicket = async (req: Request, res: Response) => {

    const { ticket_id } = req.params;
    const ticket = await Ticket.findByPk(ticket_id);

    if (ticket){
        res.json(ticket)
    } else {
        res.status(404).json({
            msg: `No existe un apartamento con el id: ${ticket_id}`
        });
    }
};

//Obtener Tickets para un apartamento especifico.
export const getApartmentTickets = async (req: Request, res: Response) => {

    const { apartment_id } = req.params;

    // Busca el historial de tickets para el apartamento específico.
    const history = await Ticket.findAll({
        where: {apartment_id: apartment_id},
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
            msg: `No existen tickets para el apartamento con el id: ${apartment_id}`
        });
    }
};

//Obtener Tickets para un arrendatario especifico.
export const getTenantTickets = async (req: Request, res: Response) => {

    const { tenant_id } = req.params;

    // Busca el historial de tickets para el arrendatario específico
    const history = await Ticket.findAll({
        where: {tenant_id: tenant_id},
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
            msg: `No existen tickets para el arrendatario con el id: ${tenant_id}`
        });
    }
};

//Agregar un ticket.
export const postTickets = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        await Ticket.create(body);
        res.json({
            msg: 'El ticket fue agregado correctamente.'
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
};

//Actualizar un ticket.
export const updateTicket = async (req: Request, res: Response) => {

    const { body } = req;
    const { ticket_id } = req.params;

    try {
        const ticket = await Ticket.findByPk(ticket_id);

        if(ticket){
            await ticket.update(body);
            res.json({
                msg: 'El ticket fue actulizado correctamente.'
            })
        } else {
            res.status(404).json({
                msg: `No existe un ticket con el id: ${ticket_id}`
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
};