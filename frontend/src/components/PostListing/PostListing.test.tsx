import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import useClipboard from "react-use-clipboard";
import PostListing from ".";

jest.mock("react-use-clipboard");
jest.mock("../../contexts/program");
const mockUseClipboard = useClipboard as unknown as jest.Mock;

const { tab, keyboard } = UserEvent;

test.skip("<PostListing /> renders post data", () => {
  mockUseClipboard.mockReturnValue([false, jest.fn()]);
  const post: hydratedPost = {
    type: "root",
    label: {
      full: "Full Label",
      short: "Short Label",
      tiny: "Tiny Label",
    },
    slug: "some-post",
    path: "/",
    content: "# Root",
    children: [],
  };
  const clickHandler = jest.fn();
  const keyboardHandler = jest.fn();
  render(
    <PostListing
      post={post}
      isActive
      handlers={{ click: clickHandler, keyboard: keyboardHandler }}
    />
  );
  const path = screen.getByTestId("path");
  expect(path).toHaveTextContent("/");

  const slug = screen.getByTestId("slug");
  expect(slug).toHaveTextContent("some-post");

  const fullLabel = screen.getByTestId("full-label");
  expect(fullLabel).toHaveTextContent("Full Label");

  const shortLabel = screen.getByTestId("short-label");
  expect(shortLabel).toHaveTextContent("Short Label");

  const tinyLabel = screen.getByTestId("tiny-label");
  expect(tinyLabel).toHaveTextContent("Tiny Label");
});

test.skip("<PostListing /> calls mouse handlers on click", () => {
  mockUseClipboard.mockReturnValue([false, jest.fn()]);
  const post: hydratedPost = {
    type: "root",
    label: {
      full: "Full Label",
      short: "Short Label",
      tiny: "Tiny Label",
    },
    slug: "some-post",
    path: "/",
    content: "# Root",
    children: [],
  };
  const clickHandler = jest.fn();
  const keyboardHandler = jest.fn();
  render(
    <PostListing
      post={post}
      isActive
      handlers={{ click: clickHandler, keyboard: keyboardHandler }}
    />
  );
  const postListing = screen.getByTestId("PostListing");
  postListing.click();
  expect(clickHandler).toHaveBeenCalled();
});

test.skip("<PostListing /> calls keyboard handlers on enter", () => {
  mockUseClipboard.mockReturnValue([false, jest.fn()]);
  const post: hydratedPost = {
    type: "root",
    label: {
      full: "Full Label",
      short: "Short Label",
      tiny: "Tiny Label",
    },
    slug: "some-post",
    path: "/",
    content: "# Root",
    children: [],
  };
  const clickHandler = jest.fn();
  const keyboardHandler = jest.fn();
  render(
    <PostListing
      post={post}
      isActive
      handlers={{ click: clickHandler, keyboard: keyboardHandler }}
    />
  );
  const postListing = screen.getByTestId("PostListing");
  tab();
  expect(postListing).toHaveFocus();
  keyboard("{enter}");
  expect(keyboardHandler).toHaveBeenCalled();
});

test.skip("<PostListing /> copies to clipboard", () => {
  const program: hydratedProgram = {
    id: 1,
    label: "Program Label",
    root: {
      type: "root",
      label: {
        full: "Full Label",
        short: "Short Label",
        tiny: "Tiny Label",
      },
      slug: "some-post",
      path: "/",
      content: "# Root",
      children: ["a", "b"],
    },
    posts: [
      {
        type: "unit",
        label: {
          full: "Full A",
          short: "Short A",
          tiny: "Tiny A",
        },
        slug: "a",
        path: "/a",
        content: "# A",
        children: [],
      },
      {
        type: "unit",
        label: {
          full: "Full B",
          short: "Short B",
          tiny: "Tiny B",
        },
        slug: "b",
        path: "/b",
        content: "# B",
        children: [],
      },
    ],
  };
  const post: hydratedPost = program.root;
  const clickHandler = jest.fn();
  const keyboardHandler = jest.fn();
  const clipboardSpy = jest.fn();
  mockUseClipboard.mockReturnValueOnce([false, clipboardSpy]);

  render(
    <PostListing
      post={post}
      isActive
      handlers={{ click: clickHandler, keyboard: keyboardHandler }}
    />
  );
  screen.getByText("Copy Links").click();
  expect(clipboardSpy).toHaveBeenCalled();
});
