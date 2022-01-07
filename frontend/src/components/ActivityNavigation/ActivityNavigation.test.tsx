import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ActivityNavigation from ".";

test("<ActivityNavigation /> renders label", () => {
  render(
    <Router>
      <ActivityNavigation nextSlug="next" nextLabel="Next" />
    </Router>
  );

  const link = screen.getByRole("link");
  expect(link).toHaveTextContent("Next");
});

test("<ActivityNavigation /> renders slug", () => {
  render(
    <Router>
      <ActivityNavigation nextSlug="next" nextLabel="Next" />
    </Router>
  );

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "/next");
});

export default true;
