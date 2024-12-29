"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const tenantId = req.body.tenant_id;
        //Crear la carpeta para los documentos del arrendatario si no existe.
        const dir = path_1.default.join(__dirname, '../uploads/tenants', tenantId);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.pdf`);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, //Máximo 2MB.
    fileFilter: (req, file, cb) => {
        const isPdf = file.mimetype === 'application/pdf';
        if (isPdf) {
            cb(null, true);
        }
        else {
            cb(new Error('Solo se permiten archivos PDF.'));
        }
    }
});
exports.default = upload;
