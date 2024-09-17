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

  // it("should create the component", () => {
  //   expect(component).toBeTruthy();
  // });

  // // Form initialization
  // it("should initialize the form with beneficiaryAccountId control", () => {
  //   expect(component.beneficiaryForm.contains("beneficiaryAccountId")).toBe(
  //     true
  //   );
  // });

  // // Form validation
  // it("should mark the form as invalid if beneficiaryAccountId is empty", () => {
  //   const beneficiaryAccountId = component.beneficiaryForm.get(
  //     "beneficiaryAccountId"
  //   );
  //   beneficiaryAccountId!.setValue("");
  //   expect(component.beneficiaryForm.invalid).toBe(true);
  // });

  // // Dark mode toggle
  // it("should toggle dark mode based on the theme", () => {
  //   component.ngOnInit();
  //   expect(component.isDarkMode).toBe(true);
  // });

  // // Fetch beneficiaries on initialization
  // it("should fetch all beneficiaries on init", () => {
  //   spyOn(component, "getAllBeneficiaries").and.callThrough();
  //   component.ngOnInit();
  //   expect(component.getAllBeneficiaries).toHaveBeenCalled();
  //   expect(component.beneficiaryList.length).toBe(1); // Mocked response has 1 beneficiary
  // });

  // // Dropdown beneficiary IDs fetch
  // it("should fetch all beneficiary IDs for the dropdown", () => {
  //   spyOn(component, "getBeneficiaryIds").and.callThrough();
  //   component.ngOnInit();
  //   expect(component.getBeneficiaryIds).toHaveBeenCalled();
  //   expect(component.filteredBeneficiaryList.length).toBe(2); // Mocked response has 2 IDs
  // });

  // // Error message for empty form submission
  // it("should show an error message if the form is submitted with empty fields", () => {
  //   spyOn(toastrService, "error");
  //   component.onSubmit();
  //   expect(toastrService.error).toHaveBeenCalledWith(
  //     "Please fill in all the required fields."
  //   );
  // });

  // // Successful form submission
  // it("should submit the form and add a new beneficiary", () => {
  //   spyOn(toastrService, "success");
  //   spyOn(component, "getAllBeneficiaries").and.callThrough();

  //   component.beneficiaryForm.get("beneficiaryAccountId")?.setValue("123");
  //   component.onSubmit();

  //   expect(toastrService.success).toHaveBeenCalledWith(
  //     "Beneficiary Added Successfully"
  //   );
  //   expect(component.getAllBeneficiaries).toHaveBeenCalled();
  // });

 
  it("should swap two adjacent beneficiaries correctly", () => {
    const fixture = TestBed.createComponent(BeneficiaryComponent);
    const component = fixture.componentInstance;
    const directive = new DragDropDirective(
      fixture.debugElement,
      fixture.debugElement.injector.get(Renderer2)
    );
  
    // Initial beneficiaries setup
    component.beneficiaryList = [
      { beneficiaryAccountId: "123", name: "John Doe", dateCreated: "2023-09-15" },
      { beneficiaryAccountId: "456", name: "Jane Smith", dateCreated: "2023-09-16 || 2023-09-15" }
    ];
  
    directive.list = component.beneficiaryList;
    directive.draggableItem = component.beneficiaryList[0]; // Dragging the first item
  
    // Simulate dragging the first item
    const dragEvent = new DragEvent('dragstart');
    const dropEvent = new DragEvent('drop', {
      dataTransfer: new DataTransfer(),
    });
  
    dropEvent.dataTransfer?.setData("text/plain", "0"); // Dragging from index 0
  
    // Simulate dropping the item over the second (index 1)
    directive.onDrop(dropEvent);
  
    // Expect the items to be swapped
    expect(component.beneficiaryList[0].beneficiaryAccountId).toBe("456");
    expect(component.beneficiaryList[1].beneficiaryAccountId).toBe("123");
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
      { beneficiaryAccountId: "123", name: "John Doe", dateCreated: "2023-09-15" }
    ];
  
    directive.list = component.beneficiaryList;
  
    // Mocking a drop event from the dropdown
    const dropEvent = new DragEvent('drop', {
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

  it("should not allow beneficiaries to disappear or leave empty rows on swap in the table", () => {
    const fixture = TestBed.createComponent(BeneficiaryComponent);
    const component = fixture.componentInstance;
    const directive = new DragDropDirective(
      fixture.debugElement,
      fixture.debugElement.injector.get(Renderer2)
    );
  
    // Initial beneficiaries
    component.beneficiaryList = [
      { beneficiaryAccountId: "123", name: "John Doe", dateCreated: "2023-09-15" },
      { beneficiaryAccountId: "456", name: "Jane Smith", dateCreated: "2023-09-16" },
      { beneficiaryAccountId: "789", name: "Alice Wonderland", dateCreated: "2023-09-17" }
    ];
  
    directive.list = component.beneficiaryList;
  
    // Mocking a drop event for swapping two items
    const dropEvent = new DragEvent('drop', {
      dataTransfer: new DataTransfer(),
    });
  
    // Simulate dragging the first item
    dropEvent.dataTransfer?.setData("text/plain", "0"); // Index 0 for John Doe
  
    // Simulate drop on the second item (Jane Smith)
    directive.draggableItem = component.beneficiaryList[0];
    directive.onDrop(dropEvent);
  
    // Ensure the items are swapped correctly
    expect(component.beneficiaryList[0].beneficiaryAccountId).toBe("456"); // Jane Smith now at index 0
    expect(component.beneficiaryList[1].beneficiaryAccountId).toBe("123"); // John Doe now at index 1
    expect(component.beneficiaryList[2].beneficiaryAccountId).toBe("789"); // Alice Wonderland remains unchanged
  
    // Check that no rows are empty (no undefined or null beneficiaries in the list)
    component.beneficiaryList.forEach(beneficiaryAccountId => {
      expect(beneficiaryAccountId).toBeTruthy(); // Ensures no empty rows
    });
  
    // Check that the length of the list is still 3 (no rows added or removed)
    expect(component.beneficiaryList.length).toBe(3);
  });
 
  it('should ensure that no beneficiary in the dropdown is undefined', () => {
  const fixture = TestBed.createComponent(BeneficiaryComponent);
  const component = fixture.componentInstance;

  // Mocked beneficiary list
  component.filteredBeneficiaryList = [
    { beneficiary: '123', name: 'John Doe' , status:'invalid'},
    { beneficiary: '456', name: 'Jane Smith' , status:'valid'}
  ];

  fixture.detectChanges();

  // Check that no item in the filteredBeneficiaryList is undefined
  component.filteredBeneficiaryList.forEach(beneficiary => {
    expect(beneficiary).toBeDefined();
   expect(beneficiary.status).toBeTruthy();
  });
});

it("should reorder items within the table on drop", () => {
  const directive = new DragDropDirective(fixture.debugElement, TestBed.inject(Renderer2));

  // Mock beneficiary list setup
  component.beneficiaryList = [
    { beneficiaryAccountId: "123", name: "John Doe", dateCreated: "2023-09-15" },
    { beneficiaryAccountId: "456", name: "Jane Smith", dateCreated: "2023-09-16" }
  ];

  directive.list = component.beneficiaryList;
  directive.draggableItem = component.beneficiaryList[0]; // Simulate dragging the first item

  // Simulate drop event
  const event = new DragEvent('drop');
  spyOn(event.dataTransfer!, 'getData').and.returnValue('0'); // Dragging from index 0

  directive.onDrop(event);

  // Ensure items at index 0 and 1 are swapped
  expect(directive.list[0]).toEqual(component.beneficiaryList[1]);
  expect(directive.list[1]).toEqual(component.beneficiaryList[0]);
});

it("should swap the first and last beneficiary correctly", () => {
  const directive = new DragDropDirective(fixture.debugElement, TestBed.inject(Renderer2));

  // Initial beneficiaries setup
  component.beneficiaryList = [
    { beneficiaryAccountId: "123", name: "John Doe", dateCreated: "2023-09-15" },
    { beneficiaryAccountId: "456", name: "Jane Smith", dateCreated: "2023-09-16" },
    { beneficiaryAccountId: "789", name: "Alice Wonderland", dateCreated: "2023-09-17" }
  ];

  directive.list = component.beneficiaryList;
  directive.draggableItem = component.beneficiaryList[0]; // Simulate dragging the first item

  // Simulate drop event
  const event = new DragEvent('drop');
  spyOn(event.dataTransfer!, 'getData').and.returnValue('0'); // Dragging from index 0

  // Simulate dropping the item at the last position (index 2)
  directive.onDrop(event);

  // Ensure the first and last items are swapped
  expect(component.beneficiaryList[0].beneficiaryAccountId).toBe("789");
  expect(component.beneficiaryList[2].beneficiaryAccountId).toBe("123");
});

});

   