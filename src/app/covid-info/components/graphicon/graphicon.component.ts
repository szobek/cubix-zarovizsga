import { Component, inject } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { CovidCallService } from '../../services/covid-call.service';
import { tap } from 'rxjs';
import { CovidData } from '../../models/CovidData.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';



@Component({
  selector: 'czv-graphicon',
  imports: [HighchartsChartModule, FormsModule],
  templateUrl: './graphicon.component.html',
  styleUrl: './graphicon.component.scss',
})
export class GraphiconComponent {
  covidCallService: CovidCallService = inject(CovidCallService);
  authService:AuthService=inject(AuthService);
  state = {
    countries: [
      'Hungary',
      'Slovakia',
      'Slovenia',
      'France',
      'Austria',
      'Romania',
    ],
    selectedCountry: '',
    loader: false,
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
  updateFlag: boolean = true;
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
          this.updateFlag = true;
        })
      )
      .subscribe();
  }
}
