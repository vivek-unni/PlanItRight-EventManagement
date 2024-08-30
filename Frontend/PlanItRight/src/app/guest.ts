export class Guest {
    id: number;
    name: string;
    email: string;
    rsvpStatus: string;

    constructor(id: number, name: string, email: string, rsvpStatus: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.rsvpStatus = rsvpStatus;
    }
}
