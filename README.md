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