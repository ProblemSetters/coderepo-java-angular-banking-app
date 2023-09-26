import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from '../services/authentication.service';
import { Account, Transaction } from 'src/app/dto/types';
import * as dayjs from 'dayjs';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public account?: Account;
  public accountId!: number;
  public formatedDob?: string;
  public formatedAccountId?: string;
  public transctionsList!: Array<Transaction>;
  public fromDate!: string;
  public toDate!: string;

  constructor(
		private router: Router,
		private toastr: ToastrService,
		private accountService: AccountService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    
	) {}

  ngOnInit(): void {
      this.getUserAccount();
    }

  getUserAccount() {
		this.accountService.getUserAsAccount().subscribe(
      {
        next: (data: any) => {
          this.account = data
          this.accountId = data.accountId
          this.formatedDob = dayjs(this.account?.dob).format('DD-MM-YYYY');
          this.authenticationService.setAccount(data);
          this.formatedAccountId = "xxxxxx" + this.account?.accountId.toString().slice(-4)
          this.fromDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD'); // Set default value to 7 days ago
          this.toDate = dayjs().format('YYYY-MM-DD'); //
          this.getTransactions();
        },
        error: (e: HttpErrorResponse) => {
          this.toastr.error('Oops! Something went wrong while geting user account info.');
        },
        complete: () => {}
      }
		)
	}

  getTransactions() {
    this.transactionService.transactionHistory(this.accountId, this.fromDate, this.toDate).subscribe(
      {
        next: (data: any) => {
				  this.transctionsList = data;
        },
        error: (e: HttpErrorResponse) => {
          this.toastr.error('Oops! Something went wrong while fetching all transactions.');
        },
        complete: () => {}
      }
		);
  }
}
