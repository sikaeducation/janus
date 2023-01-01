import { When, Then, Given, DataTable } from "@cucumber/cucumber";
import { expect, Route } from "@playwright/test";

Given("these activities are saved:", async function (dataTable) {
  const activities = dataTable.hashes();
  await this.page.route("**/activities", (route: Route) => {
    route.fulfill({
      body: JSON.stringify(activities),
    });
  });
});

When("I go to the activity manager page", async function () {
  await this.page.getByText("Activity Manager").click();
});

When("I add this activity:", async function (dataTable) {
  const activity = dataTable.hashes()[0];
  await this.page.route("**/activities", (route: Route) => {
    route.fulfill({
      body: JSON.stringify(activity),
    });
  });
  // eslint-disable-next-line camelcase
  const { title, post_slug, description, notes } = activity;

  const button = await this.page
    .getByRole("button", { name: "New" })
    .click({ force: true });
  await this.page.getByLabel("Title").fill(title);
  await this.page.screenshot({ path: "screenshot.png" });
  // await this.page.getByLabel("Slug").fill(post_slug);
  // await this.page.getByLabel("Description").fill(description);
  // await this.page.getByLabel("Notes").fill(notes);

  // await this.page.getByRole("button", { name: "Save and Publish" }).click();
});

Then("I see these activities listed:", async function (dataTable: DataTable) {
  const activities = dataTable.rows();
  await expect(this.page.getByRole("row")).toHaveCount(activities.length + 1);
});
