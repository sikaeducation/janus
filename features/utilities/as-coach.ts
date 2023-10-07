import { Page } from "@playwright/test";

async function asCoach(page: Page) {
  await page.evaluate(() => {
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
}

export default asCoach;
