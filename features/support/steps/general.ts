import { When, Then, Given, DataTable } from "@cucumber/cucumber";
import { expect, Route } from "@playwright/test";

Given("I'm on the activity manager page", async function () {
  await this.navigateTo("/activity-manager");
});

Given("these activities are saved:", async function (dataTable) {
  const activities = dataTable.hashes();
  await this.page.route("**/activities", (route: Route) => {
    route.fulfill({
      body: JSON.stringify(activities),
    });
  });
});

Given("I'm a coach", async function () {
  await this.navigateTo("/");
  await this.page.evaluate(() => {
    // @ts-ignore
    window.store.dispatch({
      type: "user/setUser",
      payload: {
        email: "coach@sikaeducation.com",
        name: "Coach",
        "https://sikaeducation.com/role": "coach",
        isAuthenticated: true,
      },
    });
  });
});

When("I navigate to the activity manager page", async function () {
  await this.page.getByText("Activity Manager").click();
  await this.page.getByText("Activities").waitFor();
});

Then("I see these activities listed:", async function (dataTable: DataTable) {
  const activities = dataTable.rows();
  await expect(this.page.getByRole("row")).toHaveCount(4);
});
