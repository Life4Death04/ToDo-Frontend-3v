// ============================================================================
// REAL-WORLD TEST EXAMPLES - TODO APP
// ============================================================================
// Complete, production-ready test examples for a Todo application
// These demonstrate full test structure with proper setup, actions, and assertions

import { test, expect } from "@playwright/test";

// ============================================================================
// TEST 1: USER AUTHENTICATION FLOW
// ============================================================================
// Tests the complete login process including validation and navigation

test.describe("User Authentication", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to app before each test
    await page.goto("http://localhost:5173");
  });

  test("should successfully login with valid credentials and navigate to dashboard", async ({
    page,
  }) => {
    // ARRANGE - Start at login page
    await page.getByRole("link", { name: /login|sign in/i }).click();
    await expect(page).toHaveURL(/\/login/);
    await expect(
      page.getByRole("heading", { name: /login|sign in/i })
    ).toBeVisible();

    // ACT - Fill login form
    await page.getByLabel(/email|username/i).fill("testuser@example.com");
    await page.getByLabel(/password/i).fill("SecurePassword123!");

    // Optional: Check "Remember me" if it exists
    const rememberMe = page.getByLabel(/remember me/i);
    if (await rememberMe.isVisible().catch(() => false)) {
      await rememberMe.check();
    }

    // Submit form
    await page.getByRole("button", { name: /login|sign in/i }).click();

    // ASSERT - Verify successful login
    // 1. URL changes to dashboard
    await expect(page).toHaveURL(/\/(dashboard|home|tasks)/);

    // 2. Loading spinner disappears
    await expect(page.getByTestId("loading-spinner")).toBeHidden();

    // 3. User profile/name appears
    await expect(page.getByText(/welcome|hello/i)).toBeVisible();

    // 4. Main navigation is visible
    await expect(page.getByRole("navigation")).toBeVisible();

    // 5. Todo list container is visible
    await expect(page.getByTestId("todo-list")).toBeVisible();

    // 6. User menu/avatar is present
    await expect(
      page.getByRole("button", { name: /account|profile|user/i })
    ).toBeVisible();
  });

  test("should show validation errors for invalid login credentials", async ({
    page,
  }) => {
    // ARRANGE
    await page.getByRole("link", { name: /login|sign in/i }).click();

    // ACT - Try to submit empty form
    await page.getByRole("button", { name: /login|sign in/i }).click();

    // ASSERT - Check validation errors appear
    await expect(
      page.getByText(/email.*required|username.*required/i)
    ).toBeVisible();
    await expect(page.getByText(/password.*required/i)).toBeVisible();

    // ACT - Try with invalid email format
    await page.getByLabel(/email|username/i).fill("invalid-email");
    await page.getByLabel(/password/i).fill("short");
    await page.getByRole("button", { name: /login|sign in/i }).click();

    // ASSERT - Check specific validation errors
    await expect(page.getByText(/invalid email|valid email/i)).toBeVisible();
    await expect(
      page.getByText(/password.*at least|password.*minimum/i)
    ).toBeVisible();

    // ACT - Try with wrong credentials
    await page.getByLabel(/email|username/i).fill("wrong@example.com");
    await page.getByLabel(/password/i).fill("WrongPassword123!");
    await page.getByRole("button", { name: /login|sign in/i }).click();

    // ASSERT - Check error message
    await expect(
      page.getByText(/invalid credentials|incorrect email or password/i)
    ).toBeVisible();

    // Verify still on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test("should allow user to logout successfully", async ({ page }) => {
    // ARRANGE - Login first
    await page.getByRole("link", { name: /login|sign in/i }).click();
    await page.getByLabel(/email|username/i).fill("testuser@example.com");
    await page.getByLabel(/password/i).fill("SecurePassword123!");
    await page.getByRole("button", { name: /login|sign in/i }).click();

    // Wait for dashboard to load
    await expect(page).toHaveURL(/\/(dashboard|home|tasks)/);

    // ACT - Logout
    // Open user menu (might be in dropdown)
    await page
      .getByRole("button", { name: /account|profile|user|menu/i })
      .click();

    // Click logout
    await page.getByRole("button", { name: /logout|sign out/i }).click();

    // ASSERT - Verify logout
    // 1. Redirected to login or home page
    await expect(page).toHaveURL(/\/(login|home|$)/);

    // 2. User-specific elements are gone
    await expect(
      page.getByRole("button", { name: /account|profile/i })
    ).not.toBeVisible();

    // 3. Login link/button is visible again
    await expect(
      page.getByRole("link", { name: /login|sign in/i })
    ).toBeVisible();

    // 4. Cannot access protected routes
    await page.goto("http://localhost:5173/dashboard");
    await expect(page).toHaveURL(/\/login/); // Redirects to login
  });
});

// ============================================================================
// TEST 2: TODO CRUD OPERATIONS
// ============================================================================
// Tests creating, reading, updating, and deleting todos

test.describe("Todo Management", () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto("http://localhost:5173/login");
    await page.getByLabel(/email|username/i).fill("testuser@example.com");
    await page.getByLabel(/password/i).fill("SecurePassword123!");
    await page.getByRole("button", { name: /login|sign in/i }).click();
    await expect(page).toHaveURL(/\/(dashboard|home|tasks)/);
  });

  test("should create a new todo with all details and display it in the list", async ({
    page,
  }) => {
    // ARRANGE - Get initial todo count
    const initialTodos = page
      .getByRole("listitem")
      .filter({ has: page.locator('.todo-item, [data-testid*="todo"]') });
    const initialCount = await initialTodos.count().catch(() => 0);

    // ACT - Open create todo form/modal
    await page.getByRole("button", { name: /add|new|create.*todo/i }).click();

    // Wait for form to appear
    await expect(
      page.getByRole("dialog", { name: /add|new|create.*todo/i })
    ).toBeVisible();

    // Fill todo details
    await page
      .getByLabel(/title|name|task/i)
      .fill("Complete Playwright testing guide");
    await page
      .getByLabel(/description|details|notes/i)
      .fill(
        "Write comprehensive examples for locators, assertions, and actions"
      );

    // Set priority if available
    const prioritySelect = page.getByLabel(/priority/i);
    if (await prioritySelect.isVisible().catch(() => false)) {
      await prioritySelect.selectOption("high");
    }

    // Set due date if available
    const dueDateInput = page.getByLabel(/due date|deadline/i);
    if (await dueDateInput.isVisible().catch(() => false)) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      await dueDateInput.fill(tomorrow.toISOString().split("T")[0]);
    }

    // Add tags/categories if available
    const tagsInput = page.getByLabel(/tags|category|categories/i);
    if (await tagsInput.isVisible().catch(() => false)) {
      await tagsInput.fill("Testing, Documentation");
    }

    // Submit form
    await page.getByRole("button", { name: /save|create|add/i }).click();

    // ASSERT - Verify todo was created
    // 1. Modal closes
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // 2. Success message appears
    await expect(
      page.getByText(/todo.*created|task.*added|successfully added/i)
    ).toBeVisible();

    // 3. New todo appears in list
    const newTodo = page.getByRole("listitem").filter({
      hasText: "Complete Playwright testing guide",
    });
    await expect(newTodo).toBeVisible();

    // 4. Todo shows correct details
    await expect(newTodo).toContainText("Complete Playwright testing guide");
    await expect(newTodo).toContainText(/Write comprehensive examples/);

    // 5. Priority badge is visible (if feature exists)
    if (await prioritySelect.isVisible().catch(() => false)) {
      await expect(newTodo.locator(".priority, [data-priority]")).toContainText(
        /high/i
      );
    }

    // 6. Todo count increased
    await expect(initialTodos).toHaveCount(initialCount + 1);

    // 7. Todo is in "pending" or "active" state by default
    await expect(newTodo.getByRole("checkbox")).not.toBeChecked();
  });

  test("should mark todo as complete and move it to completed section", async ({
    page,
  }) => {
    // ARRANGE - Create a test todo first
    await page.getByRole("button", { name: /add|new|create.*todo/i }).click();
    await page.getByLabel(/title|name|task/i).fill("Test todo for completion");
    await page.getByRole("button", { name: /save|create|add/i }).click();

    const testTodo = page.getByRole("listitem").filter({
      hasText: "Test todo for completion",
    });
    await expect(testTodo).toBeVisible();

    // ACT - Mark as complete
    // Method 1: Click checkbox
    await testTodo.getByRole("checkbox").check();

    // Alternative Method 2: Click complete button if exists
    // await testTodo.getByRole('button', { name: /complete|done/i }).click();

    // ASSERT - Verify completion
    // 1. Checkbox is checked
    await expect(testTodo.getByRole("checkbox")).toBeChecked();

    // 2. Todo has completed styling (strikethrough, faded, etc.)
    await expect(testTodo).toHaveClass(/completed|done|finished/);

    // 3. Success message
    await expect(page.getByText(/completed|marked.*complete/i)).toBeVisible();

    // 4. If app has separate completed section, check it moved there
    const completedSection = page.getByRole("region", { name: /completed/i });
    if (await completedSection.isVisible().catch(() => false)) {
      await expect(completedSection).toContainText("Test todo for completion");
    }

    // 5. Active/pending count decreased
    const activeCount = page.getByTestId("active-count");
    if (await activeCount.isVisible().catch(() => false)) {
      await expect(activeCount).not.toContainText("0");
    }

    // ACT - Unmark as complete
    await testTodo.getByRole("checkbox").uncheck();

    // ASSERT - Verify back to active
    await expect(testTodo.getByRole("checkbox")).not.toBeChecked();
    await expect(testTodo).not.toHaveClass(/completed|done|finished/);
  });

  test("should edit existing todo and save changes", async ({ page }) => {
    // ARRANGE - Create a todo to edit
    await page.getByRole("button", { name: /add|new|create.*todo/i }).click();
    await page.getByLabel(/title|name|task/i).fill("Original Todo Title");
    await page.getByLabel(/description|details/i).fill("Original description");
    await page.getByRole("button", { name: /save|create|add/i }).click();

    const todoToEdit = page.getByRole("listitem").filter({
      hasText: "Original Todo Title",
    });
    await expect(todoToEdit).toBeVisible();

    // ACT - Open edit mode
    // Method 1: Click edit button
    await todoToEdit.getByRole("button", { name: /edit/i }).click();

    // Alternative Method 2: Double click on todo
    // await todoToEdit.dblclick();

    // Wait for edit form
    await expect(page.getByRole("dialog", { name: /edit/i })).toBeVisible();

    // Modify todo details
    await page.getByLabel(/title|name|task/i).fill("Updated Todo Title");
    await page
      .getByLabel(/description|details/i)
      .fill("Updated description with more details");

    // Change priority
    const prioritySelect = page.getByLabel(/priority/i);
    if (await prioritySelect.isVisible().catch(() => false)) {
      await prioritySelect.selectOption("medium");
    }

    // Save changes
    await page.getByRole("button", { name: /save|update/i }).click();

    // ASSERT - Verify changes saved
    // 1. Modal closes
    await expect(page.getByRole("dialog")).not.toBeVisible();

    // 2. Success message
    await expect(page.getByText(/updated|saved|changes.*saved/i)).toBeVisible();

    // 3. Todo shows new title
    const updatedTodo = page.getByRole("listitem").filter({
      hasText: "Updated Todo Title",
    });
    await expect(updatedTodo).toBeVisible();

    // 4. Old title is gone
    await expect(
      page.getByText("Original Todo Title", { exact: true })
    ).not.toBeVisible();

    // 5. Description is updated
    await expect(updatedTodo).toContainText(
      "Updated description with more details"
    );

    // 6. Priority changed (if feature exists)
    if (await prioritySelect.isVisible().catch(() => false)) {
      await expect(updatedTodo).toContainText(/medium/i);
    }
  });

  test("should delete todo after confirmation", async ({ page }) => {
    // ARRANGE - Create todos to delete
    const todosToCreate = [
      "Todo to keep",
      "Todo to delete",
      "Another todo to keep",
    ];

    for (const title of todosToCreate) {
      await page.getByRole("button", { name: /add|new|create.*todo/i }).click();
      await page.getByLabel(/title|name|task/i).fill(title);
      await page.getByRole("button", { name: /save|create|add/i }).click();
      await page.waitForTimeout(500); // Small delay between creations
    }

    const todoToDelete = page.getByRole("listitem").filter({
      hasText: "Todo to delete",
    });
    await expect(todoToDelete).toBeVisible();

    // Get initial count
    const allTodos = page.getByRole("listitem");
    const initialCount = await allTodos.count();

    // ACT - Delete todo
    // Set up dialog handler before triggering delete
    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toContain(/delete|remove/i);
      await dialog.accept();
    });

    // Click delete button
    await todoToDelete.getByRole("button", { name: /delete|remove/i }).click();

    // If using modal instead of browser confirm:
    // await expect(page.getByRole('dialog', { name: /delete|confirm/i })).toBeVisible();
    // await page.getByRole('button', { name: /confirm|yes|delete/i }).click();

    // ASSERT - Verify deletion
    // 1. Success message
    await expect(page.getByText(/deleted|removed/i)).toBeVisible();

    // 2. Todo is no longer in the list
    await expect(todoToDelete).not.toBeVisible();
    await expect(
      page.getByText("Todo to delete", { exact: true })
    ).not.toBeVisible();

    // 3. Other todos still exist
    await expect(page.getByText("Todo to keep")).toBeVisible();
    await expect(page.getByText("Another todo to keep")).toBeVisible();

    // 4. Count decreased by 1
    await expect(allTodos).toHaveCount(initialCount - 1);
  });
});

// ============================================================================
// TEST 3: TODO LIST FILTERING AND SORTING
// ============================================================================
// Tests filtering by status, searching, and sorting functionality

test.describe("Todo Filtering and Search", () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto("http://localhost:5173/login");
    await page.getByLabel(/email|username/i).fill("testuser@example.com");
    await page.getByLabel(/password/i).fill("SecurePassword123!");
    await page.getByRole("button", { name: /login|sign in/i }).click();
    await expect(page).toHaveURL(/\/(dashboard|home|tasks)/);

    // Create test todos with different states
    const testTodos = [
      { title: "Buy groceries", priority: "high", complete: false },
      {
        title: "Finish project documentation",
        priority: "medium",
        complete: true,
      },
      {
        title: "Call dentist for appointment",
        priority: "low",
        complete: false,
      },
      { title: "Review pull requests", priority: "high", complete: true },
      { title: "Update dependencies", priority: "medium", complete: false },
    ];

    for (const todo of testTodos) {
      await page.getByRole("button", { name: /add|new|create.*todo/i }).click();
      await page.getByLabel(/title|name|task/i).fill(todo.title);

      const prioritySelect = page.getByLabel(/priority/i);
      if (await prioritySelect.isVisible().catch(() => false)) {
        await prioritySelect.selectOption(todo.priority);
      }

      await page.getByRole("button", { name: /save|create|add/i }).click();
      await page.waitForTimeout(300);

      if (todo.complete) {
        const createdTodo = page
          .getByRole("listitem")
          .filter({ hasText: todo.title });
        await createdTodo.getByRole("checkbox").check();
      }
    }
  });

  test("should filter todos by status (all, active, completed)", async ({
    page,
  }) => {
    // ARRANGE - Get filter buttons/tabs
    const allFilter = page.getByRole("button", { name: /all|show all/i });
    const activeFilter = page.getByRole("button", { name: /active|pending/i });
    const completedFilter = page.getByRole("button", {
      name: /completed|done/i,
    });

    // ACT & ASSERT - Filter by All
    await allFilter.click();

    await expect(page.getByText("Buy groceries")).toBeVisible();
    await expect(page.getByText("Finish project documentation")).toBeVisible();
    await expect(page.getByText("Call dentist for appointment")).toBeVisible();
    await expect(page.getByText("Review pull requests")).toBeVisible();
    await expect(page.getByText("Update dependencies")).toBeVisible();

    const allTodos = page.getByRole("listitem").filter({
      has: page.locator('.todo-item, [data-testid*="todo"]'),
    });
    await expect(allTodos).toHaveCount(5);

    // ACT & ASSERT - Filter by Active
    await activeFilter.click();

    await expect(page.getByText("Buy groceries")).toBeVisible();
    await expect(page.getByText("Call dentist for appointment")).toBeVisible();
    await expect(page.getByText("Update dependencies")).toBeVisible();

    await expect(
      page.getByText("Finish project documentation")
    ).not.toBeVisible();
    await expect(page.getByText("Review pull requests")).not.toBeVisible();

    const activeTodos = page.getByRole("listitem").filter({
      has: page.locator('.todo-item, [data-testid*="todo"]'),
    });
    await expect(activeTodos).toHaveCount(3);

    // ACT & ASSERT - Filter by Completed
    await completedFilter.click();

    await expect(page.getByText("Finish project documentation")).toBeVisible();
    await expect(page.getByText("Review pull requests")).toBeVisible();

    await expect(page.getByText("Buy groceries")).not.toBeVisible();
    await expect(
      page.getByText("Call dentist for appointment")
    ).not.toBeVisible();
    await expect(page.getByText("Update dependencies")).not.toBeVisible();

    const completedTodos = page.getByRole("listitem").filter({
      has: page.locator('.todo-item, [data-testid*="todo"]'),
    });
    await expect(completedTodos).toHaveCount(2);
  });

  test("should search todos and show matching results", async ({ page }) => {
    // ARRANGE - Locate search input
    const searchInput = page.getByPlaceholder(/search|find/i);

    // ACT & ASSERT - Search for specific term
    await searchInput.fill("project");

    // Should show matching todos
    await expect(page.getByText("Finish project documentation")).toBeVisible();

    // Should hide non-matching todos
    await expect(page.getByText("Buy groceries")).not.toBeVisible();
    await expect(page.getByText("Call dentist")).not.toBeVisible();

    // ACT & ASSERT - Clear search
    await searchInput.clear();

    // All todos visible again
    await expect(page.getByText("Buy groceries")).toBeVisible();
    await expect(page.getByText("Finish project documentation")).toBeVisible();
    await expect(page.getByText("Call dentist")).toBeVisible();

    // ACT & ASSERT - Search with no results
    await searchInput.fill("nonexistent task xyz");

    // No todos visible
    const visibleTodos = page.getByRole("listitem").filter({
      has: page.locator('.todo-item, [data-testid*="todo"]'),
    });
    await expect(visibleTodos).toHaveCount(0);

    // Empty state message
    await expect(
      page.getByText(/no.*found|no results|no todos match/i)
    ).toBeVisible();

    // ACT & ASSERT - Search is case-insensitive
    await searchInput.fill("GROCERIES");
    await expect(page.getByText("Buy groceries")).toBeVisible();
  });

  test("should sort todos by different criteria", async ({ page }) => {
    // ARRANGE - Get sort dropdown
    const sortDropdown = page
      .getByLabel(/sort|order/i)
      .or(page.getByRole("button", { name: /sort/i }));

    // ACT & ASSERT - Sort by priority (high to low)
    if (await sortDropdown.isVisible()) {
      await sortDropdown.click();
      await page
        .getByRole("option", { name: /priority/i })
        .or(page.getByText(/priority.*high to low/i))
        .click();

      // High priority todos appear first
      const firstTodo = page.getByRole("listitem").first();
      await expect(firstTodo).toContainText(
        /Buy groceries|Review pull requests/
      );
    }

    // ACT & ASSERT - Sort alphabetically
    if (await sortDropdown.isVisible()) {
      await sortDropdown.click();
      await page
        .getByRole("option", { name: /alphabetical|name|a.*z/i })
        .click();

      const firstTodo = page.getByRole("listitem").first();
      await expect(firstTodo).toContainText("Buy groceries"); // First alphabetically
    }

    // ACT & ASSERT - Sort by date created
    if (await sortDropdown.isVisible()) {
      await sortDropdown.click();
      await page.getByRole("option", { name: /date|newest|recent/i }).click();

      // Most recent appears first
      const firstTodo = page.getByRole("listitem").first();
      await expect(firstTodo).toContainText("Update dependencies"); // Last created
    }
  });

  test("should combine filtering and searching together", async ({ page }) => {
    // ARRANGE
    const searchInput = page.getByPlaceholder(/search|find/i);
    const activeFilter = page.getByRole("button", { name: /active|pending/i });

    // ACT - Filter active + search
    await activeFilter.click();
    await searchInput.fill("update");

    // ASSERT - Only active todos matching search
    await expect(page.getByText("Update dependencies")).toBeVisible();

    // Completed todos with "update" should be hidden
    await expect(page.getByText("Buy groceries")).not.toBeVisible();
    await expect(
      page.getByText("Finish project documentation")
    ).not.toBeVisible();

    const visibleTodos = page.getByRole("listitem").filter({
      has: page.locator('.todo-item, [data-testid*="todo"]'),
    });
    await expect(visibleTodos).toHaveCount(1);

    // ACT - Change to completed filter with same search
    const completedFilter = page.getByRole("button", {
      name: /completed|done/i,
    });
    await completedFilter.click();

    // ASSERT - No results (no completed todos match "update")
    await expect(visibleTodos).toHaveCount(0);
    await expect(page.getByText(/no.*found|no results/i)).toBeVisible();
  });
});
