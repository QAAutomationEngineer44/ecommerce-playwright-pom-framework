class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Header / top navigation
    this.myAccountIcon = page.locator('.fa-solid.fa-user');
    this.laptopsAndNotebooksMenu = page.getByRole('link', { name: 'Laptops & Notebooks', exact: true });
    this.showAllLaptopsAndNotebooks = page.getByRole('link', { name: 'Show All Laptops & Notebooks' });
    this.checkoutLink = page.getByRole('link', { name: ' Checkout' });

    // My Account dropdown links
    this.loginLink = page.getByRole('link', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://cloudberrystore.services/');
  }

  async openMyAccount() {
    // In your original tests you used the user icon (more stable than role text)
    await this.myAccountIcon.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async openAllLaptopsAndNotebooks() {
    //await this.laptopsAndNotebooksMenu.hover();
    await this.laptopsAndNotebooksMenu.click();
    await this.showAllLaptopsAndNotebooks.click();
  }

  async goToCheckout() {
    await this.checkoutLink.click();
  }
}

module.exports = { HomePage };
