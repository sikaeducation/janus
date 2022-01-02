import { render, screen } from "@testing-library/react";
import SectionLink from ".";

test("<SectionLink /> renders url", () => {
  render(<SectionLink url="https://google.com" label="Label" />);

  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "https://google.com");
});

test("<SectionLink /> renders label", () => {
  render(<SectionLink url="https://google.com" label="Label" />);

  const link = screen.getByRole("link");
  expect(link).toHaveTextContent("Label");
});
