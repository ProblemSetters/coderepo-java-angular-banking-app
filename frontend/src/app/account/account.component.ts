import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { IDatePickerDirectiveConfig } from "ng2-date-picker";
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  public openAccountForm!: FormGroup;
  public datePickerConfig = <IDatePickerDirectiveConfig>{
    format: "YYYY-MM-DD",
  };
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
	  balance: new FormControl(null, [
				Validators.required,
				Validators.pattern(/^\d+(\.\d{1,2})?$/),
			]),
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
				return `${fieldName} is required.`;
			}
      if (field.errors?.["minlength"]) {
				return `This field must be at least ${field.errors["minlength"].requiredLength} characters long.`;
			}
			if (field.errors?.["maxlength"]) {
				return `This field cannot exceed ${field.errors["maxlength"].requiredLength} characters.`;
			}
      if (field.errors?.["pattern"]) {
				if (fieldName === "accountId") {
					return "Invalid account number format. Please enter a valid 12-digit numeric account number.";
				}
        if (fieldName === "balance") {
					return "Please enter a valid balance.";
				}
			}
		}
		return "";
	}

  onSubmit() {
		if (this.openAccountForm.invalid) {
			this.toastr.error("Please fill in all the required fields.");
			return;
		}

		const openAccount = {
			balance: this.openAccountForm.get("balance")!.value,
			firstName: this.openAccountForm.get("firstName")!.value,
			lastName: this.openAccountForm.get("lastName")!.value,
			dob: this.openAccountForm.get("dob")!.value,
			gender: this.openAccountForm.get("gender")!.value,
			address: this.openAccountForm.get("address")!.value,
			city: this.openAccountForm.get("city")!.value,
			emailAddress: this.openAccountForm.get("emailAddress")!.value,
			password: this.openAccountForm.get("password")!.value,
		};

		const res = this.accountService
			.openAccount(
				this.openAccountForm.get("balance")!.value,
				this.openAccountForm.get("firstName")!.value,
				this.openAccountForm.get("lastName")!.value,
				this.openAccountForm.get("dob")!.value,
				this.openAccountForm.get("gender")!.value,
				this.openAccountForm.get("address")!.value,
				this.openAccountForm.get("city")!.value,
				this.openAccountForm.get("emailAddress")!.value,
				this.openAccountForm.get("password")!.value,
			)
			.subscribe(
				(data: any) => {
					console.log(data)
					// this.router.navigate(["login"]);
					this.authenticationService.setAccount(data);
					this.toastr.success("successfully open account");
				},
				(error: any) => {
					console.log(error)
					this.toastr.error(error.error.text);
				},
			);

		
    	console.log(openAccount)
    

		this.openAccountForm.reset();
	}
}
