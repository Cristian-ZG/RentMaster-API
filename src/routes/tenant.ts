import { Router } from 'express';
import { loginTenant, newTenant } from '../controllers/tenant';

const router = Router();

router.post('/', newTenant)
router.post('/login', loginTenant)

export default router;