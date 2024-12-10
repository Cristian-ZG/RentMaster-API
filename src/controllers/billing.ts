import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { Tenant } from '../models/tenant';
import { Contract } from '../models/contract';
import fs from 'fs';

export const generateInvoice = async (req: Request, res: Response) => {
    try{
        const { tenant_id } = req.params;

        //Consultar datos del arrendatario
        const tenant = await Tenant.findByPk(tenant_id);
        if (!tenant) {
        return res.status(404).json({ message: 'Arrendatario no encontrado' });
        }

        //Consultar datos del contrato
        const contract = await Contract.findOne({ where: { tenant_id: tenant_id } });
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
        const doc = new PDFDocument();

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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al generar la factura' });
    }
}
