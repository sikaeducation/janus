import { test, expect } from "@playwright/test";
import getProgram from "../fixtures/program";

test.beforeEach(async ({ page }) => {
  await page.route("**/programs/*", (route) => {
    route.fulfill({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ program: getProgram() }),
    });
  });
});

test("learners can submit topic views", async ({ page }) => {
  await page.route("**/activities", (route, request) => {
    expect(request.postDataJSON()).toMatchObject({
      userId: 1,
      postSlug: "c",
      payload: {
        confidenceLevel: 3,
      },
    });
  });
  await page.goto("/a/c");

  const submissionButton = page.locator("text=Confident");
  await submissionButton.click();
});

test.skip("existing topic view submissions are retained", async ({ page }) => {
  expect(true).toBe(true);
});

test.skip("coaches can see a list of existing submissions", async ({
  page,
}) => {
  expect(true).toBe(true);
});

test.skip("coaches are notified when a player makes a topic view submission", async ({
  page,
}) => {
  expect(true).toBe(true);
});
