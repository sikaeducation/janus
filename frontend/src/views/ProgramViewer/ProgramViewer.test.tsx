import { render, screen } from "@testing-library/react";
import ProgramViewer from ".";
import getProgram from "../../../fixtures/program";

test("renders app", async () => {
  const programFixture = getProgram() as programData;

  render(<ProgramViewer program={programFixture} />);
  const listItems = await screen.findAllByRole("listitem");
  expect(listItems.length).toBe(8);
});
