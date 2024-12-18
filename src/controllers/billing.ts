import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { Tenant } from '../models/tenant';
import { Contract } from '../models/contract';
import fs from 'fs';
import path from 'path';
import bwipJs from 'bwip-js';

export const generateInvoice = async (req: Request, res: Response) => {
    try {
        const { tenant_id } = req.params;

        // Consultar datos del arrendatario
        const tenant = await Tenant.findByPk(tenant_id);
        if (!tenant) {
            return res.status(404).json({ message: 'Arrendatario no encontrado' });
        }

        // Consultar datos del contrato
        const contract = await Contract.findOne({ where: { tenant_id: tenant_id } });
        if (!contract) {
            return res.status(404).json({ message: 'Contrato no encontrado' });
        }

        // Obtener las propiedades del arrendatario y el contrato
        const tenantName = tenant.get('name') as string;
        const tenantEmail = tenant.get('email') as string;
        const contractAmount = contract.get('amount') as number;
        const contractPaymentMethod = contract.get('payment_Method') as string;
        const contractStatus = contract.get('status') as string;

        // Crear el documento PDF
        const doc = new PDFDocument({ margin: 50 });

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
        const logoPath = path.join(__dirname, '../img/casa1.png'); // Ruta correcta
        doc.image(logoPath, logoX, 50, { width: logoWidth }); // Logo centrado

        // Ajustar el espacio después del logo
        doc.moveDown(7);
        // **Encabezado**
        doc
            .fontSize(25)
            .text('RentMaster', { align: 'center' })
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

        // **Datos del Arrendatario**
        doc
            .fontSize(12)
            .text(`Nombre del arrendatario: ${tenantName}`)
            .text(`Email del arrendatario: ${tenantEmail}`)
            .moveDown();

        // **Datos del Contrato**
        doc
            .fontSize(12)
            .text(`Monto: $${contractAmount}`)
            .text(`Método de Pago: ${contractPaymentMethod}`)
            .text(`Estado del contrato: ${contractStatus}`)
            .moveDown();

        // **Resumen de Pago**
        doc
            .fontSize(14)
            .text('Resumen de Pago', { underline: true })
            .moveDown()
            .fontSize(12)
            .text(`Monto Mensual: $${contractAmount}`)
            .moveDown();

        // Generar el código de barras como imagen
        const barcodeBuffer = await bwipJs.toBuffer({
            bcid: 'code128', // Tipo de código de barras
            text: `FACTURA-${tenant_id}`, // Texto que contendrá el código
            scale: 3, // Escalado del tamaño
            height: 10, // Altura del código
            includetext: true, // Incluir texto debajo del código
            textxalign: 'center',
        });

        // Guardar temporalmente el código de barras
        const barcodePath = path.join(__dirname, `../img/barcode_${tenant_id}.png`);
        fs.writeFileSync(barcodePath, barcodeBuffer);

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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al generar la factura' });
    }
};
