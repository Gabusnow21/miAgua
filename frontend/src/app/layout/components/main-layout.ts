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

      <footer class="layout-footer p-3 text-center border-top-1 surface-border surface-section">
        <span class="text-600">miAgua - Sistema de Gestión de Agua ADESCO &copy; 2026</span>
      </footer>

      <app-donation-button></app-donation-button>
    </div>
  `,
  styles: [`
    .layout-wrapper {
        background-color: var(--surface-ground);
    }
  `]
})
export class MainLayoutComponent {}
