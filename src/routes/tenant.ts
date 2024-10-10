import { Router } from 'express';
import { loginTenant, newTenant, updateTenant } from '../controllers/tenant';

const router = Router();

router.post('/', newTenant)
router.post('/login', loginTenant)
router.put('/:tenant_id', updateTenant)

export default router;