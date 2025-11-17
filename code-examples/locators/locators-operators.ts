// ============================================================================
// LOCATORS - CODE EXAMPLES AND NOTES
// ============================================================================
// This file contains examples and explanations for Playwright locators
// Locators are "recipes" for finding elements - they search the DOM fresh
// on every action, making them resilient to re-renders and dynamic content.

import { test, expect, Page } from "@playwright/test";

// ============================================================================
// LOCATOR OPERATORS
// ============================================================================
// Locator operators allow you to combine, filter, and refine locators
// to precisely target elements on the page.

test("Locator Operators Examples", async ({ page }) => {
  await page.goto("https://example.com");

  // -----------------------------------------------------
  // 1. AND Operator - page.locator().and()
  // -----------------------------------------------------
  // Matches elements that satisfy ALL conditions
  // Use case: Find elements with multiple attributes or states

  // Example: Button that is both enabled AND has specific class
  const activeButton = page
    .getByRole("button", { name: "Submit" })
    .and(page.locator(".active"));
  await activeButton.click();

  // Real-world: Find a specific product card that's on sale
  const saleProduct = page
    .locator(".product-card")
    .and(page.locator('[data-sale="true"]'))
    .and(page.locator(':has-text("Premium")'));

  // -----------------------------------------------------
  // 2. OR Operator - page.locator().or()
  // -----------------------------------------------------
  // Matches elements that satisfy ANY of the conditions
  // Use case: Handle variations in UI (different button labels, fallbacks)

  // Example: Click either "Submit" or "Send" button (whichever exists)
  const submitOrSend = page
    .getByRole("button", { name: "Submit" })
    .or(page.getByRole("button", { name: "Send" }));
  await submitOrSend.click();

  // Real-world: Handle multiple possible success messages
  const successMessage = page
    .getByText("Successfully saved")
    .or(page.getByText("Saved!"))
    .or(page.getByText("Changes saved"));
  await expect(successMessage).toBeVisible();

  // -----------------------------------------------------
  // 3. NOT Operator - page.locator().not()
  // -----------------------------------------------------
  // Excludes elements that match a condition
  // Use case: Filter out unwanted elements

  // Example: Get all buttons except the disabled ones
  const enabledButtons = page.getByRole("button").locator(":not([disabled])");

  // Real-world: Get all list items except the selected one
  const unselectedItems = page.locator("li").locator(":not(.selected)");
  await expect(unselectedItems).toHaveCount(5);
});

// ============================================================================
// MATCHING INSIDE A LOCATOR (CHAINING/NARROWING)
// ============================================================================
// Chain locators to narrow down search to specific parts of the page
// This creates a hierarchy: parent → child relationship

test("Matching Inside a Locator", async ({ page }) => {
  await page.goto("https://example-store.com/products");

  // -----------------------------------------------------
  // Example 1: Filter list items by text content
  // -----------------------------------------------------
  // Use case: E-commerce - find a specific product and interact with it

  const product = page.getByRole("listitem").filter({ hasText: "Product 2" }); // Only the list item containing "Product 2"

  // Now interact with elements INSIDE that specific product
  await product.getByRole("button", { name: "Add to cart" }).click();

  // Verify we got exactly one product match
  await expect(product).toHaveCount(1);

  // -----------------------------------------------------
  // Example 2: Chain locators to find nested elements
  // -----------------------------------------------------
  // Use case: Click a button inside a specific dialog/modal

  const saveButton = page.getByRole("button", { name: "Save" });
  const dialog = page.getByTestId("settings-dialog");

  // Click the "Save" button, but ONLY the one inside the dialog
  await dialog.locator(saveButton).click();

  // -----------------------------------------------------
  // Example 3: Complex nesting - Navigation menu
  // -----------------------------------------------------
  // Use case: Multi-level menu navigation

  const navigation = page.getByRole("navigation");
  const accountMenu = navigation.getByRole("button", { name: "Account" });
  await accountMenu.click();

  // Click "Settings" inside the Account dropdown
  const dropdown = navigation.locator(".dropdown-menu");
  await dropdown.getByRole("link", { name: "Settings" }).click();

  // -----------------------------------------------------
  // Example 4: Filter by multiple conditions
  // -----------------------------------------------------
  // Use case: Find elements matching complex criteria

  // Get all articles that contain both "React" and "Tutorial"
  const reactTutorial = page
    .getByRole("article")
    .filter({ hasText: "React" })
    .filter({ hasText: "Tutorial" });

  await expect(reactTutorial).toHaveCount(1);

  // -----------------------------------------------------
  // Example 5: Product card with multiple actions
  // -----------------------------------------------------
  // Real-world: E-commerce product interactions

  const productCard = page
    .locator(".product-card")
    .filter({ hasText: "Wireless Headphones" });

  await productCard.getByRole("button", { name: "Quick View" }).click();
  await productCard.getByRole("button", { name: "Add to Wishlist" }).click();

  // Check price inside this specific product
  const price = productCard.locator(".price");
  await expect(price).toHaveText("$99.99");
});

// ============================================================================
// MATCHING TWO LOCATORS SIMULTANEOUSLY (AND Logic)
// ============================================================================
// Find elements that match BOTH locators at the same time
// Different from chaining - this is about the SAME element matching multiple conditions

test("Matching Two Locators Simultaneously", async ({ page }) => {
  await page.goto("https://example.com/dashboard");

  // -----------------------------------------------------
  // Using .and() for simultaneous matching
  // -----------------------------------------------------
  // Use case: Element must satisfy multiple independent conditions

  // Example 1: Button with specific role AND specific class
  const primarySubmitButton = page
    .getByRole("button", { name: "Submit" })
    .and(page.locator(".btn-primary"));
  await primarySubmitButton.click();

  // Example 2: Input field that is both required AND visible
  const requiredVisibleInput = page
    .getByLabel("Email")
    .and(page.locator("[required]"))
    .and(page.locator(":visible"));
  await requiredVisibleInput.fill("user@example.com");

  // -----------------------------------------------------
  // Real-world: Find active tab in a tab group
  // -----------------------------------------------------
  // Use case: Tab navigation - find the currently active tab

  const activeTab = page
    .getByRole("tab")
    .and(page.locator('[aria-selected="true"]'));
  await expect(activeTab).toHaveText("Profile");

  // -----------------------------------------------------
  // Real-world: Find enabled buttons with specific data attribute
  // -----------------------------------------------------
  // Use case: Dynamic forms where buttons have multiple states

  const validSubmitButton = page
    .getByRole("button", { name: /submit/i })
    .and(page.locator(":not([disabled])"))
    .and(page.locator('[data-valid="true"]'));
  await validSubmitButton.click();

  // -----------------------------------------------------
  // Complex example: E-commerce filters
  // -----------------------------------------------------
  // Use case: Product must match multiple filter criteria

  const filteredProduct = page
    .locator(".product")
    .and(page.locator('[data-category="electronics"]'))
    .and(page.locator('[data-price-range="50-100"]'))
    .and(page.locator('[data-in-stock="true"]'));

  await expect(filteredProduct).toHaveCount(3);
  await filteredProduct.first().click();
});

// ============================================================================
// MATCHING ONLY VISIBLE ELEMENTS
// ============================================================================
// Filter locators to only include elements that are visible to users
// Important for avoiding hidden elements, display:none, or off-screen items

test("Matching Only Visible Elements", async ({ page }) => {
  await page.goto("https://example.com");

  // -----------------------------------------------------
  // Method 1: Using locator.visible filter
  // -----------------------------------------------------
  // Use case: Ensure you're interacting with visible elements only

  // Get only visible buttons (excludes display:none, visibility:hidden, etc.)
  const visibleButtons = page.getByRole("button").locator("visible=true");
  await expect(visibleButtons).toHaveCount(5);

  // -----------------------------------------------------
  // Method 2: Using :visible CSS pseudo-class
  // -----------------------------------------------------

  const visibleLinks = page.locator("a:visible");
  await expect(visibleLinks.first()).toBeVisible();

  // -----------------------------------------------------
  // Method 3: Filter by visibility state
  // -----------------------------------------------------
  // Use case: Dynamic content that shows/hides

  // Only get list items that are currently visible
  const visibleItems = page
    .locator("li")
    .filter({ hasNotText: "" }) // Has content
    .locator("visible=true");

  // -----------------------------------------------------
  // Real-world: Dropdown menu interactions
  // -----------------------------------------------------
  // Use case: Only interact with visible menu items (after opening dropdown)

  // Open dropdown
  await page.getByRole("button", { name: "Options" }).click();

  // Get only visible menu items (hidden ones before dropdown opened are excluded)
  const visibleMenuItems = page.getByRole("menuitem").locator("visible=true");

  await visibleMenuItems.first().click();

  // -----------------------------------------------------
  // Real-world: Modal/Dialog handling
  // -----------------------------------------------------
  // Use case: Ensure we're clicking buttons in visible modal, not hidden ones

  // Multiple modals exist in DOM, but only one is visible
  const visibleModal = page.locator('[role="dialog"]').locator("visible=true");

  // Click close button in the VISIBLE modal only
  await visibleModal.getByRole("button", { name: "Close" }).click();

  // -----------------------------------------------------
  // Real-world: Tab content visibility
  // -----------------------------------------------------
  // Use case: Tabs hide/show content panels

  await page.getByRole("tab", { name: "Settings" }).click();

  // Get only the visible tab panel content
  const visibleTabPanel = page
    .locator('[role="tabpanel"]')
    .locator("visible=true");

  await expect(visibleTabPanel).toContainText("Settings Options");

  // -----------------------------------------------------
  // Combining with other filters
  // -----------------------------------------------------
  // Use case: Complex visibility requirements

  // Get visible products that are on sale
  const visibleSaleProducts = page
    .locator(".product")
    .filter({ hasText: "Sale" })
    .locator("visible=true")
    .and(page.locator("[data-discount]"));

  await expect(visibleSaleProducts).toHaveCount(3);
});

// ============================================================================
// BEST PRACTICES & COMMON PATTERNS
// ============================================================================

test("Best Practices for Locators", async ({ page }) => {
  await page.goto("https://example.com");

  // ✅ GOOD: Use semantic locators (getByRole, getByLabel)
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByLabel("Email").fill("test@example.com");

  // ✅ GOOD: Chain locators for specificity
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Confirm" }).click();

  // ✅ GOOD: Use filters for narrowing down
  const activeProduct = page
    .locator(".product")
    .filter({ hasText: "Featured" });

  // ❌ AVOID: Overly specific CSS selectors (brittle)
  // await page.locator('#app > div > div.container > div:nth-child(3)').click();

  // ❌ AVOID: XPath when semantic locators work
  // await page.locator('//button[@class="submit"]').click();

  // ✅ GOOD: Combine operators for complex scenarios
  const targetButton = page
    .getByRole("button")
    .and(page.locator(".primary"))
    .locator("visible=true");
});

// ============================================================================
// KEY TAKEAWAYS
// ============================================================================
/*
1. Locators are "recipes" - they search fresh on every action (resilient to re-renders)
2. Chain locators to narrow down: parent.child approach
3. Use operators (.and(), .or(), .not()) for complex matching
4. Filter by visibility to avoid hidden elements
5. Prefer semantic locators (getByRole, getByLabel) over CSS/XPath
6. Each locator action = fresh DOM query (no stale elements)
7. Locators auto-wait for elements to be actionable
*/
