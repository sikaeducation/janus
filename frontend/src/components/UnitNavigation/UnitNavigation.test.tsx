import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UnitNavigation from ".";

test("<UnitNavigation /> renders units", () => {
  const units = [
    {
      slug: "A",
      path: "https://google.com",
      label: "Label",
      isActive: true,
    },
    {
      slug: "B",
      path: "https://google.com",
      label: "Label",
      isActive: false,
    },
    {
      slug: "C",
      path: "https://google.com",
      label: "Label",
      isActive: false,
    },
  ];
  render(
    <Router>
      <UnitNavigation units={units} />
    </Router>
  );

  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(3);
});
