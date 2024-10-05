import { Router } from 'express';
import { getApartments } from '../controllers/apartment';
import validateToken from './validate-token';

const router = Router();

router.get('/', validateToken, getApartments)

export default router;