import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationModel } from '../Models/NotificationModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:7000/api/notifications';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Method to send an email
  sendEmail(notification: NotificationModel, guestId: number, eventId: number): Observable<string> {
    const url = `${this.apiUrl}/sendEmail/eventId=${eventId}/guestId=${guestId}`;
    return this.http.post<string>(url, notification);
  }
}
