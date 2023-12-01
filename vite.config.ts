/** @type {import('vite').UserConfig} */
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

import postcssNested from "postcss-nested";
import postcssMergeRules from "postcss-merge-rules";
import postcssDiscardDuplicates from "postcss-discard-duplicates";

export default defineConfig({
  assetsInclude: ["./public"],

  plugins: [
    react(),
    splitVendorChunkPlugin(),
    tsconfigPaths(),
    process.env.NODE_ENV === "production"
      ? sentryVitePlugin({
          org: "sikaeducation",
          project: "janus",
        })
      : undefined,
  ].filter((x) => x),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      $: path.resolve(__dirname, "./features"),
    },
  },

  define: {
    "process.env": {}, // Needed to hack import.meta into React
  },

  server: {
    port: Number(process.env.PORT),
  },

  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    bail: 1,
    setupFiles: ["src/setup-tests.ts"],
    mockReset: true,
    environment: "jsdom",
  },

  css: {
    postcss: {
      plugins: [postcssNested, postcssMergeRules, postcssDiscardDuplicates],
    },
  },

  build: {
    sourcemap: true,
  },
});
