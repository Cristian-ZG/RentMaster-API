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
exports.newAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = require("../models/admin");
//Registrar un Administrador
const newAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone_number } = req.body;
    //Valida si el Admin existe en la base de datos (mediante el correo electronico).
    const admin = yield admin_1.Admin.findOne({ where: { email: email } });
    if (admin) {
        return res.status(400).json({
            msg: `Ya existe un administrador con el correo: ${email}`
        });
    }
    try {
        //Hashea la contraseña.
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        //Guarda al Administrador en la base de datos.
        yield admin_1.Admin.create({
            name: name,
            email: email,
            password: hashedPassword,
            phone_number: phone_number
        });
        res.json({
            msg: `Administrador ${name} creado exitosamente.`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.newAdmin = newAdmin;
