import { Router } from 'express';
import validateToken from './validate-token';
import { getTenantHistorys } from '../controllers/tenantHistory';

const router = Router();

router.get('/', validateToken, getTenantHistorys)

export default router;