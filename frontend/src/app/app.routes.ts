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
        ]
    },
    { path: '**', redirectTo: '' }
];
