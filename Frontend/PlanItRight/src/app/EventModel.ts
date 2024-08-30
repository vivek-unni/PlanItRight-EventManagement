import { Task } from './task';
import { Guest } from  './guest';
export class EventModel {
    eventId: number;
    name: string;
    description: string;
    date: Date;
    location: string;
    type: string;
    tasks: Task[];
    guests: Guest[];
    
    


    constructor(eventId: number,name: string,description: string,date: Date,location: string,type: string,tasks: Task[] = [],guests: Guest[] = []) {
        this.eventId = eventId;
        this.name = name;
        this.description = description;
        this.date = date;
        this.location = location;
        this.type = type;
        this.tasks = tasks;
        this.guests = guests;
    }
}
