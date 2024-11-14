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
exports.deleteTenant = exports.getTenant = exports.getTenants = exports.updateTenant = exports.loginTenant = exports.newTenant = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const tenant_1 = require("../models/tenant");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Agregar Arrendatario
const newTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, payment_status, phone_number } = req.body;
    //Validacion si el usuario existe en la base de datos.
    const tenant = yield tenant_1.Tenant.findOne({ where: { email: email } });
    if (tenant) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con el correo: ' + email
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
// Login Arrendatario
const loginTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //Validacion si el arrendatario existe en la base de datos.
    const tenant = yield tenant_1.Tenant.findOne({ where: { email: email } });
    if (!tenant) {
        return res.status(400).json({
            msg: 'No existe un arrendatario con el email: ' + email + ' en la base de datos.'
        });
    }
    //Validamos password
    const passwordValid = yield bcrypt_1.default.compare(password, tenant.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: 'Contraseña incorrecta.'
        });
    }
    //Generamos token
    const token = jsonwebtoken_1.default.sign({
        email: email
    }, process.env.SECRET_KEY || 'Y3WNQxvzFtLZEsx');
    res.json(token);
});
exports.loginTenant = loginTenant;
//Modificar Arrendatario
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
                msg: 'No existe un arrendatario con el id: ' + tenant_id
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
//Obtener Arrendatarios
const getTenants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listTenants = yield tenant_1.Tenant.findAll();
    res.json(listTenants);
});
exports.getTenants = getTenants;
//Obtener un Arrendatario especifico
const getTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenant_id } = req.params;
    const tenant = yield tenant_1.Tenant.findByPk(tenant_id);
    if (tenant) {
        res.json(tenant);
    }
    else {
        res.status(404).json({
            msg: 'No existe un arrendatario con el id: ' + tenant_id
        });
    }
});
exports.getTenant = getTenant;
//Eliminar un arrendatario especifico
const deleteTenant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tenant_id } = req.params;
    const tenant = yield tenant_1.Tenant.findByPk(tenant_id);
    if (!tenant) {
        res.status(404).json({
            msg: 'No existe un arrendatariocon el id: ' + tenant_id
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
