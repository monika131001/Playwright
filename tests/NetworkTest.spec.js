const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("./utils/ApiUtils");
const loginPayload = {
  userEmail: "moni13@gmail.com",
  userPassword: "Mn@123456",
};
const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960ea76c941646b7a8b3dd5" }],
};
const fakePayloadOrders = { data: [], message: "No Orders" };

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

  // Set up network interception: catch requests matching this URL and handle them manually
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", //intercept any request hitting this endpoint
    async (route) => {
      const response = await page.request.fetch(route.request()); // Send the same request manually to the real backend and wait for its response
      let body = JSON.stringify(fakePayloadOrders);

      // Fulfill the intercepted request with custom response
      route.fulfill({
        response,           // Use original response details (status code, headers, etc.)
        body,               // Replace the actual response body with your fake data
      });
    },
  );

  await page.locator("[routerlink*='/dashboard/myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );
  console.log(await page.locator(".mt-4").textContent());
});
