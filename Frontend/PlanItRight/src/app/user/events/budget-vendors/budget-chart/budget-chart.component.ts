import { Component, AfterViewInit, ElementRef, ViewChild, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, registerables, Title, Tooltip } from 'chart.js';
import { VendorsComponent } from "../vendors/vendors.component";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

@Component({
  selector: 'app-budget-chart',
  standalone: true,
  imports: [CommonModule, VendorsComponent],
  templateUrl: './budget-chart.component.html',
  styleUrls: ['./budget-chart.component.css']
})

export class BudgetChartComponent implements AfterViewChecked, OnInit, OnDestroy {
  @ViewChild('budgetChart', { static: false }) budgetChartRef!: ElementRef<HTMLCanvasElement>;

  budgetData: any;
  chart: Chart | null = null;
  chartInitialized = false;

  visibleVendors: { name: string, expense: number }[] = [];
  currentPage: number = 0;
  vendorsPerPage: number = 10;

  // Expose Math to the template
  Math = Math;

  totalExpenses: number = 0;
  remainingBudget: number = 0;

  // Properties for search functionality
  searchTerm: string = '';
  filteredVendors: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Dummy data for demonstration
    this.budgetData = {
      name: 'Event A',
      total_budget: 120000,
      vendors: [
        { name: 'Vendor A', eventId: 1, expense: 8000, dueDate: '2024-09-01', status: 'Pending' },
        { name: 'Vendor B', eventId: 1, expense: 7500, dueDate: '2024-09-05', status: 'In Progress' },
        { name: 'Vendor A', eventId: 1, expense: 6000, dueDate: '2024-09-10', status: 'Done' },
        { name: 'Vendor C', eventId: 2, expense: 5000, dueDate: '2024-09-15', status: 'Pending' },
        { name: 'Vendor B', eventId: 2, expense: 9000, dueDate: '2024-09-20', status: 'In Progress' },
        { name: 'Vendor F', eventId: 3, expense: 8500, dueDate: '2024-09-25', status: 'Done' },
        { name: 'Vendor G', eventId: 3, expense: 10000, dueDate: '2024-09-30', status: 'Pending' },
        { name: 'Vendor H', eventId: 4, expense: 9500, dueDate: '2024-10-05', status: 'In Progress' },
        { name: 'Vendor I', eventId: 4, expense: 7000, dueDate: '2024-10-10', status: 'Done' },
        { name: 'Vendor J', eventId: 5, expense: 6500, dueDate: '2024-10-15', status: 'Pending' },
        { name: 'Vendor K', eventId: 5, expense: 12000, dueDate: '2024-10-20', status: 'In Progress' },
        { name: 'Vendor L', eventId: 6, expense: 10000, dueDate: '2024-10-25', status: 'Done' },
        { name: 'Vendor M', eventId: 6, expense: 11000, dueDate: '2024-10-30', status: 'Pending' },
        { name: 'Vendor N', eventId: 7, expense: 12000, dueDate: '2024-11-01', status: 'In Progress' }
      ]
    };

    this.filteredVendors = this.budgetData.vendors;
    this.updateBudgetInfo();
    this.updateVisibleVendors();
  }

  ngAfterViewChecked(): void {
    if (this.budgetData && !this.chartInitialized && this.budgetChartRef) {
      this.createChart(this.visibleVendors);
      this.chartInitialized = true;
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  updateBudgetInfo(): void {
    const aggregatedData = this.aggregateVendorExpenses(this.filteredVendors);
    this.totalExpenses = this.calculateTotalExpenses(aggregatedData);
    this.remainingBudget = this.budgetData.total_budget - this.totalExpenses;
  }

  aggregateVendorExpenses(vendorData: { name: string, expense: number }[]): { name: string, expense: number }[] {
    const expenseMap = new Map<string, number>();

    vendorData.forEach(vendor => {
      if (expenseMap.has(vendor.name)) {
        expenseMap.set(vendor.name, expenseMap.get(vendor.name)! + vendor.expense);
      } else {
        expenseMap.set(vendor.name, vendor.expense);
      }
    });

    return Array.from(expenseMap, ([name, expense]) => ({ name, expense }));
  }

  calculateTotalExpenses(aggregatedData: { name: string, expense: number }[]): number {
    return aggregatedData.reduce((total, vendor) => total + vendor.expense, 0);
  }

  updateVisibleVendors(): void {
    const aggregatedData = this.aggregateVendorExpenses(this.filteredVendors);
    const startIndex = this.currentPage * this.vendorsPerPage;
    const endIndex = startIndex + this.vendorsPerPage;
    this.visibleVendors = aggregatedData.slice(startIndex, endIndex);
    if (this.chart) {
      this.chart.destroy();
      this.createChart(this.visibleVendors);
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.filteredVendors.length / this.vendorsPerPage);
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.updateVisibleVendors();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateVisibleVendors();
    }
  }
  createChart(vendorData: { name: string, expense: number }[]): void {
    const canvas = this.budgetChartRef?.nativeElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }

      console.log('Chart context initialized');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: vendorData.map(vendor => vendor.name),
          datasets: [{
            label: 'Expenses',
            data: vendorData.map(vendor => vendor.expense),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Vendor'
              },
              grid: {
                display: false
              }
            },
            y: {
              title: {
                display: true,
                text: 'Expenses (USD)'
              },
              grid: {
                color: '#f2f2f2'
              }
            }
          }
        }
      });
    } else {
      console.error('Chart context could not be initialized');
    }
  }


  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'in progress':
        return 'status-in-progress';
      case 'done':
        return 'status-done';
      default:
        return '';
    }
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchTerm = searchTerm;
    this.filteredVendors = this.budgetData.vendors.filter((vendor: any) =>
      vendor.name.toLowerCase().includes(this.searchTerm)
    );
    this.currentPage = 0;
    this.updateBudgetInfo();
    this.updateVisibleVendors();
  }

  isPopupOpen = false;


  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

}
