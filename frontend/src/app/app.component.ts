import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'banking-system-app';
  
  constructor(
		private toastr: ToastrService,
		private accountService: AccountService,
    private authenticationService: AuthenticationService,
	) {}

  ngOnInit(): void {
    this.getUserAccount();
  }

  getUserAccount() {
		this.accountService.getUserAsAccount().subscribe(
      {
        next: (data: any) => {
          this.authenticationService.setAccount(data);
        },
        error: (e: HttpErrorResponse) => {
          this.toastr.error('Oops! Something went wrong while geting user account info.');
        },
        complete: () => {}
      }
		)
  }
}
