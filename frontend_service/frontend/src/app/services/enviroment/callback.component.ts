import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/enviroment/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  template: '',
})
export class CallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      const state = params['state'];
      const savedState = this.storageService.getState();

      if (state === savedState && code) {
        this.authService.exchangeCodeForToken(code).subscribe({
          next: (_token) => {
            this.authService.fetchUserDetails().subscribe({
              next: (_userDetails) => {
                this.router.navigate(['/projects']);
              },
              error: (error) =>
                console.error('Failed to fetch user details', error),
            });
          },
          error: (error) => {
            console.error('Error during token exchange:', error);
            this.router.navigate(['/error']);
          },
        });
      } else {
        console.error('Invalid state or code missing');
        this.router.navigate(['/error']);
      }
    });
  }
}
