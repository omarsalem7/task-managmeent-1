import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-tasks-classification',
  standalone: true,
  imports: [],
  templateUrl: './tasks-classification.component.html',
  styleUrl: './tasks-classification.component.scss',
})
export class TasksClassificationComponent {
  title = 'ng-chart';
  chart: any = [];
  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [
          'يناير',
          'فبراير',
          'مارس',
          'أبريل',
          'مايو',
          'يونيو',
          'يوليو',
          'أغسطس',
          'سبتمبر',
          'أكتوبر',
          'نوفمبر',
          'ديسمبر',
        ],
        datasets: [
          {
            label: 'مجموع المتأخره',
            data: [14, 23, 7, 8, 15, 9, 13, 20, 18, 11, 4, 6],
            borderWidth: 1,
          },
          {
            label: 'مجموع المكتمة',
            data: [10, 17, 5, 13, 8, 14, 7, 22, 16, 12, 9, 3],
            borderWidth: 1,
          },
          {
            label: 'مجموع جاري العمل',
            data: [19, 11, 6, 14, 20, 3, 9, 18, 15, 10, 7, 5],
            borderWidth: 1,
          },
          {
            label: 'مجموع المهام الجديدة',
            data: [8, 21, 14, 6, 12, 7, 17, 9, 11, 16, 5, 4],
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
  }
}
