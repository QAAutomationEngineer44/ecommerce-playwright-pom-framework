const {test, expect} = require('@playwright/test'); //import the required libararies
const { HomePage } = require('../pages/HomePage');

test('TC01_LaunchApplication', async ({page}) =>
{
const home = new HomePage(page);
await home.goto();
await expect(page).toHaveTitle("Your store of fun");

});
