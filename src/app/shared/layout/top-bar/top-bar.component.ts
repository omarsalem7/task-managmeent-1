import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      class="flex justify-between px-10 py-5 text-white max-sm:flex-col max-sm:gap-5 max-sm:items-center"
    >
      <nav class="flex gap-2.5">
        <span class="pi pi-facebook hover:text-gray-300 cursor-pointer"></span>
        <span class="pi pi-instagram hover:text-gray-300 cursor-pointer"></span>
        <span class="pi pi-tiktok hover:text-gray-300 cursor-pointer"></span>
        <span class="pi pi-whatsapp hover:text-gray-300 cursor-pointer"></span>
        <span class="pi pi-twitter hover:text-gray-300 cursor-pointer"></span>
      </nav>
      <div class="flex gap-5 max-sm:flex-col max-sm:items-center">
        <div
          class="flex gap-2.5 items-center hover:text-gray-300 cursor-pointer"
        >
          <span class="pi pi-envelope"></span>
          <p class="text-sm ">Info<span>&#64;</span>alwethq.com.sa</p>
        </div>
        <div
          class="flex gap-2.5 items-center hover:text-gray-300 cursor-pointer"
        >
          <span class="pi pi-phone "></span>
          <p class="text-sm ">+966500612332</p>
        </div>
      </div>
    </header>
  `,
})
export class TopBar {}
