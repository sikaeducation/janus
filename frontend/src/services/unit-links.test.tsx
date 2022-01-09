import getUnitLinks from "./unit-links";

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
  expect(getUnitLinks(path)).toEqual(links);
});
