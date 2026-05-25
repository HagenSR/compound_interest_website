
import { Injectable, DOCUMENT, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject<Document>(DOCUMENT);


  private isDark = true;

  constructor() {
    this.doc.documentElement.classList.add('app-dark');
  }

  toggleTheme() {
    if (this.isDark) {
      this.doc.documentElement.classList.remove('app-dark');
    } else {
      this.doc.documentElement.classList.add('app-dark');
    }
    this.isDark = !this.isDark;
  }
}
