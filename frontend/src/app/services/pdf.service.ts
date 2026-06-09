import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Recibo } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generateReciboPdf(recibo: Recibo) {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(40, 116, 166);
    doc.text('ADESCO miAgua', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Recibo de Pago de Agua', 105, 30, { align: 'center' });

    // Details Box
    doc.setDrawColor(200, 200, 200);
    doc.rect(15, 40, 180, 40);

    doc.setFontSize(11);
    doc.text(`N° Recibo: ${recibo.id}`, 20, 50);
    doc.text(`Fecha de Emisión: ${new Date(recibo.fechaEmision).toLocaleDateString()}`, 20, 60);
    doc.text(`Periodo: ${recibo.mes}/${recibo.anio}`, 20, 70);

    doc.text(`Propiedad: ${recibo.codigoPropiedad}`, 110, 50);
    doc.text(`Propietario: ${recibo.nombrePropietario}`, 110, 60);
    doc.text(`Vencimiento: ${new Date(recibo.fechaVencimiento).toLocaleDateString()}`, 110, 70);

    // Items Table
    autoTable(doc, {
      startY: 90,
      head: [['Descripción', 'Cantidad / Lectura', 'Subtotal']],
      body: [
        ['Lectura Anterior', `${recibo.consumo ? 'N/A' : 'N/A'}`, '-'], // In a real app we'd need more data
        ['Lectura Actual', `${recibo.consumo ? 'N/A' : 'N/A'}`, '-'],
        ['Consumo (m3)', `${recibo.consumo.toFixed(2)}`, '-'],
        ['Cuota Fija y Consumo', '', `$${recibo.montoTotal.toFixed(2)}`]
      ],
      theme: 'striped',
      headStyles: { fillColor: [40, 116, 166] }
    });

    const finalY = (doc as any).lastAutoTable.finalY || 130;

    // Total
    doc.setFontSize(14);
    doc.text(`TOTAL A PAGAR: $${recibo.montoTotal.toFixed(2)}`, 140, finalY + 20);

    // Status Watermark if Paid
    if (recibo.estado === 'PAGADO') {
      doc.setTextColor(40, 180, 99);
      doc.setFontSize(40);
      doc.text('PAGADO', 105, finalY + 50, { align: 'center', angle: 25 });
    }

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Gracias por su pago puntual.', 105, 280, { align: 'center' });
    doc.text('ADESCO miAgua - Tu comunidad, tu agua.', 105, 285, { align: 'center' });

    doc.save(`Recibo_${recibo.codigoPropiedad}_${recibo.mes}_${recibo.anio}.pdf`);
  }
}
