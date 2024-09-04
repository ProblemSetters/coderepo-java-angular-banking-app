import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ToastrModule } from "ngx-toastr";
import { BeneficiaryComponent } from "src/app/beneficiary/beneficiary.component";
import { BeneficiaryService } from "src/app/services/beneficiary.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { DarkThemeSelectorService } from "src/app/services/themeToggle.service";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { DragDropDirective } from "src/app/services/drag-drop.directive";
import { of } from "rxjs";

class MockBeneficiaryService {

  getAllBeneficiaries(){
    return of([]) ;
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
  let dragDropDirective: DragDropDirective;
  let debugElement: DebugElement;


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
    debugElement = fixture.debugElement;
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

  // dark mode toggle
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

  // error message for empty form submission
  it("should show an error message if the form is submitted with empty fields", () => {
    spyOn(component["toastr"], "error");
    component.onSubmit();
    expect(component["toastr"].error).toHaveBeenCalledWith(
      "Please fill in all the required fields."
    );
  });

  // drag and drop functionality test cases :

  it("should apply drag and drop directive on table rows", () => {
    const rows = debugElement.queryAll(By.css("tbody tr"));
    rows.forEach(row => {
      expect(row.attributes["appDragDrop"]).toBeDefined();
    });
  });

  it("should swap the items on drop", () => {
    // Initializing a mock list of beneficiaries
    component.beneficiaryList = [
      { beneficiaryAccountId: "123", dateCreated: "2023-01-01" },
      { beneficiaryAccountId: "456", dateCreated: "2023-01-02" },
      { beneficiaryAccountId: "789", dateCreated: "2023-01-03" },
    ];

    fixture.detectChanges();

    // Simulate drag and drop
    const dragEvent = new DragEvent("dragstart", {
      dataTransfer: new DataTransfer(),
    });
    const dropEvent = new DragEvent("drop", {
      dataTransfer: new DataTransfer(),
    });

    const dragIndex = 0;
    const dropIndex = 2;

    component.beneficiaryList[dragIndex].dragIndex = dragIndex;
    component.beneficiaryList[dropIndex].dropIndex = dropIndex;

    const firstRow = debugElement.queryAll(By.css("tbody tr"))[dragIndex]
      .nativeElement;
    const lastRow = debugElement.queryAll(By.css("tbody tr"))[dropIndex]
      .nativeElement;

    firstRow.dispatchEvent(dragEvent);
    lastRow.dispatchEvent(dropEvent);

    fixture.detectChanges();

    // Check if the items have been swapped
    expect(component.beneficiaryList[0].beneficiaryAccountId).toBe("789");
    expect(component.beneficiaryList[2].beneficiaryAccountId).toBe("123");
  });
  
});
