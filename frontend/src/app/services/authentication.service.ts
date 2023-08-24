import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthenticationService {
	public loggedIn = new BehaviorSubject<boolean>(false);
	public userDetail = new BehaviorSubject<any>(null);

	private AUTH_KEY = "auth-token";
	private USER_KEY = "user";

	constructor() {
		this.loggedIn.next(this.getToken() ? true : false);
		this.userDetail.next(this.getUser());
	}

	public getToken() {
		return localStorage.getItem(this.AUTH_KEY);
	}

	public setToken(token: string) {
		localStorage.setItem(this.AUTH_KEY, token);
		this.loggedIn.next(true);
	}

	public setUser(user: any) {
		localStorage.setItem(this.USER_KEY, JSON.stringify(user));
		this.userDetail.next(user);
	}

	public getUser() {
		let user = localStorage.getItem(this.USER_KEY);
		return user ? JSON.parse(user) : null;
	}

	public user() {
		return this.userDetail.asObservable();
	}

	public isAuthenticate() {
		return this.loggedIn.asObservable();
	}

	public logout() {
		localStorage.removeItem(this.AUTH_KEY);
		localStorage.removeItem(this.USER_KEY);
		this.loggedIn.next(false);
	}
}
