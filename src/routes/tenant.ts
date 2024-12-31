import { Router } from 'express';
import { cargaDocumentos, deleteTenant, getTenant, getTenantDocuments, getTenants, /*loginTenant,*/ newTenant, updateTenant } from '../controllers/tenant';
import validateToken from '../middlewares/validate-token';
import validateAdmin from '../middlewares/validate-admin';
import upload from '../middlewares/multer-config';

const router = Router();

router.post('/', newTenant)
/*router.post('/login', loginTenant)*/
router.get('/', validateAdmin, getTenants);
router.get('/:tenant_id', validateToken, getTenant);
router.put('/:tenant_id', validateToken,updateTenant);
router.delete('/:tenant_id', validateAdmin, deleteTenant);

router.get('/documents/:tenant_id', getTenantDocuments);

router.post('/upload-documents',
    upload.fields([
        { name: 'cedula', maxCount: 1 },
        { name: 'carta_laboral', maxCount: 1 },
        { name: 'comprobante_ingresos', maxCount: 1},
        { name: 'referencias', maxCount: 1}
    ]),
    cargaDocumentos
);

export default router;