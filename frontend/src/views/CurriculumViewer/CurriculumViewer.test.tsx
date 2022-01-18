import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import CurriculumViewer from ".";
import getProgram from "../../fixtures/program";

test("renders app", () => {
  const programFixture = getProgram() as programData;

  render(
    <Router initialEntries={["/"]}>
      <CurriculumViewer program={programFixture} />
    </Router>
  );
  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();
});
