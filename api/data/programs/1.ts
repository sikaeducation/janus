const data: programData = {
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
      slug: "ford-websites",
      path: "websites",
      children: [2],
    },
    {
      id: 2,
      type: "topic",
      label: {
        full: "HTML: Buttons",
        short: "Buttons",
        tiny: "",
      },
      slug: "html-buttons",
      path: "websites/html-buttons",
      children: [],
    },
  ],
};

export default data;
