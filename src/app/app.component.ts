import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './features/home/components/top-bar/top-bar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavBar } from './features/home/components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, TopBar, NavBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-management-app';
  ngOnInit() {
    // Use browser language if available
    const browserLang = this.translate.getBrowserLang();
    const lang = localStorage.getItem('language') ?? browserLang;
    if (lang) {
      const matched = lang.match(/en|ar/) ? lang : 'en';
      this.translate.use(matched);
      document.documentElement.lang = matched;
      document.documentElement.dir = matched === 'ar' ? 'rtl' : 'ltr';
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
