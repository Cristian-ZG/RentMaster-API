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
exports.updateApartment = exports.postApartment = exports.deleteApartment = exports.getApartmentAdmin = exports.getApartmentTenant = exports.getApartment = exports.getApartments = void 0;
const apartment_1 = require("../models/apartment");
const tenant_1 = require("../models/tenant");
const admin_1 = require("../models/admin");
//Obtener todos Apartamentos registrados.
const getApartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listApartments = yield apartment_1.Apartment.findAll();
    res.json(listApartments);
});
exports.getApartments = getApartments;
//Obtener un Apartamento especifico segun el ID.
const getApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apartment_id } = req.params;
    const apartment = yield apartment_1.Apartment.findByPk(apartment_id);
    if (apartment) {
        res.json(apartment);
    }
    else {
        res.status(404).json({
            msg: `No existe un apartamento con el id: ${apartment_id}`
        });
    }
});
exports.getApartment = getApartment;
//Obtener apartamentos para un arrendatario especifico segun el ID.
const getApartmentTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenant_id } = req.params;
    //Buscar apartamentos para el tenant.
    const apartments = yield apartment_1.Apartment.findAll({
        where: { tenant_id: tenant_id },
        include: [{
                model: tenant_1.Tenant,
                attributes: ["tenant_id", "name", "email"]
            }],
        order: [['createdAt', 'DESC']]
    });
    if (apartments.length > 0) {
        res.json(apartments);
    }
    else {
        res.status(404).json({
            msg: `No existen apartamentos para el arrendatario con el id: ${tenant_id}`,
            apartments: [],
        });
    }
});
exports.getApartmentTenant = getApartmentTenant;
//Obtener apartamentos para un administrador especifico segun su ID.
const getApartmentAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { admin_id } = req.params;
    //Buscar apartamentos para el admin.
    const apartments = yield apartment_1.Apartment.findAll({
        where: { admin_id: admin_id },
        include: [{
                model: admin_1.Admin,
                attributes: ["admin_id", "name"]
            }],
        order: [['createdAt', 'DESC']]
    });
    if (apartments.length > 0) {
        res.json(apartments);
    }
    else {
        res.status(404).json({
            msg: `No existen apartamentos para el administrador con el id: ${admin_id}`,
            apartments: [],
        });
    }
});
exports.getApartmentAdmin = getApartmentAdmin;
//Eliminar un Apartamento especifico segun su ID.
const deleteApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apartment_id } = req.params;
    const apartment = yield apartment_1.Apartment.findByPk(apartment_id);
    if (!apartment) {
        res.status(404).json({
            msg: 'No existe un apartamento con el id: ' + apartment_id
        });
    }
    else {
        yield apartment.destroy();
        res.json({
            msg: 'El apartamento fue eliminado correctamente.'
        });
    }
});
exports.deleteApartment = deleteApartment;
//Agregar un Apartamento.
const postApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield apartment_1.Apartment.create(body);
        res.json({
            msg: 'El apartamento fue agregado correctamente.'
        });
    }
    catch (error) {
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.postApartment = postApartment;
//Actualizar un Apartamento.
const updateApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { apartment_id } = req.params;
    try {
        const apartment = yield apartment_1.Apartment.findByPk(apartment_id);
        if (apartment) {
            yield apartment.update(body);
            res.json({
                msg: 'El apartamento fue actulizado correctamente.'
            });
        }
        else {
            res.status(404).json({
                msg: 'No existe un apartamento con el id: ' + apartment_id
            });
        }
    }
    catch (error) {
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.updateApartment = updateApartment;
