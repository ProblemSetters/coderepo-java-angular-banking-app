import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from "@angular/platform-browser";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TransactionComponent } from "src/app/transaction/transaction.component";
import { By } from "@angular/platform-browser";

describe("TransactionComponent (Accessibility Keyboard Navigation)", () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionComponent],
      imports: [
        BrowserModule,
        NgbModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;

    // Sample data for transactions
    component.transactionsList = [
      {
        transactionId: 1,
        dateCreated: new Date(),
        fromAccountId: 1001,
        toAccountId: 2001,
        transferAmount: 500,
        id: 0,
      },
      {
        transactionId: 2,
        dateCreated: new Date(),
        fromAccountId: 1002,
        toAccountId: 2002,
        transferAmount: 1000,
        id: 1,
      },
    ];

    // Set default values for date selectors
    component.fromDateSearch = { year: 2024, month: 1, day: 1 };
    component.toDateSearch = { year: 2024, month: 1, day: 31 };

    // Explicitly type the array as string[]
    component.focusableElements = [
      "fromDateSearch",
      "toDateSearch",
      "search",
      "export",
      "row_0",
      "row_1"
    ] as string[];
    
    fixture.detectChanges();
  });

  it("should navigate forward through elements on 'e' key press", fakeAsync(() => {
    spyOn(component, "navigateFocus");
    const event = new KeyboardEvent("keydown", { key: "e" });
    window.dispatchEvent(event);
    tick();

    expect(component.navigateFocus).toHaveBeenCalledWith(1);
  }));

  it("should navigate backward through elements on 'W' key press", fakeAsync(() => {
    spyOn(component, "navigateFocus");
    const event = new KeyboardEvent("keydown", { key: "W" });
    window.dispatchEvent(event);
    tick();

    expect(component.navigateFocus).toHaveBeenCalledWith(-1);
  }));

  it("should toggle row selection on 'Q' key press", fakeAsync(() => {
    component.currentFocusIndex = component.focusableElements.indexOf("row_0"); // Ensure the correct row is focused
    fixture.detectChanges();

    const rowElement = fixture.debugElement.query(By.css(`#row_0`));
    const checkbox = rowElement.query(
      By.css("input[type='checkbox']")
    ).nativeElement;

    // Simulate 'Q' press to select the row
    const qEvent = new KeyboardEvent("keydown", { key: "Q" });
    window.dispatchEvent(qEvent);
    tick();
    fixture.detectChanges(); // Force change detection

    // Verify the checkbox's checked state by checking the component's selectedRows set
    expect(component.selectedRows.has(0)).toBeTrue();
    expect(checkbox.checked).toBeTrue(); // Confirm checkbox state in the DOM

    // Simulate 'Q' press again to unselect the row
    window.dispatchEvent(qEvent);
    tick();
    fixture.detectChanges(); // Force change detection

    // Verify the checkbox's unchecked state
    expect(component.selectedRows.has(0)).toBeFalse();
    expect(checkbox.checked).toBeFalse(); // Confirm checkbox state in the DOM
  }));

  it("should call exportToCsv() when export button is focused and Q is pressed", fakeAsync(() => {
    spyOn(component, "exportToCsv");

    const exportButtonIndex = component.focusableElements.indexOf("export");
    component.currentFocusIndex = exportButtonIndex;
    fixture.detectChanges();
    const qEvent = new KeyboardEvent("keydown", { key: "Q" });
    window.dispatchEvent(qEvent); // Use window if the listener is global
    tick();

    // Check if exportToCsv was called
    expect(component.exportToCsv).toHaveBeenCalled();
  }));

  it("should have aria-labels for accessible elements", () => {
    const fromDate = fixture.debugElement.query(
      By.css("#fromDateSearch")
    ).nativeElement;
    expect(fromDate.hasAttribute("aria-label")).toBeTrue();

    const toDate = fixture.debugElement.query(
      By.css("#toDateSearch")
    ).nativeElement;
    expect(toDate.hasAttribute("aria-label")).toBeTrue();

    const searchButton = fixture.debugElement.query(
      By.css("#search")
    ).nativeElement;
    expect(searchButton.hasAttribute("aria-label")).toBeTrue();

    const exportButton = fixture.debugElement.query(
      By.css("#export")
    ).nativeElement;
    expect(exportButton.hasAttribute("aria-label")).toBeTrue();

    component.transactionsList.forEach((_, index) => {
      const checkbox = fixture.debugElement.query(
        By.css(`#checkbox-table-search-${index}`)
      ).nativeElement;
      expect(checkbox.hasAttribute("aria-label")).toBeTrue();

      const row = fixture.debugElement.query(
        By.css(`#row_${index}`)
      ).nativeElement;
      expect(row.hasAttribute("aria-label")).toBeTrue();
    });
  });
});
