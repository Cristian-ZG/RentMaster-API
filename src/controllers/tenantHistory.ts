import { Request, Response } from 'express';
import { TenantHistory } from '../models/tenantHistory';

//Obtener Historial de Apartamentos
export const getTenantHistorys = async (req: Request, res: Response) => {

    const listTenantHistorys = await TenantHistory.findAll();

    res.json(listTenantHistorys)
}