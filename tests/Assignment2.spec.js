const { test } = require("@playwright/test");
const {
  loginAndGoToBooking,
  bookTicket,
  myBookings,
  validateBookingRef,
  refundEligibility,
  refundResult,
  ticketIncrement,
  validateResult,
} = require("./utils/helpersAss2");

test("Single ticket booking is eligible for refund", async ({ page }) => {
  const name = "Test User";
  const email = `test${Date.now()}@gmail.com`;
  const BASE_URL = "https://eventhub.rahulshettyacademy.com";

  await loginAndGoToBooking(page, email, "Password@123");
  await bookTicket(page, BASE_URL, name, email);
  await myBookings(page, BASE_URL);
  await validateBookingRef(page);
  await refundEligibility(page);
  await refundResult(page);
});

test("Group ticket booking is NOT eligible for refund", async ({
  page,
}) => {
  const name = "Test User";
  const email = `test${Date.now()}@gmail.com`;
  const BASE_URL = "https://eventhub.rahulshettyacademy.com";
  await loginAndGoToBooking(page, email, "Password@123");

  await ticketIncrement(page, BASE_URL, name, email);
  await myBookings(page, BASE_URL);
  await validateBookingRef(page);
  await refundEligibility(page);
  await validateResult(page);
});
