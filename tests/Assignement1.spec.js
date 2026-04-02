const { test, expect } = require("@playwright/test");

test.only("Assignment 1", async ({ page }) => {
  const BASE_URL = "https://eventhub.rahulshettyacademy.com";
  const eventTitle = `Test Event ${Date.now()}`;

  // ---------- USER REGISTRATION ----------
  await page.goto(`${BASE_URL}/login`);
  await page.locator("[href*='/register']").click();

  await expect(page.getByText("Create your account")).toBeVisible();
  await page.getByPlaceholder("you@email.com").fill("abc@gmail.com");
  await page.locator("#register-password").fill("Abcd@123");
  await page.getByPlaceholder("Repeat your password").fill("Abcd@123");
  await page.locator("#register-btn").click();

  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();

  // ---------- CREATE EVENT (ADMIN) ----------
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

  // ---------- NAVIGATE TO EVENTS ----------
  await page.locator("#nav-events").click();
  const eventCards = page.locator("#event-card");
  await expect(eventCards.first()).toBeVisible();
  const targetCard = eventCards.filter({ hasText: eventTitle }).first();
  const seatStringBefore = await targetCard.getByText("seats").innerText();
  const seatsBeforeBooking = Number(seatStringBefore.match(/\d+/)?.[0]);
  await targetCard.locator("[data-testid='book-now-btn']").click();

  await expect(page.locator("#ticket-count")).toHaveText("1");
  await page.getByLabel("Full Name").fill("Akshay Khanna");
  await page.locator("#customer-email").fill("akshay@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
  await page.locator(".confirm-booking-btn").click();

  // ---------- VALIDATE BOOKING ----------
  const bookingRefLocator = page.locator(".booking-ref").first();
  await expect(bookingRefLocator).toBeVisible();
  const bookingRef = await bookingRefLocator.innerText();
  await page.getByRole("button", { name: "View My Bookings" }).click();

  // Navigate to bookings page
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  const cards = page.locator("#booking-card");
  await expect(cards.first()).toBeVisible();

  // Find our booking using reference
  const myCard = cards.filter({ hasText: bookingRef }).first();
  await expect(myCard).toBeVisible();
  await expect(myCard).toContainText(eventTitle);

  // ---------- VERIFY SEATS AFTER BOOKING ----------
  await page.goto(`${BASE_URL}/events`);
  await expect(eventCards.first()).toBeVisible();
  await expect(eventCards.filter({ hasText: eventTitle })).toBeVisible();
  const seatStringAfter = await targetCard.getByText("seats").innerText();
  const seatsAfterBooking = Number(seatStringAfter.match(/\d+/)?.[0]);

  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
});
