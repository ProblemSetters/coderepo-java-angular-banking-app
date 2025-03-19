# Banking Application

## Overview
The Banking Application is a comprehensive financial management system designed to facilitate seamless transactions, account management, and user authentication. Built using Angular for the frontend and Spring Boot for the backend, this application provides a secure and user-friendly interface for managing banking operations. Users can send money, view transaction history, and manage their accounts efficiently.

## Functionalities
- **User Authentication**: Secure login and registration
- **Send Money**: Transfer funds to beneficiaries
- **Transaction History**: View all transactions
- **Beneficiary Management**: Add and manage beneficiaries
- **Error Handling**: Validation and error messages
- **Role Based Access**: Admin, User and Manager roles
- **Pin Validation**: PIN verification for transactions
- **Fraud Detection**: Detect suspicious transactions
- **Card Security**: CVV masking, limits, virtual cards
- **Dark Mode**: Light and dark theme toggle
- **Multi-Step Forms**: Step-by-step transaction forms
- **Drag & Drop**: Easy beneficiary management
- **Real-time Updates**: Live balance display
- **Accessibility**: WCAG 2.1 compliant
- **Rewards**: Points system for transactions
- **Profile**: User settings and preferences
- **Donations**: Charitable giving platform
- **Loans**: Applications and EMI calculator
- **Recurring Payments**: Scheduled transactions
- **Security Validation**: Registration and transaction checks
- **Fraud Analysis**: Pattern detection and monitoring

## File Structure
The file structure of this repository is organized as follows:

```
coderepo-java-angular-banking-app/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── account/
│   │   │   │   │   ├── account.component.ts
│   │   │   │   │   ├── account.component.html
│   │   │   │   │   └── account.component.scss
│   │   │   │   ├── beneficiary/
│   │   │   │   │   ├── beneficiary.component.ts
│   │   │   │   │   ├── beneficiary.component.html
│   │   │   │   │   └── beneficiary.component.scss
│   │   │   │   ├── cards/
│   │   │   │   │   ├── card-list.component.ts
│   │   │   │   │   ├── card-detail.component.ts
│   │   │   │   │   └── virtual-card.component.ts
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── dashboard.component.ts
│   │   │   │   │   └── balance-widget.component.ts
│   │   │   │   ├── login/
│   │   │   │   └── transaction/
│   │   │   ├── services/
│   │   │   │   ├── account.service.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── transaction.service.ts
│   │   │   │   └── fraud-detection.service.ts
│   │   │   ├── models/
│   │   │   │   ├── account.model.ts
│   │   │   │   ├── transaction.model.ts
│   │   │   │   └── card.model.ts
│   │   │   └── shared/
│   │   │       ├── guards/
│   │   │       └── interceptors/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   ├── environments/
│   │   ├── app.module.ts
│   │   ├── app.component.ts
│   │   └── app-routing.module.ts
│   ├── package.json
│   └── angular.json
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/hackerrank/corebanking/
│   │   │   │       ├── controller/
│   │   │   │       │   ├── AccountController.java
│   │   │   │       │   ├── TransactionController.java
│   │   │   │       │   ├── CardController.java
│   │   │   │       │   └── AuthController.java
│   │   │   │       ├── model/
│   │   │   │       │   ├── Account.java
│   │   │   │       │   ├── Transaction.java
│   │   │   │       │   ├── Card.java
│   │   │   │       │   └── User.java
│   │   │   │       ├── repository/
│   │   │   │       │   ├── AccountRepository.java
│   │   │   │       │   └── TransactionRepository.java
│   │   │   │       ├── service/
│   │   │   │       │   ├── AccountService.java
│   │   │   │       │   ├── TransactionService.java
│   │   │   │       │   └── FraudDetectionService.java
│   │   │   │       ├── config/
│   │   │   │       │   ├── SecurityConfig.java
│   │   │   │       │   └── SwaggerConfig.java
│   │   │   │       └── dto/
│   │   │   │           ├── AccountDTO.java
│   │   │   │           └── TransactionDTO.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── data.sql
│   │   └── test/
│   │       └── java/
│   │           └── com/hackerrank/corebanking/
│   │               ├── service/
│   │               │   └── TransactionServiceIT.java
│   │               └── controller/
│   └── pom.xml
│
├── README.md
└── setup.sh

```

## Installation and Running the Application

To install the necessary dependencies and start the application, follow these steps:

1. **Install Dependencies**: Run the following command in the root directory of the project:
   ```bash setup.sh```

2. **Start the Application**: After the installation is complete, run the following command to start the application:
   ```concurrently \"npm run client\" \"npm run server\"```