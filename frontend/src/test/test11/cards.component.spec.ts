import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CardsComponent } from "../../app/cards/cards.component";
import { By } from "@angular/platform-browser";

describe("CardsComponent", () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsComponent],
    });
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Card Elements", () => {
    const cardElements = () => fixture.debugElement.queryAll(By.css(".card"));

    it("should have correct aria-label and role for card number", () => {
      cardElements().forEach((cardElement, index) => {
        const card = component.cardList[index];
        const cardNoElement = cardElement.query(By.css(".card-no"));

        expect(cardNoElement.nativeElement.getAttribute("aria-label")).toBe(
          "card number " +
            component.formatCardNumber(card.cardNumber.toString())
        );
        expect(cardNoElement.nativeElement.getAttribute("role")).toBe("text");
      });
    });

    it("should have correct aria-label and role for card holder name", () => {
      cardElements().forEach((cardElement, index) => {
        const card = component.cardList[index];
        const cardHolderNameElement = cardElement.query(
          By.css(".card-holder-name")
        );

        expect(
          cardHolderNameElement.nativeElement.getAttribute("aria-label")
        ).toBe("card holder name " + card.cardHolderName);
        expect(cardHolderNameElement.nativeElement.getAttribute("role")).toBe(
          "text"
        );
      });
    });

    it("should have correct aria-label and role for card expiry date", () => {
      cardElements().forEach((cardElement, index) => {
        const card = component.cardList[index];
        const cardExpireElement = cardElement.query(
          By.css(".card-expire-month-year")
        );

        expect(cardExpireElement.nativeElement.getAttribute("aria-label")).toBe(
          card.expireMonth + "/" + card.expireYear
        );
        expect(cardExpireElement.nativeElement.getAttribute("role")).toBe(
          "text"
        );
      });
    });

    it("should have correct aria-label and role for account number", () => {
      cardElements().forEach((cardElement, index) => {
        const card = component.cardList[index];
        const accountNumberElement = cardElement.query(By.css(".my-4"));

        expect(
          accountNumberElement.nativeElement.getAttribute("aria-label")
        ).toBe(
          "account number " +
            component.formatAccountNumber(card.accountId.toString())
        );
        expect(accountNumberElement.nativeElement.getAttribute("role")).toBe(
          "text"
        );
      });
    });

    it("should have correct aria-label and role for CVV", () => {
      cardElements().forEach((cardElement, index) => {
        const card = component.cardList[index];
        const cvvElement = cardElement.query(By.css(".text-white.hidden"));

        expect(cvvElement.nativeElement.getAttribute("aria-label")).toBe(
          card.cvv
        );
        expect(cvvElement.nativeElement.getAttribute("role")).toBe("text");
      });
    });

    it("should have correct aria-label and role for the checkbox", () => {
      cardElements().forEach((cardElement) => {
        const checkboxElement = cardElement.query(
          By.css('input[type="checkbox"]')
        );

        expect(checkboxElement.nativeElement.getAttribute("aria-label")).toBe(
          "block this card"
        );
        expect(checkboxElement.nativeElement.getAttribute("role")).toBe(
          "checkbox"
        );
      });
    });
  });
});
