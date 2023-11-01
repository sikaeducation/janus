import { Route, test as base } from "@playwright/test";

export default base.extend({
	page: async ({ baseURL, page }, use) => {
		await page.route("**/authorize*", (route: Route) => {
			route.fulfill({
				status: 200,
			});
		});
		await page.goto(baseURL || "");
		await use(page);
	},
});
