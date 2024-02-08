import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/services/enviroment/auth.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
})
export class NavbarComponent {
  username: string = '';
  constructor(
    private router: Router,
    private themeService: ThemeService,
    private authService: AuthService // Inject AuthService here
  ) {
    this.username = this.authService.getUsername();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Logout Error:', error);
      },
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
