import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
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
  countries: Signal<string[]>;
  displayedColumns: Signal<string[]>;
  loader: WritableSignal<boolean>;
  dataSource: WritableSignal<CovidData[]>;
  selectedCountry: WritableSignal<string>;
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
    "countries": signal(['Hungary', 'Slovakia', 'Slovenia', 'France', 'Austria','Romania']),
    "displayedColumns": signal(['country', 'confirmed','deaths']),
    "loader": signal(false),
    "dataSource": signal([]) ,
    "selectedCountry":signal('')
  }
  onCountryChange($event: any) {
    const country=$event;
    if(country===""){return}
    this.state.loader.set(true);
    this.covidCallService.getCovidData(country)
    .pipe(
      tap((data:CovidData)=>{
        this.authService.increaseUsedAPI()
        if(localStorage.getItem('usedAPI')===null){}
        this.state.dataSource.set([data]); 
        }),
        finalize(() => {
          this.state.loader.set(false);
        })
    )
    .subscribe()
  }
}
