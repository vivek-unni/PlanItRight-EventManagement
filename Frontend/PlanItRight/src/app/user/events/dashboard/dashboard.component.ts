import { Component } from '@angular/core';
import { EventNavComponent } from "../event-nav/event-nav.component";
import { BudgetVendorsSubComponent } from "./budget-vendors-sub/budget-vendors-sub.component";
import { GuestlistSubComponent } from "./guestlist-sub/guestlist-sub.component";
import { ScheduleSubComponent } from "./schedule-sub/schedule-sub.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EventNavComponent, BudgetVendorsSubComponent, GuestlistSubComponent, ScheduleSubComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  eventName:string='Event Name';
  eventDate:string='Event Date';
  eventLocation:string='Event Location';
  eventDescription:string='Event Description';
  totalBudget:number=0;
  remainingBudget:number=0;

}
