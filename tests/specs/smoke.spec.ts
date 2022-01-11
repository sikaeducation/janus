import {screen} from "@testing-library/dom"
import {navigateTo} from "../utilities"

test("smoke", async () => {
  await navigateTo("/")
  const root = await screen.findByTestId("root")

  expect(root).toBeInTheDocument()
});
