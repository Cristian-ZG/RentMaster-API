"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate-token"));
const validate_admin_1 = __importDefault(require("./validate-admin"));
const tenantHistory_1 = require("../controllers/tenantHistory");
const router = (0, express_1.Router)();
router.get('/', validate_admin_1.default, tenantHistory_1.getTenantHistorys);
router.get('/apartments/:apartment_id', validate_token_1.default, tenantHistory_1.getApartmentHistory);
router.get('/tenants/:tenant_id', validate_token_1.default, tenantHistory_1.getTenantHistory);
router.post('/', validate_admin_1.default, tenantHistory_1.postTenantHistory);
router.put('/:history_id', validate_admin_1.default, tenantHistory_1.updateHistory);
exports.default = router;
