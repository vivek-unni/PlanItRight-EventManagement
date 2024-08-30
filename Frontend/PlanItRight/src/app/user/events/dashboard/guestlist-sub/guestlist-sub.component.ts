import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-guestlist-sub',
  standalone: true,
  imports: [NgFor],
  templateUrl: './guestlist-sub.component.html',
  styleUrl: './guestlist-sub.component.css'
})
export class GuestlistSubComponent {
  guests: any[] = [];
  acceptedGuests: any[] = [];
  rejectedGuests: any[] = [];
  currentAcceptedIndex: number = 0;
  currentRejectedIndex: number = 0;
  intervalId: any;

  constructor() { }

  ngOnInit(): void {
    // Hardcoded dummy data for demonstration
    this.guests = [
      { name: 'John Doe', status: 'accepted' },
      { name: 'Jane Smith', status: 'rejected' },
      { name: 'Alice Johnson', status: 'accepted' },
      { name: 'Bob Brown', status: 'rejected' },
      { name: 'Charlie Davis', status: 'accepted' },
      { name: 'Emily White', status: 'accepted' },
      { name: 'Frank Black', status: 'rejected' },
      { name: 'George Green', status: 'accepted' },
      { name: 'Helen Blue', status: 'rejected' },
      { name: 'Ian Yellow', status: 'accepted' },
      { name: 'Jack Orange', status: 'accepted' },
      { name: 'Karen Purple', status: 'rejected' },
      { name: 'Laura Pink', status: 'accepted' },
      { name: 'Mike Gray', status: 'rejected' },
      { name: 'Nina Violet', status: 'accepted' },
      { name: 'Oscar Red', status: 'accepted' },
      { name: 'Paul Cyan', status: 'rejected' },
      { name: 'Quincy Magenta', status: 'accepted' },
      { name: 'Rachel Lime', status: 'rejected' },
      { name: 'Steve Brown', status: 'accepted' },
      { name: 'Tina Black', status: 'accepted' },
      { name: 'Uma White', status: 'rejected' },
      { name: 'Victor Blue', status: 'accepted' },
      { name: 'Wendy Green', status: 'rejected' },
      { name: 'Xander Yellow', status: 'accepted' },
      { name: 'Yara Orange', status: 'accepted' },
      { name: 'Zane Purple', status: 'rejected' }
    ];

    this.acceptedGuests = this.guests.filter(guest => guest.status === 'accepted');
    this.rejectedGuests = this.guests.filter(guest => guest.status === 'rejected');

    // Start the interval to automatically iterate through the data
    this.intervalId = setInterval(() => {
      this.nextSet();
    }, 3000); // Change rows every 3 seconds
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSet(): void {
    // Move to the next set of 5 accepted guests
    this.currentAcceptedIndex += 1;
    if (this.currentAcceptedIndex + 5 > this.acceptedGuests.length) {
      this.currentAcceptedIndex = 0; // Loop back to the beginning
    }

    // Move to the next set of 5 rejected guests
    this.currentRejectedIndex += 1;
    if (this.currentRejectedIndex + 5 > this.rejectedGuests.length) {
      this.currentRejectedIndex = 0; // Loop back to the beginning
    }
  }

  getAcceptedGuests(): any[] {
    return this.acceptedGuests.slice(this.currentAcceptedIndex, this.currentAcceptedIndex + 5);
  }

  getRejectedGuests(): any[] {
    return this.rejectedGuests.slice(this.currentRejectedIndex, this.currentRejectedIndex + 5);
  }
}
