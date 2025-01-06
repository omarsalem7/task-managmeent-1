import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss',
})
export class AllTasksComponent {
  chart: any = [];
  ngOnInit() {
    this.chart = new Chart('canvas-all-tasks', {
      type: 'doughnut',
      data: {
        labels: ['انتهت', 'مستمره'],
        datasets: [
          {
            label: 'مجموع المتأخره',
            data: [14, 23],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
