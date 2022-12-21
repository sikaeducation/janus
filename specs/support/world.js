/* eslint-disable @typescript-eslint/no-var-requires */
const playwright = require("playwright");
const { setWorldConstructor } = require("@cucumber/cucumber");

process.env.NODE_ENV = "test";

function CustomWorld() {
  this.navigateTo = async (url) => {
    const browser = await playwright.chromium.launch({
      headless: true,
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    await this.page.goto(url);
  };
}

setWorldConstructor(CustomWorld);
