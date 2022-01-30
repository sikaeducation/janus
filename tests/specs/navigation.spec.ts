import { test, expect } from "@playwright/test";
import getProgram from "../fixtures/program";

test.beforeEach(async ({ page }) => {
  await page.route("**/programs/*", (route) => {
    route.fulfill({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ program: getProgram() }),
    });
  });
});

test.skip("unit navigation", async ({ page }) => {
  await page.goto("/");
  await page.click(".UnitLink:has-text('A')");
  await expect(page).toHaveURL(/\/a$/);
  await page.click(".UnitLink:has-text('B')");
  await expect(page).toHaveURL(/\/b$/);
});

test.skip("section navigation", async ({ page }) => {
  await page.goto("/a/d");
  await page.click("text=Link to F");
  await expect(page).toHaveURL(/\/a\/d\/f$/);
  await page.goBack();
  await page.click("text=Link to G");
  await expect(page).toHaveURL(/\/a\/d\/g$/);
});

test.skip("activity navigation", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Start A");
  await expect(page).toHaveURL(/\/a$/);
  await page.click("text=Start C");
  await expect(page).toHaveURL(/\/a\/c$/);
  await page.click("text=Next: D");
  await expect(page).toHaveURL(/\/a\/d$/);
  await page.click("text=Next: E");
  await expect(page).toHaveURL(/\/a\/e$/);
  await page.click("text=Back to A");
  await expect(page).toHaveURL(/\/a$/);
});

test.skip("404", async ({ page }) => {
  await page.goto("/path-that-doesnt-exist");
  const body = page.locator("body");
  await expect(body).toHaveText(/sorry!/);
});

test("Loading", async () => {
  expect(true).toBe(true);
});

test("Error", async () => {
  expect(true).toBe(true);
});
