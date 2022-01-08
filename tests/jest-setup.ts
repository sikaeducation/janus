import "core-js"
import "@testing-library/jest-dom"

jest.setTimeout(15 * 1000)

afterEach(async () => {
  if (window.browser) {
    window.browser.close()
  }
})
