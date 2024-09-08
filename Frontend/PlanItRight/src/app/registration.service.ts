import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Angular 18 still supports the root injector pattern
})
export class RegistrationService {
  private baseUrl = 'http://localhost:7000/api/register'; // Replace with your actual registration endpoint URL

  constructor(private http: HttpClient) { }

  // Call the registration endpoint to save the user
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, userData);
  }
}
