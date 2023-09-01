import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BeneficiaryService } from 'src/app/services/beneficiary.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Account } from '../dto/types';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss']
})
export class BeneficiaryComponent {
	public isAuth: boolean = false;
	public account?: Account;
	public accountId!: number
  	public beneficiaryForm!: FormGroup;

  constructor(
		private toastr: ToastrService,
		private beneficiaryService: BeneficiaryService,
		private authenticationService: AuthenticationService,
	) {
		this.authenticationService
			.isAuthenticate()
			.subscribe((status: boolean) => {
				this.isAuth = status;
			});

		this.authenticationService.account().subscribe((account: Account) => {
			this.account = account;
      		this.accountId = account.accountId;
		});
  }

  ngOnInit() {
	this.beneficiaryForm = new FormGroup({
		beneficiaryAccountId: new FormControl(null, Validators.required),
	});
  }

  getFormControlError(fieldName: string): string {
		const field = this.beneficiaryForm.get(fieldName);
		if (field && field.touched && field.invalid) {
			if (field.errors?.["required"]) {
				if(fieldName === 'beneficiaryAccountId'){
					return `please add beneficiary account number. It is required.`;
				}
			}
		}
		return "";
	}

  onSubmit() {
		if (this.beneficiaryForm.invalid) {
			this.toastr.error("Please fill in all the required fields.");
			return;
		}

		const res = this.beneficiaryService
			.storeBeneficiary(
				this.accountId,
				this.beneficiaryForm.get("beneficiaryAccountId")!.value,
			)
			.subscribe(
				{
					next: (data: any) => {
						console.log(data)
					},
					error: (e: HttpErrorResponse) => {
						this.toastr.error(e.message);
					},
					complete: () => {
						this.toastr.success("successfully add beneficiary");
					}
				}
			);
		
		this.beneficiaryForm.reset();
	}
}
