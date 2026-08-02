class AffiliatePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.affiliateFooterLink = page.getByRole('link', { name: 'Affiliate', exact: true });

    this.company = page.getByRole('textbox', { name: 'Company' });
    this.website = page.getByRole('textbox', { name: 'Web Site' });
    this.taxId = page.getByRole('textbox', { name: 'Tax ID' });
    this.chequePayee = page.getByRole('textbox', { name: '* Cheque Payee Name' });

    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.successAlert = page.locator("div.alert.alert-success.alert-dismissible");
  }

  async openFromFooter() {
    await this.affiliateFooterLink.click();
  }
}