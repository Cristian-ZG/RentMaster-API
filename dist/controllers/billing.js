"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoice = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const tenant_1 = require("../models/tenant");
const contract_1 = require("../models/contract");
const payment_1 = require("../models/payment");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const bwip_js_1 = __importDefault(require("bwip-js"));
const generateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tenant_id } = req.params;
        //Consultar datos del arrendatario
        const tenant = yield tenant_1.Tenant.findByPk(tenant_id);
        if (!tenant) {
            return res.status(404).json({ message: 'Arrendatario no encontrado' });
        }
        //Consultar datos del contrato
        const contract = yield contract_1.Contract.findOne({ where: { tenant_id: tenant_id } });
        if (!contract) {
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }
        //Consultar datos del pago
        const payment = yield payment_1.Payment.findOne({
            where: { tenant_id: tenant_id },
            order: [['updatedAt', 'DESC']] // Ordenar por fecha de actualización descendente
        });
        if (!payment) {
            return res.status(404).json({ message: 'Pago no encontrado.' });
        }
        // Obtener las propiedades del arrendatario, el contrato y el pago
        const tenantName = tenant.get('name');
        const tenantEmail = tenant.get('email');
        const contractAmount = contract.get('amount');
        const contractPaymentMethod = contract.get('payment_Method');
        const contractStatus = contract.get('status');
        const contractID = contract.get('contract_id');
        const paymentID = payment.get('payment_id');
        const paymentAmount = payment.get('amount');
        const paymentStatus = payment.get('status');
        const paymentPaymentMethod = payment.get('payment_method');
        // Crear el documento PDF
        const doc = new pdfkit_1.default({ margin: 50 });
        // Configuración headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=factura_${tenant_id}.pdf`);
        // Diseño del PDF
        // Obtener el ancho de la página y el logo
        const pageWidth = doc.page.width; // Ancho total de la página
        const logoWidth = 100; // Ancho del logo (ajusta si es necesario)
        // Calcular la posición X centrada
        const logoX = (pageWidth - logoWidth) / 2;
        // **Agregar el logo centrado arriba**
        const logoPath = path_1.default.join(__dirname, '../img/casa1.png'); // Ruta correcta
        doc.image(logoPath, logoX, 50, { width: logoWidth }); // Logo centrado
        // Ajustar el espacio después del logo
        doc.moveDown(7);
        // **Encabezado**
        doc
            .fontSize(25)
            .text('RentMaster', { align: 'center' });
        doc
            .fontSize(10)
            .text('Empresa de Gestión Inmobiliaria', { align: 'center' })
            .text('Calle 23 - 123, Bogotá, Colombia', { align: 'center' })
            .text('Teléfono: 123-456-7890 | Email: soporte@rentmaster.com', { align: 'center' })
            .moveDown();
        // **Línea Divisoria**
        doc
            .moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .stroke();
        doc.moveDown(2);
        doc
            .fontSize(20)
            .text('Factura')
            .moveDown();
        doc
            .fontSize(12)
            .text(`Número del contrato: ${contractID}`)
            .text(`Número del pago: ${paymentID}`)
            .moveDown();
        // **Datos del Arrendatario**
        doc
            .fontSize(12)
            .text(`Nombre del arrendatario: ${tenantName}`)
            .text(`Email del arrendatario: ${tenantEmail}`)
            .moveDown();
        // **Datos del Contrato**
        doc
            .fontSize(12)
            .text(`Monto: $${paymentAmount}`)
            .text(`Método de Pago: ${paymentPaymentMethod}`)
            .text(`Estado del contrato: ${contractStatus}`)
            .text(`Estado del pago: ${paymentStatus}`)
            .moveDown();
        // **Resumen de Pago**
        doc
            .fontSize(14)
            .text(`Total: $${paymentAmount}`, { underline: true })
            .moveDown()
            .fontSize(12)
            //.text(`Monto Mensual: $${contractAmount}`)
            .moveDown();
        // Generar el código de barras como imagen
        const barcodeBuffer = yield bwip_js_1.default.toBuffer({
            bcid: 'code128', // Tipo de código de barras
            text: `FACTURA-${tenant_id}`, // Texto que contendrá el código
            scale: 3, // Escalado del tamaño
            height: 10, // Altura del código
            includetext: true, // Incluir texto debajo del código
            textxalign: 'center',
        });
        // Guardar temporalmente el código de barras
        const barcodePath = path_1.default.join(__dirname, `../img/barcode_${tenant_id}.png`);
        fs_1.default.writeFileSync(barcodePath, barcodeBuffer);
        // **Línea Divisoria**
        doc
            .moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .stroke()
            .moveDown();
        // **Pie de Página**
        doc
            .fontSize(10)
            .text('Gracias por confiar en nuestros servicios.', { align: 'center' })
            .text('Por favor, conserve esta factura como comprobante.', { align: 'center' })
            .moveDown();
        // Agregar el código de barras al PDF
        doc.image(barcodePath, (pageWidth - 200) / 2, doc.y + 10, { width: 200 });
        // Finalizar el PDF y enviarlo como respuesta
        doc.pipe(res);
        doc.end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al generar la factura' });
    }
});
exports.generateInvoice = generateInvoice;
