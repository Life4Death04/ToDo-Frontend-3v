import { test, expect } from "@playwright/test";

test.describe("ToDo Lists Management", () => {
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

  test("has to create a list", async ({ page }) => {
    await page.getByTestId("createListButton").click();
    await expect(
      page.getByRole("heading", { name: "Create List" })
    ).toBeVisible();
    await page.getByRole("textbox", { name: "Enter list title" }).click();
    await page
      .getByRole("textbox", { name: "Enter list title" })
      .fill("New List from Playwright");
    await page.getByRole("button", { name: "Create List" }).click();
    await expect(page.getByText("New List from Playwright")).toBeVisible();
  });

  test("has to edit a list", async ({ page }) => {
    await page.getByText("New List from Playwright").click();
    await page.getByRole("button").nth(2).click();
    await expect(
      page.getByRole("heading", { name: "Edit List" })
    ).toBeVisible();
    await page
      .getByRole("textbox", { name: "Enter list title" })
      .fill("Edited List from Playwright");
    await page.getByRole("button", { name: "Save Changes" }).click();
    await expect(
      page.getByText("Edited List from Playwright").first()
    ).toBeVisible();
  });

  test("has to delete a list", async ({ page }) => {
    await page.getByText("Edited List from Playwright").click();
    await page.getByRole("button").nth(2).click();
    await expect(
      page.getByRole("heading", { name: "Edit List" })
    ).toBeVisible();
    await page.getByRole("button", { name: "Delete List" }).click();
    await page.goto("/accounts/12");
    await expect(
      page.getByText("Edited List from Playwright")
    ).not.toBeVisible();
  });
});
