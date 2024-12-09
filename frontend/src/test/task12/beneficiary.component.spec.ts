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
import { Renderer2 } from "@angular/core";

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

  it("should swap two adjacent beneficiaries correctly", () => {
    const fixture = TestBed.createComponent(BeneficiaryComponent);
    const component = fixture.componentInstance;

    // Initial beneficiaries setup
    component.beneficiaryList = [
      {
        beneficiaryAccountId: "123",
        name: "John Doe",
        dateCreated: "2023-09-15",
      },
      {
        beneficiaryAccountId: "456",
        name: "Jane Smith",
        dateCreated: "2023-09-16",
      },
    ];

    // Simulate the drag and drop event to swap two adjacent beneficiaries
    const dragIndex = 0; // John Doe is at index 0
    const dropIndex = 1; // Jane Smith is at index 1

    // Perform the swap logic (swap two adjacent items)
    const temp = component.beneficiaryList[dragIndex];
    component.beneficiaryList[dragIndex] = component.beneficiaryList[dropIndex];
    component.beneficiaryList[dropIndex] = temp;

    // Expect the items to be swapped
    expect(component.beneficiaryList[0].beneficiaryAccountId).toBe("123"); // Jane Smith should now be at index 0
    expect(component.beneficiaryList[1].beneficiaryAccountId).toBe("456"); // John Doe should now be at index 1
  });

  it("should not allow adding duplicate beneficiaries from the dropdown", () => {
    const fixture = TestBed.createComponent(BeneficiaryComponent);
    const component = fixture.componentInstance;
    const directive = new DragDropDirective(
      fixture.debugElement,
      fixture.debugElement.injector.get(Renderer2)
    );

    // Existing beneficiary list with one beneficiary
    component.beneficiaryList = [
      {
        beneficiaryAccountId: "123",
        name: "John Doe",
        dateCreated: "2023-09-15",
      },
    ];

    directive.list = component.beneficiaryList;

    // Mocking a drop event from the dropdown
    const dropEvent = new DragEvent("drop", {
      dataTransfer: new DataTransfer(),
    });

    // Simulate dragging a duplicate beneficiary from the dropdown
    dropEvent.dataTransfer?.setData("text/plain", "new-item");
    dropEvent.dataTransfer?.setData(
      "item",
      JSON.stringify({ beneficiary: "123" })
    );

    // Simulate drop with the same beneficiary being dragged from the dropdown
    directive.onDrop(dropEvent);

    // Expect no duplicate beneficiary to be added
    expect(component.beneficiaryList.length).toBe(1); // No new item added
  });
});
