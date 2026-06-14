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
            <div class="login-card">
                <h2>{{ isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión' }}</h2>
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
                    <div class="form-group">
                        <label for="username">Usuario</label>
                        <input id="username" formControlName="username" placeholder="Escribe tu usuario" />
                    </div>
                    @if (isRegistering) {
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input id="email" formControlName="email" type="email" placeholder="Tu email" />
                        </div>
                        <div class="form-group">
                            <label for="fullName">Nombre Completo</label>
                            <input id="fullName" formControlName="fullName" placeholder="Tu nombre completo" />
                        </div>
                    }
                    <div class="form-group password-group">
                        <label for="password">Contraseña</label>
                        <div class="password-input-wrapper">
                            <input id="password" [type]="showPassword ? 'text' : 'password'" formControlName="password" placeholder="Escribe tu contraseña" />
                            <i class="pi" [class]="showPassword ? 'pi-eye-slash' : 'pi-eye'" (click)="togglePasswordVisibility()"></i>
                        </div>
                        @if (loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['minlength']) {
                            <small class="error-message">La contraseña debe tener al menos 6 caracteres.</small>
                        }
                    </div>
                    <button type="submit" class="btn-primary" [disabled]="loginForm.invalid">
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
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem;
        }
        .login-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            width: 100%;
            max-width: 400px;
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
            transition: background 0.3s ease;
        }
        .btn-primary:disabled { background: #555; cursor: not-allowed; color: #aaa; }
        .btn-oauth {
            padding: 0.8rem; border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 6px; 
            background: transparent; color: white; font-weight: bold; cursor: pointer; margin-top: 0.5rem;
            width: 100%;
        }
        .oauth-divider { text-align: center; color: #eee; margin: 1rem 0; }
        .oauth-divider span { background: rgba(255,255,255,0.2); padding: 0 10px; border-radius: 50%; }
        .toggle-text { text-align: center; margin-top: 1rem; color: #eee; }
        .toggle-link { color: #ffeb3b; cursor: pointer; font-weight: bold; }
        .error-message { color: #ff5252; font-size: 0.8rem; margin-top: 0.25rem; display: block; }
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
