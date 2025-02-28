import { Component } from '@angular/core';
import { DecorativeElements } from './components/decorative-elements/decorative-elements.component';
import { HeroSection } from './components/hero-section/hero-section.component';
import { RawImg } from '../../shared/ui/raw-img.component';
import { ImproveLevelsComponent } from './components/improve-levels/improve-levels.component';
import { ChooseDanatComponent } from './components/choose-danat/choose-danat.component';
import { ServicesComponent } from './components/services/services.component';
import { FooterComponent } from './components/footer/footer.component';
import { PricingComponent } from './components/pricing/pricing.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSection,
    DecorativeElements,
    RawImg,
    ImproveLevelsComponent,
    ChooseDanatComponent,
    ServicesComponent,
    FooterComponent,
    PricingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
