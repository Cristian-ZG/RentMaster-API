import { Router } from 'express';
import { deleteApartment, getApartment, getApartments, postApartment, updateApartment } from '../controllers/apartment';
import validateToken from './validate-token';

const router = Router();

router.get('/', validateToken, getApartments)
router.get('/:apartment_id', validateToken, getApartment)
router.delete('/:apartment_id', validateToken, deleteApartment)
router.post('/', validateToken, postApartment)
router.put('/:apartment_id', validateToken, updateApartment)

export default router;