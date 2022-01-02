import { render, screen } from "@testing-library/react";
import UnitLink from "./index";

test("<UnitLink /> renders url", () => {
  render(<UnitLink url="https://google.com" label="Label" />);

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "https://google.com");
});

test("<UnitLink /> renders label", () => {
  render(<UnitLink url="https://google.com" label="Label" />);

  const link = screen.getByRole("link");
  expect(link).toHaveTextContent("Label");
});
