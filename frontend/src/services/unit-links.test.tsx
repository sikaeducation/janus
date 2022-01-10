import getUnitLinks from "./unit-links";
import data from "../data";

const { posts } = data.program;

test("#getUnitLinks generates links from a path", () => {
  const path = "websites/websites-1";
  const links = [
    {
      id: 1,
      isActive: true,
      label: "1",
      path: "websites",
    },
    {
      id: 8,
      isActive: false,
      label: "2",
      path: "web-apps",
    },
  ];
  expect(getUnitLinks(posts, path)).toEqual(links);
});
