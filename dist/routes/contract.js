"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate-token"));
const validate_admin_1 = __importDefault(require("./validate-admin"));
const contract_1 = require("../controllers/contract");
const router = (0, express_1.Router)();
router.post('/', validate_admin_1.default, contract_1.postContract);
router.put('/:contract_id', validate_admin_1.default, contract_1.updateContract);
router.get('/', validate_admin_1.default, contract_1.getContracts);
router.get('/apartments/:apartment_id', validate_token_1.default, contract_1.getApartmentContract);
router.get('/tenants/:tenant_id', validate_token_1.default, contract_1.getTenantContract);
exports.default = router;
