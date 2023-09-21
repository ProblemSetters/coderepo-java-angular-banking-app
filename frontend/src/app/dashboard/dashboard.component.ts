import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from '../services/authentication.service';
import { Account } from 'src/app/dto/types';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public account?: Account;
  public formatedDob?: string;
  public formatedAccountId?: string;

  constructor(
		private router: Router,
		private toastr: ToastrService,
		private accountService: AccountService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
	) {}

  ngOnInit(): void {
      this.getUserAccount();
    }

  getUserAccount() {
		this.accountService.getUserAsAccount().subscribe(
      {
        next: (data: any) => {
          this.account = data
          this.formatedDob = dayjs(this.account?.dob).format('DD-MM-YYYY');
          this.authenticationService.setAccount(data);
          this.formatedAccountId = "xxxxxxxx" + this.account?.accountId.toString().slice(-2)
        },
        error: (e: HttpErrorResponse) => {
          this.toastr.error('Oops! Something went wrong while geting user account info.');
        },
        complete: () => {}
      }
		)
	}
}
