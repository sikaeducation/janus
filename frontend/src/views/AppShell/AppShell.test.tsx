import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import AppShell from ".";
import data from "../../data";

test("renders app", () => {
  const programFixture = data.program;

  render(
    <Router initialEntries={["/websites"]}>
      <AppShell program={programFixture} />
    </Router>
  );
  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();
});
