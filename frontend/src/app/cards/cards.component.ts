import { Component } from '@angular/core';
import * as _ from "lodash";
import { Card, Account } from 'src/app/dto/types';
import {
  AbstractControl,
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CardService } from 'src/app/services/card.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  public isAuth: boolean = false;
	public account?: Account;
	public accountId!: number
	public cardList!: Array<Card>;
	public cardUpdatePinForms: { [key: number]: FormGroup } = {};
  
  constructor(
    private authenticationService: AuthenticationService,
		private toastr: ToastrService,
    	private cardService: CardService
	) {
    this.authenticationService
			.isAuthenticate()
			.subscribe((status: boolean) => {
				this.isAuth = status;
			});

		this.authenticationService.account().subscribe((account: Account) => {
			this.account = account;
      this.accountId = account.accountId
		});
  }

  ngOnInit() {
    this.getAllCard()
	}

  createAllCardForms() {
    if(this.cardList?.length > 0) {
      this.cardList?.forEach(card => {
        this.cardUpdatePinForms[card.cardNumber] = new FormGroup({
          cardPin: new FormControl(null, [Validators.required, this.pinValidator.bind(this)])
        });
      });
    }
  }

	getAllCard() {
		this.cardService.getCards(this.accountId).subscribe(
			(data: any) => {
				console.log(data)
				this.cardList = data
        this.createAllCardForms()
			},
			(error: HttpErrorResponse) => {
				this.toastr.error(error.message, "Error");
			},
		);
	}

  pinValidator(control: AbstractControl): { [key: string]: boolean } | null {
		const pin = control.value;
		if (!/^[1-9][0-9]{3}$/.test(pin)) {
			return { pinInvalid: true };
		}
		return null;
	}

  
  getFormControlError(fieldName: string, cardNumber:number): string {
		const field = this.cardUpdatePinForms[cardNumber].get(fieldName);
		if (field && field.touched && field.invalid) {
			if (field.errors?.["required"]) {
				return `${fieldName} is required.`;
			}
      if (field.errors?.["pinInvalid"]) {
				return "Invalid PIN format. Please enter a 4-digit number.";
			}
		}
		return "";
	}

  onSubmit(card: Card) {
		if (this.cardUpdatePinForms[card.cardNumber].invalid) {
			this.toastr.error("Please fill in all the required fields.");
			return;
		}
		
    console.log(card)
    console.log(this.cardUpdatePinForms[card.cardNumber].get("cardPin")!.value)
		const res = this.cardService
			.updateCardPin(
				card.cardNumber,
				this.cardUpdatePinForms[card.cardNumber].get("cardPin")!.value
			)
			.subscribe(
				(data: any) => {
					console.log(data)
				},
				(error: any) => {
					this.toastr.error(error);
				},
			);

		this.cardUpdatePinForms[card.cardNumber].reset();
	}

  cardBlockUnblock (card: Card) {
    console.log('card')
    console.log(card)
    const res = this.cardService
			.cardBlockUnblock(
				card.cardNumber,
				card.blocked
			)
			.subscribe(
				(data: any) => {
					console.log(data)
				},
				(error: any) => {
					this.toastr.error(error);
				},
			);
  }
}
