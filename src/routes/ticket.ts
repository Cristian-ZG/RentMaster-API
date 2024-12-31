import { Router } from 'express';
import validateToken from '../middlewares/validate-token';
import validateAdmin from '../middlewares/validate-admin';
import { getApartmentTickets, getTenantTickets, getTicket, getTickets, postTickets, updateTicket } from '../controllers/ticket';

const router = Router();

router.get('/', validateAdmin, getTickets);
router.get('/:ticket_id', validateAdmin,getTicket);
router.get('/apartments/:apartment_id', validateToken, getApartmentTickets);
router.get('/tenants/:tenant_id', validateToken, getTenantTickets);
router.post('/', validateToken, postTickets);
router.put('/:ticket_id', validateToken, updateTicket);

export default router;