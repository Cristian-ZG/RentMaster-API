import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Tenant } from '../models/tenant';
import jwt from 'jsonwebtoken';

// Agregar Arrendatario
export const newTenant = async (req: Request, res: Response) => {

    const { name, email, password, payment_status, phone_number } = req.body;

    //Validacion si el usuario existe en la base de datos.
    const tenant = await Tenant.findOne({where:{email: email}})

    if(tenant){
        return res.status(400).json({
            msg: 'Ya existe un usuario con el correo: ' + email
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    try {
        //Guarda Arrendatario en la base de datos.
        await Tenant.create({
            name: name,
            email: email,
            password: hashedPassword,
            payment_status: payment_status,
            phone_number: phone_number
        })
        res.json({
            msg: 'Arrendatario ' + name + ' creado exitosamente.'
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        })
    }
    
}

// Login Arrendatario
export const loginTenant = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    //Validacion si el arrendatario existe en la base de datos.
    const tenant: any = await Tenant.findOne({where:{email: email}})

    if(!tenant){
        return res.status(400).json({
            msg: 'No existe un arrendatario con el email: ' + email + ' en la base de datos.'
        })
    }

    //Validamos password
    const passwordValid = await bcrypt.compare(password, tenant.password)
    if(!passwordValid){
        return res.status(400).json({
            msg: 'Contraseña incorrecta.'
        })
    }

    //Generamos token
    const token = jwt.sign({
        email: email
    }, process.env.SECRET_KEY || 'Y3WNQxvzFtLZEsx');

    res.json(token);
}

//Modificar Arrendatario
export const updateTenant = async (req:Request, res:Response) => {
    const { body } = req;
    const { tenant_id } = req.params;

    try {
        const tenant = await Tenant.findByPk(tenant_id);

        if(tenant){
            await tenant.update(body);
            res.json({
                msg: 'El arrendatario fue actulizado correctamente.'
            })
        } else {
            res.status(404).json({
                msg: 'No existe un arrendatario con el id: ' + tenant_id
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}

//Obtener Arrendatarios
export const getTenants = async (req: Request, res: Response) => {

    const listTenants = await Tenant.findAll();

    res.json(listTenants)
}

//Obtener un Arrendatario especifico
export const getTenant = async (req: Request, res: Response) => {

    const { tenant_id } = req.params;
    const tenant = await Tenant.findByPk(tenant_id);

    if (tenant){
        res.json(tenant)
    } else {
        res.status(404).json({
            msg: 'No existe un arrendatario con el id: ' + tenant_id
        })
    }
}

//Eliminar un arrendatario especifico
export const deleteTenant = async (req: Request, res: Response) => {

    const { tenant_id } = req.params;
    const tenant = await Tenant.findByPk(tenant_id);

    if(!tenant){
        res.status(404).json({
            msg: 'No existe un arrendatariocon el id: ' + tenant_id
        })
    } else {
        await tenant.destroy();
        res.json({
            msg: 'El arrendatario fue eliminado correctamente.'
        })
    }
}