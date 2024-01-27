import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/enviroment/auth.service';

@Component({
  template: '',
})
export class CallbackComponent {
  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.queryParams.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.authService.exchangeCodeForToken(code);
      }
    });
  }
}
