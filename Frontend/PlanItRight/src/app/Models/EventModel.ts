import { Task } from "./TaskModel";
import { Guest } from "./GuestModel";

export class EventModel{
    eventId: number;
    name: string;
    description: string;
    date: Date;
    location: string;
    type: string;
    budget: number;
    tasks: Task[];
    guests: Guest[];




    constructor(eventId: number, name: string, description: string, date: Date, location: string, type: string, budget: number, tasks: Task[] = [], guests: Guest[] = []) {
        this.eventId = eventId;
        this.name = name;
        this.description = description;
        this.date = date;
        this.location = location;
        this.type = type;
        this.budget = budget;
        this.tasks = tasks;
        this.guests = guests;
    }
}
