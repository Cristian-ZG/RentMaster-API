"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate-token"));
const validate_admin_1 = __importDefault(require("./validate-admin"));
const ticket_1 = require("../controllers/ticket");
const router = (0, express_1.Router)();
router.get('/', validate_admin_1.default, ticket_1.getTickets);
router.get('/:ticket_id', validate_admin_1.default, ticket_1.getTicket);
router.get('/apartments/:apartment_id', validate_token_1.default, ticket_1.getApartmentTickets);
router.get('/tenants/:tenant_id', validate_token_1.default, ticket_1.getTenantTickets);
router.post('/', validate_token_1.default, ticket_1.postTickets);
router.put('/:ticket_id', validate_token_1.default, ticket_1.updateTicket);
exports.default = router;
