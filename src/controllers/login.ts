import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../models/admin';
import { Tenant } from '../models/tenant'
import jwt from 'jsonwebtoken';

export const loginAT = async (req: Request, res: Response) => {

    const { email,password } = req.body;

    try{
        //Validamos si el usuario es un Administrador
        let user: any = await Admin.findOne({ where: { email } });
        let role = 'admin';

        //Si el usuario no se encuentra en los administradores validamos si es un arrendatario
        if (!user){
            user = await Tenant.findOne( { where: { email } });
            role = 'tenant';
        }

        // Si el usuario no existe en ninguna de las tablas
        if (!user) {
            return res.status(400).json({
                msg: 'No existe un usuario con el email: ' + email
            });
        }

        // Validamos la contraseña
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta.'
            });
        }

        // Generamos el token JWT, incluyendo el rol (admin o tenant) en el payload
        const token = jwt.sign({
            email: email,
            role: role  // Añadimos el rol al token
        }, process.env.SECRET_KEY || 'Y3WNQxvzFtLZEsx');

        // Respondemos con el token y el rol
        res.json({
            token,
            role
        });

    } catch (error){
        res.status(500).json({
            msg: 'Error en el servidor', error
        });
    }
    
}