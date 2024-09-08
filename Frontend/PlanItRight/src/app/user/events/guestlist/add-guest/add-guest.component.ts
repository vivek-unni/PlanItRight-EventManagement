import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuestService } from '../../../../GuestService/guest.service';
import { NotificationService } from '../../../../NotificationService/notification.service';
import { NotificationModel } from '../../../../Models/NotificationModel';
import { EventService } from '../../../../event.service';

@Component({
  selector: 'app-add-guest',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-guest.component.html',
  styleUrl: './add-guest.component.css'
})
export class AddGuestComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() guestAdded = new EventEmitter<void>();

  eventIdget = localStorage.getItem('eventId');
  eventId = Number(this.eventIdget);
  guestName: string = '';
  guestEmail: string = '';

  constructor(
    private guestService: GuestService,
    private notificationService: NotificationService,
    private eventService: EventService  // Inject the event service
  ) {}

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    if (this.guestName && this.guestEmail) {
      const newGuest = {
        name: this.guestName,
        email: this.guestEmail,
        rsvpStatus: '',
        eventId: this.eventId
      };

      this.guestService.addGuest(this.eventId, newGuest).subscribe(
        (response: any) => {  // Adjust response type as needed
          console.log('Guest added successfully:', response);
          const guestId = response.id;  // Assuming response contains the guest ID
          this.updateNotificationAndSendEmail(guestId);  // Call the method to update notification
          this.onClose(); 
        },
        (error) => {
          console.error('Error adding guest:', error);
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }
   
  rsvpUrl:string=`http://localhost:4200/rsvp/${this.eventId}`;
  updateNotificationAndSendEmail(guestId: number): void {
    this.eventService.fetchEventById(this.eventId).subscribe(
      (event) => {
        const notification: NotificationModel = {
          message: `You have been invited to attend the event: ${event.name}. Event Date: ${event.date}. Open the given link and please enter your availability status. link:`,
          subject: `RSVP for ${event.name}`
        };

        this.notificationService.sendEmail(notification, guestId, this.eventId)
          .subscribe(
            (response) => {
              console.log('Email sent successfully:', response);
            },
            (error) => {
              console.error('Error sending email:', error);
            }
          );
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }}
