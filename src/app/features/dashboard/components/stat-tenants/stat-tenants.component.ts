import { Component, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { StatisticsService } from '../../../../core/services/statistics.service';
import { Knob } from 'primeng/knob';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TenantsService } from '../../../../core/services/tenants';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-stat-tenants',
  standalone: true,
  imports: [CommonModule, FormsModule, Knob, DropdownModule],
  providers: [TenantsService],
  templateUrl: './stat-tenants.component.html',
  styleUrl: './stat-tenants.component.scss',
})
export class StatTenantsComponent {
  statisticsService = inject(StatisticsService);
  tenantsService = inject(TenantsService);
  title = 'task over year';
  chart: any = [];
  tenants = [];
  completionPercent = 0;

  getLookup() {
    this.tenantsService.getList({ pageSize: 1000 }).subscribe((res: any) => {
      this.tenants = res.data;
    });
  }

  updateFilters(event: any) {
    console.log(event.value);
  }

  ngOnInit() {
    this.getLookup();
    this.loadChartData();
  }

  loadChartData() {
    this.statisticsService.getStatsOverYear().subscribe((response: any) => {
      // Transform the API data into arrays for the chart
      const newTasks = Object.values(response).map(
        (month) => (month as any).New
      );
      const inProgressTasks = Object.values(response).map(
        (month) => (month as any).InProgress
      );
      const completedTasks = Object.values(response).map(
        (month) => (month as any).Completed
      );
      const overdueTasks = Object.values(response).map(
        (month) => (month as any).Overdue
      );

      this.chart = new Chart('canvasTenants', {
        type: 'bar',
        data: {
          labels: [
            'مجموع المهام الجديدة',
            'مجموع جارى العمل',
            'مجموع المكتملة',
            'مجموع المتأخره',
          ],
          datasets: [
            {
              label: 'مجموع المكتمة',
              data: [1, 2, 4, 5],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 205, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }
}
