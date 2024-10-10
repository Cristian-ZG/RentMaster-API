import { Router } from 'express';
import validateToken from './validate-token';
import { getApartmentHistory, getTenantHistory, getTenantHistorys, postTenantHistory, updateHistory } from '../controllers/tenantHistory';

const router = Router();

router.get('/', validateToken, getTenantHistorys)
router.get('/apartments/:apartment_id', validateToken, getApartmentHistory)
router.get('/tenants/:tenant_id', validateToken, getTenantHistory)
router.post('/', validateToken, postTenantHistory)
router.put('/:history_id', validateToken, updateHistory)

export default router;