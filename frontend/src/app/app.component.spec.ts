import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AccountComponent } from "./account/account.component";
import { LoginComponent } from "./login/login.component";
import { SendMoneyComponent } from "./send-money/send-money.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TransactionComponent } from "./transaction/transaction.component";
import { BeneficiaryComponent } from "./beneficiary/beneficiary.component";
import { CardsComponent } from "./cards/cards.component";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbModule, NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { ProfileComponent } from "./profile/profile.component";
import { ClipboardModule } from "ngx-clipboard";
import { StoreModule } from "@ngrx/store";
import { balanceReducer } from "./state/balance.reducer";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AccountComponent,
        LoginComponent,
        SendMoneyComponent,
        NavbarComponent,
        DashboardComponent,
        TransactionComponent,
        CardsComponent,
        BeneficiaryComponent,
        ProfileComponent,
      ],
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
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'banking-system-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("banking-system-app");
  });
});


