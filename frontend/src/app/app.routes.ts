import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/components/main-layout';
import { HomeComponent } from './features/home/components/home';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            // Agregaremos más rutas aquí a medida que creemos los componentes
            { path: 'propiedades', loadComponent: () => import('./features/propiedades/components/propiedades-list').then(m => m.PropiedadesListComponent) },
            { path: 'lecturas', loadComponent: () => import('./features/lecturas/components/lectura-form').then(m => m.LecturaFormComponent) },
            { path: 'recibos', loadComponent: () => import('./features/recibos/components/recibos-list').then(m => m.RecibosListComponent) },
            { path: 'config/tarifas', loadComponent: () => import('./features/tarifas/components/tarifas-list').then(m => m.TarifasListComponent) },
            { path: 'config/usuarios', loadComponent: () => import('./features/usuarios/components/usuarios-list').then(m => m.UsuariosListComponent) },
        ]
    },
    { path: '**', redirectTo: '' }
];
