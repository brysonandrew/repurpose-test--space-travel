import { test, expect } from '@playwright/test';

test('happy path booking flow', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByText('Mars').click();
  await page.getByLabel('Departure date').fill('2025-06-01');
  await page.getByLabel('Return date').fill('2026-01-01');
  await page.getByRole('button', { name: /next/i }).click();

  await page.getByRole('button', { name: /add traveler/i }).click();
  await page.getByLabel('Full name').fill('John Doe');
  await page.getByLabel('Age').fill('32');
  await page.getByRole('button', { name: /next/i }).click();

  await page.getByRole('button', { name: /confirm|submit/i }).click();

  await expect(page.getByText(/booking id/i)).toBeVisible();
});
