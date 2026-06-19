import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar';
import { CommonModule } from '@angular/common';
import { DonationButtonComponent } from './donation-button';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, DonationButtonComponent],
  template: `
    <div class="layout-wrapper flex flex-column min-h-screen">
      <app-navbar></app-navbar>
      
      <main class="layout-main flex-grow-1 p-3 md:p-5">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>

      <footer class="layout-footer">
        <span>miAgua — Sistema de Gestión de Agua ADESCO &copy; 2026</span>
      </footer>

      <app-donation-button></app-donation-button>
    </div>
  `,
  styles: [`
    .layout-wrapper {
        background: linear-gradient(135deg, #080d1a 0%, #0f172a 50%, #0a1628 100%);
    }

    .layout-footer {
        text-align: center;
        padding: 1rem 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.3);
    }
  `]
})
export class MainLayoutComponent {}
