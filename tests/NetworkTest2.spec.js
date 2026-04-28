const { test } = require("@playwright/test");

test("Security test request interception", async ({ page }) => {
  //Login and reach orders page
  const emailLocator = page.locator("#userEmail");
  const passwordLocator = page.locator("#userPassword");
  const emailId = "moni13@gmail.com";
  const password = "Mn@123456";
  const loginBtn = page.locator("#login");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await emailLocator.fill(emailId);
  await passwordLocator.fill(password);
  await loginBtn.click();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",

    async (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6761cd61e2b5443b1ff79421",
      }),
  );
  await page.locator("button:has-text('View')").first().click();
  await page.pause();
});
