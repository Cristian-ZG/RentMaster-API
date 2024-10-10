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
exports.updateApartment = exports.postApartment = exports.deleteApartment = exports.getApartment = exports.getApartments = void 0;
const apartment_1 = require("../models/apartment");
//Obtener Apartamentos
const getApartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listApartments = yield apartment_1.Apartment.findAll();
    res.json(listApartments);
});
exports.getApartments = getApartments;
//Obtener un Apartamento especifico
const getApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { apartment_id } = req.params;
    const apartment = yield apartment_1.Apartment.findByPk(apartment_id);
    if (apartment) {
        res.json(apartment);
    }
    else {
        res.status(404).json({
            msg: 'No existe un apartamento con el id: ' + apartment_id
        });
    }
});
exports.getApartment = getApartment;
//Eliminar un Apartamento especifico
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
//Agregar un Apartamento
const postApartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield apartment_1.Apartment.create(body);
        res.json({
            msg: 'El apartamento fue agregado correctamente.'
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.postApartment = postApartment;
//Actualizar un Apartamento
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
        console.log(error);
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
});
exports.updateApartment = updateApartment;
