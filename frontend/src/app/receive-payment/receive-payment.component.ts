import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-receive-payment',
  templateUrl: './receive-payment.component.html',
  styleUrls: ['./receive-payment.component.scss']
})
export class ReceivePaymentComponent {
  public receiveMoneyForm!: FormGroup;

  constructor(
		private toastr: ToastrService,
	) {}

  ngOnInit() {
		this.receiveMoneyForm = new FormGroup({
			account_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{12}$/),
      ]),
			amount: new FormControl(null, Validators.required),
		});
	}

  getFormControlError(fieldName: string): string {
		const field = this.receiveMoneyForm.get(fieldName);
		if (field && field.touched && field.invalid) {
			if (field.errors?.["required"]) {
				return `${fieldName} is required.`;
			}
      if (field.errors?.["pattern"]) {
				if (fieldName === "account_number") {
					return "Invalid account number format. Please enter a valid 12-digit numeric account number.";
				}
			}
		}
		return "";
	}

  onSubmit() {
		if (this.receiveMoneyForm.invalid) {
			this.toastr.error("Please fill in all the required fields.");
			return;
		}

		const receiveMoney = {
			account_number: this.receiveMoneyForm.get("account_number")!.value,
			amount: this.receiveMoneyForm.get("amount")!.value,
		};
		
    console.log(receiveMoney)
    // write service code for send money

		this.receiveMoneyForm.reset();
	}

}
