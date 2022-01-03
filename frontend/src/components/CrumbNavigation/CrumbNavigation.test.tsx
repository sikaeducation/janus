import { render, screen } from "@testing-library/react";
import CrumbNavigation from ".";

test("<CrumbNavigation /> renders links", () => {
  const links = [
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
  ];
  render(<CrumbNavigation links={links} />);

  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(2);
});
