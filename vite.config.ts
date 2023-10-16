/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import postcssNested from "postcss-nested"
import postcssMergeRules from "postcss-merge-rules"
import postcssDiscardDuplicates from "postcss-discard-duplicates"
import postcssClean from "postcss-clean"

export default defineConfig({
	assetsInclude: ["./public"],
	plugins: [react()],
	server: {
		open: "/index.html",
	},
	define: {
		"process.env": {},
	},
	css: {
		postcss: {
			plugins: [
				nested: {},
				merge - rules: {},
				"discard-duplicates": {},
				clean: {}
			],
		},
		preprocessorOptions: {
			scss: {
				additionalData: `@use "@sikaeducation/ui/styles" as *;`,
			},
		},
	},
});
