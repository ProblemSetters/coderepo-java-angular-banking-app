import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { DarkThemeSelectorService, AppTheme } from "../../app/services/themeToggle.service";
import { BrowserModule } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { StoreModule } from "@ngrx/store";
import { balanceReducer } from "src/app/state/balance.reducer";

describe('NavbarComponent Integration Test', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let darkThemeService: DarkThemeSelectorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        BrowserModule,
        RouterTestingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot({ balance: balanceReducer }),
      ],
      providers: [DarkThemeSelectorService], // Use real service
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    darkThemeService = TestBed.inject(DarkThemeSelectorService);
    fixture.detectChanges();
  });

  it('should initialize with the correct theme', fakeAsync(() => {
    darkThemeService.setLightTheme();
    fixture.detectChanges();
    tick(); // Ensure that change detection has completed

    darkThemeService.currentTheme.subscribe((theme: any) => {
      expect(theme).toBe(AppTheme.LIGHT);
      expect(component.isDarkMode).toBeFalse();
    }).unsubscribe(); // Ensure to unsubscribe to avoid memory leaks
  }));

  it('should toggle theme correctly', fakeAsync(() => {
    // Set initial theme to DARK
    darkThemeService.setDarkTheme();
    fixture.detectChanges();
    tick(); // Ensure that change detection has completed

    // Check if the theme is DARK
    darkThemeService.currentTheme.subscribe((theme: AppTheme | undefined) => {
      expect(theme).toBe(AppTheme.DARK);
    }).unsubscribe(); // Ensure to unsubscribe to avoid memory leaks

    // Trigger theme toggle
    component.handleToggleTheme();
    fixture.detectChanges();
    tick(); // Ensure that change detection has completed

    // Check if the theme has toggled to LIGHT
    darkThemeService.currentTheme.subscribe((theme: AppTheme | undefined) => {
      expect(theme).toBe(AppTheme.LIGHT);
    }).unsubscribe(); // Ensure to unsubscribe to avoid memory leaks
  }));

  it('should call setDarkTheme when toggling from light to dark', fakeAsync(() => {
    darkThemeService.setDarkTheme();
    fixture.detectChanges();
    tick(); // Ensure that change detection has completed

    darkThemeService.currentTheme.subscribe((theme: AppTheme | undefined) => {
      expect(theme).toBe(AppTheme.DARK);
      expect(component.isDarkMode).toBeTrue();
    }).unsubscribe(); // Ensure to unsubscribe to avoid memory leaks
  }));

  it('should call setDarkTheme when toggling from dark to light', fakeAsync(() => {
    darkThemeService.setLightTheme();
    fixture.detectChanges();
    tick(); // Ensure that change detection has completed

    darkThemeService.currentTheme.subscribe((theme: AppTheme | undefined) => {
      expect(theme).toBe(AppTheme.LIGHT);
      expect(component.isDarkMode).toBeFalse();
    }).unsubscribe(); // Ensure to unsubscribe to avoid memory leaks
  }));
});
