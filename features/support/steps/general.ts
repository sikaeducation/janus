import { Given } from "@cucumber/cucumber";

Given("I'm a coach", async function () {
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
