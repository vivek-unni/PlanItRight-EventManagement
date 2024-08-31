import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-popup',
  standalone: true,
  imports: [FormsModule,CommonModule,NgIf],
  templateUrl: './event-popup.component.html',
  styleUrl: './event-popup.component.css'
})
export class EventPopupComponent {
  
  @Output() closePopup = new EventEmitter<void>();

  eventName: string = '';
  eventDate: string = '';
  eventLocation: string = '';
  eventDescription: string = '';
  eventBudget:number = 0;
  eventType: string = '';

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    if (this.eventName && this.eventDate && this.eventLocation) {
      const eventData = {
        eventName: this.eventName,
        eventDate: this.eventDate,
        eventLocation: this.eventLocation,
        eventDescription: this.eventDescription,
        eventBudget:this.eventBudget,
        eventType:this.eventType
      };

      console.log('Event Data:', eventData);

      this.onClose(); 
    } else {
      alert('Please fill in all required fields');
    }
  }
}
