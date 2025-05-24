import { Component, inject } from '@angular/core';
import { CovidCallService } from '../../services/covid-call.service';
import { FormsModule } from '@angular/forms';
import { finalize, tap } from 'rxjs/operators';
import { CovidData } from '../../models/CovidData.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthService } from '../../../auth/auth.service';
@Component({
  selector: 'czv-home',
  imports: [
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  covidCallService: CovidCallService=inject(CovidCallService);
  authService:AuthService=inject(AuthService);
  countries: string[]=['Hungary', 'Slovakia', 'Slovenia', 'France', 'Austria','Romania'];
  selectedCountry: string='';
  loader: boolean = false;
  onCountryChange($event: any) {
    const country=$event;
    if(country===""){
      return
    }
    this.loader = true;
    this.covidCallService.getCovidData(country)
    .pipe(
      tap((data:CovidData)=>{
        this.authService.increaseUsedAPI()
        if(localStorage.getItem('usedAPI')===null){}
        document.title = `Covid data for ${country}`;
        document.querySelector('.country')!.textContent=country;
        document.querySelector('.deaths')!.textContent=data.deaths.toString();
        document.querySelector('.confirmed')!.textContent=data.confirmed.toString();
        }),
        finalize(() => {
          this.loader=false;
        })
    )
    .subscribe()
  
  }


}
