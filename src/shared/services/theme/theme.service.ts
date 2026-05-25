
import { Inject, Injectable, DOCUMENT } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private isDark = true;

  constructor(@Inject(DOCUMENT) private doc: Document) {
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
