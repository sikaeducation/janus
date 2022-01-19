const program: programData = {
  id: 1,
  label: "Ford: Full-Stack Web Development",
  root: {
    id: 1,
    type: "root",
    label: {
      full: "Ford: Full-Stack Web Development",
      short: "Full-Stack Web Development",
      tiny: "",
    },
    slug: "ford-full-stack",
    path: "/",
    children: [1, 2, 3, 5, 6, 7],
  },
  posts: [
    {
      id: 1,
      type: "unit",
      label: {
        full: "Getting Started",
        short: "Getting started",
        tiny: "0",
      },
      path: "/unit-getting-started-ford",
      slug: "unit-getting-started-ford",
      children: [],
    },
    {
      id: 2,
      type: "unit",
      label: {
        full: "Websites",
        short: "Websites",
        tiny: "1",
      },
      path: "/unit-websites",
      slug: "unit-websites",
      children: [8],
    },
    {
      id: 3,
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
      id: 4,
      type: "unit",
      label: {
        full: "Problem Solving",
        short: "Problem solving",
        tiny: "3",
      },
      path: "/unit-problem-solving",
      slug: "unit-problem-solving",
      children: [],
    },
    {
      id: 5,
      type: "unit",
      label: {
        full: "Single-Page Applications with Angular",
        short: "SPAs with Angular",
        tiny: "4",
      },
      path: "/unit-spas-angular",
      slug: "unit-spas-angular",
      children: [],
    },
    {
      id: 6,
      type: "unit",
      label: {
        full: "Persistence with Java and Spring Boot",
        short: "Persistence",
        tiny: "5",
      },
      path: "/unit-persistence-spring-boot",
      slug: "unit-persistence-spring-boot",
      children: [9],
    },
    {
      id: 7,
      type: "unit",
      label: {
        full: "Capstones",
        short: "Capstones",
        tiny: "6",
      },
      path: "/unit-capstones-ford",
      slug: "unit-capstones-ford",
      children: [],
    },
    {
      id: 8,
      type: "section",
      label: {
        full: "Intro to CLI",
        short: "CLI: Intro",
        tiny: "",
      },
      path: "/websites/section-cli-1",
      slug: "section-cli-1",
      children: [],
    },
    {
      id: 9,
      type: "topic",
      label: {
        full: "Intro to SQL",
        short: "SQL: Intro",
        tiny: "",
      },
      path: "/persistence/sql-intro",
      slug: "sql-intro",
      children: [],
    },
  ],
};

// eslint-disable-next-line
console.log(JSON.stringify(program));

export {};
