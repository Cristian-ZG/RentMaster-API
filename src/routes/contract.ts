import { Router } from 'express';
import validateToken from '../middlewares/validate-token';
import validateAdmin from '../middlewares/validate-admin';
import { getApartmentContract, getContracts, getTenantContract, postContract, updateContract } from '../controllers/contract';

const router = Router();

router.post('/', validateAdmin, postContract);
router.put('/:contract_id', validateAdmin, updateContract);
router.get('/', validateAdmin, getContracts);
router.get('/apartments/:apartment_id', validateToken, getApartmentContract);
router.get('/tenants/:tenant_id',validateToken, getTenantContract);

export default router;