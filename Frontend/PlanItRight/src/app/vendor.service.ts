import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendorModel } from './VendorModel';
import { Payment } from './PaymentModel';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private vendorApiUrl = 'http://localhost:7002/api/vendors';
  private paymentApiUrl = 'http://localhost:7002/api/payments/all';

  constructor(private http: HttpClient) {}

  fetchVendorById(vendorId: number): Observable<VendorModel> {
    return this.http.get<VendorModel>(`${this.vendorApiUrl}/${vendorId}`);
  }

  fetchAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentApiUrl);
  }
}
  