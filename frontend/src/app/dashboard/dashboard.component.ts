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
          console.log('get account')
          console.log(data)
          this.account = data
          this.formatedDob = dayjs(this.account?.dob).format('YYYY-MM-DD HH:mm:ss');
          this.authenticationService.setAccount(data);
        },
        error: (e: HttpErrorResponse) => {
          this.toastr.error(e.message);
        },
        complete: () => {}
      }
		)
	}
}
