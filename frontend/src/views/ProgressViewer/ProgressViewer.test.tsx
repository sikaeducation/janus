import { buildTree, getSequence } from "./ProgressViewer";

const root = {
  type: "root",
  label: {
    full: "Root",
    short: "Root",
    tiny: "1",
  },
  slug: "some-root",
  path: "/",
  content: "# Root",
  children: ["a", "b"],
} as hydratedPost;
const posts = {
  "some-root": {
    type: "root",
    label: {
      full: "Root",
      short: "Root",
      tiny: "1",
    },
    slug: "some-root",
    path: "/",
    content: "# Root",
    children: ["a", "b"],
  },
  a: {
    type: "unit",
    label: {
      full: "A",
      short: "A",
      tiny: "A",
    },
    path: "/a",
    slug: "a",
    content: "# A",
    children: ["c", "d", "e"],
  },
  b: {
    type: "unit",
    label: {
      full: "B",
      short: "B",
      tiny: "B",
    },
    path: "/b",
    slug: "b",
    content: "# B",
    children: [],
  },
  c: {
    type: "topic",
    label: {
      full: "C",
      short: "C",
      tiny: "C",
    },
    path: "/a/c",
    slug: "c",
    content: "# C",
    children: [],
  },
  d: {
    type: "section",
    label: {
      full: "D",
      short: "D",
      tiny: "D",
    },
    path: "/a/d",
    slug: "d",
    content: "# D\n\nLinks: \n\n* [Link to F](a/d/f)\n* [Link to G](a/d/g)",
    children: ["f", "g"],
  },
  e: {
    type: "topic",
    label: {
      full: "E",
      short: "E",
      tiny: "E",
    },
    path: "/a/e",
    slug: "e",
    content: "# E",
    children: [],
  },
  f: {
    type: "exercise",
    label: {
      full: "F",
      short: "F",
      tiny: "F",
    },
    path: "/a/d/f",
    slug: "f",
    content: "# F",
    children: [],
  },
  g: {
    type: "exercise",
    label: {
      full: "G",
      short: "G",
      tiny: "G",
    },
    path: "/a/d/g",
    slug: "g",
    content: "# G",
    children: [],
  },
} as Record<string, hydratedPost>;

test.skip("#buildTree", () => {
  const tree = buildTree(posts, root.slug);
  expect(tree).toBe({
    a: {
      c: {},
      d: {
        f: {},
        g: {},
      },
      e: {},
    },
    b: {},
  });
});

test("#getSequence", () => {
  const sequence = getSequence(posts, root.slug);
  expect(sequence).toEqual(["some-root", "a", "c", "d", "f", "g", "e", "b"]);
});

export default {};
