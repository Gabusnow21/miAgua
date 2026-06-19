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
                <i class="pi pi-tint text-2xl mr-2" style="color: #14b8a6"></i>
                <span class="font-bold text-xl" style="color: rgba(255,255,255,0.9)">miAgua</span>
            </div>
        </ng-template>
        <ng-template pTemplate="end">
            <div class="flex align-items-center gap-2" style="color: rgba(255,255,255,0.65)">
                @if (username) {
                    <span class="hidden sm:inline font-medium">Hola, {{ username }}</span>
                }
                @if (!username) {
                    <span class="hidden sm:inline font-medium">ADESCO Comunidad</span>
                }
                <i class="pi pi-user-circle text-2xl cursor-pointer"></i>
            </div>
        </ng-template>
    </p-menubar>
  `,
  styles: [`
    :host ::ng-deep .p-menubar {
        background: rgba(8, 13, 26, 0.92);
        backdrop-filter: blur(12px);
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        padding: 0.5rem 1.5rem;
    }

    :host ::ng-deep .p-menubar .p-menubar-item-content {
        color: rgba(255, 255, 255, 0.65);
    }

    :host ::ng-deep .p-menubar .p-menubar-item-link {
        color: rgba(255, 255, 255, 0.65);
        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        transition: background 0.2s;
    }

    :host ::ng-deep .p-menubar .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover {
        background: rgba(255, 255, 255, 0.06);
    }

    :host ::ng-deep .p-menubar .p-menubar-item.p-focus > .p-menubar-item-content {
        background: rgba(255, 255, 255, 0.06);
    }

    :host ::ng-deep .p-menubar .p-submenu-list {
        background: rgba(15, 23, 42, 0.96);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 0.75rem;
        padding: 0.25rem;
    }

    :host ::ng-deep .p-menubar .p-menubar-button {
        color: rgba(255, 255, 255, 0.65);
    }

    :host ::ng-deep .p-menubar .p-menubar-button:hover {
        background: rgba(255, 255, 255, 0.06);
    }

    .flex.align-items-center {
        display: flex;
        align-items: center;
    }
  `]
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState$.subscribe(state => {
      this.username = state.username;
      this.buildMenu(state.isLoggedIn, state.role);
    });
  }

  private buildMenu(isLoggedIn: boolean, role: string | null) {
    this.items = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' }
    ];

    if (isLoggedIn) {
      if (role === 'VECINO') {
        this.items.push(
          { label: 'Mis Recibos', icon: 'pi pi-file-pdf', routerLink: '/recibos' }
        );
      } else if (role === 'ADMIN' || role === 'OPERADOR') {
        this.items.push(
          { label: 'Propiedades', icon: 'pi pi-building', routerLink: '/propiedades' },
          { label: 'Propietarios', icon: 'pi pi-users', routerLink: '/propietarios' },
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
      this.items.push({ label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => this.authService.logout() });
    } else {
      this.items.push({ label: 'Iniciar Sesión', icon: 'pi pi-sign-in', routerLink: '/login' });
    }
  }
}
