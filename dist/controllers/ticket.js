"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicket = exports.postTickets = exports.getTenantTickets = exports.getApartmentTickets = exports.getTickets = void 0;
const ticket_1 = require("../models/ticket");
const apartment_1 = require("../models/apartment");
const tenant_1 = require("../models/tenant");
//Obtener tickets
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTickets = yield ticket_1.Ticket.findAll();
    res.json(listTickets);
});
exports.getTickets = getTickets;
//Obtener Tickets para un apartamento especifico
const getApartmentTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apartment_id } = req.params;
    // Busca el historial de tickets para el apartamento específico
    const history = yield ticket_1.Ticket.findAll({
        where: { apartment_id: apartment_id },
        include: [{
                model: apartment_1.Apartment,
                attributes: ["apartment_id", "name", "address"]
            }],
        order: [['createdAt', 'DESC']]
    });
    if (history.length > 0) {
        res.json(history);
    }
    else {
        res.status(404).json({
            msg: 'No existen tickets para el apartamento con el id: ' + apartment_id
        });
    }
});
exports.getApartmentTickets = getApartmentTickets;
//Obtener Tickets para un arrendatario especifico
const getTenantTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenant_id } = req.params;
    // Busca el historial de tickets para el arrendatario específico
    const history = yield ticket_1.Ticket.findAll({
        where: { tenant_id: tenant_id },
        include: [{
                model: tenant_1.Tenant,
                attributes: ["tenant_id", "name", "email"]
            }],
        order: [['createdAt', 'DESC']]
    });
    if (history.length > 0) {
        res.json(history);
    }
    else {
        res.status(404).json({
            msg: 'No existen tickets para el arrendatario con el id: ' + tenant_id
        });
    }
});
exports.getTenantTickets = getTenantTickets;
//Agregar un ticket
const postTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield ticket_1.Ticket.create(body);
        res.json({
            msg: 'El ticket fue agregado correctamente.'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.postTickets = postTickets;
//Actualizar un ticket
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { ticket_id } = req.params;
    try {
        const ticket = yield ticket_1.Ticket.findByPk(ticket_id);
        if (ticket) {
            yield ticket.update(body);
            res.json({
                msg: 'El ticket fue actulizado correctamente.'
            });
        }
        else {
            res.status(404).json({
                msg: 'No existe un ticket con el id: ' + ticket_id
            });
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.updateTicket = updateTicket;
