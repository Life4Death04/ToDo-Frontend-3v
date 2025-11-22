// ============================================================================
// ACTIONS - PLAYWRIGHT USER INTERACTIONS
// ============================================================================
// This file covers all action methods in Playwright for simulating user behavior

import { test, expect, Page } from "@playwright/test";

// ============================================================================
// MOUSE ACTIONS
// ============================================================================

test("Mouse Actions - Click", async ({ page }) => {
  // -----------------------------------------------------
  // click() - Left click on element
  // -----------------------------------------------------
  // Waits for element to be actionable (visible, stable, enabled)

  // Example 1: Submit button
  await page.getByRole("button", { name: "Submit" }).click();

  // Example 2: Navigation link
  await page.getByRole("link", { name: "Dashboard" }).click();

  // -----------------------------------------------------
  // dblclick() - Double click
  // -----------------------------------------------------

  // Example 1: Select word in text editor
  await page.getByRole("textbox").dblclick();

  // Example 2: Open file in file manager
  await page.locator(".file-item").dblclick();

  // -----------------------------------------------------
  // click({ button: 'right' }) - Right click
  // -----------------------------------------------------

  // Example 1: Open context menu
  await page.getByRole("cell", { name: "Data" }).click({ button: "right" });

  // Example 2: Right-click on image
  await page.getByAltText("Profile Photo").click({ button: "right" });

  // -----------------------------------------------------
  // click({ clickCount: 3 }) - Triple click
  // -----------------------------------------------------

  // Example 1: Select entire paragraph
  await page.locator("p").first().click({ clickCount: 3 });

  // Example 2: Select line in code editor
  await page.locator(".code-line").click({ clickCount: 3 });

  // -----------------------------------------------------
  // click({ modifiers: ['Shift'] }) - Click with modifier keys
  // -----------------------------------------------------

  // Example 1: Shift+Click to select range
  await page.getByRole("listitem").first().click();
  await page
    .getByRole("listitem")
    .last()
    .click({ modifiers: ["Shift"] });

  // Example 2: Ctrl+Click to open in new tab
  await page
    .getByRole("link", { name: "Help" })
    .click({ modifiers: ["Control"] });
});

test("Mouse Actions - Hover", async ({ page }) => {
  // -----------------------------------------------------
  // hover() - Move mouse over element
  // -----------------------------------------------------
  // Triggers :hover CSS states and mouseover events

  // Example 1: Show dropdown menu
  await page.getByRole("button", { name: "Account" }).hover();

  // Example 2: Display tooltip
  await page.getByTitle("More info").hover();
});

test("Mouse Actions - Drag and Drop", async ({ page }) => {
  // -----------------------------------------------------
  // dragTo() - Drag element to another element
  // -----------------------------------------------------

  // Example 1: Reorder list items
  await page
    .locator(".task-item")
    .first()
    .dragTo(page.locator(".task-item").last());

  // Example 2: Move card between columns
  await page.getByTestId("card-1").dragTo(page.getByTestId("column-done"));

  // -----------------------------------------------------
  // Alternative: Using mouse movements
  // -----------------------------------------------------

  // Example: Manual drag with mouse
  await page.locator(".draggable").hover();
  await page.mouse.down();
  await page.locator(".drop-zone").hover();
  await page.mouse.up();
});

// ============================================================================
// KEYBOARD ACTIONS
// ============================================================================

test("Keyboard Actions - Type", async ({ page }) => {
  // -----------------------------------------------------
  // fill() - Clear and type text (RECOMMENDED)
  // -----------------------------------------------------
  // Fastest method, clears existing content first

  // Example 1: Login form
  await page.getByLabel("Email").fill("user@example.com");

  // Example 2: Search box
  await page.getByPlaceholder("Search...").fill("React tutorials");

  // -----------------------------------------------------
  // type() - Type character by character
  // -----------------------------------------------------
  // Slower but fires all keyboard events (keydown, keypress, keyup)

  // Example 1: Simulate real typing for autocomplete
  await page.getByRole("textbox", { name: "City" }).type("New York");

  // Example 2: Type with delay (human-like typing)
  await page.getByLabel("Comment").type("Great article!", { delay: 100 });

  // -----------------------------------------------------
  // pressSequentially() - Type text with events
  // -----------------------------------------------------
  // Like type() but more modern API

  // Example 1: Fill form with keyboard events
  await page.getByLabel("Username").pressSequentially("john_doe");

  // Example 2: Type code in editor
  await page.locator(".code-editor").pressSequentially("const x = 10;");
});

test("Keyboard Actions - Press Keys", async ({ page }) => {
  // -----------------------------------------------------
  // press() - Press single key or combination
  // -----------------------------------------------------

  // Example 1: Submit form with Enter
  await page.getByLabel("Search").fill("playwright");
  await page.getByLabel("Search").press("Enter");

  // Example 2: Save with Ctrl+S
  await page.keyboard.press("Control+S");

  // -----------------------------------------------------
  // Common key presses
  // -----------------------------------------------------

  // Tab to next field
  await page.keyboard.press("Tab");

  // Escape to close modal
  await page.keyboard.press("Escape");

  // Arrow navigation
  await page.keyboard.press("ArrowDown");

  // Delete/Backspace
  await page.keyboard.press("Backspace");

  // Select all
  await page.keyboard.press("Control+A");

  // Copy/Paste
  await page.keyboard.press("Control+C");
  await page.keyboard.press("Control+V");
});

test("Keyboard Actions - Special Keys", async ({ page }) => {
  // -----------------------------------------------------
  // Key combinations and special keys
  // -----------------------------------------------------

  // Example 1: Undo operation
  await page.keyboard.press("Control+Z");

  // Example 2: Refresh page
  await page.keyboard.press("F5");

  // Example 3: Open developer tools
  await page.keyboard.press("F12");

  // Example 4: Zoom in/out
  await page.keyboard.press("Control+Plus");
  await page.keyboard.press("Control+Minus");
});

// ============================================================================
// FORM ACTIONS
// ============================================================================

test("Form Actions - Input Fields", async ({ page }) => {
  // -----------------------------------------------------
  // fill() - Enter text in input/textarea
  // -----------------------------------------------------

  // Example 1: Registration form
  await page.getByLabel("First Name").fill("John");
  await page.getByLabel("Last Name").fill("Doe");
  await page.getByLabel("Email").fill("john@example.com");

  // Example 2: Multiline textarea
  await page
    .getByLabel("Bio")
    .fill("Software developer\nLoves coding\nPlaywright enthusiast");

  // -----------------------------------------------------
  // clear() - Clear input field
  // -----------------------------------------------------

  // Example 1: Clear search box
  await page.getByPlaceholder("Search").clear();

  // Example 2: Clear existing value before typing
  await page.getByLabel("Phone").clear();
  await page.getByLabel("Phone").fill("555-1234");
});

test("Form Actions - Checkboxes", async ({ page }) => {
  // -----------------------------------------------------
  // check() - Check checkbox/radio button
  // -----------------------------------------------------

  // Example 1: Accept terms
  await page.getByLabel("I agree to the terms").check();

  // Example 2: Select newsletter option
  await page.getByLabel("Subscribe to newsletter").check();

  // -----------------------------------------------------
  // uncheck() - Uncheck checkbox
  // -----------------------------------------------------

  // Example 1: Opt out of notifications
  await page.getByLabel("Email notifications").uncheck();

  // Example 2: Deselect option
  await page.getByLabel("Remember me").uncheck();

  // -----------------------------------------------------
  // setChecked() - Set specific state
  // -----------------------------------------------------

  // Example 1: Ensure checkbox is checked
  await page.getByLabel("Enable feature").setChecked(true);

  // Example 2: Ensure checkbox is unchecked
  await page.getByLabel("Disable ads").setChecked(false);
});

test("Form Actions - Radio Buttons", async ({ page }) => {
  // -----------------------------------------------------
  // check() - Select radio button
  // -----------------------------------------------------

  // Example 1: Select payment method
  await page.getByLabel("Credit Card").check();

  // Example 2: Choose shipping option
  await page.getByLabel("Express Delivery").check();
});

test("Form Actions - Dropdowns", async ({ page }) => {
  // -----------------------------------------------------
  // selectOption() - Select from dropdown
  // -----------------------------------------------------

  // Example 1: Select by value
  await page.getByLabel("Country").selectOption("usa");

  // Example 2: Select by label
  await page.getByLabel("State").selectOption({ label: "California" });

  // Example 3: Select by index
  await page.getByLabel("Priority").selectOption({ index: 2 });

  // Example 4: Multiple selection
  await page
    .getByLabel("Tags")
    .selectOption(["react", "testing", "playwright"]);
});

test("Form Actions - File Upload", async ({ page }) => {
  // -----------------------------------------------------
  // setInputFiles() - Upload file(s)
  // -----------------------------------------------------

  // Example 1: Upload single file
  await page
    .getByLabel("Upload Document")
    .setInputFiles("path/to/document.pdf");

  // Example 2: Upload multiple files
  await page
    .getByLabel("Upload Images")
    .setInputFiles(["path/to/image1.jpg", "path/to/image2.jpg"]);

  // Example 3: Clear uploaded files
  await page.getByLabel("Upload Document").setInputFiles([]);

  // Example 4: Upload from buffer
  await page.getByLabel("Avatar").setInputFiles({
    name: "avatar.png",
    mimeType: "image/png",
    buffer: Buffer.from("file content"),
  });
});

// ============================================================================
// NAVIGATION ACTIONS
// ============================================================================

test("Navigation Actions", async ({ page }) => {
  // -----------------------------------------------------
  // goto() - Navigate to URL
  // -----------------------------------------------------

  // Example 1: Navigate to homepage
  await page.goto("https://example.com");

  // Example 2: Navigate with options
  await page.goto("https://example.com/dashboard", {
    waitUntil: "networkidle", // Wait for network to be idle
  });

  // -----------------------------------------------------
  // goBack() - Browser back button
  // -----------------------------------------------------

  // Example: Return to previous page
  await page.goBack();

  // -----------------------------------------------------
  // goForward() - Browser forward button
  // -----------------------------------------------------

  // Example: Go forward in history
  await page.goForward();

  // -----------------------------------------------------
  // reload() - Refresh page
  // -----------------------------------------------------

  // Example 1: Reload current page
  await page.reload();

  // Example 2: Hard reload (bypass cache)
  await page.reload({ waitUntil: "networkidle" });
});

// ============================================================================
// FOCUS & BLUR ACTIONS
// ============================================================================

test("Focus Actions", async ({ page }) => {
  // -----------------------------------------------------
  // focus() - Focus on element
  // -----------------------------------------------------

  // Example 1: Focus search box
  await page.getByPlaceholder("Search").focus();

  // Example 2: Focus input for keyboard navigation
  await page.getByLabel("Email").focus();

  // -----------------------------------------------------
  // blur() - Remove focus from element
  // -----------------------------------------------------

  // Example 1: Trigger validation on blur
  await page.getByLabel("Email").fill("invalid-email");
  await page.getByLabel("Email").blur();

  // Example 2: Unfocus current element
  await page.getByLabel("Password").blur();
});

// ============================================================================
// SCROLL ACTIONS
// ============================================================================

test("Scroll Actions", async ({ page }) => {
  // -----------------------------------------------------
  // scrollIntoViewIfNeeded() - Scroll element into view
  // -----------------------------------------------------
  // Automatically done before clicks, but can be explicit

  // Example 1: Scroll to footer
  await page.getByRole("contentinfo").scrollIntoViewIfNeeded();

  // Example 2: Scroll to specific section
  await page
    .getByRole("heading", { name: "Contact Us" })
    .scrollIntoViewIfNeeded();

  // -----------------------------------------------------
  // mouse.wheel() - Scroll page
  // -----------------------------------------------------

  // Example 1: Scroll down
  await page.mouse.wheel(0, 500);

  // Example 2: Scroll up
  await page.mouse.wheel(0, -500);

  // -----------------------------------------------------
  // evaluate() for scrolling
  // -----------------------------------------------------

  // Example 1: Scroll to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Example 2: Scroll to top
  await page.evaluate(() => window.scrollTo(0, 0));
});

// ============================================================================
// WAIT ACTIONS
// ============================================================================

test("Wait Actions", async ({ page }) => {
  // -----------------------------------------------------
  // waitForTimeout() - Wait for time (USE SPARINGLY)
  // -----------------------------------------------------
  // Not recommended - use smart waits instead

  // Example: Wait 1 second (avoid if possible)
  await page.waitForTimeout(1000);

  // -----------------------------------------------------
  // waitForSelector() - Wait for element
  // -----------------------------------------------------

  // Example 1: Wait for element to appear
  await page.waitForSelector(".success-message");

  // Example 2: Wait for element with state
  await page.waitForSelector("button", { state: "visible" });

  // -----------------------------------------------------
  // waitForLoadState() - Wait for page load
  // -----------------------------------------------------

  // Example 1: Wait for DOM content loaded
  await page.waitForLoadState("domcontentloaded");

  // Example 2: Wait for network idle
  await page.waitForLoadState("networkidle");

  // -----------------------------------------------------
  // waitForURL() - Wait for URL change
  // -----------------------------------------------------

  // Example 1: Wait for navigation
  await page.getByRole("link", { name: "Login" }).click();
  await page.waitForURL("**/login");

  // Example 2: Wait for URL pattern
  await page.waitForURL(/dashboard/);

  // -----------------------------------------------------
  // waitForFunction() - Wait for condition
  // -----------------------------------------------------

  // Example 1: Wait for element count
  await page.waitForFunction(() => {
    return document.querySelectorAll(".item").length > 5;
  });

  // Example 2: Wait for custom condition
  await page.waitForFunction(() => {
    return document.querySelector(".status")?.textContent === "Ready";
  });
});

// ============================================================================
// DIALOG ACTIONS
// ============================================================================

test("Dialog Actions", async ({ page }) => {
  // -----------------------------------------------------
  // Handle JavaScript dialogs (alert, confirm, prompt)
  // -----------------------------------------------------

  // Example 1: Accept alert
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("alert");
    await dialog.accept();
  });
  await page.getByRole("button", { name: "Show Alert" }).click();

  // Example 2: Confirm dialog with custom input
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Enter your name:");
    await dialog.accept("John Doe");
  });
  await page.getByRole("button", { name: "Enter Name" }).click();

  // Example 3: Dismiss confirmation
  page.on("dialog", async (dialog) => {
    await dialog.dismiss();
  });
  await page.getByRole("button", { name: "Delete" }).click();
});

// ============================================================================
// SCREENSHOT ACTIONS
// ============================================================================

test("Screenshot Actions", async ({ page }) => {
  // -----------------------------------------------------
  // screenshot() - Capture screenshot
  // -----------------------------------------------------

  // Example 1: Full page screenshot
  await page.screenshot({ path: "screenshots/homepage.png", fullPage: true });

  // Example 2: Element screenshot
  await page
    .getByTestId("dashboard")
    .screenshot({ path: "screenshots/dashboard.png" });

  // Example 3: Screenshot without path (returns buffer)
  const buffer = await page.screenshot();
});

// ============================================================================
// ADVANCED ACTIONS
// ============================================================================

test("Advanced Actions - Click Options", async ({ page }) => {
  // -----------------------------------------------------
  // Click with position
  // -----------------------------------------------------

  // Example: Click at specific coordinates
  await page.getByRole("button").click({ position: { x: 10, y: 10 } });

  // -----------------------------------------------------
  // Force click (skip actionability checks)
  // -----------------------------------------------------

  // Example: Click hidden element (use cautiously)
  await page.locator(".hidden-button").click({ force: true });

  // -----------------------------------------------------
  // Click with timeout
  // -----------------------------------------------------

  // Example: Custom timeout for slow elements
  await page.getByRole("button").click({ timeout: 10000 });

  // -----------------------------------------------------
  // No wait before click
  // -----------------------------------------------------

  // Example: Click immediately without waiting
  await page.getByRole("button").click({ noWaitAfter: true });
});

test("Advanced Actions - Input Options", async ({ page }) => {
  // -----------------------------------------------------
  // Fill with options
  // -----------------------------------------------------

  // Example 1: Fill without triggering events
  await page.getByLabel("Email").fill("user@example.com", { force: true });

  // Example 2: Fill with timeout
  await page.getByLabel("Search").fill("query", { timeout: 5000 });

  // -----------------------------------------------------
  // Type with delay
  // -----------------------------------------------------

  // Example: Human-like typing
  await page.getByLabel("Message").type("Hello, World!", { delay: 100 });
});

test("Advanced Actions - Dispatch Events", async ({ page }) => {
  // -----------------------------------------------------
  // dispatchEvent() - Trigger custom events
  // -----------------------------------------------------

  // Example 1: Trigger change event
  await page.getByLabel("Input").dispatchEvent("change");

  // Example 2: Trigger custom event
  await page
    .getByTestId("component")
    .dispatchEvent("customEvent", { detail: "data" });
});

// ============================================================================
// KEY TAKEAWAYS - ACTIONS
// ============================================================================
/*
ACTION CATEGORIES:

MOUSE:
- click(), dblclick() - Click actions
- hover() - Mouse over
- dragTo() - Drag and drop

KEYBOARD:
- fill() - Fast text entry (recommended)
- type(), pressSequentially() - Character by character
- press() - Key combinations
- keyboard.press() - Special keys

FORM:
- check(), uncheck() - Checkboxes
- selectOption() - Dropdowns
- setInputFiles() - File uploads

NAVIGATION:
- goto() - Navigate to URL
- goBack(), goForward() - Browser navigation
- reload() - Refresh page

OTHER:
- focus(), blur() - Focus management
- scrollIntoViewIfNeeded() - Scrolling
- waitForSelector(), waitForURL() - Waiting
- screenshot() - Capture images

BEST PRACTICES:
✅ Use fill() instead of type() for speed
✅ Let Playwright auto-wait (avoid waitForTimeout)
✅ Use semantic locators with actions
✅ Handle dialogs before triggering them
❌ Don't use force: true unless necessary
❌ Avoid manual waits (waitForTimeout)
*/
