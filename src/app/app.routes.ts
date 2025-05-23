import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'covid-info', pathMatch: 'full'},    
    {path: 'login', loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent)},
    {path:'registration', loadComponent: () => import('./auth/components/registration/registration.component').then(m => m.RegistrationComponent)},
    {
        path: 'covid-info',
        loadChildren: () => import('./covid-info/covid-info.routes').then(m => m.covidInfoRoutes),
    }
];
