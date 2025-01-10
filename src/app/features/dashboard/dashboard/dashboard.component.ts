import { Component, inject } from '@angular/core';
import { TasksClassificationComponent } from '../components/tasks-classification/tasks-classification.component';
import { AllTasksComponent } from '../components/all-tasks/all-tasks.component';
import { HasRoleDirective } from '../../../core/directives/has-role.directive';
import { NotificationService } from '../../../core/services/notification';
import { DatePipe } from '@angular/common';
import { AttendanceService } from '../../../core/services/attendance';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatisticsService } from '../../../core/services/statistics.service';

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
  attendanceService = inject(AttendanceService);
  statService = inject(StatisticsService);
  snackBar = inject(MatSnackBar);
  currentRole = localStorage.getItem('role') ?? '';

  isLiked = false;
  react() {
    this.notiService.react(this.currentNoti.id).subscribe(() => {
      this.isLiked = true;
    });
  }

  checkIn() {
    this.attendanceService.checkIn().subscribe(() => {
      this.showMessage('تم تسجيل الحضور بنجاح ✅✅');
      this.getCurrentAttendance();
    });
  }
  checkOut(id: number) {
    this.attendanceService.checkOut(id).subscribe(() => {
      this.showMessage('تم تسجيل الانصراف بنجاح ✅✅');
      this.getCurrentAttendance();
    });
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  currentStat: any;
  totalTask: number = 0;
  getStats() {
    this.statService.getStats().subscribe((res: any) => {
      this.currentStat = res;
      this.totalTask =
        res.newTasks + res.completedTasks + res.continuedTasks + res.overdue;
    });
  }

  getCurrentAttendance() {
    this.attendanceService
      .getCurrentAttendance()
      .subscribe((res) => (this.currentAttendance = res));
  }

  getLatestAttendance() {
    this.notiService.getLatest().subscribe((res) => {
      this.currentNoti = res;
    });
  }
  // currentUtcDate = new Date().toISOString();
  currentAttendance: any;
  currentNoti: any;
  ngOnInit(): void {
    if (this.currentRole === 'Employee') {
      this.getCurrentAttendance();
    }
    if (['Admin', 'Employee'].some((role) => this.currentRole === role)) {
      this.getLatestAttendance();
      this.getStats();
    }
  }
}
