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

  selectedIndex: number = 0;
  dates: string[] = [];

  constructor(
    private weatherService: WeatherService,
    private shareDateService: ShareDateService) {
      this.dates = this.weatherService.getDate();
  }

  selectDate(date: string, index: number) {
    this.shareDateService.updateDate(date);

    this.selectedIndex = index;
  }
}
