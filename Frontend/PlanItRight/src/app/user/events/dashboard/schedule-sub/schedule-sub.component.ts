import { NgClass, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


//model interface
interface Schedule {
  id: number;
  name: string;
  description: string;
  dueDate: Date;
  status: string;
};


@Component({
  selector: 'app-schedule-sub',
  standalone: true,
  imports: [NgFor,NgClass],
  templateUrl: './schedule-sub.component.html',
  styleUrl: './schedule-sub.component.css'
})





export class ScheduleSubComponent implements OnInit {
  schedules: Schedule[] = [];
  currentIndex: number = 0;
  intervalId: any;

  @Input() eventId!: number;

  constructor() {}

  ngOnInit(): void {
    // Extended dummy data for demonstration purposes
    console.log('Event ID:', this.eventId);
    this.schedules = [
      { id: 1, name: 'Complete Angular Project', description: 'Finish the Angular project and submit it before the due date.', dueDate: new Date('2024-09-01'), status: 'Pending' },
      { id: 2, name: 'Prepare Presentation', description: 'Prepare slides for the upcoming presentation.', dueDate: new Date('2024-09-02'), status: 'In Progress' },
      { id: 3, name: 'Client Meeting', description: 'Meeting with the client to discuss project requirements.', dueDate: new Date('2024-09-03'), status: 'Done' },
      { id: 4, name: 'Submit Report', description: 'Compile and submit the monthly report.', dueDate: new Date('2024-09-04'), status: 'Pending' },
      { id: 5, name: 'Team Standup', description: 'Daily standup meeting with the team.', dueDate: new Date('2024-09-05'), status: 'In Progress' },
      { id: 6, name: 'Code Review', description: 'Review code for the new feature implementation.', dueDate: new Date('2024-09-06'), status: 'Done' },
      { id: 7, name: 'Update Documentation', description: 'Update project documentation with the latest changes.', dueDate: new Date('2024-09-07'), status: 'Pending' },
      { id: 8, name: 'Deploy to Production', description: 'Deploy the latest version of the application to production.', dueDate: new Date('2024-09-08'), status: 'In Progress' },
      { id: 9, name: 'Client Feedback', description: 'Gather feedback from the client after the deployment.', dueDate: new Date('2024-09-09'), status: 'Done' },
      { id: 10, name: 'Plan Sprint', description: 'Plan the tasks for the next sprint.', dueDate: new Date('2024-09-10'), status: 'Pending' }
    ];

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
    // Move to the next set of 6 tasks
    this.currentIndex += 1;
    if (this.currentIndex + 6 > this.schedules.length) {
      this.currentIndex = 0; // Loop back to the beginning
    }
  }

  getVisibleSchedules(): Schedule[] {
    return this.schedules.slice(this.currentIndex, this.currentIndex + 6);
  }

  getFormattedDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'In Progress':
        return 'status-in-progress';
      case 'Done':
        return 'status-done';
      default:
        return '';
    }
  }
}
