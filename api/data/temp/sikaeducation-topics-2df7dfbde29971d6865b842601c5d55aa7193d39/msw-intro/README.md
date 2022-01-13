## Intro to `msw`

A common challenge in testing is writing tests for code that makes network requests. With a few exceptions, you shouldn't make actual requests in your tests.

* The network is usually a boundary between what you're trying to test and what you're not
* Network requests are inherently slow, which also slows down your tests
* If the server or network go down, your tests will fail even though your code may be fine

`msw`, or Mock Service Worker, is a JavaScript testing library that intercepts network requests and returns static responses. It's intended to be used in addition to other testing tools like Jest.

## Installing and Configuring

```bash
npm install -D msw
```

At the top of any test file where you want to mock network requests, include the following:

```js
import { rest } from "msw"
import { setupServer } from "msw/node"

const server = setupServer()

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## Mocking Endpoints

To intercept network requests in a test, use `server.use(someRESTfulHandler)` at the start of the test:

```js
test("Something that generates a network request", async () => {
  server.use(
    rest.get("/pokemon", (request, response, context) => {
      response(
        context.json({
          names: ["Pikachu", "Bulbasaur", "Charmander"],
        })
      )
    })
  )

  const result = await someFunctionThatMakesANetworkRequest()
  expect(result).toEqual(["Pikachu", "Bulbasaur", "Charmander"])
})
```

These route definitions clobber any default handlers and are reset after every test.

## REST Handlers

To create a REST handler, import `rest` from `msw` and call the name of the HTTP method you want to mock on it:

```js
rest.get("/pokemon", (request, response, context) => {
  response(
    context.json({
      names: ["Pikachu", "Bulbasaur", "Charmander"],
    })
  )
})
```

### HTTP Methods

The following HTTP methods are available in the REST API:

* `.get()`
* `.post()`
* `.put()`
* `.patch()`
* `.delete()`
* `.options()`

### Paths

The first argument to the method is a URL to match on. This can be a:

* Path
* Full URL
* Regex

Paths and URLs can use dynamic segments by prefixing the segment with a `:`:

```js
rest.get("/pokemon/:pokemonId", (request, response, context) => {
  const pokemonId = request.params.pokemonId

  // Response
})
```

### Resolvers

The second argument to the method is a resolver function. A resolver function should declare `request`, `response`, and `context` as parameters and finish by calling the `response` function.

The `response` function accepts any number of `context` transformers. The most common are:

* `context.status(statusCode)`: Set the HTTP status code
* `context.set(headerName, headerValue)`: Set an HTTP response header
* `context.json(someObject)`: Send a JSON response

For example:

```js
rest.get("/pokemon", (request, response, context) => {
  response(
    context.status(200),
    context.set("Content-Type", "application/json"),
    context.json({
      id: 1,
      name: "Pikachu",
    })
  )
})
```

## Global Setup

It's conventional to put all of the server configuration in a separate `server.js` file, and all of the default response handlers in a `handlers.js` file.

`handlers.js`:

```js
import { rest } from "msw"

export const handlers = [
  rest.get("/pokemon", listResolver),
  rest.post("/pokemon", createResolver),
  rest.put("/pokemon/:id", updateResolver),
  rest.get("/pokemon/:id", readResolver),
  rest.delete("/pokemon/:id", deleteResolver),
]
```

`server.js`:

```js
import { setupServer } from "msw/node"
import { handlers } from "./handlers"

export const server = setupServer(...handlers)
```

Then in the global test setup file, import the server, listen for requests, and reset your routes before each test.

```js
import { server } from "./server"

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())
```

In a CRA app, this file already exists in `src/setupTests.js` by default. If you're not using CRA, set Jest's `setupFilesAfterEnv` config value to the path of the setup file.

Once you've done this, you'll only need to include `msw` in tests when you want to override a default route.

## Watch Out!

* `msw` borrows heavily from Express, but has some significant differences. In Express, `response` is an object containing methods to set headers and generate responses. By contrast, `response` in `msw` is a function that accepts a variable number of context transformers.

## Additional Resources

| Resource | Description |
| --- | --- |
| [`msw` Docs](https://mswjs.io/docs/) | Official `msw` documentation |
| [`msw`: Integrate with Node](https://mswjs.io/docs/getting-started/integrate/node) | Official setup guide for Node testing |
