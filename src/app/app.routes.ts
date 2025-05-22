import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'covid-info', pathMatch: 'full'},    
    {
        path: 'covid-info',
        loadChildren: () => import('./covid-info/covid-info.routes').then(m => m.covidInfoRoutes),
    }
];
