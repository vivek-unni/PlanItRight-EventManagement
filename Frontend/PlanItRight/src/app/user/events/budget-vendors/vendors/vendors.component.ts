import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [FormsModule,CommonModule,NgIf],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent {
  @Output() closePopup = new EventEmitter<void>();

  vendorName: string = '';
  dueDate: string = '';
  vendorPayment: string = '';
  vendorStatus: string = '';

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    if (this.vendorName && this.dueDate && this.vendorPayment && this.vendorStatus) {
      const vendorData = {
        vendorName: this.vendorName,
        dueDate: this.dueDate,
        vendorPayment: this.vendorPayment,
        vendorStatus: this.vendorStatus,
      };

      console.log('Vendor Data:', vendorData);

      this.onClose(); 
    } else {
      alert('Please fill in all required fields');
    }
  }

}
