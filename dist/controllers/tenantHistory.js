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
exports.updateHistory = exports.postTenantHistory = exports.getTenantHistory = exports.getApartmentHistory = exports.getTenantHistorys = void 0;
const tenantHistory_1 = require("../models/tenantHistory");
const apartment_1 = require("../models/apartment");
const tenant_1 = require("../models/tenant");
//Obtener Historial de arrendatarios.
const getTenantHistorys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTenantHistorys = yield tenantHistory_1.TenantHistory.findAll();
    res.json(listTenantHistorys);
});
exports.getTenantHistorys = getTenantHistorys;
//Obtener un Historial arrendatarios para un apartamento especifico.
const getApartmentHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apartment_id } = req.params;
    // Busca el historial de arrendatarios para el apartamento específico
    const history = yield tenantHistory_1.TenantHistory.findAll({
        where: { apartment_id: apartment_id },
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
            msg: `No existe un historial para el apartamento con el id: ${apartment_id}`
        });
    }
});
exports.getApartmentHistory = getApartmentHistory;
//Obtener un Historial apartamentos para un arrendatario especifico.
const getTenantHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenant_id } = req.params;
    // Busca el historial de apartamentos para el arrendatario específico
    const history = yield tenantHistory_1.TenantHistory.findAll({
        where: { tenant_id: tenant_id },
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
            msg: `No existe un historial para el arrendatario con el id: ${tenant_id}`
        });
    }
});
exports.getTenantHistory = getTenantHistory;
//Agregar un historial.
const postTenantHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield tenantHistory_1.TenantHistory.create(body);
        res.json({
            msg: 'El historial fue agregado correctamente.'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.postTenantHistory = postTenantHistory;
//Actualizar un historial.
const updateHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { history_id } = req.params;
    try {
        const history = yield tenantHistory_1.TenantHistory.findByPk(history_id);
        if (history) {
            yield history.update(body);
            res.json({
                msg: 'El historial fue actulizado correctamente.'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un historial con el id: ${history_id}`
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
exports.updateHistory = updateHistory;
