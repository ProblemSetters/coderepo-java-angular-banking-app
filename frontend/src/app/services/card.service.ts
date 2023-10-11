import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "src/app/environments/environment";

@Injectable({
	providedIn: "root",
})
export class CardService {
	public apiUrl: string;

	constructor(private httpService: HttpService) {
		this.apiUrl = environment.API_URL;
	}

	public updateCardPin(
                cardNumber: number,
				cardPin: number,
			) {
		return this.httpService.put(`${this.apiUrl}/api/core-banking/card/${cardNumber}?newPin=${cardPin}`, {}, {withCredentials: true});
	}

	public getCards(accountId: number) {
		return this.httpService.get(`${this.apiUrl}/api/core-banking/card?accountId=${accountId}`, {withCredentials: true});
	}
}
