const { test } = require("@playwright/test");

test("Security test request intception", async ({page}) => {
//Login and reach orders page

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",

async (route) => route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id="})
)
await page.locator("button:has-text('View')").click();


})