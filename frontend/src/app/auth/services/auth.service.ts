import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = '/api/auth';
    private loggedIn = false;
    private userRole: string | null = null;

    constructor(private http: HttpClient) {}

    isLoggedIn(): boolean {
        return this.loggedIn; 
    }

    getUserRole(): string | null {
        return this.userRole;
    }

    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                this.loggedIn = true;
                this.userRole = response.role; // Asumimos que el backend devuelve el rol
            })
        );
    }

    register(userData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, userData);
    }

    logout() {
        this.loggedIn = false;
        this.userRole = null;
    }
}
// ...

export const authGuard: CanActivateFn = () => {
    // ... lógica del guard se mantiene, pero depende de la validez de la cookie (backend verifica)
    return true; // Simplificado para este paso
};
