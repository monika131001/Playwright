const { test, expect } = require("@playwright/test");

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

  // Open "My Orders" page
  await page.locator("button[routerlink*='myorders']").click();

  // Intercept request for order details API
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", //Intercept every request matching the url pattern

    // Continue request but replace original order ID with another order ID to test unauthorized access
    async (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6", //OrderId which doesn't belongs to this user
      }),
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order",
  );
});
