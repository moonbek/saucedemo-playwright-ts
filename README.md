# SauceDemo Playwright TypeScript Automation

This project is an end-to-end test automation framework for the SauceDemo e-commerce website using Playwright, TypeScript, and the Page Object Model (POM) design pattern.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions (CI)
- Page Object Model
- VS Code

## Project Structure

```text
saucedemo-playwright-ts/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── CheckoutOverviewPage.ts
│   └── CompletePage.ts
├── tests/
│   └── checkout.spec.ts
├── package.json
├── playwright.config.ts
└── README.md

## Test Coverage

### Positive Scenario

- Login with valid credentials
- Add Sauce Labs Backpack to cart
- Verify cart badge
- Open cart
- Verify item name and quantity
- Proceed to checkout
- Fill checkout information
- Complete order
- Verify successful order confirmation
- Return to inventory page

### Negative Scenario

- Login with invalid password
- Verify error message is displayed

## How to Install

```bash
npm install
```

## How to Run Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/checkout.spec.ts
```

## How to View HTML Report

```bash
npx playwright show-report
```

## Continuous Integration (CI)

This project uses GitHub Actions to automatically run Playwright tests on every push and pull request.

Workflow configuration:

```text
.github/workflows/playwright.yml
```

CI pipeline performs the following steps:

- Checkout repository
- Install Node.js
- Install project dependencies
- Install Playwright browsers
- Execute Playwright tests
- Upload Playwright HTML report as an artifact

## Design Pattern

This project follows the Page Object Model (POM) design pattern.

Page Objects keep locators, actions, and assertions separate from test logic. This makes tests more maintainable, reusable, and easier to read.

## Author

Created as part of a QA Automation portfolio project.
