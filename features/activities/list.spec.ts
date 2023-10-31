import { expect, Route } from "@playwright/test";
import test from "../utilities/test";
import asCoach from "../utilities/as-coach";

test("listing activities", async ({ page }) => {
  const activities = [
    {
      _id: 1,
      _type: "article",
      title: "Some title 1",
      published: true,
    },
    {
      _id: 2,
      _type: "article",
      title: "Some title 2",
      published: false,
    },
    {
      _id: 3,
      _type: "article",
      title: "Some title 3",
      published: true,
    },
  ];

  await page.route("**/oauth/token", (route: Route) => {
    route.fulfill({
      body: JSON.stringify({
        access_token: "dummy",
        id_token: "dummy",
      }),
    });
  });
  await page.route("**/activities", (route: Route) => {
    route.fulfill({
      body: JSON.stringify({ data: activities }),
    });
  });

  await asCoach(page);
  await page.getByText("Activity Manager").click();
  await expect(page.getByRole("row")).toHaveCount(activities.length + 1);
});
