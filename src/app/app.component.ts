import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MenuComponent } from "./menu/menu.component";
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http';
import { ShareDateService } from './share-date.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, DashboardComponent],
    providers: [WeatherService]
})
export class AppComponent {
  title = 'Assignment3_API';
}
