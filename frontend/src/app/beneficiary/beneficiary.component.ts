import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { IDatePickerDirectiveConfig } from "ng2-date-picker";
// import { BeneficiaryService } from 'src/app/services/beneficiary.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss']
})
export class BeneficiaryComponent {
  public beneficiaryForm!: FormGroup;
  public datePickerConfig = <IDatePickerDirectiveConfig>{
    format: "YYYY-MM-DD",
  };
  public isAuth: boolean = false;

  constructor(
		private toastr: ToastrService,
		// private beneficiaryService: BeneficiaryService,
		// private authenticationService: AuthenticationService,
		// private router: Router,
	) {
  }

  ngOnInit() {
	this.beneficiaryForm = new FormGroup({
	  
		});
  }

  getFormControlError(fieldName: string): string {
		const field = this.beneficiaryForm.get(fieldName);
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
					return "Invalid beneficiary number format. Please enter a valid 12-digit numeric beneficiary number.";
				}
        if (fieldName === "balance") {
					return "Please enter a valid balance.";
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

		
		this.beneficiaryForm.reset();
	}
}
