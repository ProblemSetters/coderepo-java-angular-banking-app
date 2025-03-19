# Banking Application

## Overview
The Banking Application is a comprehensive financial management system designed to facilitate seamless transactions, account management, and user authentication. Built using Angular for the frontend and Spring Boot for the backend, this application provides a secure and user-friendly interface for managing banking operations. Users can send money, view transaction history, and manage their accounts efficiently.

## Functionalities
- **User Authentication**: Secure login and registration for users to access their accounts.
- **Send Money**: Users can transfer funds to beneficiaries with ease.
- **Transaction History**: View a detailed history of all transactions made by the user.
- **Beneficiary Management**: Add and manage beneficiaries for quick transactions.
- **Responsive Design**: The application is designed to be mobile-friendly and accessible on various devices.
- **Error Handling**: Comprehensive error messages and validation to enhance user experience.

## Technologies Used
- **Frontend**:
  - **Angular**: A powerful framework for building dynamic single-page applications (SPAs) using TypeScript.
  - **RxJS**: A library for reactive programming using Observables, allowing for asynchronous data handling.
  - **NgBootstrap**: Provides Bootstrap components for Angular applications, enhancing UI design.
  - **ngx-toastr**: A library for displaying toast notifications, providing feedback to users on actions taken.
  
- **Backend**:
  - **Spring Boot**: A Java-based framework that simplifies the development of RESTful APIs and microservices.
  - **Spring Data JPA**: A part of the Spring framework that simplifies database interactions and provides a repository abstraction.
  - **Hibernate**: An object-relational mapping (ORM) tool for Java, facilitating database operations.
  - **JUnit**: A testing framework for Java, used for writing and running unit tests.
  - **Mockito**: A mocking framework for unit tests in Java, allowing for the simulation of objects and behaviors.

- **Database**:
  - **H2 Database**: An in-memory database used for development and testing, providing fast data access and easy setup.

- **Development Tools**:
  - **Node.js**: A JavaScript runtime used for running the Angular development server and managing packages.
  - **npm**: The package manager for JavaScript, used to install and manage project dependencies.
  - **Maven**: A build automation tool used for managing Java projects and their dependencies.


## File Structure
The file structure of this repository is organized as follows:

```
├── src
│ ├── app
│ │ ├── account
│ │ ├── beneficiary
│ │ ├── cards
│ │ ├── components
│ │ │ └── navbar
│ │ ├── dashboard
│ │ ├── login
│ │ ├── profile
│ │ ├── send-money
│ │ └── transaction
│ ├── assets
│ ├── services
│ ├── dto
│ ├── state
│ ├── app.module.ts
│ ├── app.component.ts
│ ├── app-routing.module.ts
│ ├── main.ts
│ ├── styles.scss
│ └── index.html
├── package.json
├── angular.json
├── testconfig.json
├── README.md
└── .gitignore
```

## Installation and Running the Application

To install the necessary dependencies and start the application, follow these steps:

1. **Install Dependencies**: Run the following command in the root directory of the project:
   ```bash setup.sh```

2. **Start the Application**: After the installation is complete, run the following command to start the application:
   ```concurrently \"npm run client\" \"npm run server\"```
