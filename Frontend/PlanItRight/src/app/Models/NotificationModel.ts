export class NotificationModel{
    message:string;
    subject:string;

    constructor(message:string, subject:string){
        this.message=message;
        this.subject=subject;
    }
}