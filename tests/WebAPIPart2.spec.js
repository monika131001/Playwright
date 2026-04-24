//Login API

const { test, expect } = require("@playwright/test");
const path = require("node:path");

let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const emailLocator = page.locator("#userEmail");
  const passwordLocator = page.locator("#userPassword");
  const emailId = "moni13@gmail.com";
  const password = "Mn@123456";
  const loginBtn = page.locator("#login");

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await emailLocator.fill(emailId);
  await passwordLocator.fill(password);
  await loginBtn.click();
  await page.locator(".card-body h5 b").first().waitFor();
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("Login Test", async () => {
  const page = await webContext.newPage();
  const emailId = "moni13@gmail.com";
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const dropdown = page.locator(".ta-results");
  const shippingInfo = page.locator(".user__name [type='text']");
  const ordersButton = page.locator("ul .btn-custom");
  const orderIdRow = page.locator("[scope='row']");

  await page.goto("https://rahulshettyacademy.com/client");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();

  for (let i = 0; i < count; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page
    .locator("[placeholder*='Country']")
    .pressSequentially("ind", { delay: 150 });

  await dropdown.waitFor();
  const optionCount = await dropdown.locator("button").count();
  // console.log(optionCount);

  for (let i = 0; i < optionCount; i++) {
    const countryName = await dropdown.locator("button").nth(i).textContent();

    if (countryName === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await expect(shippingInfo.first()).toHaveText(emailId);
  await page.locator(".action__submit").click();

  await expect(page.locator(".hero-primary")).toContainText("Thankyou");

  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);

  await ordersButton.nth(1).click();

  const orderCount = await page.locator(".table-bordered tbody tr").count();
  console.log(orderCount);

  for (let i = 0; i < orderCount; i++) {
    console.log(orderIdRow.textContent());
    if (orderIdRow.textContent() === orderId) {
      await orderIdRow.locator(".btn-primary").click();
      break;
    }
  }
});
