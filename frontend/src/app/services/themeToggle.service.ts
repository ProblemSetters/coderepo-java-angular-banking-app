
import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

export enum AppTheme {
  LIGHT = "light",
  DARK = "dark",
}

const CLIENT_RENDER = typeof localStorage !== "undefined";
const LS_THEME = "theme";
let selectedTheme: AppTheme | undefined = undefined;
if (CLIENT_RENDER) {
  selectedTheme = (localStorage.getItem(LS_THEME) as AppTheme) || undefined;
}

@Injectable({
  providedIn: "root",
})
export class DarkThemeSelectorService {
  private themeSubject = new BehaviorSubject<AppTheme | undefined>(
    selectedTheme
  );

  currentTheme = this.themeSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.handleRouteChange(event.url);
      }
    });

    // Initial theme application
    this.handleRouteChange(this.router.url);
  }

  setLightTheme() {
    this.themeSubject.next(AppTheme.LIGHT);
    this.setToLocalStorage(AppTheme.LIGHT);
    this.removeClassFromHtml(AppTheme.DARK);
    this.handleRouteChange(this.router.url); // Ensure the class is updated on theme change
  }

  setDarkTheme() {
    this.themeSubject.next(AppTheme.DARK);
    this.setToLocalStorage(AppTheme.DARK);
    this.addClassToHtml(AppTheme.DARK);
    this.handleRouteChange(this.router.url); // Ensure the class is updated on theme change
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
    this.handleRouteChange(this.router.url); // Ensure the class is updated on theme change
  }

  private handleRouteChange(url: string) {
    if (this.themeSubject.getValue() === AppTheme.DARK && url === '/beneficiary') {
      document.body.classList.add('bg-gray-900');
    } else {
      document.body.classList.remove('bg-gray-900');
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
