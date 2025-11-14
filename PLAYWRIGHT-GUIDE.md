# Playwright Testing Guide

**Personal reference guide for implementing Playwright in future projects**

---

## 📋 Table of Contents

- [What is Playwright?](#what-is-playwright)
- [Initial Setup](#initial-setup)
- [Basic Test Structure](#basic-test-structure)
- [Writing Your First Test](#writing-your-first-test)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [CI/CD Integration](#cicd-integration)
- [Advanced Topics](#advanced-topics)
- [Code Examples](#code-examples)

---

## What is Playwright?

Playwright is an end-to-end (E2E) testing framework that automates browser interactions to test your web applications. It simulates real user behavior like clicking, typing, and navigating through your app.

**Key Benefits:**

- Tests work across multiple browsers (Chrome, Firefox, Safari)
- Works with localhost and production URLs
- Catches bugs before they reach production
- Provides confidence that features work as expected

---

## Initial Setup

### Step 1: Install Playwright

Run the initialization command in your project root:

```bash
npm init playwright@latest
```

### Step 2: Installation Prompts

During setup, you'll be asked:

- **TypeScript or JavaScript?** - Choose your preference
- **Where to put tests?** - Default is `tests/` folder (recommended)
- **Add GitHub Actions workflow?** - Choose `Yes` for CI/CD (explained below)
- **Install Playwright browsers?** - Choose `Yes`

### Step 3: What Gets Created

- `tests/` folder - Where your test files live
- `playwright.config.ts` - Configuration file
- `tests/example.spec.ts` - Example test file to learn from
- `.github/workflows/playwright.yml` - CI/CD workflow (if you chose to add it)

---

## Basic Test Structure

Every Playwright test follows the **AAA pattern**:

1. **Arrange** - Navigate to the page you want to test
2. **Act** - Perform actions (click, type, select, etc.)
3. **Assert** - Verify expectations (check if something is visible, has correct text, etc.)

**Core Components:**

- `test('descriptive title', async ({ page }) => {})` - Creates a test with a title
- `page.goto(URL)` - Navigate to a page (works with localhost!)
- `page.getByRole()`, `page.getByLabel()`, etc. - Find elements on the page
- `expect(...).toBe...()` - Assert that something is true

**"Asserting state against expectations"** means checking if the actual result matches what you expected to happen.

---

## Writing Your First Test

### For Localhost Apps

Your app needs to be running before tests execute. Navigate to localhost URLs just like any other URL:

```
await page.goto('http://localhost:5173/');
```

### Test Different Routes

Each test can navigate to different parts of your app:

- Homepage: `http://localhost:5173/`
- Settings: `http://localhost:5173/settings`
- Specific pages: `http://localhost:5173/lists/123`

### Pro Tip: Use Base URL

Configure a base URL in `playwright.config.ts` so you don't repeat localhost URLs in every test. Then you can use relative paths like `page.goto('/')` or `page.goto('/settings')`.

---

## Configuration

### playwright.config.ts

Main configuration file for:

- Base URL (to avoid repeating localhost URLs)
- Which browsers to test on
- Timeout settings
- Screenshot/video recording options
- Test directory location

**See:** `playwright.config.ts` for configuration examples

---

## Running Tests

### Commands

- `npx playwright test` - Run all tests
- `npx playwright test --ui` - Run tests in UI mode (interactive)
- `npx playwright test --headed` - Run with visible browser (see what's happening)
- `npx playwright test example.spec.ts` - Run specific test file
- `npx playwright show-report` - View test results report

### Before Running Tests

Make sure your application is running (e.g., `npm run dev` for Vite apps) before executing tests.

---

## CI/CD Integration

### What is GitHub Actions Workflow?

The GitHub Actions workflow is like a **"watchman"** that automatically runs your tests every time you push code or create a pull request.

**How it works:**

1. You push code to GitHub
2. GitHub Actions detects the push
3. Automatically runs all Playwright tests
4. Shows ✅ or ❌ results
5. Prevents merging if tests fail (with branch protection enabled)

### The Workflow File

Located at `.github/workflows/playwright.yml`

**What it does:**

- Installs dependencies
- Installs Playwright browsers
- Runs all tests automatically
- Uploads test reports as artifacts
- Runs on every push to main branch or on pull requests

**Benefits:**

- No need to remember to run tests manually
- Tests run in a clean environment every time
- Catches bugs before merging to main
- Provides confidence in team environments

**Note:** This is **optional but recommended** - you can still use Playwright without CI/CD for local testing only.

---

## Advanced Topics

### Topics to be Added

- [ ] Mocking API responses
- [ ] Authentication testing
- [ ] Database seeding for tests
- [ ] Visual regression testing
- [ ] Cross-browser testing strategies
- [ ] Parallel test execution
- [ ] Page Object Model (POM) pattern
- [ ] Test fixtures and hooks
- [ ] Debugging failed tests
- [ ] Handling file uploads/downloads
- [ ] Testing forms with validation
- [ ] Mobile viewport testing

---

## Code Examples

### Example Test Files

- `tests/example.spec.ts` - Basic navigation and interaction examples with detailed comments

### Future Examples

As you learn more Playwright features, add new example files here:

- `tests/auth.spec.ts` - Authentication flow testing
- `tests/forms.spec.ts` - Form submission testing
- `tests/api-mocking.spec.ts` - API mocking examples

---

## Quick Reference

### Most Common Actions

- **Navigate:** `await page.goto('/path')`
- **Click:** `await page.getByRole('button', { name: 'Submit' }).click()`
- **Type:** `await page.getByLabel('Email').fill('user@example.com')`
- **Check visibility:** `await expect(element).toBeVisible()`
- **Check text:** `await expect(element).toHaveText('Expected text')`
- **Check URL:** `await expect(page).toHaveURL('/expected-path')`

### Finding Elements (Best Practices)

Prefer using accessible selectors:

- `getByRole()` - Find by ARIA role (button, link, heading, etc.)
- `getByLabel()` - Find form inputs by their label
- `getByPlaceholder()` - Find by placeholder text
- `getByText()` - Find by visible text content

---

## Resources

- **Official Documentation:** https://playwright.dev/
- **API Reference:** https://playwright.dev/docs/api/class-playwright
- **Best Practices:** https://playwright.dev/docs/best-practices

---

_Last updated: November 14, 2025_
