import { Component } from '@angular/core';
import { NavBar } from './components/navigation/navigation.component';
import { DecorativeElements } from './components/decorative-elements/decorative-elements.component';
import { HeroSection } from './components/hero-section/hero-section.component';
import { RawImg } from '../../shared/ui/raw-img.component';
import { TopBar } from './components/top-bar/top-bar.component';
import { ImproveLevelsComponent } from './components/improve-levels/improve-levels.component';
import { ChooseDanatComponent } from './components/choose-danat/choose-danat.component';
import { ServicesComponent } from './components/services/services.component';
import { FooterComponent } from './components/footer/footer.component';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
