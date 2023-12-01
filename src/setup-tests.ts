import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

declare global {
	interface Window {
		env?: "test";
	}
}

afterEach(() => {
	cleanup();
});
