export default function getProgram(): hydratedProgram {
  const hydratedProgram: hydratedProgram = {
    id: 1,
    label: "Program Label",
    root: {
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
    posts: [
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
    ],
  };
  return hydratedProgram;
}
