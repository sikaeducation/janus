import generateSlug from "./generate-slug";
import { test, expect } from "vitest";

test("#generateSlug generates a random slug", () => {
  const slug1 = generateSlug();
  const slug2 = generateSlug();
  expect(slug1).toMatch(/[a-zA-Z0-9]{12}/);
  expect(slug2).toMatch(/[a-zA-Z0-9]{12}/);
  expect(slug1).not.toBe(slug2);
});
