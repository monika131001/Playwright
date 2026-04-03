const { expect } = require("@playwright/test");

async function loginAndGoToBooking(page, email, password) {
  const BASE_URL = "https://eventhub.rahulshettyacademy.com";
  await page.goto(`${BASE_URL}/login`);
  await page.locator("[href*='/register']").click();
  await expect(page.getByText("Create your account")).toBeVisible();
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.locator("#register-password").fill(password);
  await page.getByPlaceholder("Repeat your password").fill(password);
  await page.locator("#register-btn").click();
  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();
}

async function bookTicket(page, BASE_URL) {
  await page.goto(`${BASE_URL}/events`);
  await page
    .locator("[data-testid='event-card']")
    .first()
    .locator("[data-testid='book-now-btn']")
    .click();
  await page.getByLabel("Full Name").fill("Akshay Khanna");
  await page.locator("#customer-email").fill("akshay@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
  await page.locator(".confirm-booking-btn").click();
}

async function myBookings(page, BASE_URL) {
  await page.locator("#nav-bookings").click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole("button", { name: "View Details" }).first().click();
  await expect(page.locator("h2", { name: "Booking Information" })).toHaveText(
    "Booking Information",
  );
}

async function validateBookingRef(page) {
  const bookingRef = await page.locator(".font-mono").first().innerText();
  const eventTitle = await page.locator("h1").innerText();
  const firstCharBooking = bookingRef[0];
  expect(eventTitle.startsWith(firstCharBooking)).toBeTruthy();
}

async function refundEligibility(page) {
  const spinner = page.locator("#check-refund-btn");
  await spinner.click();
  await expect(spinner).toBeVisible();
  await expect(spinner).toBeHidden({ timeout: 6000 });
}

async function refundResult(page) {
  const refundResult = page.locator("#refund-result");
  await expect(refundResult).toBeVisible();
  await expect(refundResult).toContainText("Eligible for refund");
  await expect(refundResult).toContainText(
    " Single-ticket bookings qualify for a full refund",
  );
}

async function ticketIncrement(page) {
  await page.goto(`${BASE_URL}/events`);
  await page
    .getByTestId("event-card")
    .first()
    .getByTestId("book-now-btn")
    .click();
  const plus = page.locator('button:has-text("+")');
  await plus.click();
  await plus.click();
}

module.exports = {
  loginAndGoToBooking,
  bookTicket,
  myBookings,
  validateBookingRef,
  refundEligibility,
  refundResult,
  ticketIncrement,
};
