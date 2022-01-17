import {chromium} from "playwright";
import getProgram from "../fixtures/program"

const {BASE_URL} = process.env

export default async function usePage() {
  const browser = await chromium.launch()
  const context = await browser.newContext({baseURL: BASE_URL})
  const page = await context.newPage()
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
