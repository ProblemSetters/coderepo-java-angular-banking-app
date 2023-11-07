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
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

interface OpenAccount {
	firstName: string,
	lastName: string,
	dob: object,
	gender: string,
	address: string,
	city: string,
	emailAddress: string,
	password: string

}
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  public openAccountForm!: FormGroup;
  public isAuth: boolean = false;
  public todayDate: NgbDateStruct = this.getCurrentDate()
  public openAccount: OpenAccount = {
	  firstName: '',
	  lastName: '',
	  dob: this.todayDate,
	  gender: 'male',
	  address: '',
	  city: '',
	  emailAddress: '',
	  password: ''
  }
  
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
  }

  onSubmit() {
	const openAccount = {
		firstName: '',
		lastName: '',
		dob: this.todayDate,
		gender: 'male',
		address: '',
		city: '',
		emailAddress: '',
		password: ''

	}
	const dateOfBirth = new Date(openAccount.dob.year, openAccount.dob.month - 1, openAccount.dob.day);
		const res = this.accountService
			.openAccount(
				openAccount.firstName,
				openAccount.lastName,
				dateOfBirth,
				openAccount.gender,
				openAccount.address,
				openAccount.city,
				openAccount.emailAddress,
				openAccount.password,
			)
			.subscribe(
				{
					next: (data: any) => {
						this.router.navigate(["login"]);
						this.toastr.success("Account Opened Successfully");
					},
					error: (e: HttpErrorResponse) => {
						this.toastr.error('Oops! Something went wrong while creating account.');
					},
					complete: () => { }
				}
			);
	}
}