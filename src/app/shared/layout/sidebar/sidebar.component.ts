import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'الرئيسية', icon: 'fas fa-home', route: '/dashboard' },
    { label: 'إدارة المهام', icon: 'fas fa-tasks', route: '/tasks' },
    { label: 'إدارة الموظفين', icon: 'fas fa-users', route: '/employee' },
    { label: 'tenants', icon: 'fas fa-chart-line', route: '/tenants' },
    { label: 'التدريب', icon: 'fas fa-file-contract', route: '/train' },
    { label: 'الملفات', icon: 'fas fa-file-invoice', route: '/files' },
    { label: 'التقرير', icon: 'fas fa-chart-bar', route: '/reports' },
  ];

  settingsItems: MenuItem[] = [
    { label: 'الاعدادات', icon: 'fas fa-cog', route: '/settings' },
    {
      label: 'ادارة مستخدمين النظام',
      icon: 'fas fa-users-cog',
      route: '/user-management',
    },
    {
      label: 'اعدادات النظام',
      icon: 'fas fa-tools',
      route: '/system-settings',
    },
    { label: 'الدعم الفني', icon: 'fas fa-headset', route: '/support' },
  ];
}
