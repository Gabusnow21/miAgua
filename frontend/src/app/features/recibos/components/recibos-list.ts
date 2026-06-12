import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReciboService } from '../../../services/recibo.service';
import { PagoService } from '../../../services/pago.service';
import { Recibo, PaymentStatus } from '../../../models/interfaces';

@Component({
  selector: 'app-recibos-list',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    TagModule, 
    DialogModule, 
    FileUploadModule, 
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="card">
        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4 gap-3">
            <h2 class="m-0 text-2xl font-bold">Mis Recibos</h2>
            <div class="flex gap-2">
                <p-button label="Actualizar" icon="pi pi-refresh" [outlined]="true" (onClick)="cargarRecibos()"></p-button>
            </div>
        </div>

        <p-table 
            [value]="recibos" 
            [responsiveLayout]="'stack'" 
            [breakpoint]="'960px'"
            [paginator]="true" 
            [rows]="10" 
            styleClass="p-datatable-sm"
            [loading]="loading">
            <ng-template pTemplate="header">
                <tr>
                    <th>Periodo</th>
                    <th>Consumo</th>
                    <th>Monto</th>
                    <th>Vencimiento</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-recibo>
                <tr>
                    <td>
                        <span class="p-column-title font-bold">Periodo</span>
                        {{getMesNombre(recibo.mes)}} {{recibo.anio}}
                    </td>
                    <td><span class="p-column-title font-bold">Consumo</span>{{recibo.consumo}} m³</td>
                    <td><span class="p-column-title font-bold">Monto</span>\${{recibo.montoTotal | number:'1.2-2'}}</td>
                    <td><span class="p-column-title font-bold">Vencimiento</span>{{recibo.fechaVencimiento | date:'dd/MM/yyyy'}}</td>
                    <td>
                        <span class="p-column-title font-bold">Estado</span>
                        <p-tag [value]="recibo.estado" [severity]="getSeverity(recibo.estado)"></p-tag>
                    </td>
                    <td>
                        <span class="p-column-title font-bold">Acciones</span>
                        <div class="flex gap-2">
                            @if (recibo.estado === 'PENDIENTE' || recibo.estado === 'RECHAZADO') {
                                <p-button 
                                    icon="pi pi-upload" 
                                    label="Pagar"
                                    [rounded]="true" 
                                    severity="primary"
                                    size="small"
                                    (onClick)="abrirModalPago(recibo)">
                                </p-button>
                            }
                            <p-button 
                                icon="pi pi-eye" 
                                [rounded]="true" 
                                [text]="true" 
                                severity="secondary" 
                                title="Ver Detalle">
                            </p-button>
                        </div>
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="6" class="text-center p-4 text-600">No se encontraron recibos.</td>
                </tr>
            </ng-template>
        </p-table>
    </div>

    <!-- Modal para subir comprobante de pago -->
    <p-dialog 
        [(visible)]="displayPagoModal" 
        [header]="'Subir Pago - ' + (selectedRecibo?.mes + '/' + selectedRecibo?.anio)" 
        [modal]="true" 
        [breakpoints]="{'960px': '75vw', '640px': '90vw'}" 
        [style]="{width: '450px'}">
        
        <div class="flex flex-column gap-3 py-3">
            <div class="flex justify-content-between">
                <span class="font-bold">Monto a pagar:</span>
                <span class="text-xl text-primary font-bold">\${{selectedRecibo?.montoTotal | number:'1.2-2'}}</span>
            </div>
            
            <div class="flex flex-column gap-2 mt-2">
                <label class="font-semibold">Comprobante de Pago (Imagen)</label>
                <p-fileUpload 
                    mode="basic" 
                    chooseLabel="Seleccionar Foto" 
                    accept="image/*" 
                    maxFileSize="5000000"
                    (onSelect)="onFileSelect($event)"
                    auto="false"
                    styleClass="w-full">
                </p-fileUpload>
                <small class="text-600">Sube una foto legible de tu transferencia o depósito.</small>
            </div>

            <div class="flex flex-column gap-2">
                <label class="font-semibold">Referencia (Opcional)</label>
                <input type="text" pInputText class="w-full p-inputtext-sm" placeholder="Ej: Transacción #12345" />
            </div>
        </div>

        <ng-template pTemplate="footer">
            <p-button label="Cancelar" icon="pi pi-times" [text]="true" severity="secondary" (onClick)="displayPagoModal = false"></p-button>
            <p-button label="Enviar Pago" icon="pi pi-send" [loading]="submittingPago" (onClick)="enviarPago()"></p-button>
        </ng-template>
    </p-dialog>

    <p-toast></p-toast>
  `
})
export class RecibosListComponent implements OnInit {
  recibos: Recibo[] = [];
  loading: boolean = true;
  displayPagoModal: boolean = false;
  selectedRecibo: Recibo | null = null;
  submittingPago: boolean = false;
  uploadedFile: File | null = null;

  constructor(
    private reciboService: ReciboService,
    private pagoService: PagoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cargarRecibos();
  }

  cargarRecibos() {
    this.loading = true;
    // Por ahora usamos un ID hardcodeado (vecino de prueba) hasta implementar Auth
    // En una app real, esto vendría del AuthService
    const usuarioId = 3; 

    this.reciboService.listarPorPropietario(usuarioId).subscribe({
      next: (data) => {
        this.recibos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando recibos', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los recibos' });
        this.loading = false;
      }
    });
  }

  getSeverity(estado: string): any {
    switch (estado) {
      case 'PAGADO': return 'success';
      case 'PENDIENTE': return 'warning';
      case 'EN_REVISION': return 'info';
      case 'RECHAZADO': return 'danger';
      default: return 'secondary';
    }
  }

  getMesNombre(mes: number): string {
    const nombres = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return nombres[mes];
  }

  abrirModalPago(recibo: Recibo) {
    this.selectedRecibo = recibo;
    this.displayPagoModal = true;
  }

  onFileSelect(event: any) {
    this.uploadedFile = event.files[0];
  }

  enviarPago() {
    if (!this.selectedRecibo || !this.uploadedFile) {
        this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'Debe seleccionar un comprobante' });
        return;
    }

    this.submittingPago = true;
    
    const pagoRequest = {
      reciboId: this.selectedRecibo.id,
      montoPagado: this.selectedRecibo.montoTotal,
      metodoPago: 'TRANSFERENCIA'
    };

    this.pagoService.registrar(pagoRequest, this.uploadedFile).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Pago Enviado', detail: 'Su comprobante está en revisión' });
        this.displayPagoModal = false;
        this.submittingPago = false;
        this.uploadedFile = null;
        this.cargarRecibos(); // Recargar para ver el cambio de estado a EN_REVISION
      },
      error: (err) => {
        this.submittingPago = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el pago' });
      }
    });
  }
}
