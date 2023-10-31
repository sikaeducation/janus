import { Route, test as base } from "@playwright/test";

export default base.extend({
	page: async ({ baseURL, page }, use) => {
		await page.route("**/authorize*", (route: Route) => {
			route.fulfill({
				status: 200,
			});
		});
		console.log("baseURL is", baseURL);
		await page.goto(baseURL || "");
		await page.evaluate(() => {
			window.env = "test";
		});
		await use(page);
	},
});
