import { Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { TransactionService } from 'src/app/services/transaction.service'
import { Router } from "@angular/router";


@Component({
  selector: 'app-send-money',
  templateUrl: './send-money.component.html',
  styleUrls: ['./send-money.component.scss']
})
export class SendMoneyComponent {
  public sendMoneyForm!: FormGroup;

  constructor(
		private router: Router,
		private toastr: ToastrService,
		private transactionService: TransactionService,
	) {}

  ngOnInit() {
		this.sendMoneyForm = new FormGroup({
			fromAccountId: new FormControl(null, Validators.required),
			toAccountId: new FormControl(null, Validators.required),
			transferAmount: new FormControl(null, Validators.required),
		});
	}

  getFormControlError(fieldName: string): string {
		const field = this.sendMoneyForm.get(fieldName);
		if (field && field.touched && field.invalid) {
			if (field.errors?.["required"]) {
				return `${fieldName} is required.`;
			}
		}
		return "";
	}

  onSubmit() {
		if (this.sendMoneyForm.invalid) {
			this.toastr.error("Please fill in all the required fields.");
			return;
		}

		const sendMoney = {
			fromAccountId: this.sendMoneyForm.get("fromAccountId")!.value,
			toAccountId: this.sendMoneyForm.get("toAccountId")!.value,
			transferAmount: this.sendMoneyForm.get("transferAmount")!.value,
		};
		
		console.log(sendMoney)
		const res = this.transactionService
			.sendMoney(
				this.sendMoneyForm.get("fromAccountId")!.value,
				this.sendMoneyForm.get("toAccountId")!.value,
				this.sendMoneyForm.get("transferAmount")!.value,
			)
			.subscribe(
				(data: any) => {
					console.log(data)
				},
				(error: any) => {
					this.toastr.error(error);
				},
			);

		this.sendMoneyForm.reset();
	}

}
