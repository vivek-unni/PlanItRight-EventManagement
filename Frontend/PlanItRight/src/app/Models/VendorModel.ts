export class VendorModel {
    id: number;
    name: string;
    serviceType: string;
    contactInfo: string;
    status: string;
    location: string;

    constructor(id: number, name: string, serviceType: string, contactInfo: string, status: string, location: string) {
        this.id = id;
        this.name = name;
        this.serviceType = serviceType;
        this.contactInfo = contactInfo;
        this.status = status;
        this.location = location;
    }
}

