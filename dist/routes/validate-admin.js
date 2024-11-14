"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateAdmin = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            const decoded = jsonwebtoken_1.default.verify(bearerToken, process.env.SECRET_KEY || 'Y3WNQxvzFtLZEsx');
            // Validamos que el rol sea "admin"
            if (decoded.role === 'admin') {
                next(); // Permite el acceso si el usuario es administrador
            }
            else {
                res.status(403).json({
                    msg: 'Acceso denegado: No tienes permisos de administrador.'
                });
            }
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token no válido.'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso denegado: Token no proporcionado.'
        });
    }
};
exports.default = validateAdmin;
