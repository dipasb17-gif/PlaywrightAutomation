// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  timeout: 120000,
  expect: {
   timeout: 20000,
  },
  reporter: 'html',
  use: {
   browserName: 'chromium',
   headless: true,
   screenshot: 'on',
   trace: 'on',
   actionTimeout: 30000,
   navigationTimeout: 30000,
  },
};

module.exports = config;
