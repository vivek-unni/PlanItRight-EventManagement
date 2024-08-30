import { Component, OnInit } from '@angular/core';
import { EventPopupComponent } from "../event-popup/event-popup.component";
import { NgFor, NgIf } from '@angular/common';
import { EventService } from '../../event.service';
import { FormsModule } from '@angular/forms';
import { EventModel } from '../../EventModel';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventPopupComponent, NgIf, FormsModule, NgFor],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  create_icon: string = '/assets/icons8-create-90.png';
  calender_icon: string = '/assets/icons8-calender-100.png';
  location_icon: string = '/assets/icons8-location-100.png';

  isPopupOpen = false;
  eventData: EventModel[] = [] ;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.load(); // Call load method on initialization
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  async load() {
    try {
      const data = await lastValueFrom(this.eventService.fetchAllEvents());
      this.eventData = data ?? []; // Default to an empty array if data is undefined
      console.log(this.eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }
  
  openDashboard(event: EventModel): void {
    console.log('Dashboard opened for event:', event.name);
    
  }

  
}
