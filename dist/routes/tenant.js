"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenant_1 = require("../controllers/tenant");
const router = (0, express_1.Router)();
router.post('/', tenant_1.newTenant);
router.post('/login', tenant_1.loginTenant);
router.put('/:tenant_id', tenant_1.updateTenant);
exports.default = router;
