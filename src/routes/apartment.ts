import { Router } from 'express';
import { deleteApartment, getApartment, getApartmentAdmin, getApartments, getApartmentTenant, postApartment, updateApartment } from '../controllers/apartment';
import validateToken from '../middlewares/validate-token';
import validateAdmin from '../middlewares/validate-admin';

const router = Router();

router.get('/', validateAdmin, getApartments);
router.get('/:apartment_id', validateToken, getApartment);
router.delete('/:apartment_id', validateAdmin, deleteApartment);
router.post('/', validateAdmin, postApartment);
router.put('/:apartment_id', validateAdmin, updateApartment);

router.get('/tenant/:tenant_id', validateToken, getApartmentTenant);
router.get('/admin/:admin_id', validateAdmin, getApartmentAdmin);

export default router;