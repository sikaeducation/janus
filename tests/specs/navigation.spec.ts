import usePage from "../mocks/page-with-mock-api";

test("unit navigation", async () => {
  const { page, done } = await usePage();
  await page.goto("/");

  await page.click(".UnitNavigation li:nth-child(2)");
  expect(page.url()).toContain("/web-apps");

  await page.click(".UnitNavigation li:nth-child(1)");
  expect(page).toMatchURL(/\/websites$/);

  await done();
});

test("section navigation", async () => {
  const { page, done } = await usePage();

  await page.goto("/websites");

  await page.click("text=links");
  expect(page.url()).toContain("/websites/websites-1");

  await page.click("text=content");
  expect(page).toMatchURL(/\/websites\/websites-1\/html-div-span$/);

  await done();
});

test("activity navigation", async () => {
  const { page, done } = await usePage();
  await page.goto("/websites/websites-1/html-div-span");

  await page.click("text=Next: <div> & <span> Exercises");
  expect(page).toMatchURL(/\/websites\/websites-1\/html-div-span-exercises$/);

  await page.click("text=Next: Block layout");
  expect(page).toMatchURL(/\/websites\/websites-1\/css-block-layout$/);

  await page.click("text=Back to Websites 1");
  expect(page).toMatchURL(/\/websites\/websites-1$/);

  await done();
});

test("navigation on load", async () => {
  const { page, done } = await usePage();
  await page.goto("/");

  expect(page).toMatchURL(/\/websites$/);

  await done();
});
