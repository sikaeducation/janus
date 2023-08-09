import { expect, Route } from "@playwright/test";
import test from "../utilities/test";
import asCoach from "../utilities/as-coach";

test.skip("view activity", async ({ screen }) => {
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

  await screen.route("**/activities", (route: Route) => {
    route.fulfill({
      body: JSON.stringify(activities),
    });
  });

  await asCoach(screen);
  await screen.getByText("Activity Manager").click();

  await expect(screen.getByText("slug_3")).toHaveCount(0);
  await expect(screen.getByText("Note 3")).toHaveCount(0);

  await screen.getByText("Some title 1").click();
  await expect(screen.getByText("slug_3")).toHaveCount(1);
  await expect(screen.getByText("Note 3")).toHaveCount(1);
  await expect(
    screen.getByRole("heading", { name: "Some heading" }),
  ).toHaveCount(1);

  await screen.getByTitle("Close").click();

  await expect(screen.getByText("slug_3")).toHaveCount(0);
  await expect(screen.getByText("Note 3")).not.toHaveCount(0);
});
