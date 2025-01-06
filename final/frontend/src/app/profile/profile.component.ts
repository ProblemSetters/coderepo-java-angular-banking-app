import { Component } from "@angular/core";

import { AuthenticationService } from "../services/authentication.service";
import { Account } from "src/app/dto/types";
import * as dayjs from "dayjs";
import { ClipboardService } from "ngx-clipboard";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  public isAuth: boolean = false;
  public account?: Account;
  public accountId!: number;
  public formatedDob?: string;
  public copyState: boolean = false;
  public isEditMode: boolean = false;

  // public formatedAccountId?: string;

  constructor(
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private clipboardService: ClipboardService
  ) {}

  firstName = "";
  lastName = "";
  address = "";
  dob: any = "";
  city = "";

  ngOnInit(): void {
    console.log("Initial isEditMode value:", this.isEditMode);

    this.authenticationService.isAuthenticate().subscribe((status: boolean) => {
      this.isAuth = status;
    });

    // Check if account data is available in localStorage
    const storedAccount = localStorage.getItem("userAccount");
    if (storedAccount) {
      console.log("Here I am ", { storedAccount });

      // Parse the stored account data if available
      const parsedAccount = JSON.parse(storedAccount);
      this.account = parsedAccount;
      this.accountId = parsedAccount.accountId;
      this.formatedDob = dayjs(parsedAccount.dob).format("DD-MM-YYYY");
      this.firstName = parsedAccount.firstName;
      this.lastName = parsedAccount.lastName;
      this.address = parsedAccount.address;
      this.dob = parsedAccount.dob;
      this.city = parsedAccount.city;
    } else {
      // Fetch account data from API if not available in localStorage
      this.authenticationService.account().subscribe((account: Account) => {
        console.log({ account });

        this.account = account;
        this.accountId = account.accountId;
        this.formatedDob = dayjs(account.dob).format("DD-MM-YYYY");
      });
    }
  }

  copyAccountId() {
    console.log("test");
    this.clipboardService.copyFromContent(this.accountId.toString());
    this.copyState = true;
    setTimeout(() => {
      this.copyState = false;
    }, 1000);
    this.toastr.success("Account Number Copied Successfully");
  }

  saveChanges(): void {
    // Update account details in localStorage
    const updatedAccount: any = {
      ...this.account,
      firstName: this.firstName || this.account?.firstName || "",
      lastName: this.lastName || this.account?.lastName || "",
      address: this.address || this.account?.address || "",
      dob: this.dob || this.account?.dob || "",
      city: this.city || this.account?.city || "",
    };

    // Save the updated account information in localStorage
    localStorage.setItem("userAccount", JSON.stringify(updatedAccount));

    // Update the component's state
    this.account = updatedAccount;
    this.formatedDob = dayjs(this.dob).format("DD-MM-YYYY");
    this.isEditMode = false;
    this.toastr.success("Profile updated successfully!");
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.firstName = this.account?.firstName || "";
      this.lastName = this.account?.lastName || "";
      this.address = this.account?.address || "";
      this.dob = this.account?.dob || "";
      this.city = this.account?.city || "";
    }
  }

  // // Handle the change of input fields to update state
  onFirstNameChange(event: any) {
    this.firstName = event.target.value;
  }

  onLastNameChange(event: any) {
    this.lastName = event.target.value;
  }
  onAddressChange(event: any) {
    this.address = event.target.value;
  }

  onDobChange(event: any) {
    this.dob = event.target.value;
  }

  onCityChange(event: any) {
    this.city = event.target.value;
  }
}
