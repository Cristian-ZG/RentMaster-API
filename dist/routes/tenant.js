"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenant_1 = require("../controllers/tenant");
const validate_token_1 = __importDefault(require("./validate-token"));
const validate_admin_1 = __importDefault(require("./validate-admin"));
const multer_config_1 = __importDefault(require("../middlewares/multer-config"));
const router = (0, express_1.Router)();
router.post('/', tenant_1.newTenant);
/*router.post('/login', loginTenant)*/
router.get('/', validate_admin_1.default, tenant_1.getTenants);
router.get('/:tenant_id', validate_token_1.default, tenant_1.getTenant);
router.put('/:tenant_id', validate_token_1.default, tenant_1.updateTenant);
router.delete('/:tenant_id', validate_admin_1.default, tenant_1.deleteTenant);
router.get('/documents/:tenant_id', tenant_1.getTenantDocuments);
router.post('/upload-documents', multer_config_1.default.fields([
    { name: 'cedula', maxCount: 1 },
    { name: 'carta_laboral', maxCount: 1 },
    { name: 'comprobante_ingresos', maxCount: 1 },
    { name: 'referencias', maxCount: 1 }
]), tenant_1.cargaDocumentos);
exports.default = router;
