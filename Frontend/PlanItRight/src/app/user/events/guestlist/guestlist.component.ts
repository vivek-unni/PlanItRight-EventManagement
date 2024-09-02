import { Component, Input, OnInit } from '@angular/core';
import { EventNavComponent } from "../event-nav/event-nav.component";
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AddGuestComponent } from "./add-guest/add-guest.component";

@Component({
  selector: 'app-guestlist',
  standalone: true,
  imports: [EventNavComponent, NgFor, CommonModule, FormsModule, AddGuestComponent],
  templateUrl: './guestlist.component.html',
  styleUrl: './guestlist.component.css'
})
export class GuestlistComponent implements OnInit {

  @Input() eventId!: number;


  guests: any[] = [];
  acceptedGuests: any[] = [];
  rejectedGuests: any[] = [];
  noreplyGuests: any[] = [];
  filteredAcceptedGuests: any[] = [];
  filteredRejectedGuests: any[] = [];
  filteredNoReplyGuests: any[] = [];
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {

    console.log('Event ID:', this.eventId);

    // Hardcoded dummy data for demonstration
    this.guests = [
      { name: 'John Doe', status: 'accepted', email: 'john.doe@example.com' },
      { name: 'Jane Smith', status: 'rejected', email: 'jane.smith@example.com' },
      { name: 'Alice Johnson', status: 'accepted', email: 'alice.johnson@example.com' },
      { name: 'Bob Brown', status: 'rejected', email: 'bob.brown@example.com' },
      { name: 'Charlie Davis', status: 'accepted', email: 'charlie.davis@example.com' },
      { name: 'Emily White', status: 'accepted', email: 'emily.white@example.com' },
      { name: 'Frank Black', status: 'rejected', email: 'frank.black@example.com' },
      { name: 'George Green', status: 'accepted', email: 'george.green@example.com' },
      { name: 'Helen Blue', status: 'rejected', email: 'helen.blue@example.com' },
      { name: 'Ian Yellow', status: 'accepted', email: 'ian.yellow@example.com' },
      { name: 'Jack Orange', status: 'accepted', email: 'jack.orange@example.com' },
      { name: 'Karen Purple', status: 'rejected', email: 'karen.purple@example.com' },
      { name: 'Laura Pink', status: 'accepted', email: 'laura.pink@example.com' },
      { name: 'Mike Gray', status: 'rejected', email: 'mike.gray@example.com' },
      { name: 'Nina Violet', status: 'accepted', email: 'nina.violet@example.com' },
      { name: 'Oscar Red', status: 'accepted', email: 'oscar.red@example.com' },
      { name: 'Paul Cyan', status: 'rejected', email: 'paul.cyan@example.com' },
      { name: 'Quincy Magenta', status: 'accepted', email: 'quincy.magenta@example.com' },
      { name: 'Rachel Lime', status: 'rejected', email: 'rachel.lime@example.com' },
      { name: 'Steve Brown', status: 'accepted', email: 'steve.brown@example.com' },
      { name: 'Tina Black', status: 'accepted', email: 'tina.black@example.com' },
      { name: 'Uma White', status: 'rejected', email: 'uma.white@example.com' },
      { name: 'Victor Blue', status: 'accepted', email: 'victor.blue@example.com' },
      { name: 'Wendy Green', status: 'rejected', email: 'wendy.green@example.com' },
      { name: 'Xander Yellow', status: 'accepted', email: 'xander.yellow@example.com' },
      { name: 'Yara Orange', status: 'accepted', email: 'yara.orange@example.com' },
      { name: 'Zane Purple', status: 'rejected', email: 'zane.purple@example.com' },
      { name: 'Albert Silver', status: 'noreply', email: 'albert.silver@example.com' },
      { name: 'Betty Gold', status: 'noreply', email: 'betty.gold@example.com' },
      { name: 'Catherine Bronze', status: 'noreply', email: 'catherine.bronze@example.com' },
      { name: 'David Copper', status: 'noreply', email: 'david.copper@example.com' },
      { name: 'Eve Nickel', status: 'noreply', email: 'eve.nickel@example.com' },
      { name: 'Fred Zinc', status: 'noreply', email: 'fred.zinc@example.com' }
    ];

    // Initially display all guests
    this.acceptedGuests = this.guests.filter(guest => guest.status === 'accepted');
    this.rejectedGuests = this.guests.filter(guest => guest.status === 'rejected');
    this.noreplyGuests = this.guests.filter(guest => guest.status === 'noreply');

    // Set the filtered lists to show all guests initially
    this.filterGuests();
  }

  filterGuests(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();

    if (!this.searchTerm) {
      // If search term is empty, show all guests
      this.filteredAcceptedGuests = [...this.acceptedGuests];
      this.filteredRejectedGuests = [...this.rejectedGuests];
      this.filteredNoReplyGuests = [...this.noreplyGuests];
    } else {
      // Otherwise, filter based on the search term
      this.filteredAcceptedGuests = this.acceptedGuests.filter(guest =>
        guest.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        guest.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
      this.filteredRejectedGuests = this.rejectedGuests.filter(guest =>
        guest.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        guest.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
      this.filteredNoReplyGuests = this.noreplyGuests.filter(guest =>
        guest.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        guest.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
  }

  getAcceptedGuests(): any[] {
    return this.filteredAcceptedGuests;
  }

  getRejectedGuests(): any[] {
    return this.filteredRejectedGuests;
  }

  getNoReplyGuests(): any[] {
    return this.filteredNoReplyGuests;
  }

  //POPUP ADD GUEST

  isPopupOpen = false;


  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }
  
}
