import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AppShell from ".";

test("renders app", () => {
  render(
    <Router>
      <AppShell />
    </Router>
  );
  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();
});
