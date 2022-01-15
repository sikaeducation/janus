import fs from "fs-extra";
import objectHash from "object-hash";
import { getPosts } from "./github";

import {
  getProgramVersion,
  checkProgram,
  readProgram,
  buildProgram,
} from "./program";

jest.mock("fs-extra");
jest.mock("object-hash");
jest.mock("../services/github", () => {
  return {
    getPosts: jest.fn(),
  };
});

const mockReaddir = fs.readdir as jest.Mock;
const mockRemove = fs.remove as jest.Mock;
const mockEnsureDir = fs.ensureDir as jest.Mock;
const mockReadJSON = fs.readJSON as jest.Mock;
const mockWriteJSON = fs.writeJSON as jest.Mock;
const mockObjectHash = objectHash as unknown as jest.Mock;
const mockGetPosts = getPosts as jest.Mock;

describe("getProgramVersion", () => {
  it("returns the program version", async () => {
    mockReaddir.mockResolvedValueOnce(["some-version"]);

    const version = await getProgramVersion(1);

    expect(mockReaddir).toHaveBeenCalledWith("data/hydrated-programs/1");
    expect(version).toBe("some-version");
  });

  it("handles errors", async () => {
    const mockConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => "");
    mockReaddir.mockRejectedValueOnce(() => new Error("Couldn't read"));

    const version = await getProgramVersion(1);

    expect(mockConsoleError).toHaveBeenCalled();
    expect(version).toBe("");
  });
});

describe("checkProgram", () => {
  it("returns true if there's a program", async () => {
    mockReaddir.mockResolvedValueOnce(["some-version"]);

    const isValidProgram = await checkProgram(1);
    expect(mockReaddir).toHaveBeenCalledWith("data/hydrated-programs/1");
    expect(isValidProgram).toBe(true);
  });

  it("returns false if there's not a program", async () => {
    mockReaddir.mockResolvedValueOnce([]);

    const isValidProgram = await checkProgram(1);
    expect(mockReaddir).toHaveBeenCalledWith("data/hydrated-programs/1");
    expect(isValidProgram).toBe(false);
  });

  it("handles errors", async () => {
    const mockConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => "");
    mockReaddir.mockRejectedValueOnce(() => new Error("Couldn't read"));

    const isValidProgram = await checkProgram(1);
    expect(mockConsoleError).toHaveBeenCalled();
    expect(isValidProgram).toBe(false);
  });
});

describe("readProgram", () => {
  it("reads a program from disk", async () => {
    mockReaddir.mockResolvedValueOnce(["some-version"]);
    mockReadJSON.mockResolvedValueOnce({});

    const program = await readProgram(1);
    expect(mockReaddir).toHaveBeenCalledWith("data/hydrated-programs/1");
    expect(mockReadJSON).toHaveBeenCalledWith(
      "data/hydrated-programs/1/some-version",
      "utf8"
    );
    expect(program).toEqual({});
  });
});

describe("buildProgram", () => {
  it("builds a program based on an ID", async () => {
    mockReadJSON.mockResolvedValueOnce({
      id: 1,
      posts: [
        { id: 1, slug: "a", children: [2, 3] },
        { id: 2, slug: "b", children: [] },
        { id: 3, slug: "c", children: [] },
      ],
    });
    mockGetPosts.mockResolvedValueOnce({
      a: "# Headline 1",
      b: "# Headline 2",
      c: "# Headline 3",
    });
    mockObjectHash.mockReturnValue("some-hash");
    mockRemove.mockResolvedValueOnce(true);
    mockEnsureDir.mockResolvedValueOnce(true);

    mockWriteJSON.mockResolvedValueOnce(true);

    const program = await buildProgram(1);
    const expectedProgram = {
      id: 1,
      posts: [
        {
          id: 1,
          slug: "a",
          content: "# Headline 1",
          children: [2, 3],
        },
        { id: 2, slug: "b", content: "# Headline 2", children: [] },
        { id: 3, slug: "c", content: "# Headline 3", children: [] },
      ],
    };

    expect(mockReadJSON).toHaveBeenCalledWith("data/raw-programs/1.json");
    expect(mockGetPosts).toHaveBeenCalled();
    expect(mockObjectHash).toHaveBeenCalledWith(expectedProgram);
    expect(mockRemove).toHaveBeenCalledWith("data/hydrated-programs/1/*");
    expect(mockEnsureDir).toHaveBeenCalledWith("data/hydrated-programs/1");
    expect(mockWriteJSON).toHaveBeenCalledWith(
      "data/hydrated-programs/1/some-hash",
      expectedProgram
    );

    expect(program).toEqual(expectedProgram);
  });
});
