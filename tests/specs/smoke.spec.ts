import usePage from "../mocks/page-with-mock-api";

describe.skip("refactor to use playwright test", () => {
  test("smoke", async () => {
    const { page } = await usePage();
    await page.goto("/");

    const sika = page.locator("text=Sika");

    expect(sika).toBeTruthy();
  });
});
