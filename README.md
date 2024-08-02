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

## Requirements
Currently, there are some operations in the app which should only be allowed for an admin. Like:
1. View account details of other customers
2. View full transaction history of other customers
3. Soft delete customers

### Domain-mode updates
#### Role for RBAC (and its usage in Account domain model)
<details open>
<summary>We have defined a new `Role` class whose model looks like:</summary>

```json
{
  "id": 1,
  "name": "Admin"
}
```
</details>
<br />
<details>
<summary>This is now used in the existing Account domain model class:</summary>

```json
{
  "accountId": 12,
  "firstName": "John",
  "lastName": "Doe",
  "dob": "1990-01-01",
  "gender": "Male",
  "address": "1234 Elm Street",
  "city": "Springfield",
  "emailAddress": "john.doe@example.com",
  "balance": 2434.76,
  "password": "password123",
  "deleted": false,
  "deletedAt": null,
  "roles": [
    {
      "id": 1,
      "name": "Admin"
    },
    {
      "id": 2,
      "name": "User"
    }
  ]
}
```
</details>

### API Updates
#### **Soft-delete a customer** (Updated, backward-compatible)
Now admin can soft-delete a customer using the following **existing** API:
```bash
curl --location --request DELETE \
    'http://localhost:8080/api/core-banking/account/:accountId?softDelete=true'
```
The API above is backward compatible.

#### **Fetch transaction history: self-account** (Updated, backward-compatible)
Earlier, the below fetch transaction history API accepted account id parameter, which leaked transaction data for other customers too, if they know other customer account id. Now, providing account is not needed, and the **API will infer current user from the JWT token**.
```bash
curl -X GET "http://localhost:8080/api/core-banking/transaction/transactionHistory/accounts/12345?fromDate=2024-01-01&toDate=2024-12-31" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```
The API above is backward compatible i.e. even if you pass an account id, no change. You will always get your own transaction history only.

#### **Fetch transaction history: Admin** (New API)
Now admin can fetch transaction history for all accounts
```bash
curl --location --request DELETE \
    'http://localhost:8080/api/core-banking/transaction/accounts/:accountId'
```
The API **will validate admin JWT token**. If user is not an admin, it returns error.
<details>
<summary>Sample success response:</summary>

```json
[
  {
    "dateCreated": "2024-05-01 12:34:56",
    "lastCreated": "2024-05-01 12:34:56",
    "transactionId": 1042,
    "fromAccountId": 12345,
    "toAccountId": 67890,
    "transferAmount": 100.50
  },
  {
    "dateCreated": "2024-06-15 08:45:30",
    "lastCreated": "2024-06-15 08:45:30",
    "transactionId": 1043,
    "fromAccountId": 12345,
    "toAccountId": 13579,
    "transferAmount": 250.00
  },
  {
    "dateCreated": "2024-07-22 16:00:00",
    "lastCreated": "2024-07-22 16:00:00",
    "transactionId": 1044,
    "fromAccountId": 24680,
    "toAccountId": 12345,
    "transferAmount": 300.75
  }
]
```
</details>

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