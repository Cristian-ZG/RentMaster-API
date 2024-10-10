"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate-token"));
const payment_1 = require("../controllers/payment");
const router = (0, express_1.Router)();
router.get('/:tenant_id', validate_token_1.default, payment_1.getPayment);
router.post('/', validate_token_1.default, payment_1.postPayment);
router.put('/:payment_id', validate_token_1.default, payment_1.updatePayment);
exports.default = router;
