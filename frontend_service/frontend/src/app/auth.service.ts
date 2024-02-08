import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';

const LOGIN_PATH = '/login'; 
const LOGOUT_PATH = '/logout';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private authenticated$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public get authenticated(): ReplaySubject<boolean> { 
    return this.authenticated$;
  }
  constructor(private httpClient: HttpClient, private router: Router) {
    this.checkAuthentication();     
  }

  public checkAuthentication(): void { 
    this.httpClient.get<boolean>('http://localhost:8080/authenticated', { withCredentials: true })
    .subscribe((authenticated) => { 
      this.authenticated$.next(authenticated);
      console.log("authenticated" , authenticated);
      
    }, (err) => { 
      this.authenticated$.next(false);
      console.log("err", err);
      console.log("authenticated" , this.authenticated$);

    }); 
  }
  
  // public login(): void {
  //   window.location.href = `${window.location.origin}${LOGIN_PATH}`; // handled by backend
  // }

  
  public logout(): void { 
    
    this.httpClient.post("http://localhost:8080/logout", {}, { withCredentials: true })
    .subscribe(() => { 
      this.router.navigateByUrl('/');
      this.checkAuthentication();
    },
    error => { 
      console.error('Logout failed:', error);
    }); 
  }

  public login(): void {
    console.log('Initiating OAuth 2.0 login flow');
    const authorizationUrl = 'http://localhost:8080/oauth2/authorization/gitlab?redirect_url=http://localhost:8010/';
    window.location.href = authorizationUrl;
  }
}