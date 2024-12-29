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
exports.getTenantContract = exports.getApartmentContract = exports.getContracts = exports.updateContract = exports.postContract = void 0;
const contract_1 = require("../models/contract");
const tenant_1 = require("../models/tenant");
const apartment_1 = require("../models/apartment");
//Agregar un contrato.
const postContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield contract_1.Contract.create(body);
        res.json({
            msg: 'El contrato fue agregado correctamente.'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.postContract = postContract;
//Actualizar un contrato.
const updateContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { contract_id } = req.params;
    try {
        const contract = yield contract_1.Contract.findByPk(contract_id);
        if (contract) {
            yield contract.update(body);
            res.json({
                msg: 'El contrato fue actulizado correctamente.'
            });
        }
        else {
            res.status(404).json({
                msg: 'No existe un contrato con el id: ' + contract_id
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
exports.updateContract = updateContract;
//Obtener contratos.
const getContracts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listContracts = yield contract_1.Contract.findAll();
    res.json(listContracts);
});
exports.getContracts = getContracts;
//Obtener contratos para un apartamento especifico.
const getApartmentContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apartment_id } = req.params;
    //Busca los contratos para el apartamento específico.
    const contract = yield contract_1.Contract.findAll({
        where: { apartment_id: apartment_id },
        include: [{
                model: tenant_1.Tenant,
                attributes: ["tenant_id", "name", "email"]
            }],
        order: [['createdAt', 'DESC']]
    });
    if (contract.length > 0) {
        res.json(contract);
    }
    else {
        res.status(404).json({
            msg: `No existe un contrato para el apartamento con el id: ${apartment_id}`
        });
    }
});
exports.getApartmentContract = getApartmentContract;
//Obtener un contrato para un arrendatario especifico.
const getTenantContract = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenant_id } = req.params;
    // Busca los contratos para el arrendatario específico.
    const contract = yield contract_1.Contract.findAll({
        where: { tenant_id: tenant_id },
        include: [{
                model: apartment_1.Apartment,
                attributes: ["apartment_id", "name", "address"]
            }],
        order: [['createdAt', 'DESC']]
    });
    if (contract.length > 0) {
        res.json(contract);
    }
    else {
        res.status(404).json({
            msg: `No existe un contrato para el arrendatario con el id: ${tenant_id}`
        });
    }
});
exports.getTenantContract = getTenantContract;
