import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  addLinkToImage,
  formatLinks,
  formatCode,
  formatHeading,
  getSeparator,
} from "./markdown-utilities";

describe("#addLinkToImage", () => {
  it("adds a link to an image", async () => {
    const linkedImage = addLinkToImage({
      src: "https://sikaeducation.com",
      alt: "Sika Education",
    });
    render(linkedImage);
    const $link = await screen.findByRole("link");
    expect($link).toHaveAttribute("href", "https://sikaeducation.com");

    const $img = await within($link).findByRole("img");
    expect($img).toHaveAttribute("alt", "Sika Education");
  });
});

describe("#formatLinks", () => {
  const postsBySlug = { "some-slug": { content: "Some post" } };
  const user = {};
  const lastPerformanceBySlugByLearner = {};
  const lastQuestionPerformancesBySlugByLearnerByQuestion = {};
  const getIndicator = () => {
    console.log("Hello");
  };
  const getFormattedLink = formatLinks({
    postsBySlug,
    user,
    lastPerformanceBySlugByLearner,
    lastQuestionPerformancesBySlugByLearnerByQuestion,
    getIndicator,
  });

  it("formats an external link", async () => {
    const link = getFormattedLink({
      children: "Sika Education",
      href: "https://sikaeducation.com",
    });
    render(link);

    const $link = await screen.findByRole("link");

    expect($link).toHaveAttribute("href", "https://sikaeducation.com");
    expect($link).toHaveTextContent("Sika Education");
  });

  it("formats a short internal link", async () => {
    const link = getFormattedLink({
      children: "Sika Education",
      href: "some-slug",
    });
    render(<MemoryRouter>{link}</MemoryRouter>);

    const $link = await screen.findByRole("link");

    expect($link).toHaveAttribute("href", "/some-slug");
    expect($link).toHaveTextContent("Sika Education");
  });

  it("formats a long internal link", async () => {
    const link = getFormattedLink({
      children: "Sika Education",
      href: "some-base/some-middle/some-slug",
    });
    render(<MemoryRouter>{link}</MemoryRouter>);

    const $link = await screen.findByRole("link");

    expect($link).toHaveAttribute("href", "/some-base/some-middle/some-slug");
    expect($link).toHaveTextContent("Sika Education");
  });
});

describe("#formatCode", () => {
  it("formats inline bash", async () => {
    const code = formatCode({
      inline: true,
      children: "echo $SOME_ENVIRONMENT_VARIABLE",
      className: "bash",
    });

    render(code);

    const $code = await screen.findByText("echo $SOME_ENVIRONMENT_VARIABLE");

    expect($code).toHaveClass("bash");
  });
  it("formats block TypeScript", async () => {
    const codeExample =
      "const someObject: { someKey: string; } = { someKey: 'Some value'}";
    const code = formatCode({
      inline: false,
      children: codeExample,
      className: "ts",
    });

    render(code);

    const $code = await screen.findByText(codeExample);

    expect($code).toHaveClass("ts");
  });
});

describe("#formatHeading", () => {
  it("formats h1s", async () => {
    const h1 = formatHeading(1)({
      children: "Some Heading",
    });

    render(h1);

    const $h1 = await screen.findByText("Some Heading");

    expect($h1).toHaveClass("Heading");
    expect($h1).toHaveClass("primary-heading");
  });

  it("formats h2s", async () => {
    const h2 = formatHeading(2)({
      children: "Some Heading",
    });

    render(h2);

    const $h2 = await screen.findByText("Some Heading");

    expect($h2).toHaveClass("Heading");
    expect($h2).toHaveClass("secondary-heading");
  });

  it("formats h3s", async () => {
    const h3 = formatHeading(3)({
      children: "Some Heading",
    });

    render(h3);

    const $h3 = await screen.findByText("Some Heading");

    expect($h3).toHaveClass("Heading");
    expect($h3).toHaveClass("tertiary-heading");
  });

  it("formats h4s", async () => {
    const h4 = formatHeading(4)({
      children: "Some Heading",
    });

    render(h4);

    const $h4 = await screen.findByText("Some Heading");

    expect($h4).toHaveClass("Heading");
    expect($h4).toHaveClass("quaternary-heading");
  });
});

describe("#getSeparator", () => {
  it("gets a separator", async () => {
    const separator = getSeparator();
    render(separator);
    await screen.findByRole("separator");
  });
});
