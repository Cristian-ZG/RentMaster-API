import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../models/admin';
import jwt from 'jsonwebtoken';


// Agregar Admin
export const newAdmin = async (req: Request, res: Response) => {

    const { name, email, password, phone_number } = req.body;

    //Validacion si el Admin existe en la base de datos.
    const tenant = await Admin.findOne({where:{email: email}})

    if(tenant){
        return res.status(400).json({
            msg: 'Ya existe un administrador con el correo: ' + email
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    try {
        //Guarda Admin en la base de datos.
        await Admin.create({
            name: name,
            email: email,
            password: hashedPassword,
            phone_number: phone_number
        })
        res.json({
            msg: 'Administrador ' + name + ' creado exitosamente.'
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }   
}