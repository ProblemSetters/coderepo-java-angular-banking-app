import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import {
  DarkThemeSelectorService,
  AppTheme,
} from "src/app/services/themeToggle.service";
import { balanceReducer } from "src/app/state/balance.reducer";
import { BehaviorSubject, of } from "rxjs";

// Mock service
class MockDarkThemeSelectorService {
  private themeSubject = new BehaviorSubject<AppTheme | undefined>(
    AppTheme.LIGHT
  ); // Default value for the test
  currentTheme = this.themeSubject.asObservable();

  setLightTheme() {}
  setDarkTheme() {}
  setSystemTheme() {}

  // Method to manually set the theme for testing
  setTheme(theme: AppTheme) {
    this.themeSubject.next(theme);
  }
}

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let darkThemeService: MockDarkThemeSelectorService;

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
      providers: [
        {
          provide: DarkThemeSelectorService,
          useClass: MockDarkThemeSelectorService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    darkThemeService = TestBed.inject(
      DarkThemeSelectorService
    ) as unknown as MockDarkThemeSelectorService;
    fixture.detectChanges();
  });

  it("should initialize with the correct theme", () => {
    darkThemeService.setTheme(AppTheme.LIGHT);
    fixture.detectChanges();
    // Given the default value is LIGHT
    expect(component.isDarkMode).toBeFalse();
  });

  it("should toggle theme correctly", () => {
    // Given the default value is DARK
    darkThemeService.setTheme(AppTheme.DARK);
    fixture.detectChanges();

    expect(component.isDarkMode).toBeTrue();
  });

  it("should call setLightTheme when toggling from dark to light", () => {
    spyOn(darkThemeService, "setLightTheme").and.callThrough();
    spyOn(darkThemeService, "setDarkTheme");

    // Set initial theme to DARK
    darkThemeService.setTheme(AppTheme.DARK);
    fixture.detectChanges();

    // Verify the component state after setting the theme
    expect(component.isDarkMode).toBeTrue();

    // Trigger theme toggle
    component.handleToggleTheme();
    fixture.detectChanges();

    // Verify that setLightTheme was called
    expect(darkThemeService.setLightTheme).toHaveBeenCalled();
    expect(darkThemeService.setDarkTheme).not.toHaveBeenCalled();
  });

  it("should call setDarkTheme when toggling from light to dark", () => {
    spyOn(darkThemeService, "setLightTheme");
    spyOn(darkThemeService, "setDarkTheme").and.callThrough();

    // Set initial theme to LIGHT
    darkThemeService.setTheme(AppTheme.LIGHT);
    fixture.detectChanges();

    // Verify the component state after setting the theme
    expect(component.isDarkMode).toBeFalse();

    // Trigger theme toggle
    component.handleToggleTheme();
    fixture.detectChanges();

    // Verify that setDarkTheme was called
    expect(darkThemeService.setDarkTheme).toHaveBeenCalled();
    expect(darkThemeService.setLightTheme).not.toHaveBeenCalled();
  });
});
