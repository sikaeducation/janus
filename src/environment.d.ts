import {
	ToolkitStore,
} from "@reduxjs/toolkit/dist/configureStore";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
    }
  }
  interface Window {
    store: ToolkitStore;
    env?: "test";
  }
}

export {};
