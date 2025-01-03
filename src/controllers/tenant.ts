import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Tenant } from '../models/tenant';
import jwt from 'jsonwebtoken';
import { SupportDocument } from '../models/support_document';

//Agregar Arrendatario.
export const newTenant = async (req: Request, res: Response) => {

    const { name, email, password, payment_status, phone_number } = req.body;

    //Validacion si el usuario existe en la base de datos.
    const tenant = await Tenant.findOne({where:{email: email}})

    if(tenant){
        return res.status(400).json({
            msg: `Ya existe un usuario con el correo: ${email}`
        });
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
        });
        res.json({
            msg: 'Arrendatario ' + name + ' creado exitosamente.'
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }  
};

//Modificar Arrendatario.
export const updateTenant = async (req:Request, res:Response) => {
    const { body } = req;
    const { tenant_id } = req.params;

    try {
        const tenant = await Tenant.findByPk(tenant_id);

        if(tenant){
            await tenant.update(body);
            res.json({
                msg: 'El arrendatario fue actulizado correctamente.'
            });
        } else {
            res.status(404).json({
                msg: `No existe un arrendatario con el id: ${tenant_id}`
            });
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        });
    }
};

//Obtener Arrendatarios.
export const getTenants = async (req: Request, res: Response) => {

    const listTenants = await Tenant.findAll();

    res.json(listTenants);
};

//Obtener un Arrendatario especifico.
export const getTenant = async (req: Request, res: Response) => {

    const { tenant_id } = req.params;
    const tenant = await Tenant.findByPk(tenant_id);

    if (tenant){
        res.json(tenant)
    } else {
        res.status(404).json({
            msg: `No existe un arrendatario con el id: ${tenant_id}`
        });
    }
};

//Eliminar un arrendatario especifico.
export const deleteTenant = async (req: Request, res: Response) => {

    const { tenant_id } = req.params;
    const tenant = await Tenant.findByPk(tenant_id);

    if(!tenant){
        res.status(404).json({
            msg: `No existe un arrendatariocon el id: ${tenant_id}`
        });
    } else {
        await tenant.destroy();
        res.json({
            msg: 'El arrendatario fue eliminado correctamente.'
        });
    }
};

export const cargaDocumentos = async (req: Request, res: Response) => {
    try {
        const { tenant_id } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (!files || Object.keys(files).length < 4) {
            return res.status(400).json({ msg: 'Debes subir los 4 documentos requeridos.' });
        }

        const documents = Object.entries(files).map(([type, file]) => ({
            tenant_id,
            document_type: type,
            file_url: file[0].path
        }));

        await SupportDocument.bulkCreate(documents);

        res.status(201).json({ msg: 'Documentos subidos exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al subir los documentos.' });
    }
};

export const getTenantDocuments = async (req: Request, res: Response) => {
    const { tenant_id } = req.params;

    try {
        const documents = await SupportDocument.findAll({
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al obtener los documentos.'
        });
    }
};