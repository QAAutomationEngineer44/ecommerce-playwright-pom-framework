class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.loginPageLink = page.getByRole('link', { name: 'login page' });

    // Checkout controls
    this.shippingAddressSelect = page.locator('#input-shipping-address');
    this.shippingMethodsButton = page.locator('#button-shipping-methods');
    this.continueButton = page.getByRole('button', { name: 'Continue' });

    this.paymentMethodsButton = page.locator('#button-payment-methods');
    this.confirmOrderButton = page.getByRole('button', { name: 'Confirm Order' });

    this.orderPlacedHeading = page.getByRole('heading', { name: 'Your order has been placed!' });
  }

  async clickLoginPage() {
    await this.loginPageLink.click();
  }

  async selectShippingAddressByIndex(index) {
    await this.shippingAddressSelect.selectOption({ index });
  }

  async continueShipping() {
    await this.shippingMethodsButton.click();
    await this.continueButton.click();
  }

  async continuePayment() {
    await this.paymentMethodsButton.click();
    await this.continueButton.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  async isOrderPlacedVisible() {
    return await this.orderPlacedHeading.isVisible();
  }
}

module.exports = { CheckoutPage };
