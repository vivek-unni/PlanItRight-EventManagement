import { Component } from '@angular/core';
import { EventNavComponent } from "../event-nav/event-nav.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EventNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
