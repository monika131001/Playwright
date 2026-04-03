const { expect } = require("@playwright/test");

async function registerUser(page, email, password) {
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

async function createEvent(page, eventTitle) {
  const BASE_URL = "https://eventhub.rahulshettyacademy.com";
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
}

async function getSeatCount(page, eventTitle) {
  await page.locator("#nav-events").click();
  const eventCards = page.locator("#event-card");
  await expect(eventCards.first()).toBeVisible();
  const targetCard = eventCards.filter({ hasText: eventTitle }).first();
  const seatStringBefore = await targetCard.getByText("seats").innerText();
  const seatsBeforeBooking = Number(seatStringBefore.match(/\d+/)?.[0]);
  await targetCard.locator("[data-testid='book-now-btn']").click();
  return { seatsBeforeBooking, eventCards, targetCard };
}

async function bookTicket(page) {
  await expect(page.locator("#ticket-count")).toHaveText("1");
  await page.getByLabel("Full Name").fill("Akshay Khanna");
  await page.locator("#customer-email").fill("akshay@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("1234567890");
  await page.locator(".confirm-booking-btn").click();
}

async function validateBooking(page) {
  const bookingRefLocator = page.locator(".booking-ref").first();
  await expect(bookingRefLocator).toBeVisible();
  const bookingRef = await bookingRefLocator.innerText();
  await page.getByRole("button", { name: "View My Bookings" }).click();
  return { bookingRef };
}

async function validateBookingCard(page, BASE_URL, bookingRef, eventTitle) {
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  const cards = page.locator("#booking-card");
  await expect(cards.first()).toBeVisible();
  const myCard = cards.filter({ hasText: bookingRef }).first();
  await expect(myCard).toBeVisible();
  await expect(myCard).toContainText(eventTitle);
}

async function verifySeats(page, BASE_URL, seatsBeforeBooking, eventTitle) {
  await page.goto(`${BASE_URL}/events`);
  const eventCards = page.locator("#event-card");
  await expect(eventCards.first()).toBeVisible();

  const targetCard = eventCards.filter({ hasText: eventTitle }).first();
  await expect(targetCard).toBeVisible();

  const seatStringAfter = await targetCard.getByText("seats").innerText();
  const seatsAfterBooking = Number(seatStringAfter.match(/\d+/)?.[0]);
  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
}

module.exports = {
  registerUser,
  createEvent,
  getSeatCount,
  bookTicket,
  validateBooking,
  validateBookingCard,
  verifySeats,
};
