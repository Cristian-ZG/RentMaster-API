import { Router } from 'express';
import validateToken from './validate-token';
import { getPayment, getPayments, postPayment, updatePayment } from '../controllers/payment';
import validateAdmin from './validate-admin';

const router = Router();

router.get('/:tenant_id', validateToken, getPayment);
router.get('/', validateAdmin, getPayments);
router.post('/', validateToken, postPayment);
router.put('/:payment_id', validateToken, updatePayment);

export default router;