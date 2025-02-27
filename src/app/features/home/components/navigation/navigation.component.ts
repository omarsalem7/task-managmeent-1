import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawImg } from '../../../../shared/ui/raw-img.component';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, RawImg],
  template: `
    <nav
      class="flex justify-between items-center px-10 py-5 border-b border-solid border-b-zinc-300 max-md:flex-col max-md:gap-5"
    >
      <div class="flex gap-5 items-center max-sm:flex-col">
        <p class="gap-2.5 text-xl text-indigo-600">english</p>
        <button
          class="px-5 py-2 text-lg font-semibold text-white rounded-xl border-2 border-solid border-white border-opacity-70 max-sm:w-full max-sm:text-center"
        >
          منصة دانات
        </button>
      </div>
      <div
        class="flex gap-8 max-md:flex-wrap max-md:justify-center max-sm:hidden"
      >
        <a href="#" class="text-lg font-semibold text-white">الرئيسية</a>
        <a href="#" class="text-lg font-semibold text-white">من نحن</a>
        <a href="#" class="text-lg font-semibold text-white">لماذا نحن</a>
        <a href="#" class="text-lg font-semibold text-white">الخدمات</a>
        <a href="#" class="text-lg font-semibold text-white">الباقات</a>
        <a href="#" class="text-lg font-semibold text-white">التوظيف</a>
        <a href="#" class="text-lg font-semibold text-white">طلب الخدمة</a>
      </div>
      <raw-img
        image="https://cdn.builder.io/api/v1/image/assets/TEMP/e4f66df1b7cf473c633733fe70fd8dbd52c4a5f7"
        altText="Logo"
        class="h-[60px] w-[202px]"
      />
    </nav>
  `,
})
export class NavBar {}
