import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
        <div class="home-container">
            <div class="deco-glow deco-glow--1"></div>
            <div class="deco-glow deco-glow--2"></div>
            <div class="deco-glow deco-glow--3"></div>

            @if (isLoggedIn) {
                <div class="home-content">
                    <div class="welcome">
                        <div class="welcome-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.4rem" height="1.4rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                <g>
                                    <path stroke-dasharray="18" d="M4.5 21.5h15">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="18;0"/>
                                    </path>
                                    <path stroke-dasharray="16" stroke-dashoffset="16" d="M4.5 21.5v-13.5M19.5 21.5v-13.5">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.3s" to="0"/>
                                    </path>
                                    <path stroke-dasharray="28" stroke-dashoffset="28" d="M2 10l10 -8l10 8">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.4s" to="0"/>
                                    </path>
                                    <path stroke-dasharray="26" stroke-dashoffset="26" d="M9.5 21.5v-9h5v9">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="0.6s" to="0"/>
                                    </path>
                                </g>
                            </svg>
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
            } @else {
                <div class="public-content">
                    <div class="hero">
                        <div class="hero-icon">
                            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M24 44C32.2843 44 39 37.2843 39 29C39 15 24 4 24 4C24 4 9 15 9 29C9 37.2843 15.7157 44 24 44Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 29C9 37.2843 15.7157 44 24 44C32.2843 44 39 37.2843 39 29C39 29 30 32 24 29C18 26 9 29 9 29Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h1 class="hero-title">miAgua</h1>
                        <p class="hero-subtitle">Sistema de Gestión de Agua</p>
                        <p class="hero-desc">Plataforma digital para la administración comunitaria del servicio de agua potable. Gestiona propiedades, lecturas de medidores, recibos y pagos de forma eficiente.</p>
                        <button class="btn-primary" (click)="goToLogin()">
                            <i class="pi pi-sign-in"></i>
                            Iniciar Sesión
                        </button>
                    </div>

                    <div class="features">
                        <h2 class="section-title">¿Qué puedes hacer?</h2>
                        <div class="features-grid">
                            <div class="feature-card">
                                <div class="feature-icon" style="--accent: #3b82f6">
                                    <i class="pi pi-building"></i>
                                </div>
                                <h3 class="feature-title">Gestión de Propiedades</h3>
                                <p class="feature-desc">Administra el registro de propiedades y sus datos asociados.</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon" style="--accent: #10b981">
                                    <i class="pi pi-pencil"></i>
                                </div>
                                <h3 class="feature-title">Control de Lecturas</h3>
                                <p class="feature-desc">Registra y consulta las lecturas mensuales de los medidores.</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon" style="--accent: #f59e0b">
                                    <i class="pi pi-file-pdf"></i>
                                </div>
                                <h3 class="feature-title">Recibos Digitales</h3>
                                <p class="feature-desc">Genera, consulta y descarga recibos de forma digital.</p>
                            </div>
                            <div class="feature-card">
                                <div class="feature-icon" style="--accent: #a855f7">
                                    <i class="pi pi-upload"></i>
                                </div>
                                <h3 class="feature-title">Pagos en Línea</h3>
                                <p class="feature-desc">Sube comprobantes y da seguimiento a tus pagos.</p>
                            </div>
                        </div>
                    </div>

                    <div class="how">
                        <h2 class="section-title">¿Cómo funciona?</h2>
                        <div class="how-steps">
                            <div class="how-step">
                                <span class="how-step-number">1</span>
                                <div class="how-step-body">
                                    <h3>Regístrate</h3>
                                    <p>Crea tu cuenta como vecino de la comunidad.</p>
                                </div>
                            </div>
                            <div class="how-step">
                                <span class="how-step-number">2</span>
                                <div class="how-step-body">
                                    <h3>Vincula tu propiedad</h3>
                                    <p>Asocia tu cuenta a tu propiedad registrada.</p>
                                </div>
                            </div>
                            <div class="how-step">
                                <span class="how-step-number">3</span>
                                <div class="how-step-body">
                                    <h3>Gestiona tu servicio</h3>
                                    <p>Consulta lecturas, recibos y realiza pagos.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="cta">
                        <h2 class="cta-title">¿Listo para empezar?</h2>
                        <p class="cta-desc">Únete a la comunidad digital de tu ADESCO.</p>
                        <div class="cta-buttons">
                            <button class="btn-primary" (click)="goToLogin()">
                                <i class="pi pi-sign-in"></i>
                                Iniciar Sesión
                            </button>
                            <button class="btn-secondary" (click)="goToRegister()">
                                <i class="pi pi-user-plus"></i>
                                Registrarse
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    `,
    styles: [`
        .home-container {
            position: relative;
            min-height: calc(100vh - 140px);
            background: linear-gradient(135deg, #080d1a 0%, #0f172a 50%, #0a1628 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            width: 100vw;
            margin-left: calc(-50vw + 50%);
            overflow: hidden;
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

        .home-content, .public-content {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 900px;
            animation: homeFadeIn 0.6s ease-out;
        }

        @keyframes homeFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
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

        .hero {
            text-align: center;
            padding: 2rem 0 3rem;
        }

        .hero-icon {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: rgba(20, 184, 166, 0.1);
            border: 1px solid rgba(20, 184, 166, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.25rem;
            color: #14b8a6;
        }

        .hero-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: #fff;
            margin: 0;
            letter-spacing: -0.03em;
        }

        .hero-subtitle {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.5);
            margin: 0.35rem 0 1rem;
        }

        .hero-desc {
            font-size: 0.95rem;
            color: rgba(255, 255, 255, 0.4);
            max-width: 520px;
            margin: 0 auto 2rem;
            line-height: 1.6;
        }

        .section-title {
            text-align: center;
            font-size: 1.5rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.9);
            margin: 0 0 2rem;
        }

        .features {
            padding: 3rem 0;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
            gap: 1rem;
        }

        .feature-card {
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 1rem;
            transition: background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }

        .feature-card:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(20, 184, 166, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(20, 184, 166, 0.1);
        }

        .feature-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            color: var(--accent);
            margin-bottom: 1rem;
        }

        .feature-title {
            font-size: 1rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.85);
            margin: 0 0 0.35rem;
        }

        .feature-desc {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.35);
            margin: 0;
            line-height: 1.5;
        }

        .how {
            padding: 3rem 0;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .how-steps {
            display: flex;
            gap: 1.5rem;
        }

        .how-step {
            flex: 1;
            display: flex;
            gap: 1rem;
            padding: 1.25rem;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 1rem;
        }

        .how-step-number {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(20, 184, 166, 0.15);
            border: 1px solid rgba(20, 184, 166, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            font-weight: 700;
            color: #14b8a6;
            flex-shrink: 0;
        }

        .how-step-body h3 {
            font-size: 0.9rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.85);
            margin: 0 0 0.25rem;
        }

        .how-step-body p {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.35);
            margin: 0;
            line-height: 1.5;
        }

        .cta {
            text-align: center;
            padding: 3rem 0 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .cta-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.9);
            margin: 0 0 0.5rem;
        }

        .cta-desc {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.4);
            margin: 0 0 1.5rem;
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }

        .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 2rem;
            background: linear-gradient(135deg, #0d9488, #0891b2);
            border: none;
            border-radius: 999px;
            color: #fff;
            font-weight: 600;
            font-size: 0.95rem;
            font-family: inherit;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(13, 148, 136, 0.4);
        }

        .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 2rem;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 999px;
            color: rgba(255, 255, 255, 0.75);
            font-weight: 500;
            font-size: 0.95rem;
            font-family: inherit;
            cursor: pointer;
            transition: background 0.2s, border-color 0.2s;
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.25);
            color: #fff;
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
            .tiles-grid, .features-grid {
                grid-template-columns: 1fr;
            }
            .stats-row {
                flex-direction: column;
                gap: 1rem;
            }
            .how-steps {
                flex-direction: column;
            }
            .cta-buttons {
                flex-direction: column;
                align-items: center;
            }
            .hero-title {
                font-size: 1.75rem;
            }
        }
    `]
})
export class HomeComponent implements OnInit {
    isLoggedIn = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.authService.authState$.subscribe(state => {
            this.isLoggedIn = state.isLoggedIn;
        });
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }

    goToRegister() {
        this.router.navigate(['/login']);
    }
}
