
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
    // Setting Light Theme Logic goes here
  }

  setDarkTheme() {
    // Setting Dark Theme Logic goes here
  }

  setSystemTheme() {
    // Setting System Theme Logic goes
  }

  private handleRouteChange(url: string) {
    // Handle Route Change Logic goes
  }

  private addClassToHtml(className: string) {
    // Adding class to HTML Logic goes here
  }

  private removeClassFromHtml(className: string) {
    // removing class from HTML Logic goes here
  }

  private setToLocalStorage(theme: AppTheme) {
    // Setting to Local Storage Logic goes here
  }

  private removeFromLocalStorage() {
    // Removing from Local Storage Logic goes here
  }
}

function isSystemDark() {
  // Check is Theme Dark Logic goes here this will return boolean value isThemeDark or not
  // TODO : - For Now Returning false By Default
  return false;
}
