import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CovidData } from '../models/CovidData.model';

@Injectable({
  providedIn: 'root'
})
export class CovidCallService {
  private readonly _covidApiUrl = `${environment.baseUrl}`;
  http:HttpClient=inject(HttpClient);

  getCovidData(country: string = 'hungary'):Observable<any> {
    return this.http.get(`${this._covidApiUrl}/cases?country=${country}`);
  }

  
}
