import { chromium, defineConfig, devices } from "@playwright/test";

const config = {
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 50000,
  },
  reporter: "html",

  use: {
    browserName: "chromium",
    headless: false,
  },
};

module.exports = config;
