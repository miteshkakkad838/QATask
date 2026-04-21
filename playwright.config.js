
// @ts-check
import { defineConfig, devices } from '@playwright/test';

/* -------------------------------------------------------------------------- */
/*                               REPORT SETUP                                 */
/* -------------------------------------------------------------------------- */

const now = new Date();
const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
  now.getDate()
).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(
  now.getMinutes()
).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;

/* -------------------------------------------------------------------------- */
/*                               CONFIG EXPORT                                 */
/* -------------------------------------------------------------------------- */

export default defineConfig({

  /* Timeout for each test in ms 10000 = 10 seconds */
  timeout: 100_000,

  testDir: './tests',

  /* Run test files in parallel */
  fullyParallel: false,

  /* Fail CI if test.only is committed */
  forbidOnly: !!process.env.CI,

  /* Retry only on CI */
  retries: process.env.CI ? 2 : 0,

  /* Workers */
  workers: process.env.CI ? 1 : undefined,

  /* ----------------------------- REPORTER -------------------------------- */
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  /* ------------------------------ USE ------------------------------------- */
  use: {
    baseURL: process.env.STORE_URL,
    permissions: ['geolocation'],
    trace: 'on',
    screenshot: 'on',
    video: 'on',
  },

  /* ---------------------------- PROJECTS ---------------------------------- */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Enable when needed
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});

