import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { EmploymentComponent } from './features/employment/employment.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Danat',
  },
  {
    path: 'employment',
    component: EmploymentComponent,
    title: 'Employment',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/ui/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: '404 - Not Found',
  },
];
