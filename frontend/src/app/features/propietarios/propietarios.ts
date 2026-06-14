import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario, UserRole } from '../../models/interfaces';

@Component({
  selector: 'app-propietarios',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    TagModule, 
    DialogModule, 
    InputTextModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="card">
        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4 gap-3">
            <h2 class="m-0 text-2xl font-bold">Gestión de Propietarios (Vecinos)</h2>
            <p-button label="Nuevo Propietario" icon="pi pi-plus" (onClick)="abrirDialogoNuevo()"></p-button>
        </div>

        <p-table [value]="propietarios" [loading]="loading" styleClass="p-datatable-sm" [responsiveLayout]="'stack'" [breakpoint]="'960px'">
            <ng-template pTemplate="header">
                <tr>
                    <th>Nombre Completo</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-propietario>
                <tr>
                    <td><span class="p-column-title font-bold">Nombre</span>{{propietario.fullName}}</td>
                    <td><span class="p-column-title font-bold">Usuario</span>{{propietario.username}}</td>
                    <td><span class="p-column-title font-bold">Email</span>{{propietario.email}}</td>
                    <td>
                        <span class="p-column-title font-bold">Estado</span>
                        <p-tag [value]="propietario.enabled ? 'Activo' : 'Inactivo'" 
                               [severity]="propietario.enabled ? 'success' : 'danger'">
                        </p-tag>
                    </td>
                    <td>
                        <span class="p-column-title font-bold">Acciones</span>
                        <div class="flex gap-2">
                            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary" (onClick)="editarPropietario(propietario)"></p-button>
                            <p-button 
                                [icon]="propietario.enabled ? 'pi pi-user-minus' : 'pi pi-user-plus'" 
                                [rounded]="true" 
                                [text]="true" 
                                [severity]="propietario.enabled ? 'danger' : 'success'"
                                (onClick)="toggleEstado(propietario)">
                            </p-button>
                        </div>
                    </td>
                </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
                <tr>
                    <td colspan="5" class="text-center p-4 text-600">No se encontraron propietarios.</td>
                </tr>
            </ng-template>
        </p-table>
    </div>

    <p-dialog [(visible)]="displayDialog" [header]="editMode ? 'Editar Propietario' : 'Nuevo Propietario'" [modal]="true" [style]="{width: '450px'}">
        <form [formGroup]="form" (ngSubmit)="guardar()" class="flex flex-column gap-3 py-2">
            <div class="flex flex-column gap-2">
                <label for="fullName">Nombre Completo</label>
                <input id="fullName" pInputText formControlName="fullName" placeholder="Ej: Juan Pérez" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="username">Nombre de Usuario</label>
                <input id="username" pInputText formControlName="username" [readonly]="editMode" placeholder="ejperez" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="email">Email</label>
                <input id="email" pInputText formControlName="email" placeholder="correo@ejemplo.com" />
            </div>
            @if (!editMode) {
                <div class="flex flex-column gap-2">
                    <label for="password">Contraseña Temporal</label>
                    <input id="password" type="password" pInputText formControlName="password" placeholder="********" />
                </div>
            }
        </form>
        <ng-template pTemplate="footer">
            <p-button label="Cancelar" icon="pi pi-times" [text]="true" severity="secondary" (onClick)="displayDialog = false"></p-button>
            <p-button label="Guardar" icon="pi pi-check" [disabled]="form.invalid" [loading]="submitting" (onClick)="guardar()"></p-button>
        </ng-template>
    </p-dialog>

    <p-toast></p-toast>
  `,
  styles: []
})
export class PropietariosComponent implements OnInit {
  propietarios: Usuario[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  submitting: boolean = false;
  editMode: boolean = false;
  selectedPropietarioId: number | null = null;
  form: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: [UserRole.VECINO],
      enabled: [true]
    });
  }

  ngOnInit() {
    this.cargarPropietarios();
  }

  cargarPropietarios() {
    this.loading = true;
    this.usuarioService.listarTodos().subscribe({
      next: (data) => {
        // Filtramos solo los que tienen rol VECINO
        this.propietarios = data.filter(u => u.role === UserRole.VECINO);
        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los propietarios' });
        this.loading = false;
      }
    });
  }

  abrirDialogoNuevo() {
    this.editMode = false;
    this.selectedPropietarioId = null;
    this.form.reset({ role: UserRole.VECINO, enabled: true });
    this.form.get('password')?.setValidators([Validators.required]);
    this.displayDialog = true;
  }

  editarPropietario(propietario: Usuario) {
    this.editMode = true;
    this.selectedPropietarioId = propietario.id!;
    this.form.patchValue(propietario);
    this.form.get('password')?.clearValidators();
    this.displayDialog = true;
  }

  guardar() {
    if (this.form.invalid) return;
    this.submitting = true;

    const userData = { ...this.form.value, role: UserRole.VECINO };

    if (this.editMode && this.selectedPropietarioId) {
      this.usuarioService.actualizar(this.selectedPropietarioId, userData).subscribe({
        next: () => this.onSuccess('Propietario actualizado'),
        error: () => this.onError('No se pudo actualizar el propietario')
      });
    } else {
      this.usuarioService.crear(userData).subscribe({
        next: () => this.onSuccess('Propietario creado'),
        error: () => this.onError('No se pudo crear el propietario')
      });
    }
  }

  toggleEstado(propietario: Usuario) {
    if (!propietario.id) return;
    this.usuarioService.actualizar(propietario.id, { enabled: !propietario.enabled }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Estado actualizado' });
        this.cargarPropietarios();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el estado' })
    });
  }

  onSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: msg });
    this.displayDialog = false;
    this.submitting = false;
    this.cargarPropietarios();
  }

  onError(msg: string) {
    this.submitting = false;
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
