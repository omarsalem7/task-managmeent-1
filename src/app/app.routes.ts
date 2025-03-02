import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { EmploymentComponent } from './features/employment/employment.component';
import { RequestServiceComponent } from './features/request-service/request-service.component';

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
    path: 'services',
    component: RequestServiceComponent,
    title: 'Services',
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
