import { Request, Response } from 'express';
import { Apartment } from '../models/apartment';

//Obtener Apartamentos
export const getApartments = async (req: Request, res: Response) => {

    const listApartments = await Apartment.findAll();

    res.json(listApartments)
}

//Obtener un Apartamento especifico
export const getApartment = async (req: Request, res: Response) => {

    const { apartment_id } = req.params;
    const apartment = await Apartment.findByPk(apartment_id);

    if (apartment){
        res.json(apartment)
    } else {
        res.status(404).json({
            msg: 'No existe un apartamento con el id: ' + apartment_id
        })
    }
}

//Eliminar un Apartamento especifico
export const deleteApartment = async (req: Request, res: Response) => {

    const { apartment_id } = req.params;
    const apartment = await Apartment.findByPk(apartment_id);

    if(!apartment){
        res.status(404).json({
            msg: 'No existe un apartamento con el id: ' + apartment_id
        })
    } else {
        await apartment.destroy();
        res.json({
            msg: 'El apartamento fue eliminado correctamente.'
        })
    }
}

//Agregar un Apartamento
export const postApartment = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        await Apartment.create(body);
        res.json({
            msg: 'El apartamento fue agregado correctamente.'
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}

//Actualizar un Apartamento
export const updateApartment = async (req: Request, res: Response) => {

    const { body } = req;
    const { apartment_id } = req.params;

    try {
        const apartment = await Apartment.findByPk(apartment_id);

        if(apartment){
            await apartment.update(body);
            res.json({
                msg: 'El apartamento fue actulizado correctamente.'
            })
        } else {
            res.status(404).json({
                msg: 'No existe un apartamento con el id: ' + apartment_id
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Ocurrio un error.'
        })
    }
}