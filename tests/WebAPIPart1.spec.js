const { test, expect, request } = require("@playwright/test");
const { stat } = require("node:fs");
const { json } = require("node:stream/consumers");
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
  const apiContext = await request.newContext(); // Create a new API request context (like a mini HTTP client)
  

  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: { Authorization: token, "Content-type": "application/json" },
    },
  );
  const orderResponseJSON = await orderResponse.json();
  console.log(orderResponseJSON);
  orderId = orderResponseJSON.orders[0];
});

test("Place the Order", async ({ page }) => {
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
