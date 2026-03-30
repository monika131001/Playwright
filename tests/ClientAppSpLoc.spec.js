const { test, expect } = require("@playwright/test");

test("Register Test", async ({ page }) => {
  const registerBtn = page.locator(".text-reset");
  const firstName = page.locator("#firstName");
  const lastName = page.locator("#lastName");
  const email = page.locator("#userEmail");
  const mobile = page.locator("#userMobile");
  const occupationDropdown = page.locator(".form-group select");
  const password = page.locator("#userPassword");
  const confirmPassword = page.locator("#confirmPassword");
  const checkbox = page.locator("[type='checkbox']");
  const submitBtn = page.locator("[type='submit']");
  const emailId = `moni13@gmail.com`;
  const pass = "1234567@aA8";

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await registerBtn.click();
  await firstName.fill("Monika");
  await lastName.fill("Avhad");
  await email.fill(emailId);
  await mobile.fill("5857904652");
  await occupationDropdown.selectOption({ label: "Engineer" });
  await page.getByLabel("Female").check();
  await password.fill(pass);
  await confirmPassword.fill(pass);
  await checkbox.check();
  await submitBtn.click();
});

test("Login Test", async ({ page }) => {
  const emailId = "moni13@gmail.com";
  const password = "Mn@123456";
  const dropdown = page.locator(".ta-results");
  const shippingInfo = page.locator(".user__name [type='text']");
  const ordersButton = page.locator("ul .btn-custom");
  const orderIdRow = page.locator("[scope='row']");

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.getByPlaceholder("email@example.com").fill(emailId);
  await page.getByPlaceholder("enter your passsword").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.locator(".card-body h5 b").first().waitFor();
  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: " Add To Cart" })
    .click();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: " Cart" })
    .click();
  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).click();

  await page
    .getByPlaceholder("Select Country")
    .pressSequentially("ind", { delay: 150 });

  await expect(page.getByText(emailId)).toBeVisible();
  await page.getByRole("button", { name: "India" }).nth(1).click();
  await page.getByText("PLACE ORDER").click();

  await expect(page.getByText("Thankyou for the order.")).toBeVisible();

  const orderId = JSON.parse(
    decodeURIComponent(page.url().split("prop=")[1]),
  )[0];
  /* const encodedProp = page.url().split("prop=")[1];  const decodedProp = decodeURIComponent(encodedProp);const propArray = JSON.parse(decodedProp)[0];const orderId = propArray[0];*/
  await expect(page.getByRole("table").getByText(orderId)).toBeVisible();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "ORDERS" })
    .click();

  const orderRow = await expect(page.getByRole("row").filter({ hasText: orderId })).toContainText(orderId);

  await orderRow.getByRole("button", { name: "View" }).click();
  await page.waitForSelector(".email-container");

  await expect(page.locator(".title")).toHaveText("ZARA COAT 3");
  await expect(page.locator(".col-text")).toHaveText(orderId);
});
