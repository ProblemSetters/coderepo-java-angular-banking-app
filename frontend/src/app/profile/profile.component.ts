import { Component } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { Account } from 'src/app/dto/types';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public isAuth: boolean = false;
  public account?: Account;
  public formatedDob?: string;
  public formatedAccountId?: string;

  constructor(
    private authenticationService: AuthenticationService,
	) {}

  ngOnInit(): void {
    this.authenticationService
      .isAuthenticate()
      .subscribe((status: boolean) => {
        this.isAuth = status;
      });

    this.authenticationService.account().subscribe((account: Account) => {
      this.account = account;
      this.formatedDob = dayjs(this.account?.dob).format('DD-MM-YYYY');
      this.formatedAccountId = "xxxxxx" + this.account?.accountId.toString().slice(-4)
    });
  }
}
