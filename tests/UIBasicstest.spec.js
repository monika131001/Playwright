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

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const userRadio = page.locator(".radiotextsty");
  const terms = page.locator("#terms");
  const Link = page.locator("[href*='documents-request']");

  await userName.fill("Monika");
  await password.fill("Learning@830$3mK2");
  await userRadio.last().click();
  await page.locator("#okayBtn").click();
  await page.locator(".form-group select").selectOption("consult");

  //Assertion
  await expect(userRadio.last()).toBeChecked();
  await terms.click();
  await expect(terms).toBeChecked();
  await terms.uncheck();
  expect(await terms.isChecked()).toBeFalsy();
  await expect(Link).toContainText("Access");

  await Link.click();
});

test("Child Window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const Link = page.locator("[href*='documents-request']");
   const userName = page.locator("#username");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    Link.click(),
  ]);
  const text = await newPage.locator(".red").textContent();

  const arrText = text.split("@");
  const domain = arrText[1].split(" ")[0];
  // console.log(domain);

 await userName.fill(domain);
 console.log(await userName.inputValue());
 page.pause();

  
});
