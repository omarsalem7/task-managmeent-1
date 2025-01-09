import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { authGuard } from '../../core/guards/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [authGuard],
    data: { title: 'الرئيسية' },
    children: [
      {
        path: 'stats',
        loadComponent: () =>
          import('./components/task-stats/task-stats.component').then(
            (m) => m.TaskStatsComponent
          ),
      },
      {
        path: 'activity',
        loadComponent: () =>
          import('./components/recent-activity/recent-activity.component').then(
            (m) => m.RecentActivityComponent
          ),
      },
    ],
  },
];
