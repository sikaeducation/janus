import { render, screen } from "@testing-library/react";
import AppHeader from "./index";

test("<AppHeader /> renders program label", () => {
  render(<AppHeader programLabel="Program Name Here" />);
  const programLabel = screen.getByText("Program Name Here");
  expect(programLabel).toBeInTheDocument();
});
