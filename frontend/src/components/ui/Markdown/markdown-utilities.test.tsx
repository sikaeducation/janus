import { render, screen } from "@testing-library/react";
import { addLinkToImage } from "./markdown-utilities";

test("#addLinkToImage adds a link to an image", async () => {
  const linkedImage = addLinkToImage({
    src: "https://sikaeducation.com",
    alt: "Sika Education",
  });
  render(linkedImage);
  const $link = await screen.findByRole("link");
  expect($link).toHaveAttribute("href", "https://sikaeducation.com");
});
