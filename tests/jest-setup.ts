import "expect-playwright";

jest.setTimeout(15 * 1000);

afterEach(() => {
  if (global.browser) {
    global.browser.close();
  }
});
