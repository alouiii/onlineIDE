import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';
import { authConfig } from 'src/app/services/enviroment/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private state: string;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.state = this.generateRandomState();
  }

  getUsername(): string {
    return sessionStorage.getItem('username') || 'Guest';
  }

  private generateRandomState(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  login(): Observable<string> {
    const loginUrl = `https://gitlab.lrz.de/oauth/authorize?client_id=${authConfig.gitlabClientId}&redirect_uri=http://localhost:4200/projects&response_type=code&scope=read_user&state=${this.state}`;
    sessionStorage.setItem('oauth_state', this.state);
    return new Observable((observer) => {
      observer.next(loginUrl);
      observer.complete();
    });
  }

  exchangeCodeForToken(code: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('code', code);
    return this.http
      .post('/api/exchange-code', body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        tap((response: any) => {
          this.storageService.saveToken(response.access_token);
        }),
        catchError((error) => {
          console.error('Error exchanging token:', error);
          return throwError(() => new Error('Error exchanging token'));
        })
      );
  }

  fetchUserDetails(): Observable<any> {
    const token = this.storageService.getToken();
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    return this.http
      .get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap((userDetails: any) => {
          console.log('User Details:', userDetails); // Debugging line
          localStorage.setItem('username', userDetails.username);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post('/api/logout', {}, { withCredentials: true }).pipe(
      tap(() => this.storageService.clearAuthData()),
      catchError((error) => {
        console.error('Logout failed:', error);
        return throwError(() => new Error('Logout failed'));
      })
    );
  }
}
