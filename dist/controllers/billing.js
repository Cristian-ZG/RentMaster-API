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
        //Obtener las propiedades del arrendatario y el contrato
        const tenantName = tenant.get('name');
        const tenantEmail = tenant.get('email');
        const contractAmount = contract.get('amount');
        const contractPaymentMethod = contract.get('payment_Method');
        const contractStatus = contract.get('status');
        //const contractTerms: string = contract.get('terms_conditions') as string;
        //Creaciónun del nuevo documento PDF
        const doc = new pdfkit_1.default();
        //Configuración headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=factura_${tenant_id}.pdf`);
        //Escritura del contenido en el PDF
        doc
            .fontSize(20)
            .text('Factura', { align: 'center' })
            .moveDown();
        doc
            .fontSize(14)
            .text(`Nombre del arrendatario: ${tenantName}`)
            .text(`Email del arrendatario: ${tenantEmail}`)
            .text(`Monto: ${contractAmount}`)
            .text(`Método de pago: ${contractPaymentMethod}`)
            .text(`Estado del contrato: ${contractStatus}`)
            .moveDown();
        //doc.text('Términos y Condiciones:');
        //doc.text(contractTerms, { align: 'justify' });
        //Finalizar el PDF y enviarlo como respuesta
        doc.pipe(res);
        doc.end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al generar la factura' });
    }
});
exports.generateInvoice = generateInvoice;
