import programChecker from "./program-checker";

const sampleRawProgram: rawProgram = {
  id: 1,
  label: "Program",
  root: {
    type: "root",
    label: {
      full: "Full",
      short: "Short",
      tiny: "1",
    },
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
      slug: "html-intro",
      children: [],
    },
  ],
};

test("#programChecker converts a raw program to a hydrated program", async () => {
  const result = programChecker(sampleRawProgram);
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
