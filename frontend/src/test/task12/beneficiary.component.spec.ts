import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ToastrModule } from "ngx-toastr";
import { BeneficiaryComponent } from "src/app/beneficiary/beneficiary.component";
import { BeneficiaryService } from "src/app/services/beneficiary.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { DarkThemeSelectorService } from "src/app/services/themeToggle.service";
import { of } from "rxjs";

class MockBeneficiaryService {
  getAllBeneficiaries() {
    return of([]);
  }
  storeBeneficiary(accountId: number, beneficiaryAccountId: string) {
    return of({ success: true });
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeneficiaryComponent],
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
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // form initialization
  it("should initialize the form with a beneficiaryAccountId control", () => {
    expect(component.beneficiaryForm.contains("beneficiaryAccountId")).toBe(
      true
    );
  });

  // form validation

  it("should mark the form as invalid if beneficiaryAccountId is empty", () => {
    const beneficiaryAccountId = component.beneficiaryForm.get(
      "beneficiaryAccountId"
    );
    beneficiaryAccountId!.setValue("");
    expect(component.beneficiaryForm.invalid).toBe(true);
  });

  // check if table is rendered with correct classes

  it("should render the table with correct classes", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const table = compiled.querySelector("table");

    expect(table).toBeTruthy();
    expect(table?.classList).toContain("w-full");
    expect(table?.classList).toContain("text-sm");
    expect(table?.classList).toContain("text-left");
    expect(table?.classList).toContain("text-gray-500");
    expect(table?.classList).toContain("dark:text-gray-400");
    expect(table?.classList).toContain("dark:bg-gray-900");
  });

  //dark mode toggle

  it("should toggle dark mode based on the theme", () => {
    component.ngOnInit();
    expect(component.isDarkMode).toBe(true);
  });
 

  // fetch beneficiaries on initialization

  it("should fetch all beneficiaries on init", () => {
    spyOn(component, "getAllBeneficiaries");
    component.ngOnInit();
    expect(component.getAllBeneficiaries).toHaveBeenCalled();
  });

  // no beneficiaries message

  it('should display "No beneficiaries" message when list is empty', () => {
    component.beneficiaryList = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".text-center")!.textContent).toContain(
      "No beneficiaries"
    );
  });

  // error message for empty form submission

  it("should show an error message if the form is submitted with empty fields", () => {
    spyOn(component["toastr"], "error");
    component.onSubmit();
    expect(component["toastr"].error).toHaveBeenCalledWith(
      "Please fill in all the required fields."
    );
  });

  // check if drag and drop directive is applied

  it("should apply the drag-and-drop directive to each beneficiary row", () => {
    component.beneficiaryList = [
      { beneficiaryAccountId: "1010113163", dateCreated: "2023-08-29" },
      { beneficiaryAccountId: "1010113169", dateCreated: "2023-08-30" },
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      expect(row.hasAttribute("appDragDrop")).toBe(true);
    });
  });

  //simulate drag and drop and check if list order is updated

  it("should update the beneficiary list order after drag and drop", () => {
    component.beneficiaryList = [
      { beneficiaryAccountId: "1010113169", dateCreated: "2023-08-29" },
      { beneficiaryAccountId: "1010113162", dateCreated: "2023-08-30" },
      { beneficiaryAccountId: "1010113161", dateCreated: "2023-08-31" },
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll("tbody tr");

    // Simulate dragging the first row to the third position
    const dragEvent = new DragEvent("dragstart");
    const dropEvent = new DragEvent("drop");

    rows[0].dispatchEvent(dragEvent);
    rows[2].dispatchEvent(dropEvent);

    fixture.detectChanges();

    // Check if the order of the list is updated
    expect(component.beneficiaryList[0].beneficiaryAccountId).toBe(
      "1010113162"
    );
    expect(component.beneficiaryList[1].beneficiaryAccountId).toBe(
      "1010113161"
    );
    expect(component.beneficiaryList[2].beneficiaryAccountId).toBe(
      "1010113169"
    );
  });
});
