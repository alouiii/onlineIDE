import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  /**
   * Method which is activated before each route change to a route which requires this guard.
   * E.g. [{ path: 'secure', component: SecureComponent, canActivate: [AuthGuard]}, ... ]
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return (
      this.authService.authenticated
        // pipe each value that is emitted by the Observable
        .pipe(
          // tap will intercept each emission of a value and perform some action
          tap((authenticated) => {
            if (!authenticated) {
              // if user is not authenticated, try login via 'AuthService'
              this.authService.login();
            }
          })
        )
    );
  }
}
