import usePage from "../mocks/page-with-mock-api";

test("program viewer displays program content", async () => {
  const { page } = await usePage();
  await page.goto("/program-viewer");
  const posts = page.locator(".PostListing");
  const count = await posts.count();
  await expect(page).toMatchURL(/program-viewer/);
  await expect(count).toBe(8);
});

test("program viewer can copy markdown links to clipboard", async () => {
  const { page } = await usePage();
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
