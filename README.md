# Springboot Angular Banking App

This is a full-stack banking application built using the springboot in backend and angular in the frontend. It provides
the following features:

- Account Creation: Customers can create accounts and securely store their information.
- Customer Login: Registered customers can log into their accounts and access banking features.
- Customer Profile: Display customer profile information.
- Fund Transfer: Customers can transfer money from one account to another account.
- Add Beneficiary: Customers can add beneficiary to their account and use later on to transfer funds quickly.
- View Transactions: Customers can view transactions history based on selected date range.
- Block/Unblock Cards: Customers can block and unblock cards.
- Update Pin: Customers can change card pin.

## Folder Structure

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

## Example Usage :

### Drag and Drop functionality for Beneficiary List :

This Angular project includes a custom directive (`appDragDrop`) that provides drag-and-drop functionality for reordering a list of beneficiaries displayed in a table. This feature allows users to intuitively rearrange items by dragging and dropping them into the desired position within the list.

#### Features

- **Reordering Beneficiaries:** Users can drag and drop a beneficiary row to reorder it within the list.
- **Visual Feedback:** During the drag operation, the row being dragged changes its background color, providing a visual cue that it is being moved.
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
  <td>{{ beneficiary.beneficiaryAccountId }}</td>
  <td>{{ beneficiary.dateCreated }}</td>
</tr>
```

#### Explanation :

- `[draggableItem]`: Binds the current beneficiary item to the directive, allowing it to track which item is being dragged.
- `[list]`: Binds the entire list of beneficiaries to the directive, so it can reorder the list when an item is dropped.
- `(listChange)`: Emits the updated list after reordering, ensuring the component reflects the changes.

#### Drag-and-Drop Logic

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
  event.preventDefault();
  const dragEndIndex = this.list.indexOf(this.draggableItem);
  const startIndex = +event.dataTransfer?.getData("text/plain")!;

  if (startIndex !== dragEndIndex) {
    [this.list[startIndex], this.list[dragEndIndex]] = [
      this.list[dragEndIndex],
      this.list[startIndex],
    ];
    this.listChange.emit(this.list);
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
  this.renderer.setStyle(this.el.nativeElement, "opacity", "1");
  }
  ```

#### Conclusion

The custom `appDragDrop` directive provides an efficient way to manage a sortable list of beneficiaries within the Angular application. By using this directive, users can easily reorder the list by dragging and dropping items, improving the overall user experience.
