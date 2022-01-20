import prepareProgram from "./prepare-program";

const sampleRawProgram: dehydratedProgram = {
  id: 1,
  label: "Program",
  root: {
    type: "root",
    label: {
      full: "Full",
      short: "Short",
      tiny: "1",
    },
    path: "/",
    slug: "ford-full-stack",
    children: ["unit-websites", "unit-web-apps"],
  },
  posts: [
    {
      type: "unit",
      label: {
        full: "Full",
        short: "Short",
        tiny: "1",
      },
      path: "/unit-websites",
      slug: "unit-websites",
      children: ["html-intro"],
    },
    {
      type: "unit",
      label: {
        full: "Web Apps",
        short: "Web apps",
        tiny: "2",
      },
      path: "/unit-web-apps",
      slug: "unit-web-apps",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to HTML",
        short: "HTML intro",
        tiny: "",
      },
      path: "/unit-websites/html-intro",
      slug: "html-intro",
      children: [],
    },
  ],
};

test("#prepareProgram converts a raw program to a hydrated program", async () => {
  const result = prepareProgram(sampleRawProgram);
  expect(result).toEqual({
    id: 1,
    label: "Program",
    root: {
      type: "root",
      label: {
        full: "Full",
        short: "Short",
        tiny: "1",
      },
      path: "/",
      slug: "ford-full-stack",
      children: ["unit-websites", "unit-web-apps"],
    },
    posts: [
      {
        type: "unit",
        label: {
          full: "Full",
          short: "Short",
          tiny: "1",
        },
        path: "/unit-websites",
        slug: "unit-websites",
        children: ["html-intro"],
      },
      {
        type: "unit",
        label: {
          full: "Web Apps",
          short: "Web apps",
          tiny: "2",
        },
        path: "/unit-web-apps",
        slug: "unit-web-apps",
        children: [],
      },
      {
        type: "topic",
        label: {
          full: "Intro to HTML",
          short: "HTML intro",
          tiny: "",
        },
        path: "/unit-websites/html-intro",
        slug: "html-intro",
        children: [],
      },
    ],
  });
});

test("#prepareProgram requires the root post to have children", async () => {
  const rootPostWithoutChildren: dehydratedProgram = {
    id: 1,
    label: "Program",
    root: {
      type: "root",
      label: {
        full: "Full",
        short: "Short",
        tiny: "1",
      },
      path: "/",
      slug: "ford-full-stack",
      children: [],
    },
    posts: [],
  };
  const result = prepareProgram(rootPostWithoutChildren);
  expect(result).toBeInstanceOf(Error);
});

test("#prepareProgram rejects programs with too many posts", async () => {
  const programWithTooManyPosts: dehydratedProgram = {
    id: 1,
    label: "Program",
    root: {
      type: "root",
      label: {
        full: "Full",
        short: "Short",
        tiny: "1",
      },
      path: "/",
      slug: "ford-full-stack",
      children: ["html-intro"],
    },
    posts: [
      {
        type: "topic",
        label: {
          full: "Full",
          short: "Short",
          tiny: "1",
        },
        path: "/html-intro",
        slug: "html-intro",
        children: [],
      },
      {
        type: "topic",
        label: {
          full: "Full",
          short: "Short",
          tiny: "1",
        },
        path: "/html-div-and-span",
        slug: "html-div-and-span",
        children: [],
      },
    ],
  };
  const result = prepareProgram(programWithTooManyPosts);
  expect(result).toBeInstanceOf(Error);
});

test("#prepareProgram rejects programs with not enough posts", async () => {
  const programWithNotEnoughPosts: dehydratedProgram = {
    id: 1,
    label: "Program",
    root: {
      type: "root",
      label: {
        full: "Full",
        short: "Short",
        tiny: "1",
      },
      path: "/",
      slug: "ford-full-stack",
      children: ["html-intro"],
    },
    posts: [
      {
        type: "topic",
        label: {
          full: "Full",
          short: "Short",
          tiny: "1",
        },
        path: "/html-intro",
        slug: "html-intro",
        children: ["html-div-and-span"],
      },
    ],
  };
  const result = prepareProgram(programWithNotEnoughPosts);
  expect(result).toBeInstanceOf(Error);
});
