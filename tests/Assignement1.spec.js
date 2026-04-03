const { test, expect } = require("@playwright/test");
const {
  registerUser,
  createEvent,
  getSeatCount,
  bookTicket,
  validateBooking,
  validateBookingCard,
  verifySeats,
} = require("../utils/helpersAss1");

test.only("Assignment 1", async ({ page }) => {
  const BASE_URL = "https://eventhub.rahulshettyacademy.com";
  const eventTitle = `Test Event ${Date.now()}`;

  await registerUser(page, `email${Date.now()}@gmail.com`, "Password@123");
 

  await createEvent(page, eventTitle);
  const { seatsBeforeBooking, eventCards, targetCard } = await getSeatCount(page,eventTitle,
  );
  await bookTicket(page);
  const { bookingRef } = await validateBooking(page);
  await validateBookingCard(page, BASE_URL, bookingRef, eventTitle);

  await verifySeats(page, BASE_URL, seatsBeforeBooking, eventTitle);
});
