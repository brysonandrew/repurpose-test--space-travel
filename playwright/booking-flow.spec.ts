import { test, expect } from "@playwright/test";

test("happy path booking flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Step 1
  await page.getByText("Mars").click();
  await page.getByLabel("Departure date").fill("2027-06-06");
  await page.getByLabel("Return date").fill("2028-01-01");
  await page.getByTestId("wizard-next").click();

  // Step 2
  await expect(
    page.getByRole("heading", { name: /^travelers$/i })
  ).toBeVisible();

  await page.locator("#fullName-0").fill("John Doe");
  await page.locator("#fullName-0").press("Tab");

  await page.locator("#age-0").fill("");
  await page.locator("#age-0").type("32");
  await page.locator("#age-0").press("Tab");

  const next = page.getByTestId("wizard-next");
  await expect(next).toBeEnabled();
  await next.click();

  // Step 3
  await expect(
    page.getByRole("heading", { name: /booking review/i })
  ).toBeVisible();

  const submit = page.getByRole("button", {
    name: /confirm and book|confirm|submit/i,
  });
  await expect(submit).toBeEnabled();
  await submit.click();

  await expect(page.getByText(/booking id/i)).toBeVisible();
});
