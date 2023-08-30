import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "src/app/environments/environment";

@Injectable({
	providedIn: "root",
})
export class TransactionService {
	public apiUrl: string;

	constructor(private httpService: HttpService) {
		this.apiUrl = environment.API_URL;
	}

	public sendMoney(
				fromAccountId: number,
				toAccountId: number,
				transferAmount: number,
			) {
		return this.httpService.post(`${this.apiUrl}/api/core-banking/transaction`, {
			fromAccountId,
			toAccountId,
			transferAmount
		}, {withCredentials: true});
	}

	public transactionHistory(accountId: number, fromDate: string, toDate: string) { 
		return this.httpService.get(`${this.apiUrl}/api/core-banking/transaction/transactionHistory?accountId=${accountId}&fromDate=${fromDate}&toDate=${toDate}`, {withCredentials: true});
	}
}
