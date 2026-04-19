import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  currentTask: Task = { title: '', description: '', color: '' };
  isEditing = false;
  
  // 4 Pastel Colors
  colors = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)'];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  onSubmit(): void {
    if (!this.currentTask.title.trim()) return;

    if (this.isEditing && this.currentTask._id) {
      this.taskService.updateTask(this.currentTask._id, this.currentTask).subscribe({
        next: () => {
          this.loadTasks();
          this.resetForm();
        },
        error: (err) => console.error('Error updating task', err)
      });
    } else {
      // Assign random color on creation
      this.currentTask.color = this.getRandomColor();
      this.taskService.createTask(this.currentTask).subscribe({
        next: () => {
          this.loadTasks();
          this.resetForm();
        },
        error: (err) => console.error('Error creating task', err)
      });
    }
  }

  editTask(task: Task): void {
    this.currentTask = { ...task };
    this.isEditing = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteTask(id: string | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Error deleting task', err)
      });
    }
  }

  resetForm(): void {
    this.currentTask = { title: '', description: '', color: '' };
    this.isEditing = false;
  }
}
