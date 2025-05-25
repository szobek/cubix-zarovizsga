import { Component, inject } from '@angular/core';
import { CovidCallService } from '../../services/covid-call.service';
import { FormsModule } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { CovidData } from '../../models/CovidData.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthService } from '../../../auth/auth.service';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NgForOf } from '@angular/common';

interface HomeState {
  countries: string[];
  loader: boolean;
  dataSource: CovidData[];
  displayedColumns: string[];
  selectedCountry: string;
}
@Component({
  selector: 'czv-home',
  imports: [
    FormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  covidCallService: CovidCallService=inject(CovidCallService);
  authService:AuthService=inject(AuthService);

  state:HomeState={
    "countries": ['Hungary', 'Slovakia', 'Slovenia', 'France', 'Austria','Romania'],
    "loader": false,
    "dataSource": [] ,
    "displayedColumns": ['country', 'confirmed','deaths'],
    "selectedCountry":''
  }
  onCountryChange($event: any) {
    const country=$event;
    if(country===""){return}
    this.state.loader=true;
    this.covidCallService.getCovidData(country)
    .pipe(
      tap((data:CovidData)=>{
        this.authService.increaseUsedAPI()
        if(localStorage.getItem('usedAPI')===null){}
        this.state.dataSource=[data]; 
        }),
        finalize(() => {
          this.state.loader=false;
        })
    )
    .subscribe()
  }
}
