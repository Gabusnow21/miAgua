import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PropiedadService } from '../../../services/propiedad.service';
import { Propiedad } from '../../../models/interfaces';

@Component({
  selector: 'app-propiedades-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule],
  template: `
    <div class="card">
        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4 gap-3">
            <h2 class="m-0 text-2xl font-bold">Gestión de Propiedades</h2>
            <p-button label="Nueva Propiedad" icon="pi pi-plus" severity="primary"></p-button>
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
                            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary"></p-button>
                            <p-button icon="pi pi-history" [rounded]="true" [text]="true" severity="info" title="Ver Historial"></p-button>
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
  `
})
export class PropiedadesListComponent implements OnInit {
  propiedades: Propiedad[] = [];
  loading: boolean = true;

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit() {
    this.cargarPropiedades();
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
        this.loading = false;
      }
    });
  }
}
