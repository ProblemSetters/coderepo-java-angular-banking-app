import { AccountComponent } from "src/app/account/account.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "src/app/services/account.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";

class MockAccountService {
  openAccount(
    firstName: string,
    lastName: string,
    dob: Date,
    gender: string,
    address: string,
    city: string,
    emailAddress: string,
    password: string
  ) {
    return of({});
  }
}

describe("AccountComponent", () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let toastrService: ToastrService;
  let accountService: MockAccountService;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(async () => {
    const toastrServiceSpy = jasmine.createSpyObj("ToastrService", [
      "error",
      "success",
    ]);
    const authenticationServiceSpy = jasmine.createSpyObj(
      "AuthenticationService",
      ["isAuthenticate"]
    );
    const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [ReactiveFormsModule, NgbModule],
      providers: [
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: AccountService, useClass: MockAccountService },
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    accountService = TestBed.inject(
      AccountService
    ) as unknown as MockAccountService;
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);

    // Mocking the isAuthenticate method to return an observable
    // authenticationService.isAuthenticate.and.returnValue(of(false));
  });

  // it('should create the component', () => {
  //   expect(component).toBeTruthy();
  // });

  it("should initialize the form", () => {
    fixture.detectChanges();
    expect(component.openAccountForm).toBeTruthy();
  });

  it("should validate form controls", () => {
    fixture.detectChanges();
    const form = component.openAccountForm;
    expect(form.valid).toBeFalsy();

    form.controls["firstName"].setValue("");
    form.controls["lastName"].setValue("");
    form.controls["dob"].setValue("");
    form.controls["emailAddress"].setValue("invalid-email");
    form.controls["password"].setValue("123");
    form.controls["city"].setValue("");
    form.controls["address"].setValue("");

    component.onSubmit();


    expect(form.controls["firstName"].valid).toBeFalsy();
    expect(component.getFormControlError("firstName")).toBe(
      "First name is required."
    );

    expect(form.controls["lastName"].valid).toBeFalsy();
    expect(component.getFormControlError("lastName")).toBe(
      "Last name is required."
    );

    expect(form.controls["dob"].valid).toBeFalsy();
    expect(component.getFormControlError("dob")).toBe(
      "Date of birth is required."
    );

    expect(form.controls["emailAddress"].valid).toBeFalsy();
    expect(component.getFormControlError("emailAddress")).toBe(
      "Enter a valid email address."
    );

    expect(form.controls["password"].valid).toBeFalsy();
    expect(component.getFormControlError("password")).toBe(
      "Password must be at least 6 characters long."
    );

    expect(form.controls["city"].valid).toBeFalsy();
    expect(component.getFormControlError("city")).toBe("City is required.");

    expect(form.controls["address"].valid).toBeFalsy();
    expect(component.getFormControlError("address")).toBe(
      "Address is required."
    );

    expect(form.controls["privacyPolicy"].valid).toBeFalsy();
    expect(component.getFormControlError("privacyPolicy")).toBe(
      "You must accept the privacy policy."
    );
  });

  it("should show error message when form is invalid", () => {
    fixture.detectChanges();
    component.onSubmit();
    expect(toastrService.error).toHaveBeenCalledWith(
      "Please fill in all the required fields."
    );
  });

  it("should call openAccount on valid form submission", () => {
    fixture.detectChanges();
    const form = component.openAccountForm;
    form.controls["firstName"].setValue("John");
    form.controls["lastName"].setValue("Doe");
    form.controls["dob"].setValue({ year: 2000, month: 1, day: 1 });
    form.controls["emailAddress"].setValue("john.doe@example.com");
    form.controls["password"].setValue("password123");
    form.controls["gender"].setValue("male");
    form.controls["address"].setValue("123 Main St");
    form.controls["city"].setValue("Metropolis");
    form.controls["privacyPolicy"].setValue(true);

    spyOn(accountService, "openAccount").and.returnValue(of({}));

    component.onSubmit();

    expect(accountService.openAccount).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(["login"]);
    expect(toastrService.success).toHaveBeenCalledWith(
      "Account Opened Successfully"
    );
  });

  it("should handle openAccount error", () => {
    fixture.detectChanges();
    const form = component.openAccountForm;
    form.controls["firstName"].setValue("John");
    form.controls["lastName"].setValue("Doe");
    form.controls["dob"].setValue({ year: 2000, month: 1, day: 1 });
    form.controls["emailAddress"].setValue("john.doe@example.com");
    form.controls["password"].setValue("password123");
    form.controls["gender"].setValue("male");
    form.controls["address"].setValue("123 Main St");
    form.controls["city"].setValue("Metropolis");
    form.controls["privacyPolicy"].setValue(true);

    spyOn(accountService, "openAccount").and.returnValue(
      throwError(() => new Error("Error creating account"))
    );

    component.onSubmit();

    expect(accountService.openAccount).toHaveBeenCalled();
    expect(toastrService.error).toHaveBeenCalledWith(
      "Oops! Something went wrong while creating account."
    );
  });
});