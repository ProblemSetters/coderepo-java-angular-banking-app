import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  public openAccountForm!: FormGroup;
  public isAuth: boolean = false;

  constructor(
		private toastr: ToastrService,
		private accountService: AccountService,
		private authenticationService: AuthenticationService,
		private router: Router,
	) {
  }

  ngOnInit() {
	this.authenticationService.isAuthenticate().subscribe((status) => {
		this.isAuth = status;
	});

	if (this.isAuth) {
		this.router.navigate([""]);
	}
	this.openAccountForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl('male', Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      emailAddress: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
				Validators.required,
				Validators.minLength(6),
			]),
      privacyPolicy: new FormControl(false, Validators.requiredTrue),
		});
	}

  getFormControlError(fieldName: string): string {
		const field = this.openAccountForm.get(fieldName);
		if (field && field.touched && field.invalid) {
			if (field.errors?.["required"]) {
				if(fieldName === 'firstName'){
					return 'Please enter a first name. It is required.';
				}
				if(fieldName === 'lastName'){
					return 'Please enter a last name. It is required.';
				}
				if(fieldName === 'dob'){
					return 'Please enter a date of birth. It is required.';
				}
				if(fieldName === 'gender'){
					return 'Please enter a gender. It is required.';
				}
				if(fieldName === 'address'){
					return 'Please enter a address. It is required.';
				}
				if(fieldName === 'city'){
					return 'Please enter a city. It is required.';
				}
				if(fieldName === 'emailAddress'){
					return 'Please enter a email address. It is required.';
				}
				if(fieldName === 'password'){
					return 'Please enter a password. It is required.';
				}
				if(fieldName === 'privacyPolicy'){
					return 'Please enter a privacy policy. It is required.';
				}
			}
			if (field.errors?.["minlength"]) {
				if(fieldName === 'password') {
					return `Password must be at least ${field.errors["minlength"].requiredLength} characters long.`;
				}
			}

			if (field.errors?.["pattern"]) {
				if (fieldName === "accountId") {
					return "Invalid account number format. Please enter a valid 12-digit numeric account number.";
				}
			}
		}
		return "";
	}

  onSubmit() {
		if (this.openAccountForm.invalid) {
			this.toastr.error("Oops! Something went wrong while creating account.");
			return;
		}
		const dateOfBirth = new Date(this.openAccountForm.get("dob")!.value.year, this.openAccountForm.get("dob")!.value.month - 1, this.openAccountForm.get("dob")!.value.day);
		const res = this.accountService
			.openAccount(
				this.openAccountForm.get("firstName")!.value,
				this.openAccountForm.get("lastName")!.value,
				dateOfBirth,
				this.openAccountForm.get("gender")!.value,
				this.openAccountForm.get("address")!.value,
				this.openAccountForm.get("city")!.value,
				this.openAccountForm.get("emailAddress")!.value,
				this.openAccountForm.get("password")!.value,
			)
			.subscribe(
				{
					next: (data: any) => {
						this.router.navigate(["login"]);
						this.toastr.success("successfully opened account");
					},
					error: (e: HttpErrorResponse) => {
						this.toastr.error('Oops! Something went wrong while creating account.');
					},
					complete: () => {}
				}
			);
		this.openAccountForm.reset();
	}
}
