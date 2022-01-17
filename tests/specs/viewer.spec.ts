import usePage from "../mocks/page-with-mock-api";

test("program viewer displays program content", async () => {
  const { page } = await usePage();
  await page.goto("/program-viewer");
  const posts = page.locator(".PostListing");
  const count = await posts.count();
  expect(count).toBe(8);
  expect(true).toBe(true);
});
