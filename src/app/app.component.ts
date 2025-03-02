import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './shared/layout/top-bar/top-bar.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavBar } from './shared/layout/navigation/navigation.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { ChatbotComponent } from './shared/layout/chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    TopBar,
    NavBar,
    FooterComponent,
    ChatbotComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 100);
    this.getLanguageBrowser();
  }

  getLanguageBrowser() {
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
    translate.addLangs(['en', 'ar']);
  }
}
