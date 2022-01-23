import { test, expect } from "@playwright/test";

test("smoke", async ({ page }) => {
  await page.goto("/");

  const sika = page.locator("text=Sika").first();

  await expect(sika).toHaveText("Sika");
});
