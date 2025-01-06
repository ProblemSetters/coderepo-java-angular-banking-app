import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { updateBalance } from "../state/balance.actions";

@Component({
  selector: "app-donations",
  templateUrl: "./donations.component.html",
  styleUrls: ["./donations.component.scss"],
})
export class DonationsComponent {
  donationAmount: number = 0;
  trusts = [
    {
      name: "Charity Trust",
      description: "Providing education",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    },
    {
      name: "Clean Energy Initiative",
      description: "Promoting clean energy.",
      imageUrl: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071",
    },
    {
      name: "Community Support Fund",
      description: "Supporting local communities.",
      imageUrl:
        "https://images.pexels.com/photos/6646912/pexels-photo-6646912.jpeg",
    },
    {
      name: "Disaster Relief Fund",
      description: "Providing aid during disasters",
      imageUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29",
    },
    {
      name: "Arts and Culture Foundation",
      description: "Promoting arts and cultural heritage.",
      imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    },
    {
      name: "Social Trust",
      description: "Supporting various causes.",
      imageUrl:
        "https://images.pexels.com/photos/6682982/pexels-photo-6682982.jpeg",
    },
  ];

  selectedTrust: any = null;
  isModalOpen: boolean = false;

  constructor(private store: Store<{ balance: any }>) {
    this.store.select("balance").subscribe();
  }

  openModal(trust: any) {
    this.selectedTrust = trust;
    this.isModalOpen = true;
  }

  handleConfirm() {
    this.store.select("balance").subscribe((balance: any) => {
      const numericBalance = balance.balance;

      const newBalance = numericBalance - this.donationAmount;

      this.store.dispatch(updateBalance({ balance: newBalance }));

      alert(
        `Donation of $${this.donationAmount} successful for ${this.selectedTrust.name}! New Balance: $${newBalance}`
      );

      this.closeModal();
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedTrust = null;
  }
}
