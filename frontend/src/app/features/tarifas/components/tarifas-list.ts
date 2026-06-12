import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TarifaService } from '../../../services/tarifa.service';
import { Tarifa } from '../../../models/interfaces';

@Component({
  selector: 'app-tarifas-list',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    TagModule, 
    DialogModule, 
    InputTextModule, 
    InputNumberModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="card">
        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4 gap-3">
            <h2 class="m-0 text-2xl font-bold">Gestión de Tarifas</h2>
            <p-button label="Nueva Tarifa" icon="pi pi-plus" (onClick)="abrirDialogoNueva()"></p-button>
        </div>

        <p-table [value]="tarifas" [loading]="loading" styleClass="p-datatable-sm" [responsiveLayout]="'stack'" [breakpoint]="'960px'">
            <ng-template pTemplate="header">
                <tr>
                    <th>Nombre</th>
                    <th>Cuota Fija</th>
                    <th>Precio m³</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-tarifa>
                <tr>
                    <td><span class="p-column-title font-bold">Nombre</span>{{tarifa.nombre}}</td>
                    <td><span class="p-column-title font-bold">Cuota Fija</span>\${{tarifa.cuotaFija | number:'1.2-2'}}</td>
                    <td><span class="p-column-title font-bold">Precio m³</span>\${{tarifa.precioMetroCubico | number:'1.2-2'}}</td>
                    <td>
                        <span class="p-column-title font-bold">Estado</span>
                        <p-tag [value]="tarifa.activa ? 'Activa' : 'Inactiva'" 
                               [severity]="tarifa.activa ? 'success' : 'secondary'">
                        </p-tag>
                    </td>
                    <td>
                        <span class="p-column-title font-bold">Acciones</span>
                        @if (!tarifa.activa) {
                            <p-button 
                                icon="pi pi-power-off" 
                                label="Activar" 
                                [text]="true" 
                                severity="warn"
                                (onClick)="activarTarifa(tarifa)">
                            </p-button>
                        }
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>

    <p-dialog [(visible)]="displayDialog" header="Nueva Tarifa" [modal]="true" [style]="{width: '400px'}">
        <form [formGroup]="form" (ngSubmit)="guardar()" class="flex flex-column gap-3 py-2">
            <div class="flex flex-column gap-2">
                <label for="nombre">Nombre</label>
                <input id="nombre" pInputText formControlName="nombre" placeholder="Ej: Tarifa 2024" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="cuotaFija">Cuota Fija ($)</label>
                <p-inputNumber id="cuotaFija" formControlName="cuotaFija" [minFractionDigits]="2" [maxFractionDigits]="2" [min]="0"></p-inputNumber>
            </div>
            <div class="flex flex-column gap-2">
                <label for="precioMetroCubico">Precio por m³ ($)</label>
                <p-inputNumber id="precioMetroCubico" formControlName="precioMetroCubico" [minFractionDigits]="2" [maxFractionDigits]="2" [min]="0"></p-inputNumber>
            </div>
        </form>
        <ng-template pTemplate="footer">
            <p-button label="Cancelar" icon="pi pi-times" [text]="true" severity="secondary" (onClick)="displayDialog = false"></p-button>
            <p-button label="Guardar" icon="pi pi-check" [disabled]="form.invalid" [loading]="submitting" (onClick)="guardar()"></p-button>
        </ng-template>
    </p-dialog>

    <p-toast></p-toast>
  `
})
export class TarifasListComponent implements OnInit {
  tarifas: Tarifa[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  submitting: boolean = false;
  form: FormGroup;

  constructor(
    private tarifaService: TarifaService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cuotaFija: [null, [Validators.required, Validators.min(0)]],
      precioMetroCubico: [null, [Validators.required, Validators.min(0)]],
      activa: [false]
    });
  }

  ngOnInit() {
    this.cargarTarifas();
  }

  cargarTarifas() {
    this.loading = true;
    this.tarifaService.listarTodas().subscribe({
      next: (data) => {
        this.tarifas = data;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las tarifas' });
        this.loading = false;
      }
    });
  }

  abrirDialogoNueva() {
    this.form.reset({ cuotaFija: 0, precioMetroCubico: 0, activa: false });
    this.displayDialog = true;
  }

  guardar() {
    if (this.form.invalid) return;
    this.submitting = true;
    this.tarifaService.crear(this.form.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tarifa creada correctamente' });
        this.displayDialog = false;
        this.submitting = false;
        this.cargarTarifas();
      },
      error: () => {
        this.submitting = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear la tarifa' });
      }
    });
  }

  activarTarifa(tarifa: Tarifa) {
    if (!tarifa.id) return;
    this.tarifaService.activar(tarifa.id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tarifa activada correctamente' });
        this.cargarTarifas();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo activar la tarifa' });
      }
    });
  }
}
