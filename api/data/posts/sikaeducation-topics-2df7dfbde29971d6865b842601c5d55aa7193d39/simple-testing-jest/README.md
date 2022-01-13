# Simple Testing with Jest

The simplest tests are for pure functions that accept primitive values.

```js
import sum from "./math"

test("add returns the sum of two positive integers", () => {
  const sum = sum(3, 2)

  expect(sum).toBe(5)
})
```

Import a function, call it with appropriate arguments, assert that the return value of the function was what you expected it to be.

## Pure Functions

A function is pure if it:

* Doesn't use outside variables (indirect input)
* Doesn't change outside variables or print anything to the screen (side-effects)
* Returns the same output if it's called with the same inputs (idempotence)

Pure functions are inherently easier to test since they don't require any additional context. For example:

```js
let count = 0

function increment(amount){
  count += amount
}

console.log(count) // 0
increment(1)
console.log(count) // 1
```

Since the `increment` function modifies the `count` function outside of it, it's impure. It's also impossible to test the behavior of `increment` without also having a context where `count` is both defined and can be observed by the testing framework. Meanwhile:

```js
function increment(count, amount){
  return count + amount
}

const initialCount = 0
console.log(initialCount) // 0

const newCount = increment(initialCount, 1)
console.log(newCount) // 1
```

In this example, `increment` is a pure function. It can be tested directly without any other context. This is one of the reasons that writing tests and code at the same time encourages testable code while trying to add tests after the fact is often difficult.

## Organizing Tests

There are 3 parts to a typical test:

* **Arrange**: Set up the app so that it's in the state it needs to be in to execute your test
* **Act**: Take an action that should generate output or otherwise change something about the app
* **Assert**: Assert that the output has been generated or the app changed

```js
test("add returns the sum of two positive numbers", () => {
})
```

The purpose of separating your tests into 3 distinct parts is to make it more difficult to meander between them. Doing so usually leads to tests that do too much.

## Watch Out!

* There isn't always an explicit state that the app needs to be set to before taking an action. This is especially true with pure functions.
* There isn't always an explicit result that needs to be asserted. Sometimes an action implies its own assertion, such as checking to see that a DOM element is in the page.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Test Automation Panda: Arrange-Act-Assert](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/) | Blog post on the AAA pattern |
