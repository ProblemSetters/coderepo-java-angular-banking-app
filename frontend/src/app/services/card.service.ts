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
                cardId: string,
				cardPin: number,
			) {
		return this.httpService.put(`${this.apiUrl}/api/core-banking/card/${cardId}`, { cardPin });
	}

    public cardBlockUnblock(
            cardId: string,
            isBlocked: boolean
        ) {
        return this.httpService.post(`${this.apiUrl}/api/core-banking/card/block`, { cardId, isBlocked });
        }

	public getCards(accountId: string) {
		return this.httpService.get(`${this.apiUrl}/api/core-banking/card/list/${accountId}`);
	}
}
