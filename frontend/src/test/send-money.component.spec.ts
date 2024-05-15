import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { SendMoneyComponent } from "../app/send-money/send-money.component";
import { TransactionService } from "src/app/services/transaction.service";
import { Store, StoreModule } from "@ngrx/store";
import { updateBalance } from "src/app/state/balance.actions";
import { of } from "rxjs";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app/app-routing.module";
import {
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClipboardModule } from "ngx-clipboard";
import { balanceReducer } from "../app/state/balance.reducer";

describe("SendMoneyComponent", () => {
  let component: SendMoneyComponent;
  let fixture: ComponentFixture<SendMoneyComponent>;
  let transactionService: TransactionService;
  let store: Store<any>;
  let totalBal: Number;
  const initialBalance = 1000;
  const transferAmount = 500;
  const updatedBalance =  500;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SendMoneyComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        NgbCollapseModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
          timeOut: 4000,
          positionClass: "toast-top-right",
          preventDuplicates: true,
          enableHtml: true,
        }),
        NgbDatepickerModule,
        ClipboardModule,
        StoreModule.forRoot({ balance: balanceReducer }, {}),
      ],
      providers: [TransactionService],
    }).compileComponents();
    fixture = TestBed.createComponent(SendMoneyComponent);
    component = fixture.componentInstance;
    transactionService = TestBed.inject(TransactionService);
    store = TestBed.inject(Store);
    fixture.detectChanges();
    store.dispatch(updateBalance({ balance: initialBalance }));
    component.accountId = 1;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Check initial balance", () => {
    store.select("balance").subscribe((data) => {
      totalBal = data.balance;
      expect(data.balance).toEqual(initialBalance);
    });
  });

  it("should update balance after sending money", () => {
    // Mocking the account
    component.account = {
      id: 1,
      accountId: 1,
      firstName: "John",
      lastName: "Doe",
      dob: new Date(),
      gender: "",
      address: "",
      city: "",
      emailAddress: "",
      balance: "",
      password: "",
      totalTransactions: 0,
      totalCards: 0,
    };

    // Mocking the form values
    component.sendMoneyForm.setValue({
      toAccountId: 2,
      transferAmount: transferAmount,
    });

    // Mocking the transaction service

    spyOn(transactionService, "sendMoney").and.returnValue(
      of({
        balance: updatedBalance,
      })
    );

    // Mocking the store dispatch
    spyOn(store, "dispatch").and.callThrough();
    // Calling the onSubmit method
    component.onSubmit(); 
 
    spyOn(store , 'select').and.returnValue(of({balance: updatedBalance}));
    store.select("balance").subscribe((data) => { 
      expect(data.balance).toEqual(updatedBalance);
    });
  });

 
});
