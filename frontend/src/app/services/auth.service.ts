import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "./http.service";
import { environment } from "../environments/environment";
import { map, catchError } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	public apiUrl: string;

	constructor(private httpService: HttpService) {
		this.apiUrl = environment.API_URL;
	}

	public login(emailAddress: string, password: string) {
		return this.httpService.post(`${this.apiUrl}/api/core-banking/auth/signin`, {
			emailAddress,
			password,
		});
	}

	public logout() {
		return this.httpService.post(`${this.apiUrl}/api/core-banking/auth/signout`, null);
	}

	// public profile(
	// 	username: string,
	// 	email: string,
	// 	password: string,
	// 	phone: string,
	// 	address: string,
	// ) {
	// 	return this.httpService.put(`${this.apiUrl}/api/auth/profile`, {
	// 		username,
	// 		email,
	// 		password,
	// 		phone,
	// 		address,
	// 	});
	// }
}
