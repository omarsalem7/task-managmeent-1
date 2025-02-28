import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  plans = [
    {
      name: 'home.pricing.PLANS.BASIC.NAME',
      price: 99,
      type: 'home.pricing.PLANS.BASIC.TYPE',
      title: 'home.pricing.PLANS.BASIC.title',
      features: [
        'home.pricing.PLANS.BASIC.FEATURES.FEATURE1',
        'home.pricing.PLANS.BASIC.FEATURES.FEATURE2',
        'home.pricing.PLANS.BASIC.FEATURES.FEATURE3',
        'home.pricing.PLANS.BASIC.FEATURES.FEATURE4',
        'home.pricing.PLANS.BASIC.FEATURES.FEATURE5',
      ],
      hovered: false,
    },
    {
      name: 'home.pricing.PLANS.SILVER.NAME',
      price: 200,
      type: 'home.pricing.PLANS.SILVER.TYPE',
      title: 'home.pricing.PLANS.SILVER.title',
      features: [
        'home.pricing.PLANS.SILVER.FEATURES.FEATURE1',
        'home.pricing.PLANS.SILVER.FEATURES.FEATURE2',
        'home.pricing.PLANS.SILVER.FEATURES.FEATURE3',
        'home.pricing.PLANS.SILVER.FEATURES.FEATURE4',
        'home.pricing.PLANS.SILVER.FEATURES.FEATURE5',
      ],
      hovered: false,
    },
    {
      name: 'home.pricing.PLANS.PLATINUM_REMOTE.NAME',
      price: 400,
      type: 'home.pricing.PLANS.PLATINUM_REMOTE.TYPE',
      title: 'home.pricing.PLANS.PLATINUM_REMOTE.title',
      features: [
        'home.pricing.PLANS.PLATINUM_REMOTE.FEATURES.FEATURE1',
        'home.pricing.PLANS.PLATINUM_REMOTE.FEATURES.FEATURE2',
        'home.pricing.PLANS.PLATINUM_REMOTE.FEATURES.FEATURE3',
        'home.pricing.PLANS.PLATINUM_REMOTE.FEATURES.FEATURE4',
        'home.pricing.PLANS.PLATINUM_REMOTE.FEATURES.FEATURE5',
      ],
      hovered: false,
    },
    {
      name: 'home.pricing.PLANS.PLATINUM_CENTERS.NAME',
      price: 400,
      type: 'home.pricing.PLANS.PLATINUM_CENTERS.TYPE',
      title: 'home.pricing.PLANS.PLATINUM_CENTERS.title',
      features: [
        'home.pricing.PLANS.PLATINUM_CENTERS.FEATURES.FEATURE1',
        'home.pricing.PLANS.PLATINUM_CENTERS.FEATURES.FEATURE2',
        'home.pricing.PLANS.PLATINUM_CENTERS.FEATURES.FEATURE3',
        'home.pricing.PLANS.PLATINUM_CENTERS.FEATURES.FEATURE4',
        'home.pricing.PLANS.PLATINUM_CENTERS.FEATURES.FEATURE5',
      ],
      hovered: false,
    },
  ];

  setHover(index: number, value: boolean) {
    this.plans[index].hovered = value;
  }
}
