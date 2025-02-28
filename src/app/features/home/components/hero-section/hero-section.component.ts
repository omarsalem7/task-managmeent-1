import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'hero-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="relative p-6">
      <article class=" ">
        <h1
          class="mb-8 pt-10 text-5xl font-semibold max-sm:text-3xl text-white"
        >
          {{ 'home.title' | translate }}
        </h1>

        <p
          class=" text-xl font-semibold text-white opacity-70  max-sm:text-base"
        >
          {{ 'home.heroSubTitle' | translate }}
        </p>

        <!-- <div class="mt-10 ">
          <h2 class="mb-5 text-3xl text-white">نظام معتمد من</h2>
          <raw-img
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/3cd906ff88579a8eadd769e88b1a50e37f8cf8bd"
            class="mb-5 h-[105px] w-[145px]"
          />
        </div> -->

        <div
          class="flex gap-10 mt-16 max-md:flex-col max-md:items-center max-sm:w-full"
        >
          <button
            class="px-7 py-3.5 text-2xl font-semibold text-white bg-[#D05508] rounded-md max-sm:w-full max-sm:text-center"
          >
            {{ 'home.startFreeTrial' | translate }}
          </button>
          <button
            class="px-7 py-3.5 text-2xl font-semibold text-white rounded-md border border-[#D05508] border-solid max-sm:w-full max-sm:text-center"
          >
            {{ 'home.subscribeNow' | translate }}
          </button>
        </div>
      </article>
    </section>
  `,
})
export class HeroSection {}
