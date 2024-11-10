import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
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
  
    fixture.detectChanges();
  });
  

  it("should navigate forward through elements on 'e' key press", fakeAsync(() => {
    spyOn(component, 'navigateFocus');
    const event = new KeyboardEvent('keydown', { key: 'e' });
    window.dispatchEvent(event);
    tick();

    expect(component.navigateFocus).toHaveBeenCalledWith(1);
  }));

  it("should navigate backward through elements on 'W' key press", fakeAsync(() => {
    spyOn(component, 'navigateFocus');
    const event = new KeyboardEvent('keydown', { key: 'W' });
    window.dispatchEvent(event);
    tick();

    expect(component.navigateFocus).toHaveBeenCalledWith(-1);
  }));

  it("should toggle row selection on 'Q' key press", fakeAsync(() => {
    component.currentFocusIndex = 5; // Assuming row focus index starts at 5
    const rowElement = fixture.debugElement.query(By.css(`#row_0`));
    const checkbox = rowElement.query(By.css("input[type='checkbox']")).nativeElement;

    // Simulate 'Q' press to select the row
    const qEvent = new KeyboardEvent('keydown', { key: 'Q' });
    window.dispatchEvent(qEvent);
    tick();

    expect(checkbox.checked).toBe(true); // Verify checkbox is checked

    // Simulate 'Q' press to unselect the row
    window.dispatchEvent(qEvent);
    tick();

    expect(checkbox.checked).toBe(false); // Verify checkbox is unchecked
  }));
  
  it("should call exportToCsv() when export button is focused and Q is pressed", fakeAsync(() => {
    spyOn(component, 'exportToCsv');
    
    const exportButtonIndex = component.focusableElements.indexOf('export');
    component.currentFocusIndex = exportButtonIndex;
    fixture.detectChanges();
    const qEvent = new KeyboardEvent('keydown', { key: 'Q' });
    window.dispatchEvent(qEvent); // Use window if the listener is global
    tick();
  
    // Check if exportToCsv was called
    expect(component.exportToCsv).toHaveBeenCalled();
  }));
  
  
});
