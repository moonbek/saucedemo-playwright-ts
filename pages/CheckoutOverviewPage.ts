
import { expect, Locator, Page } from "@playwright/test";

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly backpackItemName: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackItemName = page.locator('[data-test="inventory-item-name"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  // Assertions
  async verifyCheckoutOverviewURL() {
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
  }

  async verifyBackpackItemName() {
    await expect(this.backpackItemName).toHaveText("Sauce Labs Backpack");
  }

  async verifyFinishButtonVisible() {
    await expect(this.finishButton).toBeVisible();
  }

  // Actions
  async clickFinishButton() {
    await this.finishButton.click();
  }
}