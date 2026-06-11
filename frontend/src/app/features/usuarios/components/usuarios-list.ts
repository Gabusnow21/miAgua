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
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario, UserRole } from '../../../models/interfaces';

@Component({
  selector: 'app-usuarios-list',
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
            <h2 class="m-0 text-2xl font-bold">Gestión de Usuarios</h2>
            <p-button label="Nuevo Usuario" icon="pi pi-plus" (onClick)="abrirDialogoNuevo()"></p-button>
        </div>

        <p-table [value]="usuarios" [loading]="loading" styleClass="p-datatable-sm" [responsiveLayout]="'stack'" [breakpoint]="'960px'">
            <ng-template pTemplate="header">
                <tr>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-usuario>
                <tr>
                    <td><span class="p-column-title font-bold">Nombre</span>{{usuario.fullName}}</td>
                    <td><span class="p-column-title font-bold">Usuario</span>{{usuario.username}}</td>
                    <td><span class="p-column-title font-bold">Email</span>{{usuario.email}}</td>
                    <td>
                        <span class="p-column-title font-bold">Rol</span>
                        <p-tag [value]="usuario.role" [severity]="getRoleSeverity(usuario.role)"></p-tag>
                    </td>
                    <td>
                        <span class="p-column-title font-bold">Estado</span>
                        <p-tag [value]="usuario.enabled ? 'Activo' : 'Inactivo'" 
                               [severity]="usuario.enabled ? 'success' : 'danger'">
                        </p-tag>
                    </td>
                    <td>
                        <span class="p-column-title font-bold">Acciones</span>
                        <div class="flex gap-2">
                            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary" (onClick)="editarUsuario(usuario)"></p-button>
                            <p-button 
                                [icon]="usuario.enabled ? 'pi pi-user-minus' : 'pi pi-user-plus'" 
                                [rounded]="true" 
                                [text]="true" 
                                [severity]="usuario.enabled ? 'danger' : 'success'"
                                (onClick)="toggleEstado(usuario)">
                            </p-button>
                        </div>
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>

    <p-dialog [(visible)]="displayDialog" [header]="editMode ? 'Editar Usuario' : 'Nuevo Usuario'" [modal]="true" [style]="{width: '450px'}">
        <form [formGroup]="form" (ngSubmit)="guardar()" class="flex flex-column gap-3 py-2">
            <div class="flex flex-column gap-2">
                <label for="fullName">Nombre Completo</label>
                <input id="fullName" pInputText formControlName="fullName" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="username">Nombre de Usuario</label>
                <input id="username" pInputText formControlName="username" [readonly]="editMode" />
            </div>
            <div class="flex flex-column gap-2">
                <label for="email">Email</label>
                <input id="email" pInputText formControlName="email" />
            </div>
            @if (!editMode) {
                <div class="flex flex-column gap-2">
                    <label for="password">Contraseña</label>
                    <input id="password" type="password" pInputText formControlName="password" />
                </div>
            }
            <div class="flex flex-column gap-2">
                <label for="role">Rol</label>
                <p-select id="role" [options]="roles" formControlName="role" placeholder="Seleccione un rol" styleClass="w-full"></p-select>
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
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  submitting: boolean = false;
  editMode: boolean = false;
  selectedUsuarioId: number | null = null;
  form: FormGroup;

  roles = [
    { label: 'Administrador', value: UserRole.ADMIN },
    { label: 'Operador', value: UserRole.OPERADOR },
    { label: 'Vecino', value: UserRole.VECINO }
  ];

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
      role: [UserRole.VECINO, Validators.required],
      enabled: [true]
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    this.usuarioService.listarTodos().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los usuarios' });
        this.loading = false;
      }
    });
  }

  getRoleSeverity(role: string): any {
    switch (role) {
      case 'ADMIN': return 'danger';
      case 'OPERADOR': return 'info';
      case 'VECINO': return 'success';
      default: return 'secondary';
    }
  }

  abrirDialogoNuevo() {
    this.editMode = false;
    this.selectedUsuarioId = null;
    this.form.reset({ role: UserRole.VECINO, enabled: true });
    this.form.get('password')?.setValidators([Validators.required]);
    this.displayDialog = true;
  }

  editarUsuario(usuario: Usuario) {
    this.editMode = true;
    this.selectedUsuarioId = usuario.id!;
    this.form.patchValue(usuario);
    this.form.get('password')?.clearValidators();
    this.displayDialog = true;
  }

  guardar() {
    if (this.form.invalid) return;
    this.submitting = true;

    if (this.editMode && this.selectedUsuarioId) {
      this.usuarioService.actualizar(this.selectedUsuarioId, this.form.value).subscribe({
        next: () => this.onSuccess('Usuario actualizado'),
        error: () => this.onError('No se pudo actualizar el usuario')
      });
    } else {
      this.usuarioService.crear(this.form.value).subscribe({
        next: () => this.onSuccess('Usuario creado'),
        error: () => this.onError('No se pudo crear el usuario')
      });
    }
  }

  toggleEstado(usuario: Usuario) {
    if (!usuario.id) return;
    this.usuarioService.actualizar(usuario.id, { enabled: !usuario.enabled }).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Estado actualizado' });
        this.cargarUsuarios();
      },
      error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el estado' })
    });
  }

  onSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: msg });
    this.displayDialog = false;
    this.submitting = false;
    this.cargarUsuarios();
  }

  onError(msg: string) {
    this.submitting = false;
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
