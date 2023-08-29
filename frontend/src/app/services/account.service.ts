import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "src/app/environments/environment";

@Injectable({
	providedIn: "root",
})
export class AccountService {
	public apiUrl: string;

	constructor(private httpService: HttpService) {
		this.apiUrl = environment.API_URL;
	}
	
	public openAccount(
						balance: number,
						firstName: string,
						lastName: string,
						dob: Date,
						gender: string,
						address: string,
						city: string,
						emailAddress: string,
						password: string,
					) {
		return this.httpService.post(`${this.apiUrl}/api/core-banking/account`, {
			balance,
			firstName,
			lastName,
			dob,
			gender,
			address,
			city,
			emailAddress,
			password,
		});
	}

	public getUserAsAccount() {
		return this.httpService.get(`${this.apiUrl}/api/core-banking/account`, { withCredentials: true });
	}
}
