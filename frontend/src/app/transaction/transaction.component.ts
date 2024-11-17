import { Component, HostListener, Renderer2 } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { TransactionService } from "src/app/services/transaction.service";
import { Router } from "@angular/router";
import { Transaction, Account } from "src/app/dto/types";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "src/app/services/authentication.service";
import * as dayjs from "dayjs";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent {
  public isAuth: boolean = false;
  public account?: Account;
  public transactionsList!: Array<Transaction>;
  public accountId!: number;
  public fromDate!: string;
  public toDate!: string;
  public selectedTransactionsDay: string = "7";
  public fromDateSearch!: { year: number; month: number; day: number };
  public toDateSearch!: { year: number; month: number; day: number };
  public todayDate: NgbDateStruct = this.getCurrentDate();

  // Array of IDs for focusable elements in the component
  public focusableElements = [
    "",
    "fromDateSearch",
    "toDateSearch",
    "search",
    "export",
  ];
  public currentFocusIndex: number = 0; // Ensure this starts at the first element index

  public selectedRows: Set<number> = new Set();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
    private transactionService: TransactionService,
    private renderer: Renderer2
  ) {
    // Check authentication status
    this.authenticationService.isAuthenticate().subscribe((status: boolean) => {
      this.isAuth = status;
    });

    // Get account information
    this.authenticationService.account().subscribe((account: Account) => {
      this.account = account;
      this.accountId = account.accountId;
      this.fromDate = dayjs().subtract(7, "day").format("YYYY-MM-DD");
      this.toDate = dayjs().format("YYYY-MM-DD");

      this.fromDateSearch = {
        year: dayjs().subtract(7, "day").get("year"),
        month: dayjs().subtract(7, "day").get("month") + 1,
        day: dayjs().subtract(7, "day").get("date"),
      };
      this.toDateSearch = {
        year: dayjs().get("year"),
        month: dayjs().get("month") + 1,
        day: dayjs().get("date"),
      };
    });
  }

  ngOnInit() {
    this.getTransactions();
  }

  ngAfterViewInit() {
    this.initializeFocusableElements();
    this.setInitialFocus(); // Set the initial focus when component is fully loaded
  }

  getCurrentDate(): NgbDateStruct {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate(),
    };
  }

  getTransactions() {
    this.transactionService
      .transactionHistory(this.accountId, this.fromDate, this.toDate)
      .subscribe({
        next: (data: any) => {
          this.transactionsList = [];
          setTimeout(() => {
            this.transactionsList = data;
            this.initializeFocusableElements(); // Initialize focusable elements after loading transactions
          }, 100);
        },
        error: (e: HttpErrorResponse) => {
          this.toastr.error(
            "Oops! Something went wrong while fetching all transactions."
          );
        },
        complete: () => {},
      });
  }

  onDateSelectChange(event: Event) {
    this.selectedTransactionsDay = (event.target as HTMLSelectElement).value;
    this.fromDate = dayjs()
      .subtract(Number(this.selectedTransactionsDay), "day")
      .format("YYYY-MM-DD");
    this.toDate = dayjs().format("YYYY-MM-DD");
    this.fromDateSearch = {
      year: dayjs()
        .subtract(Number(this.selectedTransactionsDay), "day")
        .get("year"),
      month:
        dayjs()
          .subtract(Number(this.selectedTransactionsDay), "day")
          .get("month") + 1,
      day: dayjs()
        .subtract(Number(this.selectedTransactionsDay), "day")
        .get("date"),
    };
    this.toDateSearch = {
      year: dayjs().get("year"),
      month: dayjs().get("month") + 1,
      day: dayjs().get("date"),
    };
    this.getTransactions();
  }

  searchDateFilter() {
    this.fromDate = dayjs()
      .set("year", this.fromDateSearch.year)
      .set("month", this.fromDateSearch.month - 1)
      .set("date", this.fromDateSearch.day)
      .format("YYYY-MM-DD");
    this.toDate = dayjs()
      .set("year", this.toDateSearch.year)
      .set("month", this.toDateSearch.month - 1)
      .set("date", this.toDateSearch.day)
      .format("YYYY-MM-DD");
    this.getTransactions();
  }

  saveDataInCSV(data: Array<any>): string {
    if (data.length === 0) return "";

    const propertyNames = Object.keys(data[0]);
    const rows = data.map((item) =>
      propertyNames
        .map((key) => (item[key] !== undefined ? item[key] : ""))
        .join(",")
    );
    return [propertyNames.join(","), ...rows].join("\n");
  }

  exportToCsv() {
    const selectedData = this.transactionsList.filter((_, index) =>
      this.selectedRows.has(index)
    );
    const dataToExport = selectedData.length
      ? selectedData
      : this.transactionsList;
    const csvContent = this.saveDataInCSV(dataToExport);

    const hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvContent);
    hiddenElement.target = "_blank";
    hiddenElement.download = "transactions.csv";
    hiddenElement.click();
  }

  initializeFocusableElements() {
    // Define focusable elements, including dynamically generated table rows
    this.focusableElements = [
      "",
      "fromDateSearch",
      "toDateSearch",
      "search",
      "export",
      ...this.transactionsList.map((_, index) => `row_${index}`),
    ];
    this.currentFocusIndex = 0; // Reset focus index to start from the first element
  }

  setInitialFocus() {
    // Add focus to the first element, "fromDateSearch"
    const initialElement = document.getElementById(
      this.focusableElements[this.currentFocusIndex]
    );
    if (initialElement) {
      this.renderer.addClass(initialElement, "highlight"); // Add a visual indication of focus
    }
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Accessibility: Use "W" and "E" keys to navigate, "Q" to select
    if (event.key.toLowerCase() === "w") {
      this.navigateFocus(-1); // Move to the previous element
    } else if (event.key.toLowerCase() === "e") {
      this.navigateFocus(1); // Move to the next element
    } else if (event.key.toLowerCase() === "q") {
      this.selectFocusedElement(); // Trigger select on focused element
    }
  }

  public navigateFocus(direction: number) {
    // Remove highlight from current element
    const currentElement = document.getElementById(
      this.focusableElements[this.currentFocusIndex]
    );
    if (currentElement) {
      this.renderer.removeClass(currentElement, "highlight");
    }

    // Update focus index based on direction
    this.currentFocusIndex =
      (this.currentFocusIndex + direction + this.focusableElements.length) %
      this.focusableElements.length;

    // Add highlight to the new element
    const nextElement = document.getElementById(
      this.focusableElements[this.currentFocusIndex]
    );
    if (nextElement) {
      this.renderer.addClass(nextElement, "highlight");
    }
  }

  private selectFocusedElement() {
    // Accessibility: Handle selecting or interacting with the currently focused element
    const focusedElement = document.getElementById(
      this.focusableElements[this.currentFocusIndex]
    );

    if (focusedElement?.tagName === "TR") {
      // Handle row selection in the table
      const rowIndex = parseInt(focusedElement.id.split("_")[1]);
      if (this.selectedRows.has(rowIndex)) {
        this.selectedRows.delete(rowIndex);
      } else {
        this.selectedRows.add(rowIndex);
      }

      // Toggle checkbox selection
      const checkbox = focusedElement.querySelector(
        "input[type='checkbox']"
      ) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
      }
    } else {
      // Default behavior for other focusable elements
      focusedElement?.click();
    }
  }
}
