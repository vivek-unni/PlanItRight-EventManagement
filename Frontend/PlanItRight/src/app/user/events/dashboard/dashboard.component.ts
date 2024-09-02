import { Component } from '@angular/core';
import { EventNavComponent } from "../event-nav/event-nav.component";
import { BudgetVendorsSubComponent } from "./budget-vendors-sub/budget-vendors-sub.component";
import { GuestlistSubComponent } from "./guestlist-sub/guestlist-sub.component";
import { ScheduleSubComponent } from "./schedule-sub/schedule-sub.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [EventNavComponent, BudgetVendorsSubComponent, GuestlistSubComponent, ScheduleSubComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  eventId!: number; // Event ID
  eventName:string='Event Name';
  eventDate:string='Event Date';
  eventLocation:string='Event Location';
  eventDescription:string='Event Description';
  totalBudget:number=0;
  remainingBudget:number=0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    console.log('Event ID:', this.eventId);
  }

}
