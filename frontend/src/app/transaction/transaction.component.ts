import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { TransactionService } from 'src/app/services/transaction.service'
import { Router } from "@angular/router";
import { Transaction, Account } from "src/app/dto/types"
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  public isAuth: boolean = false;
	public account?: Account;
  public transctionsList!: Array<Transaction>
  public accountId!: number
  public fromDate!: string
  public toDate!: string
  public selectedTransactionsDay: string = '7';
 
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

		this.authenticationService.account().subscribe((account: Account) => {
			this.account = account;
      this.accountId = account.accountId;
      this.fromDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD'); // Set default value to 7 days ago
      this.toDate = dayjs().format('YYYY-MM-DD'); // 
      // console.log(this.account)
		});
  }

  ngOnInit() {
    this.transctionsList = [
      {
        id: 1,
        transactionId: 1,
        fromAccountId: 2,
        toAccountId: 3,
        transctionDateTime: dayjs().toDate(),
        transferAmount: 3100.00
      },
      {
        id: 1,
        transactionId: 2,
        fromAccountId: 2,
        toAccountId: 4,
        transctionDateTime: dayjs().toDate(),
        transferAmount: 1000.00
      }
    ];
		this.getTransactions()
	}

  getTransactions() {
    this.transactionService.transactionHistory(this.accountId, this.fromDate, this.toDate).subscribe(
			(data: any) => {
        console.log(data)
				this.transctionsList = data;
			},
			(error: HttpErrorResponse) => {
				this.toastr.error(error.message, "Error");
			},
		);
  }

  onDateSelectChange(event: Event) {
    this.selectedTransactionsDay = (event.target as HTMLSelectElement).value;
    this.fromDate = dayjs().subtract(Number(this.selectedTransactionsDay), 'day').format('YYYY-MM-DD');
    this.toDate = dayjs().format('YYYY-MM-DD');
    this.getTransactions()
    console.log('selected date')
    console.log(this.fromDate)
    console.log(this.toDate)
  }

}
