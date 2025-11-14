import { test, expect } from "@playwright/test";

/**
 * PLAYWRIGHT TEST STRUCTURE:
 * 1. test('title', async ({ page }) => {}) - Creates a test with a descriptive title
 * 2. Navigate - page.goto(URL) - Goes to the page where we'll run the test (works with localhost too!)
 * 3. Act - Perform actions (click, type, etc.) - What the test should DO
 * 4. Assert - expect(...).toBe...() - Verify expectations - What should HAPPEN
 *
 * This is the AAA pattern: Arrange → Act → Assert
 */

// Test 1: Verifying page metadata (title tag)
test("has title", async ({ page }) => {
  // ARRANGE: Navigate to the URL where we want to test
  // (For localhost apps, this would be something like 'http://localhost:5173/')
  await page.goto("https://playwright.dev/");

  // ASSERT: Check that the page title contains "Playwright"
  // This is "asserting the state against expectations" - verifying actual matches expected
  await expect(page).toHaveTitle(/Playwright/);
});

// Test 2: Testing user interaction and navigation
test("get started link", async ({ page }) => {
  // ARRANGE: Navigate to the starting page
  await page.goto("https://playwright.dev/");

  // ACT: Click the "Get started" link (simulating user behavior)
  // getByRole() uses accessible roles - best practice for finding elements
  await page.getByRole("link", { name: "Get started" }).click();

  // ASSERT: Verify that after clicking, we see the expected heading
  // This confirms the navigation worked and the correct page loaded
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
