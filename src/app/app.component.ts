import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { TopBar } from './features/home/components/top-bar/top-bar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NavbarComponent, TopBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-management-app';
  ngOnInit() {
    // Use browser language if available
    const browserLang = this.translate.getBrowserLang();
    if (browserLang) {
      this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');

    // Languages supported by your app
    translate.addLangs(['en', 'ar']);
  }
}
