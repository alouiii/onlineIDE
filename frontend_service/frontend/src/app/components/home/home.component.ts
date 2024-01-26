import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class HomeComponent {
  constructor(private router: Router) {}

  login() {
    console.log('login');
    this.router.navigate(['/projects']);
  }
}
