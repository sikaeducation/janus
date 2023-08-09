import { expect, Route } from "@playwright/test";
import test from "../utilities/test";
import asCoach from "../utilities/as-coach";

test.skip("view activity", async ({ page }) => {
  const activities = [
    {
      _id: 1,
      _type: "Article",
      title: "Some title 1",
      postSlug: "slug_3",
      description: "Some desc.",
      notes: "Note 3",
      content: "# Some Heading\n\nSome content",
    },
  ];

  await page.route("**/activities", (route: Route) => {
    route.fulfill({
      body: JSON.stringify(activities),
    });
  });

  await asCoach(page);
  await page.getByText("Activity Manager").click();

  await expect(page.getByText("slug_3")).toHaveCount(0);
  await expect(page.getByText("Note 3")).toHaveCount(0);

  await page.getByText("Some title 1").click();
  await expect(page.getByText("slug_3")).toHaveCount(1);
  await expect(page.getByText("Note 3")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Some heading" })).toHaveCount(
    1,
  );

  await page.getByTitle("Close").click();

  await expect(page.getByText("slug_3")).toHaveCount(0);
  await expect(page.getByText("Note 3")).not.toHaveCount(0);
});
