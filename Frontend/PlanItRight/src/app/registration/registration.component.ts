import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../registration.service';
import { NgIf } from '@angular/common';
// Import your registration service

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf] // Include necessary imports directly in the component
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) {
    this.registrationForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Easy access to form fields for validation purposes
  get f() { return this.registrationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;

    // Call the registration service and send form data
    this.registrationService.registerUser(this.registrationForm.value)
      .subscribe({
        next: response => {
          // Handle successful response
          this.successMessage = 'Registration successful!';
          console.log('Registration Response: ', response);
          this.loading = false;
        },
        error: error => {
          // Handle error response
          this.errorMessage = 'Registration failed. Please try again.';
          console.error('Registration Error: ', error);
          this.loading = false;
        }
      });
  }
}
