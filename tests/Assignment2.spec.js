const { test, expect } = require("@playwright/test");

test("Assignment 2", ({ page }) => {
    const BASE_URL = "https://eventhub.rahulshettyacademy.com";
    
    page.goto(`${BASE_URL}/events`);
    
});
