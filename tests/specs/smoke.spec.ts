import { test, expect } from "@playwright/test";

test("external smoke", async ({ page }) => {
  await page.goto("https://google.com");

  await expect(page).toHaveTitle("Google");
});

test("smoke", async ({ page }) => {
  await page.goto("/");

  const sika = page.locator("text=Sika").first();

  await expect(sika).toHaveText("Sika");
});
