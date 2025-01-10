import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-tasks-days',
  standalone: true,
  imports: [],
  templateUrl: './tasks-days.component.html',
  styleUrl: './tasks-days.component.scss',
})
export class TasksDaysComponent {
  title = 'days-tasks';
  chart: any = [];

  getDaysInMonth(
    month: number,
    year: number = new Date().getFullYear()
  ): string[] {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
  }

  ngOnInit() {
    const currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns 0-11
    const daysLabels = this.getDaysInMonth(currentMonth);

    const generateMonthData = () => {
      return daysLabels.map(() => Math.floor(Math.random() * 20) + 1);
    };

    this.chart = new Chart('canvas3', {
      type: 'bar',
      data: {
        labels: daysLabels,
        datasets: [
          {
            label: 'المهام المكتمله',
            data: generateMonthData(),
            // borderWidth: 1,
            backgroundColor: '#9BD0F5',
          },
          {
            label: 'المهام المنتهي',
            data: generateMonthData(),
            // borderWidth: 1,
            backgroundColor: '#de6868',
          },
          {
            label: 'المهام الفعاله',
            data: generateMonthData(),
            // borderWidth: 1,
            backgroundColor: '#9fd69f',
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
