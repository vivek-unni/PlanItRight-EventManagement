import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-guest',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-guest.component.html',
  styleUrl: './add-guest.component.css'
})
export class AddGuestComponent {

  @Output() closePopup = new EventEmitter<void>();

  guestName: string = '';
  guestEmail: string = '';
  guestPhone: string = '';

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    if (this.guestName && this.guestEmail && this.guestPhone) {
      const eventData = {
        guestName: this.guestName,
        guestEmail: this.guestEmail,
        guestPhone: this.guestPhone,
      };

      console.log('Event Data:', eventData);

      this.onClose(); 
    } else {
      alert('Please fill in all required fields');
    }
  }

}
