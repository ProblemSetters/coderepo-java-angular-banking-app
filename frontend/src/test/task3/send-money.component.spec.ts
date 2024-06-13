import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { TransactionService } from "src/app/services/transaction.service";
import { BeneficiaryService } from "src/app/services/beneficiary.service";
import { Store } from "@ngrx/store";
import { updateBalance } from "src/app/state/balance.actions";
import { of } from "rxjs";
// import { RouterTestingModule } from "@angular/router/testing";
import { CommonModule } from "@angular/common";
import { AuthService } from "src/app/services/auth.service";
import { SendMoneyComponent } from "src/app/send-money/send-money.component";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { AuthenticationService } from "src/app/services/authentication.service";
// import { Router, NavigationEnd } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";
// import { AppRoutingModule } from "src/app/app-routing.module";

class MockTransactionService {
  sendMoney(accountId: number, toAccountId: number, transferAmount: number) {
    return of({});
  }
}

class MockAuthenticationService {
  isAuthenticate() {
    return of(true);
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

class MockAuthService {
  logout() {
    return of({});
  }
}

export class RouterStub {
  routerState = { root: "" };
  navigate() {
    return of({});
  }
}

describe("Balance Update Tests", () => {
  let sendMoneyFixture: ComponentFixture<SendMoneyComponent>;
  let sendMoneyComponent: SendMoneyComponent;
  let navbarFixture: ComponentFixture<NavbarComponent>;
  let navbarComponent: NavbarComponent;
  let toastrService: ToastrService;
  let transactionService: MockTransactionService;
  let authenticationService: MockAuthenticationService;
  let beneficiaryService: MockBeneficiaryService;
  let store: jasmine.SpyObj<Store<any>>;
  // let router: Router;

  beforeEach(async () => {
    const toastrServiceSpy = jasmine.createSpyObj("ToastrService", [
      "error",
      "success",
    ]);
    const storeSpy = jasmine.createSpyObj("Store", ["dispatch", "select"]);
    // const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
    // routerSpy.events = of(new NavigationEnd(0, "", ""));

    await TestBed.configureTestingModule({
      declarations: [SendMoneyComponent, NavbarComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        // RouterTestingModule,
        CommonModule,
      ],
      providers: [
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: TransactionService, useClass: MockTransactionService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: BeneficiaryService, useClass: MockBeneficiaryService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: Store, useValue: storeSpy },
        // { provide: Router, useValue: routerSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    sendMoneyFixture = TestBed.createComponent(SendMoneyComponent);
    sendMoneyComponent = sendMoneyFixture.componentInstance;
    navbarFixture = TestBed.createComponent(NavbarComponent);
    navbarComponent = navbarFixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    transactionService = TestBed.inject(
      TransactionService
    ) as unknown as MockTransactionService;
    authenticationService = TestBed.inject(
      AuthenticationService
    ) as unknown as MockAuthenticationService;
    beneficiaryService = TestBed.inject(
      BeneficiaryService
    ) as unknown as MockBeneficiaryService;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store<any>>;
    // router = TestBed.inject(Router);

    sendMoneyFixture.detectChanges();
    navbarFixture.detectChanges();
  });

  it("should update balance test 1", () => {
    const balance = 800;
    store.select.and.returnValue(of({ balance }));
    navbarComponent.getBalance();
    expect(navbarComponent.balance).toBe(balance);
  });
  it("should update balance test 2", () => {
    const balance = 1500;
    store.select.and.returnValue(of({ balance }));
    navbarComponent.getBalance();
    expect(navbarComponent.balance).toBe(balance);
  });
});
