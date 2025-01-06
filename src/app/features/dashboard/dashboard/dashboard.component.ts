import { Component } from '@angular/core';
import { TasksClassificationComponent } from '../components/tasks-classification/tasks-classification.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TasksClassificationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
