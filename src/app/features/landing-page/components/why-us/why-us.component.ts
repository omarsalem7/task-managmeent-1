import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [MatExpansionModule, NgFor],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss',
})
export class WhyUsComponent {
  header: string = 'لماذا الوثق ....';
  arrowLeft: string = '/images/arrow-left.png';
  arrowUp: string = '/images/chevron-up.png';
  accordions: any[] = [
    {
      header: 'من هي الوثق؟',
      items: [
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
      ],
    },
    {
      header: 'لماذا يجب الوثق؟',
      items: [
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
      ],
    },
    {
      header: 'ما الخدمات التي تقدمها الوثق؟',
      items: [
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
      ],
    },
    {
      header: 'ما المنشآت التي يمكنها الاستفاده من خدمات الوثق؟',
      items: [
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
        'هذا النص يمكن تغييره عند البرمجة  هذا النص يمكن تغييره عند البرمجة ',
      ],
    },
  ];
}
