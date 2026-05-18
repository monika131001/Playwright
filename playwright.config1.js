import { chromium, defineConfig, devices } from "@playwright/test";
import { on } from "node:cluster";
import { trace } from "node:console";
import { permission } from "node:process";

const config = {
  testDir: "./tests",
  retries: 1,
  timeout: 30000,
  expect: {
    timeout: 50000,
  },
  reporter: "html",
  projects: [
    {
      name: "Safari",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "off",
        trace: "on",
        // ...devices['iPhone 11'],
      }
    },

    {
      name: "Chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        video: "retain-on-failure",
        trace: "on",
        // ignoreHttpsErrors: true,
        // permission: ['geolocation'],
        // viewport: {width: 720, height: 720  }
      },
    }
  ]
};

module.exports = config;