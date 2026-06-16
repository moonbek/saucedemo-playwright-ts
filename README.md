# Playwright TypeScript QA Automation Portfolio

This project is a QA Automation portfolio built with Playwright and TypeScript. It includes both UI and API automated tests, follows the Page Object Model (POM) design pattern, and demonstrates end-to-end, API, and CRUD testing practices.

## Tech Stack

* Playwright
* TypeScript
* Node.js
* GitHub Actions (CI)
* REST API Testing
* Page Object Model (POM)
* VS Code

## Project Structure

```text
pages/
  LoginPage.ts
  InventoryPage.ts
  CartPage.ts
  CheckoutPage.ts
  CheckoutOverviewPage.ts
  CompletePage.ts

tests/
  checkout.spec.ts
  api/
    booking-api.spec.ts

.github/
  workflows/
    playwright.yml
```

## UI Test Coverage

### Positive E2E Checkout Flow

* Login with valid credentials
* Add Sauce Labs Backpack to cart
* Verify cart badge
* Open cart
* Verify item details
* Complete checkout process
* Verify successful order confirmation

### Negative Login Scenario

* Login with invalid password
* Verify error message

## API Test Coverage

### Restful Booker API

#### GET

* Get all booking IDs
* Get booking by ID

#### POST

* Create booking
* Create authentication token

#### PUT

* Update entire booking

#### PATCH

* Partially update booking

#### DELETE

* Delete booking
* Verify deleted booking returns 404

## Framework Features

* API helper functions
* Reusable authentication helper
* Reusable booking creation helper
* Centralized BASE_URL configuration
* TypeScript support
* Playwright Test Runner
* HTML reporting
* CI/CD integration with GitHub Actions

## Installation

```bash
npm install
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run UI tests:

```bash
npx playwright test tests/checkout.spec.ts
```

Run API tests:

```bash
npx playwright test tests/api/booking-api.spec.ts
```

Run headed mode:

```bash
npx playwright test --headed
```

## View HTML Report

```bash
npx playwright show-report
```

## Continuous Integration

GitHub Actions automatically:

* Installs dependencies
* Installs Playwright browsers
* Executes tests
* Uploads HTML reports

Workflow file:

```text
.github/workflows/playwright.yml
```

## Design Patterns

### Page Object Model (POM)

UI tests use the Page Object Model to separate page actions and locators from test logic.

### Helper Functions

API tests use reusable helper functions for:

* Authentication token creation
* Booking creation

This reduces duplicated code and improves maintainability.

## Author

Created as part of a QA Automation portfolio project using Playwright and TypeScript.
