# Ecommerce Playwright POM Framework

A scalable end-to-end test automation framework for an ecommerce application using **Playwright**, **JavaScript**, and the **Page Object Model (POM)** design pattern.

This project automates common ecommerce workflows such as launching the application, logging in, adding products to the cart, completing a purchase, managing a wish list, and registering as an affiliate.

## Application Under Test

**CloudBerry Store**

https://cloudberrystore.services/

## Technologies Used

* JavaScript
* Node.js
* Playwright
* Playwright Test
* Page Object Model
* JSON test data
* HTML test reports
* Git and GitHub

## Framework Features

* Page Object Model design pattern
* Reusable page classes and methods
* Separation of test logic and page locators
* Cross-browser testing
* Data-driven testing support
* Automatic waits provided by Playwright
* Screenshots, videos, and traces for failed tests
* HTML test reporting
* Parallel test execution
* Easy framework maintenance and scalability

## Test Scenarios

The framework contains automated tests for the following ecommerce workflows:

| Test Case | Description                        |
| --------- | ---------------------------------- |
| TC01      | Launch the ecommerce application   |
| TC02      | Log in with valid credentials      |
| TC03      | Add a product to the shopping cart |
| TC04      | Complete a product purchase        |
| TC05      | Add a product to the wish list     |
| TC06      | Register for an affiliate account  |

## Project Structure

```text
ecommerce-playwright-pom-framework/
│
├── pages/
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── CategoryPage.js
│   ├── ProductPage.js
│   ├── CheckoutPage.js
│   └── AccountPage.js
│
├── tests/
│   ├── TC01_LaunchApplication.spec.js
│   ├── TC02_Login.spec.js
│   ├── TC03_AddToCart.spec.js
│   ├── TC04_CompletePurchase.spec.js
│   ├── TC05_AddToWishList.spec.js
│   └── TC06_AddAffiliate.spec.js
│
├── test-data/
│   └── testData.json
│
├── utils/
│   └── dateUtils.js
│
├── playwright-report/
├── test-results/
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Page Object Model

The Page Object Model separates page locators and page actions from the test files.

For example, the `HomePage` class contains the locators and methods used on the home page:

```javascript
class HomePage {
    constructor(page) {
        this.page = page;
        this.myAccountLink = page.getByRole('link', {
            name: 'My Account'
        });
        this.loginLink = page.getByRole('link', {
            name: 'Login'
        });
    }

    async navigateToApplication() {
        await this.page.goto('https://cloudberrystore.services/');
    }

    async openLoginPage() {
        await this.myAccountLink.click();
        await this.loginLink.click();
    }
}

module.exports = { HomePage };
```

The test file imports and uses the page object:

```javascript
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test('TC01_LaunchApplication', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigateToApplication();

    await expect(page).toHaveTitle(/Your Store/i);
});
```

## Prerequisites

Install the following software before running the project:

* Node.js
* npm
* Git
* Visual Studio Code or another code editor

Verify the installations:

```bash
node --version
npm --version
git --version
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/ecommerce-playwright-pom-framework.git
```

### 2. Open the project folder

```bash
cd ecommerce-playwright-pom-framework
```

### 3. Install project dependencies

```bash
npm install
```

### 4. Install Playwright browsers

```bash
npx playwright install
```

## Running the Tests

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/TC01_LaunchApplication.spec.js
```

### Run tests using Chromium

```bash
npx playwright test --project=chromium
```

### Run tests using Firefox

```bash
npx playwright test --project=firefox
```

### Run tests using WebKit

```bash
npx playwright test --project=webkit
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run tests using Playwright UI mode

```bash
npx playwright test --ui
```

### Run tests in debug mode

```bash
npx playwright test --debug
```

## Running Tests by Title

Use the `--grep` option to run a test using its title:

```bash
npx playwright test --grep "TC04_CompletePurchase"
```

## Test Reports

Playwright automatically generates an HTML report after the test execution.

Open the report with:

```bash
npx playwright show-report
```

The report includes:

* Passed tests
* Failed tests
* Test execution time
* Error messages
* Screenshots
* Videos
* Traces

The available attachments depend on the settings in `playwright.config.js`.

## Example Playwright Configuration

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',

    fullyParallel: true,

    retries: 1,

    reporter: [
        ['list'],
        ['html', { open: 'never' }]
    ],

    use: {
        baseURL: 'https://cloudberrystore.services/',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry'
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox']
            }
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari']
            }
        }
    ]
});
```

## Test Data

Test data can be stored separately in a JSON file to avoid hardcoding values directly in the test scripts.

Example `test-data/testData.json`:

```json
{
    "application": {
        "baseUrl": "https://cloudberrystore.services/"
    },
    "products": {
        "laptop": "HP LP3065"
    },
    "checkout": {
        "quantity": 1,
        "deliveryDaysFromToday": 5
    }
}
```

Import the test data into a test:

```javascript
const testData = require('../test-data/testData.json');

test('Open application', async ({ page }) => {
    await page.goto(testData.application.baseUrl);
});
```

## Environment Variables

Sensitive information such as usernames and passwords should not be stored directly in the source code.

Create a `.env` file:

```env
USER_EMAIL=your-email@example.com
USER_PASSWORD=your-password
```

Add `.env` to `.gitignore`:

```text
.env
node_modules/
playwright-report/
test-results/
```

Install the `dotenv` package:

```bash
npm install dotenv
```

Load environment variables in the test:

```javascript
require('dotenv').config();

const email = process.env.USER_EMAIL;
const password = process.env.USER_PASSWORD;
```

Do not commit your real login credentials to GitHub.

## Example Complete-Purchase Workflow

The complete-purchase test performs the following steps:

1. Launches the application.
2. Navigates to **Laptops & Notebooks**.
3. Opens all laptop products.
4. Selects the **HP LP3065** product.
5. Sets a future delivery date.
6. Adds the product to the cart.
7. Navigates to checkout.
8. Logs in to the application.
9. Selects a shipping address.
10. Continues through the shipping and payment steps.
11. Confirms the order.
12. Verifies the successful order message.

Example assertion:

```javascript
await expect(
    page.getByRole('heading', {
        name: 'Your order has been placed!'
    })
).toBeVisible();
```

## Useful Playwright Commands

Generate a test using Playwright Codegen:

```bash
npx playwright codegen https://cloudberrystore.services/
```

List all detected tests:

```bash
npx playwright test --list
```

Run the last failed tests:

```bash
npx playwright test --last-failed
```

View a Playwright trace:

```bash
npx playwright show-trace test-results/trace.zip
```

## Benefits of This Framework

* Reduces duplicated code
* Improves test readability
* Centralizes page locators
* Makes locator maintenance easier
* Supports reusable test actions
* Supports multiple browsers
* Allows test data to be managed separately
* Makes the framework easier to expand

## Future Improvements

Possible future enhancements include:

* Add API testing with Playwright
* Add GitHub Actions continuous integration
* Add accessibility testing
* Add visual regression testing
* Add additional negative test scenarios
* Add test execution by environment
* Add custom logging
* Add Allure reporting
* Add reusable fixtures
* Add automated test-data generation

## Continuous Integration

The framework can be integrated with GitHub Actions so that tests run automatically when code is pushed or a pull request is created.


## Author

**Yonas Kinfu**

QA Automation Engineer with experience in:

* Playwright
* JavaScript and TypeScript
* Selenium WebDriver
* Java
* TestNG
* Appium
* API testing
* Page Object Model
* Data-driven testing
* Git and GitHub

## License

This project is created for learning, portfolio development, and QA automation practice.
