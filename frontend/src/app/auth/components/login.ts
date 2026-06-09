import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <div class="login-container">
            <h2>Iniciar Sesión</h2>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
                <input formControlName="username" placeholder="Usuario" />
                <input formControlName="password" type="password" placeholder="Contraseña" />
                <button type="submit" [disabled]="loginForm.invalid">Ingresar</button>
            </form>
        </div>
    `
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            // Simulamos el login exitoso (requiere integrar con el backend)
            this.authService.login('mock-token');
            this.router.navigate(['/']);
        }
    }
}
