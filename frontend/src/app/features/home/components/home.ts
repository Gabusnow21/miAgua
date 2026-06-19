import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="home-container">
            <div class="deco-glow deco-glow--1"></div>
            <div class="deco-glow deco-glow--2"></div>
            <div class="deco-glow deco-glow--3"></div>

            <div class="home-content">
                <div class="welcome">
                    <div class="welcome-icon">
                        <i class="pi pi-tint"></i>
                    </div>
                    <div class="welcome-text">
                        <h1 class="welcome-title">miAgua</h1>
                        <p class="welcome-subtitle">Panel de control — ADESCO Comunidad</p>
                    </div>
                </div>

                <div class="tiles-grid">
                    <a class="tile" routerLink="/propiedades" style="--accent: #3b82f6">
                        <div class="tile-icon">
                            <i class="pi pi-building"></i>
                        </div>
                        <div class="tile-body">
                            <h3 class="tile-title">Propiedades</h3>
                            <p class="tile-desc">Ver casas registradas</p>
                        </div>
                        <span class="tile-arrow">
                            <i class="pi pi-arrow-right"></i>
                        </span>
                    </a>

                    <a class="tile" routerLink="/lecturas" style="--accent: #10b981">
                        <div class="tile-icon">
                            <i class="pi pi-pencil"></i>
                        </div>
                        <div class="tile-body">
                            <h3 class="tile-title">Registrar Lectura</h3>
                            <p class="tile-desc">Ingresar lectura del medidor</p>
                        </div>
                        <span class="tile-arrow">
                            <i class="pi pi-arrow-right"></i>
                        </span>
                    </a>

                    <a class="tile" routerLink="/recibos" style="--accent: #f59e0b">
                        <div class="tile-icon">
                            <i class="pi pi-file-pdf"></i>
                        </div>
                        <div class="tile-body">
                            <h3 class="tile-title">Mis Recibos</h3>
                            <p class="tile-desc">Ver y descargar recibos</p>
                        </div>
                        <span class="tile-arrow">
                            <i class="pi pi-arrow-right"></i>
                        </span>
                    </a>

                    <div class="tile" style="--accent: #a855f7">
                        <div class="tile-icon">
                            <i class="pi pi-upload"></i>
                        </div>
                        <div class="tile-body">
                            <h3 class="tile-title">Subir Pago</h3>
                            <p class="tile-desc">Enviar comprobante</p>
                        </div>
                        <span class="tile-arrow">
                            <i class="pi pi-arrow-right"></i>
                        </span>
                    </div>
                </div>

                <div class="stats-row">
                    <div class="stat">
                        <span class="stat-value">—</span>
                        <span class="stat-label">Propiedades</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">—</span>
                        <span class="stat-label">Recibos pendientes</span>
                    </div>
                    <div class="stat">
                        <span class="stat-value">—</span>
                        <span class="stat-label">Última lectura</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .home-container {
            position: relative;
            min-height: calc(100vh - 140px);
            background: linear-gradient(135deg, #080d1a 0%, #0f172a 50%, #0a1628 100%);
            border-radius: 1rem;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            margin: -1rem;
        }

        .deco-glow {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            pointer-events: none;
        }

        .deco-glow--1 {
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(20, 184, 166, 0.12), transparent 70%);
            top: -200px;
            right: -100px;
            animation: homeFloat 10s ease-in-out infinite;
        }

        .deco-glow--2 {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent 70%);
            bottom: -150px;
            left: -100px;
            animation: homeFloat 12s ease-in-out infinite reverse;
        }

        .deco-glow--3 {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(20, 184, 166, 0.08), transparent 70%);
            top: 40%;
            left: 60%;
            animation: homeFloat 8s ease-in-out infinite 2s;
        }

        @keyframes homeFloat {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-25px) scale(1.05); }
        }

        .home-content {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 900px;
            animation: homeFadeIn 0.6s ease-out;
        }

        @keyframes homeFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .welcome {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2.5rem;
        }

        .welcome-icon {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            background: rgba(20, 184, 166, 0.1);
            border: 1px solid rgba(20, 184, 166, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.4rem;
            color: #14b8a6;
            flex-shrink: 0;
        }

        .welcome-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.9);
            margin: 0;
            letter-spacing: -0.02em;
        }

        .welcome-subtitle {
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.9rem;
            margin: 0.15rem 0 0;
        }

        .tiles-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
            gap: 1rem;
        }

        .tile {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 1rem;
            text-decoration: none;
            cursor: pointer;
            transition: background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s;
            position: relative;
        }

        .tile:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(20, 184, 166, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(20, 184, 166, 0.1);
        }

        .tile-icon {
            font-size: 1.75rem;
            color: var(--accent);
            transition: transform 0.25s;
        }

        .tile:hover .tile-icon {
            transform: scale(1.1);
        }

        .tile-title {
            font-size: 1rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.85);
            margin: 0;
        }

        .tile-desc {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.35);
            margin: 0.125rem 0 0;
        }

        .tile-arrow {
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            color: rgba(255, 255, 255, 0.15);
            font-size: 0.75rem;
            transition: color 0.25s, transform 0.25s;
        }

        .tile:hover .tile-arrow {
            color: var(--accent);
            transform: translateX(3px);
        }

        .stats-row {
            display: flex;
            gap: 2rem;
            margin-top: 2.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .stat {
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
        }

        .stat-value {
            font-size: 1.25rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.5);
        }

        .stat-label {
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.25);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        @media (max-width: 640px) {
            .home-container {
                padding: 1.5rem;
                margin: -0.75rem;
                border-radius: 0.75rem;
                min-height: calc(100vh - 120px);
            }
            .welcome {
                flex-direction: column;
                text-align: center;
                margin-bottom: 2rem;
            }
            .tiles-grid {
                grid-template-columns: 1fr;
            }
            .stats-row {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `]
})
export class HomeComponent {}
