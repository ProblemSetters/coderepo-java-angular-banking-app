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
import { Router } from "@angular/router";
import { BeneficiaryComponent } from "src/app/beneficiary/beneficiary.component";
import { AppComponent } from "src/app/app.component";
import { of } from "rxjs";
import { AuthenticationService } from "src/app/services/authentication.service";
import { BeneficiaryService } from "src/app/services/beneficiary.service";



class MockAuthenticationService {
  isAuthenticate() {
    return of(true);
  }
  getToken(){
    return of('token');
  }
  account() {
    return of({ accountId: 1, balance: 1600 });
  }

  logout() {}
}

class MockBeneficiaryService {
  getAllBeneficiaries() {
    return of([{ accountId: 2, name: "Beneficiary 1" }]);
  }
}

export class RouterStub {
  routerState = { root: "" };
  navigate() {
    return of({});
  }
}

describe('Theme Toggler Button Integration Test', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let darkThemeService: DarkThemeSelectorService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent ,NavbarComponent, BeneficiaryComponent],
      imports: [
        BrowserModule,
        RouterTestingModule.withRoutes([
          { path: 'beneficiary', component: BeneficiaryComponent }
        ]),
        RouterTestingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot({ balance: balanceReducer }),
      ],
      providers: [DarkThemeSelectorService,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: BeneficiaryService, useClass: MockBeneficiaryService },

      ], // Use real service
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    darkThemeService = TestBed.inject(DarkThemeSelectorService);
    router = TestBed.inject(Router);
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

  it('should have body class bg-gray-900 on beneficiary page when dark mode is enabled', fakeAsync(() => {
    // Navigate to beneficiary page
    router.navigate(["beneficiary"]);
    fixture.detectChanges();
    tick();

    // Enable dark mode
    darkThemeService.setDarkTheme();
    fixture.detectChanges();
    tick(); // Ensure that change detection has complete

    // Check if body has class bg-gray-900
    expect(document.body.classList.contains("bg-gray-900")).toBeTrue();

    // Disable dark mode
    darkThemeService.setLightTheme();
    fixture.detectChanges();
    tick(); // Ensure that change detection has completed

    // Check if body does not have class bg-gray-900
    expect(document.body.classList.contains("bg-gray-900")).toBeFalse();
  }));
});
