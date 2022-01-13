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
      slug: "websites",
      path: "websites",
      children: [2],
    },
    {
      id: 2,
      type: "topic",
      label: {
        full: "Websites 1",
        short: "Websites 1",
        tiny: "",
      },
      slug: "websites-1",
      path: "websites/websites-1",
      content:
        "# Websites 1\n\n Check this out: [content](websites/websites-1/html-div-span)",
      children: [3, 4, 5],
    },
  ],
};

export default data;
