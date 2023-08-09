import { expect, Route } from "@playwright/test";
import test from "../utilities/test";
import asCoach from "../utilities/as-coach";

test("create an activity", async ({ screen }) => {
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
  ];

  const activity = {
    _id: 3,
    _type: "Article",
    title: "Some title 3",
    postSlug: "slug_3",
    description: "Some desc.",
    notes: "Note 3",
  };
  const { title, postSlug, description, notes } = activity;

  await screen.route("**/activities", (route: Route) => {
    route.fulfill({
      body: JSON.stringify(activities),
    });
  });

  await asCoach(screen);
  await screen.getByText("Activity Manager").click();

  await screen.getByRole("button", { name: "New" }).click({ force: true });

  await screen.getByLabel("Title").fill(title);
  await screen.getByLabel("Slug").fill(postSlug);
  await screen.getByLabel("Description").fill(description);
  await screen.getByLabel("Notes").fill(notes);

  await screen.getByRole("button", { name: "Save and Publish" }).click();

  await expect(screen.getByRole("row")).toHaveCount(activities.length + 1);
});
