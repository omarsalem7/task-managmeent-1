import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCardComponent } from './feature-card/feature-card.component';

@Component({
  selector: 'app-choose-danat',
  standalone: true,
  imports: [CommonModule, FeatureCardComponent],
  templateUrl: './choose-danat.component.html',
  styleUrl: './choose-danat.component.scss',
})
export class ChooseDanatComponent {}
