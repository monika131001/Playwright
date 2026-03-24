const { test, expect } = require("@playwright/test");

test("Login Test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator(".text-reset").click();
  await page.locator("#firstName").fill("Monika");
  await page.locator("#lastName").fill("Avhad");
  await page.locator("#userEmail").fill("moni323@gmail.com");
  await page.locator("#userMobile").fill("5857904652");
  await page.locator(".form-group select").selectOption({ label: "Engineer" });
  await page.getByLabel("Female").check();
  await page.locator("#userPassword").fill("Mn@123456");
  await page.locator("#confirmPassword").fill("Mn@123456");
  await page.locator("[type='checkbox']").check();
  await page.locator("[type='submit']").click();

  await page.locator(".login-wrapper button").click();
  await page.locator("#userEmail").fill("moni323@gmail.com");
  await page.locator("#userPassword").fill("Mn@123456");
  await page.locator("#login").click();
  await page.locator(".card-body h5 b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
