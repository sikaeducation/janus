import { Page } from "@playwright/test";

async function asCoach(page: Page) {
  await page.evaluate(() => {
    window.store.dispatch({
      type: "user/setUser",
      payload: {
        email: "coach@sikaeducation.com",
        name: "Coach",
        "https://sikaeducation.com/roles": ["coach"],
        isAuthenticated: true,
      },
    });
  });
}

export default asCoach;
