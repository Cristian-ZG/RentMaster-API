import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    if (headerToken && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            const decoded: any = jwt.verify(bearerToken, process.env.SECRET_KEY || 'tofob!owr9spoV1ga4Oz');

            //Validamos que el rol sea "admin".
            if (decoded.role === 'admin') {
                next(); //Permite el acceso si el usuario es administrador.
            } else {
                res.status(403).json({
                    msg: 'Acceso denegado: No tienes permisos de administrador.'
                });
            }
        } catch (error) {
            res.status(401).json({
                msg: 'Token no válido.'
            });
        }
    } else {
        res.status(401).json({
            msg: 'Acceso denegado: Token no proporcionado.'
        });
    }
};

export default validateAdmin;