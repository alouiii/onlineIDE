// compile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface CompileApiResponse {
  output: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompileService {
  private compileUrl = '/api/compile';
  private isMock = false; // Flag to control the mock behavior
  private compileOutputSource = new BehaviorSubject<string>('');
  currentOutput = this.compileOutputSource.asObservable();

  constructor(private http: HttpClient) {}

  compileCode(code: string): Observable<any> {
    if (this.isMock) {
      // Mock response
      const mockOutput = `${code}`;
      this.compileOutputSource.next(mockOutput);
      return of({ output: mockOutput });
    } else {
      // Actual HTTP request
      return this.http.post<CompileApiResponse>(this.compileUrl, { code }).pipe(
        tap((response) => {
          this.compileOutputSource.next(response.output);
        })
      );
    }
  }
}
