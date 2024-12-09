## User Story
Currently, there are some fraud checks added to the system which are **not working correctly**.

1.	**Frequent Transaction Limit**: Users should be restricted to make more than 5 transactions within 30 minutes of each other.
2.	**Transaction Time**: If a user performs a transaction between 1 AM and 4 AM, the transaction is deemed suspicious.
3.  **Transaction Limit**: If a transaction exceeds a pre-defined limit, it is deemed suspicious.
4.  **Suspicious Merchant**: If a transaction is done to a suspicious merchant account, transaction is deemed as suspicious.

All **limits can be set as static values for now** and do not need to be customizable at the user level.

## Acceptance Criteria


There are some bugs present in overall fraud analysis and the same needs to be fixed based on the rules to defined above so that all unit test passes.
=======
### Frontend:

This project uses `Angular`
The folder structure for the frontend of the application is as follows:

```
├── src
│ ├── app
│ ├── assets
│ ├── account
│ ├── beneficiary
│ ├── cards
│ ├── components
│ │     └── navbar
│ ├── dashboard
│ ├── login
│ ├── profile
│ ├── send-money
│ └── transaction
├── package.json
├── angular.json
└── testconfig.json
```

- `src`: Contains the source code for the frontend.
  - `assets`: Holds static assets such as images, stylesheets, or fonts.
  - `app`: Contains reusable angular components used throughout the application.
    - `account`: Customers can create accounts related UI components.
    - `beneficiary`: Beneficiary releted UI components
    - `cards`: Card related UI components.
    - `dashboard`: Contains the UI for dashboard.
    - `login`: All the login related views and logics.
    - `profile`: Profile releted views and logic are there.
    - `send-money`: It contain the UI for Send money.
    - `transaction`: Transaction releted UI and logic are there.
  - `package.json`: Package information.
  - `angular.json`: Angular related information.

## Flow

- Starts with `app.component.html` at `/`. Then customer create account with `account.component.html` at `/open-account`.
  customer can send money with `send-money.component.html` at `/send-money`. Customer can add beneficiary with `beneficiary.component.html` at `/beneficiary`.
  customer can see all transactions history with `transaction.component.html` at `/transaction`. customer can see all card with `cards.component.html` at `/cards`.

## Technologies Used

- H2 In-Memory DB: Database for storing customer information, transactions data, and card details.
- Springboot Java: Backend framework for handling API routes and business logic.
- Angular JS: Frontend library for building user interfaces and components.

## Local Development Setup Guide:

This section is not applicable if you are taking the assessment on the online HackerRank IDE. Follow these steps only if
you need to set up this project for local development on your system.

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Java (version 17)
- Maven
- node

### Getting Started

Backend start:

1. `cd backend`
2. `mvn clean package -DskipTests`
3. `mvn springboot-run`

Frontend start:

1. `cd frontend`
2. `npm start`

## Drag and Drop functionality for Beneficiary List :

### Description :

This Angular project includes a custom directive (`appDragDrop`) that provides drag-and-drop functionality for reordering a list of beneficiaries displayed in a table. This feature allows users to intuitively rearrange items by dragging and dropping them into the desired position within the list.

#### Features

- **Reordering Beneficiaries:** Users can drag and drop a beneficiary row to reorder it within the list. 
- **Dark Mode Support:** The directive is compatible with both light and dark modes, ensuring consistent behavior and appearance. 

#### Implementation Details

##### HTML Structure


In the BeneficiaryComponent, the directive is applied to each row of the table displaying the list of beneficiaries. This enables drag-and-drop functionality on the rows.

```html
<tr
  *ngFor="let beneficiary of beneficiaryList; let i = index"
  [draggableItem]="beneficiary"
  [list]="beneficiaryList"
  (listChange)="beneficiaryList = $event"
  appDragDrop
>
 <!-- Row content for each beneficiary -->
</tr>
```

This directive is also applied to the dropdown list of beneficiaries on input statement. It alowws drag items from the dropdown list and drop it in the table with previous beneficiaries list.

```html
<div
  *ngIf="showDropdown"
  class="absolute w-full bg-white text-black border mt-1 z-10 max-h-56 overflow-y-auto"
>
  <div
    *ngFor="let beneficiary of filteredBeneficiaryList"  
    [draggableItem]="beneficiary"
    [list]="beneficiaryList"
    (listChange)="beneficiaryList = $event"
    appDragDrop
    (click)="selectBeneficiary(beneficiary)"
    [isFromDropdown]="true"
  >
    {{ beneficiary.beneficiary }}
  </div>
</div>
```

#### Explanation :

- `[draggableItem]`: Binds the current beneficiary item to the directive, allowing it to track which item is being dragged.
- `[list]`: Binds the entire list of beneficiaries to the directive, so it can reorder the list when an item is dropped.
- `(listChange)`: Emits the updated list after reordering, ensuring the component reflects the changes.

### Acceptance Criteria 

1. **Initial Setup :**

- The directive is initialized with `@Input` properties to accept the draggable item (`draggableItem`) and the list of items (`list`).
- The `@Output` property (`listChange`) is used to emit the updated list after reordering.

2. **Making Elements draggable :**

- The constructor sets the `draggable` attribute on the element to `"true"`, allowing the element to be dragged.

  ```typescript
   constructor(private el: ElementRef, private renderer: Renderer2) {
   this.renderer.setAttribute(this.el.nativeElement, "draggable", "true");
   }
  ```

3. **Tracking drag Start :**

- In the `onDragStart` method:

  - The index of the item being dragged (`dragStartIndex`) is recorded.
  - This index is stored in the `dataTransfer` object of the drag event, which allows it to be accessed later during the drop operation.
  - A CSS class (`dragging-background`) is added to the dragged element to change its appearance, and its opacity is reduced to give visual feedback that the item is being dragged.

  ```typescript
      @HostListener("dragstart", ["$event"])
      onDragStart(event: DragEvent) {
      this.dragStartIndex = this.list.indexOf(this.draggableItem);
      event.dataTransfer?.setData("text/plain", this.dragStartIndex.toString());

      this.renderer.addClass(this.el.nativeElement, "dragging-background");
      }
  ```

4. **Handling Drag Over :**

- The `onDragOver` method prevents the default behavior, allowing the item to be dropped.

  ```typescript
        @HostListener("dragover", ["$event"])
        onDragOver(event: DragEvent) {
        event.preventDefault();
        }
  ```

5. **Handling Drop Event :**

- In the `onDrop` method:

  - The index of the item being dropped (`dragEndIndex`) is determined.
  - The index of the dragged item (`dragStartIndex`) is retrieved from the `dataTransfer` object.
  - If the dragged item and the drop target are different, their positions in the list are swapped.
  - The updated list is emitted via the `listChange` event, ensuring the component's state is updated with the new order.

  ```typescript
  
  @HostListener("drop", ["$event"])
  onDrop(event: DragEvent) {
  const dragEndIndex = this.list.indexOf(this.draggableItem);
  const startIndex = +event.dataTransfer?.getData("text/plain")!;
    if (dragStartIndex !== dragEndIndex) {
    // Add swapping logic here...
  }
  }
  ```

6. **Resetting Styles After Dragging :**

- The `onDragEnd` method:

  - Resets the visual feedback by removing the `dragging-background` class and restoring the element's opacity to `1`.

  ```typescript
  @HostListener("dragend")
  onDragEnd() {
  this.renderer.removeClass(this.el.nativeElement, "dragging-background");
  }
  ```

#### Notes

The custom `appDragDrop` directive provides an efficient way to manage a sortable list of beneficiaries within the Angular application. By using this directive, users can easily reorder the list by dragging and dropping items, improving the overall user experience.

