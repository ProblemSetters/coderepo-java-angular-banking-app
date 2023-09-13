import { Component } from '@angular/core';
import { MenuList, Account } from 'src/app/dto/types';
import { menuList } from 'src/app/menu'
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthenticationService } from "src/app/services/authentication.service";
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


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

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private authenticationService: AuthenticationService,
  ) {
		this.menuList = menuList;
    	this.authenticationService
			.isAuthenticate()
			.subscribe((status: boolean) => {
				this.isAuth = status;
			});

		this.authenticationService.account().subscribe((account: Account) => {
			this.account = account;
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
						this.toastr.error(e.message);
					},
					complete: () => {
						this.toastr.success('Logout Successfully');
						this.router.navigate(["login"]);
					}
				}
			);
		
	}

}
