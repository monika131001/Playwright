import { chromium, defineConfig, devices } from "@playwright/test";
import { on } from "node:cluster";
import { trace } from "node:console";

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
    screenshot: "on",
    trace: "on",
  },
};

module.exports = config;