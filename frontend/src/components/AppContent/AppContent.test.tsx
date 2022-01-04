import { render, screen } from "@testing-library/react";
import AppContent from "./index";

test("<AppContent /> renders markdown", () => {
  render(<AppContent content="# Some Header" />);

  const heading = screen.getByRole("heading");
  expect(heading).toHaveTextContent("Some Header");
});

export default true;
