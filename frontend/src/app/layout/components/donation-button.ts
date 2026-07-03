import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-donation-button',
  standalone: true,
  imports: [CommonModule, LottieComponent, ButtonModule, TooltipModule],
  template: `
    <div class="donation-container">
      <button 
        type="button" 
        class="donation-btn shadow-4"
        (click)="openDonationLink()"
        pTooltip="¡Invítame un café!"
        tooltipPosition="left">
        <div class="lottie-wrapper">
          <ng-lottie 
            [options]="options" 
            width="80px" 
            height="80px"
            (animationCreated)="animationCreated($event)">
          </ng-lottie>
        </div>
      </button>
    </div>
  `,
  styles: [`
    .donation-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
    }
    
    .donation-btn {
      width: 70px;
      height: 70px;
      padding: 0;
      border-radius: 50%;
      background: white; /* Fondo blanco para que resalte el café */
      border: 3px solid #4caf50; /* Marco verde solicitado */
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      overflow: visible; /* Permitir que la animación se vea bien */
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
    }
    
    .lottie-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      pointer-events: none; /* Que el clic pase al botón */
    }
    
    .donation-btn:hover {
      transform: scale(1.15);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
      border-color: #388e3c;
    }

    .donation-btn:active {
      transform: scale(0.95);
    }
  `]
})
export class DonationButtonComponent {
  // Placeholder URL for now. 
  // User will provide the actual Lottie file content or URL.
  options: AnimationOptions = {
    path: 'coffee.json',
  };

  animationCreated(animationItem: any): void {
    console.log('Animation created', animationItem);
  }

  openDonationLink() {
    window.open('https://buymeacoffee.com/dngabu123t', '_blank');
  }
}
