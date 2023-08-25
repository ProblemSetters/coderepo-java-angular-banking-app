import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "src/app/environments/environment";
import { HttpHeaders } from "@angular/common/http";

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
}
