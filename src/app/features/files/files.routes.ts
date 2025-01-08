import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const FILES_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    data: { title: 'tenants' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/files-list/files-list.component').then(
            (m) => m.FilesListComponent
          ),
      },
    ],
  },
];
