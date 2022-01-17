import usePage from "../mocks/program"

const {BASE_URL} = process.env

test("unit navigation", async () => {
  const {page, done} = await usePage()
  await page.goto(`${BASE_URL}`)

  await page.click(".UnitNavigation li:nth-child(2)")
  expect(page.url()).toContain("/web-apps")

  await page.click(".UnitNavigation li:nth-child(1)")
  expect(page.url()).toContain("/websites")

  await done()
});

test("section navigation", async () => {
  const {page, done} = await usePage()

  await page.goto(`${BASE_URL}/websites`)

  await page.click("text=links")
  expect(page.url()).toContain("/websites/websites-1")

  await page.click("text=content")
  expect(page.url()).toContain("/websites/websites-1/html-div-span")

  await done()
});

test("activity navigation", async () => {
  const {page, done} = await usePage()
  await page.goto(`${BASE_URL}/websites/websites-1/html-div-span`)

  await page.click("text=Next: <div> & <span> Exercises")
  expect(page.url()).toContain("/websites/websites-1/html-div-span-exercises")

  await page.click("text=Next: Block layout")
  expect(page.url()).toContain("/websites/websites-1/css-block-layout")

  await page.click("text=Back to Websites 1")
  expect(page.url()).toContain("/websites/websites-1")

  await done()
});

test("navigation on load", async () => {
  const {page, done} = await usePage()
  await page.goto(`${BASE_URL}`)

  expect(page.url()).toContain("/websites")

  await done()
})
