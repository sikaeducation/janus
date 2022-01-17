import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import ProgramViewer from ".";
import data from "../../data";

test("renders app", () => {
  const programFixture = data.program;

  render(
    <Router initialEntries={["/program-viewer"]}>
      <ProgramViewer program={programFixture} />
    </Router>
  );
  expect(true).toBe(true);
});
