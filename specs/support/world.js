/* eslint-disable @typescript-eslint/no-var-requires */
const playwright = require("playwright");
const { setWorldConstructor } = require("@cucumber/cucumber");

process.env.NODE_ENV = "test";

function CustomWorld() {
  this.navigateTo = async (url) => {
    const browser = await playwright.chromium.launch({
      headless: true,
    });
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
    await this.context.route("**/authorize*", (route) => {
      route.fulfill({
        status: 200,
      });
    });
    await this.page.goto(url);
  };
}

setWorldConstructor(CustomWorld);
