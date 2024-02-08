import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class HomeComponent {
  constructor(private router: Router, public authService : AuthService) {}



  ngOnInit(): void {
    this.authService.authenticated.subscribe((authenticated) => {
      console.log('Authentication status changed:', authenticated);
    });
    
  }

  // login() {
  //   console.log('login');
    
  //   this.router.navigate(['/projects']);
  // }
  // login() {
  //   console.log('Initiating OAuth 2.0 login flow');

  //   // Construct the OAuth authorization URL
  //   const authorizationUrl = 'http://localhost:8080/oauth2/authorization/gitlab';

  //   // Redirect the user to the OAuth authorization URL
  //   window.location.href = authorizationUrl;
  // }
}
