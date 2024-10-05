import { Router } from 'express';
import { loginAdmin, newAdmin } from '../controllers/admin';

const router = Router();

router.post('/', newAdmin)
router.post('/login', loginAdmin)

export default router;