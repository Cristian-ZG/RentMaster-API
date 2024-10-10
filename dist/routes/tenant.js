"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenant_1 = require("../controllers/tenant");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post('/', tenant_1.newTenant);
router.post('/login', tenant_1.loginTenant);
router.get('/', validate_token_1.default, tenant_1.getTenants);
router.get('/:tenant_id', validate_token_1.default, tenant_1.getTenant);
router.put('/:tenant_id', validate_token_1.default, tenant_1.updateTenant);
exports.default = router;
