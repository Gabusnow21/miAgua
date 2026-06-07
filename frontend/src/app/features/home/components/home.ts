import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterLink],
  template: `
    <div class="grid">
        <div class="col-12">
            <h1 class="text-3xl font-bold mb-4">Bienvenido al Sistema miAgua</h1>
            <p class="text-600 mb-5">Gestión comunal eficiente para nuestra ADESCO.</p>
        </div>

        <div class="col-12 md:col-6 lg:col-3">
            <p-card header="Propiedades" subheader="Ver mis casas" styleClass="h-full">
                <div class="flex flex-column align-items-center">
                    <i class="pi pi-building text-blue-500 text-5xl mb-3"></i>
                    <p>Consulta el estado de tus propiedades registradas.</p>
                </div>
                <ng-template pTemplate="footer">
                    <p-button label="Ir a Propiedades" icon="pi pi-arrow-right" routerLink="/propiedades" styleClass="w-full"></p-button>
                </ng-template>
            </p-card>
        </div>

        <div class="col-12 md:col-6 lg:col-3">
            <p-card header="Registrar Lectura" subheader="Operador" styleClass="h-full">
                <div class="flex flex-column align-items-center">
                    <i class="pi pi-pencil text-green-500 text-5xl mb-3"></i>
                    <p>Ingresa la lectura actual del medidor de agua.</p>
                </div>
                <ng-template pTemplate="footer">
                    <p-button label="Registrar" icon="pi pi-plus" severity="success" routerLink="/lecturas" styleClass="w-full"></p-button>
                </ng-template>
            </p-card>
        </div>

        <div class="col-12 md:col-6 lg:col-3">
            <p-card header="Mis Recibos" subheader="Pagos pendientes" styleClass="h-full">
                <div class="flex flex-column align-items-center">
                    <i class="pi pi-file-pdf text-orange-500 text-5xl mb-3"></i>
                    <p>Visualiza y descarga tus recibos mensuales.</p>
                </div>
                <ng-template pTemplate="footer">
                    <p-button label="Ver Recibos" icon="pi pi-eye" severity="warn" routerLink="/recibos" styleClass="w-full"></p-button>
                </ng-template>
            </p-card>
        </div>

        <div class="col-12 md:col-6 lg:col-3">
            <p-card header="Subir Pago" subheader="Comprobantes" styleClass="h-full">
                <div class="flex flex-column align-items-center">
                    <i class="pi pi-upload text-purple-500 text-5xl mb-3"></i>
                    <p>Envía tu comprobante de pago para validación.</p>
                </div>
                <ng-template pTemplate="footer">
                    <p-button label="Enviar Pago" icon="pi pi-send" severity="help" styleClass="w-full"></p-button>
                </ng-template>
            </p-card>
        </div>
    </div>
  `
})
export class HomeComponent {}
