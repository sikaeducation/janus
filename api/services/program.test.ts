import fs from "fs-extra";
import objectHash from "object-hash";
import { getPostContent } from "./github";

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
    getPostContent: jest.fn(),
  };
});

const mockReaddir = fs.readdir as jest.Mock;
const mockEmptyDir = fs.emptydir as jest.Mock;
const mockEnsureDir = fs.ensureDir as jest.Mock;
const mockReadJSON = fs.readJSON as jest.Mock;
const mockWriteJSON = fs.writeJSON as jest.Mock;
const mockObjectHash = objectHash as unknown as jest.Mock;
const mockGetPosts = getPostContent as jest.Mock;

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
    const dehydratedProgram: dehydratedProgram = {
      id: 1,
      label: "Label",
      root: {
        type: "root",
        label: {
          full: "a",
          short: "a",
          tiny: "a",
        },
        path: "/",
        slug: "a" as slug,
        children: ["b" as slug, "c" as slug],
      },
      posts: [
        {
          type: "unit",
          label: {
            full: "b",
            short: "b",
            tiny: "b",
          },
          path: "/b",
          slug: "b" as slug,
          children: ["d" as slug],
        },
        {
          type: "unit",
          label: {
            full: "c",
            short: "c",
            tiny: "c",
          },
          path: "/c",
          slug: "c" as slug,
          children: [],
        },
        {
          type: "topic",
          label: {
            full: "d",
            short: "d",
            tiny: "d",
          },
          path: "/b/d",
          slug: "d" as slug,
          children: [],
        },
      ],
    };
    const expectedProgram: hydratedProgram = {
      id: 1,
      label: "Label",
      root: {
        type: "root",
        label: {
          full: "a",
          short: "a",
          tiny: "a",
        },
        path: "/",
        slug: "a" as slug,
        content: "# A",
        children: ["b" as slug, "c" as slug],
      },
      posts: [
        {
          type: "unit",
          label: {
            full: "b",
            short: "b",
            tiny: "b",
          },
          path: "/b",
          slug: "b" as slug,
          content: "# B",
          children: ["d" as slug],
        },
        {
          type: "unit",
          label: {
            full: "c",
            short: "c",
            tiny: "c",
          },
          path: "/c",
          slug: "c" as slug,
          content: "# C",
          children: [],
        },
        {
          type: "topic",
          label: {
            full: "d",
            short: "d",
            tiny: "d",
          },
          path: "/b/d",
          slug: "d" as slug,
          content: "# D",
          children: [],
        },
      ],
    };

    mockReadJSON.mockResolvedValueOnce(dehydratedProgram);
    mockGetPosts.mockResolvedValueOnce({
      a: "# A",
      b: "# B",
      c: "# C",
      d: "# D",
    });
    mockObjectHash.mockReturnValue("some-hash");
    mockEmptyDir.mockResolvedValueOnce(true);
    mockEnsureDir.mockResolvedValueOnce(true);
    mockWriteJSON.mockResolvedValueOnce(true);

    const program: hydratedProgram = await buildProgram(1);

    expect(mockReadJSON).toHaveBeenCalledWith(
      "data/dehydrated-programs/1.json"
    );
    expect(mockGetPosts).toHaveBeenCalled();
    expect(mockObjectHash).toHaveBeenCalledWith(expectedProgram);
    expect(mockEmptyDir).toHaveBeenCalledWith("data/hydrated-programs/1");
    expect(mockEnsureDir).toHaveBeenCalledWith("data/hydrated-programs/1");
    expect(mockWriteJSON).toHaveBeenCalledWith(
      "data/hydrated-programs/1/some-hash",
      expectedProgram
    );

    expect(program).toEqual(expectedProgram);
  });
});
