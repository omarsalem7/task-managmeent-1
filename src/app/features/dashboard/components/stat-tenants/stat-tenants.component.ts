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
  tenants: any = [];
  completionPercent = 0;

  getLookup() {
    this.tenantsService.getList({ pageSize: 1000 }).subscribe((res: any) => {
      this.tenants = res.data;
      this.tenantId = this.tenants[0]?.id;
    });
  }

  tenantPerformance: any;
  getTeneantsPerformance() {
    this.statisticsService
      .getEmployeePerformanceByTenant(
        this.tenantId ? this.tenantId : this.tenants[0]?.id
      )
      .subscribe((res: any) => {
        this.tenantPerformance = res.performancePercentage;
        this.completionPercent = this.tenantPerformance.overallPerformance;
      });
  }

  updateFilters(event: any) {
    this.tenantId = event.value;
    this.loadChartData();
    this.getTeneantsPerformance();
  }

  tenantId: any = null;

  ngOnInit() {
    this.getLookup();
    this.loadChartData();
  }

  allTask = 0;
  loadChartData() {
    this.statisticsService
      .getTasksCountByTent(this.tenantId ? this.tenantId : this.tenants[0]?.id)
      .subscribe((response: any) => {
        this.allTask = response.All;
        const myData = [
          response.New,
          response.InProgress,
          response.Completed,
          response.Overdue,
        ];

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
                label: 'مجموع المهام الجديدة',
                data: myData,
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
