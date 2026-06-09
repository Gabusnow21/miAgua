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
        <div class="login-wrapper">
            <div class="login-card" [class.register-mode]="isRegistering">
                <h2>{{ isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión' }}</h2>
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
                    <div class="form-group">
                        <label for="username">Usuario</label>
                        <input id="username" formControlName="username" placeholder="Tu usuario" />
                    </div>
                    <div class="form-group password-group">
                        <label for="password">Contraseña</label>
                        <div class="password-input-wrapper">
                            <input id="password" [type]="showPassword ? 'text' : 'password'" formControlName="password" placeholder="••••••••" />
                            <i class="pi" [class]="showPassword ? 'pi-eye-slash' : 'pi-eye'" (click)="togglePasswordVisibility()"></i>
                        </div>
                    </div>
                    <button type="submit" [disabled]="loginForm.invalid" class="btn-primary">
                        {{ isRegistering ? 'Registrarse' : 'Ingresar' }}
                    </button>
                    <div class="oauth-divider"><span>o</span></div>
                    <button type="button" class="btn-oauth">
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
        .login-wrapper {
            position: relative;
            min-height: 80vh;
            display: flex;
            align-items: center;
        }
        .login-card {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            width: 100%;
            max-width: 400px;
            position: absolute;
            left: 10%;
            transition: left 0.5s ease-in-out;
        }
        .login-card.register-mode {
            left: 60%;
        }
        h2 { color: #fff; margin-bottom: 1.5rem; text-align: center; }
        .login-form { display: flex; flex-direction: column; gap: 1rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { color: #eee; }
        .password-input-wrapper { position: relative; display: flex; align-items: center; }
        .password-input-wrapper input { width: 100%; }
        .password-input-wrapper i { position: absolute; right: 10px; cursor: pointer; color: #fff; }
        input { 
            padding: 0.8rem; 
            border: 1px solid rgba(255, 255, 255, 0.2); 
            border-radius: 6px; 
            background: rgba(0, 0, 0, 0.1);
            color: #fff;
        }
        input::placeholder { color: rgba(255, 255, 255, 0.6); }
        .btn-primary { 
            padding: 0.8rem; border: none; border-radius: 6px; background: #007bff; color: white; 
            font-weight: bold; cursor: pointer; margin-top: 1rem;
        }
        .btn-oauth {
            padding: 0.8rem; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 6px; 
            background: transparent; color: white; font-weight: bold; cursor: pointer; margin-top: 0.5rem;
            width: 100%;
        }
        .oauth-divider { text-align: center; color: #eee; margin: 1rem 0; }
        .oauth-divider span { background: rgba(255,255,255,0.2); padding: 0 10px; border-radius: 50%; }
        .toggle-text { text-align: center; margin-top: 1rem; color: #eee; }
        .toggle-link { color: #ffeb3b; cursor: pointer; font-weight: bold; }
    `]
})
export class LoginComponent {
    loginForm: FormGroup;
    isRegistering = false;
    showPassword = false;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    toggleMode() { this.isRegistering = !this.isRegistering; }
    togglePasswordVisibility() { this.showPassword = !this.showPassword; }

    onSubmit() {
        if (this.loginForm.valid) {
            if (this.isRegistering) {
                this.authService.register(this.loginForm.value).subscribe(() => {
                    alert('Usuario registrado con éxito.');
                    this.isRegistering = false;
                });
            } else {
                this.authService.login(this.loginForm.value).subscribe({
                    next: () => this.router.navigate(['/']),
                    error: () => alert('Credenciales incorrectas.')
                });
            }
        }
    }
}
