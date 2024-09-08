import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  sendAuthenticatedRequest(url: string, headers: HttpHeaders): Observable<any> {
    return this.http.get(url, { headers, responseType: 'text' as 'json' }).pipe(
      catchError(error => {
        console.error('Error during authenticated request:', error);
        return throwError(error);
      })
    );
  }

  getToken(credentials: { username: string; password: string }): Observable<any> {
    let url = "http://localhost:7000/api/login";
    console.log("Sending request to:", url);
    console.log("Credentials:", credentials);
    return this.http.post(url, credentials).pipe(
      catchError(error => {
        console.error("Error during token retrieval:", error);
        return throwError(error);
      })
    );
  }
}
