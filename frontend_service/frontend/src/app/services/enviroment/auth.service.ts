import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authConfig } from 'src/app/services/enviroment/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(): Observable<string> {
    const loginUrl = `https://gitlab.lrz.de/oauth/authorize?client_id=${authConfig.gitlabClientId}&redirect_uri=${authConfig.gitlabRedirectUri}&response_type=code&scope=read_user`;
    return new Observable((observer) => {
      observer.next(loginUrl);
      observer.complete();
    });
  }

  exchangeCodeForToken(code: string): void {
    this.http.post('/api/exchange-code', { code }).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
      },
      error: (error) => {
        console.error('Error exchanging token:', error);
      },
    });
  }
}
