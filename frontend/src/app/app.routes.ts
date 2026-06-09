import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/components/main-layout';
import { HomeComponent } from './features/home/components/home';
import { authGuard } from './auth/services/auth.service';
import { LoginComponent } from './auth/components/login';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { 
                path: 'propiedades', 
                loadComponent: () => import('./features/propiedades/components/propiedades-list').then(m => m.PropiedadesListComponent),
                canActivate: [authGuard]
            },
            { 
                path: 'lecturas', 
                loadComponent: () => import('./features/lecturas/components/lectura-form').then(m => m.LecturaFormComponent),
                canActivate: [authGuard]
            },
            { 
                path: 'recibos', 
                loadComponent: () => import('./features/recibos/components/recibos-list').then(m => m.RecibosListComponent),
                canActivate: [authGuard]
            },
            { 
                path: 'config/tarifas', 
                loadComponent: () => import('./features/tarifas/components/tarifas-list').then(m => m.TarifasListComponent),
                canActivate: [authGuard]
            },
            { 
                path: 'config/usuarios', 
                loadComponent: () => import('./features/usuarios/components/usuarios-list').then(m => m.UsuariosListComponent),
                canActivate: [authGuard]
            },
        ]
    },
    { path: '**', redirectTo: '' }
];
