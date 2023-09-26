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
  public transactionsList!: Array<Transaction>
  public accountId!: number
  public fromDate!: string
  public toDate!: string
  public selectedTransactionsDay: string = '7';
  public fromDateSearch!: {year: number, month: number, day: number}
  public toDateSearch!: {year: number, month: number, day: number}
  
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
      
      this.fromDateSearch = {year: dayjs().subtract(7, 'day').get('year'), month: dayjs().subtract(7, 'day').get('month') + 1, day: dayjs().subtract(7, 'day').get('date')};
      this.toDateSearch = {year: dayjs().get('year'), month: dayjs().get('month') + 1, day: dayjs().get('date')};
		});
  }

  ngOnInit() {
		this.getTransactions()
	}

  getTransactions() {
    this.transactionService.transactionHistory(this.accountId, this.fromDate, this.toDate).subscribe(
      {
        next: (data: any) => {
				  this.transactionsList = data;
        },
        error: (e: HttpErrorResponse) => {
          this.toastr.error('Oops! Something went wrong while fetching all transactions.');
        },
        complete: () => {
          
        }
      }
		);
  }

  onDateSelectChange(event: Event) {
    this.selectedTransactionsDay = (event.target as HTMLSelectElement).value;
    this.fromDate = dayjs().subtract(Number(this.selectedTransactionsDay), 'day').format('YYYY-MM-DD');
    this.toDate = dayjs().format('YYYY-MM-DD');
    this.fromDateSearch = {year: dayjs().subtract(Number(this.selectedTransactionsDay), 'day').get('year'), month: dayjs().subtract(Number(this.selectedTransactionsDay), 'day').get('month') + 1, day: dayjs().subtract(Number(this.selectedTransactionsDay), 'day').get('date')};
    this.toDateSearch = {year: dayjs().get('year'), month: dayjs().get('month') + 1, day: dayjs().get('date')};
    this.getTransactions()
  }

  searchDateFilter() {
    this.fromDate = dayjs().set('year', this.fromDateSearch.year).set('month', this.fromDateSearch.month - 1).set('date', this.fromDateSearch.day).format('YYYY-MM-DD');
    this.toDate = dayjs().set('year', this.toDateSearch.year).set('month', this.toDateSearch.month - 1).set('date', this.toDateSearch.day).format('YYYY-MM-DD');
    this.getTransactions()
  }

  saveDataInCSV(data: Array<any>): string {
    if (data.length == 0) {
      return '';
    }

    let propertyNames = Object.keys(data[0]);
    let rowWithPropertyNames = propertyNames.join(',') + '\n';

    let csvContent = rowWithPropertyNames;

    let rows: string[] = [];

    data.forEach((item) => {
      let values: string[] = [];

      propertyNames.forEach((key) => {
        let val: any = item[key];

        if (val !== undefined && val !== null) {
          val = new String(val);
        } else {
          val = '';
        }
        values.push(val);
      });
      rows.push(values.join(','));
    });
    csvContent += rows.join('\n');

    return csvContent;
  }
  
  exportToCsv() {
    let csvContent = this.saveDataInCSV(this.transactionsList);
    let name = 'transactions';
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }
}
