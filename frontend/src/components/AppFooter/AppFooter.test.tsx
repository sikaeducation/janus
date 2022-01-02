import { render, screen } from "@testing-library/react";
import AppFooter from "./index";

test("<AppFooter /> renders", () => {
  render(<AppFooter />);
  const copyright = screen.getByText(/©/);
  expect(copyright).toBeInTheDocument();
});
