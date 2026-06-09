import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, CommonModule],
  template: `
    <p-menubar [model]="items">
        <ng-template pTemplate="start">
            <div class="flex align-items-center mr-4">
                <i class="pi pi-tint text-blue-500 text-2xl mr-2"></i>
                <span class="font-bold text-xl text-primary">miAgua</span>
            </div>
        </ng-template>
        <ng-template pTemplate="end">
            <div class="flex align-items-center gap-2">
                <span class="hidden sm:inline font-medium">ADESCO Comunidad</span>
                <i class="pi pi-user-circle text-2xl cursor-pointer"></i>
            </div>
        </ng-template>
    </p-menubar>
  `,
  styles: [`
    .flex.align-items-center {
        display: flex;
        align-items: center;
    }
  `]
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const role = this.authService.getUserRole();
    const isLoggedIn = this.authService.isLoggedIn();
    
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' }
    ];

    if (role === 'VECINO') {
        this.items.push(
            { label: 'Mis Recibos', icon: 'pi pi-file-pdf', routerLink: '/recibos' }
        );
    } else if (role === 'ADMIN' || role === 'OPERADOR') {
        this.items.push(
            { label: 'Propiedades', icon: 'pi pi-building', routerLink: '/propiedades' },
            { label: 'Lecturas', icon: 'pi pi-pencil', routerLink: '/lecturas' },
            { label: 'Recibos', icon: 'pi pi-file-pdf', routerLink: '/recibos' }
        );
        
        if (role === 'ADMIN') {
            this.items.push({
                label: 'Configuración',
                icon: 'pi pi-cog',
                items: [
                    { label: 'Tarifas', icon: 'pi pi-money-bill', routerLink: '/config/tarifas' },
                    { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/config/usuarios' }
                ]
            });
        }
    }

    // Añadir botón de login/logout
    if (isLoggedIn) {
        this.items.push({ label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.authService.logout() });
    } else {
        this.items.push({ label: 'Iniciar Sesión', icon: 'pi pi-sign-in', routerLink: '/login' });
    }
  }
}
