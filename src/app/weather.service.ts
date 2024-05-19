import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { DailyWeather } from './weather-data.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  private weatherData: DailyWeather[] = [];
  private dates: string[] = [];

  constructor(private _http: HttpClient) { }

  private fetchWeather(): void {
    this._http.get("https://api.open-meteo.com/v1/forecast?latitude=13.754&longitude=100.5014&hourly=temperature_2m&timezone=Asia%2FBangkok")
      .pipe(
        map((response: any) => this.formatWeatherData(response))
      )
      .subscribe({
        next: (formattedData: DailyWeather[]) => {
          this.weatherData = formattedData;
          // console.log('Formatted Weather Data: ', this.weatherData);
        },
        error: (err: any) => console.error('Error fetching wether data:', err)
      });
  }

  private formatWeatherData(data: any): DailyWeather[] {
    const hourlyTemperatures = data.hourly.temperature_2m;
    const hourlyTimes = data.hourly.time;
    
    const dailyDataMap: { [key: string]: DailyWeather} = {};

    hourlyTimes.forEach((timestamp: string, index: number) => {
      const date = new Date(timestamp);
      const dateString = date.toLocaleDateString('en-GB');
      const timeString = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit'});

      if(!dailyDataMap[dateString]) {
        dailyDataMap[dateString] = {
          date: dateString,
          temperatures: [],
          times: []
        };
      }

      dailyDataMap[dateString].temperatures.push(hourlyTemperatures[index]);
      dailyDataMap[dateString].times.push(timeString);
      
    });
    
    // console.log("Daily Data :", dailyDataMap);
    return Object.values(dailyDataMap);
  }

  getWeatherData(date: string) {
    this.fetchWeather();
    return this.weatherData.find(weather => weather.date === date);
  }

  getDate() {
    this.fetchWeather();
    this.dates = this.weatherData.map(weather => weather.date)

    return this.dates;
  }

}
