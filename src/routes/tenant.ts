import { Router } from 'express';
import { deleteTenant, getTenant, getTenants, /*loginTenant,*/ newTenant, updateTenant } from '../controllers/tenant';
import validateToken from './validate-token';
import validateAdmin from './validate-admin';

const router = Router();

router.post('/', newTenant)
/*router.post('/login', loginTenant)*/
router.get('/', validateAdmin, getTenants)
router.get('/:tenant_id', validateToken, getTenant)
router.put('/:tenant_id', validateToken,updateTenant)
router.delete('/:tenant_id', validateAdmin, deleteTenant)

export default router;