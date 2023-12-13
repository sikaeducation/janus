import { expect, Route } from "@playwright/test";
import test from "../utilities/test";
import asCoach from "../utilities/as-coach";

test("delete activity", async ({ page }) => {
  const activities = [
    {
      _id: 1,
      _type: "article",
      title: "Some title 1",
      post_slug: "slug_1",
      description: "Some desc.",
      notes: "Note 1",
      content: "# Some Heading\n\nSome content",
    },
    {
      _id: 2,
      _type: "article",
      title: "Some title 2",
      post_slug: "slug_2",
      description: "Some desc.",
      notes: "Note 2",
      content: "# Some other Heading\n\nSome other content",
    },
  ];

  let requestNumber = 1;
  await page.route("**/activities", (route: Route) => {
    if (requestNumber === 1) {
      route.fulfill({
        body: JSON.stringify({ data: activities }),
      });
      requestNumber++;
    } else if (requestNumber === 2) {
      route.fulfill({
        body: JSON.stringify({ data: [activities[1]] }),
      });
      requestNumber++;
    } else {
      throw new Error("Too many requests to /activities");
    }
  });

  await page.route("**/activities/1", (route: Route) => {
    const request = route.request();
    if (request.method() === "DELETE") {
      route.fulfill({ status: 204 });
    }
  });

  await asCoach(page);
  await page.getByText("Activity Manager").click();
  await page.getByText("Some title 1").click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Delete it" }).click();
  await expect(page.getByText("Some title 1")).not.toBeVisible();
});

test.skip("failed delete", () => {});
