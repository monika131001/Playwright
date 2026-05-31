const { test, expect } = require("@playwright/test");
const path = require("node:path");

test.describe.configure({mode: 'serial'});
test(" @Web Popup validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://google.com");
  await page.goBack();
  await page.goForward();

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
  
  await page.locator("#mousehover").hover();

  const heading = page.locator('iframe[name="iframe-name"]').contentFrame();
  await heading.getByRole("link", { name: "NEW All Access plan" }).click();

  const headingText = await heading
    .getByRole("heading", { name: "Join 13,522 Happy Subscibers!" })
    .textContent();
  console.log(headingText.split(" ")[1]);
});

test("Screenshort and Visual Comparison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await (page.locator("#displayed-text")).screenshot({ path: "PartialScrrenshot.png" });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
})

test("Visual test", async ({ page }) => {
  await page.goto("https://www.google.com/");
  expect(await page.screenshot()).toMatchSnapshot('Landing.png');
})