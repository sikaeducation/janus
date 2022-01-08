import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import UnitLink from ".";

test("<UnitLink /> renders url", () => {
  render(
    <Router>
      <UnitLink path="some/slug-here" label="Label" />
    </Router>
  );

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "/some/slug-here");
});

test("<UnitLink /> renders label", () => {
  render(
    <Router>
      <UnitLink path="https://google.com" label="Label" />
    </Router>
  );

  const link = screen.getByRole("link");
  expect(link).toHaveTextContent("Label");
});
