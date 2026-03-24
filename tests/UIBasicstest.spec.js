const { test, expect } = require("@playwright/test");
const { TIMEOUT } = require("node:dns");

test("Browser Context Test", async ({ page }) => {
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signIn = page.locator("[type='submit']");
  const cardTitles = page.locator(".card-body a");
  const errMessage = page.locator("[style*='block']");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await userName.fill("Monika");
  await password.fill("Learning@830$3mK2");
  await signIn.click();
  console.log(await errMessage.textContent());
  await expect(errMessage).toContainText("username");
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  console.log(await cardTitles.first().textContent());
  console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents(); //May return empty array if elements are not yet loaded in DOM
  console.log(allTitles);
});

test.only("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const password = page.locator("#password");

  await userName.fill("Monika");
  await password.fill("Learning@830$3mK2");

  await page.locator(".radiotextsty").last().click();
  await page.locator(".form-group select").selectOption("consult");
  await page.pause();
});
