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

## Example Usage

### Dark Mode Functionality

This Angular application supports a dynamic dark mode feature, allowing users to switch between light and dark themes. The dark mode is implemented through the `DarkThemeSelectorService` service in `themeToggle.services.ts` file , which manages the application's theme based on user preferences and system settings.

#### Key Features

- **Light and Dark Themes:** Users can toggle between light and dark themes. The selected theme applied automatically.
- **System Theme Detection:** The application can detect the system's color scheme preference and apply the appropriate theme. If the system preference changes, the application updates the theme accordingly.
- **Route-Based Styling:** Specific routes can have different styles based on the current theme. For instance, the `/beneficiary` route applies a dark background when the dark theme is active.

#### Usage

1. **Inject the Service:**

   The `DarkThemeSelectorService` is provided in the root of the application. Inject it into any component or service where theme switching is required.

   ```typescript
   constructor(private darkThemeSelector: DarkThemeSelectorService) { }
   ```

2. **Set Themes:**
   Use the service methods to set the desired theme:

   ```typescript
   this.darkThemeSelector.setLightTheme();  // Sets the light theme
   this.darkThemeSelector.setDarkTheme();   // Sets the dark theme
   this.darkThemeSelector.setSystemTheme(); // Sets the theme based on system preference

3. **Observe Theme Changes:**
   Subscribe to the currentTheme observable to react to theme changes in your components:

   ```typescript
   this.darkThemeSelector.currentTheme.subscribe(theme => {
   console.log('Current theme:', theme);
   });
   ```

4. **Handling Route Changes:**
   Customize the appearance of specific routes based on the active theme:

   ```typescript
   this.darkThemeSelector.handleRouteChange('/beneficiary');
   ```

#### Implementation Details

`DarkThemeSelectorService`

The `DarkThemeSelectorService` is a core part of the dark mode functionality. It is responsible for managing theme changes, local storage operations, and applying/removing theme-related classes on the HTML document.

##### Core Methods:

- `setLightTheme()`: Applies the light theme, updates local storage, and adjusts the document's CSS class.
- `setDarkTheme()`: Applies the dark theme, updates local storage, and modifies the document's CSS class.
- `setSystemTheme()`: Detects the system's theme preference and applies it. Updates local storage accordingly.
- `handleRouteChange(url: string)`: Customizes route-specific styling based on the active theme.
- `addClassToHtml(className: string)`: Adds a CSS class to the HTML document element.
- `removeClassFromHtml(className: string)`: Removes a CSS class from the HTML document element.
- `setToLocalStorage(theme: AppTheme)`: Saves the selected theme to local storage.
- `removeFromLocalStorage()`: Removes the theme setting from local storage.

##### System Theme Detection

The application detects the system's color scheme preference using the `window.matchMedia` API. The `isSystemDark()` function checks if the system prefers a dark color scheme and adjusts the theme accordingly.

```typescript
   isSystemDark(): boolean {
   return window.matchMedia('(prefers-color-scheme: dark)').matches;
   }
   ```

##### Function:

- `isSystemDark()`: Checks the system's color scheme preference and returns `true` if the dark mode is preferred, otherwise `false`.