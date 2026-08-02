class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Delivery date input is stable by id in your original test
    this.deliveryDateInput = page.locator('#input-option-225');
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });

    // Heart icon used in wishlist test
    this.addToWishListIcon = page.locator("//div//button//i[@class='fa-solid fa-heart']");

    // Success messages (contains 'Success' text)
    this.successAlert = page.locator("div.alert.alert-success.alert-dismissible");
  }

  /**
   * Sets delivery date in YYYY-MM-DD format.
   */
  async setDeliveryDateISO(yyyyMmDd) {
    await this.deliveryDateInput.fill(yyyyMmDd);
  }

  /**
   * Helper: today + N days in YYYY-MM-DD format
   */
  static buildISODatePlusDays(days) {
    const d = new Date();
    d.setDate(d.getDate() + days);

    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = String(d.getFullYear());

    return `${yyyy}-${mm}-${dd}`;
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async addToWishList() {
    await this.addToWishListIcon.click();
  }

  async expectSuccessContains(expect, text) {
    await expect(this.successAlert).toBeVisible();
    await expect(this.successAlert).toContainText(text);
  }
}

module.exports = { ProductPage };
