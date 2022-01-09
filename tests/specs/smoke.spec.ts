import {screen} from "@testing-library/dom"
import {navigateTo} from "../utilities"

test("smoke", async () => {
  await navigateTo("/")
  const link = await screen.findByText("Sika")

  expect(link).toHaveTextContent("Sika")
});
