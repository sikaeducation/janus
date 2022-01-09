import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import AppShell from ".";

test("renders app", () => {
  render(
    <Router initialEntries={["/websites"]}>
      <AppShell />
    </Router>
  );
  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();
});
