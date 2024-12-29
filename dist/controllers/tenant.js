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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenantDocuments = exports.cargaDocumentos = exports.deleteTenant = exports.getTenant = exports.getTenants = exports.updateTenant = exports.newTenant = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const tenant_1 = require("../models/tenant");
const support_document_1 = require("../models/support_document");
//Agregar Arrendatario.
const newTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, payment_status, phone_number } = req.body;
    //Validacion si el usuario existe en la base de datos.
    const tenant = yield tenant_1.Tenant.findOne({ where: { email: email } });
    if (tenant) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el correo: ${email}`
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        //Guarda Arrendatario en la base de datos.
        yield tenant_1.Tenant.create({
            name: name,
            email: email,
            password: hashedPassword,
            payment_status: payment_status,
            phone_number: phone_number
        });
        res.json({
            msg: 'Arrendatario ' + name + ' creado exitosamente.'
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newTenant = newTenant;
//Modificar Arrendatario.
const updateTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { tenant_id } = req.params;
    try {
        const tenant = yield tenant_1.Tenant.findByPk(tenant_id);
        if (tenant) {
            yield tenant.update(body);
            res.json({
                msg: 'El arrendatario fue actulizado correctamente.'
            });
        }
        else {
            res.status(404).json({
                msg: `No existe un arrendatario con el id: ${tenant_id}`
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
exports.updateTenant = updateTenant;
//Obtener Arrendatarios.
const getTenants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTenants = yield tenant_1.Tenant.findAll();
    res.json(listTenants);
});
exports.getTenants = getTenants;
//Obtener un Arrendatario especifico.
const getTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenant_id } = req.params;
    const tenant = yield tenant_1.Tenant.findByPk(tenant_id);
    if (tenant) {
        res.json(tenant);
    }
    else {
        res.status(404).json({
            msg: `No existe un arrendatario con el id: ${tenant_id}`
        });
    }
});
exports.getTenant = getTenant;
//Eliminar un arrendatario especifico.
const deleteTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenant_id } = req.params;
    const tenant = yield tenant_1.Tenant.findByPk(tenant_id);
    if (!tenant) {
        res.status(404).json({
            msg: `No existe un arrendatariocon el id: ${tenant_id}`
        });
    }
    else {
        yield tenant.destroy();
        res.json({
            msg: 'El arrendatario fue eliminado correctamente.'
        });
    }
});
exports.deleteTenant = deleteTenant;
const cargaDocumentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tenant_id } = req.body;
        const files = req.files;
        if (!files || Object.keys(files).length < 4) {
            return res.status(400).json({ msg: 'Debes subir los 4 documentos requeridos.' });
        }
        const documents = Object.entries(files).map(([type, file]) => ({
            tenant_id,
            document_type: type,
            file_url: file[0].path
        }));
        yield support_document_1.SupportDocument.bulkCreate(documents);
        res.status(201).json({ msg: 'Documentos subidos exitosamente.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al subir los documentos.' });
    }
});
exports.cargaDocumentos = cargaDocumentos;
const getTenantDocuments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenant_id } = req.params;
    try {
        const documents = yield support_document_1.SupportDocument.findAll({
            where: { tenant_id }
        });
        if (documents.length === 0) {
            return res.status(404).json({
                msg: `No se encontraron documentos para el arrendatario con ID: ${tenant_id}`
            });
        }
        res.status(200).json({
            documents
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al obtener los documentos.'
        });
    }
});
exports.getTenantDocuments = getTenantDocuments;
