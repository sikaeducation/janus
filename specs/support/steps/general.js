/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I'm on the activity manager page", async function () {
  await this.navigateTo("http://localhost:3000/activity-manager");
});

Given("these activities are saved:", async function (dataTable) {
  const activities = dataTable.hashes();
  await this.page.route("**/activities*", (route) => {
    console.log("Route fired");
    route.fulfill({
      body: activities,
    });
  });
  this.page.on("request", (request) => {
    console.log(request.method(), request.url());
  });
});

Given("I'm a coach", async function () {
  await this.navigateTo("http://localhost:3000");
  await this.page.evaluate(() => {
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
});

Then("I see these activities listed:", async function (dataTable) {
  const activities = dataTable.hashes();
  this.page.screenshot({ path: "screenshot.png" });
  await expect(this.page.getByRole("row")).toHaveCount(4);
});
