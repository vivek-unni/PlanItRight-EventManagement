export class Guest{
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    eventId: number;

    constructor(id: number, name: string, email: string, phone: string, status: string, eventId: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.eventId = eventId;
    }
}