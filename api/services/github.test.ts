import { getArchiveUrl } from "./github";

test("Github service exists", () => {
  expect(getArchiveUrl).toBeTruthy();
});
