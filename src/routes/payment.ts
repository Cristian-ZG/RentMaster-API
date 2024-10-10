import { Router } from 'express';
import validateToken from './validate-token';
import { getPayment, postPayment, updatePayment } from '../controllers/payment';

const router = Router();

router.get('/:tenant_id', validateToken, getPayment);
router.post('/', validateToken, postPayment);
router.put('/:payment_id', validateToken, updatePayment);

export default router;