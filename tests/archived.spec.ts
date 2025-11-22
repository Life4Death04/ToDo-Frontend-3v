import { test, expect } from "@playwright/test";

test.describe("Archived ToDo Functionality", () => {
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

  test("has to archive a task", async ({ page }) => {
    await page
      .getByTestId("TasksTable")
      .getByRole("listitem")
      .first()
      .getByRole("button")
      .nth(2)
      .click();
    await expect(page.getByText("No tasks yet")).toBeVisible();
    await expect(page.getByTestId("totalArchivedTasks")).toHaveText("1");
    await page.goto("/accounts/12/archive");
    await expect(page.getByText("Testing Task")).toBeVisible();
    await expect(page.getByRole("listitem")).toHaveCount(1);
    await page.getByRole("listitem").first().getByRole("button").nth(3).click();
  });
});
