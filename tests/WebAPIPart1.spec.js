const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("./utils/ApiUtils");
const loginPayload = {
  userEmail: "moni13@gmail.com",
  userPassword: "Mn@123456",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }],
};

let token;
let orderId;

test.beforeAll(async () => {
  //Login API
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  apiUtils.createOrder(orderPayload);
});

test("Place the Order", async ({ page }) => {
  // const apiUtils = new APIUtils(apiContext, loginPayload);
  // const orderId = createOrder(orderPayload);

  // This script runs before the page loads
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("[routerlink*='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < rows.count; i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
});
