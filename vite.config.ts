/** @type {import('vite').UserConfig} */
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

import postcssNested from "postcss-nested";
import postcssMergeRules from "postcss-merge-rules";
import postcssDiscardDuplicates from "postcss-discard-duplicates";

export default defineConfig({
	assetsInclude: ["./public"],
	plugins: [react(), splitVendorChunkPlugin(), tsconfigPaths()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			$: path.resolve(__dirname, "./features"),
		},
	},
	define: {
		"process.env": {}, // Needed to hack import.meta into React
	},
	test: {
		include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
		bail: 1,
		setupFiles: ["./features/setup-tests.ts"],
		mockReset: true,
	},
	css: {
		postcss: {
			plugins: [postcssNested, postcssMergeRules, postcssDiscardDuplicates],
		},
	},
});
