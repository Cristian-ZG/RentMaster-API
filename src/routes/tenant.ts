import { Router } from 'express';
import { deleteTenant, getTenant, getTenants, loginTenant, newTenant, updateTenant } from '../controllers/tenant';
import validateToken from './validate-token';

const router = Router();

router.post('/', newTenant)
router.post('/login', loginTenant)
router.get('/', validateToken, getTenants)
router.get('/:tenant_id', validateToken, getTenant)
router.put('/:tenant_id', validateToken,updateTenant)
router.delete('/:tenant_id', validateToken, deleteTenant)

export default router;