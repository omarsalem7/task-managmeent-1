import { Routes } from '@angular/router';
// import { authGuard } from '../../core/guards/auth.guard';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/task-list/task-list.component').then(
            (m) => m.TaskListComponent
          ),
        title: 'Tasks - Task Management',
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./components/task-form/task-form.component').then(
            (m) => m.TaskFormComponent
          ),
        title: 'New Task - Task Management',
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./components/task-form/task-form.component').then(
            (m) => m.TaskFormComponent
          ),
        title: 'Edit Task - Task Management',
      },
    ],
  },
];
