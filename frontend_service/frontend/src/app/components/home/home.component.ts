import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {
    this.authService.authenticated.subscribe((res) => {
      if (res) {
        console.log('logged');
        this.router.navigate(['/projects']);
      } else {
        console.log('not logged');
      }
    });
  }

  login() {
    this.authService.login();
  }
}
