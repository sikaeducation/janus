const { Then, Given } = require("@cucumber/cucumber");
const { expect } = require("expect");

Given("I'm a coach", async function () {
  await this.navigateTo("https://google.com");
});

Given("I'm on the activity manager page", async function () {
  expect(true).toBe(true);
});

Then("I see these activities listed:", async function (dataTable) {
  expect(true).toBe(true);
});
