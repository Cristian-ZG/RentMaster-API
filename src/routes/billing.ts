import { Router } from 'express';
import { generateInvoice } from '../controllers/billing';
import validateToken from './validate-token';
import validateAdmin from './validate-admin';

const router = Router();

router.get('/generate-inovice/:tenant_id', validateToken, generateInvoice)

export default router;