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

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });

  // // form initialization
  // it("should initialize the form with a beneficiaryAccountId control", () => {
  //   expect(component.beneficiaryForm.contains("beneficiaryAccountId")).toBe(
  //     true
  //   );
  // });

  // // form validation
  // it("should mark the form as invalid if beneficiaryAccountId is empty", () => {
  //   const beneficiaryAccountId = component.beneficiaryForm.get(
  //     "beneficiaryAccountId"
  //   );
  //   beneficiaryAccountId!.setValue("");
  //   expect(component.beneficiaryForm.invalid).toBe(true);
  // });

  // // dark mode toggle
  // it("should toggle dark mode based on the theme", () => {
  //   component.ngOnInit();
  //   expect(component.isDarkMode).toBe(true);
  // });

  // // fetch beneficiaries on initialization
  // it("should fetch all beneficiaries on init", () => {
  //   spyOn(component, "getAllBeneficiaries");
  //   component.ngOnInit();
  //   expect(component.getAllBeneficiaries).toHaveBeenCalled();
  // });

  // // error message for empty form submission
  // it("should show an error message if the form is submitted with empty fields", () => {
  //   spyOn(component["toastr"], "error");
  //   component.onSubmit();
  //   expect(component["toastr"].error).toHaveBeenCalledWith(
  //     "Please fill in all the required fields."
  //   );
  // });

  // // drag and drop functionality test cases :

  // it("should apply drag and drop directive on table rows", () => {
  //   const rows = debugElement.queryAll(By.css("tbody tr"));
  //   rows.forEach(row => {
  //     expect(row.attributes["appDragDrop"]).toBeDefined();
  //   });
  // });

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

  it('should swap adjacent items correctly when dragged and dropped', () => {
    // Initialize a mock list of beneficiaries
    component.beneficiaryList = [
      { beneficiaryAccountId: '123', dateCreated: "2023-01-01" }, // Index 0
      { beneficiaryAccountId: '456', dateCreated: "2023-01-02" }, // Index 1
      { beneficiaryAccountId: '789', dateCreated: "2023-01-03" }, // Index 2
    ];
  
    fixture.detectChanges();
  
    // Simulate drag and drop between adjacent items
    const dragEvent = new DragEvent("dragstart", {
      dataTransfer: new DataTransfer(),
    });
    const dropEvent = new DragEvent("drop", {
      dataTransfer: new DataTransfer(),
    });
  
    const dragIndex = 0; // Index of the item to drag
    const dropIndex = 1; // Index of the adjacent item to drop onto
  
    // dragEvent.dataTransfer.setData('text/plain', dragIndex.toString());
  
    const dragRow = debugElement.queryAll(By.css('tbody tr'))[dragIndex].nativeElement;
    const dropRow = debugElement.queryAll(By.css('tbody tr'))[dropIndex].nativeElement;
  
    dragRow.dispatchEvent(dragEvent);
    dropRow.dispatchEvent(dropEvent);
  
    fixture.detectChanges();
  
    // Check if the adjacent items have been swapped correctly
    expect(component.beneficiaryList[0].beneficiaryAccountId).toBe('456');
    expect(component.beneficiaryList[1].beneficiaryAccountId).toBe('123');
  });
  
  it('should not modify the list if it is empty', () => {
    // Initialize an empty list of beneficiaries
    component.beneficiaryList = [];
  
    fixture.detectChanges();
  
    // Simulate dragstart and drop event even though list is empty
    const dragEvent = new DragEvent("dragstart", {
      dataTransfer: new DataTransfer(),
    });
    const dropEvent = new DragEvent("drop", {
      dataTransfer: new DataTransfer(),
    });
  
    const tbodyElement = debugElement.query(By.css('tbody')).nativeElement;
  
    // Dispatch drag and drop events
    tbodyElement.dispatchEvent(dragEvent);
    tbodyElement.dispatchEvent(dropEvent);
  
    fixture.detectChanges();
  
    // List should remain unchanged (empty)
    expect(component.beneficiaryList).toEqual([]);
  });
  

  it('should correctly handle multiple consecutive drag-and-drop operations', () => {
    // Initialize a mock list of beneficiaries
    component.beneficiaryList = [
      { beneficiaryAccountId: '123', dateCreated: "2023-01-01" }, // Index 0
      { beneficiaryAccountId: '456', dateCreated: "2023-01-02" }, // Index 1
      { beneficiaryAccountId: '789', dateCreated: "2023-01-03" }, // Index 2
      { beneficiaryAccountId: '012', dateCreated: "2023-01-04" }  // Index 3
    ];
  
    fixture.detectChanges();
  
    // Simulate first drag-and-drop operation (index 0 to index 2)
    const dragEvent1 = new DragEvent('dragstart', {
      dataTransfer: new DataTransfer(),
    });
    const dropEvent1 = new DragEvent('drop', {
      dataTransfer: new DataTransfer(),
    });
  
    // Set dataTransfer with the starting index (0) and simulate drag-and-drop
    const dragIndex1 = 0; 
    const dropIndex1 = 2; 
  
    const dragRow1 = debugElement.queryAll(By.css('tbody tr'))[dragIndex1].nativeElement;
    const dropRow1 = debugElement.queryAll(By.css('tbody tr'))[dropIndex1].nativeElement;
  
    dragRow1.dispatchEvent(dragEvent1);
    dropRow1.dispatchEvent(dropEvent1);
  
    fixture.detectChanges();
  
    // Simulate second drag-and-drop operation (index 1 to index 3)
    const dragEvent2 = new DragEvent('dragstart', {
      dataTransfer: new DataTransfer(),
    });
    const dropEvent2 = new DragEvent('drop', {
      dataTransfer: new DataTransfer(),
    });
  
    const dragIndex2 = 1;
    const dropIndex2 = 3;
  
    const dragRow2 = debugElement.queryAll(By.css('tbody tr'))[dragIndex2].nativeElement;
    const dropRow2 = debugElement.queryAll(By.css('tbody tr'))[dropIndex2].nativeElement;
  
    dragRow2.dispatchEvent(dragEvent2);
    dropRow2.dispatchEvent(dropEvent2);
  
    fixture.detectChanges();
  
    // Check if the list is in the expected final state
    expect(component.beneficiaryList).toEqual([
      { beneficiaryAccountId: '456', dateCreated: "2023-01-02" }, // Moved from index 1 to index 0
      { beneficiaryAccountId: '789', dateCreated: "2023-01-03" }, // Same position
      { beneficiaryAccountId: '123', dateCreated: "2023-01-01" }, // Moved from index 0 to index 2
      { beneficiaryAccountId: '012', dateCreated: "2023-01-04" }  // Same position
    ]);
  });
  
});  
