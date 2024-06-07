import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "src/app/services/account.service";
// import { AuthenticationService } from "src/app/services/authentication.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";

const errorMessages = {
  firstName: [{ type: "required", message: "First name is required." }],
  lastName: [{ type: "required", message: "Last name is required." }],
  dob: [{ type: "required", message: "Date of birth is required." }],
  emailAddress: [
    { type: "required", message: "Email address is required." },
    { type: "email", message: "Enter a valid email address." },
  ],
  password: [
    { type: "required", message: "Password is required." },
    {
      type: "minlength",
      message: "Password must be at least 6 characters long.",
    },
  ],
  gender: [{ type: "required", message: "Gender is required." }],
  address: [{ type: "required", message: "Address is required." }],
  city: [{ type: "required", message: "City is required." }],
  privacyPolicy: [
    { type: "required", message: "You must accept the privacy policy." },
  ],
};

interface OpenAccount {
  firstName: string;
  lastName: string;
  dob: object;
  gender: string;
  address: string;
  city: string;
  emailAddress: string;
  password: string;
}
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent {
  public openAccountForm!: FormGroup;
  public isAuth: boolean = false;
  public todayDate: NgbDateStruct = this.getCurrentDate();
  public openAccount: OpenAccount = {
    firstName: "",
    lastName: "",
    dob: this.todayDate,
    gender: "male",
    address: "",
    city: "",
    emailAddress: "",
    password: "",
  };

  public errorMessages: any = errorMessages;

  getCurrentDate(): NgbDateStruct {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1, // NgbDatepicker months are 1-based
      day: today.getDate(),
    };
  }

  constructor(
    private toastr: ToastrService,
    private accountService: AccountService,
    // private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.authenticationService.isAuthenticate().subscribe((status) => {
    //   this.isAuth = status;
    // });

    // if (this.isAuth) {
    //   this.router.navigate([""]);
    // }

    this.openAccountForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      emailAddress: new FormControl("", [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      gender: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      privacyPolicy: new FormControl("", [Validators.required]),
    });
  }

  getFormControlError(fieldName: string): string {
    const field = this.openAccountForm.get(fieldName);

    if (field && field.touched && field.invalid) {
      const fieldErrors = this.errorMessages[fieldName];
      for (let error of fieldErrors) {
        if (field.errors?.[error.type]) {
          return error.message;
        }
      }
    }

    return "";
  }

  onSubmit() {
    if (this.openAccountForm.invalid) {
      this.openAccountForm.markAllAsTouched();
      this.toastr.error("Please fill in all the required fields.");
      return;
    }
    const dateOfBirth = new Date(
      this.todayDate.year,
      this.todayDate.month - 1,
      this.todayDate.day
    );
    const res = this.accountService
      .openAccount(
        this.openAccount.firstName,
        this.openAccount.lastName,
        dateOfBirth,
        this.openAccount.gender,
        this.openAccount.address,
        this.openAccount.city,
        this.openAccount.emailAddress,
        this.openAccount.password
      )
      .subscribe({
        next: (data: any) => {
          this.router.navigate(["login"]);
          this.toastr.success("Account Opened Successfully");
        },
        error: (e: HttpErrorResponse) => {
          this.toastr.error(
            "Oops! Something went wrong while creating account."
          );
        },
        complete: () => {},
      });
  }
}