import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from './EventModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http : HttpClient) { }

  fetchAllEvents(){
    let url="http://localhost:7001/api/events/all"
    return this.http.get<EventModel[]>(url)
  }
}
