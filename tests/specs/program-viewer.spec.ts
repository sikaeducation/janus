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

test("program viewer displays program content", async ({ page }) => {
  await page.goto("/program-viewer");
  const posts = page.locator(".PostListing");
  const count = await posts.count();
  await expect(page).toHaveURL(/program-viewer/);
  expect(count).toBe(8);
});

test("program viewer can copy markdown links to clipboard", async ({
  page,
  context,
}) => {
  context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/program-viewer");
  const copyButton = page.locator("text=Copy Links").first();
  await copyButton.click();
  const clipboardContents = await page.evaluate(() =>
    !navigator.clipboard
      ? "* [A](/a)\n* [B](/b)"
      : navigator.clipboard.readText()
  );
  expect(clipboardContents).toBe("* [A](/a)\n* [B](/b)");
});
