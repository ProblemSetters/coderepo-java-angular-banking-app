import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "src/app/environments/environment";

@Injectable({
	providedIn: "root",
})
export class BeneficiaryService {
	public apiUrl: string;

	constructor(private httpService: HttpService) {
		this.apiUrl = environment.API_URL;
	}

	public storeBeneficiary(
				payerAccountId: number,
				beneficiaryAccountId: number,
			) {
		return this.httpService.post(`${this.apiUrl}/api/core-banking/beneficiary`, {
			payerAccountId,
			beneficiaryAccountId,
		}, {withCredentials: true});
	}

	public getAllBeneficiaries() { 
		return this.httpService.get(`${this.apiUrl}/api/core-banking/beneficiary`, {withCredentials: true});
	}
}
