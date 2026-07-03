import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    template: `
        <div class="login-container">
            <div class="deco-circle deco-circle--1"></div>
            <div class="deco-circle deco-circle--2"></div>
            <div class="deco-circle deco-circle--3"></div>
            
            <div class="wave-container">
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path d="M0,128L48,144C96,160,192,192,288,181.3C384,171,480,117,576,96C672,75,768,85,864,112C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="rgba(255,255,255,0.04)"/>
                </svg>
            </div>
            
            <div class="login-content">
                <div class="brand">
                    <div class="brand-icon">
                        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 44C32.2843 44 39 37.2843 39 29C39 15 24 4 24 4C24 4 9 15 9 29C9 37.2843 15.7157 44 24 44Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9 29C9 37.2843 15.7157 44 24 44C32.2843 44 39 37.2843 39 29C39 29 30 32 24 29C18 26 9 29 9 29Z" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h1 class="brand-title">miAgua</h1>
                    <p class="brand-subtitle">Sistema de Gestión de Agua</p>
                </div>
                
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
                    <div class="field">
                        <label for="username" class="field-label">Usuario</label>
                        <input id="username" formControlName="username" class="field-input" placeholder="Ingresa tu usuario" autocomplete="username" />
                        @if (loginForm.get('username')?.touched && loginForm.get('username')?.errors?.['required']) {
                            <small class="field-error">El usuario es requerido</small>
                        }
                    </div>
                    
                    @if (isRegistering) {
                        <div class="field">
                            <label for="email" class="field-label">Email</label>
                            <input id="email" formControlName="email" type="email" class="field-input" placeholder="tu@email.com" autocomplete="email" />
                            @if (loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['required']) {
                                <small class="field-error">El email es requerido</small>
                            }
                            @if (loginForm.get('email')?.touched && loginForm.get('email')?.errors?.['email']) {
                                <small class="field-error">Email inválido</small>
                            }
                        </div>
                        <div class="field">
                            <label for="fullName" class="field-label">Nombre Completo</label>
                            <input id="fullName" formControlName="fullName" class="field-input" placeholder="Tu nombre completo" autocomplete="name" />
                            @if (loginForm.get('fullName')?.touched && loginForm.get('fullName')?.errors?.['required']) {
                                <small class="field-error">El nombre es requerido</small>
                            }
                        </div>
                    }
                    
                    <div class="field">
                        <label for="password" class="field-label">Contraseña</label>
                        <div class="field-password">
                            <input id="password" [type]="showPassword ? 'text' : 'password'" formControlName="password" class="field-input" placeholder="Mínimo 6 caracteres" autocomplete="current-password" />
                            <i class="pi cursor-pointer" [class]="showPassword ? 'pi-eye-slash' : 'pi-eye'" (click)="togglePasswordVisibility()"></i>
                        </div>
                        @if (loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['minlength']) {
                            <small class="field-error">La contraseña debe tener al menos 6 caracteres</small>
                        }
                    </div>
                    
                    <button type="submit" class="btn-submit" [disabled]="loginForm.invalid">
                        {{ isRegistering ? 'Crear Cuenta' : 'Ingresar' }}
                    </button>
                    
                    <div class="divider">
                        <span class="divider-line"></span>
                        <span class="divider-text">o</span>
                        <span class="divider-line"></span>
                    </div>
                    
                    <button type="button" class="btn-google">
                        <i class="pi pi-google"></i>
                        Iniciar sesión con Google
                    </button>
                </form>
                
                <p class="toggle-text">
                    {{ isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?' }}
                    <span (click)="toggleMode()" class="toggle-link">
                        {{ isRegistering ? 'Inicia sesión' : 'Regístrate aquí' }}
                    </span>
                </p>
            </div>
        </div>
    `,
    styles: [`
        .login-container {
            position: fixed;
            inset: 0;
            z-index: 1000;
            background: linear-gradient(135deg, #0f766e 0%, #1e3a5f 50%, #0c4a6e 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .deco-circle {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.25;
            pointer-events: none;
        }

        .deco-circle--1 {
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, #2dd4bf, transparent 70%);
            top: -200px;
            right: -150px;
            animation: float 8s ease-in-out infinite;
        }

        .deco-circle--2 {
            width: 450px;
            height: 450px;
            background: radial-gradient(circle, #38bdf8, transparent 70%);
            bottom: -100px;
            left: -100px;
            animation: float 10s ease-in-out infinite reverse;
        }

        .deco-circle--3 {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, #818cf8, transparent 70%);
            top: 10%;
            left: 15%;
            animation: float 12s ease-in-out infinite 2s;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.03); }
        }

        .wave-container {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            line-height: 0;
            pointer-events: none;
        }

        .wave-container svg {
            width: 100%;
            height: 100px;
        }

        .login-content {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 380px;
            padding: 2rem;
            animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(24px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .brand {
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .brand-icon {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            font-size: 1.75rem;
            color: #5eead4;
        }

        .brand-title {
            font-size: 2rem;
            font-weight: 700;
            color: #fff;
            margin: 0;
            letter-spacing: -0.02em;
        }

        .brand-subtitle {
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.85rem;
            margin: 0.25rem 0 0;
        }

        .login-form {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
        }

        .field {
            display: flex;
            flex-direction: column;
            gap: 0.375rem;
        }

        .field-label {
            font-size: 0.75rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.6);
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }

        .field-input {
            background: transparent;
            border: none;
            border-bottom: 2px solid rgba(255, 255, 255, 0.15);
            border-radius: 0;
            padding: 0.5rem 0;
            color: #fff;
            font-size: 1rem;
            font-family: inherit;
            outline: none;
            transition: border-color 0.2s ease;
            width: 100%;
        }

        .field-input:focus {
            border-bottom-color: #5eead4;
        }

        .field-input::placeholder {
            color: rgba(255, 255, 255, 0.3);
            font-weight: 400;
        }

        .field-input:-webkit-autofill,
        .field-input:-webkit-autofill:hover,
        .field-input:-webkit-autofill:focus {
            -webkit-text-fill-color: #fff;
            -webkit-box-shadow: 0 0 0px 1000px transparent inset;
            transition: background-color 5000s ease-in-out 0s;
        }

        .field-password {
            position: relative;
            display: flex;
            align-items: center;
        }

        .field-password .field-input {
            padding-right: 1.75rem;
        }

        .field-password i {
            position: absolute;
            right: 0;
            bottom: 0.625rem;
            color: rgba(255, 255, 255, 0.35);
            font-size: 0.9rem;
            transition: color 0.2s;
        }

        .field-password i:hover {
            color: rgba(255, 255, 255, 0.7);
        }

        .field-error {
            font-size: 0.75rem;
            color: #fca5a5;
            margin-top: 0.125rem;
        }

        .btn-submit {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, #0d9488, #0891b2);
            border: none;
            border-radius: 999px;
            color: #fff;
            font-weight: 600;
            font-size: 1rem;
            font-family: inherit;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3);
            margin-top: 0.25rem;
        }

        .btn-submit:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(13, 148, 136, 0.4);
        }

        .btn-submit:active:not(:disabled) {
            transform: translateY(0);
        }

        .btn-submit:disabled {
            opacity: 0.45;
            cursor: not-allowed;
            box-shadow: none;
        }

        .divider {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }

        .divider-line {
            flex: 1;
            height: 1px;
            background: rgba(255, 255, 255, 0.12);
        }

        .divider-text {
            color: rgba(255, 255, 255, 0.35);
            font-size: 0.8rem;
            font-weight: 500;
        }

        .btn-google {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            padding: 0.7rem 1.5rem;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 999px;
            color: rgba(255, 255, 255, 0.75);
            font-weight: 500;
            font-size: 0.9rem;
            font-family: inherit;
            cursor: pointer;
            transition: background 0.2s, border-color 0.2s;
        }

        .btn-google:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.25);
            color: #fff;
        }

        .btn-google i {
            font-size: 1.1rem;
        }

        .toggle-text {
            text-align: center;
            color: rgba(255, 255, 255, 0.45);
            font-size: 0.85rem;
            margin: 1.5rem 0 0;
        }

        .toggle-link {
            color: #5eead4;
            cursor: pointer;
            font-weight: 600;
            transition: color 0.2s;
        }

        .toggle-link:hover {
            color: #2dd4bf;
            text-decoration: underline;
        }
    `]
})
export class LoginComponent {
    loginForm: FormGroup;
    isRegistering = false;
    showPassword = false;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: [''],
            fullName: ['']
        });
    }

    toggleMode() { 
        this.isRegistering = !this.isRegistering;
        if (this.isRegistering) {
            this.loginForm.get('email')?.setValidators([Validators.required, Validators.email]);
            this.loginForm.get('fullName')?.setValidators([Validators.required]);
        } else {
            this.loginForm.get('email')?.clearValidators();
            this.loginForm.get('fullName')?.clearValidators();
        }
        this.loginForm.get('email')?.updateValueAndValidity();
        this.loginForm.get('fullName')?.updateValueAndValidity();
    }
    
    togglePasswordVisibility() { this.showPassword = !this.showPassword; }

    onSubmit() {
        if (this.loginForm.valid) {
            if (this.isRegistering) {
                const registerData = { ...this.loginForm.value, role: 'VECINO' };
                this.authService.register(registerData).subscribe({
                    next: (res) => {
                        alert('Usuario registrado con éxito.');
                        this.isRegistering = false;
                        this.loginForm.reset();
                    },
                    error: (err) => {
                        console.error('Registration error:', err);
                        alert('Error en el registro: ' + (err.error?.message || 'Error desconocido'));
                    }
                });
            } else {
                this.authService.login(this.loginForm.value).subscribe({
                    next: () => this.router.navigate(['/']),
                    error: (err) => {
                        console.error('Login error:', err);
                        alert('Credenciales incorrectas.');
                    }
                });
            }
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
