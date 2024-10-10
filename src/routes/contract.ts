import { Router } from 'express';
import validateToken from './validate-token';
import { getApartmentContract, getContracts, getTenantContract, postContract, updateContract } from '../controllers/contract';

const router = Router();

router.post('/', validateToken, postContract);
router.put('/:contract_id', validateToken, updateContract);
router.get('/', validateToken, getContracts);
router.get('/apartments/:apartment_id', validateToken, getApartmentContract);
router.get('/tenants/:tenant_id',validateToken, getTenantContract);

export default router;