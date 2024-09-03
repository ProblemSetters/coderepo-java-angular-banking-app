# Springboot Angular Banking App

This full-stack banking application is built using spring-boot (backend) and angular (frontend). It provides
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

## Example Usage

### Dynamic Form with Stepper on ApplyLoanComponent

#### Description

The `apply-loan` component features a dynamic form designed for handling loan applications. This form is built to adapt based on configurations specified in `form-fields.helper.ts`, allowing for flexibility and ease of maintenance. The component dynamically generates form controls, steps, and validation, ensuring a seamless user experience.

#### Acceptance Criteria

- **Field Definitions**

Form fields are specified in `form-fields.helper.ts` using the `FormField` interface:

```typescript
export interface FormField {
  type: string;
  name: string;
  placeholder: string;
  label: string;
  validators: string[];
  col: number | string;
  step: number;
  category: string;
  options?: string | string[];
}
```

- **Component Implementation**

In the `apply-loan` component, the form is dynamically generated based on the field definitions:

- `createFormControls()` : Initializes form controls based on the field definitions.
- `createSteps()` : Generates steps for the form based on categories.
- `panValidator(control: any)`: Custom validator for PAN numbers.
- `nextStep(), previousStep()` : Methods to navigate between steps.
- `onSubmit()` : Handles form submission when form is valid.

- **HTML Integration**

To render the dynamic form in the HTML template, use Angular directives and bindings:

1. **Render Form Controls**

Dynamically generate form controls based on the `applicantFields`:

```html
<input
  [formControlName]="field.name"
  [placeholder]="field.placeholder"
  [attr.type]="field.type"
/>
```

2. **Display Error Message**

Error messages are displayed for fields that are invalid and have been touched. The `getErrorMessage()` function retrieves the appropriate error message for each field.

```html
<div
  *ngIf="dynamicForm.get(field.name)?.invalid && dynamicForm.get(field.name)?.touched"
>
  {{ getErrorMessage(field.name) }}
</div>
```

3. **Navigation**

Include buttons to navigate between steps :

```html
<button type="button" (click)="previousStep()">Previous</button>
<button type="button" (click)="nextStep()">Next</button>
```

4. **Submission Button**

A submit button is provided to trigger form submission.

```html
<button type="submit">Submit</button>
```

- **Testing**

To ensure the functionality of the `applyLoan` component and its dynamic form, various tests should be conducted. Below are some example test cases you can use to verify the component's behavior:

- **Test Cases**

  - `Form Initialization` : Verify that the form controls are created based on the field definitions from `applicantFields`.
  - `Validation Messages` : Check that validation messages are displayed correctly for required fields.
  - `Step Creation` : Verify that steps are created correctly based on the form categories.
  - `Navigation` : Ensure that the form navigates to the next step only when the current step is complete.
  - `Form Submission` : Test form submission to ensure that the form values are logged correctly when the form is valid.
  - `Object Retrieval` : Verify that options for select fields are retrieved correctly.

#### Notes

- The dynamic form implementation ensures that any changes in `form-fields.helper.ts` are automatically reflected in the `apply-loan component`, reducing the need for manual updates and enhancing maintainability.
- Custom validators like `panValidator()` are crucial for specific field validations, such as verifying PAN numbers.
