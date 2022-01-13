import fs from "fs/promises";
import { mapProgramToContent, readPosts, readRawProgram } from "./program";

jest.mock("fs/promises");
const mockReadFile = fs.readFile as unknown as jest.Mock;
const mockReadDirectory = fs.readdir as unknown as jest.Mock;

test.skip("mapProgramToContent adds content to posts", () => {
  const program: programData = {
    id: 1,
    label: "Ford: Full-Stack Web Development",
    posts: [
      {
        id: 1,
        type: "unit",
        label: {
          full: "Websites",
          short: "Websites",
          tiny: "1",
        },
        slug: "websites",
        path: "websites",
        children: [2, 6],
      },
    ],
  };
  const content = {
    websites: "Website Content",
  };

  const programWithContent = mapProgramToContent(program, content);
  expect(programWithContent.posts[0]).toHaveProperty(
    "content",
    "Website Content"
  );
});

test.skip("getContent maps file content to a dictionary", async () => {
  mockReadDirectory.mockResolvedValue(["sikaeducation-topics-somehash"]);
  mockReadDirectory.mockResolvedValue(["some-directory/some-slug"]);
  mockReadFile.mockResolvedValue("File contents");

  const content = await readPosts();

  expect(content).toEqual({ "some-slug": "File contents" });
});

test.skip("getProgram returns the contents of a file with a given ID", async () => {
  mockReadFile.mockResolvedValue({ id: 1 });
  const program = await readRawProgram(1);

  expect(program).toEqual({ id: 1 });
});
