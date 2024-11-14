import { Router } from 'express';
import { deleteApartment, getApartment, getApartments, postApartment, updateApartment } from '../controllers/apartment';
import validateToken from './validate-token';
import validateAdmin from './validate-admin';

const router = Router();

router.get('/', validateAdmin, getApartments)
router.get('/:apartment_id', validateToken, getApartment)
router.delete('/:apartment_id', validateAdmin, deleteApartment)
router.post('/', validateAdmin, postApartment)
router.put('/:apartment_id', validateAdmin, updateApartment)

export default router;