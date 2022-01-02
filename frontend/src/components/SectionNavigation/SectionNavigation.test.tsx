import { render, screen } from "@testing-library/react";
import SectionNavigation from ".";

test("<SectionNavigation /> renders units", () => {
  const sections = [
    {
      id: 1,
      url: "https://google.com",
      label: "Label",
    },
    {
      id: 2,
      url: "https://google.com",
      label: "Label",
    },
    {
      id: 3,
      url: "https://google.com",
      label: "Label",
    },
  ];
  render(<SectionNavigation sections={sections} />);

  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(3);
});
