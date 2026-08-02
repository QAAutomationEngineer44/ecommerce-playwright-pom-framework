class AccountPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.myAccountHeading = page.locator("//h1[normalize-space()='My Account']");
  }

  async isMyAccountVisible() {
    return await this.myAccountHeading.isVisible();
  }
}

module.exports = { AccountPage };
