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
  selectedFile: File | null = null;

  onClose(): void {
    this.closePopup.emit();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.eventName && this.eventDate && this.eventLocation) {
      const eventData = {
        eventName: this.eventName,
        eventDate: this.eventDate,
        eventLocation: this.eventLocation,
        guestListFile: this.selectedFile
      };

      console.log('Event Data:', eventData);

      this.onClose(); // Close the popup after submission
    } else {
      alert('Please fill in all required fields');
    }
  }
}
