
import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryTitle: Locator;
  readonly inventoryItems: Locator;
  readonly backpackAddToCartButton: Locator;
  readonly backpackRemoveButton: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryTitle = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.backpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.backpackRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  // Actions
  async addBackpackToCart() {
    await this.backpackAddToCartButton.click();
  }

  async clickCartBadge() {
    await this.cartLink.click();
  }

  // Assertions
  async verifyInventoryURL() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async verifyInventoryTitle() {
    await expect(this.inventoryTitle).toHaveText("Products");
  }

  async verifyInventoryItemsCount() {
    const count = await this.inventoryItems.count();

    await expect(count).toBeGreaterThan(0);
    // await expect(this.inventoryItems).toHaveCount(6);
  }

  async verifyBackpackAddedToCart() {
    await expect(this.backpackRemoveButton).toHaveText("Remove");
  }

  async verifyCartBadgeCount() {
    await expect(this.cartBadge).toHaveText(/\d+/);
  }
}


