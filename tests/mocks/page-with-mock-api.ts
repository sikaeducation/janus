import { chromium, Browser, Route, Page } from "playwright";
import getProgram from "../fixtures/program";

const { BASE_URL } = process.env;

declare global {
  // eslint-disable-next-line
  namespace NodeJS {
    interface Global {
      browser?: Browser;
    }
  }
}

export default async function usePage(): Promise<{ page: Page }> {
  global.browser = await chromium.launch();
  const context = await global.browser.newContext({ baseURL: BASE_URL });
  const page = await context.newPage();
  await page.route("**/programs/*", (route: Route) => {
    route.fulfill({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ program: getProgram() }),
    });
  });

  return { page };
}
