const { test, expect } = require("@playwright/test");

test.only("Assignment 1", async ({ page }) => {
  const BASE_URL = "https://eventhub.rahulshettyacademy.com";
  const eventTitle = `Test Event+${Date.now()}`;

  const date = "10";
  const month = "5";
  const year = "2026";

  await page.goto(`${BASE_URL}/login`);
  await page.locator("[href*='/register']").click();
  await expect(page.getByText("Create your account")).toBeVisible();
  await page.getByPlaceholder("you@email.com").fill("45piop@gmail.com");
  await page.locator("#register-password").fill("Abcd@123");
  await page.getByPlaceholder("Repeat your password").fill("Abcd@123");
  await page.locator("#register-btn").click();
  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();

  await page.goto(`${BASE_URL}/admin/events`);
  await page.locator("#event-title-input").fill(eventTitle);
  await page
    .locator("#admin-event-form textarea")
    .fill("Filling Event form for test1");
  await page.getByLabel("City").fill("Mumbai");
  await page.getByLabel("Venue").fill("Thane, Navi Mumbai");
  await page.getByLabel("Event Date & Time").fill("2027-12-31T10:00");

  await page.getByLabel("price ($)").fill("100");
  await page.getByLabel("Total Seats").fill("50");
  await page.locator("#add-event-btn").click();

  await expect(page.getByText("Event created!")).toBeVisible();

  await page.pause();
});
