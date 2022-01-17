import usePage from "../mocks/page-with-mock-api"

test("smoke", async () => {
  const {page, done} = await usePage()
  await page.goto("/")

  const root = page.locator("data-test-id=root")

  expect(root).toBeTruthy()
  done()
});
