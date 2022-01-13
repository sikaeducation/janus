import fs from "fs/promises";
import { getProgram, getContent } from "./program";

jest.mock("fs/promises");
const mockReadFile = fs.readFile as unknown as jest.Mock;
const mockReadDirectory = fs.readdir as unknown as jest.Mock;

test("getProgram adds content to posts", () => {
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

  const programWithContent = getProgram(program, content);
  expect(programWithContent.posts[0]).toHaveProperty(
    "content",
    "Website Content"
  );
});

test("getContent maps file content to a dictionary", async () => {
  mockReadDirectory.mockResolvedValue(["sikaeducation-topics-somehash"]);
  mockReadDirectory.mockResolvedValue(["some-directory/some-slug"]);
  mockReadFile.mockResolvedValue("File contents");

  const content = await getContent();

  expect(content).toEqual({ "some-slug": "File contents" });
});
