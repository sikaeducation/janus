import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: `http://localhost:${process.env.PORT}`,
    headless: true,
    viewport: {
      width: 1280,
      height: 720,
    },
    video: "on",
  },
};
export default config;
