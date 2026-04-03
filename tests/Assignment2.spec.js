const { test, expect } = require("@playwright/test");
const {
  loginAndGoToBooking,
  bookTicket,
  myBookings,
  validateBookingRef,
  refundEligibility,
  refundResult,
  ticketIncrement
} = require("../utils/helpersAss2");

test("Single ticket booking is eligible for refund", async ({ page }) => {
  const BASE_URL = "https://eventhub.rahulshettyacademy.com";

  await loginAndGoToBooking(
    page,
    `email${Date.now()}@gmail.com`,
    "Password@123",
  );
  await bookTicket(page, BASE_URL);
  await myBookings(page, BASE_URL);
  await validateBookingRef(page);
  await refundEligibility(page);
  await refundResult(page);
});

test.only("Group ticket booking is NOT eligible for refund", async ({page}) => {
  await loginAndGoToBooking(
    page,
    `email${Date.now()}@gmail.com`,
    "Password@123",
  );

  await ticketIncrement(page);


});
