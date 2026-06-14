import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PropiedadService } from '../../../services/propiedad.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Propiedad, Usuario } from '../../../models/interfaces';

@Component({
  selector: 'app-propiedades-list',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    TagModule, 
    DialogModule, 
    InputTextModule, 
    SelectModule,
    FormsModule, 
    ReactiveFormsModule, 
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="card">
        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4 gap-3">
            <h2 class="m-0 text-2xl font-bold">Gestión de Propiedades</h2>
            <p-button label="Nueva Propiedad" icon="pi pi-plus" severity="primary" (onClick)="abrirDialogoNuevo()"></p-button>
        </div>

        <p-table 
            [value]="propiedades" 
            [responsiveLayout]="'stack'" 
            [breakpoint]="'960px'"
            [paginator]="true" 
            [rows]="10" 
            styleClass="p-datatable-sm"
            [loading]="loading">
            <ng-template pTemplate="header">
                <tr>
                    <th>Código</th>
                    <th>Dirección</th>
                    <th>Propietario</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-propiedad>
                <tr>
                    <td><span class="p-column-title font-bold">Código</span>{{propiedad.codigo}}</td>
                    <td><span class="p-column-title font-bold">Dirección</span>{{propiedad.direccion}}</td>
                    <td><span class="p-column-title font-bold">Propietario</span>{{propiedad.nombrePropietario}}</td>
                    <td>
                        <span class="p-column-title font-bold">Estado</span>
                        <p-tag [value]="propiedad.activo ? 'Activo' : 'Inactivo'" 
                               [severity]="propiedad.activo ? 'success' : 'danger'">
                        </p-tag>
                    </td>
                    <td>
                        <span class="p-column-title font-bold">Acciones</span>
                        <div class="flex gap-2">
                            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary" (onClick)="editarPropiedad(propiedad)"></p-button>
                            <p-button 
                                [icon]="propiedad.activo ? 'pi pi-times' : 'pi pi-check'" 
                                [rounded]="true" 
                                [text]="true" 
                                [severity]="propiedad.activo ? 'danger' : 'success'"
                                [title]="propiedad.activo ? 'Desactivar' : 'Activar'"
                                (onClick)="toggleEstado(propiedad)">
                            </p-button>
                        </div>
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="5" class="text-center p-4 text-600">No se encontraron propiedades.</td>
                </tr>
            </ng-template>
        </p-table>
    </div>

    <p-dialog [(visible)]="displayDialog" [header]="editMode ? 'Editar Propiedad' : 'Nueva Propiedad'" [modal]="true" [style]="{width: '450px'}">
        <form [formGroup]="form" (ngSubmit)="guardar()" class="flex flex-column gap-3 py-2">
            <div class="flex flex-column gap-2">
                <label for="codigo">Código de Propiedad</label>
                <input id="codigo" pInputText formControlName="codigo" placeholder="Ej: P-001" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="direccion">Dirección</label>
                <input id="direccion" pInputText formControlName="direccion" placeholder="Dirección completa" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="propietarioId">Propietario</label>
                <p-select 
                    id="propietarioId" 
                    [options]="usuarios" 
                    formControlName="propietarioId" 
                    optionLabel="fullName" 
                    optionValue="id"
                    [filter]="true"
                    filterBy="fullName"
                    placeholder="Seleccione un propietario" 
                    styleClass="w-full">
                </p-select>
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
export class PropiedadesListComponent implements OnInit {
  propiedades: Propiedad[] = [];
  usuarios: Usuario[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  submitting: boolean = false;
  editMode: boolean = false;
  selectedPropiedadId: number | null = null;
  form: FormGroup;

  constructor(
    private propiedadService: PropiedadService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      direccion: ['', Validators.required],
      propietarioId: [null, Validators.required],
      activo: [true]
    });
  }

  ngOnInit() {
    this.cargarPropiedades();
    this.cargarUsuarios();
  }

  cargarPropiedades() {
    this.loading = true;
    this.propiedadService.listarTodas().subscribe({
      next: (data) => {
        this.propiedades = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando propiedades', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las propiedades' });
        this.loading = false;
      }
    });
  }

  cargarUsuarios() {
    this.usuarioService.listarTodos().subscribe({
      next: (data) => {
        // Podríamos filtrar solo por VECINOS si fuera necesario
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
      }
    });
  }

  abrirDialogoNuevo() {
    this.editMode = false;
    this.selectedPropiedadId = null;
    this.form.reset({ activo: true });
    this.displayDialog = true;
  }

  editarPropiedad(propiedad: Propiedad) {
    this.editMode = true;
    this.selectedPropiedadId = propiedad.id!;
    this.form.patchValue(propiedad);
    this.displayDialog = true;
  }

  guardar() {
    if (this.form.invalid) return;
    this.submitting = true;

    const data = this.form.value;

    if (this.editMode && this.selectedPropiedadId) {
      this.propiedadService.actualizar(this.selectedPropiedadId, data).subscribe({
        next: () => this.onSuccess('Propiedad actualizada'),
        error: () => this.onError('No se pudo actualizar la propiedad')
      });
    } else {
      this.propiedadService.crear(data).subscribe({
        next: () => this.onSuccess('Propiedad creada'),
        error: () => this.onError('No se pudo crear la propiedad')
      });
    }
  }

  toggleEstado(propiedad: Propiedad) {
    if (!propiedad.id) return;
    const nuevoEstado = !propiedad.activo;
    
    // Si desactivamos, usamos el endpoint de eliminar (que desactiva en el backend)
    // Pero para ser más consistentes, podríamos usar actualizar.
    // El backend PropiedadServiceImpl.eliminarPropiedad pone activo = false.
    
    if (!nuevoEstado) {
        this.propiedadService.eliminar(propiedad.id).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Propiedad desactivada' });
              this.cargarPropiedades();
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo desactivar la propiedad' })
        });
    } else {
        const updateData = { ...propiedad, activo: true };
        this.propiedadService.actualizar(propiedad.id, updateData).subscribe({
            next: () => {
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Propiedad activada' });
              this.cargarPropiedades();
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo activar la propiedad' })
        });
    }
  }

  onSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: msg });
    this.displayDialog = false;
    this.submitting = false;
    this.cargarPropiedades();
  }

  onError(msg: string) {
    this.submitting = false;
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
