import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/enviroment/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login().subscribe({
      next: (url: string) => {
        window.location.href = url;
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }
}
