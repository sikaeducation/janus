/** @type {import('vite').UserConfig} */
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

import postcssNested from "postcss-nested";
import postcssMergeRules from "postcss-merge-rules";
import postcssDiscardDuplicates from "postcss-discard-duplicates";

export default defineConfig({
  assetsInclude: ["./public"],
  plugins: [react(), splitVendorChunkPlugin()],
  server: {
    port: +process.env.PORT!, // From container
  },
  define: {
    "process.env": {}, // Needed to hack import.meta into React
  },
  test: {
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    bail: 1,
  },
  css: {
    postcss: {
      plugins: [postcssNested, postcssMergeRules, postcssDiscardDuplicates],
    },
  },
});
