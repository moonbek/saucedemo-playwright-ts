
import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  // Assertions
  async verifyCheckoutStepOneURL() {
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
  }

  async verifyInputFieldsVisible() {
    const inputs = [
      this.firstNameInput,
      this.lastNameInput,
      this.postalCodeInput,
    ];

    for (const input of inputs) {
      await expect(input).toBeVisible();
    }
  }

  async verifyContinueButtonVisible() {
    await expect(this.continueButton).toBeVisible();
  }

  // Actions
  async fillCheckoutInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
}