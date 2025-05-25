import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GraphiconComponent } from './components/graphicon/graphicon.component';

export const covidInfoRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {path:'chart', component:GraphiconComponent},
];