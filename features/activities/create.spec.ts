import { expect, Route } from "@playwright/test";
import test from "../utilities/test";
import asCoach from "../utilities/as-coach";

test("create an activity", async ({ page }) => {
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
  ];

  const activity = {
    _type: "article",
    title: "Some title 3",
    post_slug: "slug_3",
    description: "Some desc.",
    notes: "Note 3",
  };

  const { title, post_slug, description, notes } = activity;

  let posted = false;

  await page.route("**/activities", (route: Route) => {
    if (route.request().method() === "GET") {
      route.fulfill({
        body: JSON.stringify({
          data: [...activities, { _id: 3, ...activity }],
        }),
      });
    }
  });
  await page.route("**/articles", (route: Route) => {
    if (route.request().method() === "POST") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const postedData = JSON.parse(String(route.request().postData()));
      expect(postedData).toMatchObject(activity);
      posted = true;
      route.fulfill({
        body: JSON.stringify({ _id: 3, activity }),
      });
    }
  });
  await page.route("**/activities", (route: Route) => {
    if (route.request().method() === "GET" && posted) {
      route.fallback();
    } else if (route.request().method() === "GET") {
      route.fulfill({
        body: JSON.stringify({ data: activities }),
      });
    } else {
      route.continue();
    }
  });

  await asCoach(page);
  await page.getByText("Activity Manager").click();

  await page
    .getByRole("button", {
      name: "New",
    })
    .click({
      force: true,
    });

  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Slug").fill(post_slug);
  await page.getByLabel("Description").fill(description);
  await page.getByLabel("Notes").fill(notes);

  await page
    .getByRole("button", {
      name: "Save and Publish",
    })
    .click();

  await expect(
    page.getByRole("gridcell", { name: "Some title 1" }),
  ).toBeVisible();
  await expect(
    page.getByRole("gridcell", { name: "Some title 2" }),
  ).toBeVisible();
  await expect(
    page.getByRole("gridcell", { name: "Some title 3" }),
  ).toBeVisible();
});
