import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'playwright',
  testMatch: /.*\.spec\.ts/,
  testIgnore: [
    '**/*.test.{ts,tsx}',
    '**/*.spec.{tsx}',
    'src/**',
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev -- --webpack',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
