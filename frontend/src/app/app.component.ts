import { Component } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from 'src/app/services/account.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AppTheme, DarkThemeSelectorService } from './services/themeToggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'banking-system-app';
  public isAuth: boolean = false;
  public isDarkMode: boolean = false;

  constructor(
		private toastr: ToastrService,
		private accountService: AccountService,
    private authenticationService: AuthenticationService,
		private darkThemeSelectorService: DarkThemeSelectorService, // Injected here
    private router: Router,
	) {}

  ngOnInit(): void {
    this.darkThemeSelectorService.currentTheme.subscribe(theme => {
      this.isDarkMode = theme === AppTheme.DARK;
    });

    this.authenticationService.isAuthenticate().subscribe((status) => {
			this.isAuth = status;
			if (this.isAuth) {
        this.getUserAccount();
			}else {
        this.router.navigate(["login"]);
      }
		});
    
  }

  handleToggleTheme(){
    if(this.isDarkMode){
      this.darkThemeSelectorService.setLightTheme();
      this.isDarkMode = false;
      return
    }
    this.darkThemeSelectorService.setDarkTheme();
    this.isDarkMode = true;
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
