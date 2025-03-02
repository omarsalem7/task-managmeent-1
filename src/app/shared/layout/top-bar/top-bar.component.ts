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
        <span class="pi pi-facebook"></span>
        <span class="pi pi-instagram"></span>
        <span class="pi pi-tiktok"></span>
        <span class="pi pi-whatsapp"></span>
        <span class="pi pi-twitter"></span>
      </nav>
      <div class="flex gap-5 max-sm:flex-col max-sm:items-center">
        <div class="flex gap-2.5 items-center">
          <span class="pi pi-envelope"></span>
          <p class="text-sm">Info<span>&#64;</span>alwethq.com.sa</p>
        </div>
        <div class="flex gap-2.5 items-center">
          <span class="pi pi-phone"></span>
          <p class="text-sm">+966500612332</p>
        </div>
      </div>
    </header>
  `,
})
export class TopBar {}
