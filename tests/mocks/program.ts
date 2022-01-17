import {chromium} from "playwright";
import getProgram from "../fixtures/program"

export default async function usePage() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.route("**/programs/*", route => {
    route.fulfill({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({program: getProgram()}),
    })
  })

  return {page, done: async () => browser.close()}
}
