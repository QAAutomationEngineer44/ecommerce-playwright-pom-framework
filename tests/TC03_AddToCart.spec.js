const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { CategoryPage } = require('../pages/CategoryPage');
const { ProductPage } = require('../pages/ProductPage');

test('TC03_AddToCart', async ({ page }) => {
  const home = new HomePage(page);
  const category = new CategoryPage(page);
  const product = new ProductPage(page);

  await home.goto();
  await home.openAllLaptopsAndNotebooks();

  await category.openProductByName('HP LP3065');

  const deliveryDate = ProductPage.buildISODatePlusDays(5);
  await product.setDeliveryDateISO(deliveryDate);

  await product.addToCart();
  await product.expectSuccessContains(expect, 'Success');
});