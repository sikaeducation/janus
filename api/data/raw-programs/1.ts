const program: rawProgram = {
  id: 1,
  label: "Ford: Full-Stack Web Development",
  root: {
    type: "root",
    label: {
      full: "Ford: Full-Stack Web Development",
      short: "Full-Stack Web Development",
      tiny: "",
    },
    slug: "ford-full-stack",
    children: [
      "unit-getting-started-ford",
      "unit-websites",
      "unit-web-apps",
      "unit-problem-solving",
      "unit-spas-angular",
      "unit-persistence-spring-boot",
      "unit-capstones-ford",
    ],
  },
  posts: [
    {
      type: "unit",
      label: {
        full: "Getting Started",
        short: "Getting started",
        tiny: "0",
      },
      slug: "unit-getting-started-ford",
      children: [],
    },
    {
      type: "unit",
      label: {
        full: "Websites",
        short: "Websites",
        tiny: "1",
      },
      slug: "unit-websites",
      children: ["section-cli-1"],
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
      type: "unit",
      label: {
        full: "Problem Solving",
        short: "Problem solving",
        tiny: "3",
      },
      slug: "unit-problem-solving",
      children: [],
    },
    {
      type: "unit",
      label: {
        full: "Single-Page Applications with Angular",
        short: "SPAs with Angular",
        tiny: "4",
      },
      slug: "unit-spas-angular",
      children: [],
    },
    {
      type: "unit",
      label: {
        full: "Persistence with Java and Spring Boot",
        short: "Persistence",
        tiny: "5",
      },
      slug: "unit-persistence-spring-boot",
      children: ["sql-intro"],
    },
    {
      type: "unit",
      label: {
        full: "Capstones",
        short: "Capstones",
        tiny: "6",
      },
      slug: "unit-capstones-ford",
      children: [],
    },
    {
      type: "section",
      label: {
        full: "Intro to CLI",
        short: "CLI: Intro",
        tiny: "",
      },
      slug: "section-cli-1",
      children: [],
    },
    {
      type: "topic",
      label: {
        full: "Intro to SQL",
        short: "SQL: Intro",
        tiny: "",
      },
      slug: "sql-intro",
      children: [],
    },
  ],
};

export default program;
