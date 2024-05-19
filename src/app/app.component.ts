import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { WeatherService } from './weather.service';
import { MenuComponent } from "./menu/menu.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [WeatherService],
    imports: [RouterOutlet, DashboardComponent, MenuComponent]
})
export class AppComponent {
  title = 'Assignment3_API';
}
