import { Component } from '@angular/core';
import { MenuList, Account } from 'src/app/dto/types';
import { menuList } from 'src/app/menu'
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationService } from "src/app/services/authentication.service";
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { updateBalance } from 'src/app/state/balance.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public showMenu:Boolean = false;
  public menuList: MenuList[];
  public currentUrl?: string;
  public isAuth: boolean = false;
  public account?: Account;
  public balance: Number = 0;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private authenticationService: AuthenticationService,
	private store: Store<any>
  ) {
		this.menuList = menuList;
    	this.authenticationService
			.isAuthenticate()
			.subscribe((status: boolean) => {
				this.isAuth = status;
			});

		this.authenticationService.account().subscribe((account: Account) => {
			this.account = account;
			this.store.dispatch(updateBalance({ balance: Number(account.balance) }));
			this.getBalance()
		});
	}

  ngOnInit() {
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.currentUrl = event.url;
			}
		});
		this.currentUrl = this.router.url;
	}

  getBalance() {
	this.store.select(state => state.balance).subscribe(balance => {
		this.balance = balance.balance
	});
  }

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }

  logout() {
    const res = this.authService
			.logout()
			.subscribe(
				{
					next: (data: any) => {
						console.log(data)
						this.authenticationService.logout();
					},
					error: (e: HttpErrorResponse) => {
						this.toastr.error('Oops! Something went wrong while logout user');
					},
					complete: () => {
						this.toastr.success('Logout Successful');
						this.router.navigate(["login"]);
					}
				}
			);
		
	}

}
