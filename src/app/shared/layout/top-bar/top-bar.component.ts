import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawImg } from '../../ui/raw-img.component';

@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [CommonModule, RawImg],
  template: `
    <header
      class="flex justify-between px-10 py-5 text-white max-sm:flex-col max-sm:gap-5 max-sm:items-center"
    >
      <nav class="flex gap-2.5">
        <raw-img
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/b9bfed362eb28b2f2f651afd467bd9041d1443eb"
          class="h-[23px] w-[23px]"
        />
        <raw-img
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/0dad526ccdfaee264185f8128ee08287779e2e58"
          class="h-[23px] w-[23px]"
        />
        <raw-img
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/60c5fd7d6cdeef1ac52af9720105258d66415c22"
          class="h-[23px] w-[23px]"
        />
        <raw-img
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/1b9854784aeb44b4036c4e02009c80499bc9b8d4"
          class="h-[23px] w-[23px]"
        />
        <raw-img
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/3d23e48783da94770ccefdfcd44999a7ffbc2c7c"
          class="h-[23px] w-[23px]"
        />
        <raw-img
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/256dae9f3ece7f204a50da94dcd01ad5119ce1e2"
          class="h-[23px] w-[23px]"
        />
        <raw-img
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/e7bfa64b5c7607b30f56c153bc1070bf15cb16eb"
          class="h-[23px] w-[23px]"
        />
      </nav>
      <div class="flex gap-5 max-sm:flex-col max-sm:items-center">
        <div class="flex gap-2.5 items-center">
          <raw-img
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/d650c472c885f9d57d05422a9b6c6cf7f5a5d4e3"
            class="h-[23px] w-[23px]"
          />
          <p class="text-sm">Info<span>&#64;</span>alwethq.com.sa</p>
        </div>
        <div class="flex gap-2.5 items-center">
          <raw-img
            image="https://cdn.builder.io/api/v1/image/assets/TEMP/dc4097118d0cbe56d97024eca4acb7ffd6d91d06"
            class="h-[23px] w-[23px]"
          />
          <p class="text-sm">+966500612332</p>
        </div>
      </div>
    </header>
  `,
})
export class TopBar {}
