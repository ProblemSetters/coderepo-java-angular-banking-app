import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { BeneficiaryComponent } from "src/app/beneficiary/beneficiary.component";
import { BeneficiaryService } from "src/app/services/beneficiary.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { DarkThemeSelectorService } from "src/app/services/themeToggle.service";
import { DebugElement } from "@angular/core";
import { DragDropDirective } from "src/app/services/drag-drop.directive";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

class MockBeneficiaryService {
  getAllBeneficiaries() {
    return of([
      {
        beneficiaryAccountId: "123",
        name: "John Doe",
        dateCreated: "2023-09-15",
      },
    ]);
  }

  storeBeneficiary(accountId: number, beneficiaryAccountId: string) {
    return of({ success: true });
  }

  getAllBeneficiaryIds() {
    return of([{ beneficiary: "123" }, { beneficiary: "456" }]);
  }
}

class MockAuthenticationService {
  isAuthenticate() {
    return of(true);
  }

  account() {
    return of({ accountId: 1 });
  }
}

class MockDarkThemeSelectorService {
  currentTheme = of("dark");
}

describe("BeneficiaryComponent", () => {
  let component: BeneficiaryComponent;
  let fixture: ComponentFixture<BeneficiaryComponent>;
  let debugElement: DebugElement;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiaryComponent, DragDropDirective],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        { provide: BeneficiaryService, useClass: MockBeneficiaryService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        {
          provide: DarkThemeSelectorService,
          useClass: MockDarkThemeSelectorService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  // Form initialization
  it("should initialize the form with beneficiaryAccountId control", () => {
    expect(component.beneficiaryForm.contains("beneficiaryAccountId")).toBe(
      true
    );
  });

  // Form validation
  it("should mark the form as invalid if beneficiaryAccountId is empty", () => {
    const beneficiaryAccountId = component.beneficiaryForm.get(
      "beneficiaryAccountId"
    );
    beneficiaryAccountId!.setValue("");
    expect(component.beneficiaryForm.invalid).toBe(true);
  });

  // Dark mode toggle
  it("should toggle dark mode based on the theme", () => {
    component.ngOnInit();
    expect(component.isDarkMode).toBe(true);
  });

  // Fetch beneficiaries on initialization
  it("should fetch all beneficiaries on init", () => {
    spyOn(component, "getAllBeneficiaries").and.callThrough();
    component.ngOnInit();
    expect(component.getAllBeneficiaries).toHaveBeenCalled();
    expect(component.beneficiaryList.length).toBe(1); // Mocked response has 1 beneficiary
  });

  // Dropdown beneficiary IDs fetch
  it("should fetch all beneficiary IDs for the dropdown", () => {
    spyOn(component, "getBeneficiaryIds").and.callThrough();
    component.ngOnInit();
    expect(component.getBeneficiaryIds).toHaveBeenCalled();
    expect(component.filteredBeneficiaryList.length).toBe(2); // Mocked response has 2 IDs
  });

  // Error message for empty form submission
  it("should show an error message if the form is submitted with empty fields", () => {
    spyOn(toastrService, "error");
    component.onSubmit();
    expect(toastrService.error).toHaveBeenCalledWith(
      "Please fill in all the required fields."
    );
  });

  // Successful form submission
  it("should submit the form and add a new beneficiary", () => {
    spyOn(toastrService, "success");
    spyOn(component, "getAllBeneficiaries").and.callThrough();

    component.beneficiaryForm.get("beneficiaryAccountId")?.setValue("123");
    component.onSubmit();

    expect(toastrService.success).toHaveBeenCalledWith(
      "Beneficiary Added Successfully"
    );
    expect(component.getAllBeneficiaries).toHaveBeenCalled();
  });

 

 
});
