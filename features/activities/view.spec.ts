import { expect, Route } from "@playwright/test";
import test from "../utilities/test";
import asCoach from "../utilities/as-coach";

test("view activity", async ({ page }) => {
  const activities = [
    {
      _id: 1,
      _type: "article",
      title: "Some title 1",
      post_slug: "slug_3",
      description: "Some desc.",
      notes: "Note 3",
      content: "# Some Heading\n\nSome content",
    },
  ];

  await page.route("**/activities", (route: Route) => {
    route.fulfill({
      body: JSON.stringify({ data: activities }),
    });
  });

  await asCoach(page);
  await page.getByText("Activity Manager").click();

  await expect(page.getByLabel("Slug")).toHaveCount(0);
  await expect(page.getByLabel("Notes")).toHaveCount(0);

  await page.getByText("Some title 1").click();
  await expect(page.getByLabel("Slug")).toHaveValue("slug_3");
  await expect(page.getByLabel("Notes")).toHaveValue("Note 3");

  await page.getByRole("button", { name: "Close" }).click();

  await expect(page.getByLabel("Slug")).toHaveCount(0);
  await expect(page.getByLabel("Notes")).toHaveCount(0);
});
