import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private baseURL = 'http://34.125.30.158:8080/api';
  private authenticatedBaseUrl = 'http://34.125.30.158:8081/api';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.authenticated.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.baseURL = this.authenticatedBaseUrl;
      } else {
        this.baseURL = 'http://34.125.30.158:8080/api';
      }
    });
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  getData(url: string, options?: any): Observable<any> {
    if (!options) {
      options = {};
    }
    options['withCredentials'] = true;
    const fullUrl = `${this.baseURL}${url}`;
    return this.http.get(fullUrl, options);
  }

  postData(url: string, data: any, options?: any): Observable<any> {
    if (!options) {
      options = {};
    }
    options['withCredentials'] = true;
    const csrfToken = this.getCookie('XSRF-TOKEN') || '';

    if (options['headers']) {
      options['headers']
        .set('Content-Type', 'application/json')
        .set('X-CSRF-TOKEN', csrfToken);
    } else {
      options['headers'] = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      });
    }

    return this.http.post(`${this.baseURL}${url}`, data, options);
  }

  updateData(url: string, data: any, options?: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(
      `${this.baseURL}${url}`,
      data,
      options ? { headers, ...options } : { headers }
    );
  }

  deleteData(url: string, options?: any): Observable<any> {
    return this.http.delete(`${this.baseURL}${url}`, options);
  }
}
