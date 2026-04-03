const { test, expect } = require("@playwright/test");
const {
  registerUser,
  createEvent,
  getSeatCount,
  bookEvent,
  validateBooking,
  validateBookingCard,
  verifySeats,
} = require("../utils/helpers");

test.only("Assignment 1", async ({ page }) => {
  const BASE_URL = "https://eventhub.rahulshettyacademy.com";
  const eventTitle = `Test Event ${Date.now()}`;

  await registerUser(page, `email${Date.now()}@gmail.com`, "Password@123");
  await expect(
    page.getByRole("link", { name: "Browse Events →" }),
  ).toBeVisible();

  await createEvent(page, eventTitle);
  const { seatsBeforeBooking, eventCards, targetCard } = await getSeatCount(page,eventTitle,
  );
  await bookEvent(page);
  const { bookingRef } = await validateBooking(page);
  await validateBookingCard(page, BASE_URL, bookingRef, eventTitle);

  await verifySeats(page, BASE_URL, seatsBeforeBooking, eventTitle);
});
