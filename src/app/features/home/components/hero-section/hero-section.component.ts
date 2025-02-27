import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawImg } from '../../../../shared/ui/raw-img.component';
@Component({
  selector: 'hero-section',
  standalone: true,
  imports: [CommonModule, RawImg],
  template: `
    <section class="relative p-10">
      <div
        class="flex justify-between items-center p-5 mr-10 ml-auto bg-white rounded-md w-[357px] max-md:m-0 max-md:w-full"
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

      <article class="pr-10 mt-16 text-right">
        <h1 class="mb-8 text-5xl font-semibold text-indigo-600 max-sm:text-3xl">
          اختيارك الافضل لادارة مشروعك
        </h1>
        <p
          class="ml-auto text-xl font-semibold text-white opacity-70 max-w-[870px] max-sm:text-base"
        >
          كل ما يلزم المشروع خاصتك في مكان واحد لكل الاجهزة الان يمكنك إدارة
          عملك من أي مكان وفي أي لحظة فقط عبر العربي اي ار بي المتكاملة للمحاسبة
          والاعمال التجارية انضم الان..
        </p>

        <div class="mt-10 text-right">
          <h2 class="mb-5 text-3xl text-white">نظام معتمد من</h2>
          <raw-img
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/3cd906ff88579a8eadd769e88b1a50e37f8cf8bd"
            class="mb-5 h-[105px] w-[145px]"
          />
          <h3
            class="text-3xl font-semibold text-white tracking-[5.44px] max-sm:text-2xl max-sm:tracking-[normal]"
          >
            الموارد البشرية والتنمية الإجتماعية
          </h3>
        </div>

        <div
          class="flex gap-10 justify-end mt-10 max-md:flex-col max-md:items-center max-sm:w-full"
        >
          <button
            class="px-7 py-3.5 text-2xl font-semibold text-indigo-600 bg-orange-700 rounded-md max-sm:w-full max-sm:text-center"
          >
            أبدا تجربتك المجانية
          </button>
          <button
            class="px-7 py-3.5 text-2xl font-semibold text-white rounded-md border border-orange-700 border-solid max-sm:w-full max-sm:text-center"
          >
            أشتراك الان
          </button>
        </div>
      </article>
    </section>
  `,
})
export class HeroSection {}
