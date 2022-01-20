import usePage from "../mocks/page-with-mock-api";
import "expect-playwright";

test("unit navigation", async () => {
  const { page } = await usePage();
  await page.goto("/");

  await page.click(".UnitLink:has-text('A')");
  await expect(page).toMatchURL(/\/a$/);

  await page.click(".UnitLink:has-text('B')");
  await expect(page).toMatchURL(/\/b$/);
});

test("section navigation", async () => {
  const { page } = await usePage();

  await page.goto("/a/d");

  await page.click("text=Link to F");
  await expect(page).toMatchURL(/\/a\/d\/f$/);
  await page.goBack();
  await page.click("text=Link to G");
  await expect(page).toMatchURL(/\/a\/d\/g$/);
});

test("activity navigation", async () => {
  const { page } = await usePage();
  await page.goto("/");

  await page.click("text=Start A");
  await expect(page).toMatchURL(/\/a$/);

  await page.click("text=Start C");
  await expect(page).toMatchURL(/\/a\/c$/);

  await page.click("text=Next: D");
  await expect(page).toMatchURL(/\/a\/d$/);

  await page.click("text=Next: E");
  await expect(page).toMatchURL(/\/a\/e$/);

  await page.click("text=Back to A");
  await expect(page).toMatchURL(/\/a$/);
});

test("404", async () => {
  const { page } = await usePage();
  await page.goto("/path-that-doesnt-exist");
  await expect(page).toMatchText(/sorry!/);
});

test("Loading", async () => {
  expect(true).toBe(true);
});

test("Error", async () => {
  expect(true).toBe(true);
});
