import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ProgramViewer from ".";
import getProgram from "../../fixtures/program";

test("renders program", async () => {
  const programFixture = getProgram() as programData;

  render(
    <Router>
      <ProgramViewer program={programFixture} />
    </Router>
  );
  const listItems = await screen.findAllByRole("listitem");
  expect(listItems.length).toBe(26);
});
