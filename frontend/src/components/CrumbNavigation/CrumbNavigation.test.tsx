import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CrumbNavigation from ".";

test("<CrumbNavigation /> renders links", () => {
  const links = [
    {
      slug: "A",
      path: "https://google.com",
      label: "Label",
    },
    {
      slug: "B",
      path: "https://google.com",
      label: "Label",
    },
  ];
  render(
    <Router>
      <CrumbNavigation links={links} />
    </Router>
  );

  const items = screen.getAllByRole("listitem");
  expect(items).toHaveLength(2);
});
