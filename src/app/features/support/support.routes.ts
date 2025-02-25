import { Routes } from '@angular/router';
import { SupportListComponent } from './components/support-list/support-list.component';
import { SupportFormComponent } from './components/support-form/support-form.component';

const currentRole = localStorage.getItem('role') ?? '';
export const SUPPORT_ROUTES: Routes = [
  {
    path: '',
    component:
      currentRole === 'SuperAdmin'
        ? SupportListComponent
        : SupportFormComponent,
    data: { title: 'الدعم الفني' },
  },
];
