const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("./utils/ApiUtils");
const loginPayload = {
  userEmail: "moni13@gmail.com",
  userPassword: "Mn@123456",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);  
  response = await apiUtils.createOrder(orderPayload);  
});

test("Place the Order", async ({ page }) => {
  // Adds token to browser storage before page loads, Skips login UI
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("[routerlink*='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (response.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
});
