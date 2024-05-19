import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ShareDateService } from '../share-date.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  providers: [WeatherService],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  dates: string[] = [];

  constructor(
    private weatherService: WeatherService,
    private shareDateService: ShareDateService) {
      this.dates = this.weatherService.getDate();
  }

  selectDate(date: string) {
    this.shareDateService.updateDate(date);
  }
}
