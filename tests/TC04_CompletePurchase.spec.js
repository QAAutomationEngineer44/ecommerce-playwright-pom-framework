const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { CategoryPage } = require('../pages/CategoryPage');
const { ProductPage } = require('../pages/ProductPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { LoginPage } = require('../pages/LoginPage');

test('@sanity @regression TC04_CompletePurchase', async ({ page }) => {
  const home = new HomePage(page);
  const category = new CategoryPage(page);
  const product = new ProductPage(page);
  const checkout = new CheckoutPage(page);
  const login = new LoginPage(page);

  await home.goto();
  await home.openAllLaptopsAndNotebooks();
  await category.openProductByName('HP LP3065');

  // Fix: use getDate() (day-of-month) under the hood via helper
  const deliveryDate = ProductPage.buildISODatePlusDays(5);
  await product.setDeliveryDateISO(deliveryDate);

  await product.addToCart();

  await home.goToCheckout();

  await checkout.clickLoginPage();
  await login.login('kinfu8@gmail.com', 'yk126871');

  await checkout.selectShippingAddressByIndex(1);
  await checkout.continueShipping();
  await checkout.continuePayment();
  await checkout.confirmOrder();

  await expect(checkout.orderPlacedHeading).toBeVisible();
});



