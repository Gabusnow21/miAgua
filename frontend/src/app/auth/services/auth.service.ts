import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenKey = 'jwt_token';

    isLoggedIn(): boolean {
        const token = localStorage.getItem(this.tokenKey);
        return !!token; // Lógica simple, en producción validar expiración del JWT
    }

    login(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
    }
}

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    }

    router.navigate(['/login']);
    return false;
};
