const { Then, Given } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I'm on the activity manager page", async function () {
  await this.navigateTo("http://localhost:3000");
});

Given("I'm a coach", async function () {
  await this.page.evaluate(() => {
    window.store.dispatch({
      type: "user/setUser",
      payload: {
        email: "admin@sikaeducation.com",
        name: "Sika Education",
        isAuthenticated: true,
        role: "coach",
      },
    });
  });
});

Then("I see these activities listed:", async function (dataTable) {
  const activities = dataTable.hashes();
  await this.page.route("**/activities", (route) => {
    route.fulfill({
      body: {
        activities,
      },
    });
  });
  const listItems = await this.page.getByRole("row");
  expect(listItems).toHaveCount(3);
});
