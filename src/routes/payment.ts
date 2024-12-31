import { Router } from 'express';
import validateToken from '../middlewares/validate-token';
import { getPayment, getPayments, postPayment, updatePayment } from '../controllers/payment';
import validateAdmin from '../middlewares/validate-admin';

const router = Router();

router.get('/:tenant_id', validateToken, getPayment);
router.get('/', validateAdmin, getPayments);
router.post('/', validateToken, postPayment);
router.put('/:payment_id', validateToken, updatePayment);

export default router;