import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from '../../../core/directives/has-role.directive';

interface MenuItem {
  label: string;
  icon: string;
  visible?: boolean;
  route: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, HasRoleDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  currentRole = localStorage.getItem('role') ?? '';
  menuItems: MenuItem[] = [
    {
      label: 'الرئيسية',
      icon: 'fas fa-home',
      route: '/dashboard',
      visible: true,
    },
    {
      label: 'إدارة المهام',
      icon: 'fas fa-tasks',
      route: '/tasks',
      visible: true,
    },
    {
      label: 'إدارة الموظفين',
      icon: 'fas fa-users',
      route: '/employee',
      visible: ['Admin', 'SuperAdmin'].includes(this.currentRole),
    },
    {
      label: 'إدارة الشركات',
      icon: 'fas fa-chart-line',
      route: '/tenants',
      visible: ['SuperAdmin'].includes(this.currentRole),
    },
    {
      label: 'التدريب',
      icon: 'fas fa-file-contract',
      route: '/train',
      visible: true,
    },
    {
      label: 'الملفات',
      icon: 'fas fa-file-invoice',
      route: '/files',
      visible: true,
    },
    {
      label: 'التعميم',
      icon: 'fas fa-chart-bar',
      route: '/notification',
      visible: ['Admin', 'SuperAdmin'].includes(this.currentRole),
    },
    {
      label: 'الحضور والانصراف',
      icon: 'fas fa-chart-bar',
      route: '/attendance',
      visible: true,
    },
    {
      label: 'اعداد كلمة السر',
      icon: 'fas fa-chart-bar',
      route: '/new-password',
      visible: this.currentRole === 'Employee',
    },
  ];

  // settingsItems: MenuItem[] = [
  //   { label: 'الاعدادات', icon: 'fas fa-cog', route: '/settings' },
  //   {
  //     label: 'ادارة مستخدمين النظام',
  //     icon: 'fas fa-users-cog',
  //     route: '/user-management',
  //   },
  //   {
  //     label: 'اعدادات النظام',
  //     icon: 'fas fa-tools',
  //     route: '/system-settings',
  //   },
  //   { label: 'الدعم الفني', icon: 'fas fa-headset', route: '/support' },
  // ];
}
