import { test, expect } from "@playwright/test";

test("register a new user", async ({ page }) => {
  await page.goto("/register");

  await page
    .getByRole("textbox", { name: "Enter your first name" })
    .fill("samira");
  await page
    .getByRole("textbox", { name: "Enter your last name" })
    .fill("princesa");
  await page
    .getByRole("textbox", { name: "Enter your email address" })
    .fill("samiraprincesa@gmail.com");
  await page
    .getByRole("textbox", { name: "Enter your password" })
    .fill("contra");
  await page
    .getByRole("textbox", { name: "Confirm your password" })
    .fill("contra");
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByText("auth.register.successMessage")).toBeVisible();
});

test("has to login a user", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Enter your email address" }).click();
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
  await expect(page).toHaveURL(/\/accounts\/\d+/); //Regex to match /accounts/{userId
});
