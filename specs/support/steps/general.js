const { When, Then, Given } = require("@cucumber/cucumber");
const { expect } = require("expect");

Given("I go out", async function () {
  this.navigateTo("https://google.com");
});

When("I play in the street", async function () {
  console.log("Got here");
});

Then("I make mashed potatoes", async function () {
  expect(true).toBe(true);
});
