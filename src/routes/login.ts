import { Router } from 'express';
import { loginAT } from '../controllers/login';

const router = Router();

router.post('/', loginAT)

export default router;