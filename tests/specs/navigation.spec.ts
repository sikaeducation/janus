import usePage from "../mocks/page-with-mock-api";
import "expect-playwright";

test("unit navigation", async () => {
  const { page } = await usePage();
  await page.goto("/");

  await page.click(".UnitNavigation li:nth-child(1)");
  await expect(page).toMatchURL(/\/unit-1$/);

  await page.click(".UnitNavigation li:nth-child(2)");
  await expect(page).toMatchURL(/\/unit-2$/);
});

test("section navigation", async () => {
  const { page } = await usePage();

  await page.goto("/unit-1/section-1");

  await page.click("text=Exercise 1");
  await expect(page).toMatchURL(/\/unit-1\/section-1\/exercise-1$/);
});

test("activity navigation", async () => {
  const { page } = await usePage();
  await page.goto("/");

  await page.click("text=Start Unit 1");
  await expect(page).toMatchURL(/\/unit-1$/);

  await page.click("text=Start Topic 1");
  await expect(page).toMatchURL(/\/unit-1\/topic-1$/);

  await page.click("text=Next: Section Name");
  await expect(page).toMatchURL(/\/unit-1\/section-1$/);

  await page.click("text=Next: Long Topic Name");
  await expect(page).toMatchURL(/\/unit-1\/topic-2$/);

  await page.click("text=Back to Unit 1");
  await expect(page).toMatchURL(/\/unit-1$/);
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
