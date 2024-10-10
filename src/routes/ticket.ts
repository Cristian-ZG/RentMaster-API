import { Router } from 'express';
import validateToken from './validate-token';
import { getApartmentTickets, getTenantTickets, getTickets, postTickets, updateTicket } from '../controllers/ticket';

const router = Router();

router.get('/', validateToken, getTickets);
router.get('/apartments/:apartment_id', validateToken, getApartmentTickets);
router.get('/tenants/:tenant_id', validateToken, getTenantTickets);
router.post('/', validateToken, postTickets);
router.put('/:ticket_id', validateToken, updateTicket);

export default router;