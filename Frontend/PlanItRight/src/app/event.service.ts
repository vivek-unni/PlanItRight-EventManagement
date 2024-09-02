import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from './EventModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl = "http://localhost:7001/api"
  constructor(private http : HttpClient) { }

  fetchAllEvents(){
    let url="http://localhost:7001/api/events/all"
    return this.http.get<EventModel[]>(url)
  }

  addEvent(event: EventModel): Observable<EventModel> {
    let url = `${this.baseUrl}/events/addEvent`;
    return this.http.post<EventModel>(url, event);
  }
}
