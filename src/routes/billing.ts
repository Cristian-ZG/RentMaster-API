import { Router } from 'express';
import { generateInvoice } from '../controllers/billing';
import validateToken from '../middlewares/validate-token';
import validateAdmin from '../middlewares/validate-admin';

const router = Router();

router.get('/generate-inovice/:tenant_id', validateToken, generateInvoice);

export default router;