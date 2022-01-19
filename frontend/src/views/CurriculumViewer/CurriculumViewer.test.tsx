import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import CurriculumViewer from ".";
import getProgram from "../../fixtures/program";

test("CurriculumViewer renders program", () => {
  const programFixture = getProgram() as programData;

  render(
    <Router>
      <CurriculumViewer program={programFixture} />
    </Router>
  );
  const heading = screen.getByText("Example Root Post");
  expect(heading).toBeInTheDocument();
});
