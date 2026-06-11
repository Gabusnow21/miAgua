import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PropiedadService } from '../../../services/propiedad.service';
import { LecturaService } from '../../../services/lectura.service';
import { Propiedad, Lectura } from '../../../models/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lectura-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    SelectModule, 
    InputNumberModule, 
    TextareaModule, 
    ButtonModule, 
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="flex justify-content-center p-2">
      <div class="card w-full md:w-8 lg:w-6 shadow-2 border-round p-4 bg-surface-50">
        <div class="flex align-items-center mb-4 text-primary">
          <i class="pi pi-pencil text-2xl mr-2"></i>
          <h2 class="m-0 text-xl font-bold">Registrar Lectura</h2>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="flex flex-column gap-4">
          <div class="flex flex-column gap-2">
            <label for="propiedad" class="font-semibold">Propiedad</label>
            <p-select 
              id="propiedad"
              [options]="propiedades" 
              formControlName="propiedadId" 
              optionLabel="codigo" 
              optionValue="id"
              [filter]="true" 
              filterBy="codigo,direccion" 
              [showClear]="true" 
              placeholder="Seleccione una propiedad"
              styleClass="w-full"
              (onChange)="onPropiedadChange($event)">
              <ng-template let-propiedad pTemplate="item">
                <div class="flex flex-column">
                  <span class="font-bold">{{propiedad.codigo}}</span>
                  <small class="text-600">{{propiedad.direccion}}</small>
                </div>
              </ng-template>
            </p-select>
            @if (form.get('propiedadId')?.touched && form.get('propiedadId')?.invalid) {
              <small class="text-red-500">
                La propiedad es obligatoria.
              </small>
            }
          </div>

          <div class="grid p-0 m-0 gap-4 md:gap-0">
            <div class="col-12 md:col-6 flex flex-column gap-2">
              <label for="mes" class="font-semibold">Mes</label>
              <p-select 
                id="mes"
                [options]="meses" 
                formControlName="mes" 
                optionLabel="label" 
                optionValue="value"
                styleClass="w-full">
              </p-select>
            </div>
            <div class="col-12 md:col-6 flex flex-column gap-2">
              <label for="anio" class="font-semibold">Año</label>
              <p-select 
                id="anio"
                [options]="anios" 
                formControlName="anio" 
                optionLabel="label" 
                optionValue="value"
                styleClass="w-full">
              </p-select>
            </div>
          </div>

          <div class="flex flex-column gap-2">
            <label for="lecturaActual" class="font-semibold">Lectura Actual (m³)</label>
            <p-inputNumber 
              id="lecturaActual"
              formControlName="lecturaActual" 
              [min]="0" 
              [minFractionDigits]="2" 
              [maxFractionDigits]="2"
              placeholder="0.00"
              styleClass="w-full"
              [showButtons]="true"
              buttonLayout="horizontal"
              spinnerMode="horizontal"
              decrementButtonClass="p-button-secondary"
              incrementButtonClass="p-button-secondary"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus">
            </p-inputNumber>
            @if (form.get('lecturaActual')?.touched && form.get('lecturaActual')?.invalid) {
              <small class="text-red-500">
                La lectura actual es obligatoria.
              </small>
            }
          </div>

          <div class="flex flex-column gap-2">
            <label for="observaciones" class="font-semibold">Observaciones (Opcional)</label>
            <textarea 
              id="observaciones"
              pTextarea 
              formControlName="observaciones" 
              rows="3" 
              class="w-full">
            </textarea>
          </div>

          <div class="flex flex-column sm:flex-row gap-3 mt-2">
            <p-button 
              type="submit" 
              label="Guardar Lectura" 
              icon="pi pi-check" 
              [loading]="submitting"
              styleClass="w-full sm:w-auto flex-grow-1"
              [disabled]="form.invalid">
            </p-button>
            <p-button 
              type="button" 
              label="Cancelar" 
              icon="pi pi-times" 
              severity="secondary" 
              [disabled]="submitting"
              styleClass="w-full sm:w-auto"
              (onClick)="onCancel()">
            </p-button>
          </div>
        </form>
      </div>
    </div>
    <p-toast></p-toast>
  `
})
export class LecturaFormComponent implements OnInit {
  form: FormGroup;
  propiedades: Propiedad[] = [];
  submitting: boolean = false;
  
  meses = [
    { label: 'Enero', value: 1 }, { label: 'Febrero', value: 2 }, { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 }, { label: 'Mayo', value: 5 }, { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 }, { label: 'Agosto', value: 8 }, { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 }, { label: 'Noviembre', value: 11 }, { label: 'Diciembre', value: 12 }
  ];

  anios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private propiedadService: PropiedadService,
    private lecturaService: LecturaService,
    private messageService: MessageService,
    private router: Router
  ) {
    const now = new Date();
    this.form = this.fb.group({
      propiedadId: [null, Validators.required],
      lecturaActual: [null, [Validators.required, Validators.min(0)]],
      mes: [now.getMonth() + 1, Validators.required],
      anio: [now.getFullYear(), Validators.required],
      observaciones: ['']
    });

    for (let i = 0; i < 5; i++) {
      const year = now.getFullYear() - i;
      this.anios.push({ label: year.toString(), value: year });
    }
  }

  ngOnInit() {
    this.cargarPropiedades();
  }

  cargarPropiedades() {
    this.propiedadService.listarTodas().subscribe({
      next: (data) => this.propiedades = data,
      error: (err) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las propiedades' })
    });
  }

  onPropiedadChange(event: any) {
    // Aquí se podría cargar la lectura anterior para mostrarla como referencia
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.submitting = true;
    this.lecturaService.registrar(this.form.value).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Lectura registrada correctamente' });
        setTimeout(() => this.router.navigate(['/lecturas']), 1500);
      },
      error: (err) => {
        this.submitting = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error al registrar la lectura' });
      }
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
