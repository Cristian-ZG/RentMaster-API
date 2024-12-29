import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../models/admin';
import { Tenant } from '../models/tenant'
import jwt from 'jsonwebtoken';

export const loginAT = async (req: Request, res: Response) => {

    const { email,password } = req.body;

    try{
        //Validamos si el usuario es un Administrador.
        let user: any = await Admin.findOne({ where: { email } });
        let role = 'admin';
        let userId = user?.admin_id; // Asignamos el ID desde la tabla admins.

        //Si el usuario no se encuentra en los administradores validamos si es un arrendatario.
        if (!user){
            user = await Tenant.findOne( { where: { email } });
            role = 'tenant';
            userId = user?.tenant_id; //Asignamos el ID desde la tabla tenants.
        }

        //Si el usuario no existe en ninguna de las tablas.
        if (!user) {
            return res.status(400).json({
                msg: `No existe un usuario con el email: ${email}`
            });
        }

        //Validamos la contraseña.
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta.'
            });
        }

        //Generamos el token JWT, incluyendo el rol (admin o tenant) y el id en el payload.
        const token = jwt.sign({
            id: userId, //Añadimos el ID del usuario al token.
            email: email,
            role: role  //Añadimos el rol al token.
        }, process.env.SECRET_KEY || 'tofob!owr9spoV1ga4Oz');

        //Respondemos con el token y el rol.
        res.json({
            token,
            role,
            id: userId
        });

    } catch (error){
        res.status(500).json({
            msg: 'Error en el servidor', error
        });
    } 
};