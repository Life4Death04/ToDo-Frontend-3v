// ============================================================================
// ASSERTIONS - PLAYWRIGHT TESTING
// ============================================================================
// This file covers assertion methods in Playwright
// Assertions verify that your application behaves as expected

import { test, expect, Page } from "@playwright/test";

// ============================================================================
// WHAT ARE ASSERTIONS?
// ============================================================================
/*
ASSERTIONS are statements that verify expected conditions in your tests.
They check if the actual state matches your expectations.

Example:
  await expect(page.getByRole('button')).toBeVisible();
  
  This ASSERTS that the button is visible. If it's not, the test fails.

Think of assertions as the "verify" step in testing:
1. Arrange - Set up the test (navigate to page)
2. Act - Perform actions (click button)
3. Assert - Verify results (check if something happened) ← ASSERTIONS

Assertions are the core of testing - they tell you if your app works correctly!
*/

// ============================================================================
// AUTO-RETRYING ASSERTIONS
// ============================================================================
/*
AUTO-RETRYING ASSERTIONS automatically wait and retry until:
- The condition becomes true (test passes)
- Timeout is reached (test fails)

Default timeout: 5 seconds (configurable)

Why this matters:
- Handles async operations automatically
- No need for manual waits
- Makes tests more reliable (less flaky)
- Playwright re-checks the condition repeatedly

Example behavior:
  await expect(element).toBeVisible();
  
  Playwright checks: Not visible → wait 100ms → check again → wait → check...
  Until: Visible (pass) OR timeout (fail)
*/

test("Auto-Retrying Assertions - Visibility", async ({ page }) => {
  await page.goto("https://example.com");

  // -----------------------------------------------------
  // 1. toBeVisible() - Element is visible to user
  // -----------------------------------------------------
  // Checks: not display:none, not visibility:hidden, has size, not covered

  // Example 1: Check success message appears after form submission
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Form submitted successfully")).toBeVisible();
  // Waits up to 5s for success message to appear

  // Example 2: Modal dialog opens when button clicked
  await page.getByRole("button", { name: "Open Settings" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  // Waits for dialog to be displayed

  // -----------------------------------------------------
  // 2. toBeHidden() - Element is not visible
  // -----------------------------------------------------
  // Checks: element is hidden or doesn't exist

  // Example 1: Loading spinner disappears after data loads
  await expect(page.getByTestId("loading-spinner")).toBeHidden();
  // Waits for spinner to disappear

  // Example 2: Error message is hidden on successful form
  await page.getByLabel("Email").fill("valid@email.com");
  await expect(page.getByText("Invalid email")).toBeHidden();
  // Verifies error message is not shown

  // -----------------------------------------------------
  // 3. toBeEnabled() - Element is enabled (interactive)
  // -----------------------------------------------------
  // Checks: element is not disabled

  // Example 1: Submit button becomes enabled after filling required fields
  await page.getByLabel("Username").fill("john_doe");
  await page.getByLabel("Password").fill("password123");
  await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();
  // Waits for button to become enabled

  // Example 2: Input field is enabled after loading
  await expect(page.getByLabel("Search")).toBeEnabled();
  // Verifies input is interactive

  // -----------------------------------------------------
  // 4. toBeDisabled() - Element is disabled
  // -----------------------------------------------------
  // Checks: element has disabled attribute

  // Example 1: Submit button is disabled when form is invalid
  await page.getByLabel("Email").clear();
  await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
  // Waits for button to become disabled

  // Example 2: Input field disabled during processing
  await page.getByRole("button", { name: "Process" }).click();
  await expect(page.getByLabel("Amount")).toBeDisabled();
  // Verifies field is locked during processing

  // -----------------------------------------------------
  // 5. toBeEditable() - Element is editable
  // -----------------------------------------------------
  // Checks: element is enabled and not readonly

  // Example 1: Text input is editable after page load
  await expect(page.getByLabel("Comment")).toBeEditable();
  // Verifies user can type in field

  // Example 2: Textarea becomes editable after clicking edit
  await page.getByRole("button", { name: "Edit" }).click();
  await expect(page.getByRole("textbox", { name: "Bio" })).toBeEditable();
  // Waits for textarea to become editable

  // -----------------------------------------------------
  // 6. toBeChecked() - Checkbox/radio is checked
  // -----------------------------------------------------

  // Example 1: Checkbox is checked after clicking
  await page.getByLabel("I agree to terms").check();
  await expect(page.getByLabel("I agree to terms")).toBeChecked();
  // Verifies checkbox is checked

  // Example 2: Radio button is selected
  await page.getByLabel("Priority: High").check();
  await expect(page.getByLabel("Priority: High")).toBeChecked();
  // Verifies radio selection

  // -----------------------------------------------------
  // 7. toHaveText() - Element has exact text
  // -----------------------------------------------------

  // Example 1: Counter updates after button click
  await page.getByRole("button", { name: "Increment" }).click();
  await expect(page.getByTestId("counter")).toHaveText("1");
  // Waits for counter to update

  // Example 2: Status badge shows correct text
  await expect(page.getByTestId("order-status")).toHaveText("Delivered");
  // Waits for status to update

  // -----------------------------------------------------
  // 8. toContainText() - Element contains text (substring)
  // -----------------------------------------------------

  // Example 1: Success message contains user's name
  await expect(page.getByRole("alert")).toContainText("Welcome, John");
  // Waits for welcome message with name

  // Example 2: Error message contains relevant info
  await expect(page.getByRole("alert")).toContainText("email is required");
  // Checks error message content

  // -----------------------------------------------------
  // 9. toHaveValue() - Input has specific value
  // -----------------------------------------------------

  // Example 1: Input field updates with typed value
  await page.getByLabel("Username").fill("john_doe");
  await expect(page.getByLabel("Username")).toHaveValue("john_doe");
  // Verifies input value

  // Example 2: Select dropdown has correct selection
  await page.getByLabel("Country").selectOption("USA");
  await expect(page.getByLabel("Country")).toHaveValue("USA");
  // Waits for selection to apply

  // -----------------------------------------------------
  // 10. toHaveAttribute() - Element has specific attribute
  // -----------------------------------------------------

  // Example 1: Link has correct href after navigation
  await expect(page.getByRole("link", { name: "Home" })).toHaveAttribute(
    "href",
    "/home"
  );
  // Checks link destination

  // Example 2: Button has correct data attribute
  await expect(page.getByRole("button", { name: "Delete" })).toHaveAttribute(
    "data-action",
    "delete"
  );
  // Verifies custom data attribute

  // -----------------------------------------------------
  // 11. toHaveClass() - Element has CSS class
  // -----------------------------------------------------

  // Example 1: Tab becomes active when clicked
  await page.getByRole("tab", { name: "Profile" }).click();
  await expect(page.getByRole("tab", { name: "Profile" })).toHaveClass(
    /active/
  );
  // Waits for active class to be added

  // Example 2: Card has error class when validation fails
  await page.getByRole("button", { name: "Validate" }).click();
  await expect(page.getByTestId("card")).toHaveClass(/error/);
  // Checks for error styling

  // -----------------------------------------------------
  // 12. toHaveCount() - Collection has specific number of items
  // -----------------------------------------------------

  // Example 1: Todo list has correct number of items
  await expect(page.getByRole("listitem")).toHaveCount(5);
  // Waits for all items to load

  // Example 2: Search results show expected count
  await page.getByPlaceholder("Search").fill("React");
  await page.keyboard.press("Enter");
  await expect(page.locator(".search-result")).toHaveCount(10);
  // Waits for search results

  // -----------------------------------------------------
  // 13. toHaveURL() - Page has specific URL
  // -----------------------------------------------------

  // Example 1: Navigation to dashboard after login
  await page.getByLabel("Email").fill("user@example.com");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("/dashboard");
  // Waits for navigation to complete

  // Example 2: URL updates with query parameters
  await page.getByPlaceholder("Search").fill("playwright");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\?q=playwright/);
  // Waits for URL to update

  // -----------------------------------------------------
  // 14. toHaveTitle() - Page has specific title
  // -----------------------------------------------------

  // Example 1: Page title updates after navigation
  await page.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveTitle("About Us - Company Name");
  // Waits for page title to change

  // Example 2: Title matches pattern
  await expect(page).toHaveTitle(/Dashboard/);
  // Checks title contains "Dashboard"
});

// ============================================================================
// NON-RETRYING ASSERTIONS
// ============================================================================
/*
NON-RETRYING ASSERTIONS check conditions immediately WITHOUT waiting.
They don't automatically retry - they pass or fail instantly.

Use cases:
- Testing synchronous values (variables, constants)
- Testing data that doesn't change
- Testing return values from functions
- When you've already waited and just need to verify

Common pattern: Use expect() from @playwright/test for synchronous checks
*/

test("Non-Retrying Assertions - Common Matchers", async ({ page }) => {
  await page.goto("https://example.com/api");

  // -----------------------------------------------------
  // 1. toBe() - Exact equality (===)
  // -----------------------------------------------------

  // Example 1: Check numeric value
  const itemCount = 5;
  expect(itemCount).toBe(5);
  // Immediate check, no retry

  // Example 2: Check boolean value
  const isLoggedIn = true;
  expect(isLoggedIn).toBe(true);
  // Verifies exact value

  // -----------------------------------------------------
  // 2. toEqual() - Deep equality (for objects/arrays)
  // -----------------------------------------------------

  // Example 1: Compare objects
  const user = { name: "John", age: 30 };
  expect(user).toEqual({ name: "John", age: 30 });
  // Checks all properties match

  // Example 2: Compare arrays
  const tags = ["react", "testing", "playwright"];
  expect(tags).toEqual(["react", "testing", "playwright"]);
  // Verifies array contents

  // -----------------------------------------------------
  // 3. toBeTruthy() / toBeFalsy() - Truthy/Falsy check
  // -----------------------------------------------------

  // Example 1: Check if value exists
  const username = "john_doe";
  expect(username).toBeTruthy();
  // Any non-empty value passes

  // Example 2: Check if value is falsy
  const errorMessage = "";
  expect(errorMessage).toBeFalsy();
  // Empty string, null, undefined, 0, false all pass

  // -----------------------------------------------------
  // 4. toContain() - Array/String contains value
  // -----------------------------------------------------

  // Example 1: Array contains item
  const fruits = ["apple", "banana", "orange"];
  expect(fruits).toContain("banana");
  // Checks item exists in array

  // Example 2: String contains substring
  const message = "Hello, World!";
  expect(message).toContain("World");
  // Checks substring exists

  // -----------------------------------------------------
  // 5. toMatch() - String matches regex
  // -----------------------------------------------------

  // Example 1: Email format validation
  const email = "user@example.com";
  expect(email).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  // Validates email pattern

  // Example 2: URL pattern
  const url = "https://example.com/page";
  expect(url).toMatch(/^https?:\/\//);
  // Checks URL starts with http(s)

  // -----------------------------------------------------
  // 6. toBeGreaterThan() / toBeLessThan() - Numeric comparison
  // -----------------------------------------------------

  // Example 1: Check age requirement
  const userAge = 25;
  expect(userAge).toBeGreaterThan(18);
  // Verifies user is adult

  // Example 2: Check discount percentage
  const discount = 15;
  expect(discount).toBeLessThan(50);
  // Ensures discount is within range

  // -----------------------------------------------------
  // 7. toHaveLength() - Array/String length
  // -----------------------------------------------------

  // Example 1: Validate password length
  const password = "securePassword123";
  expect(password).toHaveLength(17);
  // Checks exact length

  // Example 2: Array size
  const items = [1, 2, 3, 4, 5];
  expect(items).toHaveLength(5);
  // Verifies item count

  // -----------------------------------------------------
  // 8. toBeNull() / toBeUndefined() / toBeDefined()
  // -----------------------------------------------------

  // Example 1: Check if variable is null
  const response = null;
  expect(response).toBeNull();
  // Explicitly null check

  // Example 2: Check if value is defined
  const config = { port: 3000 };
  expect(config.port).toBeDefined();
  // Verifies value exists

  // -----------------------------------------------------
  // 9. toBeCloseTo() - Floating point comparison
  // -----------------------------------------------------

  // Example 1: Check calculated price
  const price = 0.1 + 0.2;
  expect(price).toBeCloseTo(0.3, 5);
  // Handles floating point precision

  // Example 2: Check percentage
  const percentage = 33.333333;
  expect(percentage).toBeCloseTo(33.33, 2);
  // Compares to 2 decimal places

  // -----------------------------------------------------
  // 10. toThrow() - Function throws error
  // -----------------------------------------------------

  // Example 1: Function throws on invalid input
  const invalidFunction = () => {
    throw new Error("Invalid input");
  };
  expect(invalidFunction).toThrow("Invalid input");
  // Verifies error is thrown

  // Example 2: Function throws specific error type
  expect(() => JSON.parse("invalid")).toThrow(SyntaxError);
  // Checks error type
});

// ============================================================================
// NEGATING MATCHERS
// ============================================================================
/*
NEGATING MATCHERS verify that conditions are NOT true.
Use .not before the matcher to negate the assertion.

Syntax: expect(element).not.toBeVisible()
*/

test("Negating Matchers", async ({ page }) => {
  await page.goto("https://example.com");

  // -----------------------------------------------------
  // Auto-retrying negations
  // -----------------------------------------------------

  // Element is NOT visible
  await expect(page.getByText("Error message")).not.toBeVisible();
  // Waits for element to be hidden or not exist

  // Element does NOT have text
  await expect(page.getByTestId("status")).not.toHaveText("Failed");
  // Verifies status is not "Failed"

  // Element does NOT contain text
  await expect(page.getByRole("alert")).not.toContainText("error");
  // Ensures no error message

  // Checkbox is NOT checked
  await expect(page.getByLabel("Subscribe")).not.toBeChecked();
  // Verifies checkbox is unchecked

  // Element does NOT have class
  await expect(page.getByTestId("card")).not.toHaveClass(/disabled/);
  // Checks element is not disabled

  // -----------------------------------------------------
  // Non-retrying negations
  // -----------------------------------------------------

  // Value is NOT equal
  const count = 5;
  expect(count).not.toBe(0);
  // Immediate check

  // Array does NOT contain item
  const colors = ["red", "blue", "green"];
  expect(colors).not.toContain("yellow");
  // Verifies item is absent

  // String does NOT match pattern
  const username = "john_doe";
  expect(username).not.toMatch(/\s/);
  // Ensures no whitespace

  // Value is NOT null
  const data = { value: 123 };
  expect(data).not.toBeNull();
  // Verifies data exists

  // -----------------------------------------------------
  // Real-world examples
  // -----------------------------------------------------

  // Form validation: Error should not appear for valid input
  await page.getByLabel("Email").fill("valid@email.com");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Invalid email")).not.toBeVisible();

  // Button should not be disabled after loading
  await expect(
    page.getByRole("button", { name: "Continue" })
  ).not.toBeDisabled();

  // Modal should not be visible after closing
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

// ============================================================================
// SOFT ASSERTIONS
// ============================================================================
/*
SOFT ASSERTIONS allow tests to continue even if assertions fail.
All failures are collected and reported at the end.

Use case:
- Check multiple conditions without stopping at first failure
- UI validation (check multiple elements at once)
- Generate comprehensive test reports

Syntax: expect.soft() instead of expect()

WARNING: Test will still fail if any soft assertion fails!
*/

test("Soft Assertions", async ({ page }) => {
  await page.goto("https://example.com/profile");

  // -----------------------------------------------------
  // Multiple checks without stopping
  // -----------------------------------------------------

  // Check all profile fields - continues even if some fail
  await expect.soft(page.getByLabel("Name")).toHaveValue("John Doe");
  await expect.soft(page.getByLabel("Email")).toHaveValue("john@example.com");
  await expect.soft(page.getByLabel("Phone")).toHaveValue("555-1234");
  await expect.soft(page.getByLabel("Address")).toHaveValue("123 Main St");

  // All 4 checks run, even if first one fails
  // Test report shows ALL failures, not just the first

  // -----------------------------------------------------
  // UI Component validation
  // -----------------------------------------------------

  // Validate entire navigation bar
  const nav = page.getByRole("navigation");
  await expect.soft(nav.getByRole("link", { name: "Home" })).toBeVisible();
  await expect.soft(nav.getByRole("link", { name: "About" })).toBeVisible();
  await expect.soft(nav.getByRole("link", { name: "Contact" })).toBeVisible();
  await expect.soft(nav.getByRole("link", { name: "Login" })).toBeVisible();

  // Gets comprehensive report of which links are missing

  // -----------------------------------------------------
  // Form validation - check all errors
  // -----------------------------------------------------

  await page.getByRole("button", { name: "Submit" }).click();

  // Check all validation errors appear
  await expect.soft(page.getByText("Name is required")).toBeVisible();
  await expect.soft(page.getByText("Email is required")).toBeVisible();
  await expect.soft(page.getByText("Password is required")).toBeVisible();

  // See which validations are missing

  // -----------------------------------------------------
  // Compare with regular assertions
  // -----------------------------------------------------

  // REGULAR assertions (stops at first failure):
  // await expect(element1).toBeVisible(); // ❌ Fails here, stops
  // await expect(element2).toBeVisible(); // Never runs
  // await expect(element3).toBeVisible(); // Never runs

  // SOFT assertions (runs all, reports all failures):
  // await expect.soft(element1).toBeVisible(); // ❌ Fails, continues
  // await expect.soft(element2).toBeVisible(); // ✅ Passes, continues
  // await expect.soft(element3).toBeVisible(); // ❌ Fails, continues
  // Test fails but shows all 3 results

  // -----------------------------------------------------
  // Best practice: Combine with regular assertion at end
  // -----------------------------------------------------

  // Check multiple optional elements
  await expect.soft(page.locator(".feature-1")).toBeVisible();
  await expect.soft(page.locator(".feature-2")).toBeVisible();
  await expect.soft(page.locator(".feature-3")).toBeVisible();

  // But ensure critical element exists (hard assertion)
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  // Stops test if critical element missing
});

// ============================================================================
// CUSTOM ASSERTION MESSAGES
// ============================================================================
/*
CUSTOM MESSAGES provide context when assertions fail.
Makes debugging easier by explaining what the test was checking.

Syntax: expect(element, 'Custom message').toBe...()

Benefits:
- Clearer error messages
- Easier debugging
- Better test reports
- Helps other developers understand test intent
*/

test("Custom Assertion Messages", async ({ page }) => {
  await page.goto("https://example.com/checkout");

  // -----------------------------------------------------
  // Basic custom messages
  // -----------------------------------------------------

  await expect(
    page.getByRole("button", { name: "Pay Now" }),
    "Payment button should be visible on checkout page"
  ).toBeVisible();
  // If fails: "Payment button should be visible on checkout page"

  await expect(
    page.getByLabel("Card Number"),
    "Card number input should be enabled for payment"
  ).toBeEnabled();
  // Clear context in error message

  // -----------------------------------------------------
  // Descriptive messages for complex checks
  // -----------------------------------------------------

  await expect(
    page.getByRole("listitem"),
    "Shopping cart should contain exactly 3 items"
  ).toHaveCount(3);

  await expect(
    page.getByTestId("total-price"),
    "Total price should be $99.99 after applying discount"
  ).toHaveText("$99.99");

  // -----------------------------------------------------
  // Business logic context
  // -----------------------------------------------------

  await expect(
    page.getByText("Out of Stock"),
    "Out of stock message should not appear for available products"
  ).not.toBeVisible();

  await expect(
    page.getByRole("button", { name: "Checkout" }),
    "Checkout button should be disabled when cart is empty"
  ).toBeDisabled();

  // -----------------------------------------------------
  // Debugging complex scenarios
  // -----------------------------------------------------

  const orderStatus = await page.getByTestId("order-status").textContent();
  expect(
    orderStatus,
    `Order status should be 'Confirmed' but got '${orderStatus}'`
  ).toBe("Confirmed");

  // Dynamic message with actual value helps debugging

  // -----------------------------------------------------
  // Non-retrying with custom messages
  // -----------------------------------------------------

  const itemPrice = 29.99;
  expect(
    itemPrice,
    "Item price should be less than $50 for free shipping eligibility"
  ).toBeLessThan(50);

  const categories = ["electronics", "books", "clothing"];
  expect(categories, "Product categories should include electronics").toContain(
    "electronics"
  );
});

// ============================================================================
// POLLING & ADVANCED ASSERTIONS
// ============================================================================

test("expect.poll() - Poll for changing values", async ({ page }) => {
  // -----------------------------------------------------
  // expect.poll() - Poll a function until condition is met
  // -----------------------------------------------------
  // Use case: When you need to check a value that changes over time
  // but isn't a DOM element (API response, computed value, etc.)

  await page.goto("https://example.com/live-data");

  // Example 1: Poll for API response
  await expect
    .poll(async () => {
      const response = await page.request.get("/api/status");
      return response.status();
    })
    .toBe(200);
  // Repeatedly calls function until status is 200

  // Example 2: Poll for computed value
  await expect
    .poll(async () => {
      return await page.evaluate(() => {
        return document.querySelectorAll(".loaded-item").length;
      });
    })
    .toBeGreaterThan(10);
  // Waits for at least 10 items to load

  // Example 3: Poll localStorage value
  await expect
    .poll(async () => {
      return await page.evaluate(() => localStorage.getItem("authToken"));
    })
    .not.toBeNull();
  // Waits for auth token to be set

  // -----------------------------------------------------
  // Configuration options
  // -----------------------------------------------------

  await expect
    .poll(
      async () => {
        const text = await page.locator(".counter").textContent();
        return parseInt(text || "0");
      },
      {
        timeout: 10000, // Wait up to 10 seconds
        intervals: [500, 1000], // Check every 500ms, then 1s
      }
    )
    .toBeGreaterThan(100);
});

test("expect.toPass() - Retry entire assertion block", async ({ page }) => {
  // -----------------------------------------------------
  // expect.toPass() - Retry a block of code with multiple assertions
  // -----------------------------------------------------
  // Use case: When you need multiple checks to all pass together
  // Useful for eventually consistent scenarios

  await page.goto("https://example.com/dashboard");

  // Example 1: Multiple related checks that need to pass together
  await expect(async () => {
    // This entire block retries until all assertions pass
    const status = await page.getByTestId("connection-status").textContent();
    expect(status).toBe("Connected");

    const count = await page.getByTestId("message-count").textContent();
    expect(parseInt(count || "0")).toBeGreaterThan(0);
  }).toPass();
  // Both checks must pass in same attempt

  // Example 2: API and UI synchronization
  await expect(async () => {
    // Check API response
    const response = await page.request.get("/api/user-data");
    expect(response.ok()).toBeTruthy();

    // Check UI reflects the data
    await expect(page.getByText("Data loaded")).toBeVisible();
  }).toPass();

  // Example 3: Complex business logic validation
  await expect(async () => {
    const price = await page.getByTestId("price").textContent();
    const tax = await page.getByTestId("tax").textContent();
    const total = await page.getByTestId("total").textContent();

    const priceNum = parseFloat(price?.replace("$", "") || "0");
    const taxNum = parseFloat(tax?.replace("$", "") || "0");
    const totalNum = parseFloat(total?.replace("$", "") || "0");

    expect(totalNum).toBeCloseTo(priceNum + taxNum, 2);
  }).toPass({
    timeout: 5000, // Custom timeout
  });

  // -----------------------------------------------------
  // Why use toPass()?
  // -----------------------------------------------------
  /*
  WITHOUT toPass():
    const status = await page.locator('.status').textContent();
    expect(status).toBe('Ready'); // ❌ Fails immediately if not ready
    
  WITH toPass():
    await expect(async () => {
      const status = await page.locator('.status').textContent();
      expect(status).toBe('Ready'); // ✅ Retries until ready or timeout
    }).toPass();
  
  Use toPass() when:
  - Multiple checks need to pass together
  - Checking values that aren't DOM elements
  - Need to retry complex logic
  - Eventually consistent scenarios
  */
});

// ============================================================================
// KEY TAKEAWAYS - ASSERTIONS
// ============================================================================
/*
ASSERTION TYPES:
1. Auto-retrying - For DOM elements, wait and retry automatically
2. Non-retrying - For immediate value checks (variables, constants)

AUTO-RETRYING (use for page elements):
✅ toBeVisible(), toBeHidden()
✅ toBeEnabled(), toBeDisabled()
✅ toHaveText(), toContainText()
✅ toHaveValue(), toHaveAttribute()
✅ toBeChecked(), toHaveClass()
✅ toHaveCount(), toHaveURL(), toHaveTitle()

NON-RETRYING (use for values):
✅ toBe(), toEqual()
✅ toBeTruthy(), toBeFalsy()
✅ toContain(), toMatch()
✅ toBeGreaterThan(), toBeLessThan()
✅ toHaveLength(), toBeNull()

SPECIAL FEATURES:
- .not - Negate any assertion
- expect.soft() - Continue on failure, report all
- Custom messages - Add context to failures
- expect.poll() - Poll for changing values
- expect.toPass() - Retry entire assertion block

BEST PRACTICES:
✅ Use auto-retrying for UI elements
✅ Use non-retrying for computed values
✅ Add custom messages for complex checks
✅ Use soft assertions for comprehensive validation
✅ Negate assertions when checking absence
❌ Don't use manual waits (setTimeout) - use auto-retry instead
❌ Don't use non-retrying assertions for DOM elements
*/
