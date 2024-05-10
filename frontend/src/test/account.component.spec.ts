import { TestBed, ComponentFixture } from "@angular/core/testing";
import { AccountComponent } from "../app/account/account.component";
import { AccountService } from "src/app/services/account.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";

describe("AccountComponent", () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockAccountService: jasmine.SpyObj<AccountService>;
  let mockAuthenticationService: jasmine.SpyObj<AuthenticationService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const accountServiceSpy = jasmine.createSpyObj("AccountService", [
      "openAccount",
    ]);
    const authenticationServiceSpy = jasmine.createSpyObj(
      "AuthenticationService",
      ["isAuthenticate"]
    );
    const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
    const toastrServiceSpy = jasmine.createSpyObj("ToastrService", [
      "success",
      "error",
    ]);

    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
      ],
    }).compileComponents();

    mockAccountService = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
    mockAuthenticationService = TestBed.inject(
      AuthenticationService
    ) as jasmine.SpyObj<AuthenticationService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockToastrService = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should redirect to login page if user is already authenticated", () => {
      mockAuthenticationService.isAuthenticate.and.returnValue(of(true));

      component.ngOnInit();

      expect(mockRouter.navigate).toHaveBeenCalledWith(["login"]);
    });

    it("should set today date if user is not authenticated", () => {
      const todayDate = new Date();

      mockAuthenticationService.isAuthenticate.and.returnValue(of(false));

      component.ngOnInit();

      expect(component.todayDate).toEqual({
        year: todayDate.getFullYear(),
        month: todayDate.getMonth() + 1,
        day: todayDate.getDate(),
      });
    });
  });

  // Test case for check validation of form
  describe("isFormValid", () => {
    it("should return true if form is valid", () => {
      component.openAccount = {
        firstName: "John",
        lastName: "Doe",
        dob: component.todayDate,
        gender: "male",
        address: "123 Street",
        city: "City",
        emailAddress: "test@yuiii.com",
        password: "password123",
      };
    });
  });

  describe("isFormInValid", () => {
    it("should return false if form is invalid", () => {
      component.openAccount = {
        firstName: "",
        lastName: "",
        dob: component.todayDate,
        gender: "male",
        address: "123 Street",
        city: "City",
        emailAddress: "test@yuiii.com",
        password: "password123",
      };
    });
  });

  describe("onSubmit", () => {
    it("should open account successfully", () => {
      const todayDate = new Date();
      const openAccountData = {
        firstName: "John",
        lastName: "Doe",
        dob: todayDate,
        gender: "male",
        address: "123 Street",
        city: "City",
        emailAddress: "john.doe@example.com",
        password: "password123",
      };
      const expectedDateOfBirth = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate()
      );

      mockAccountService.openAccount.and.returnValue(of(true));

      component.todayDate = {
        year: todayDate.getFullYear(),
        month: todayDate.getMonth() + 1,
        day: todayDate.getDate(),
      };
      component.openAccount = openAccountData;

      component.onSubmit();

      expect(mockAccountService.openAccount).toHaveBeenCalledWith(
        openAccountData.firstName,
        openAccountData.lastName,
        expectedDateOfBirth,
        openAccountData.gender,
        openAccountData.address,
        openAccountData.city,
        openAccountData.emailAddress,
        openAccountData.password
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith(["login"]);
      expect(mockToastrService.success).toHaveBeenCalledWith(
        "Account Opened Successfully"
      );
    });

    it("should handle error while opening account", () => {
      const errorResponse = {
        error: "Oops! Something went wrong while creating account.",
        status: 500,
        statusText: "Internal Server Error",
        url: "/api/account/open",
        name: "HttpErrorResponse",
        message:
          "Http failure response for /api/account/open: 500 Internal Server Error",
        ok: false,
      };

      mockAccountService.openAccount.and.returnValue(of(errorResponse));

      component.onSubmit();

      expect(mockToastrService.error).toHaveBeenCalledWith(
        "Oops! Something went wrong while creating account."
      );
    });
  });
});
