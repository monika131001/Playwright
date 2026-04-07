const { test, expect, request } = require("@playwright/test");
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
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login", // Send POST request to login API with user credentials
    { data: loginPayload },
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJSON = await loginResponse.json();
  token = loginResponseJSON.token;
  console.log(token);

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
  const ordersButton = page.locator("ul .btn-custom");
  const orderIdRow = page.locator("[scope='row']");

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.pause();

  // const emailId = "moni13@gmail.com";
  // const products = page.locator(".card-body");
  // const productName = "ZARA COAT 3";
  // const dropdown = page.locator(".ta-results");
  // const shippingInfo = page.locator(".user__name [type='text']");

  // await page.locator(".card-body h5 b").first().waitFor();
  // const titles = await page.locator(".card-body b").allTextContents();
  // console.log(titles);

  // const count = await products.count();

  // for (let i = 0; i < count; i++) {
  //   if ((await products.nth(i).locator("b").textContent()) === productName) {
  //     await products.nth(i).locator("text= Add To Cart").click();
  //     break;
  //   }
  // }
  // await page.locator("[routerlink*='cart']").click();
  // await page.locator("div li").first().waitFor();
  // const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  // expect(bool).toBeTruthy();

  // await page.locator("text=Checkout").click();
  // await page
  //   .locator("[placeholder*='Country']")
  //   .pressSequentially("ind", { delay: 150 });

  // await dropdown.waitFor();
  // const optionCount = await dropdown.locator("button").count();
  // // console.log(optionCount);

  // for (let i = 0; i < optionCount; i++) {
  //   const countryName = await dropdown.locator("button").nth(i).textContent();

  //   if (countryName === " India") {
  //     await dropdown.locator("button").nth(i).click();
  //     break;
  //   }
  // }

  // await expect(shippingInfo.first()).toHaveText(emailId);
  // await page.locator(".action__submit").click();

  // await expect(page.locator(".hero-primary")).toContainText("Thankyou");

  // const orderId = await page
  //   .locator(".em-spacer-1 .ng-star-inserted")
  //   .textContent();
  // console.log(orderId);

  await ordersButton.nth(1).click();

  const orderCount = await page.locator(".table-bordered tbody tr").count();
  console.log("Order Count = "+orderCount);

  for (let i = 0; i < orderCount; i++) {
    console.log(await orderIdRow.textContent());
    if (await orderIdRow.textContent() === orderId) {
      await orderIdRow.locator(".btn-primary").click();
      break;
    }
  }
});
