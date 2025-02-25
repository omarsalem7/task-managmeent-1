import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
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
  imports: [RouterModule, MatExpansionModule],
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
      label: 'CRM',
      icon: 'fa fa-bars',
      route: '/crm',
      visible: this.currentRole === 'SuperAdmin',
    },
    {
      label: 'فتح العقد',
      icon: 'fas fa-chart-bar',
      route: '/deals',
      visible: this.currentRole === 'SuperAdmin',
    },
    {
      label: 'الفواتير',
      icon: 'fas fa-chart-bar',
      route: '/bills',
      visible: this.currentRole === 'SuperAdmin',
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
      visible: this.currentRole !== 'SuperAdmin',
    },
    {
      label: 'التعميم',
      icon: 'fas fa-chart-bar',
      route: '/notification',
      visible: true,
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

  settingsItems: MenuItem[] = [
    {
      label: 'إدارة مستخدمي النظام',
      icon: 'fas fa-user',
      route: '/validities',
      visible: this.currentRole === 'SuperAdmin',
    },
    {
      label: 'اعدادات النظام',
      icon: 'fas fa-tools',
      route: '/system-settings',
      visible: this.currentRole === 'SuperAdmin',
    },
    {
      label: 'إدارة الشركات',
      icon: 'fas fa-chart-line',
      route: '/tenants',
      visible: this.currentRole === 'SuperAdmin',
    },
    {
      label: 'الدعم افني',
      icon: 'fas fa-headset',
      route: '/support',
      visible: true,
    },
  ];
}
