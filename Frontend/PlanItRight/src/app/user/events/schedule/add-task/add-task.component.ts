import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() closePopup = new EventEmitter<void>();

  taskName: string = '';
  dueDate: string = '';
  dueTime: string = '';
  taskDescription: string = '';

  onClose(): void {
    this.closePopup.emit();
  }

  onSubmit(): void {
    if (this.taskName && this.dueDate && this.dueTime) {
      const taskData = {
        taskName: this.taskName,
        dueDate: this.dueDate,
        dueTime: this.dueTime,
        taskDescription: this.taskDescription
      };

      console.log('Task Data:', taskData);

      this.onClose(); 
    } else {
      alert('Please fill in all required fields');
    }
  }

}
