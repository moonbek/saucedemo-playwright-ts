
import { expect, Locator, Page } from "@playwright/test";

export class CompletePage {
  readonly page: Page;
  readonly thankyouMessage: Locator;
  readonly backToHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.thankyouMessage = page.locator('[data-test="complete-header"]');
    this.backToHomeButton = page.locator('[data-test="back-to-products"]');
  }

  // Assertions
  async verifyCompletePageURL() {
    await expect(this.page).toHaveURL(/checkout-complete.html/);
  }

  async verifyThankYouMessageVisible() {
    await expect(this.thankyouMessage).toHaveText('Thank you for your order!');
  }

  async verifyBackToHomeButtonVisible() {
    await expect(this.backToHomeButton).toBeVisible();
  }

  // Actions
  async clickBackToHomeButton() {
    await this.backToHomeButton.click();
  }
}