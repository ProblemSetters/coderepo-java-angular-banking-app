import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { TransactionService } from 'src/app/services/transaction.service'
import { Router } from "@angular/router";
import { Transaction, User } from "src/app/dto/types"
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  public isAuth: boolean = false;
	public user?: User;
  public Transctions!: Array<Transaction>
  public accountId!: string
  public fromDate!: Date
  public toDate!: Date

 
  constructor(
    private authenticationService: AuthenticationService,
		private router: Router,
		private toastr: ToastrService,
		private transactionService: TransactionService,
    
	) {
    this.authenticationService
			.isAuthenticate()
			.subscribe((status: boolean) => {
				this.isAuth = status;
			});

		this.authenticationService.user().subscribe((user: User) => {
			this.user = user;
		});
  }

  ngOnInit() {
		this.transactionService.transactionHistory(this.accountId, this.fromDate, this.toDate).subscribe(
			(data: any) => {
        console.log(data)
				this.Transctions = data;
			},
			(error: HttpErrorResponse) => {
				this.toastr.error(error.message, "Error");
			},
		);
	}

  transctions = [
    {
      transctionId: 1000001,
      transctionDateTime: `01/04/2023 09:10:30`,
      userId: 11,
      accountId: 1,
      amount: `3100.00`,
      accountBal: `42000.00`
    },
    {
      transctionId: 1000002,
      transctionDateTime: `01/04/2023 05:17:20`,
      userId: 1,
      accountId: 21,
      amount: `1000.00`,
      accountBal: `82700.00`
    }
  ];
}
