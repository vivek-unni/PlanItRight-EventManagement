import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-event-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-nav.component.html',
  styleUrl: './event-nav.component.css'
})
export class EventNavComponent {
  isNavbarExpanded: boolean = false;

  toggleNavbarVisibility(): void {
    this.isNavbarExpanded = !this.isNavbarExpanded;
  }
}
