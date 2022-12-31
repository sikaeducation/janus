import { Before, setWorldConstructor, World } from "@cucumber/cucumber";
import { BrowserContext, Page, Route } from "@playwright/test";
import { chromium } from "playwright";

function CustomWorld(
  this: World & {
    navigateTo: (path: string) => void;
    page: Page;
    context: BrowserContext;
  }
) {
  this.navigateTo = async (path: string) => {
    const baseURL = process.env.BASE_URL || "http://localhost:3000";
    await this.page.goto(`${baseURL}${path}`);
  };
}

setWorldConstructor(CustomWorld);

Before(async function () {
  const browser = await chromium.launch({
    headless: true,
  });
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  await this.page.route("**/authorize*", (route: Route) => {
    route.fulfill({
      status: 200,
    });
  });
  await this.navigateTo("/");
});
