import {navigateTo} from "../utilities"

test("initial navigation", async () => {
  const page = await navigateTo("/")

  expect(page.url()).toBe("http://frontend:3000/websites")
})

test("unit navigation", async () => {
  const page = await navigateTo("/")

  await page.click(".UnitNavigation li:nth-child(2)")
  expect(page.url()).toBe("http://frontend:3000/web-apps")

  await page.click(".UnitNavigation li:nth-child(1)")
  expect(page.url()).toBe("http://frontend:3000/websites")
});

test("section navigation", async () => {
  const page = await navigateTo("/websites")

  await page.click("text=links")
  expect(page.url()).toBe("http://frontend:3000/websites/websites-1")

  await page.click("text=content")
  expect(page.url()).toBe("http://frontend:3000/websites/websites-1/html-div-span")
});

test("activity navigation", async () => {
  const page = await navigateTo("/websites/websites-1/html-div-span")

  await page.click("text=Next: <div> & <span> Exercises")
  expect(page.url()).toBe("http://frontend:3000/websites/websites-1/html-div-span-exercises")

  await page.click("text=Next: Block layout")
  expect(page.url()).toBe("http://frontend:3000/websites/websites-1/css-block-layout")

  await page.click("text=Back to Websites 1")
  expect(page.url()).toBe("http://frontend:3000/websites/websites-1")
});
