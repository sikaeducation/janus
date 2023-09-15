import { Route, test as base } from "@playwright/test";

const test = base.extend({
	page: async({ baseURL, page }, use) => {
		await page.route("**/authorize*", (route: Route) => {
			route.fulfill({
				status: 200,
			});
		});
		await page.goto(baseURL ?? "http://localhost:3000");
		await page.evaluate(() => {
			// @ts-ignore
			window.env = "test";
		});
		await use(page);
	},
});

export default test;
