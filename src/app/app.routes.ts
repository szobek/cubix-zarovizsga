import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'covid-info', pathMatch: 'full'},    
    {path: 'login', loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent)},
    {path:'registration', loadComponent: () => import('./auth/components/registration/registration.component').then(m => m.RegistrationComponent)},
    {path:'modify-profile',canActivate:[authGuard], loadComponent: () => import('./auth/components/modify/modify.component').then(m => m.ModifyComponent)},
    {
        path: 'covid-info',
        canActivate: [authGuard],
        loadChildren: () => import('./covid-info/covid-info.routes').then(m => m.covidInfoRoutes),
    }
];
