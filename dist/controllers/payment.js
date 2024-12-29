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
exports.updatePayment = exports.postPayment = exports.getPayment = exports.getPayments = void 0;
const payment_1 = require("../models/payment");
const tenant_1 = require("../models/tenant");
//Obtener Historial de Pagos.
const getPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listPayments = yield payment_1.Payment.findAll();
    res.json(listPayments);
});
exports.getPayments = getPayments;
//Obtener un Historial de pagos para un arrendatario especifico.
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenant_id } = req.params;
    //Busca el historial de pagos para el arrendatario específico.
    const payment = yield payment_1.Payment.findAll({
        where: { tenant_id: tenant_id },
        include: [{
                model: tenant_1.Tenant,
                attributes: ["tenant_id", "name", "email"]
            }],
        order: [['createdAt', 'DESC']]
    });
    if (payment.length > 0) {
        res.json(payment);
    }
    else {
        res.status(404).json({
            msg: `No existe un historial de pagos para el arrendatario con el id: ${tenant_id}`
        });
    }
});
exports.getPayment = getPayment;
//Agregar un pago.
const postPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield payment_1.Payment.create(body);
        res.json({
            msg: 'El pago fue agregado correctamente.'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.postPayment = postPayment;
//Actualizar un pago.
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { payment_id } = req.params;
    try {
        const payment = yield payment_1.Payment.findByPk(payment_id);
        if (payment) {
            yield payment.update(body);
            res.json({
                msg: 'El historial de pago fue actulizado correctamente.'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un historial de pago con el id: ${payment_id}`
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
exports.updatePayment = updatePayment;
