import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
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
  await expect(page.getByText("Testing Task11/14/2025HighTo")).toBeVisible;
  await expect(
    page
      .locator("TasksTable")
      .getByRole("list")
      .locator("TaskItem")
      .getByRole("listitem")
  ).toHaveCount(1);
});
