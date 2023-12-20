import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private baseURL = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getData(url: string, options?: any): Observable<any> {
    return this.http.get(`${this.baseURL}${url}`, options);
  }

  postData(url: string, data: any, options?: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.baseURL}${url}`,
      data,
      options ? { headers, ...options } : { headers }
    );
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
