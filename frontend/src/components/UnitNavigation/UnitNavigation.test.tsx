import { render, screen } from "@testing-library/react";
import UnitNavigation from "./index";

test("<UnitNavigation /> renders url", () => {
  const units = [
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
  render(<UnitNavigation units={units} />);

  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(3);
});
