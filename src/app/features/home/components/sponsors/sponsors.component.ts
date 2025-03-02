import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SponsorCardComponent } from './sponsor-card/sponsor-card.component';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [SponsorCardComponent, TranslateModule],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.scss',
})
export class SponsorsComponent {
  sponsoreList: any[] = [
    {
      id: 1,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011b00f82366546c592cf7_torre.svg',
      name: 'Sponsor 1',
    },
    {
      id: 2,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011891e8280469228a49a5_huawei.svg',
      name: 'Sponsor 2',
    },
    {
      id: 3,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011b00f82366546c592cf7_torre.svg',
      name: 'Sponsor 3',
    },
    {
      id: 4,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011891e8280469228a49a5_huawei.svg',
      name: 'Sponsor 4',
    },
    {
      id: 5,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011b00f82366546c592cf7_torre.svg',
      name: 'Sponsor 5',
    },
    {
      id: 6,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011891e8280469228a49a5_huawei.svg',
      name: 'Sponsor 6',
    },
    {
      id: 1,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011b00f82366546c592cf7_torre.svg',
      name: 'Sponsor 1',
    },
    {
      id: 2,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011891e8280469228a49a5_huawei.svg',
      name: 'Sponsor 2',
    },
    {
      id: 3,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011b00f82366546c592cf7_torre.svg',
      name: 'Sponsor 3',
    },
    {
      id: 4,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011891e8280469228a49a5_huawei.svg',
      name: 'Sponsor 4',
    },
    {
      id: 5,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011b00f82366546c592cf7_torre.svg',
      name: 'Sponsor 5',
    },
    {
      id: 6,
      img: 'https://cdn.prod.website-files.com/5dbb30f00775d4c32191a4df/61011891e8280469228a49a5_huawei.svg',
      name: 'Sponsor 6',
    },
  ];

  ngOnInit(): void {}
}
