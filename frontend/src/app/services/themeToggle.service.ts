import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum AppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

const CLIENT_RENDER = typeof localStorage !== 'undefined';
const LS_THEME = 'theme';
let selectedTheme: AppTheme | undefined = undefined;
if (CLIENT_RENDER) {
  selectedTheme = localStorage.getItem(LS_THEME) as AppTheme || undefined;
}

@Injectable({
  providedIn: 'root'
})
export class DarkThemeSelectorService {
  private themeSubject = new BehaviorSubject<AppTheme | undefined>(selectedTheme);

  currentTheme = this.themeSubject.asObservable();

  setLightTheme() {
    this.themeSubject.next(AppTheme.LIGHT);
    this.setToLocalStorage(AppTheme.LIGHT);
    this.removeClassFromHtml(AppTheme.DARK);
  }

  setDarkTheme() {
    this.themeSubject.next(AppTheme.DARK);
    this.setToLocalStorage(AppTheme.DARK);
    this.addClassToHtml(AppTheme.DARK);
  }

  setSystemTheme() {
    this.removeFromLocalStorage();
    if (isSystemDark()) {
      this.themeSubject.next(AppTheme.DARK);
      this.addClassToHtml('dark');
      this.setToLocalStorage(AppTheme.DARK);
    } else {
      this.themeSubject.next(AppTheme.LIGHT);
      this.removeClassFromHtml('dark');
      this.setToLocalStorage(AppTheme.LIGHT);
    }
  }

  private addClassToHtml(className: string) {
    if (CLIENT_RENDER) {
      this.removeClassFromHtml(className);
      document.documentElement.classList.add(className);
    }
  }

  private removeClassFromHtml(className: string) {
    if (CLIENT_RENDER) {
      document.documentElement.classList.remove(className);
    }
  }

  private setToLocalStorage(theme: AppTheme) {
    if (CLIENT_RENDER) {
      localStorage.setItem(LS_THEME, theme);
    }
  }

  private removeFromLocalStorage() {
    if (CLIENT_RENDER) {
      localStorage.removeItem(LS_THEME);
    }
  }
}

function isSystemDark() {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}
