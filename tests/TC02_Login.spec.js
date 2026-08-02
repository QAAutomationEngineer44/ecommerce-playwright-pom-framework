const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { AccountPage } = require('../pages/AccountPage');

// Json -> string -> js object (same as your original)
const dataset = JSON.parse(JSON.stringify(require('../utils/CloudBerryStoreTestData.json')));
const users = dataset.Sheet1;

for (const data of users) {
  test(`TC02_Login - ${data.username}`, async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);
    const account = new AccountPage(page);

    await home.goto();
    await home.openMyAccount();
    await home.clickLogin();

    await login.login(data.username, data.password);

    await expect(account.myAccountHeading).toBeVisible();
  });
}
