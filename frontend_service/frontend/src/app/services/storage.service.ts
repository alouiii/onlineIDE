import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  saveState(state: string): void {
    sessionStorage.setItem('oauth_state', state);
  }

  getState(): string | null {
    return sessionStorage.getItem('oauth_state');
  }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  clearAuthData(): void {
    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('token');
  }
}
