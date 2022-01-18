import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppHeader from ".";

test("<AppHeader /> renders program label", () => {
  render(
    <Router>
      <AppHeader programLabel="Program Name Here" />
    </Router>
  );
  const programLabel = screen.getByText("Program Name Here");
  expect(programLabel).toBeInTheDocument();
});
