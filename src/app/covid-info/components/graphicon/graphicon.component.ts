import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { CovidCallService } from '../../services/covid-call.service';
import { tap } from 'rxjs';
import { CovidData } from '../../models/CovidData.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import 'highcharts/modules/accessibility';
import { NgForOf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface GraphiconState {
  countries: Signal<string[]>;  
  selectedCountry: WritableSignal<string> ;
  loader: WritableSignal<boolean> ;  
  updateFlag: WritableSignal<boolean> ;
}
@Component({
  selector: 'czv-graphicon',
  imports: [
    HighchartsChartModule, 
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgForOf
  ],
  templateUrl: './graphicon.component.html',
  styleUrl: './graphicon.component.scss',
})
export class GraphiconComponent {
  covidCallService: CovidCallService = inject(CovidCallService);
  authService:AuthService=inject(AuthService);
  state:GraphiconState={
    countries: signal([
      'Hungary',
      'Slovakia',
      'Slovenia',
      'France',
      'Austria',
      'Romania',
    ]),
    selectedCountry: signal(''),
    loader: signal(false),
    updateFlag:  signal(true)
  };
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: 'Covid Chart',
    },
    xAxis: {
      type: 'category',
    },
    tooltip: {
      headerFormat: `<div>{point.key}</div>`,
      pointFormat: `<div> {point.y}</div>`,
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: 'Covid Data',
        data: [
          {
            name: 'Deaths',
            y: 0,
          },
          {
            name: 'Confirmed',
            y: 0,
          },
        ],
        type: 'column',
      },
    ],
  };
  onCountryChange($event: any) {
    this.covidCallService
      .getCovidData($event)
      .pipe(
        tap((data: CovidData) => {
          this.authService.increaseUsedAPI()
          this.chartOptions.series = [
            {
              name: 'Updated Covid Data',
              data: [data.deaths, data.confirmed],
              type: 'column',
            },
          ];
          this.state.updateFlag.set(true) 
        })
      )
      .subscribe();
  }
}
