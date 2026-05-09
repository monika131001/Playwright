const { test, expect } = require("@playwright/test");
const { TIMEOUT } = require("node:dns");
const { request } = require("node:http");

test("Browser Context Test", async ({ page }) => {
  // page.route('**/*.css', route => route.abort());
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signIn = page.locator("[type='submit']");
  const cardTitles = page.locator(".card-body a");
  const errMessage = page.locator("[style*='block']");

  // Listen to all network requests made by browser and print request URLs in console
  page.on("request", (request) => console.log(request.url()));

  // Listen to all server responses received by browser and print response URL with status code
  page.on("response", (response) =>
    console.log(response.url(), response.status()),
  );

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
  //Create a new browser context and open a new page/tab inside the context
  const context = await browser.newContext();
  const page = await context.newPage();

  const Link = page.locator("[href*='documents-request']");
  const userName = page.locator("#username");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Wait for new page event and click the link simultaneously Promise.all is used to avoid missing the child window event
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
});
