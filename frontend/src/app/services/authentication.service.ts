import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Account } from "src/app/dto/types";

@Injectable({
	providedIn: "root",
})
export class AuthenticationService {
	public loggedIn = new BehaviorSubject<boolean>(false);
	public accountDetail = new BehaviorSubject<any>(null);

	private AUTH_KEY = "auth-token";
	private ACCOUNT_KEY = "account";

	constructor() {
		this.loggedIn.next(this.getToken() ? true : false);
		this.accountDetail.next(this.getAccount());
	}

	public getToken() {
		return localStorage.getItem(this.AUTH_KEY);
	}

	public setToken(token: string) {
		localStorage.setItem(this.AUTH_KEY, token);
		this.loggedIn.next(true);
	}

	public setAccount(account: Account) {
		localStorage.setItem(this.ACCOUNT_KEY, JSON.stringify(account));
		this.accountDetail.next(account);
	}

	public getAccount() {
		let account = localStorage.getItem(this.ACCOUNT_KEY);
		return account ? JSON.parse(account) : null;
	}

	public account() {
		return this.accountDetail.asObservable();
	}

	public isAuthenticate() {
		return this.loggedIn.asObservable();
	}

	public logout() {
		localStorage.removeItem(this.AUTH_KEY);
		localStorage.removeItem(this.ACCOUNT_KEY);
		this.loggedIn.next(false);
	}
}
