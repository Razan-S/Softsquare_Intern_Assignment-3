import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, JsonPipe } from '@angular/common';
import Chart from 'chart.js/auto';
import { ShareDateService } from '../share-date.service';
import { DailyWeather } from '../weather-data.model';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, JsonPipe, CommonModule, MenuComponent],
  providers: [WeatherService, ShareDateService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  date: string = new Date().toLocaleDateString('en-GB');
  weatherToday: DailyWeather | undefined;

  public chart: any;
  constructor(
    private weatherService: WeatherService,
    private shareDateService: ShareDateService) { 
      this.shareDateService.observable.subscribe(date => {
        this.date = date;
        this.updateWeatherData();
      })
  }

  ngOnInit(): void {
    this.weatherToday = this.weatherService.getWeatherData(this.date);
    this.createChart();
  }

  updateWeatherData() {
    this.weatherToday = this.weatherService.getWeatherData(this.date)
    this.updateChart();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.weatherToday ? this.weatherToday.times : [], 
	       datasets: [
          {
            label: "Temperatures",
            data: this.weatherToday ? this.weatherToday.temperatures : [],
            backgroundColor: 'blue',
            fill: true
          } 
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  updateChart() {
    this.chart.data.labels = this.weatherToday ? this.weatherToday.times : [];
    this.chart.data.datasets[0].data = this.weatherToday ? this.weatherToday.temperatures : [];

    this.chart.update();
  }
}
