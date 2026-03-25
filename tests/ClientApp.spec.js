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

test.only("Login Test", async ({ page }) => {
  const emailLocator = page.locator("#userEmail");
  const passwordLocator = page.locator("#userPassword");
  const emailId = "moni13@gmail.com";
  const password = "Mn@123456";
  const loginBtn = page.locator("#login");
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await emailLocator.fill(emailId);
  await passwordLocator.fill(password);
  await loginBtn.click();
  await page.locator(".card-body h5 b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  // console.log(titles);

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
});
