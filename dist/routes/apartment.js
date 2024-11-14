"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apartment_1 = require("../controllers/apartment");
const validate_token_1 = __importDefault(require("./validate-token"));
const validate_admin_1 = __importDefault(require("./validate-admin"));
const router = (0, express_1.Router)();
router.get('/', validate_admin_1.default, apartment_1.getApartments);
router.get('/:apartment_id', validate_token_1.default, apartment_1.getApartment);
router.delete('/:apartment_id', validate_admin_1.default, apartment_1.deleteApartment);
router.post('/', validate_admin_1.default, apartment_1.postApartment);
router.put('/:apartment_id', validate_admin_1.default, apartment_1.updateApartment);
exports.default = router;
