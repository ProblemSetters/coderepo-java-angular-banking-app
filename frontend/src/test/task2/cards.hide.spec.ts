import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastrModule } from "ngx-toastr";
import { HttpClientModule } from "@angular/common/http";
import {
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from "@angular/platform-browser";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClipboardModule } from "ngx-clipboard";
import { StoreModule } from "@ngrx/store";
import { Account, Card } from "src/app/dto/types";
import { CardsComponent } from "src/app/cards/cards.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { balanceReducer } from "src/app/state/balance.reducer";

const cards: Card[] = [
  {
    id: 1,
    cardNumber: 6780732221136152,
    accountId: 1111213170,
    blocked: false,
    expireMonth: "08",
    expireYear: "2035",
    cardHolderName: "test3",
    cvv: 345,
  },
  {
    id: 2,
    cardNumber: 3959245835733866,
    accountId: 1111213170,
    blocked: false,
    expireMonth: "08",
    expireYear: "2035",
    cardHolderName: "test3",
    cvv: 345,
  },
];

const account: Account = {
  accountId: 1111213170,
  firstName: "test",
  lastName: "tes",
  gender: "male",
  address: "sf",
  city: "dsf",
  emailAddress: "test@gmail.com",
  totalTransactions: 0,
  totalCards: 2,
  id: 0,
  dob: new Date(),
  balance: "",
  password: "",
};

describe("CardsComponent", () => {
  let cardList: Card[] = cards;
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let haveHideCvvMethod = false;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsComponent],
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

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    component.cardList = cardList;
    component.createAllCardForms();
    component.account = account;
    component.accountId = account.accountId;
    haveHideCvvMethod = Boolean(component?.hideCvv);
    fixture.detectChanges();
  });

  // it("Component have hideCvv method", () => {
  //   expect(component?.hideCvv).toBeDefined();
  // });

  let idcardCvvHidden: Boolean;
  let idcardHideButtonHidden: Boolean;
  beforeEach(() => {
    const card = cardList[0];
    const cvvId = "#cvv" + card.cardNumber;
    const hideButtonId = "#btnHideCvv" + card.cardNumber;
    component.showCvv(card); // Action to show cvv
    const cardCvv = fixture.nativeElement.querySelector(cvvId);
    const cardHideButton = fixture.nativeElement.querySelector(hideButtonId);
    idcardCvvHidden = cardCvv?.classList.contains("hidden");
    idcardHideButtonHidden = cardHideButton?.classList.contains("hidden");
  });

  // it("Should have cvv shown", () => {
  //   expect(idcardCvvHidden).toBe(false);
  // });

  it("Should have hide button shown", () => {
    expect(idcardHideButtonHidden).toBe(false);
  });

  let idcardCvvShown: Boolean;
  let idcardHideButtonShown: Boolean;

  beforeEach(() => {
    const card = cardList[0];
    const cvvId = "#cvv" + card.cardNumber;
    const hideButtonId = "#btnHideCvv" + card.cardNumber;
    component?.hideCvv(card); // Action to hide cvv
    const cardCvv = fixture.nativeElement.querySelector(cvvId);
    const cardHideButton = fixture.nativeElement.querySelector(hideButtonId);
    idcardCvvShown = cardCvv?.classList?.contains("hidden");
    idcardHideButtonShown = cardHideButton?.classList?.contains("hidden");
  });

  it("Should have cvv hidden", () => {
    expect(idcardCvvShown).toBe(true);
  });

  it("Should have hide button hidden", () => {
    expect(idcardHideButtonShown).toBe(true);
  });
});
