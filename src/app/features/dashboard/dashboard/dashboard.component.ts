import { Component, inject } from '@angular/core';
import { TasksClassificationComponent } from '../components/tasks-classification/tasks-classification.component';
import { AllTasksComponent } from '../components/all-tasks/all-tasks.component';
import { HasRoleDirective } from '../../../core/directives/has-role.directive';
import { NotificationService } from '../../../core/services/notification';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TasksClassificationComponent,
    AllTasksComponent,
    HasRoleDirective,
    DatePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  notiService = inject(NotificationService);
  currentRole = localStorage.getItem('role') ?? '';

  isLiked = false;
  react() {
    this.notiService.react(this.currentNoti.id).subscribe(() => {
      this.isLiked = true;
    });
  }

  currentNoti: any;
  ngOnInit(): void {
    if (this.currentRole == 'Employee') {
      this.notiService.getLatest().subscribe((res) => {
        this.currentNoti = res;
      });
    }
  }
}
