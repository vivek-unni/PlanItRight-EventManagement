import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageComponent } from "./home/homepage/homepage.component";
import { EventsComponent } from "./user/events/events.component";
import { DashboardComponent } from "./user/events/dashboard/dashboard.component";
import { GuestlistComponent } from "./user/events/guestlist/guestlist.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomepageComponent, EventsComponent, DashboardComponent, GuestlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PlanItRight';
}
