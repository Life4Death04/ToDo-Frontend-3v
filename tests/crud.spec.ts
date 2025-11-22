import { test, expect } from "@playwright/test";

test.describe("CRUD Operations", () => {
  //Login before all tests
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    //Login
    await page
      .getByRole("textbox", { name: "Enter your email address" })
      .click();
    await page
      .getByRole("textbox", { name: "Enter your email address" })
      .fill("samiraprincesa@gmail.com");
    await page
      .getByRole("textbox", { name: "Enter your email address" })
      .press("Tab");
    await page
      .getByRole("textbox", { name: "Enter your password" })
      .fill("contra");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL(/\/accounts\/\d+/);
  });

  test("has to create a new task", async ({ page }) => {
    //Create a todo
    await page
      .locator("header")
      .filter({ hasText: "All My Tasks+ Add Task" })
      .getByRole("button")
      .click();
    await page.getByRole("textbox", { name: "Enter task name" }).click();
    await page
      .getByRole("textbox", { name: "Enter task name" })
      .fill("Testing Task");
    await page.locator('input[name="dueDate"]').fill("2025-11-14");
    await page.locator('select[name="priority"]').selectOption("HIGH");
    await page.getByRole("textbox", { name: "Enter task content" }).click();
    await page
      .getByRole("textbox", { name: "Enter task content" })
      .fill("testing description");
    await page.getByRole("button", { name: "Create Task" }).click();
    await expect(page.getByText("Testing Task")).toBeVisible();
  });

  test("has to checked an existing task", async ({ page }) => {
    await page
      .getByTestId("TasksTable")
      .getByRole("listitem")
      .first()
      .getByTestId("checkTaskBtn")
      .click();
    await expect(page.getByTestId("taskStatus").first()).toHaveText("Done");
    await expect(page.getByTestId("checkedTasks")).toHaveText("1/1");
  });

  test("has to edit an existing task", async ({ page }) => {
    await page
      .getByTestId("TasksTable")
      .getByRole("listitem")
      .first()
      .getByRole("button")
      .nth(1)
      .click();

    await expect(
      page.getByRole("heading", { name: "Edit Task" })
    ).toBeVisible();

    await page.getByRole("textbox", { name: "Enter task name" }).click();
    await page
      .getByRole("textbox", { name: "Enter task name" })
      .fill("Edited Testing Task");
    await page.locator('input[name="dueDate"]').fill("2025-11-20");
    await page.locator('select[name="priority"]').selectOption("LOW");
    await page.getByRole("textbox", { name: "Enter task content" }).click();
    await page
      .getByRole("textbox", { name: "Enter task content" })
      .fill("edited testing description");
    await page.getByRole("button", { name: "Save Changes" }).click();
    await expect(page.getByText("Edited Testing Task")).toBeVisible();
  });

  test("has to delete an existing task", async ({ page }) => {
    // Get initial count
    const initialCount = await page
      .getByTestId("TasksTable")
      .getByRole("listitem")
      .count();

    // Click delete button on first task
    await page
      .getByTestId("TasksTable")
      .getByRole("listitem")
      .first()
      .getByRole("button")
      .last()
      .click();

    // Verify task count decreased
    await expect(
      page.getByTestId("TasksTable").getByRole("listitem")
    ).toHaveCount(initialCount - 1);
  });
});
