import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);

  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  private set isDarkMode(value: boolean) {
    this.isDarkModeSubject.next(value);
  }

  toggleTheme() {
    if (!this.isDarkMode) {
      //lightMode
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('theme');
    }

    this.isDarkMode = !this.isDarkMode;
  }
}
