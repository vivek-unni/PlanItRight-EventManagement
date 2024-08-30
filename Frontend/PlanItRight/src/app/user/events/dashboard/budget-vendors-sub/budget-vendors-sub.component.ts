import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-budget-vendors-sub',
  standalone: true,
  imports: [NgFor],
  templateUrl: './budget-vendors-sub.component.html',
  styleUrl: './budget-vendors-sub.component.css'
})
export class BudgetVendorsSubComponent {
  vendors: any[] = [];
  highestVendor: any;
  secondHighestVendor: any;
  currentIndex: number = 0;
  intervalId: any;

  constructor() {}

  ngOnInit(): void {
    // Hardcoded dummy data for demonstration
    this.vendors = [
      { name: 'Vendor A', spend: 50000 },
      { name: 'Vendor B', spend: 40000 },
      { name: 'Vendor C', spend: 30000 },
      { name: 'Vendor D', spend: 20000 },
      { name: 'Vendor E', spend: 10000 },
      { name: 'Vendor F', spend: 5000 },
      { name: 'Vendor G', spend: 8000 }
    ];

    // Sort vendors by spend in descending order
    this.vendors.sort((a, b) => b.spend - a.spend);

    // Set the highest and second highest vendors
    if (this.vendors.length > 0) {
      this.highestVendor = this.vendors[0];
    }

    if (this.vendors.length > 1) {
      this.secondHighestVendor = this.vendors[1];
    }

    // Start the interval to automatically iterate through the data
    this.intervalId = setInterval(() => {
      this.nextSet();
    }, 3000); // Change rows every 3 seconds
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSet(): void {
    // Move to the next set of 5 vendors
    this.currentIndex += 1;
    if (this.currentIndex + 5 > this.vendors.length) {
      this.currentIndex = 0; // Loop back to the beginning
    }
  }

  getVisibleVendors(): any[] {
    return this.vendors.slice(this.currentIndex, this.currentIndex + 5);
  }
}
