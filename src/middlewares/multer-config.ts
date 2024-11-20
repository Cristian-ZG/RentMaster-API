import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tenantId = req.body.tenant_id;

        // Crear la carpeta para los documentos del arrendatario si no existe
        const dir = path.join(__dirname, '../uploads/tenants', tenantId);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.pdf`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Máximo 2MB
    fileFilter: (req, file, cb) => {
        const isPdf = file.mimetype === 'application/pdf';
        if (isPdf) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos PDF.'));
        }
    }
});

export default upload;