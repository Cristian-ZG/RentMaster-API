import { Request, Response } from 'express';
import { Apartment } from '../models/apartment';

export const getApartments = async (req: Request, res: Response) => {

    const listApartments = await Apartment.findAll();

    res.json(listApartments)
}