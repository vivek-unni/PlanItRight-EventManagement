export class Task {
    id: number;
    name: string;
    description: string;
    dueDate: Date;
    status: string;

    constructor(id: number, name: string, description: string, dueDate: Date, status: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
}
