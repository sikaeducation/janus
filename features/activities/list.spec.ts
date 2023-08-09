import { expect, Route } from "@playwright/test";
import test from "../utilities/test";
import asCoach from "../utilities/as-coach";

test("listing activities", async ({ screen }) => {
  const activities = [
    {
      _id: 1,
      _type: "Article",
      title: "Some title 1",
      published: true,
    },
    {
      _id: 2,
      _type: "Article",
      title: "Some title 2",
      published: false,
    },
    {
      _id: 3,
      _type: "Article",
      title: "Some title 3",
      published: true,
    },
  ];

  await screen.route("**/activities", (route: Route) => {
    route.fulfill({
      body: JSON.stringify(activities),
    });
  });

  await asCoach(screen);
  await screen.getByText("Activity Manager").click();
  await expect(screen.getByRole("row")).toHaveCount(activities.length + 1);
});
