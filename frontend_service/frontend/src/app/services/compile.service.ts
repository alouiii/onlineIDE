// compile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiClientService } from './api-client.service';
import { AuthService } from 'src/app/auth.service';

export interface CompileApiResponse {
  output: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompileService {
  private compileUrl = 'http://34.125.30.158:8080/api/compile';
  private isMock = false; // Flag to control the mock behavior
  private compileOutputSource = new BehaviorSubject<string>('');
  currentOutput = this.compileOutputSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.authenticated.subscribe((authenticated) => {
      this.updateCompileUrl(authenticated);
    });
  }

  private updateCompileUrl(authenticated: boolean) {
    if (authenticated) {
      this.compileUrl = 'http://34.125.30.158:8082/api/compile';
    } else {
      this.compileUrl = 'http://34.125.30.158:8080/api/compile';
    }
  }

  public compileCode(code: string): Observable<any> {
    return this.http.post(this.compileUrl, { code }).pipe(
      tap((response) => {
        console.log('Compilation Response:', response);
      })
    );
  }
}
