import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Corrected to 'styleUrls' for array
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  constructor(private loginService: LoginService, private router: Router) {}

  print() {
    // Update auth object with the latest values of email and password
    const auth = {
      emailaddress: this.email,
      password: this.password
    };
    
    console.log(auth.emailaddress + ' ' + auth.password);
    this.loadToken(auth);
  }

  token: string | null = null;

  loadToken(auth: { emailaddress: string; password: string }) {
    this.loginService.getToken(auth).subscribe(
      (data) => {
        console.log("Data  "+data.token)
        console.log('Auth data:', auth);  // Logging the auth object
        this.token = data.token;
        console.log("Token" +this.token);
        this.sendAuthRequest();
      },
      (error: any) => {
        console.error('Error Fetching', error);
        this.token = "Error";
      }
    );
  }

  sendAuthRequest() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    const url = 'http://localhost:9099/login';
    this.loginService.sendAuthenticatedRequest(url, headers).subscribe(
      (data) => {
        console.log('Authenticated Request Successful:', data);
        this.router.navigate(['home']);
      },
      (error: any) => {
        console.error('Authenticated Request Failed:', error);
      }
    );
  }
}
