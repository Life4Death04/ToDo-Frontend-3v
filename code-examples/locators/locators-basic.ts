// ============================================================================
// LOCATORS - BASIC FUNDAMENTALS
// ============================================================================
// This file covers the basic locator methods in Playwright
// Locators are the foundation of element interaction in Playwright tests

import { test, expect, Page } from "@playwright/test";

// ============================================================================
// IMPORTANT CONCEPT: HOW LOCATORS WORK
// ============================================================================
/*
KEY PRINCIPLE:
"Playwright re-queries the DOM for elements each time you use a locator, 
so it automatically finds the latest version of elements even if the page re-rendered"

What this means:
- Locators are "recipes" for finding elements, not the elements themselves
- Each action triggers a fresh DOM search
- If you perform 2 actions, the locator function runs twice
- This makes tests resilient to re-renders and dynamic content

Example:
  const button = page.getByRole('button', { name: 'Submit' });
  await button.click();      // Searches DOM (1st time)
  await button.isVisible();  // Searches DOM (2nd time)
  
  2 actions = 2 searches = Always finds the current state
*/

// ============================================================================
// LEARNING THE LOCATORS
// ============================================================================

test("Basic Locators - getByRole", async ({ page }) => {
  // -----------------------------------------------------
  // page.getByRole() - MOST RECOMMENDED
  // -----------------------------------------------------
  // Locates elements by accessibility attributes (ARIA roles)
  // Best for: Buttons, links, headings, inputs, checkboxes, etc.
  // Why best: Mirrors how users and screen readers interact with your app

  await page.goto("https://example.com/signup");

  // Example HTML:
  // <h3>Sign up</h3>
  // <label>
  //   <input type="checkbox" /> Subscribe
  // </label>
  // <button>Submit</button>

  // Locate checkbox by its role and accessible name
  await page.getByRole("checkbox", { name: "Subscribe" }).check();

  // Locate button with case-insensitive regex
  await page.getByRole("button", { name: /submit/i }).click();

  // -----------------------------------------------------
  // Common Roles and Use Cases
  // -----------------------------------------------------

  // Headings (h1-h6)
  await page.getByRole("heading", { name: "Welcome" }).isVisible();
  await page.getByRole("heading", { level: 1 }).isVisible(); // Specific level (h1)

  // Links
  await page.getByRole("link", { name: "Learn More" }).click();
  await page.getByRole("link", { name: /documentation/i }).click();

  // Buttons
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("button", { name: /delete|remove/i }).click();

  // Text inputs, textareas
  await page.getByRole("textbox", { name: "Username" }).fill("john_doe");

  // Radio buttons
  await page.getByRole("radio", { name: "Option A" }).check();

  // Checkboxes
  await page.getByRole("checkbox", { name: "Agree to terms" }).check();

  // Lists and list items
  await page.getByRole("list").isVisible();
  await page.getByRole("listitem").first().click();

  // Navigation
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Home" })
    .click();

  // Tables
  const table = page.getByRole("table");
  const firstRow = table.getByRole("row").first();
  await firstRow.getByRole("cell").nth(2).click();

  // Dialogs/Modals
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Close" }).click();
});

test("Basic Locators - getByText", async ({ page }) => {
  // -----------------------------------------------------
  // page.getByText() - Locate by visible text content
  // -----------------------------------------------------
  // Best for: Paragraphs, spans, divs with text, labels
  // Use case: Finding elements by what users actually see

  await page.goto("https://example.com/dashboard");

  // Example HTML: <span>Welcome, John</span>

  // Method 1: Contains (substring match) - DEFAULT
  await expect(page.getByText("Welcome, John")).toBeVisible();
  await expect(page.getByText("Welcome")).toBeVisible(); // Also matches "Welcome, John"

  // Method 2: Exact match
  await expect(page.getByText("Welcome, John", { exact: true })).toBeVisible();
  // Won't match "Welcome, John Doe" or "Welcome, Johnny"

  // Method 3: Regular expression (regex)
  await expect(page.getByText(/welcome, [A-Za-z]+$/i)).toBeVisible();
  // Matches "Welcome, John", "Welcome, Sarah", etc. (case-insensitive)

  // -----------------------------------------------------
  // Real-World Examples
  // -----------------------------------------------------

  // Success messages
  await expect(page.getByText("Successfully saved")).toBeVisible();
  await expect(page.getByText(/success|saved|complete/i)).toBeVisible();

  // Error messages
  const errorMessage = page.getByText("Invalid email address");
  await expect(errorMessage).toBeVisible();

  // User greetings (dynamic content)
  await expect(page.getByText(/Hello, \w+/)).toBeVisible(); // "Hello, John"

  // Product prices
  await expect(page.getByText("$99.99")).toBeVisible();

  // Status badges
  await expect(page.getByText("In Stock", { exact: true })).toBeVisible();
  await expect(page.getByText(/active|enabled/i)).toBeVisible();

  // Partial matches for long text
  await expect(page.getByText("Terms and Conditions")).toBeVisible(); // Matches paragraph containing this
});

test("Basic Locators - getByLabel", async ({ page }) => {
  // -----------------------------------------------------
  // page.getByLabel() - Locate form controls by label text
  // -----------------------------------------------------
  // Best for: Form inputs, textareas, selects
  // Use case: Most accessible way to find form fields
  // Mimics how users identify form fields

  await page.goto("https://example.com/form");

  // Example HTML: <label>Password <input type="password" /></label>
  await page.getByLabel("Password").fill("secret");

  // -----------------------------------------------------
  // Common Form Field Examples
  // -----------------------------------------------------

  // Text inputs
  await page.getByLabel("Email").fill("user@example.com");
  await page.getByLabel("First Name").fill("John");

  // Case-insensitive with regex
  await page.getByLabel(/username/i).fill("johndoe");

  // Textareas
  await page.getByLabel("Comments").fill("This is a long comment...");

  // Select dropdowns
  await page.getByLabel("Country").selectOption("USA");

  // Checkboxes
  await page.getByLabel("Subscribe to newsletter").check();
  await page.getByLabel("I agree to terms").check();

  // Radio buttons
  await page.getByLabel("Male").check();
  await page.getByLabel("Credit Card").check();

  // Date inputs
  await page.getByLabel("Birth Date").fill("2000-01-15");

  // Number inputs
  await page.getByLabel("Quantity").fill("5");

  // -----------------------------------------------------
  // Labels with different structures
  // -----------------------------------------------------

  // Label wrapping input: <label>Name <input /></label>
  await page.getByLabel("Name").fill("John");

  // Label with 'for' attribute: <label for="email">Email</label><input id="email" />
  await page.getByLabel("Email").fill("test@example.com");

  // aria-label: <input aria-label="Search" />
  await page.getByLabel("Search").fill("query");

  // aria-labelledby: <span id="label">Username</span><input aria-labelledby="label" />
  await page.getByLabel("Username").fill("user123");
});

test("Basic Locators - getByPlaceholder", async ({ page }) => {
  // -----------------------------------------------------
  // page.getByPlaceholder() - Locate by placeholder text
  // -----------------------------------------------------
  // Best for: Inputs with placeholder attributes
  // Use case: When labels aren't available or placeholder is the identifier

  await page.goto("https://example.com/search");

  // Example HTML: <input type="email" placeholder="name@example.com" />
  await page
    .getByPlaceholder("name@example.com")
    .fill("playwright@microsoft.com");

  // -----------------------------------------------------
  // Common Use Cases
  // -----------------------------------------------------

  // Search bars
  await page.getByPlaceholder("Search...").fill("React tutorial");
  await page.getByPlaceholder(/search/i).fill("JavaScript");

  // Email inputs
  await page.getByPlaceholder("Enter your email").fill("user@example.com");

  // Phone numbers
  await page.getByPlaceholder("(555) 123-4567").fill("5551234567");

  // Passwords
  await page.getByPlaceholder("Enter password").fill("securePass123");

  // Exact match
  await page
    .getByPlaceholder("name@example.com", { exact: true })
    .fill("test@test.com");

  // -----------------------------------------------------
  // Real-World Examples
  // -----------------------------------------------------

  // Login form
  await page.getByPlaceholder("Username or email").fill("john@example.com");
  await page.getByPlaceholder("Password").fill("mypassword");

  // Search with autocomplete
  const searchBox = page.getByPlaceholder("Search products...");
  await searchBox.fill("laptop");
  await searchBox.press("Enter");

  // Comment box
  await page.getByPlaceholder("Write a comment...").fill("Great article!");
});

test("Basic Locators - getByAltText", async ({ page }) => {
  // -----------------------------------------------------
  // page.getByAltText() - Locate by alt text attribute
  // -----------------------------------------------------
  // Best for: Images, icons with alt text
  // Use case: Accessibility-friendly way to find images
  // Important for screen readers

  await page.goto("https://example.com");

  // Example HTML: <img alt="playwright logo" src="/img/playwright-logo.svg" width="100" />
  await page.getByAltText("playwright logo").click();

  // -----------------------------------------------------
  // Common Use Cases
  // -----------------------------------------------------

  // Logo images
  await page.getByAltText("Company Logo").isVisible();
  await page.getByAltText(/logo/i).click();

  // Product images
  const productImage = page.getByAltText("Wireless Headphones");
  await expect(productImage).toBeVisible();
  await productImage.click(); // View product details

  // Avatar/Profile pictures
  await page.getByAltText("User Avatar").click();
  await page.getByAltText(/profile picture/i).isVisible();

  // Icons (if they have alt text)
  await page.getByAltText("Edit icon").click();
  await page.getByAltText("Delete icon").click();

  // Banner images
  await expect(page.getByAltText("Summer Sale Banner")).toBeVisible();

  // Thumbnails
  await page.getByAltText("Video thumbnail").click();

  // Exact match
  await page.getByAltText("Product Image", { exact: true }).isVisible();

  // -----------------------------------------------------
  // Verification Examples
  // -----------------------------------------------------

  // Check if image loaded
  const heroImage = page.getByAltText("Hero Banner");
  await expect(heroImage).toBeVisible();
  await expect(heroImage).toHaveAttribute("src", /banner\.jpg/);
});

test("Basic Locators - getByTitle", async ({ page }) => {
  // -----------------------------------------------------
  // page.getByTitle() - Locate by title attribute
  // -----------------------------------------------------
  // Best for: Elements with tooltips, title attributes
  // Use case: Icons, buttons, links with title tooltips

  await page.goto("https://example.com/dashboard");

  // Example HTML: <span title='Issues count'>25 issues</span>
  await expect(page.getByTitle("Issues count")).toHaveText("25 issues");

  // -----------------------------------------------------
  // Common Use Cases
  // -----------------------------------------------------

  // Tooltip elements
  await page.getByTitle("Click to edit").click();
  await expect(page.getByTitle("More information")).toBeVisible();

  // Icon buttons with tooltips
  await page.getByTitle("Settings").click();
  await page.getByTitle("Notifications").click();
  await page.getByTitle(/help|info/i).click();

  // Links with title attributes
  await page.getByTitle("Go to homepage").click();

  // Abbreviations
  const abbreviation = page.getByTitle("HyperText Markup Language");
  await expect(abbreviation).toHaveText("HTML");

  // Progress indicators
  await expect(page.getByTitle("Upload progress: 75%")).toBeVisible();

  // -----------------------------------------------------
  // Real-World Examples
  // -----------------------------------------------------

  // Social media icons
  await page.getByTitle("Share on Twitter").click();
  await page.getByTitle("Share on Facebook").click();

  // Action buttons in tables
  await page.getByTitle("Delete row").click();
  await page.getByTitle("Edit entry").click();

  // Status indicators
  await expect(page.getByTitle("Connection status: Online")).toBeVisible();

  // With regex
  await page.getByTitle(/close|dismiss/i).click();
});

test("Basic Locators - getByTestId", async ({ page }) => {
  // -----------------------------------------------------
  // page.getByTestId() - Locate by data-testid attribute
  // -----------------------------------------------------
  // Best for: Elements specifically marked for testing
  // Use case: When other locators aren't suitable or reliable
  // Less preferred than semantic locators but very stable

  await page.goto("https://example.com");

  // Example HTML: <button data-testid="directions">Itinéraire</button>
  await page.getByTestId("directions").click();

  // -----------------------------------------------------
  // When to Use data-testid
  // -----------------------------------------------------
  /*
  Use data-testid when:
  - Text content changes frequently (internationalization)
  - No accessible role/label available
  - Complex dynamic components
  - Need stable selector that won't change with design updates
  
  Avoid when:
  - Semantic locators (getByRole, getByLabel) work
  - It's just laziness (prefer accessibility-first approach)
  */

  // -----------------------------------------------------
  // Common Use Cases
  // -----------------------------------------------------

  // Dynamic components
  await page.getByTestId("user-profile-card").click();
  await expect(page.getByTestId("loading-spinner")).toBeVisible();

  // Forms
  await page.getByTestId("login-form").getByRole("button").click();
  await page.getByTestId("email-input").fill("user@example.com");

  // Navigation
  await page.getByTestId("mobile-menu-toggle").click();
  await page.getByTestId("sidebar").isVisible();

  // Cards/Widgets
  const productCard = page.getByTestId("product-card-123");
  await productCard.click();

  // Modals/Dialogs
  await expect(page.getByTestId("confirmation-dialog")).toBeVisible();
  await page.getByTestId("modal-close-button").click();

  // Lists
  const todoList = page.getByTestId("todo-list");
  await expect(todoList.getByTestId("todo-item")).toHaveCount(5);

  // -----------------------------------------------------
  // Configuration Note
  // -----------------------------------------------------
  /*
  You can configure Playwright to use a different attribute:
  
  In playwright.config.ts:
  use: {
    testIdAttribute: 'data-test-id'  // or 'data-cy', 'data-automation-id', etc.
  }
  
  Then: <button data-test-id="submit">Submit</button>
  */
});

test("Basic Locators - CSS Selectors", async ({ page }) => {
  // -----------------------------------------------------
  // page.locator() - Locate by CSS selector or XPath
  // -----------------------------------------------------
  // Use case: When semantic locators aren't sufficient
  // Less preferred but sometimes necessary

  await page.goto("https://example.com");

  // CSS Selectors
  await page.locator(".btn-primary").click();
  await page.locator("#submit-button").click();
  await page.locator("button.active").click();
  await page.locator('[data-action="delete"]').click();

  // Complex CSS
  await page.locator("nav > ul > li:nth-child(2)").click();
  await page.locator(".product-card:has(.sale-badge)").click();

  // -----------------------------------------------------
  // XPath (less common, avoid if possible)
  // -----------------------------------------------------

  await page.locator('xpath=//button[@class="submit"]').click();
  await page.locator('xpath=//div[contains(@class, "modal")]').isVisible();

  // -----------------------------------------------------
  // When to use CSS/XPath
  // -----------------------------------------------------
  /*
  Use CSS/XPath when:
  - Semantic locators don't work
  - Need very specific DOM traversal
  - Testing legacy code without good accessibility
  
  Prefer semantic locators (getByRole, etc.) whenever possible!
  */
});

test("Basic Locators - Shadow DOM", async ({ page }) => {
  // -----------------------------------------------------
  // Locating in Shadow DOM
  // -----------------------------------------------------
  // Shadow DOM = Isolated DOM subtree for Web Components
  // Use case: Testing Web Components, custom elements

  await page.goto("https://example.com/web-components");

  // Playwright can pierce shadow DOM automatically in many cases
  await page.locator("my-component").locator("button").click();

  // For complex shadow DOM
  const shadowHost = page.locator("custom-widget");
  await shadowHost.locator("button.action").click();

  // Multiple levels of shadow DOM
  await page
    .locator("outer-component")
    .locator("inner-component")
    .locator("button")
    .click();

  // -----------------------------------------------------
  // What is Shadow DOM?
  // -----------------------------------------------------
  /*
  Shadow DOM = Isolation mechanism for web components
  - Styles and markup don't leak in or out
  - Like a "bubble" around component internals
  - Used by browser elements: <video> controls, <input type="date">
  
  Example:
  <my-button>
    #shadow-root
      <style>button { color: red; }</style>
      <button>Click</button>
  </my-button>
  */
});

test("Basic Locators - Frame Locator & IFrames", async ({ page }) => {
  // -----------------------------------------------------
  // page.frameLocator() - Access elements inside iframes
  // -----------------------------------------------------
  // IFrame = Embedded page within your page
  // Use case: Payment forms, Auth0 login, embedded widgets

  await page.goto("https://example.com/checkout");

  // Locate the iframe first
  const paymentFrame = page.frameLocator("iframe#payment-form");

  // Then interact with elements inside
  await paymentFrame.getByLabel("Card Number").fill("4242424242424242");
  await paymentFrame.getByLabel("Expiry Date").fill("12/25");
  await paymentFrame.getByLabel("CVC").fill("123");
  await paymentFrame.getByRole("button", { name: "Pay" }).click();

  // -----------------------------------------------------
  // Real-World Examples
  // -----------------------------------------------------

  // Auth0 login iframe
  const authFrame = page.frameLocator('iframe[name="auth0"]');
  await authFrame.getByLabel("Email").fill("user@example.com");
  await authFrame.getByLabel("Password").fill("password");
  await authFrame.getByRole("button", { name: "Login" }).click();

  // Stripe payment iframe
  const stripeFrame = page.frameLocator('iframe[title*="Stripe"]');
  await stripeFrame.getByPlaceholder("Card number").fill("4242424242424242");

  // Embedded video player
  const videoFrame = page.frameLocator('iframe[src*="youtube"]');
  await videoFrame.getByRole("button", { name: "Play" }).click();

  // Google reCAPTCHA
  const recaptchaFrame = page.frameLocator('iframe[title="reCAPTCHA"]');
  await recaptchaFrame.getByRole("checkbox").check();

  // -----------------------------------------------------
  // Important Notes
  // -----------------------------------------------------
  /*
  - Regular locators CAN'T reach into iframes
  - Must use frameLocator() first
  - Each iframe is isolated (security feature)
  - FrameLocator works just like page, but scoped to iframe
  */
});

// ============================================================================
// FILTERING LOCATORS
// ============================================================================

test("Filtering Locators - By Text", async ({ page }) => {
  // -----------------------------------------------------
  // Filter locators by text content
  // -----------------------------------------------------
  // Use case: Multiple similar elements, need specific one

  await page.goto("https://example.com/products");

  // Example HTML:
  // <ul>
  //   <li><h3>Product 1</h3><button>Add to cart</button></li>
  //   <li><h3>Product 2</h3><button>Add to cart</button></li>
  // </ul>

  // Filter BY having specific text
  await page
    .getByRole("listitem")
    .filter({ hasText: "Product 2" }) // Only list items containing "Product 2"
    .getByRole("button", { name: "Add to cart" })
    .click();

  // Filter by NOT having text
  // Get all items that are in stock (exclude "Out of stock")
  await expect(
    page.getByRole("listitem").filter({ hasNotText: "Out of stock" })
  ).toHaveCount(5); // 5 in-stock items

  // -----------------------------------------------------
  // Real-World Examples
  // -----------------------------------------------------

  // Click "Edit" button for specific user
  await page
    .getByRole("row")
    .filter({ hasText: "john@example.com" })
    .getByRole("button", { name: "Edit" })
    .click();

  // Find active tab
  await expect(
    page.getByRole("tab").filter({ hasText: "Settings" })
  ).toHaveAttribute("aria-selected", "true");

  // Get all error fields (exclude successful ones)
  const errorFields = page
    .locator(".form-field")
    .filter({ hasNotText: "Valid" });
  await expect(errorFields).toHaveCount(2);

  // Filter with regex
  await page
    .getByRole("article")
    .filter({ hasText: /react|vue|angular/i })
    .first()
    .click();
});

test("Filtering Locators - By Child/Descendant", async ({ page }) => {
  // -----------------------------------------------------
  // Filter locators by child elements they contain
  // -----------------------------------------------------
  // Use case: Find parent based on what's inside it

  await page.goto("https://example.com/products");

  // Example HTML:
  // <ul>
  //   <li><h3>Product 1</h3><button>Add to cart</button></li>
  //   <li><h3>Product 2</h3><button>Add to cart</button></li>
  // </ul>

  // Filter by HAS (contains child)
  await page
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { name: "Product 2" }) })
    .getByRole("button", { name: "Add to cart" })
    .click();

  // Verify count
  await expect(
    page
      .getByRole("listitem")
      .filter({ has: page.getByRole("heading", { name: "Product 2" }) })
  ).toHaveCount(1); // Only 1 item with that heading

  // Filter by DOES NOT HAVE (hasNot)
  // Get list items that don't have a "Sale" badge
  await expect(
    page.getByRole("listitem").filter({ hasNot: page.locator(".sale-badge") })
  ).toHaveCount(3);

  // -----------------------------------------------------
  // Real-World Examples
  // -----------------------------------------------------

  // Find product card containing specific price
  const affordableProduct = page
    .locator(".product-card")
    .filter({ has: page.locator('.price:has-text("$9.99")') });
  await affordableProduct.click();

  // Find table row containing "Active" status
  await page
    .getByRole("row")
    .filter({ has: page.locator(".status.active") })
    .getByRole("button", { name: "Edit" })
    .click();

  // Find article with specific author
  await page
    .getByRole("article")
    .filter({ has: page.locator('.author:has-text("John Doe")') })
    .getByRole("link", { name: "Read More" })
    .click();

  // Find cards WITHOUT a discount badge
  const fullPriceProducts = page
    .locator(".product-card")
    .filter({ hasNot: page.locator(".discount-badge") });
  await expect(fullPriceProducts).toHaveCount(8);

  // Complex: Find product with specific rating AND price range
  await page
    .locator(".product")
    .filter({ has: page.locator('.rating[data-stars="5"]') })
    .filter({ has: page.locator('.price:has-text("$")') })
    .filter({ hasText: "Premium" })
    .first()
    .click();
});

// ============================================================================
// KEY TAKEAWAYS - BASIC LOCATORS
// ============================================================================
/*
RECOMMENDED PRIORITY (Use in this order):
1. getByRole()        - Best for semantic HTML, accessibility
2. getByLabel()       - Best for form fields
3. getByPlaceholder() - Good for inputs without labels
4. getByText()        - Good for finding text content
5. getByAltText()     - Good for images
6. getByTitle()       - Good for tooltips
7. getByTestId()      - When others don't work (stable but not semantic)
8. CSS/XPath          - Last resort

IMPORTANT PRINCIPLES:
- Locators re-query DOM on every action (no stale elements)
- Each action = fresh search (resilient to re-renders)
- Prefer semantic locators (mirror how users interact)
- Use filters to narrow down when multiple matches exist
- Shadow DOM and iframes require special handling

BEST PRACTICES:
✅ Use semantic locators (getByRole, getByLabel)
✅ Write tests that mirror user behavior
✅ Use data-testid only when necessary
❌ Avoid fragile CSS selectors (#app > div > div:nth-child(3))
❌ Avoid XPath unless absolutely needed
*/
