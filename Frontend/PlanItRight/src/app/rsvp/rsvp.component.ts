import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { GuestService } from '../GuestService/guest.service';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']  // Corrected to 'styleUrls' for array
})
export class RsvpComponent implements OnInit {
  
  rsvpForm!: FormGroup;
  eventId!: number;  // Declare eventId

  constructor(
    private formBuilder: FormBuilder,
    private rsvpService: GuestService,
    private route: ActivatedRoute  // Inject ActivatedRoute
  ) {}

  ngOnInit() {
    // Get eventId from route parameters
    this.route.params.subscribe(params => {
      this.eventId = +params['eventId'];  // Convert to number
      this.initializeForm();
    });
  }

  initializeForm() {
    this.rsvpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      attending: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.rsvpForm.valid) {
      console.log('RSVP submitted:', this.rsvpForm.value);
      // Send RSVP data along with eventId
      this.rsvpService.changeRsvpStatus(
        this.eventId,
        this.rsvpForm.get('email')?.value,
        this.rsvpForm.get('attending')?.value
      ).subscribe(
        response => {
          console.log('RSVP status updated:', response);
          alert('Thank you for your RSVP!');
          this.rsvpForm.reset();
        },
        error => {
          console.error('Error updating RSVP status:', error);
          alert('There was an error submitting your RSVP.');
        }
      );
    }
  }
}
