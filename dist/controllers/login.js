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
exports.loginAT = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = require("../models/admin");
const tenant_1 = require("../models/tenant");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginAT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //Validamos si el usuario es un Administrador
        let user = yield admin_1.Admin.findOne({ where: { email } });
        let role = 'admin';
        //Si el usuario no se encuentra en los administradores validamos si es un arrendatario
        if (!user) {
            user = yield tenant_1.Tenant.findOne({ where: { email } });
            role = 'tenant';
        }
        // Si el usuario no existe en ninguna de las tablas
        if (!user) {
            return res.status(400).json({
                msg: 'No existe un usuario con el email: ' + email
            });
        }
        // Validamos la contraseña
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta.'
            });
        }
        // Generamos el token JWT, incluyendo el rol (admin o tenant) en el payload
        const token = jsonwebtoken_1.default.sign({
            email: email,
            role: role // Añadimos el rol al token
        }, process.env.SECRET_KEY || 'Y3WNQxvzFtLZEsx');
        // Respondemos con el token y el rol
        res.json({
            token,
            role
        });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor', error
        });
    }
});
exports.loginAT = loginAT;
