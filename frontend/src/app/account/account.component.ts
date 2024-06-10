import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "src/app/services/account.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

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
  public openAccountForm: any;
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
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.isAuthenticate().subscribe((status) => {
      this.isAuth = status;
    });

    if (this.isAuth) {
      this.router.navigate([""]);
    }
  }

  getFormControlError(fieldName: string): string {
    return "";
  }

  onSubmit() {
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
