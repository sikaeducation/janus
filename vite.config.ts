import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	assetsInclude: ["./public"],
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				app: "./index.html",
			},
		},
	},
	server: {
		open: "/index.html",
	},
});
