import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authConfig } from 'src/app/services/enviroment/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private state: string;

  constructor(private http: HttpClient) {
    this.state = this.generateRandomState();
  }
  private generateRandomState(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  login(): Observable<string> {
    const loginUrl = `https://gitlab.lrz.de/oauth/authorize?client_id=${authConfig.gitlabClientId}&redirect_uri=http://localhost:4200/projects&response_type=code&scope=read_user&state=${this.state}`;
    localStorage.setItem('oauth_state', this.state);
    return new Observable((observer) => {
      observer.next(loginUrl);
      observer.complete();
    });
  }
  exchangeCodeForToken(code: string): void {
    const body = new URLSearchParams();
    body.set('code', code);

    this.http
      .post('/api/exchange-code', body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
        },
        error: (error) => {
          console.error('Error exchanging token:', error);
        },
      });
  }
}
