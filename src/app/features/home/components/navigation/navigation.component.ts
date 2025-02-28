import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawImg } from '../../../../shared/ui/raw-img.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, RawImg, TranslateModule],
  template: `
    <nav
      class="flex justify-between items-center px-10 py-5 border-b border-solid border-b-zinc-300 max-md:flex-col max-md:gap-5"
    >
      <raw-img
        image="https://cdn.builder.io/api/v1/image/assets/TEMP/e4f66df1b7cf473c633733fe70fd8dbd52c4a5f7"
        altText="Logo"
        class="h-[60px] w-[202px]"
      />
      <div class="flex gap-8 max-md:flex-wrap max-md:justify-center ">
        <a href="#" class="text-lg font-semibold text-white">الرئيسية</a>
        <a href="#" class="text-lg font-semibold text-white">من نحن</a>
        <a href="#" class="text-lg font-semibold text-white">لماذا نحن</a>
        <a href="#" class="text-lg font-semibold text-white">الخدمات</a>
        <a href="#" class="text-lg font-semibold text-white">الباقات</a>
        <a href="#" class="text-lg font-semibold text-white">التوظيف</a>
        <a href="#" class="text-lg font-semibold text-white">طلب الخدمة</a>
      </div>

      <div class="flex gap-5 items-center max-sm:flex-col">
        @if (currentLang =='ar') {
        <button
          class="flex items-center gap-1 text-white text-xl"
          (click)="switchLanguage('en')"
        >
          <span class="pi pi-globe"></span>
          <span>English</span>
        </button>
        }@else {
        <button
          class="flex items-center gap-1 text-white text-xl"
          (click)="switchLanguage('ar')"
        >
          <span class="pi pi-globe"></span>
          <span>العربيه</span>
        </button>
        }

        <button
          class="px-5 py-2 text-lg font-semibold text-white rounded-xl border-2 border-solid border-white border-opacity-70 max-sm:w-full max-sm:text-center"
        >
          منصة دانات
        </button>
      </div>
    </nav>
    <div
      class="mt-6 hidden md:flex ms-6  justify-between items-center p-5 bg-white rounded-md w-[357px] max-md:m-0 max-md:w-full"
    >
      <raw-img
        image="https://cdn.builder.io/api/v1/image/assets/TEMP/594c66d72416e778cc11418a75c6cf5cdee0a25e"
        class="h-[29px]"
      />
      <div class="w-0.5 bg-zinc-300 h-[30px]"></div>
      <raw-img
        image="https://cdn.builder.io/api/v1/image/assets/TEMP/535976c80b30116aee07ca4442c951bc14dc3184"
        class="h-[29px]"
      />
      <div class="w-0.5 bg-zinc-300 h-[30px]"></div>
      <raw-img
        image="https://cdn.builder.io/api/v1/image/assets/TEMP/3257be3839da3130e99ec791538f935d8f067739"
        class="h-[29px]"
      />
    </div>
  `,
})
export class NavBar {
  constructor(private translate: TranslateService) {}
  switchLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;
    localStorage.setItem('language', language);
    // Set page direction dynamically
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }
  currentLang = this.translate.currentLang;
}
