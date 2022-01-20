import { readdir, writeFile } from "fs-extra";
import postsToTypes from "./posts-to-types";

jest.mock("fs-extra");

const mockReaddir = readdir as unknown as jest.Mock;
const mockWriteFile = writeFile as unknown as jest.Mock;

test("#postsToTypes Convert a list of folders to a union type", async () => {
  mockReaddir.mockResolvedValueOnce(["a", "b", "c"]);

  await postsToTypes();
  const types = 'type slug = "a" | "b" | "c";';
  expect(mockWriteFile).toHaveBeenCalledWith("../slug.d.ts", types);
});
