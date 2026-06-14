import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CompletePage } from '../pages/CompletePage';

//==============Positive Test============================

test('Add Backpack to cart after successful login', async ({ page }) => {

  // Arrange: Initialize page objects
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const completePage = new CompletePage(page);

  // Act: Log in and add a backpack to the cart
  await loginPage.goto();
  await loginPage.login('visual_user', 'secret_sauce');
  await inventoryPage.addBackpackToCart();

  // Assert: Verify inventory page and cart badge
  await expect(page).toHaveURL(/inventory/);
  await inventoryPage.verifyInventoryTitle();
  await inventoryPage.verifyInventoryItemsCount();
  await inventoryPage.verifyBackpackAddedToCart();
  await inventoryPage.verifyCartBadgeCount();

  // Act: Open the shopping cart
  await inventoryPage.clickCartBadge();

  // Assert: Verify cart page and selected item
  await cartPage.verifyCartPageURL();
  await cartPage.verifyBackpackInTheCart();
  await cartPage.verifyItemQuantity();
  await cartPage.verifyCheckoutButtonVisible();

  // Act: Proceed to checkout
  await cartPage.clickCheckout();

  // Assert: Verify checkout information page
  await checkoutPage.verifyCheckoutStepOneURL();
  // await checkoutPage.verifyInputFieldsInfo();
  await checkoutPage.verifyInputFieldsVisible();

  // Act: Enter customer information and continue
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
  await checkoutPage.clickContinueButton();

  // Assert: Verify checkout overview page
  await checkoutOverviewPage.verifyCheckoutOverviewURL();
  await checkoutOverviewPage.verifyBackpackItemName();
  await checkoutOverviewPage.verifyFinishButtonVisible();

  // Act: Complete the order
  await checkoutOverviewPage.clickFinishButton();

  // Assert: Verify order confirmation page
  await completePage.verifyCompletePageURL();
  await completePage.verifyThankYouMessageVisible();
  await completePage.verifyBackToHomeButtonVisible();

  // Act: Return to inventory page
  await completePage.clickBackToHomeButton();

  // Assert: Verify user is redirected back to inventory
  await inventoryPage.verifyInventoryURL();
});

//==============Negative Test===========================

test('Login fails with invalid password', async ({ page }) =>{
  // Arrange
  const loginPage = new LoginPage(page);

  // Act: Attempt to log in with an invalid password
  await loginPage.goto();
  await loginPage.login('visual_user', 'wrong_password');

  // Assert: Verify error message is displayed
  await loginPage.verifyInvalidCredentialsError();
  
})





  

  





