import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm!: FormGroup;
	private isAuth: boolean = false;

  constructor(
		private authService: AuthService,
		private toastr: ToastrService,
		private router: Router,
		private authenticationService: AuthenticationService,
		private accountService: AccountService,
	) {}

	ngOnInit() {
		this.authenticationService.isAuthenticate().subscribe((status) => {
			this.isAuth = status;
			if (this.isAuth) {
				this.router.navigate([""]);
			}
		});

		this.loginForm = new FormGroup({
			emailAddress: new FormControl("", [Validators.required, Validators.email]),
			password: new FormControl("", [
				Validators.required,
				Validators.minLength(6),
			]),
		});
	}

	onSubmit() {
		if (this.loginForm.invalid) {
			this.toastr.error("Please fill in all the fields properly.");
			return;
		}
		const res = this.authService
			.login(
				this.loginForm.get("emailAddress")!.value,
				this.loginForm!.get("password")!.value,
			)
			.subscribe(
				{
					next: (data: any) => {
						console.log('login')
						console.log(data)
						this.authenticationService.setToken(data.name,data.value);
					},
					error: (e: HttpErrorResponse) => {
						console.error(e)
					},
					complete: () => {
						console.log(this.authenticationService.getToken())
						this.toastr.success('Successfully login account');
						this.router.navigate([""]);
					}
				}
			);
		this.loginForm.reset();

	}

	getFormControlError(fieldName: string): string {
		const field = this.loginForm.get(fieldName);
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
			if (field.errors?.["email"]) {
				return `Please enter a valid email address.`;
			}
		}
		return "";
	}
}
