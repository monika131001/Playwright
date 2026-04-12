const { test, expect } = require("@playwright/test");

test.only("Popup validations", async ({ page }) => {
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
