Using the style of your choice, write test names for the following:

## Factorial

For a factorial function that accepts an integer and returns its factorial, how would you name the following tests:

* `expect(factorial(0)).toBe(0)
* `expect(factorial(1)).toBe(1)
* `expect(factorial(3)).toBe(6)
* `expect(factorial(14)).toBe(87178291200) // Highest JS can display without scientific notation

## Sign-Up

For a sign-up component where a user types their email address and clicks a button to be added to a mailing list:

```js
test("Name?", () => {
  const signupSpy = jest.fn()
  render(<SignUpForm signupHandler={signupSpy} />)

  const goodEmail = "good@email.com"
  const input = screen.getByRole("textbox")
  const button = screen.getByRole("button")

  type(input, goodEmail)
  click(button)

  const successMessage = screen.getByText("Congratulations!")

  expect(successMessage).toBeInTheDocument()
  expect(signupSpy).toHaveBeenCalled()
})
```

```js
test("Name?", () => {
  const signupSpy = jest.fn()
  render(<SignUpForm signupHandler={signupSpy} />)

  const badEmail = "bad@email.com"
  const input = screen.getByRole("textbox")
  const button = screen.getByRole("button")

  type(input, badEmail)
  click(button)

  const errorMessage = screen.getByText("Oops!")

  expect(errorMessage).toBeInTheDocument()
  expect(signupSpy).not.toHaveBeenCalled()
})
```
