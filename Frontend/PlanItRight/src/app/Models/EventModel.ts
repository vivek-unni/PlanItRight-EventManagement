import { Task } from "./TaskModel";
import { GuestModel } from "./GuestModel";

export class EventModel{
    eventId: number;
    name: string;
    description: string;
    date: Date;
    location: string;
    type: string;
    budget: number;
    username: string|null;
    tasks: Task[];
    guests: GuestModel[];

    constructor(eventId: number, name: string,username:string|null, description: string, date: Date, location: string, type: string, budget: number, tasks: Task[] = [], guests: GuestModel[] = []) {
        this.eventId = eventId;
        this.name = name;
        this.description = description;
        this.date = date;
        this.location = location;
        this.type = type;
        this.budget = budget;
        this.username=username;
        this.tasks = tasks;
        this.guests = guests;
    }
}
