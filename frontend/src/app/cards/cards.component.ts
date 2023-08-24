import { Component } from '@angular/core';
import * as _ from "lodash";
import { Card, User } from 'src/app/dto/types';
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
	public user?: User;
  public accountId!: string
  public cardList!: Array<Card>;
  public cardUpdatePinForms: { [key: string]: FormGroup } = {};
  
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

		this.authenticationService.user().subscribe((user: User) => {
			this.user = user;
      // this.accountId = user.account.id
		});
  }

  ngOnInit() {
    this.cardList = [
      {
        id: '1',
        accountId: 23213454654,
        cardNumber: 402912391239,
        expireMonth: '01',
        expireYear: '2023',
        cardHolderName: 'test1',
        cvv: 123,
        isBlocked: true
      },
      {
        id: '2',
        accountId: 23213454655,
        cardNumber: 123456789101,
        expireMonth: '06',
        expireYear: '2032',
        cardHolderName: 'test2',
        cvv: 234,
        isBlocked: false
      },
      {
        id: '3',
        accountId: 23213454656,
        cardNumber: 123456767896,
        expireMonth: '08',
        expireYear: '2035',
        cardHolderName: 'test3',
        cvv: 345,
        isBlocked: false
      }
    ];

    this.cardList.forEach(card => {
      this.cardUpdatePinForms[card.id] = new FormGroup({
        cardPin: new FormControl(null, [Validators.required, this.pinValidator.bind(this)])
      });
    });

    this.cardService.getCards(this.accountId).subscribe(
			(data: any) => {
        console.log(data)
        this.cardList = data
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

  
  getFormControlError(fieldName: string, cardId:string): string {
		const field = this.cardUpdatePinForms[cardId].get(fieldName);
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
		if (this.cardUpdatePinForms[card.id].invalid) {
			this.toastr.error("Please fill in all the required fields.");
			return;
		}
		
    console.log(card)
    console.log(this.cardUpdatePinForms[card.id].get("cardPin")!.value)
		const res = this.cardService
			.updateCardPin(
				card.id,
				this.cardUpdatePinForms[card.id].get("cardPin")!.value
			)
			.subscribe(
				(data: any) => {
					console.log(data)
				},
				(error: any) => {
					this.toastr.error(error);
				},
			);

		this.cardUpdatePinForms[card.id].reset();
	}

  cardBlockUnblock (card: Card) {
    console.log('card')
    console.log(card)
    const res = this.cardService
			.cardBlockUnblock(
				card.id,
				card.isBlocked
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
