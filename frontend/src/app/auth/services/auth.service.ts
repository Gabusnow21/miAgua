import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivateFn } from '@angular/router';
import { Observable, tap, of, catchError, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

export interface UserSession {
    isLoggedIn: boolean;
    role: string | null;
    username: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private http = inject(HttpClient);
    private router = inject(Router);
    private platformId = inject(PLATFORM_ID);

    private authState = new BehaviorSubject<UserSession>(this.getInitialState());

    authState$ = this.authState.asObservable();

    constructor() {}

    private getInitialState(): UserSession {
        if (isPlatformBrowser(this.platformId)) {
            return {
                isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
                role: sessionStorage.getItem('userRole'),
                username: sessionStorage.getItem('username')
            };
        }
        return { isLoggedIn: false, role: null, username: null };
    }

    isLoggedIn(): boolean {
        return this.authState.value.isLoggedIn;
    }

    getUserRole(): string | null {
        return this.authState.value.role;
    }

    getUserName(): string | null {
        return this.authState.value.username;
    }

    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                const session = {
                    isLoggedIn: true,
                    role: response.role,
                    username: response.username
                };
                this.saveSession(session);
                this.authState.next(session);
            })
        );
    }

    register(userData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
            tap(response => {
                const session = {
                    isLoggedIn: true,
                    role: response.role,
                    username: response.username
                };
                this.saveSession(session);
                this.authState.next(session);
            })
        );
    }

    logout() {
        this.http.post(`${this.apiUrl}/logout`, {}).pipe(
            catchError(() => of(null)),
            tap(() => {
                this.clearSession();
                this.authState.next({ isLoggedIn: false, role: null, username: null });
                this.router.navigate(['/login']);
            })
        ).subscribe();
    }

    private saveSession(session: UserSession) {
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userRole', session.role || '');
            sessionStorage.setItem('username', session.username || '');
        }
    }

    private clearSession() {
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.clear();
        }
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
