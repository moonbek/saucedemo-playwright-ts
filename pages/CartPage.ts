
import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly backpackItemName: Locator;
  readonly itemQuantity: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backpackItemName = page.locator('[data-test="inventory-item-name"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  // Assertions
  async verifyCartPageURL() {
    await expect(this.page).toHaveURL(/cart.html/);
  }

  async verifyBackpackInTheCart() {
    await expect(this.backpackItemName).toHaveText("Sauce Labs Backpack");
  }

  async verifyItemQuantity() {
    await expect(this.itemQuantity).toHaveText("1");
  }

  async verifyCheckoutButtonVisible() {
    await expect(this.checkoutButton).toBeVisible();
  }

  // Actions
  async clickCheckout() {
    await this.checkoutButton.click();
  }
}