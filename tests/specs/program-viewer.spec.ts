import usePage from "../mocks/page-with-mock-api";
import "expect-playwright";

test("program viewer displays program content", async () => {
  const { page } = await usePage();
  await page.goto("/program-viewer");
  const posts = page.locator(".PostListing");
  const count = await posts.count();
  expect(page).toMatchURL(/program-viewer/);
  expect(count).toBe(8);
});
