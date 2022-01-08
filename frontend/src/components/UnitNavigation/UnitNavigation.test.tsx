import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UnitNavigation from ".";

test("<UnitNavigation /> renders units", () => {
  const units = [
    {
      id: 1,
      path: "https://google.com",
      label: "Label",
    },
    {
      id: 2,
      path: "https://google.com",
      label: "Label",
    },
    {
      id: 3,
      path: "https://google.com",
      label: "Label",
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
