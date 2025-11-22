import { test, expect } from "@playwright/test";

const tasksName = [
  "buy groceries",
  "clean the house",
  "finish the report",
  "call mom",
  "pay bills",
];

test.describe("End-to-End ToDo Application Tests", () => {
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

  for (const task of tasksName) {
    test(`Create and verify task: ${task}`, async ({ page }) => {
      //Create a todo
      await page
        .locator("header")
        .filter({ hasText: "All My Tasks+ Add Task" })
        .getByRole("button")
        .click();
      await page.getByRole("textbox", { name: "Enter task name" }).click();
      await page.getByRole("textbox", { name: "Enter task name" }).fill(task);
      await page.getByRole("button", { name: "Create Task" }).click();
      await expect(page.getByText(task)).toBeVisible();
    });
  }

  test("has to check 2 existing tasks", async ({ page }) => {
    const taskOne = page
      .getByTestId("TasksTable")
      .getByRole("listitem")
      .filter({ hasText: /buy groceries/i }); // Case insensitive
    const taskTwo = page
      .getByTestId("TasksTable")
      .getByRole("listitem")
      .filter({ hasText: /clean the house/i }); // Case insensitive

    await taskOne.getByTestId("checkTaskBtn").click();
    await taskTwo.getByTestId("checkTaskBtn").click();

    await expect(taskOne.getByTestId("taskStatus")).toHaveText("Done");
    await expect(taskTwo.getByTestId("taskStatus")).toHaveText("Done");
    await expect(page.getByTestId("checkedTasks")).toHaveText("2/5");
  });

  test("has to edit an existing task", async ({ page }) => {
    const taskToEdit = page
      .getByTestId("TasksTable")
      .getByRole("listitem")
      .filter({ hasText: /finish the report/i }); // Case insensitive
    await taskToEdit.getByRole("button").nth(1).click();
    await page
      .getByRole("textbox", { name: "Enter task name" })
      .fill("Finish the annual report");
    await page.getByRole("button", { name: "Save Changes" }).click();
    await expect(page.getByText("Finish the annual report")).toBeVisible();
  });

  test("has to delete an existing task", async ({ page }) => {
    const taskToDelete = page
      .getByTestId("TasksTable")
      .getByRole("listitem")
      .filter({ hasText: /call mom/i }); // Case insensitive
    await taskToDelete.getByRole("button").last().click();
    await expect(page.getByText("call mom")).not.toBeVisible();
  });

  test("has to cleanup completed tasks", async ({ page }) => {
    const tasks = page
      .getByTestId("TasksTable")
      .getByRole("listitem")
      .getByTestId("taskStatus")
      .filter({ hasText: "Done" });
    await expect(tasks).toHaveCount(2);

    for (let i = 0; i < 2; i++) {
      const task = page
        .getByTestId("TasksTable")
        .getByRole("listitem")
        .filter({ hasText: "Done" })
        .first();

      await task.getByRole("button").last().click();
    }

    await expect(
      page
        .getByTestId("TasksTable")
        .getByRole("listitem")
        .getByTestId("taskStatus")
        .filter({ hasText: "Done" })
    ).toHaveCount(0);
  });
});
