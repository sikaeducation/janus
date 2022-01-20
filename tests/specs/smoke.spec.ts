import usePage from "../mocks/page-with-mock-api";

test("smoke", async () => {
  const { page } = await usePage();
  await page.goto("/");

  const sika = page.locator("text=Sika");

  expect(sika).toBeTruthy();
});
