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
				fromAccountId: string,
				toAccountId: string,
				transferAmount: number,
			) {
		return this.httpService.post(`${this.apiUrl}/api/core-banking/transaction`, {
			fromAccountId,
			toAccountId,
			transferAmount
		});
	}

	public transactionHistory(accountId: string, fromDate: Date, toDate: Date) {
		return this.httpService.get(`${this.apiUrl}/api/core-banking/transaction/transactionHistory?accountId=${accountId}&fromDate=${fromDate}&toDate=${toDate}`);
	}
}
