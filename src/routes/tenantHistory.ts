import { Router } from 'express';
import validateToken from './validate-token';
import validateAdmin from './validate-admin';
import { getApartmentHistory, getTenantHistory, getTenantHistorys, postTenantHistory, updateHistory } from '../controllers/tenantHistory';

const router = Router();

router.get('/', validateAdmin, getTenantHistorys);
router.get('/apartments/:apartment_id', validateToken, getApartmentHistory);
router.get('/tenants/:tenant_id', validateToken, getTenantHistory);
router.post('/', validateAdmin, postTenantHistory);
router.put('/:history_id', validateAdmin, updateHistory);

export default router;