Modify this code so that it handles HTTP error codes correctly:

```js
fetch("https://httpstat.us/400")
  .then(response => response.text())
  .then(parsedResponse => {
    console.error("Sorry, this shouldn't have run. Try again!")
  }).catch(error => {
    console.log("You did it!")
  })
```

As a stretch, abstract out the error handling logic into a separate function.

---

Using the url "https://httpstat.us/400" (which will always return a `400` response, write a `fetch` call that will correctly handle the error.
* Which of the following will trigger a `.catch` handler in a `fetch`?
  * Losing your internet connection
  * Getting a 404 response
  * The server breaking while handling the response and sending a 500 response
  * The server going offline while handling the response
  * Giving a bad URL to `fetch`
* How do you intentionally throw an error in JavaScript?
* List 3 reasons why `fetch` request might error
* What's wrong with this code?

```js
fetch("https://httpstat.us/500")
  .then(response => {
    if (response.ok){
      response.json()
    }
  }).then(parsedResponse => {
    console.log(parsedResponse)
  })
```

* What's wrong with this code?

```js
fetch("https://httpstat.us/404")
  .then(response => {
    if (response.isOk()){
      return response.json()
    }
  }).then(parsedResponse => {
    console.log(parsedResponse)
  })
```

* Is there a more semantic way to write this?

```js
fetch("https://httpstat.us/401")
  .then(response => {
    if (response.statusCode < 400){
      throw new Error(response.statusMessage)
    }
    return response.json()
  }).then(parsedResponse => {
    console.log(parsedResponse)
  })
```
# Handling API Errors

If an HTTP status code is `400` or greater, the request was unsuccessful in some way.

```js
fetch("http://httpstat.us/500")
  .then(response => response.json())
  .then(parsedResponse => {
    console.log("It worked!")
  }).catch(error => {
    console.error("It failed...")
  })
```

You would expect "It failed..." to log, but instead "It worked!" logs. Why?

## Types of Failed Requests

These are some ways a network request can be considered a failure from `fetch`'s perspective:

* The computer's connection to the internet is interrupted
* The browser is unable to find the IP address for the domain
* The URL is invalid

All of these will trigger the `.catch` handler and are considered failed requests. Getting an error back from the server is still considered a successful request since it generated an HTTP response, even if that response is not what you wanted.

## Handling 4xx-5xx Statuses

`fetch` has a built-in way to check for error statuses:

```js
fetch("http://httpstat.us/500")
  .then(response => {
    if (!response.ok){
      throw new Error(response.statusCode)
    }
    console.log("It worked!")
  }).catch(error => {
    console.error("It failed...")
  })
```

The `response.ok` property checks the status code of the response, and returns `true` for codes below `400` and `false` for codes `400` or greater. You can use a conditional to check this status and throw an error if the response code is 400 or greater.

## Watch Out!

* `.ok` is only available on the initial response object. Once the body has been parsed (for example, with `.json()`), it is no longer available.
* All of concepts work the same way with `async`/`await`.
* If the response from the server isn't valid JSON, running `response.json()` will throw an error and it will hit the catch block anyway. This is not a reliable way to catch server errors though, as many servers will return valid JSON explaining the error.

## Additional Resources

| Resource | Description |
| --- | --- |
| [HTTP Stat.us](http://httpstat.us) | Free server that generates the specified status code in the HTTP response |
| [MDN: Checking that a fetch was successful](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful) | MDN documentation on checking that a request was successful |
API Error
HTTP Status Code
HTTP: 400-class Status Code
HTTP: 500-class Status Code
Failed Network Request
Error
HTTP Response
HTTP Request
JavaScript: `fetch`
Conditional Logic
JSON
JavaScript: `async`
JavaScript: `await`
Block
Server
Find 3 APIs on the web and answer these questions:

* What does the API do?
* Is it open or does it require tokens or other authentication?
* Come up with 2 different hypothetical apps that could use this API
* What is an API?
* What are some advantages of using APIs?
* What is a web service?
# Intro to APIs

When you're building an app that needs data or processing, you have two options:

1. Store the data in a database or write the functionality yourself
2. Get data or processing from someone else

When you get data or processing from someone else on the web, you're "getting it from from an API." API stands for Application Programming Interface, and is a broad term for what kinds of inputs a piece of software accepts and what kinds of outputs it generates as a result.

All software has this general shape:

![Diagram of inputs turning into outputs](assets/programming-1.png)

When software is used by humans, they interact with the software through an interface that may include forms, buttons, text input, and other controls. If a piece of software is supposed to be used by other software, interfaces are more complicated because there needs to be agreement ahead of time about which inputs generate which outputs. A computer can't intuit its way through an interface designed for humans, so the interfaces need to be more explicit.

[Diagram of implementation and API for a sum](assets/sum.png)

This is a function called `sum` that accepts an array of numbers and returns their sum as a number. This could be implemented many ways:

```js
function sum(...numbers){
  let sum = 0

  for (number of number){
    sum += number
  }

  return sum
}
```

```js
function sum(...numbers){
  return numbers.reduce((numbers, number) => sum += number, 0)
}
```

```js
function sum(...numbers){
  let sum = new Number()

  while (numbers.length){
    let number = new Number(numbers.pop())
    sum.add(number)
  }

  return sum
}
```

Each of those functions has a different implementation, but has the same API.

This concept applies to all software, not just functions. For example, the `ls` command on the CLI takes a path to a folder as an input and generates a list of all the contents of that folder as an output. It even applies to software delivered over HTTP. If you make an HTTP GET request to `https://swapi.dev/people/1`, you'll get an HTTP response containing a bunch of details about that character:

![Diagram of an API call to swapi.dev](assets/swapi-dev.png)

These HTTP APIs are properly called web services, but they're also referred to generically as APIs.

In an app that allows people to organize their favorite Pokémon, you could add every single Pokémon to a database you own, including names, pictures, abilities, and so on. Not only would this be time-consuming, but that also means that every time a new game comes out, we would need to update the database ourselves. Luckily, there's a public [Pokemon API](https://pokeapi.co) that maintains this data already and allows developers to use their data in their applications.

APIs can do more than just return saved data. APIs can create and manipulate stored data and do calculations and transformations such as turning text into audio files or identifying the subject matter of images. Instead of writing all of that functionality yourself, you can integrate these functions into your apps as if you wrote them yourself.

Here are some examples of public APIs:

* __[Yahoo! Finance](https://rapidapi.com/blog/how-to-use-the-yahoo-finance-api/)__: View real-time stock prices
* __[API Football](https://www.api-football.com/)__: Check out NFL stats
* __[Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links/create-links)__: Give it a long URL, get back a short URL
* __[Skyscanner Flight Search](https://skyscanner.github.io/slate/#api-documentation)__: Search flight data and ticket price quotes
* __[IBM Watson](https://www.ibm.com/watson)__: Use IBM's supercomputer Watson to do a variety of artificial intelligence tasks

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: API](https://en.wikipedia.org/wiki/API) | Wikipedia's article on APIs. |
| [FreeCodeCamp: What is an API? In English, please.](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/) | FreeCodeCamp article on APIs and web services for beginners. |
| [Video: APIs for Beginners](https://www.youtube.com/watch?v=GZvSYJDk-us) | FreeCodeCamp's intro to APIs |
API
Database
Application
Programming
Interface
Function
CLI
Path
HTTP
HTTP GET
HTTP Response
HTTP API
Web Service
Public API
### API Research

Look up 10 APIs and answer the following questions:

* What does it do?
* Is it free, paid, or both?
* Does it require authentication?
* What kinds of applications could you build with it?

---

### Change the Pokemon

Using the following application, change the name of the Pokémon on line 1 to see a different one displayed. If you're unfamiliar with Pokémon, here are some examples you can try:

* `pikachu`
* `bulbasaur`
* `charizard`
* `mewto`
* `ditto`

[Starter Code](https://codesandbox.io/s/upbeat-kowalevski-ww0ks)
* What is an API?
  * A way to publish your app
  * A way to integrate someone else's data or functionality into your applications
  * A technique for building web interfaces
  * A tool for working with video game character data on the web
* Why would you use an API instead of just building it yourself?
* How do you usually use APIs on the web?
* Why do companies like Uber and Google offer APIs for many of their products?
# APIs: Intro

Consider this application that displays information and images about Pokemon:

```js
const favoritePokemon = "pikachu"
const url = `https://pokeapi.co/api/v2/pokemon/${favoritePokemon}`

fetch(url)
  .then(parseResponse)
  .then(showPokemon)
  .catch(showError)

function parseResponse(response) {
  return response.json()
}

function showPokemon(pokemonData) {
  const imageUrl = pokemonData.sprites.front_default
  const name = pokemonData.name

  const $image = document.querySelector("#pokemon-image")
  const $name = document.querySelector("#pokemon-name")

  $image.src = imageUrl
  $name.textContent = name
}

function showError(error) {
  const $error = document.querySelector("#error")
  $error.textContent = error.message
}
```

[Play with this code](https://codesandbox.io/s/upbeat-kowalevski-ww0ks?file=/index.js)

This application has 27 lines of code and no other data of its own, yet it's capable of showing over 1000 different characters from the popular franchise. This is the power of APIs.

## APIs

When you're building an app that needs data or processing, you have two options:

1. Store the data yourself in a database or write the functionality yourself
2. Get it from someone else

When you get it from someone else, you're getting it from from an API. For the Pokémon app, you can add every Pokémon to a database you own, including names, pictures, abilities, and so on. Not only would this be time-consuming, but that would also means that every time a new game comes out you would need to update the database. Luckily, the [Pokemon API](https://pokeapi.co) maintains all of that data already and offers it for use in applications through their API.

APIs can do more than give you data. APIs can also do calculations and transform data, such as turning text into audio files or identifying the subject matter of images. Instead of writing all of that functionality yourself, you can integrate these functions into your apps as if you wrote them.

Some examples of APIs:

* **[Yahoo! Finance](https://rapidapi.com/apidojo/api/yahoo-finance1)**: Get real-time stock prices
* **[API Football](https://www.api-football.com/)**: Get NFL stats
* **[URL Shortener Service](https://developers.rebrandly.com/docs)**: Give a long URL, get back a short URL
* **[Skyscanner Flight Search](https://www.partners.skyscanner.net/affiliates/travel-apis)**: Search flight data and ticket price quotes
* **[IBM Watson](https://www.ibm.com/watson)**: Use IBM's Supercomputer to do a variety of artificial intelligence tasks

APIs can supercharge your application development to take advantage of other people's software and data.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Free Code Camp: What Is An API? In English Please](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/) | Free Code Camp's blog post on APIs |
| [Public APIs](https://github.com/public-apis/public-apis) | Open source list of public APIs |
| [Wikipedia: APIs](https://en.wikipedia.org/wiki/API) | Wikipedia's entry on APIs |
| [Wikipedia: Web Service](https://en.wikipedia.org/wiki/Web_service) | Wikipedia's entry on Web Services |
| [Video: What is a REST API?](https://www.youtube.com/watch?v=SLwpqD8n3d0) | Programming with Mosh's intro to REST |
API
# Applicative Programming

JavaScript has 5 applicative functions that get used more than any others. All of these are non-destructive.

## Map

Transforms one array into a different array. If you should have the same number of items you started with but they need to be different in some way, this is what you want.

```js
const doubledNumbers = [1, 2, 3].map(number => number * 2) // [2, 4, 6]

const onlyFirstNames = [{
  firstName: "Kyle",
  lastName: "Coberly",
},{
  firstName: "Elyse",
  lastName: "Coberly",
}].map(person => person.firstName) // ["Kyle", "Elyse"]
```

## Filter

Keeps all of the elements of the array as-is, but only returns elements that match some criteria. Use this when the elements shouldn't change, but you may one the same number you started with or fewer:

```js
const numbersUnder3 = [1, 2, 3].filter(number => number < 3) // [1, 2]

const onlyShortNames = [{
  firstName: "Kyle",
  lastName: "Coberly",
},{
  firstName: "Elyse",
  lastName: "Coberly",
}].map(person => person.firstName.length < 5) // [{ firstName: "Kyle", lastName: "Coberly" }]
```

## Find

Returns the first match for some criteria. It works the same as filter, but only returns one result:

```js
const firstNumberUnder3 = [1, 2, 3].find(number => number < 3) // 1

const kyle = [{
  firstName: "Kyle",
  lastName: "Coberly",
},{
  firstName: "Elyse",
  lastName: "Coberly",
}].map(person => person.firstName === "Kyle") // [{ firstName: "Kyle", lastName: "Coberly" }]
```

## forEach

Generic loop. Use this for side-effects, or any loop that doesn't need to return anything.

```js
[1, 2, 3].forEach(number => {
  console.log(number)
}) // "1", "2", "3"

[{
  firstName: "Kyle",
  lastName: "Coberly",
},{
  firstName: "Elyse",
  lastName: "Coberly",
}].forEach(person => {
  console.log(`${person.firstName} ${person.lastName}`)  
}) // "Kyle Coberly", "Elyse Coberly"
```

## Reduce

This one is trickier, but it's ultimately the most powerful. It accumulates an array of things into one thing. It takes in a function to apply to every element, and a starting value. The function you pass in takes in a previous value and the current element, and should return what you want the new accumulation to be:

```js
const sum = [1, 2, 3].reduce((sum, number) => {
  return sum + number
}, 0) // 6

const firstNames = [{
  firstName: "Kyle",
  lastName: "Coberly",
},{
  firstName: "Elyse",
  lastName: "Coberly",
}].reduce((string, person) => {
  return `${string}, person.firstName`
}, "") // "Kyle, Elyse"

// Recreating .map with .reduce!
const firstNames = [{
  firstName: "Kyle",
  lastName: "Coberly",
},{
  firstName: "Elyse",
  lastName: "Coberly",
}].reduce((array, person) => {
  return [...array, person.firstName]
}, []) // ["Kyle", "Elyse"]
```

This one takes the most practice, but is powerful enough to recreate every other applicative and has a worthy spot in your toolbox!
Keep a value in state and bind it to a CSS class.

---

Toggle between two classes in a component based on a prop or state.
* How do you add a class to a React component?
* How do you include a CSS file in a React component?
* What should you name a CSS import in a React component?
* Why can't you use the `class` keyword in JSX?
# React: Applying Styles

For the most part, styles are applied to React components the same way they in regular HTML. Since React components render as HTML, all traditional CSS techniques are applicable. There are a couple of new techniques specific to React components however, including importing stylesheets and dynamic classes.

## Importing Stylesheets

It's common to make separate stylesheets for each component and then import them at the top the component file:

```css
/* ExternalLink.css */
.ExternalLink {
  display: inline-block;
  color: hsl(240, 50%, 50%);
}

.Link:visited {
  color: hsl(330, 50%, 50%);
}
```

```jsx
/* ExternalLink.js */
import "./ExternalLink.css"

export default const Link = ({ url, linkText }) => {
  return <a className="Link" href={url}>{linkText}</a>
}
```

It may be useful to give the component a CSS class with the name of the component and prefix all styles for that component with that class. This is called namespacing.

Note that you don't need to save the imported stylesheet into a variable. Just by importing it, webpack will include the stylesheet in the final CSS file it generates.

## Dynamic CSS Classes

CSS classes can be given dynamic values like any other JSX attribute.

```jsx
const User = ({ username, isDisabled }) => {
  return (
    <div className={`User ${isDisabled ? "disabled" : null}`}>
      {username}
    </div>
  )
}
```

## Watch Out!

* Remember that `class` is a reserved word in JavaScript, so you need to use `className` to set CSS classes on elements
* When using component names as CSS namespaces, make sure that your component names are unique throughout your application and don't conflict with any other CSS libraries that may have their own classes.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React: Styling and CSS](https://reactwithhooks.netlify.app/docs/faq-styling.html) | React's guide to styling and CSS |
| [Video: Styling in React](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=4992s) | React Hooks Crash Course: Styling |
| [Video: Styling Components](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=7272s) | React Hooks Crash Course: Styling components |
* React
* CSS
* Component
* Stylesheet
* Namespacing
* Webpack
Identify the ARIA roles (if any) of each of the following elements:

```js
<header>
  <h1>Shoez</h1>
  <nav>
    <ul>
      <li>
        <a href="#">Home</a>
      </li>
      <li>
        <a href="#">Products</a>
      </li>
      <li>
        <a href="#">About</a>
      </li>
    </ul>
  </nav>
</header>
<main>
  <section aria-label="account-creation">
    <h2>Create an Account</h2>
    <form>
      <label for="username">Username</label>
      <input required type="text" id="username" name="username" />

      <label for="password">Password</label>
      <input required type="password" id="password" name="password" />

      <label for="age">Age</label>
      <input type="number" id="age" name="age" />

      <label for="shirt-size">Shirt Size</label>
      <select id="shirt-size">
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
        <option value="xl">XL</option>
        <option value="xxl">XXL</option>
        <option value="xxxl">XXXL</option>
        <option value="xxxxl">XXXXL</option>
        <option value="xxxxxl">XXXXXL</option>
        <option value="xxxxxxl">XXXXXL</option>
      </select>

      <input type="submit" value="Create Account" />
    </form>
  </section>
</main>
```
* What is ARIA?
* What is an ARIA role?
* When should you add an ARIA role to an element?
* When should you not add an ARIA role to an element?
* What is a landmark ARIA role?
* What are the default ARIA roles for the following elements:
  * `<section aria-label="featured">`
  * `<aside>`
  * `<div>`
  * `<ul>`
  * `<li>`
  * `<input type="text" />`
  * `<h3>`
  * `<span>`
  * `<input type="range" />`
  * `<input type="image" />`
  * `<a>`
  * `<select>`
  * `<input type="submit" />`
  * `<ol>`
# ARIA Roles

Accessible Rich Internet Applications, or ARIA, is a technique for improving accessibility in HTML. When someone using an assistive technology accesses a page in an app, knowing the role an element serves in the application is critical for correct navigation and use of the app. The easiest way to ensure that a page is accessible is to use the correct semantic elements; these are always assigned appropriate ARIA roles. In situations where that's not possible, the roles can be assigned directly using the `role` attribute.

```html
<div class="some-totally-custom-form-input" role="textbox"><div>
```

ARIA roles are also popular in DOM testing frameworks, because they map directly to how users perceive elements.

## Elements and their Natural ARIA Roles

### Structural Elements

| ARIA Role | Elements that have this role | Notes |
| --- | --- | --- |
| `header` | `<header>` | Landmark role, only applies if it's not a child of a sectioning element like `<article>` or `<main>` or one of the ARIA roles corresponding to them |
| `main` | `<main>` | Landmark role, only applies if it's not a child of a sectioning element like `<article>` or `<main>` or one of the ARIA roles corresponding to them |
| `footer` | `<footer>` | Landmark role, only applies if it's not a child of a sectioning element like `<article>` or `<main>` or one of the ARIA roles corresponding to them |
| `article` | `<article>` | Standalone content |
| `region` | `<section aria-label="some name here">` | Landmark role |
| `heading` | `<h1>`-`<h6>` | Heading to a page or section |
| `complementary` | `<aside />` | Landmark role |
| `navigation` | `<nav>` | Landmark role |
| `table` | `<table>` | |

Landmark roles can be directly navigated to with assistive technologies. Use these sparingly to prevent too much noise.

### Other Elements

| ARIA Role | Elements that have this role | Notes |
| --- | --- | --- |
| `button` | `<button>`, `<input type="button" />`, `<input type="submit" />`, `<input type="reset" />`, `<input type="image" />` | Clickable elements that trigger a response |
| `link` | `<a>` | Hyperlink to a resource |
| `img` | `<img />` | Should be treated as an image |
| `list` | `<ol>`, `<ul>` | |
| `listitem` | `<li>` | |

### Forms

| ARIA Role | Elements that have this role | Notes |
| --- | --- | --- |
| `form` | `<form>` | Landmark role |
| `textbox` | `<input type="text">`, `<textarea>` | Text input |
| `checkbox` | `<input type="checkbox">` | Checkable interactive control |
| `spinbutton` | `<input type="number" />` | |
| `radio` | `<input type="radio" />` | |
| `slider` | `<input type="range" />` | |
| `combobox` | `<select>` | |
| `option` | `<option>` | |
| `button` | `<button>`, `<input type="button" />`, `<input type="submit" />`, `<input type="reset" />`, `<input type="image" />` | Clickable elements that trigger a response |

Note that if the form is a search form, `role="search"` should be added to the `<form>` element.

## Watch Out!

Setting an ARIA role doesn't add any new functionality to an element, it only changes how elements are presented to the browser's accessibility API.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Using ARIA: Roles, States, and Properties](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques) | MDN's documentation on ARIA |
| [W3C: ARIA in HTML](https://www.w3.org/TR/html-aria/) | Official reference for how HTML elements align to ARIA roles. |
* ARIA
* ARIA Role
* Accessibility
* DOM
* HTML Element
* Landmark Role
Diagram the token-based authentication process.
* What is authentication?
* What is authentication used for?
* Differentiate between authentication and authorization
* What are the 3 parts of token-based authentication?
* List 2 advantages of token-based authentication.
* List 2 disadvantages of token-based authentication.
# Intro to Auth

Some applications aren't personal. For example, a calculator doesn't need any concept of identity because everyone uses it in the same way, and many casual games don't need to persist user progress. However, most applications need to manage identities. For example:

* Social media apps need to differentiate one user's posts, comments, and network from another
* eCommerce apps need to save payment credentials and wishlists for different users
* Messaging apps need to control which users can see and send which messages

How do you integrate identity systems into your applications?

## Authentication vs. Authorization

Auth refers to two concepts: Authentication and authorization. Authentication is verifying that someone is who they claim to be, usually by validating credentials or tokens they send. Authorization is verifying that someone has permission to do whatever they're attempting to do. For example, if someone claims to be Christina Aguilera, the process of checking whether or not that's true is authentication. Authorization is figuring out whether or not Christina is allowed to enter a particular building.

## Token-Based Authentication

There are several different patterns in API authentication, but one of the simplest and most versatile is token-based authentication. There are 3 parts to token-based authentication:

* Creating an account
* Logging in to get a token
* Use the token to access a secured resource

### Account Creation

![Diagram of the user account creation process](assets/user-creation.png)

Creating an account is similar to creating anything else in a database. The only difference is that passwords must be obfuscated through a process called hashing before they're stored.

### Logging In

![Diagram of the token-based login process](assets/token-based-login.png)

Once a user has an account, they resubmit their credentials anytime they need to prove their identity. The password they submit is hashed and compared to the stored hashed password. If they match, the user is given a token that can be sent as a proof of their identity with future requests.

#### Access Secured Resources

![Diagram of the token-based authentication process](assets/token-based-authentication.png)

When users want to access a secured resource they send their token along with their request. The server verifies the token is valid and hasn't been tampered with, and it can use the data inside the token to look up the user's database record. The server can now check whether that user is authorized to perform the requested action and proceed accordingly.

### Token-Based Authentication Considerations

Token-based authentication advantages:

* Token-based authentication is stateless, meaning that the server doesn't need to maintain any record of who is logged in. This is architecturally simpler and easier to scale than auth strategies that rely on keeping login records in a database.
* Tokens work on any device, including non-browser-based devices like native phone apps or hardware.

Token-based authentication disadvantages:

* If a user's token is compromised, there's no way to differentiate between the real user and an imposter who happens to have their token.
* There's no way to log out a user from the server, you just have to wait for their token to expire. This may be a security consideration in situations where users can have their access suddenly change, such as an employee being fired.

## Watch Out!

Auth is a complicated concept with more security implications than anything else in application development. Additionally, current best practices may have vulnerabilities that haven't been discovered yet. Exercise extreme caution in building auth systems for production apps with real users as you may be legally liable for security breaches caused by your code. The only way to learn auth is to practice. Until you're confident you're ready to take responsibility for your security choices, ask for a review from a developer with experience in auth systems before launching production auth code.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: Authentication](https://en.wikipedia.org/wiki/Authentication) | Wikipedia's article on the concept of authentication |
| [Wikipedia: Authorization](https://en.wikipedia.org/wiki/Authorization) | Wikipedia's article on the concept of authorization |
| [Auth0: Authentication and Authorization](https://auth0.com/docs/get-started/authentication-and-authorization) | Auth0's article comparing authentication and authorization |
| [Okta: What is token-based authentication?](https://www.okta.com/identity-101/what-is-token-based-authentication/) | Okta's article explaining token-based authentication |
| [Video: JWT Authentication tutorial](https://www.youtube.com/watch?v=mbsmsi7l3r4) | Web Dev Simplified's tutorial on Node auth with JWTs |
Auth
Identity Systems
Authentication
Authorization
Token-Based Authentication
API
Database
Hashing
Database Record
Auth Token
Security Breach
## CSS Programming Danger

Given this HTML:

```html
<h1>Programming</h1>
<p>Programming can be pretty hard, but <span id="warning">be careful!</span> You might also have a lot of fun.</p>
```

Write a style sheet that does the following:

* Makes the heading white, bold, 24 pixels high, with a background color of purple and 24 pixels of space all around it
* Limits all the paragraphs to being 300 pixels wide and center all the text inside them
* Makes the text in the element with an id of "warning" red

[Starter code](https://codesandbox.io/s/xenodochial-bardeen-xzjnr)
* What is CSS for?
* What is a CSS selector?
* How would you select all the `<p>` tags on a page?
* How would you select all the `<h1>` tags on a page?
* How would you select an `<h1>` with an ID of `primary-heading`?
* How would you select an `<p>` with an ID of `instructions`?
* Describe what the following CSS properties do:
  * `font-family`
  * `font-weight`
  * `font-size`
  * `display`
  * `max-width`
  * `background-color`
  * `color`
  * `padding`
* How would you write the following CSS declarations?
  * Make the font "Roboto", but if that's not available just use whatever sans-serif font is installed on the computer
  * Make the text white
  * Put 32 pixels of space all around the content
  * Make the font 24 pixels high
  * Keep the text from being more than 200 pixels wide
  * Make the background color purple
  * Make the text bold
# Basic CSS

Cascading Style Sheets, or CSS, is a language for decorating content made with HTML. CSS is written in files called stylesheets that have a `.css` extension. CSS files are linked from HTML files, and the CSS files contain selectors and declarations that describe how the HTML page should look.

## CSS Selectors

To style an HTML element, you need to write code in CSS that selects it. You can either select all elements with the same tag, or you can select an element by its ID by putting a `#` in front of the ID.

```html
<h1>This is a heading</h1>
<p id="first-paragraph">This is the first paragraph</p>
<p id="second-paragraph">This is the second paragraph</p>
```

![CSS selectors and visual example](assets/css-selectors.png)

[Play with this code](https://codesandbox.io/s/sweet-panini-f9ec8?file=/index.css)

## CSS Declarations

Once you've selected an element or elements, you can declare what you'd like them to look like.

![CSS declarations example](assets/css-declarations.png)

[Play with this code](https://codesandbox.io/s/spring-water-38zf5?file=/index.css)

CSS declarations have a property on the left and a value on the right. They're separated with a `:` and end with a `;`.

Some common CSS properties:

### Typography

* **`font-family: Arial, sans-serif;`**: Sets the name of the font.
* **`font-weight: bold;`**: Sets the weight of the font, such as `lighter`, `regular`, `bold`, `bolder`
* **`font-size: 32px;`**: Sets the size of the font in pixels
* **`color: grey;`**: Sets the color of the font. There are several ways to define colors, but to start with many common color names, such as `red`, `green`, `lightblue`, `purple`, `grey`, and `white` will work.

### Layout

* **`display: block;`**: Makes the HTML element take up an entire line
* **`display: inline;`**: Makes the HTML element take up as little space as possible
* **`max-width: 200px;`**: Sets the widest the HTML element can get
* **`padding: 16px;`**: Sets how many empty pixel to surround the HTML element with
* **`background-color: red;`**: - Sets a background color for the HTML element

## Watch Out!

You get some styles from the browser for free. For example, text in an `<h1>` tag is usually bold, large, and displays as a block. You can either keep these defaults or override them with your own CSS.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: CSS first steps](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps) | A popular beginner's tutorial on CSS. It covers many more CSS topics than this workshop. |
CSS
Stylesheet
File Extension
HTML File
CSS File
CSS Selector
CSS Declaration
HTML Element
HTML ID
CSS Property
CSS Value
CSS Layout
CSS Typography
## HTML Summer Camp

Write HTML that does the following:

* Has a heading that says "Welcome to Camp!"
* Has two paragraphs with the following content:
  * "We are excited that you have chosen The Sports Camp to meet your child's summer camping needs."
  * "If you're interested in learning more about our options this summer, please sign up for the interest list!"
* Has a labeled input to collect an email address
* Has a button that says "Sign Up"

[Starter code](https://codesandbox.io/s/quiet-surf-7q6cu)
* Describe these terms:
  * Tag name
  * Attributes
  * Opening and closing tag
  * Self-Closing tag
* How do you nest HTML elements?
* Why is consistent indentation important in HTML?
* Name 5 HTML tags
* Which of these tags is correct? Why?
  * `<H1></H1>`
  * `<img></img>`
  * `<P></P>`
  * `<div></div>`
* Describe the correct use of these 5 tags:
  * `<h1>`
  * `<p>`
  * `<input />`
  * `<output>`
  * `<button>`
  * `<label>`
* Which of these tags is self-closing?
  * `h1`
  * `p`
  * `input`
  * `output`
  * `button`
  * `label`
* What is the problem with this code?

```html
<div>
  <p>Some content
  </div>
</p>
```
# Basic HTML

HyperText Markup Language, or HTML, is used to write the content of websites. Any text, images, inputs, outputs, and buttons are written in HTML files that have a `.html` extension. Every website should have at least one file called `index.html`, because this is what browsers will try to display by default when you go to a website.

## Anatomy Of An HTML Tag

There are two kinds of HTML tag:

![Double HTML tag](assets/anatomy-of-a-tag-double.png)

---

![Single HTML tag](assets/anatomy-of-a-tag-single.png)

* **Tag name**: These indicate what a tag means
* **Attributes**: These are properties of a tag that either configure it or further describe it
* **Opening and closing tag**: Most tags have an opening and closing pair that wrap the content they describe. Any attributes go inside the opening tag.
* **Self-Closing tag**: Some tags don't have closing tags and close themselves

All HTML is written inside one of these tags.

## HTML Tags

Here are some useful HTML tags:

### `<h1>`

`<h1>` is a tag used to create headings. There should only be one of these per page.

```html
<h1>MadLibs</h1>
```

### `<p>`

This is a tag used for general text. The `p` stands for "paragraph."

```html
<p>It's a beautiful day in the neighborhood, a beautiful day for a neighbor. Could you be mine? Would you be mine?</p>
```

### `<input />`

`<input />`s are self-closing tags that collect user input.

```html
<input />
```

### `<label>`

By itself, an `<input />` is just a box for entering text. `<label>` is a tag that describes what should be entered into an `<input />`.

```html
<label for="name">Name</label>
<input id="name" />
```

It's important to connect labels with inputs for usability. Watch what happens when you click the label in [this example](https://codesandbox.io/s/brave-shape-hdnbg).

### `<button>`

`<button>` creates a button that users can press. You can use this to trigger something in JavaScript. The text you want to display inside the button should go in between the opening and closing tag.

```html
<button>Click Me!</button>
```

### `<output>`

When something has been processed with JavaScript, it can be printed to the screen with `<output>`. Note that unlike `<input />`, `<output>` has an opening and closing tag.

```html
<output>This text was put here by JavaScript.</output>
```

## HTML IDs

To access the contents of HTML tags with JavaScript, add IDs to them. IDs look like this:

```html
<input id="word-3-input" />

<output id="word-3-output">Word 3 goes here</output>
```

Note that `id` is all lowercase, with no space between `id`, `=`, the `"`, and the name you choose to give it.

## Nesting

HTML tags with opening and closing tags can be nested:

```html
<p>
  This is some text content
  <output>This is an output nested inside the p tag!</output>
</p>
```

Be sure to close tags in the same order you open them in. For example, this is not valid HTML:

```html
<p>
  This is some text content
  <output>This is an output nested inside the p tag!</p>
</output>
```

## HTML Style

### Case-Sensitivity

HTML is case-insensitive, which means that `<article>`, `<ARTICLE>` and `<Article>` will all work. However, it is conventional to write your HTML tags all lowercase.

### Indentation

HTML is whitespace-insensitiver, meaning that it ignores spaces and returns. However, inconsistent indentation makes HTML very difficult to read. For example:

```html
<p><output>Some paragraph content here
  <input id="some-id" /></button>
```

It's not immediately obvious that neither the `<p>` tag nor the `<output>` tag were closed, and that the `</button>` closing tag doesn't have a matching opening tag. With proper indentation:

```html
<p>
  <output>
    Some paragraph content here
    <input id="some-id" />
    </button>
```

Each of the mistakes are easier to see.

### Whitespace

Since HTML is whitespace-insensitive, it's often technically valid to leave lots of whitespace around your markup, like this: `< input id = " adjective-input " / >`. It is conventional to keep everything trimmed: `<input id="adjective-input" />`.

## Watch Out!

Be careful of smart quotes! Most word processing programs like Word and Google Docs will substitute the `"` and `'` characters for `“`/`”` and `‘`/`’` characters (look for the curls). These are called smart quotes, and cannot be used for HTML attributes. Always write your code in a text editor, not in a word processor.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Structuring the web with HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML) | A popular beginner's tutorial on HTML. It covers many more HTML topics than this workshop. |
HTML
HTML File
File Extension
Website
`index.html`
Self-Closing HTML Tag
HTML Tag
HTML Tag Name
HTML Attribute
HTML Opening Tag
HTML Closing Tag
HTML Heading
`<h1>`
`<p>`
`<input />`
`<label>`
Usability
JavaScript
Nested HTML Tag
Case-Sensitivity
Whitespace
Smart Quote
Word Processor
Text Editor
## JS Email Repeater

Given this HTML:

```html
<label for="email-input">Email Address</label>
<input id="email-input" />
<button id="print">Print email address</button>

<output id="email-output">&nbsp;</output>
```

Write JavaScript to capture the email address entered and print it to the output.

[Starter code](https://codesandbox.io/s/lively-monad-wq8fs?file=/index.js)
* What is a JavaScript variable?
* How do you save something in a JavaScript variable?
* What does `console.log` do?
* What are DOM methods?
* How would you get the value of an HTML input with an id of "email"?
* How would you get the value of an HTML input with an id of "first-name-input" and save it in a variable called `firstName`?
* How would put the value in a variable called `firstName` into an HTML element with the ID of `first-name-output`?
* What is a JavaScript function?
* How do you declare a JavaScript function?
* How do you invoke a JavaScript function?
* What is the difference between declaring and invoking a function in JavaScript?
# Basic JavaScript

JavaScript, also called JS, is a programming language for adding actions to web pages. JavaScript can read and write any part of a web page, which is especially powerful when integrating user input (like forms), user interaction (like button presses), and data. JavaScript can be used to look up search results and display them on a page, subscribe users to a newsletter, power eCommerce sites, and much more.

## Logging

One of the easiest ways to inspect the results of JavaScript code is to log it:

![Demonstrating console.log](assets/js-console-log.png)

[Play with this code](https://codesandbox.io/s/musing-snow-75qxo?file=/index.js)

When you `console.log()`, anything between the parentheses will be printed to the console. The console isn't the same thing as the screen; you have to specifically open the console and most users will not see content that you put here. It's primarily used to test your code and examine what different things do. To open up the console in a browser:

* Mac: ⌘ + ⇧ + `j`
* Windows and Linux: `Control` + ⇧ + `j`

## JavaScript Variables

JavaScript variables are containers that keep values.

```js
const firstName = "Carlos"
console.log(firstName) // Prints "Carlos"
```

Declare variables with `const`, give the variable a name, and then set it equal to a value. When saving words in variables, note that you need to wrap them in quotes. Be careful about which quotes you use! `""` is not the same as `‟”` (look at the curls). When you write in a word processor like Word or Google Docs, the software generally replaces the `'` and `"` characters with smart quotes. These won't work in programming, so always write code in a text editor instead of a word processor.

When a variable is multiple words, it's conventional to lowercase all of the first word and use uppercase for the first letter the other words. This is called camelCase.

## DOM Methods

DOM methods are tools for reading and writing web pages with JavaScript. Two common DOM methods:

* `document.querySelector("#some-input-id").value` - This reads the data a user has entered into an input field. In this example, the input has an ID of `some-input-id`, but it could be anything you choose. Note the `#` before the ID; these selectors work the same as selectors in CSS.
* `document.querySelector("#some-input-id").textContent = "This text will go on the page"` - To make text show up on the page, select the element and set its `textContent` equal to the text you want to display. You can write it out in quotes like this example, or can give it a variable.

```html
<label for="text-input">Text Input</label>
<input id="text-input" value="This is some text input" />

<label for="text-output">Text Output</label>
<output id="text-output"><output>
```

![DOM method reading an input and writing it to an output](assets/js-dom-methods.png)

[Play with this code](https://codesandbox.io/s/brave-stallman-pnfrv?file=/index.js)

## JavaScript Functions

Functions are a way to group a multiple commands in JavaScript. You can save inputs to variables, read things from the web page, or write them to the web page inside of functions.

```js
// This part says what the function does
function substituteWords(){
  const textInput = document.querySelector("#text-input").value
  document.querySelector("#text-output").textContent = textInput
}

// This part actually executes it
substituteWords()

// And you use functions more than once
substituteWords()
substituteWords()
substituteWords()
```

One of the ways functions are used is in response to a user action, like a click. For example, if your HTML has a `<button>`:

```html
<label for="text-input">Text Input</label>
<input id="text-input" />
<button id="transform">Output this Input!</button>

<label for="text-output">Text Output</label>
<output id="text-output"><output>
```

You can get the button with a DOM method and give it a function to execute when its clicked:

```js
function substituteWords(){
  const textInput = document.querySelector("#text-input").value
  document.querySelector("#text-output").textContent = textInput
}

const button = document.querySelector("#transform")
button.onclick = substituteWords // No parentheses!
```

![Entering text into an input and seeing it on the screen](assets/js-functions.gif)

[Play with this code](https://codesandbox.io/s/friendly-mccarthy-hg0h8?file=/index.js)
JavaScript
User Input
User Interaction
`console.log`
Variable
Variable Name
Variable Value
Word Processor
Smart Quotes
Text Editor
camelCase
Web Page
DOM Method
Function
Function Execution
* Which of these are valid component names?
  * `<CartItem />`
  * `<Item />`
  * `tab.vue`
  * `<cart-item-heading />`
  * `<cartItemDisabled />`
  * `<AppSidebar />`
  * `import BlogPost from "BlogPost";`
  * `<StarRating />`
  * `user-addr.vue`
  * `<comments />`
* Describe the naming convention used in React components.
* What is a single-use component?
* Differentiate between JSX and HTML.
# React: Build Components

A component needs 3 things:

* Name
* File
* Declaration

## Names

React component names follow a set of rules:

* **Components should be multiple words**. To ensure compatibility with the web component spec, component names should be at least two words.
* <strong>No snake_case, no camelCase, only PascalCase</strong>. There are no circumstances where snake_case or camelCase are appropriate for component names, stick to PascalCase for component names.
* **Component file names should match variable names**. The component `FormInputText` should be stored in a file called `FormInputText.js`.
* **No abbrevs**. Write out the entire word in the name every time.
* **Names go general-to-specific**. Instead of `TextFormInput`, name it `FormInputText`. This helps with alphabetization in file directories.
* **Use `App` as a prefix for single-use components**. Indicates that there should only be one instance of something in the app, such as `AppHeader` and `AppSidebar`

## File

File names should match component names, there should only be one component per file, and you can organize your components in any folder structure you like.

## Declaration

At a minimum, a component needs to export a function the returns a JSX template. A minimal component looks like this:

```jsx
const SomeComponent = () => {
  return <p>Hello, world!</p> 
}

export default SomeComponent
```

On components that render longer templates, it's common to wrap the return in `()`:

```jsx
export default const SomeComponent = () => {
  return (
    <div>
      <p>Hello, world!</p> 
    </div>
  )
}
```

This allows you to indent the JSX independently of the JavaScript, which helps with readability. Many components import other components, styles, or libraries. These go at the top of the file:

```jsx
import { useState } from "react"
import SomeOtherComponent from "./SomeOtherComponent"
import "./SomeComponent.css"

const SomeComponent = () => {
  const [someState, setSomeState] = useState(0)
  return (
    <div className="SomeComponent">
      <SomeOtherComponent someProp={someState} />
    </div>
  )
}

export default SomeComponent
```

## Watch Out!

Components are functions that return JSX templates, not JSX templates:

```jsx
// This is a valid component
const SomeOtherComponent = () => <p>Hello, world!</p>

// This is not a valid component
const SomeComponent = <p>Hello, world!</p>
```

## Additional Resources
| Resource | Description |
| --- | --- |
| [Components and Props](https://reactwithhooks.netlify.app/docs/components-and-props.html) | React's guide to components |
| [Video: React Components](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=440s) | React Hooks Crash Course: Components |
| [Video: Class Components vs. Function Components](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=806s) | React Hooks Crash Course: Component types |
| [Video: React Hooks](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=852s) | React Hooks Crash Course: Hooks |
* React Component
* JSX
Convert the following functional components to class components:

```js
const FormInput = () => {
  const [inputValue, setInputValue] = useState("")
  const updateValue = event => setInputValue(event.target.value)

  return (
    <fieldset className="FormInput">
      <label htmlFor="form-input">Username</label>
      <input id="form-input" type="text" value={inputValue} onChange={updateValue} />
    </fieldset>
  )
}
```

---

```js
const LoginForm = ({login}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const updateUsername = event => setUsername(event.target.value)
  const updatePassword = event => setPassword(event.target.value)
  const handleSubmit = event => {
    event.preventDefault()
    login(username, password)
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" required value={username} onChange={updateUsername} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" required value={password} onChange={updatePassword} />

      <input type="submit" value="Login" />
    </form>
  )
}
```

---

```js
import { useState, useEffect } from "react"

const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    fetch(url)
      .then(response => response.json())
      .then(pokemon => {
        setError(false)
        setPokemon(pokemon)
      }).catch(error => setError(true))
  }, [name])

  return (
    <div className="PokemonCard">
      {
        pokemon.name
          ? (
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          )
          : <span>Loading...</span>
      }
      {
        error
          ? <span>There was a problem loading this Pokemon.</span>
          : null
      }
    </div>
  )
}
```
* What is a lifecycle method in React?
* How is state managed in class components in React?
* What class does a React class component need to extend?
* Where do JSX templates go in React class components?
* How do you access props in React class components?
* Where is initial state declared in React class components?
# React: Class-Based Components

React components were originally written using JavaScript classes. While functional components should be preferred, many excellent resources for React still use class-based components so it's helpful to be able to translate between them.

These are the primary differences between functional and class components:

## Declaration

Class components are classes that extend the `React.Component` class.

```jsx
import React, { Component } from "react"

class SomeComponent extends Component {
}

export default SomeComponent
```

## Templates

The only difference in rendering JSX templates between functional and class components is that in class components, the template must be returned from a `render()` method:

```jsx
class SomeComponent extends Component {
  render(){
    const { location } = this.props

    return <p>Hello, {location}!</p>
  }
}
```

The render method may also do calcuations and destructuring, just like in functional components. Note that these will recalculate on every render.

## State

One of the biggest differences between functional and class components is how state is handled. In functional components, the `useState` hook generates a stateful variable and a setter function. In class components, state is declared as a property, accessed with `this`, and set with `this.setState()`.

```jsx
class SomeComponent extends Component {
  state = {
    counter: 0,
  }

  increment = event => {
    this.setState({
      counter: counter + 1,
    })
  }

  render(){
    const { counter } = this.state

    return (
      <div>
        <p>{counter}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    )
  }
}
```

Note that event handlers are typically declared as methods on the class, accessed with `this`, and are written as arrow functions.

## Props

Props work this same in functional and class components, and are available on the `this.props` object:

```jsx
class SomeComponent extends Component {
  render(){
    const { location } = this.props

    return <p>Hello, {location}!</p>
  }
}
```

Destructuring props at the top of a render method can improve readability in the template by removing the additional noise of `this.props`.

## Lifecycle Methods

The other major difference between functional and class components is how side-effects and performance optimizations are handled. In functional components, side-effects and performance management is handled with various hooks such as `useEffect`. In class components, they are methods corresponding to different states of the component lifecycle that you can override.

```jsx
class SomeComponent extends Component {
  state = {
    someProperty: "Some Value"
  }

  componentDidMount = () => {
    fetch("http://someurl.com")
      .then(response => response.json())
      .then(parsedResponse => {
        this.setState({
          someProperty: parsedResponse,
        })
      })
  }

  render(){
    const { someProperty } = this.state

    return (
      <div>{someProperty}</div>
    )
  }
}

export default SomeComponent
```

`componentDidMount` can serve as a direct analog to `useEffect` in most cases.

## Full Example

```jsx
import React, { Component } from "react"

class SomeComponent extends Component {
  state = {
    someProperty: "Some Value"
  }

  someComputedProperty = () => {
    return this.props.someProp.map(item => (
      <p>{item}</p>
    )
  }

  componentDidMount = () => {
    fetch("http://someurl.com")
      .then(response => response.json())
      .then(parsedResponse => {
        this.setState({
          someProperty: parsedResponse,
        })
      })
  }

  render(){
    return (
      <div>
        <p>Hello, world!</p>
        <span>{this.state.someProperty}</span>
        {this.someComputedProperty}
      </div>
    )
  }
}

export default SomeComponent
```

## Switching a Functional Component to a Class Component

1. Import the `Component` class from the `react` library
2. Change the function declaration to a class declaration that extends `Component`
3. Wrap the JSX `return` value in the `render()` method
4. Destructure any props from `this.props` in the render method
5. Move any `useEffect` hooks into the `componentDidMount` method
6. If needed, move any `useState` hooks into the `state` property, update setter functions to use `setState`, and add `this.state` to any state references

## Switching a Class Component to a Functional Component

1. If needed, import `useState`, switch all `state` values to the `useState` hook, drop `this.state` from all state values, and change all `setState` calls to use the setters from their respective hooks
2. Change the class declaration to a function declaration
3. Remove the `render()` method, leaving the `return` value
4. Destructure any props in the function parameters
5. Move any lifecycle methods into the appropriate hooks
6. Remove the `Component` import

## Watch Out!

* Always use arrow functions for any custom methods you write (method shorthand is preferred for lifecycle methods). This helps keep the `this` value consistent when chaining calls.
* While there are currently no plans to remove class-based components from React, they offer no benefit over functional components and should be avoided.
* It used to be popular to initialize state in the `constructor` method, but this is no longer needed.
* The only required part of class components is the `render()` method.
* Older versions of React require that the default import from the `react` library be in scope for the component, even if it's not being used.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React: Official Docs](https://reactjs.org/docs/getting-started.html) | The official (class-based) docs for React |
Functional Component
Class Component
JSX
Destructuring
Render
Event Handler
Lifecycle Method
Side-effect
Method
Property
Constructor
Given the following directory structure:

![CLI directory structure](assets/wineflix.png)

As well as knowing that the folder is in a directory called `/users/admin/projects/wineflix`:

* What is the absolute path to the `Category.vue` file?
* If you're in the `public` directory, what command would move you to the `components` directory?
* If you're in the `src` directory`, what would the output be if you ran `pwd`?
* If you ran `ls` in the root of the project folder, what would the output be?
* If you're in the `components` directory, what directory will you be in if you run `cd ../..`?
* If you're in the `src` directory, what directory will you be in if you run `cd ../../..`?

---

Given the following directory structure:

![CLI directory structure](assets/wineflix.png)

As well as knowing that the folder is in a directory called `/users/admin/projects/wineflix`:


* If you're in the `src` directory, how would you create a file called `Wines.vue` in the `components` folder in one command?
* If you're in the `components` directory, how would rename `Hero.vue` to `Header.vue` in one command?
* If you in the `src` directory, how would you rename `assets` to `media` in one command?
* If you're in the `src` directory, how would you delete the `Category.vue` file in one command?
* If you're in the `src` directory, how would you delete the `assets` directory in one command?
* If you're in the `public` directory, how would you delete the `components` directory in one command?
* If you're in the `components` directory, how would you copy the `Wine.vue` file to a new file in the same directory called `Wines.vue`?
* If you're in the `src` directory, how would you copy the `Wine.vue` file to a new file in the same directory called `Drink.vue`?
* If you're in the project root directory, how would you copy the `red-wine.jpg` file to the `assets` directory?
* In a UNIX file system, what does it mean when a file starts with a `.`?
* In a UNIX file system, what does it mean when a file ends with `.xpi`?
* How do you create new empty files on the CLI?
* How do you create new empty directories on the CLI? 
* Why is the command to to create new files called `touch`?
* What command displays the contents of a file on the CLI?
* How do you rename a file on the CLI?
* What command moves a file on the CLI?
* Explain why the same command moves and renames files.
* How do you copy a file on the CLI?
* How do you copy a directory on the CLI?
* What is the command to delete a file on the CLI?
* What is the command to delete an empty directory on the CLI?
* What is the command to delete a directory with files in it on the CLI?
# CLI: File Management

In a graphical file manager, you double-click to open files, drag them into new folders, and use key commands and context menus to delete and rename files. You can efficiently do all of these tasks and more on the command line.

## Files

Everything in the CLI is either a file or a directory, which is also called a folder. Directories serve the same purpose they do in graphical file managers, as do common file types such as text documents, images, and music. Files are also used for things like programs and user input. For the most part, the file extension characters at the end of a file (like `.txt`, `.js`, `.md`, `.zip`) are just part of the file name and carry no other meaning. Files and folders that start with a `.`, such as `.bashrc` and `.ssh`, are considered hidden and are only listed if you specifically ask for them.

## Creating Files

To create a blank file, use the `touch` command:

![Creating files on the command line](assets/cli-1.png)

The touch command was originally intended to update the _last modified_ time of a file. If the file doesn't exist, it creates it.

## Creating Directories

To create an empty directory, use the the `mkdir` command:

![Creating directories on the command line](assets/cli-2.png)

## Reading files

To see the contents of a file, use the `cat` command.

![Reading a file](assets/cli-3.png)

`cat`, short for _concatenate_, was originally designed to print the combined contents of a multiple files. If you only give it one file, it prints the contents of the file to the screen.

## Moving files and folders

To move a file or folder, use the `mv` command:

![Moving a file](assets/cli-4.png)

`mv` takes two arguments:

* An absolute or relative path of the file you want to move
* An absolute or relative path to the directory you want to move the file to

## Renaming files and folders

To rename a file, use the `mv` command:

![Renaming a file](assets/cli-5.png)

This is the same command used to move files. If you the path you're moving the file to is in a different directory, it will move it there. If the path you're moving the file to is in the same directory, it will rename the file. You can combine these to move and rename a file at the same time:

![Moving and renaming a file](assets/cli-6.png)

## Copying files and folders

To copy a file, use the `cp` command:

![Copying a file](assets/cli-7.png)

To copy a folder, you need to add the `-r`, or _recursive_ flag:

![Copying a directory](assets/cli-8.png)

## Deleting files and folders

To delete a file, use the `rm` command:

![Deleting a file](assets/cli-9.png)

To delete a folder, use the `-r`, or _recursive_ flag:

![Deleting a directory](assets/cli-10.png)

Note that this only works if the directory doesn't have any files in it. To delete a folder _and_ its contents, you need to add the `-f`, or _force_ flag:

![Deleting a directory](assets/cli-11.png)

## Watch Out!

* Any path that starts with `/` is an absolute path. `mv old new` takes a file called `old` and renames it `new`, but `mv old /new` takes a file called `old`, **moves to the root directory**, and renames it `new`.
* `rm` is a dangerous command. By default, you will not be prompted to ask if you're sure you want to delete something, which means you can accidentally entire projects and even large parts of your computer by not using it carefully. Adding the `-i`, or _interactive_, flag to an `rm` command adds a prompt asking if you're sure you want to delete.
Graphical File Manager
Folder
Key Command
Context Menu
Command Line
CLI
Directory
OS
File
File Extension
`touch`
`mkdir`
`cat`
`mv`
Absolute Path
Relative Path
`cp`
Recursive
`rm`
* What is an argument?
* What is a flag?
* What is a short flag?
* What is a long flag?
* What is an advantage to short flags?
* What is an advantage to long flags?
* What's the difference between `git -am` and `git -ma`?
## CLI: Arguments and Flags

Many commands require options or file paths in order to work. These are specified as either arguments or flags.

## Arguments

Arguments are often files that you want to run a command on. Some commands don't need any arguments:

```bash
ls
```

This lists all of the files and folders in the current directory. You can also give it the path to a folder as an argument to list everything in that directory:

```bash
ls ~/projects
```

Some commands take multiple arguments:

```bash
mv old/location/some-file.md new/location
```

## Flags

Flags are options for commands. They take two forms:

### Short Flags

Most of the flags you'll use are short flags. Short flags are a single dash followed by a single letter:

```bash
ls -l
```

This example passes the `l` short flag to the `ls` program, which makes it do a long listing. Short flags can be combined, like adding the `-l` and `-a` short flags to make `-la`:

```bash
ls -la
```

With short flags, the order doesn't matter. These two commands are the same:

```bash
ls -la
ls -al
```

### Long Flags

Long flags are two dashes followed by words:

```bash
rm --recursive some-full-directory
```

Long flags are descriptive, but take longer to type and can't be chained together.

### Long and Short Flags

Many flags have both long and short versions. For example, these are the same:

```bash
ls -r
ls --recursive
```

Not every short flag has long equivalent and vice-versa.

### Using Arguments and Flags

Some commands take flags and arguments:

```bash
rm -rf some-folder
```

When using flags and arguments, order often matters. Refer to the documentation for the command to be sure.

### Using Flags with Arguments

Some commands take flags that have their own arguments. Some look like regular arguments that are placed after the flag:

```bash
ffmpeg -i input-file -o output-file
```

Or they may be separated by a character like `=`:

```bash
git log --pretty=oneline
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Heroku: CLI Flags in Practice](https://blog.heroku.com/cli-flags-get-started-with-oclif) | Heroku's blog on CLI flags |
| [MDN: Introducing Command Options](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line#introducing_command_options) | MDN's crash course on CLI command options |
Argument
Flag
File
Directory
Command
Short Flag
Program
Recursive
Long Flag
Documentation
Character
CLI
[Typing Club](https://www.typingclub.com/) - Touch-typing practice

---

[Programmer Typing Practice](https://typing.io/) - Programmer touch-typing practice, with additional symbols and formatting

---

[Learn Enough Command-Line to Be Dangerous](https://www.learnenough.com/command-line-tutorial) - 4-part tutorial covering basic commands, files, and directories. Work through at least the first part, including the exercises.
* What are 4 advantages to the command line over graphical file managers
* How is the CLI more flexible than graphical file managers?
* How is the CLI more powerful than graphical file managers?
* How is the CLI faster than graphical file managers?
* Why is it easier to automate tasks on the command line than in a graphical file manager?
# Introduction to the Command Line

The command line interface, or CLI, may seem like an archaic way to use a computer. However, it's also one of the most powerful and offers software developers many advantages over graphical interfaces.

## Command Line Advantages

### Flexibility

Simple programs on the command line can be combined to make complex behavior.

```bash
cat *.txt | grep "JavaScript" > results.md
```

This searches through every file in the current folder that ends in `.txt` for lines containing the word "JavaScript" and prints them to a new file called `results.md`. Individual commands and operators can be chained together like words in sentences to solve a wide range of problems.

### Power

Some things can only be done on the command line:

```bash
for (f in *) do
  cd ${f}
  mkdir examples
  touch examples/README.md
done
```

This goes into every folder in your current directory, creates a folder called `examples`, and creates a file called `README.md` in each one. This kind of task is tedious and error-prone in a graphical file manager, but can be accomplished in 5 lines of code on the CLI.

### Speed

One of the simplest efficiency gains programmers can make is never taking their hands off the keyboard. Switching between the keyboard and mouse may only take a second, but it's easy for those seconds to turn into minutes, hours, and days over the course of a project.

### Automation

It's possible to program computers to click on screens and type into inputs, but it's slow and error-prone. CLI commands can be saved in files and run, which means repetitive or complex tasks can easily be automated.

## Opening the Terminal

To open your computer's terminal:

* **MacOS**: `Command` + `Space` to open Spotlight Search, search for "Terminal"
* **Linux**:  `Control` + `T`

The terms CLI, shell, and terminal mean slightly different things, but are generally used interchangeably. "Open your terminal", "go into the CLI", or "Pull up your shell" all mean the same thing in common practice.

---

Programming languages and frameworks come and go, but the command line isn't going anywhere. CLI skills have one of the highest returns on investment and are a critical part of every modern developer's toolbox.

## Watch Out!

If you get in trouble on the command line, you can usually get back to safety by pressing `Control` + `c` enough times. Note that this is `Control` even on operating systems like MacOS that often use the `Command` key when other platforms use `Control`.

## More Resources

| Resource | Description |
| --- | --- |
| [MDN: Command Line Crash Course](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line) | Mozilla's CLI tutorial |
| [Why Learn The Command Line](https://www.dataquest.io/blog/why-learn-the-command-line/) | An article outlining more arguments in favor of the CLI. |
| [Learn Enough Command Line To Be Dangerous](https://www.learnenough.com/command-line-tutorial) | A very thorough tutorial on CLI basics |
| [Video: How to use the command line](https://www.youtube.com/watch?v=5XgBd6rjuDQ) | Jesse Showalter's guide to the command line |
Command Line
CLI
Directory
Graphical File Manager
File
Graphical Interface
Shell
Terminal
Given the following directory structure:

![CLI directory structure](assets/wineflix.png)

As well as knowing that the folder is in a directory called `/users/admin/projects/wineflix`:

* If you're in the `src` directory, how would you create a file called `Wines.vue` in the `components` folder in one command?
* If you're in the `components` directory, how would rename `Hero.vue` to `Header.vue` in one command?
* If you in the `src` directory, how would you rename `assets` to `media` in one command?
* If you're in the `src` directory, how would you delete the `Category.vue` file in one command?
* If you're in the `src` directory, how would you delete the `assets` directory in one command?
* If you're in the `public` directory, how would you delete the `components` directory in one command?
* If you're in the `components` directory, how would you copy the `Wine.vue` file to a new file in the same directory called `Wines.vue`?
* If you're in the `src` directory, how would you copy the `Wine.vue` file to a new file in the same directory called `Drink.vue`?
* If you're in the project root directory, how would you copy the `red-wine.jpg` file to the `assets` directory?
* What is an absolute path?
* How do you know something is an absolute path?
* What is a relative path?
* What does the `pwd` command do?
* How do you change your current folder?
* How do indicate going up a directory in a path?
* What does `~` mean at the beginning of a CLI path?
* What does `/` mean at the beginning of a CLI path?
* How can you find the absolute path to your current location?
* How do you see the files and folders in the current directory (no hidden files)?
* How do you see all the files and folders in the current directory, including hidden files?
* How do you see all the files and folders in the current directory, including hidden files, as well as displaying additional data about each file?
# CLI: Navigation

In a graphical file manager, you navigate the file system by double-clicking on folders and using the back or up buttons. Your current location is usually showed as breadcrumbs.

![Graphical file manager](assets/file-manager.png)

In the CLI, you navigate and find your current location by entering commands.

![CLI file management](assets/cli.png)

## Absolute and Relative Paths

There are two ways to describe any location.

An absolute path starts with `/` and describes how to get to a location from the root directory. In this directory structure, if you're in the `wineflix` folder:

![Directory structure](assets/cli-navigation-1.png)

* The absolute path to this location is `/home/some-user/projects/wineflix`.
* The relative path to this location is `.`

Without moving from the `wineflix` directory, you can describe paths to other directories:

* The absolute path to the `pages` directory is `/home/some-user/projects/wineflix/pages`
* The relative path to the `pages` directory from the `wineflix` directory is `./pages`

Directories above you are written with `..`:

* The absolute path to the `pictures` directory is `/home/some-user/pictures`
* The relative path to the `pages` directory from the `wineflix` directory is `../../pictures`

Lastly, you can describe locations relative to your home directory by using `~`:

* The absolute path to the `documents` directory is `/home/some-user/documents`
* This path can also be written as `~/documents`

Entering paths correctly by hand is tedious and error-prone, but tab completion helps. If you enter a couple of characters for the path you want and press `Tab`, the terminal will try to complete the rest of the path for you. If there's more than one possible match, you can press `Tab` repeatedly to cycle through options. This accomplishes two things: It saves you time typing, and it also ensures that the file or folder you're looking for actually exists. If the terminal can't tab complete a path, you're probably not in the right place.

## Finding out where you are

To see the absolute path to your current location, run `pwd` in your terminal:

```bash
pwd
/users/username-goes-here
```

## Finding out what's in a directory

To see the files in a directory, use `ls`:

```bash
ls
some-directory some-file.md some-other-file-md
```

You can use the `-l`, or _long listing_, flag to see all the files and folders listed one-per-line, as well as other information about them:

```bash
ls -l
total 3
drwxrwxr-x 2 username-here username-here 4096 Jul  3 10:12 some-directory
-rw-rw-r-- 1 username-here username-here   23 Jul  3 10:13 some-file.md
-rw-rw-r-- 1 username-here username-here   23 Jul  3 10:13 some-other-file.md
```

You can use the `-a`, or _all_, flag to see all files including hidden files, which are files that start with a `.`:

```bash
ls - a
. .. .some-hidden-directory .some-hidden-file some-directory some-other-directory some-file.md some-other-file-md
```

You can even combine the two:

```bash
ls -la
total 7
drwxrwxr-x 2 username-here username-here 4096 Jul  3 10:12 .
drwxrwxr-x 2 username-here username-here 4096 Jul  3 10:12 ..
drwxrwxr-x 2 username-here username-here 4096 Jul  3 10:12 .some-hidden-directory
-rw-rw-r-- 1 username-here username-here   23 Jul  3 10:13 .some-hidden-file.md
drwxrwxr-x 2 username-here username-here 4096 Jul  3 10:12 some-directory
-rw-rw-r-- 1 username-here username-here   23 Jul  3 10:13 some-file.md
-rw-rw-r-- 1 username-here username-here   23 Jul  3 10:13 some-other-file.md
```

## Navigating

![Directory structure](assets/cli-navigation-1.png)

To navigate in a shell, use the `cd` command to change directory and give it any relative or absolute path. This navigates from the `wineflix` directory to the `videos` directory:

```bash
cd ../../videos
```

Or by absolute path:

```bash
cd /home/some-user/videos
```

Or by home-relative path:

```bash
cd ~/videos
```

To move from the `wineflix` directory to the `assets` directory:

```bash
cd assets
```

Here are some more navigation examples:

```bash
cd ..                                               # Move up a directory
cd ../some-folder/some-other-folder                 # Move up a directory, then into "some-folder", then "some-other-folder."
cd some-folder                                      # Move into "some-folder"
cd some-folder/some-other-folder/yet-another-folder # Navigate into "some-folder", then "some-other-folder", then "yet-another-folder"
cd /                                                # Move to the root directory
cd /home/user-name-here                             # Move to your home directory
cd ~                                                # Move to your home directory
cd ~/some-folder                                    # Move to your home directory, then "some-folder"
```

## Watch Out!

You can only `cd` into folders, not files.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Navigation on the Command Line](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line#navigation_on_the_command_line) | Navigation on the Command Line |
CLI
Graphical File Manager
Absolute Path
Relative Path
CLI: `.`
CLI: `..`
CLI: `/`
CLI: `~`
CLI: Tab Completion
Path
Directory
Shell
Command
## Deploy Donuts

[Exercise](https://github.com/sikaeducation/deploy-donuts)

---

1. Deploy an app to Heroku.
2. Tail the logs
3. Make a request
4. Watch the logs update in real-time
* What is Heroku?
* What is the Heroku Toolbelt for?
* What is a config var and what is it used for?
# Cloud Deployment: Heroku

How do you deploy an API to Heroku?

## Creating an Account

Go to [heroku.com](https://heroku.com) and create an account. You are required to give them a credit card number to create an account, but you can do everything needed to host APIs for small projects for free.

![Heroku login](assets/heroku.png)

Next, follow the instructions on the [Heroku CLI help page](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) for installing the Heroku Toolbelt for your operating system. After you've installed the Heroku Toolbelt, run `heroku login`. You'll be directed to login to Heroku from your default browser, after which your terminal will stay logged into Heroku indefinitely. This is useful for creating apps on the CLI, viewing an app's logs locally, manually deploying, and more.

## Creating an App

While logged in, click "New" on the Heroku dashboard. You'll be prompted to enter a name, which needs to be unique within all of Heroku and will show up in the URL. Then, click "Create App".

![Heroku app creation](assets/heroku-2.png)

## Setting Up Deployment

The easiest way to deploy code with Heroku is to connect it to a repository on Github. Go to "Deploy" -> "Deployment Method" -> "GitHub". Search for your repository on GitHub to connect it. Choose the Git branch you'd like to deploy (usually `main` or `master`). You can manually press the "Deploy Branch" button every you want to deploy, or you can press "Enable Automatic Deploys" to automatically redeploy your app everytime you push new code to GitHub.

![Heroku app creation](assets/heroku-3.png)

## Config Vars

Often, you'll have parts of your app that are different when running locally vs. on Heroku. For example, you may want to use a local database in development, and one of Heroku's databases in production. These are called "environment variables." In the "Settings" tab for a Heroku app, press the button that says "Reveal Config Vars."

The form you see allows you to set keys and values for environment variables your app can use. In a Node app, these are available to you in the `process.env` object. For example, if you set `DATABASE_URL` to `postgres:///some-data-basename` in Heroku's config vars, then logging `process.env.DATABASE_URL` will result in `postgres:///some-database-name` being printed to the console.

![Heroku app creation](assets/heroku-4.png)

## Logging

To view traffic and console logs for a Heroku app in real-time, do one of the following:

* Go to "More" (upper right corner of the dashboard) -> "View Logs"
* Run `heroku logs -a app-name-goes-here --tail` in the terminal. You can press "Control" + "C" to stop.

This is helpful for debugging an app that works locally but isn't working on Heroku.

## Watch Out!

By default, a Heroku app will sleep if it hasn't received any requests for 30 minutes. This means the next request it gets will need to wake up the server, which causes a substantial delay in the response. This is a limitation of Heroku's free tier. To keep an app awake full-time, go to "Resources" -> "Change Dyno Type" -> "Hobby". This costs $7 a month to run, but is prorated down to the second.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Heroku: Deploying With Git](https://devcenter.heroku.com/articles/git) | Heroku's official guide to deploying with Git |
| [Video: Deploy your first App with Heroku and Node.js](https://www.youtube.com/watch?v=MxfxiR8TVNU) | Jonny Kalambay's tutorial on Heroku deployment with Node |
Heroku
API
URL
Config Vars
Logging
Research two comparable offerings from AWS and GCP. Compare:

* Pricing
* How they're managed
* Range of features
* What advantages does cloud deployment have over traditional deployment?
* Describe cloud computing.
# Intro to Cloud Deployment

Hosting something on the public internet traditionally involves these steps:

1. Purchase a domain from a domain registrar
2. Create a DNS record that points your domain to the IP address of your office or data center
3. Configure a computer to run your app
4. Route traffic that comes into your office or data center to that computer
5. Maintain the computer running your app

This works and is still used some places, but steps 3-5 involve a lot of expensive expertise that has little overlap with application development. There are a lot of ways for all of these steps to go badly; if the computer turns off because of a power outage, hardware failure, or even because someone just tripped over the cable, the entire website goes down. Upgrading a site often means turning the server off for scheduled maintenance, updating the code, and restarting the server. Luckily, this kind of server work is available as a commodity from several providers now.

## Cloud Deployment

With cloud deployment, the deployment process is as simple as:

1. Fill out a form to create a new server on a cloud provider
2. Attach your server to a Git repository

The burden of keeping your site up, upgrading hardware, and dealing with backups and disasters is outsourced to the cloud provider. Instead of maintaining IT staff and hardware, you pay a low by-the-second rate to run the server. Need more capacity or speed? It can be as simple as moving a slider. Only need that capacity or speed for a short period of time? Move the slider back when you're done. Some cloud providers even allow you to do this automatically based on conditions. The same providers also often offer database hosting services, logging, domain name registration, and more.

Turning these essential parts of the web into commodity services drastically lowers the barriers to making web apps. Instead of requiring an IT staff to start a modest web app, all you need is a credit card.

## Cloud Providers

Here are some examples of cloud providers:

* **Amazon Web Services (AWS)** - The largest cloud provider. Offers the largest range of services, but is famously difficult to navigate.
* **Google Cloud Platform (GCP)** - Google's competitor to AWS. Popular with enterprises, GCP's pricing is often better than AWS.
* **Azure** - Microsoft's competitor to AWS. Popular with enterprises that are in Microsoft's ecosystem already, Azure's pricing is often better than AWS.
* **Heroku** - A "platform as a service". Generally easier to use and manage than AWS and GCP, with the trade-off of being more expensive and less configurable. Heroku has a generous free tier.

## Cloud

Why is it called the "cloud"?

When you rent a server on a cloud provider, you may not be renting a single physical device. Often, one physical computer may be host to a dozen different sites from different users, or the duties for hosting may be distributed across multiple computers. None of this is important to their users, who just work with the abstract concept of a server. The cloud is when the logical use of someone else's computer is abstracted away from the literal use of a physical computer.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: Cloud Computing](https://en.wikipedia.org/wiki/Cloud_computing) | Wikipedia's article on cloud computing |
| [Wikipedia: Cloud Storage](https://en.wikipedia.org/wiki/Cloud_storage) | Wikipedia's article on cloud storage |
| [AWS](https://aws.amazon.com/) | Amazon Web Services, a cloud provider |
| [GCP](https://cloud.google.com/) | Google Cloud Platform, a cloud provider |
| [Heroku](https://www.heroku.com/) | Heroku, a cloud provider |
| [Video: Cloud Services Explained](https://www.youtube.com/watch?v=1ERdeg8Sfv4) | LucidChart's guide to the cloud |
Domain Registrar
DNS Record
IP Address
Cloud
Git Repository
Logging
AWS
GCP
Heroku
Change the following code to use multiline comments:

```js
// This is a comment that goes
// On multiple lines and could
// Actually use a multiline comment instead
```

---

What's wrong with this code?

```css
.user-card {
  margin-left: -3px; // Visual alignment
}
```

---

Is this a valid HTML comment?

```html
<div>
  <!--
    Your code goes here
  -->
</div>
```
---

Is this a valid HTML comment?

```html
<img src="<!-- Image URL goes here-->" />
```
* How do you write comments in HTML?
* How do you write comments in CSS?
* How do you write comments in JavaScript?
* When should comments be used?
* When should comments not be used?
# Comments

Almost every programming language has a way to store comments, or notes inside your code.

## HTML Comments

```html
<!-- The second span needs to open on the same line the first one closes on to prevent extra whitespace being added by the browser -->
<span>One</span><
span>Two</span>
```

HTML comments happen between the `<!-- -->` characters. They can go on one line or span multiple lines.

## CSS Comments

```css
/*
This is a multi-line
CSS comment
*/

div {
  margin-left: -5px; /* Negative margin is for visual alignment */
}
```

CSS comments happen between the `/* */` characters. Like HTML comments, they can go on one line or span multiple lines.

## JavaScript Comments

```js
/*
This is a multi-line
JS comment
*/

const a = 1 // This is a single-line comment
// So is this
```

JS comments happen between the `/* */` characters on muliple lines, or after a `//` on one line.

## Why You Probably Shouldn't Write So Many Comments

Many introductory programming classes advise students to write lots of comments. Comments aren't all good, however. They can make code harder to read, and can say things that are outright false.

## Things Worth Commenting

* Debugging. One of the best ways to debug code is to comment things out while you're trying to narrow down where errors are happening. Make sure you don't keep commented out code, though!
* Anytime you use something in an unconventional or unusual manner, especially if you did so to work around a technical limitation. For example, there are some tricks in CSS that require using negative values for margins. Those are good opportunities for a comment.
* Marking different areas of the same file. If one file has a few different logical areas, using comments as headings can be helpful. Consider first if it wouldn't make sense to break up the file into multiple files, though.

## Things That Should Not Be Commented

* Bugs. If a part of the code isn't working as intended, keep track of that in an issue tracking system.
* Unused code. Don't keep old code lying around. If you need to get old something back, use version control.
* Explanations of what code does. This one is a little counter-intuitive, especially to beginners. The problem is that you create two sources of truth- what you say the code does, and what it actually does. Those often start out being the same and drift over time. It's normal and reasonable to write comments explaining what code does while you're writing it to help you clarify your thoughts, just clear them out before you commit your code.

Comments help explain unclear code. If it isn't obvious why a piece of code exists, a comment can help. However, your first step should be to try to find a way to make the code so clear it wouldn't need a comment. Often, using better semantic tags and class names in HTML and CSS and variable and function names in JavaScript can remove the need for a comment.


## Additional Resources

| Resource | Description |
| --- | --- |
| [Video: The Art of Code Comments](https://www.youtube.com/watch?v=yhF7OmuIILc) | Sarah Drasner's overview of code commenting philosophy |
Code Comment
HTML Comment
JavaScript Comment
CSS Comment
Debugging
Bug
Issue Tracking System
Version Control
HTML: Semantic Markup
Given this data:

```js
[{
  band: "Reel Big Fish"
  instruments: ["guitar", "drums", "bass", "voice", "trumpet", "sax", "trombone"],
},{
  band: "The Weakerthans"
  instruments: ["guitar", "drums", "bass", "voice"],
},{
  band: "Giveton Gelin Quintet"
  instruments: ["piano", "drums", "bass", "trumpet", "sax"],
},{
  band: "Deadmau5"
  instruments: ["computer"],
},{
  band: "311"
  instruments: ["drums", "guitar", "bass", "voice", "turntable"],
}]
```

Calculate a value that returns all unique instruments and display the list in a component.
* Describe derivative state in your own words.
* What is an alias?
* Where can a component get data from? List as many as you can.
* What is the point of derivative state?
* What causes derivative state to update?
# React: Computed Values

The two main sources of data for a component are props and state. There is also data that's derived from either or both of those, which are called computed values. For example, if you have a list of movies:

```js
const movies = [{
  id: 1,
  title: "Star Wars",
  genre: "Fantasy",
},{
  id: 2,
  title: "Clerks",
  genre: "Comedy",
},{
  id: 3,
  title: "Super Troopers",
  genre: "Comedy",
}]
```

There are a few different ways you could process this data. You might want only the titles in a string (`"Star Wars, Clerks, Super Troopers"`), you might want them alphabetized, or you might want only the comedy movies. Furthemore, you may want to turn any or all of these into JSX elements. All of those are different presentations of the same data, not new data.

To do this in React, save these computed values as variables. These can be referenced in other computed values or used directly in the template:

```jsx
const MovieDisplayer = ({ movies }) => {
  const headline = movies.map(movie => movie.title).join(", ")
  const alphabetizedMovies = movies.sort((movieA, movieB) => {
    if (movieA.title > movieB.title) {
      return 1
    } else if (movieA.title < movieB.title) {
      return -1
    } else {
      return 0
    }
  })
  const allGenres = alphabetizedMovies.map(movie => <li key={movie.id}>{movie.title}</li>)
  const comedies = alphabetizedMovies.filter(movie => movie.genre === "Comedy")
    .map(movie => <li key={movie.id}>{movie.title}</li>)

  return (
    <div className="MovieDisplayer">
      <h2>{headline}, and more!</h2>
      <h3>In Your Favorite Genre:</h3>
      <ul>{comedies}</ul>
      <h3>All Movies</h3>
      <ul>{allGenres}</ul>
    </div>
  )
}
```

[Play with this code](https://codesandbox.io/s/restless-lake-vp45p)

You can also use this to alias or destructure props you're given:

```jsx
const FavoriteMovieBadge = ({ favoriteMovie }) => {
  const title = favoriteMovie.title

  return <h2>{ title }</h2>
}
```

Whenever the source data changes, any computed values will be automatically recalculated when the component rerenders.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Dave Ceddia: Computed Properties in React](https://daveceddia.com/computed-properties-in-react/) | Blog post on using computed properties in React|
React Props
State
JSX Element
React
Alias
Rerender
Computed Value
Use conditional rendering to make the text of this button reflect its current status and update its CSS class.

```jsx
function NightLight(){
  const [ isOn, setIsOn ] = useState(false)
  return (
    <button className="light off" onClick={() => setIsOn(!isOn)}>This light is off!</button>
  )
}
```
* What is conditional rendering in React components?
* What does this render if `isOverdue` is `true`?

```jsx
{
  isOverdue && <span className="alert badge">Overdue!</span>
}
```

* What does this render if `isOverdue` is `false`?

```jsx
{
  isOverdue && <span className="alert badge">Overdue!</span>
}
```

* What does this render if `isOverdue` is `true` and `daysRemaining` is 3?

```jsx
{
  isOverdue
    ? <span className="alert badge">Overdue!</span>
    : <span className="badge">{daysRemaining} days remaining</span>
}
```

* What does this render if `isOverdue` is `false` and `daysRemaining` is 3?

```jsx
{
  isOverdue
    ? <span className="alert badge">Overdue!</span>
    : <span className="badge">{daysRemaining} days remaining</span>
}
```
# React: Conditional Rendering

Many components need to render some parts of the template in certain cases but not others. For example, a library book app may have an `Overdue` badge that only shows up if today's date is after the book's due date. How would you conditionally render this content with JSX?

```jsx
const BookListing = ({ title, dueDate }) => {
  const isOverdue = Date.parse(dueDate) < Date.now()

  return (
    <div className="BookListing">
      <h2>{title}</h2>
      {
        isOverdue && <span className="alert badge">Overdue!</span>
      }
    </div>
  )
}
```

[Play with this code](https://codesandbox.io/s/little-surf-b2qot?file=/src/BookListing.js)

![2 books, 1 overdue](assets/conditional-rendering-1.png)

This component:

1. Calculates a boolean value for whether or not the book is overdue and stores it in `isOverdue`
2. The template checks whether `isOverdue` is truthy or falsy
  * If it's true, it renders the JSX element `<span className="alert badge">Overdue!</span>`
  * If it's false, it renders nothing

You can also use a variation on this technique with ternaries to render different content in each case:

```jsx
const BookListingWithDaysRemaining = ({ title, daysRemaining }) => {
  const isOverdue = daysRemaining <= 0

  return (
    <div className="BookListing">
      <h2>{title}</h2>
      {
        isOverdue
          ? <span className="alert badge">Overdue!</span>
          : <span className="badge">{daysRemaining} days remaining</span>
      }
    </div>
  )
}
```

[Play with this code](https://codesandbox.io/s/little-surf-b2qot?file=/src/BookListingWithDaysRemaining.js)

![2 books, 1 overdue, 1 with 3 days remaining](assets/conditional-rendering-2.png)

## Watch Out!

The reason that the boolean comparison `&&` works to conditionally render an element is that if the first condition is true, the browser attempts to render the second one. If the first condition is false, the browser ignores the rest of the expression since `&&` can't be satisfied.

---

The reason that JSX uses ternaries instead of `if`/`else` is that JSX allows any JS expression, but no JS statements or control structures. That means no `if`/`else`, `for`, variable assignments, and so on.

---

Since JSX allows you to do any JavaScript expression, you can also write all of the conditional logic in the template directly:

```jsx
return (
  <div className="book-listing">
    <h2>{title}</h2>
    {
      Date.parse(dueDate) < Date.now()
        ? <span className="alert badge">Overdue!</span>
        : null
    }
  </div>
)
```

This is almost always harder to read and understand than testing for simple boolean values.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React: Conditional Rendering](https://reactwithhooks.netlify.app/docs/conditional-rendering.html) | React's guide to conditional rendering |
| [React: Conditional Rendering](https://reactwithhooks.netlify.app/docs/conditional-rendering.html) | React's guide to conditional rendering |
* React
* Conditional Rendering
* Component
* Boolean
* Truthy
* Falsy
* JSX Element
* Ternary
* Expression
* HTML Template
Draw a diagram of how a controlled form works.

---

Build a login form.

---

Build a `<FormInput />` component that adds combines an `<input />` and a `<label>`. Give it the correct props to control it from a form.

---

## Conference Registration

[Exercise](https://github.com/sikaeducation/conference-registration-react)
* What is a controlled form?
* Describe 1-way data binding.
* Compare and contrast 1- and 2-way data binding.
* What happens if you only bind the value?
* What happens if you only respond to the change event?
# React: Controlled Forms

React is all about one-way data flow. However, form inputs are naturally two-way; you want to be able to set the value of an input programmatically, and you want the value to change when a user types. Luckily, this can be accomplished by a circular approach to managing state. To control the state of an input, use an approach like this:

```js
const FormInput = () => {
  const [inputValue, setInputValue] = useState("")
  const updateValue = event => setInputValue(event.target.value)

  return (
    <fieldset className="FormInput">
      <label htmlFor="form-input">Username</label>
      <input id="form-input" type="text" value={inputValue} onChange={updateValue} />
    </fieldset>
  )
}
```

[Play with this code](https://codesandbox.io/s/shy-smoke-62fuh)

1. The `useState` hook sets a variable called `inputValue` to `""`, and gets a function called `setInputValue` that will update the value.
2. A function called `updateValue` is created that accepts an `event` as a parameter and calls `setInputValue` with `event.target.value`, which will be the whatever the current value of the input is.
3. A JSX element is returned that has its value set to `inputValue`, and whenever a user changes the value of the input, the `updateValue` function will be called.

Put differently, the value of the `<input />` is `inputValue`. When it changes `updateValue` is called, which changes the value of `inputValue`. This is the circular flow of controlled forms.

![Diagram of controlled input circular flow](assets/controlled-input.png)

This works for a single input, but most user input needs to be captured in the context of an entire form:

```js
const LoginForm = ({login}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const updateUsername = event => setUsername(event.target.value)
  const updatePassword = event => setPassword(event.target.value)
  const handleSubmit = event => {
    event.preventDefault()
    login(username, password)
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" required value={username} onChange={updateUsername} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" required value={password} onChange={updatePassword} />

      <input type="submit" value="Login" />
    </form>
  )
}
```

[Play with this code](https://github.com/sikaeducation/react-controlled-form)

This looks more complicated, but it functions similarly:

1. A function called `login` is passed as a prop that accepts a `username` and `password` as parameters. This will handle the actuall HTTP request once the form is filled out.
2. Stateful variables called `username` and `password` are initialized, as are functions to update them
3. Event handlers for updating both text inputs are defined
4. An event handler for the form submission is defined that calls the `login` function with the values of `username` and `password` at the time the event handler is called
5. The form calls `handleSubmit` when the form is submitted
6. The input change handlers are called whenenver a user types in the inputs

A stateful variable is bound the value of the input, the input's change event updates the stateful variable, the value of the input is updated.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React: Forms](https://reactwithhooks.netlify.app/docs/forms.html) | The official React guide to forms |
| [Video: Creating a Basic Form Using React Hooks](https://www.youtube.com/watch?v=8hU0I8rY4u4) | Chris Blakely's guide to hook-based forms |
React
One-Way Data Flow
Two-Way Data Flow
State
React: `useState`
JSX
DOM Event
React: Stateful Variable
React Prop
React Event Handler
Write 10 bullet points appropriate for a cover letter body that highlight different benefits you can bring to different situations.

---

Write 3 cover letters for jobs you would be interested in applying for. For each one, research the company, write the cover letter, and revise it.

---

Go through the research, resume update, cover letter writing, and revision process in under an hour for a job you'd like to apply for.
* Why should you focus on what you bring to the company instead of what you can get out of the company?
* Not everyone reads cover letters. Why are they still valuable?
* Recall 5 questions you should answer when researching a company.
# Applications: Cover Letters

If a resume is an advertisement, a cover letter is a sales pitch.

The most common mistake when writing a cover letter is focusing on what you will get out of the job. You may really want to work for the company, or you may really need the money, or you may really like their tech stack. However, none of those things benefit the company. Your pitch should be about the unique things you can offer them that make you a better candidate than everyone else they're talking to.

Truthfully, not everyone reads cover letters. You should still write them, because the people who do read them often value them highly. With some practice, they'll get easy enough to write that they won't feel like a chore.

## Research

Spend some time researching the company. Look through their website, especially any kind of "about the company" sections. Look for press releases, interviews, and blog posts. Additionally, look through reviews on company and salary review sites like [Glassdoor](https://www.glassdoor.com/member/home/index.htm) to see what employees have said about the company. Look at consumer sites for reviews on the company's customers. Try to answer the following questions:

* What is the company's mission? What are its values? How tightly aligned are their products and overall branding to these?
* How formal is the company?
* What kinds of words do they use when talking about themselves?
* Are there any new products or initiatives they're promoting?
* Have they come under scrutiny for anything recently?
* Is their compensation lower or higher than average?
* Are their customers happy? Why or why not?
* Are their employees happy? Why or why not?
* What does the company need and/or care about that you have?

Take notes on all of these things, and use what you learn to craft your cover letter.

## Cover Letter Sections

### Salutation

If you know who will be reading the cover letter, address them by name. Match the formality of the address with the formality of the company.

Formal:

>BestFirst Bank:

Informal:

>Hey FunStartup folks!

In between:

>MediumCo team,

Do not use "To whom it may concern" because it's dated and trite.

### Opening

The purpose of an opening is to introduce yourself and express why you're interested in the position. If you found out about the job through a presentation someone at the company gave or someone referred you, this is the place to mention that. Ultimately, you want to tie the mission and values of the company into something that personally drives you. For example:

>I'm a front-end engineer on a mission to solve the poverty crisis in America. That's why I was so excited to see that Banko, a leader in money solutions for the unbanked, is looking for new engineering talent. I'd like to offer my candidacy for your Assocation Engineer II position. Here's why I think I'd be a great fit:

>I'm a full-stack developer who cares a lot about helping people make better food. That's why I'm elated that my favorite receipe app is looking for new folks to join the mission! Here are a few reasons I think I'm who you're looking for:

>I'm a JavaScript programmer with a touch of design expertise, and there's nothing I care about more than helping people get organized. I went to Jeff Ridges' recent talk on API Quality and when he mentioned that Shelf.ly is looking for engineers I knew I had to get in touch with you. I know you're trying to grow the platform, and here's how I can help:

### Body

This is the actual pitch and much like resumes, these are scanned--not read. Your goal is 3-5 tightly worded bullet points that tie the company's needs to your skills and experience. When possible, use language that matches the job description, the company's mission and values, and their general branding. Here are some ideas:

>You're looking for developers with modern JavaScript experience. I recently wrote a blog post on upcoming features ESNext features, and gave a lightning talk based on it at the local JavaScript meetup.

>While I recently transitioned to software engineering, I have over 10 years of experience in project management that gives me a unique perspective on overcoming the challenges of building and delivering valuable products.

>My previous experience with paper product manufacturing gives me a unique insight into the scale and impact of this kind of work. The last product I worked on was shipped to over 1 billion customers in 150 different countries.

You want the person reading these to think "Oh, that's interesting!", and "That's a pretty good point." It's better to have fewer bullets if they deliver that reaction than lots of bullets that don't set you apart from the other applicants.

### Call to Action

A sales pitch needs to end with a call to action, and the specific action you're looking for is to get an interview. This may feel forward, but again, job applications aren't a time to be shy. Here are some examples:

>I'm interested in discussing my qualifications with you further. Please email me with the best times to talk.

>I'd love to learn more about your team and what I can offer you. Let me know when you're free to chat!

>I think we have a shared mission, and I'm interested in learning more about how we can work together. I look forward to hearing from you soon!

### Close

If you're writing with a formal tone, include a complimentary close. "Sincerely," is the most common, but "Warmly," "Best regards,", and "Yours" work too. Additionally, you should include a scan of your signature.

If you're writing with an informal tone, the close can simply be your first name or full name.

## Review

When you're done with your cover letter, go back to your research notes. Evaluate whether the cover letter you wrote is right for the company you researched. If you worked at the company and were reviewing this cover letter from an applicant, would you be interested in talking to them? Revise your cover letter as necessary.
Resume
Cover Letter
Cover Letter: Salutation
Cover Letter: Opening
Cover Letter: Body
Cover Letter: Call to Action
Cover Letter: Close
1. Build an app with Create React App.
2. Run the app and see its defaults render in the browser.
3. Download a picture of a dog and put it in the `public` folder
4. Replace the contents of `App.js` with the following:

```jsx
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <h1>React Rocks!</h1>
      <img src="name-of-dog-file-goes-here.jpg"
    </div>
  )
}

export default App
```

5. See the app update in the browser
* What is Create React App?
* What is the `public` directory in a CRA app for?
* What is the `src` directory in a CRA app for?
* How do you run a CRA app?
# Create React App

It's difficult to write and run React-based apps directly in the browser. Luckily, there are tools available that do lot of the heavy-lifting for you. One of the simplest of these is called Create React App, or CRA.

## Running CRA

To make a new CRA project, run `npx create-react-app project-name-goes-here`. This creates a new React project with all the necessary parts installed and wired together.

![Running npx create-react-app project-name-goes-here](assets/cra-1.png)

## Serving CRA Apps

To run a local server for an app built with CRA, run `npm start` anywhere in the project directory. By default, CRA will host the app at `http://localhost:3000` and will automatically update the browser every time you save changes to the project. To stop serving an app, press `ctrl` + C.

![Serving a CRA app](assets/cra-2.png)

## Folder Structure

There two folders in a fresh CRA project that you should be aware of.

![Structure of a fresh CRA app](assets/cra-3.png)

### `public`

The `public` directory contains static assets, such as images, fonts, and favicons. React doesn't do anything special with these and you can't import them into your projects, but they will be hosted on your server. For example, if you have a file in the `public` directory called `profile.jpg`, it will be available by default at `localhost:3000/profile.jpg`.

### `src`

All of your React components go in this directory. The `App.js` file is considered your top-level component and should be left there, but it can be modified. Everything else in the `src` folder is available for you to add to, delete, modify, or organize however you like.

## Watch Out!

* After creating an app with CRA, don't forget you still need to `cd` into the folder.
* If port 3000 is already being used on your computer (such as by another instance of CRA), you will be asked if you would like to serve the app on another port instead.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Create React App](https://create-react-app.dev/docs/getting-started) | Official guide to Create React App |

## Additional Resources

| Resource | Description |
| --- | --- |
| [React With Hooks](https://reactwithhooks.netlify.app/) | Comprehensive guide to React |
| [Thinking in React](https://reactwithhooks.netlify.app/docs/thinking-in-react.html) | Overview of React philosophy |
| [Video: Render Components](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=2217s) | React Hooks Crash Course: Traditional Rendering |
| [Video: Create React App](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=2417s) | React Hooks Crash Course: CRA |
* Create React App
* CRA
* npx
* React
* localhost
* Hosting
* URL
* Component
* Top-level Component
* Port
* What are the 4 elements of the box model?
* When an element has a background color, which parts of the box model will have the background color?
* What's the difference between padding and margin?
* When you want to separate two elements, which box model property should you use?
* When you want to make an element larger, which box model property should you use?
* Where is the border located in the box model?
* What's the difference between width/height and padding?
* How do you specific that margin should only apply to the left side of an element?
* What order are the individual directional properties of a compound property specified in?
* Which of these is more correct, and why? `padding: 0;` vs. `padding: 0px;`
# CSS: Box Model

The box model is another core idea in CSS, and is key to mastering layout. The box model is what keeps this background color from spilling out:

![Box model with scrolling](assets/box-model-3.png)

The box model also helps us space these out:

![Box model with scrolling](assets/box-model-2.png)

The box model lets us have an area scroll, even if we want lots of space around it:

![Box model with scrolling](assets/box-model-1.png)

[Play with this code](https://codesandbox.io/s/zealous-frost-9trju)

## What's Going On

![Official box model diagram](assets/box-model.png)

These are the box model properties:

* `width` / `height` - The size of the actual content area, such as the text or image.
* `padding` - The space between the content and the border. If the element has a background color, all of this will be filled in.
* `border` - An optional border separating the padding from the margin
* `margin` - The space between the border and other elements in the document. If the element has a background color, this will not be filled in.

Padding and margin are known as "composite properties" because they're actually 4 properties in one.

```css
/* This... */
padding: 10px;

/* ...Is the same as this */
padding-top: 10px;
padding-right: 10px;
padding-bottom: 10px;
padding-left: 10px;
```

You can also specify the top/bottom and right/left separately:

```css
/* This... */
padding: 10px 20px;

/* ...Is the same as this */
padding-top: 10px;
padding-right: 20px;
padding-bottom: 10px;
padding-left: 20px;
```

And lastly, you can set all 4 dimensions at the same time:

```css
/* This... */
padding: 10px 20px 30px 40px;

/* ...Is the same as this */
padding-top: 10px;
padding-right: 20px;
padding-bottom: 30px;
padding-left: 40px;
```

You can remember this by thinking of a clock- the first value is "top", and it moves clockwise to "right", "bottom", then "left." This is worth memorizing, because this same sequence is used throughout CSS.

## Watch Out!

* The box model is only applied to elements with a block display mode. Inline elements do not use the box model, so none of the box model properties have any effect. If you would like to give an inline element (like a link) box model properties like padding, you can use the display mode `inline-block`.
* Values for padding and margin can have 1 value (applies to all 4 dimensions), 2 values (first is top/bottom, second is left/right), or 4 values (top/right/bottom/left). They cannot have 3 values, and you can't only put 2 values for top and right.
* You can override part of a composite property by giving a more specific property a different value. For example, the rule `padding: 10px;` can be overriden on the right side only by adding a rule for `padding-right: 20px;` after the first rule.
* By default, the `width` and `height` of a block element are independent of any padding or border. This is almost never what you want. You can override this with `box-sizing: border-box;` to make `width` and `height` include the padding and border.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Introduction to the CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model) | MDN's overview of the box model |
| [MDN: The Box Model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model) | MDN's tutorial on the box model |
| [Video: Learn CSS Box Model in 8 Minutes](https://www.youtube.com/watch?v=rIO5326FgPE) | Web Dev Simplified's guide to the box model |
CSS: Box Model
CSS
CSS: Layout
CSS: Property
CSS: Value
CSS: Padding
CSS: Margin
CSS: Border
CSS: Box Model Content
HTML: Element
CSS: Display Mode
CSS: Composite Property
CSS: Block Element
CSS: `box-sizing`
Try to generate the following colors in HSL the fewest number of guesses:

![List of colors](assets/colors.jpg)

* Now convert each of them to RGB in the fewest number of guesses
* Now convert each of them to hex in the fewest number of guesses
* What is hue?
* What is saturation?
* What is lightness in the HSL color model?
* Describe this color: `hsl(240, 50%, 50%)`
* Describe this color: `hsl(120, 50%, 80%)`
* Describe this color: `hsl(0, 90%, 50%)`
* Describe this color: `hsl(60, 50%, 50%)`
* Describe this color: `hsl(300, 50%, 50%)`
* What color is this: `#ff0000`
* What color is this: `#00ff00`
* What color is this: `#0000ff`
* What color is this: `#f0f`
* Compare and contrast hex colors, RGB colors, and HSL colors
# CSS: Colors

There are a few different color formats, and you need to be conversant with all of them. You'll see them in tutorials, in design documents you're given by other developers, and in external tools you use. For example, all of these are the same color:

![3 boxes with different color models that are the same color](assets/same-color.png)

[Play with this code](https://codesandbox.io/s/ecstatic-sun-qdulk?file=/index.css)

There are a three common ways colors are represented in CSS: Hexadecimal, RGB, and HSL.

### Hexadecimal

Hexadecimal (also called hex) codes describe colors in terms of how much red, green, and blue is present in the color.

![A teal green hex color code](assets/colors-2.png)

This color has a small amount of red and moderate amounts of blue and green, creating a teal color.

A hex number ranges from 0 to 15, but it represents it as a single character by using the first 6 characters of the alphabet. That means counting in Hexadecimal would go 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f. After f, you start over again, so counting from "16" would go 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 1a, 1b, 1c, 1d, 1e, 1f. This means that the amount of each color ranges from 0 (00) to 255 (ff).

CSS hex colors start with a `#`, like this: `#ef02a0`. This is equal to:

* Amount of red: ef (same as 239 in decimal)
* Amount of green: 02 (same as 2 in decimal)
* Amount of blue: a0 (same as 160 in decimal)

The result will a red-heavy purple:

![A purple hex color code](assets/colors-3.png)

You can also use hex colors with 3 characters (with less precision): `#00f`. This will result in a pure blue:

![A blue hex color code](assets/colors-4.png)

This is commonly used with black (#000), white (#fff), and many pure grays (#333, #666, and so on).

## RGB

RBG colors work exactly the same as hex colors, except they use regular decimal numbers between 0 and 255:

```css
color: rgb(0, 0, 0); /* Black */
color: rgb(255, 255, 255); /* White */
color: rgb(0, 255, 0); /* Pure green */
color: rgb(239, 2, 160); /* Red-heavy puple */
```

The hex code for the red-heavy purple, `#ef02a0`, broke down as:

* Amount of red: ef (same as 239 in decimal)
* Amount of green: 02 (same as 2 in decimal)
* Amount of blue: a0 (same as 160 in decimal)

Writing it as `rgb(239, 2, 160)` results in the same color:

![A purple RGB color code](assets/colors-5.png)

There's no good reason to use hex codes for colors over RGB in most cases. That said, hex codes are commonly used throughout the web, so it's important to be able to read them.

## HSL

RBG is an improvement on Hex, but it's still very difficult to do "color math" in your head with, or to imagine what a color looks like just by looking at the numbers. HSL uses the "hue, saturation, and light" model.

* Hue: Degrees of a circle- 0 is red, as is 360. 120 is green, 240 is blue, they transition smoothly between.
* Saturation: 100% is fully saturated, 0% is grayscale.
* Lightness: 100% is white, 0% is black (regardless of the hue or saturation), 50% is moderate lightness.

```css
color: hsl(0, 100%, 50%); // Pure red
color: hsl(0, 0%, 100%); // White
color: hsl(100, 67%, 100%); // Aslo white
color: hsl(0, 0%, 0%); // Black
color: hsl(100, 67%, 0%); // Also black
color: hsl(350, 50%, 50%); // A red-heavy purple
```

HSL is great because when you need to tweak a color or build a pallette, it's much easier to work with. For that reason, HSL is a good default color model to use.

## Watch Out!

* The exact same color doesn't necessarily render identically in every browser
* Just because you have a color in one format doesn't mean you can't convert it to another format. All of the color formats support approximately all the same colors.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Color](https://developer.mozilla.org/en-US/docs/Web/CSS/color) | MDN's overview of colors |
| [MDN: Applying Color](https://developer.mozilla.org/en-US/docs/Web/HTML/Applying_color) | MDN's tutorial on the colors |
| [Video: Are You Making This Mistake With CSS Colors?](https://www.youtube.com/watch?v=EJtmfkKulNA) | Web Dev Simplified's guide to CSS colors |
CSS
CSS: Color Model
Hexadecimal
Hex
CSS: Hex Color Model
CSS: RGB Color Model
CSS: Color Hue
CSS: Color Saturation
CSS: Color Light
Color Pallette
* [FlexBox Froggy](https://flexboxfroggy.com/)

---

Vertically and horizontally center the inner element on the screen using Flexbox:

```html
<!doctype html>
<html>
  <head>
    <title>Vertical Centering Exercise</title>
    <meta charset="utf-8" />
  </head>
  <style>
    /* Solution goes here */
  </style>
  <body>
    <div class="outer">
      <div>Inner</div>
    </div>
  </body>
</html>
```

---

Vertically and horizontally center the navigation bar on the screen, then evenly distribute all of the navigation items:

```html
<!doctype html>
<html>
  <head>
    <title>Vertical Centering Exercise</title>
    <meta charset="utf-8" />
  </head>
  <style>
    /* Solution goes here */
  </style>
  <body>
    <nav>
      <ul>
        <li>
          <a href="#">A</a>
        </li>
        <li>
          <a href="#">B</a>
        </li>
        <li>
          <a href="#">C</a>
        </li>
      </ul>
    </nav>
  </body>
</html>
```
* Describe the relationship between flex containers and flex items
* Are flex containers inline or block?
* Name 3 properties of flex containers
* Name 2 properties of flex items
* What are 5 valid values for `justify-content`?
* What are 5 valid values for `align-items`?
* What is the difference between `justify-content` and `align-items`?
* What are the two axes in flexbox?
* What is the cross axis in flexbox?
* Can a flex container also be a flex item?
* Can a flex item also be a flex container?
* How do you make a flex container an inline element?
* Why isn't this element vertically centered on the screen?

```html
<!doctype html>
<html>
  <head>
    <title>Vertical Centering Exercise</title>
    <meta charset="utf-8" />
  </head>
  <style>
    .outer {
      dislay: flex;
      align-items: center;
    }
  </style>
  <body>
    <div class="outer">
      <div>Inner</div>
    </div>
  </body>
</html>
```
# CSS: Flexbox

There are some pretty big limits to only having `inline` and `block` display modes. How do you evenly space a group of elements out?

![Evenly-spaced boxes](assets/flex-1.png)

How do you center something vertically?

![Vertically-centered box](assets/flex-2.png)

You can use CSS Flexbox:

![Flex code to space and center](assets/flex-3.png)

[Play with this code](https://codesandbox.io/s/lucid-allen-gjsxb)

## Flex Containers and Flex Items

The most important concept in flexbox is the idea of containers and items. Flex containers control how their items are rendered. For example, if you have this HTML:

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

You can make the `<ul>` a Flex container, and all of the `<li>`s will become Flex items.

```css
ul {
  display: flex;
}
```

You can space out the Flex items evenly:

```css
ul {
  display: flex;
  justify-content: space-between;
}
```

You can right-align them all:

```css
ul {
  display: flex;
  justify-content: flex-end;
}
```

You can vertically and horizontally center them:

```css
ul {
  display: flex;
  height: 100vh; /* Make the container take up the whole screen */
  justify-content: center; /* Horizontal center */
  align-items: center; /* Vertical centering */
}
```

There are also some properties on the Flex Items that allow them to change the order they display in, how they grow or shrink relative to each other, and whether an element's alignment should be overridden. These are less commonly used.

```css
li {
  order: 3;
  flex: 1;
  align-self: flex-end;
}
```

## Primary and Cross Axes

Another critical idea in flexbox is primary and cross axes. By default, the horizontal axis of a flex container is the primary axis and the vertical axis is the cross axis.

![Flexing a row](assets/flex-4.png)

By changing the `flex-direction` from `row` to `column`, this is reversed:

![Flexing a column](assets/flex-5.png)

These are the differences:

* New flex items in a flex container are added along the primary axis
* `justify-content` aligns items on the primary axis
* `align-items` aligns items on the cross axis
* Only the cross axis of any one item can be individually aligned:

![Flex align-self on rows](assets/flex-7.png)
![Flex align-self on columns](assets/flex-6.png)

[Play with this code](https://codesandbox.io/s/reverent-hodgkin-b3ru6?file=/index.css)

## Watch Out!

* Flexbox is well-supported in [every browser except Internet Explorer](https://caniuse.com/flexbox), which was discontinued in 2016 and has an end-of-life of August, 2021
* A flex container is still flow content. If something isn't vertically centering, make sure that the container has enough height for vertical centering to be visible.
* A flex container only controls its immediate children. The same element can be a flex item for one container, and a flex container itself.
* A flex container is treated like a block element (the container tries to take up all the horizontal space it can). You can also flex an inline element by using `display: inline-flex;`.
* By default, flex items will wrap around the primary axis if they take up all the available space. You can override this behavior with `flex-wrap: nowrap`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Flex Reference](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) | CSS Tricks' flex reference is the definitive guide to using Flexbox. |
| [Video: Learn Flexbox in 15 Minutes](https://www.youtube.com/watch?v=fYq5PXgSsbE) | Web Dev Simplified's guide to flexbox |
CSS: Flexbox
CSS: Display Mode
CSS: Flex Container
CSS: Flex Item
CSS: Flex Primary Axis
CSS: Flex Cross Axis
CSS: `flex-direction`
CSS: `justify-content`
CSS: `flex-wrap`
CSS: `align-items`
CSS: Flow Content
CSS: Inline Display Mode
CSS: Block Display Mode
* Name 2 things that could cause a form input to be in an error state
* How do you style the error state of a form input?
* What does it mean for an input to have focus?
* How do you style a focused form input?
* How do keep a textarea from being resized?
* How do keep a textarea from being resized horizontally?
* How do keep a textarea from being resized vertically?
# CSS: Forms

There are a few styling concerns specific to forms.

## `<textarea>`

By default in most browsers, `<textarea>` elements are user-resizable and start with a modest height. You may wish to modify this behavior:

```css
textarea {
  padding: 1em;
  resize: none; /* can also be vertical or horizontal */
  width: 100%;
  height: 10em;
}
```

## Consistent Widths

Depending on the design of the form, it may be difficult to get elements in a form to align correctly. One way to fix this is to set an explicit size for the form itself, and then use relative sizing within the form.

```css
form {
  width: 400px;
}
input, label, select, textarea {
  width: 100%;
}
```

This approach is fairly intuitive and works for many kinds of forms. CSS Grid can also be used, and is well-suited for tasks like aligning radio buttons and checkboxes.

## Errors

You can control how form errors such as invalid inputs or missing `required` inputs are styled with the pseudoclass `:invalid`:

```css
input:invalid, textarea:invalid {
  border: 2px solid hsl(0, 50%, 50%);
}
```

## Focus

As a user moves through form inputs, each of them gets "focus" by the browser. You can indicate how an input with focus should be styled with the `:focus` pseudoclass:

```css
input:focus, textarea:focus {
  border-bottom: 4px solid hsl(240, 50%, 50%);
}
```

## Watch Out!

* Setting the width of an `<input />` doesn't take into account the padding of the element by default. The inputs must have `box-sizing: border-box;` set for them to work as expected.
* Red is commonly used to indicate that there was a problem with an input. The most common form of color-blindness makes the color red appear grey, so invalid input requires an additional indicator (usually a text message or `*`, sometimes provided by the browser itself).

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Styling web forms](https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms) | MDN's tutorial on styling web forms |
| [MDN: Advanced form styling](https://developer.mozilla.org/en-US/docs/Learn/Forms/Advanced_form_styling) | MDN's tutorial on advanced web form styling |
| [Video: Styling HTML Forms with CSS](https://www.youtube.com/watch?v=GcPi65geFlo) | CSS and UX tutorial on forms |
`<textarea>`
CSS: Grid
DOM: Focus
[Grid Garden](https://codepip.com/games/grid-garden/)
* Are CSS grid containers display or inline?
* What's the difference between `fr` and `auto`?
* How would declare the template for a grid with 1 row and 3 columns, where:
  * The first column's width should be determined by the content
  * The second column should take up all remaining space?
  * The last column should be exactly 300px
* How would you make a 1 row, 2 column grid where both columns are always the same size?
* How would you make a 2 row, 1 column grid where the second row is always twice as high as the first?
* How would you make a 1 row, 3 column grid where the first and last columns are determined by the content, and the middle column takes up the remaining space?
# CSS: Grid

You can do a lot with the display modes `inline`, `block`, and `flex`, but they have some limitations. What if you want to align elements to a consistent grid?

![Example of a grid](assets/grid-1.png)

[Play with this code](https://github.com/sikaeducation/css-grid-usage)

## Grid Containers and Grid Items

Just like Flexbox, CSS Grid use the concept of containers and items. If you declare an element as a grid container:

```html
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
  <li>D</li>
</ul>
```

```css
ul {
  display: grid;
}
```

All of its children become grid items.

## Defining Grids

Grids have vertical and horizontal gridlines, and the space between them is a grid area. When you make a grid, you indicate where those are with `grid-template-rows` and `grid-template-columns`:

```css
ul {
  display: grid;
  grid-template-rows: 20px 40px; /* Two rows, one 20px high and another 40px high */
  grid-template-columns: 30px 50px; /* Two columns, one 30px wide and another 50px wide */
}
```

It's also common to have a combination of absolute units and relative units:

```css
ul {
  display: grid;
  grid-template-rows: 20px 1fr; /* Two rows, one 20px high and another taking up whatever is left */
  grid-template-columns: 20px 1fr; /* Two columns, one 20px wide and another taking up whatever is left */
}
```

`fr` is a CSS unit that's used in grids indicates that something should take up the remaining space. It can also be used to make rows the same size, or multiples of the same size:

```css
ul {
  display: grid;
  grid-template-rows: 1fr 1fr; /* Two rows, both the same size, taking up half the width of the container */
  grid-template-columns: 1fr 3fr; /* Two columns, the second 3 times the size of the first */
}
```

## Using Grids

To place an item on a grid, declare either its starting and ending grid line or one of those and how many grid areas it should take up.

```css
li {
  grid-row: 1 / 2 /* The row this element should be on starts at the first row gridline and ends at the second row gridline
  grid-row: 1 / span 1 /* Same thing

  grid-column: 1 / span 2 /* Take up the entire column */
  grid-column: 1 / 3 /* Same */
}
```

## Watch Out!

* `row` and `column` are easy to mix up. Columns determine how wide something is, rows determine how tall something is.
* Don't be confused by gridline counts. A 2x2 grid will have 3 horizontal gridlines and 3 vertical gridlines. The first row gridline is the top of the container, the first column gridline is the left of the container
* Only a grid's direct children can be placed on the grid. You cannot place a grid item's children on the grid.
* Don't confuse `fr` with `auto`. `fr` actively takes up as much space as it can and sets up relative sizing. `auto` lets the size of the elements inside the grid areas determine the spacing.
* Grid items don't need to start and end in any particular place on the grid and grid areas can be empty
* The way you arrange grid items has no relationship with the order in which they were declared in HTML

## Additional Resources

| Resource | Description |
| --- | --- |
| [Grid Reference](https://css-tricks.com/snippets/css/complete-guide-grid/) | CSS Tricks' grid reference is the definitive guide to using CSS grid. |
| [Video: Learn CSS Grid in 20 Minutes](https://www.youtube.com/watch?v=9zBsdzdE4sM) | Web Dev Simplified's guide to CSS grid |
CSS: Grid
CSS: Flexbox
CSS: Flex Container
CSS: Flex Item
CSS: Grid Container
CSS: Grid Item
CSS: Absolute Unit
CSS: Relative Unit
CSS: `fr`
CSS: Grid Row
CSS: Grid Column
Draw how this will render:

```html
<!doctype html>
<html>
  <head>
    <title>Vertical Centering Exercise</title>
    <meta charset="utf-8" />
  </head>
  <style>
    span, div {
      text-align: center;
    }
  </style>
  <body>
    <div>
      <span>A</span>
      <span>B</span>
      <span>C</span>
      <div>D</div>
      <div>E</div>
      <span>F</span>
      <div>G</div>
    </div>
  </body>
</html>
```
* How do you make an element try to take up all the available horizontal space?
* How do you make an element try to take up all the available vertical space?
* What is the difference between block and inline elements?
# CSS: Layout

CSS is often misunderstood, even by otherwise expert developers. High-level layout in CSS is usually where the misunderstanding starts, and getting this part right is key to understanding CSS as a whole.

![CSS Layout](assets/css-layout.png)

Every element in HTML gets rendered as a rectangle. Sometimes the rectangle tries to take up all of the available space, sometimes it only takes up the space that it needs. These are mostly determined by the element's "display mode":

* **Block**: Elements try to take up all of the horizontal space of their parent element
* **Inline**: Elements only take up the space their needs, and allow other elements to sit on the same line if they fit

There are other display modes, but even those are largely variants on inline and block.

## Element Defaults

Some elements use the block display mode by default. These include:

* `<div>`
* All headings (such as `<h1>` and `<h2>`)
* All structural elements, such as `<header>`, `<footer>`, `<main>`, and `<aside>`
* `<p>`
* `<ul>`, `<ol>`, and `<li>`
* `<form>`

Some elements use the inline display mode by default. These include:

* `<span>`
* All semantic text elements, such as `<strong>` and `<em>`
* `<input />` and `<label>`
* `<img />`

Note that these are just defaults and can always be overidden with CSS.

## Watch Out!

* If the parent of an element is the entire document, it will take up the entire width of the screen
* If you set an element's height to 100%, it won't stretch its parent container out, which is counter-intuitive. To control the amount of vertical space an element takes up, the `height` of the element needs to be explicitly set.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: CSS Layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout) | MDN's tutorial on CSS layout |
| [Video: Learn CSS Display Property in 4 Minutes](https://www.youtube.com/watch?v=Qf-wVa9y9V4) | Web Dev Simplified's guide to CSS display modes |
CSS
CSS: Layout
CSS: Display Mode
CSS: Block Display Mode
CSS: Inline Display Mode
What's wrong with this code?

```css
p {
  color: red;
}
@media (max-width: 300px) {
  color: blue;
}
```

---

Given the following stylesheet:

```css
p {
  color: blue;
}
@media (max-width: 300px) {
  p {
    color: red;
  }
}
```

The screen is 450px wide. What color is the paragraph text?

---

Given the following stylesheet:

```css
@media (max-width: 300px) {
  p {
    color: red;
  }
}
p {
  color: blue;
}
```

The screen is 250px wide. What color is the paragraph text?

---

Given the following stylesheet:

```css
p {
  color: blue;
}
@media (max-width: 300px) {
  p {
    color: red;
  }
}
```

The screen is 300px wide. What color is the paragraph text?
* What's a breakpoint?
* What's the problem with using common device widths for breakpoints?
# CSS: Media Queries

Let's say you have a page that looks like this on a laptop:

![New York Times homepage - Laptop](assets/nyt-laptop.png)

But you want it to look like this on a phone:

![New York Times homepage - Phone](assets/nyt-phone.png)

How can you write CSS to accomodate this difference?

## Media Queries

Media queries allow you to write styles that only apply in certain situations. For example:

```css
@media (max-width: 300px) {
  p {
    color: red;
  }
}
```

This will make the text of all paragraphs red, but only if the screen is less than 300px wide. Media queries are commonly used to override a default style:

```css
p {
  color: blue;
}
@media (max-width: 300px) {
  p {
    color: red;
  }
}
```

This will make all paragraphs blue, unless the screen is less than `300px` wide, in which case they will be red.

`max-width` and `min-width` are the most common things to query, but there are others:

* **`screen`, `print`, and `speech`**: Target specifically those three classes of device, which is useful for hiding things from screen readers or removing elements for print
* **`orientation`**: Whether the width is greater than the height or the other way around
* **`resolution`**: The pixel density of the device

You can also combine multiple media queries with `and` and `not`:

```css
@media (min-width: 300px) and (max-width: 600px) {
}
@media (min-width: 300px) and not (print) {
}
```

## Responsive Design

Media queries are a powerful way to override specific styles for mobile. For example, we might want to constrain the width of something on a large screen, while overriding it to use the entire space on a small screen:

```css
p {
  width: 200px;
}

@media (max-width: 350px){
  p {
    width: 100%;
  }
}
```

A common strategy is to make your default style mobile and then add media queries for each breakpoint larger than that. Alternatively, you can make the default match the largest design and then add media queries for each breakpoint smaller than that. Start with the mobile-first strategy and experiment with both.

## Testing Responsive Designs

Browser dev tools have responsive design emulators that allow you to see the viewport size for screens:

![Browser dev tools responsive design mode toggle](assets/responsive-design-emulator.png)

When this tool is enabled, it gives you options to setting the dimensions and orientation of a target device:

![Browser dev tools responsive design mode options](assets/responsive-design-tools-2.png)

## Watch Out!

* It's tempting to try to make breakpoints based on common device sizes. Instead, make your breakpoints independent of any particular device and make them based on when the design needs it.
* Each individual query needs to wrapped in `()`
* Media queries look like CSS rules because they are wrapped in `{}`- don't forget that you still need to use CSS selectors inside of them

Styles are still applied first-to-last. So this works as expected:

```css
p {
  width: 200px;
}

@media (max-width: 350px){
  p {
    width: 200px;
  }
}
```

But this will always be 200px, because the second rule overrides the first:


```css
@media (max-width: 350px){
  p {
    width: 200px;
  }
}

p {
  width: 200px;
}
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [CSS Tricks: Media query guide](https://css-tricks.com/a-complete-guide-to-css-media-queries/) | CSS Tricks' media query guide is an excellent resource for the different uses of media queries. |
| [MDN: Media query reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) | MDN's official media query reference |
| [MDN: Media query tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries) | MDN's official media query tutorial |
| [Video: Learn CSS Media Query in 7 Minutes](https://www.youtube.com/watch?v=yU7jJ3NbPdA) | Web Dev Simplified's guide to media queries |
CSS: Media Query
CSS: Media Query `max-width`
CSS: Media Query `min-width`
CSS: Media Query Device Class
CSS: Media Query `and`
CSS: Media Query `or`
Responsive Design
Design Breakpoint
Viewport
Device Orientation
Make these two squares overlap so that they create a purple square in the middle:

```html
<!doctype html>
<html>
  <head>
    <title>Overlapping Squares</title>
    <meta charset="utf-8" />
  </head>
  <style>
    .blue, .red {
      width: 100px;
      height: 100px;
    }
    .blue {
      background-color: hsla(240, 50%, 50%, 0.5);
    }
    .red {
      background-color: hsla(0, 50%, 50%, 0.5);
    }
  </style>
  <body>
    <div class="blue">&nbsp;</div>
    <div class="red">&nbsp;</div>
  </body>
</html>
```

---

Put the `×` in the upper-right corner of the `.notification` element:

```html
<!doctype html>
<html>
  <head>
    <title>Upper-Right Corner</title>
    <meta charset="utf-8" />
  </head>
  <style>
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .notification {
      padding: 32px;
    }
  </style>
  <body>
    <div class="notification">
      <i>×</i>
      <p>I'm sorry Dave, I can't do that.</p>
    </div>
  </body>
</html>
```

---

Draw how this will render:

```html
<!doctype html>
<html>
  <head>
    <title>Upper-Right Corner</title>
    <meta charset="utf-8" />
  </head>
  <style>
    .box {
      width: 100px;
      height: 100px;
      border: 1px solid black;
    }
    .middle {
      position: relative;
    }
    .letter {
      position: absolute;
      width: 25px;
      height: 25px;
      bottom: 25px;
      right: 25px;
    }
  </style>
  <body>
    <div class="box">&nbsp;</div>
    <div class="box middle">
      <div class="letter">A</div>
    </div>
    <div class="box">&nbsp;</div>
  </body>
</html>
```
* What does `position: relative;` do?
* What does it mean for absolute positioning to "break document flow"?
* You give an element `right: 0;` and it doesn't move. What is the element likely missing?
* What is an absolutely position element positioned relative to?
* What is static positioning?
* What's the difference between a display mode and positioning?
* You have two overlapping elements, but they're overlapping in the wrong order. How do you fix it?
* Name 3 things that create positioning contexts.
# CSS: Positioning

The `display` property has limits- you can only say that something should be inline or block. What if you want to tuck an element into a corner, or make it slightly off-center, or make elements overlap?

![CSS positioning example](assets/css-positioning-1.png)
![CSS positioning example](assets/css-positioning-2.png)
![CSS positioning example](assets/css-positioning-3.png)

You can use CSS positioning:

```css
.container {
  position: relative;
}

.item {
  position: absolute;
  right: 0;
  top: 0;
}
```

[Play with this code](https://codesandbox.io/s/wonderful-moon-jzcd2?file=/index.css)

## Positioning

Positioning is another intimidating part of CSS, but it follows a small number of rules:

1. Every element starts as being statically positioned, which means it follows its normal inline or block placement.
2. You can make an element absolutely positioned, which means that you are overriding its normal placement and choosing to manually control exactly where it goes
3. When you absolutely position an element, it's rendered relative to either:
  a. Its nearest ancestor that has a `position` of something other than `static`
  b. The entire document

If you want to put something in the bottom-right corner of a the entire page, you can apply this style rule:

```css
.badge {
  position: absolute;
  bottom: 0;
  right: 0;
}
```

If you want to put something in the upper right corner of a containing element, you can apply this style rule:

```css
.card {
  position: relative;
}
.close {
  position: absolute;
  top: 6px;
  right: 6px;
}
```

Values given to `top`/`right`/`bottom`/`left` indicate how much space should be between the element you're positioning and its positioning context. It may be helpful to think of it as "pushing". An absolutely positioned element with a `left` value of `5%` would push the element 5% of the size of the positioning context from the left side.

## Watch Out!

* The `top`, `right`, `bottom`, and `left` CSS properties only work on absolutely positioned elements. They have no effect on elements with other positioning modes.
* Absolutely positioning an element makes that element a new relative context for any of its children.
* Absolutely positioned elements no longer take up any space in the document flow, meaning they can't push things out of the way. Elements will over- and underlap absolutely positioned elements. To control which order elements stack in, you can use the `z-index` property. Higher numbers go on top, lower numbers go on bottom.

## Additional Resources

| Resource | Description |
| --- | --- |
| [CSS Tricks: Positioning guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) | CSS Tricks' positioning guide is an excellent resource for the different positioning modes. |
| [MDN: Positioning Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/position) | MDN's official reference for CSS positioning |
| [MDN: Positioning Tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning) | MDN's official tutorial for CSS positioning |
| [Video: Learn CSS Position in 9 Minutes](https://www.youtube.com/watch?v=jx5jmI0UlXU) | Web Dev Simplified's guide to CSS positioning |
CSS: Display Mode
CSS: Inline Display Mode
CSS: Block Display Mode
CSS: Positioning
CSS: Property
CSS: Value
CSS: Absolute Positioning
CSS: Relative Context
CSS: Document Flow
CSS: `z-index`
[CSS Diner](https://flukeout.github.io/)
* What is a selector?
* Recall 3 kinds of selector
* Describe what these selectors do in natural language:
  * `#user`
  * `.user`
  * `div`
  * `.featured`
  * `main`
  * `.active`
* Recall 2 ways a selector can be overridden
* What does it mean to "overspecify" a selector?
# CSS Selectors: Tag, Class & ID

There are a lot of different ways to select elements to style in CSS, and the most fundamental are tag, ID, and class selectors.

## Tag Selectors

To select elements by tag, use the name of the tag:

```css
li {
  /* Apply styles to every <li> element */
}
```

If you want to target multiple tags, comma-separate them:

```css
input, label {
  /* Apply the same styles to every <input> and <label> element */
}
```

## Class Selectors

To select elements by class, prefix the class name with `.`:

```html
<div class="user"></div>
```

```css
.user {
  /* Apply styles to every element with the "user" class */
}
```

Note that many elements can share the same class.

## ID Selectors

To select elements by ID, prefix the ID with `#`:

```html
<button id="logout"></button>
```

```css
#logout {
  /* Apply styles to the element with the "logout" ID */
}
```

IDs are supposed to be unique within a single page, so this should always target one element.

## Choosing Between Tag, Class, and ID Selectors

In general, you should choose the most specific selector you can. If you can select something by ID, the browser will apply the style faster than selecting the same element by tag. Beyond that, here are some guidelines:

* The tag selector is useful for overriding default browser styles and making the base styles for pages
* Classes are a good default because they're faster and more descriptive than tags, but easier to override than IDs
* Classes and IDs should describe what an element is (such as `.profile` or `#recently-viewed`), not what it looks like (such as `.blue` or `.centered`).

## Watch Out!

* It's easy to forget the `.` and `#` symbols when selecting classes or IDs.
* Multiple selectors are separated by commas; Separating them with only spaces is a different kind of selector.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Type, Class, and ID Selector Tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors) | MDN official tutorial for tag, class, and ID selectors |
| [MDN: Type Selector Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors) | MDN official reference for tag selectors |
| [MDN: Class Selector Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors) | MDN official reference for class selectors |
| [MDN: ID Selector Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors) | MDN official reference for ID selectors |
| [Video: Learn Every CSS Selector in 20 Minutes](https://www.youtube.com/watch?v=l1mER1bV0N0) | Web Dev Simplified's guide to CSS selectors |
CSS: Selector
CSS: Tag Selector
CSS: Class Selector
CSS: ID Selector
Comma-Separated
* What is a descendant selector?
* What is a sibling selector?
* What is an attribute selector?
* Define each of these CSS combinators:
  * `+`
  * `>`
  * `~`
  * `[]`
  * `,`
  * ` `
* Given this HTML:

```html
<ul id="number-list">
  <li class="number">1</li>
  <li class="number">2</li>
  <li>
    <ul>
      <li class="letter">A</li>
      <li class="letter">B</li>
      <li class="letter">C</li>
    </ul>
  </li>
  <li class="number">3</li>
</ul>
```

How many elements do these selectors target:

* `li`
* `#number-list`
* `li + li`
* `li ~ .number`
* `.number`
* `#number-list > li`
* `li li`
* `li > li`
# CSS: Selectors: Descendant, Sibling, and Attribute

You can select elements by tag name, class, or ID, and those are sufficient a lot of the time. How would you select an element based on what its parents or siblings are, or by some attribute that it has?

## Descendant Selectors

Descendant selectors target the children of an element. The most basic descendant selector just uses a space:

```css
nav a {
}
```

This selects all `<a>` tags that are children of `<nav>` tags. This means that in this example:

```html
<h1><a href="#">1</a></h1>
<nav>
  <li><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
</nav>
```

`1` will not be selected, while `2`, `3`, and `4` are.

If you want to narrow the selection to elements that are direct descendants, you can use `>`:

```css
nav > a {
}
```

In the above example, none of the links would be selected. While they're all descendants of `<nav>`, the `<a>` elements are all direct descendants of `<li>`. If we changed the selector to:

```css
li > a {
}
```

`1` will not be selected, while `2`, `3`, and `4` are.

## Sibling Selectors

Sibling selectors select an element that is at the same level as another element:

```css
.user ~ a {
}
```

In this example:

```html
<div class="user">
  <p>1</p>
</div>
<p>2</p>
<p>3</p>
<p>4</p>
```

`1` will not be selected, while `2`, `3`, and `4` are.

A related selector is the adjacent sibling selector:

```css
li + li {
}
```

This would select every `<li>` that immediately follows another `<li>`. If you had a list like this:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

`1` will not be selected, while `2`, `3`, and `4` are.

This is commonly used to style the first item in a group differently from the subsequent items.

## Attribute Selectors

The class selector will match any element that has that class. You can also select elements based on any attribute:

```html
<img src="great-picture.jpg" alt="close-up of a puppy" />
```

```css
[src="great-picture.jpg"] {
  width: 100%;
}
```

This is especially useful for targeting data attributes:

```html
<div data-test>Some content</div>
```

```css
[data-test] {
  border: 1px solid red;
}
```

## Watch Out!

* Don't confuse descendant selectors with including multiple rules. `ul li` selects all `<li>`s that are children of `<ul>`s, `ul, li` selects all `<ul>` as well as all `<li>`s.
* There's no way to select an element based on which children it has or by which elements come after it.
* Descendant and sibling selectors target the last element in the expression. That means `ul li` and `ul > li` will only target the `<li>`, and `p + a` will only target the `<a>`

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN descendant combinator reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator) | MDN official reference for descendant selectors |
| [MDN child combinator reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator) | MDN official reference for direct descendants |
| [MDN general sibling reference](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator) | MDN official reference for sibling selectors |
| [MDN adjacent sibling reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator) | MDN official reference for adjacent sibling selectors |
| [MDN attribute selector reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors) | MDN official reference for selectors |
| [MDN combinators tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators) | MDN official tutorial for descendant and sibling selectors |
| [MDN attribute selector tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Attribute_selectors) | MDN official tutorial for attribute selectors |
| [Video: Learn Every CSS Selector in 20 Minutes](https://www.youtube.com/watch?v=l1mER1bV0N0) | Web Dev Simplified's guide to CSS selectors |
CSS: Selector
CSS: Class Selector
CSS: ID Selector
CSS: Tag Selector
CSS: Combinator
HTML: Parent Element
HTML: Child Element
HTML: Sibling Element
HTML: Attribute
CSS: Descendant Selector
CSS: Direct Descendant Selector
CSS: Sibling Selector
CSS: Adjacent Sibling Selector
HTML: Data Attribute
CSS: Rule
```html
<a href="#">About Us</a>
```

Style this link so that:

* It has no underline
* Visited links are `hsl(330, 50%, 50%);`
* Active links are `hsl(30, 50%, 50%);`
* Unvisited links are `hsl(240, 50%, 50%);`

---

```html
<nav>
  <ul>
    <li>
      <a href="#">Products</a>
    </li>
    <li>
      <a href="#">Services</a>
    </li>
    <li>
      <a href="#">About Us</a>
    </li>
  </ul>
</nav>
```

Style this list so that:

* The second and third links have a left margin of 32px
* What is a pseudo-class?
* Name 3 pseudo-classes
* What is a pseudo-element?
* Name 3 pseudo-elements
* How do you target only even elements in a list?
* How do you target only odd elements in a list?
* How do you target the first element in a list?
* How do you target the last element in a list?
* How do you target the 4th item in a list?
* What's the difference between `nth-child` and `nth-of-type`?
* Describe what the following selectors target:
  * `ul:nth-child(3)`
  * `ul:nth-of-type(3)`
  * `li:nth-child(even)`
  * `p::first-letter
  * `p::first-line
  * `textarea::selection`
# CSS: Selectors: Pseudo-Classes & Pseudo-Elements

You can select elements by tag name, class, and ID. You can select elements based on what parents they have, what siblings they have, and what attributes they have. There are a lot of ways to target elements, but how do you:

* Select the 4th occurrence of an element
* Add bullets, hyphens, and other decorations to elements
* Style links differently if they've been visited

To do those things, you need pseudo-classes and pseudo-elements.

## Pseudo-Classes

Pseudo-classes select elements that are in particular states:

```css
a:visited {
}
```

This selector targets any link that's already been visited by a user. Traditionally, an unvisited link is blue and a visited link is purple. This selector lets you customize those colors, as well as add any additional styles for those states. Links in particular have 3 pseudo-classes:

* **`:link`**: An unvisited link
* **`:visited`**: A visited link
* **`:active`**: A link that is currently being clicked

Another pseudo-class that will work on links or any other element is `:hover`, which is applied any time a cursor is hovering over an element. Note that this only works on devices like laptops that have mouses or trackpads.

Another type of pseudo-classes targets specific occurrences of an element. For example:

```css
.user:first-child {
}
```

This targets an element with a class of `user` that is the first child of its parent. For example:

```html
<ul>
  <li class="user">1</li>
  <li class="user">2</li>
  <li class="user">3</li>
</ul>
```

In this example, `.user:first-child` would target `1`, but not `2` or `3`. You can also target `2` with `.user:nth-child(2)`, or `3` with `.user:nth-child(3)`.

Other common pseudo-classes:

* `:last-child` - Targets an element that is the last child of its parent
* `:not(another-selector)` - Targets elements that doesn't also match another selector
* `:even` / `:odd` - Targets elements that are even or odd children of their parents. This is useful for striping a list or table.

```css
li:odd {
  background-color: hsl(240, 20%, 90%);
}
```

## Pseudo-Elements

Pseudo-elements target parts of elements that are not technically separate elements. For example:

```css
li + li::before {
}
```

This targets any `<li>` that immediate follows another `<li>`, and lets you apply styles to the space immediately before them. This is especially useful when combined with the `content` property:

```css
span + span::before {
  content: " - ";
}
```

This is used to add decorative content to elements. If you have a set of elements that like this:

```html
<div>
  <span>1</span>
  <span>2</span>
  <span>3</span>
</div>
```

These elements would ordinarily render as `123`. With the pseudo-elements, they instead render it as `1 - 2 - 3`. This strategy is preferrable for any kind of decoration that is purely visual and not semantic.

Other CSS pseudo-elements:

* **`::after`**: Targets the area after an element
* **`::first-letter`**: Targets the first letter of something, usually used to make a drop cap
* **`::first-line`**: Targets the first line of something, usually used in conjunction with small caps
* **`::selection`**: Targets content a user has highlighted

## Watch Out

An `a:hover` selector must come after `a:link` and `a:visited`, and `a:active` must come after `a:hover` in the CSS file in order to be work correctly.

---

When using the `:first-child`, `:last-child`, and `:nth-child` selectors, note that other elements that don't match the selector still count as children. So if the HTML is:

```html
<div>
  <p>1</p>
  <span>1</span>
  <section>1</section>

  <p>1</p>
  <span>1</span>
  <section>1</section>
</div>
```

`section:nth-child(2)` would return nothing, since the only `<section>` element is the 3rd child of its parent `<div>`. You can use `nth-of-type` to only count matches for the type you specify. `section:nth-of-type(2)` would return the second `<section>`
* When using `child` or `type` selectors, note that your selector is for the element you want, not the type of the parent

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN Pseudo-class reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) | MDN official reference for pseudo-classes |
| [MDN Pseudo-element reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) | MDN official reference for pseudo-elements |
| [MDN Pseudo-class and pseudo-element tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements) | MDN official tutorial for pseudo-classes and pseudo-elements |
| [Video: Learn Every CSS Selector in 20 Minutes](https://www.youtube.com/watch?v=l1mER1bV0N0) | Web Dev Simplified's guide to CSS selectors |
CSS: Selector
CSS: Pseudo-class
CSS: Pseudo-element
CSS: Class Selector
CSS: ID Selector
CSS: Tag Selector
CSS: Attribute Selector
CSS: Sibling Combinator
CSS: Descendant Combinator
State
Render
# CSS: Syntax

Unstyled pages look like undifferentiated research white papers. It's difficult to find what you're looking for, and it's difficult to tell one site from another.

![Unstyled homedepot.com home page](assets/home-depot.png)

If you use them correctly, stylesheets help people read and understand your content, navigate and use your apps, and relate them to the company's brand and experience.

![Styled homedepot.com home page](assets/home-depot-2.png)

## Adding CSS to HTML

There are 3 ways to apply CSS to a page:

### Linked

Linked stylesheets are references to CSS files that go in the `<head>` of documents.

```html
<html lang="en">
  <head>
    <title>Web Page</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
    <div></div>
  </body>
</html>
```

The `href` attribute accepts any valid file path. Note that absolute paths that start with `/` will go to folder the site was served from, not the root of the computer.

### Inline

Inline styles are applied directly to an element:

```html
<div style="display: flex; justify-content: center;"></div>
```

These styles can't be overriden by custom style sheets and should be avoided.

### Embedded

An embedded stylesheet is added to the `<head>` of an HTML file directly:

```html
<html lang="en">
  <head>
    <title>Web Page</title>
    <meta charset="utf-8">
    <style>
      div {
        display: flex;
      }
    </style>
  </head>
  <body>
    <div></div>
  </body>
</html>
```

These styles clutter up HTML documents and should be avoided as well.

## CSS Syntax

CSS is made up of selectors, which target elements to apply styles, and rules, which are styles to apply to those elements. There are many kinds of selectors:

```css
form {
}
.profile > h2 {
}
#logo img::before {
}
```

Each one targets one or more elements, and then opens up a block to declare the style rules that should be applied. Within that block:

```css
form {
  display: flex;
  flex-flow: column nowrap;
  padding: 24px;
}
```

Style declarations can be added. Each one has property and a value, separated by `:` and ending with `;`. Not all declarations apply to all elements.

## Watch Out!

* Browsers apply something called a user-agent stylesheet to every web page, which is why headings are large and bold and links are blue and underlined even if you don't add your own stylesheet. Any styles you write will override these browser defaults.
* Semicolons are required at the end of style declarations in CSS.
* CSS rules are applied top to bottom. If two styles conflict, the style that happens later in the stylesheet will generally be applied. The exception to this is called specificity. In short, IDs always override classes, classes always override tags, and styles with more classes and tags in their selector will override styles with fewer classes and tags in their selector.
* Don't forget to add `rel="stylesheet"` to `<link>` tags.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN CSS Syntax reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax) | MDN official reference for CSS syntax |
| [Video: Anatomy of CSS Syntax](https://www.youtube.com/watch?v=XHkIU8Wom2Q) | London App Brewery's guide to CSS syntax |
| [Video: Learn CSS in 20 Minutes](https://www.youtube.com/watch?v=1PnVor36_40) | Web Dev Simplified's guide to CSS |
| [CSS Tricks: Almanac](https://css-tricks.com/almanac/) | Comprehensive guide to CSS vocabulary |
Syntax
Stylesheet
CSS: Linked Stylesheet
CSS: Inline Stylesheet
CSS: Embedded Stylesheet
CSS: Rule
Block
CSS: Declaration
CSS: Property
CSS: Value
Browser
User-Agent Stylesheet
CSS: Cascade
# CSS: Units

Some CSS properties take options from a fixed list, like `display`. Most of them take some kind of length unit and these are core to doing anything with CSS. If something takes a length as an argument, any valid length unit will do. That said, different units do different things:

```css
width: 100%;  /* Width is the same as the parent, regardless of its size        */
width: 300px; /* Width is 300 pixels wide regardless of the size of the parent  */
width: 10em;  /* Width is 10 times the font size of this element                */
width: 10rem; /* Width is 10 times the font size of this document               */
width: 100vw; /* Width is the entire screen                                     */
```

Any of these can be the right choice for a particular goal.

## Absolute Units

Use these to set the size of something, regardless of its parent or any other context. The most common absolute length unit is the pixel, which you indicate with `px`.

```css
font-size: 16px;
```

## Relative Units

Most other CSS units are relative to something else:

| Unit | Relative To |
| --- | --- |
| `%` | Size of parent container |
| `em` | Size of the font for this element
| `rem` | Size of the base font for this document
| `vh`, `vw` | Size of the screen height/width |

For example:

```css
line-height: 2em;
width: 100%;
height: 100vh;
```

## Watch Out!

Sizing elements with pixels is intuitive, but it can also hurt responsiveness. If you specify an element to be `600px` wide, it will still be that size even if the screen width is less than that. This will cause a horizontal scrollbar and a poor user experience on mobile. There are many good reasons to use pixels (especially when combined with media queries), but first consider if a relative unit is more appropriate.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Length units reference](https://developer.mozilla.org/en-US/docs/Web/CSS/length) | MDN's official reference for CSS length units |
| [MDN: Units tutorial](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units) | MDN's official tutorial for CSS units |
| [Video: Learn CSS Units in 8 Minutes](https://www.youtube.com/watch?v=-GR52czEd-0) | Web Dev Simplified's guide to CSS units |
CSS: Unit
CSS: Absolute Unit
CSS: Relative Unit
Pixel
Responsive Design
* What is the purpose of a database?
* How does an API communicate with a database?
* How is data storage in a database structured differently from most data applications?
* What is a relation?
* What is a row?
* What is a record?
* What is a column?
# Intro to Databases

Most applications have some state in the form of variables, but this kind of state is temporary. When a client-side application like a React app is run by the browser, it starts with whatever initial state is in the code. Likewise, the state in APIs is reset whenever the server is restarted. Where can you store data that needs to persist between restarts?

Persistent data is stored in databases, which are conceptually similar to spreadsheets. Both have rows and columns, and database tables are similar to sheets. However, databases are far more robust. They can enforce the shape and types of data that are stored, prevent data corruption, and offer powerful tools for quickly searching and manipulating stored data.

## Interacting With Databases From APIs

Databases typically run on their own servers, separate from file servers or API servers. API servers communicate with database servers using special software called database drivers. Databases are language-agnostic, meaning the same database can be used with Node.js, C#, Java, Python, or any other language that has a database driver compatibile with the database server.

![Diagram of a Node and Java server talking to a PostgreSQL driver with drivers](assets/database-drivers.png)

API servers use these drivers to integrate databases into their code.

```js
const client = new Client({
  user: "database_user",
  host: "database.database-server.com",
  database: "database_name",
  password: "database_password",
  port: 5432,
})
client.query("SELECT * FROM dog")
  .then(result => console.log(result))
```

## Relations

The way data is stored in databases is different than how its stored in code. In most programming languages, data is represented as a series of nested structures:

```js
{
  name: "Cannonball Adderly",
  instrument: {
    type: "Alto Saxophone",
    manufacturer: "Selmer",
  },
  albums: [{
    name: "Something Else",
  },{
    name: "Mercy, Mercy",
  },{
    name: "Autumn Leaves",
  }]
}
```

This is similar to how most people think of data and works well in real-world problems. When that same data is represented flat in a database, problems start to emerge:

**musician**

| name |
| --- |
| Cannonball Adderly |

**instrument**

| type | manufacturer |
| --- | --- |
| alto saxophone | Selmer |

**album**

| name |
| --- |
| Something Else |
| Mercy, Mercy |
| Autumn Leaves |

This data is simple to store, but how do you store the relationships between them? How would you indicate that "Something Else" was played by Cannonball Adderly, or that Cannonball Adderly played a Selmer alto saxophone?

### Combined Columns

You could keep all of Cannonball Adderly's albums and instruments in the `musician` table as well:

**musician**

| name | albums | instrument_type | instrument_manufacturer |
| --- | --- | --- | --- |
| Cannonball Adderly | Something Else, Mercy\, Mercy, Autumn Leaves | alto saxophone | Selmer |

**instrument**

| type | manufacturer |
| --- | --- |
| alto saxophone | Selmer |

**album**

| name |
| --- |
| Something Else |
| Mercy, Mercy |
| Autumn Leaves |

The problem with this is that the data is now repeated in both places. It's possible for the data to get corrupted if data is removed, added, or changed from one source but not the other. Additionally, it's slower and more difficult to search for or perform operations on part of the data since multiple pieces of data are stored in one column.

### Repeating Rows

You could also reverse this and attach Cannonball Adderly's information to each record associated with him:

**musician**

| name |
| --- |
| Cannonball Adderly |

**instrument**

| type | manufacturer | musician |
| --- | --- | --- |
| alto saxophone | Selmer | Cannonball Adderly |

**album**

| name | musician |
| --- | --- |
| Something Else | Cannonball Adderly |
| Mercy, Mercy | Cannonball Adderly |
| Autumn Leaves | Cannonball Adderly |

Since the data isn't combined in any column, it's much easier to work with individual pieces of data. There's still a problem with repeating the data, however. If an album's musician changes to "Julian 'Cannonball' Adderly", there will be no way to determine that it's still referencing the same musician as the other albums.

### Relational Data

The solution is to represent each record with an ID and use those IDs as references throughout the database:

**musician**

| id | name |
| --- | -- |
| 1 | Cannonball Adderly |

**instrument**

| id | type | manufacturer | musician_id |
| --- | --- | --- | --- |
| 1 | alto saxophone | Selmer | 1 |

**album**

| id | name | musician_id |
| --- | --- | --- |
| 1 | Something Else | 1 |
| 2 | Mercy, Mercy | 1 |
| 3 | Autumn Leaves | 1 |

This way, the meaningful parts of each piece of data aren't repeated and only exist in one place, but can still be referenced by other tables. The unique IDs that identify each record within a table are called primary keys, and the references to those in other tables are called foreign keys. Relational databases enforce that each foreign key in a table has a matching primary key in the related table, which provides a layer of integrity to the data.

## DBMS Software

These are some popular tools used to manage databases:

| DBMS | Description |
| --- | --- |
| [PostgreSQL](https://www.postgresql.org/) | A full-featured open source database management system. |
| [SQLite](https://www.sqlite.org/index.html) | An extremely lightweight database system popular for local development and embedded systems. Stores the entire database in a single file. |
| [SQL Server](https://www.microsoft.com/en-us/sql-server) | A database management system owned by Microsoft |
| [Oracle](https://www.oracle.com/database/technologies/) | An enterpise database management system for building large distributed databases |
| [MySQL](https://www.mysql.com/) | A free database management system owned by Oracle that's popular in the PHP community |
| [MariaDB](https://mariadb.org/) | An open source version of MySQL |

Each of these tools has different tradeoffs, but all of them store relational data in similar ways and accept some variant of the SQL language.

## Watch Out!

The terms "table", "row", and "column are commonly used when talking about databases, but the academic terms are:

* **Relation**: Table
* **Tuple**: Row or record
* **Attribute**: Column

Each term and its synonyms can be used interchangeably.

Additionally, the term database technically refers to the actual files storing the data. The tools used to interact with databases, such as PostgreSQL or Oracle, are called database management systems or DBMSes. Tools that manage relational data are called relational database management systems, or RDBMSes. These contrast with database tools that manage non-relational data, such as MongoDB and Redis.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: Database](https://en.wikipedia.org/wiki/Database) | Wikipedia's article on databases |
| [Wikipedia: Relational Database](https://en.wikipedia.org/wiki/Relational_database) | Wikipedia's article on relational databases |
| [IBM: Relational Databases Explained](https://www.ibm.com/cloud/learn/relational-databases) | IBM's article on relational databases |
Database
State
API
Database Row
Database Column
Database Table
Database Server
API Server
Database Driver
Database Relation
Primary Key
PK
Foreign Key
FK
SQL
PostgreSQL
Database Tuple
Databse Attribute
RDBMS
[Students ERD](https://github.com/sikaeducation/erd-students-one-to-many)
* What is a one-to-many relationship?
* List 5 different examples of one-to-many relationships.
* How are one-to-many relationships represented in databases?
* What is a primary key?
* What is a foreign key?
* What makes a good primary key?
# Data Modeling: One-to-Many

The most common type of data relationship is One-to-Many:

![1 author has many books](assets/erd-2.png)

It's not unusual to see an ERD comprised entirely of one-to-many relationships. How can you recognize this relationship?

## One-to-Many Relationships

The most critical question when determining a relationship between two entities is: "How many of one thing is another thing allowed to have?" The difficulty of the question is compounded by the fact that you need to think about the specific application that you're building. For example:

* One owner may have many pets, but each pet can only have one owner.
* One owner may have many pets, and each pet can only many owners.

Both of those situations are reasonable. In the first case, every pet has one canonical owner, which may be useful for having a single point of legal responsibility. The second case adds complexity, but may be useful for situations where it may useful to have multiple people to contact in case of emergency. Both situations are real; your particular application's needs determine which data model is correct.

## Databases

### Primary Keys

Ideally, every record in a database is uniquely identified by at least one value. It's most common for this to be an auto-incrementing integer that's set by the database.

| id | name |
| --- | --- |
| 1 | Duke Ellington |
| 2 | Kenny Burrell |
| 3 | Julian Adderly |

If you were to add another record to the database, it would automatically be given the id `4`. While columns like names may work as unique identifiers, there are two problems:

* They might not actually be unique. For example, there are a musician and an actor that both have the name "Hank Jones."
* They might change. "Julian Adderly" started going by "Cannonball Adderly" in high school. If his name were the unique identifier, it would need to be updated everywhere he was referenced. When a so-called surrogate key like an auto-incrementing ID is used, no change in the underlying data needs to change any of the references in the database.

In a schema diagram, the primary key is often marked with a PK in the first column.

### Foreign Keys

Databases enforce relationships with columns that are marked as foreign keys. A foreign key in one table is a primary key in another table.

![One author has many blog posts](assets/blog-post-author.png)

For example, a `blog_post` has an `author_id` of `3`. Every `author_id` needs to match an `id` in the `author` table. Since `author` does not currently have a record with an `id` of `25`, attempting to add a `blog_post` with an `author_id` of `25` will fail.

`author`

| id | name |
| --- | --- |
| 1 | Joe Satriani |
| 2 | Steve Vai |
| 3 | Eric Johnson |

`blog_post`

| id | title | content | author_id |
| --- | --- | --- | --- |
| 1 | Learning JavaScript | JavaScript is difficult to learn but it doe... | 2 |
| 2 | Learning CSS | CSS is one of the fundamental bui... | 2 |
| 3 | Learning HTML | HTML is used to structured data wh... | 2 |

This doesn't prevent your database from taking in any bad data, but it can serve as a reasonable check.

### One-to-Many Relationships in a Database

At a low-level, One-to-Many relationships in a database mean that:

* A primary key only shows up one time in a table
* A foreign key can show up multiple times in a table

That means that when relating two tables, the _one_ side of the relationship should always point to a primary key, and the _many_ side of a relationship should always point to a foreign key.

## Watch Out!

* Data modeling relationships are abstract, not concrete. For example, a particular parent may only have one child, and that child may only have one parent, but that's only a One-to-One relationship if you would never refer to one of them independently from the other. If the parent _could_ have more than one child but each child could only have one parent, that's still a one-to-many relationship. If a parent _could_ have many children and a child could have more than one parent, that's a many-to-many relationship. Possibilities matter more than what the data happens to be in any one case.
* The biggest mistake you're likely to make when identifying One-to-Many relationships is reading the diagram wrong:

![1 room has many windows](assets/window-room-erd.png)

If you read this as "one room can have many windows and many windows have one room", you'll technically be correct but it's not likely to help your thinking very much. Instead, always focus on single items: "One room can have many windows, but each window can only be in one room."
* One record can have multiple foreign keys because it can be related to multiple tables.

## Additional Resources

| Resource | Description |
| --- | --- |
| [One-to-Many (data model)](https://en.wikipedia.org/wiki/One-to-many_(data_model)) | Wikipedia's article on One-to-Many relationships. |
| [What is a One-to-Many Relationship in a Database?](https://vertabelo.com/blog/one-to-many-relationship/) | A blog post on One-to-Many relationships |
| [Video: ERD Tutorial Part 1](https://www.youtube.com/watch?v=QpdhBUYk7Kk) | LucidChart's guide to ERDs |
| [Video: One-to-Many Relationships](https://www.youtube.com/watch?v=-C2olg3SfvU) | Database Star's guide to 1:M relationships |
One-to-Many Relationship
ERD
Entity
Primary Key
Foreign Key
PK
FK
Schema Diagram
One-to-One
Database Table
Diagram this entity:

* Name: Guitar
* Attributes:
  * ID (primary key)
  * Make
  * Model
  * Color
* What is an ERD?
* What is an entity in an ERD?
* What is a relation in an ERD?
* What is a PK?
* What is an FK?
# Intro to Data Modeling

How would you model the data for a library of Harry Potter books? You could start with books:

![ERD of books](assets/library-erd-1.png)

But you might end up with Harry Potter books being under either "J.K. Rowling" and "Joanne K. Rowling." So, you make an author table, and reference it from the books table:

![ERD of books and authors](assets/library-erd-2.png)

This works well, until you realize that "Harry Potter and the Cursed Child" had 3 authors. So you make a new table called "Authoring" that keeps track of each instance of an author being associated with a book:

![ERD of books and authors](assets/library-erd-3.png)

Then you realize that the first Harry Potter book was alternately called "Harry Potter and the Sorcerer's Stone" and "Harry Potter and the Philosopher's Stone" based on which edition it was. So you can add a table for editions:

![ERD of books and authors](assets/library-erd-4.png)

Then you realize that each book edition has had multiple printings, so you add a table for printings:

![ERD of books and authors](assets/library-erd-5.png)

This is the process of relational data modeling.

## ERDs

Entity-Relationship Diagrams, or ERDs, describe things (entities) and their relationships with each other. The three basic categories of relationship are:

* 1-to-Many: This indicates that one entity can own more than one of another entity. For example, one building has many rooms, but each room can only be in one building.
* Many-to-Many: This indicates that entity can own more than one of another entity and vice-versa. For example, one building can have more than one administrator, and each administrator can manage more than one building.
* 1-to-1: This indicates that one entity is actually the same as another entity. For example, an employee may have a manager, who is also an employee.

There are other relationships in data modeling that are more nuanced, but they're subsets of these three types.

At their simplest, ERDs use a box for entities that describes the name and optionally the attributes of that entity:

![ERD of a book table](assets/erd-1.png)

The left column identifies keys. A PK in this column is called a primary key and describes an attribute that uniquely identifies each record. Most of the time, this will be an ID field that will be automatically populated by the database. An FK in this column means that an attribute is a foreign key, which is another entity's primary key. FKs are connected to PKs with lines and symbols called crow's feet. When reading an ERD, the end of the line with the crow's feet is pronounced "many", and the line with either a single crossing line or nothing is pronounced "one." This says "one teacher can have many students, but each student only can only have one teacher":

![ERD of one teacher having students](assets/erd-2.png)

## Watch Out!

* Technically, an ERD is just entities and their relationships and doesn't include any attributes of the entities. ERDs don't even necessarily need to specifically be used for databases or even anything digital. A diagram that includes columns, data types, and keys is more properly called a schema diagram. In practice, the terms "ERD" and "schema" are used interchangeably.
* A data model will never capture the complexity of the real world. Fortunately, a data model only needs to match the rules your application is expecting.
* ERDs capture abstract relationships. They aren't the data; they are the shape of the data.
* Entitites should be singular, meaning the correct name for a book model is "book", not "books".

## Additional Resources

| Resource | Description |
| --- | --- |
| [IBM: Data Modeling](https://www.ibm.com/cloud/learn/data-modeling) | IBM's overview of data modeling |
| [Wikipedia: Data Modeling](https://en.wikipedia.org/wiki/Data_modeling) | Wikipedia's article on data modeling |
| [Agile Data: Data Modeling 101](http://agiledata.org/essays/dataModeling101.html) | Overview of data modeling |
Data Modeling
ERD
Database Column
Primary Key
PK
Foreign Key
FK
Database
Schema Diagram
Data Model
Entity
[Students ERD](https://github.com/sikaeducation/erd-students-many-to-many)
* Describe many-to-many relationships.
* Why can't databases model many-to-many relationships directly?
* What is a join table?
* When are join tables used?
# Data Modeling: Many-to-Many

One-to-Many relationships are the most common type of relationships, but Many-to-Many relationships are the next most common. A Many-to-Many relationship, also called an M:N relationship, happens when one entity has more than one of another entity and vice-versa. For example, a parent may have multiple children, and each child may have multiple parents.

## Many-to-Many Relationships in Databases

Relational databases generally don't have a way to represent Many-to-Many relationships directly. However, You can create a many-to-many relationship out of two One-to-Many relationships:

![ERD turning a M:N into 2 1:M](assets/erd-many-to-many.png)

If one student can be enrolled in many courses and each courses can contain multiple students, a third entity can represent each occurrence of a student being enrolled in a course:

![ERD student enrollment course](assets/erd-many-to-many-2.png)

This new entity is called a join table. Join tables are often abstract (_enrollment_ is a more abstract idea than either _student_ or _course_), but they're also useful in other ways. For example, an `enrollment` table may contain additional information such as the term of the enrollment or whether it's been paid for yet. The join table may even have its own relationships, such as a referencde to which registrar performed the enrollment.

When possible, try to come up with a descriptive name for join tables. Doing so may be helpful in deciding what data belongs on it and what other relationships it may have. This isn't always possible, in which case it's also acceptable to combine the two names of the tables it's joining, such calling an enrollment `student_course`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: Many-to-Many (data model)](https://en.wikipedia.org/wiki/Many-to-many_(data_model)) | Wikipedia's article on Many-to-Many relationships |
| [What is a Many-to-Many Relationship in a Database?](https://vertabelo.com/blog/many-to-many-relationship/) | Blog post explaining Many-to-Many relationships |
| [Video: Many-to-Many Relationships](https://www.youtube.com/watch?v=1eUn6lsZ7c4) | Database Star's guide to M:N relationships |
Data Modeling
Many-to-Many Relationship
One-to-Many Relationship
M:N
Entity
Join Table
Look up at least 10 resources for learning data structures. Create a list of any data structure that shows up at least 3 times.
* What is a data structure?
* Why learn about data structures?
* What is the difference between an array and a data type?
# Introduction to Data Structures

The first computer science concept programmers should explore is data structures. A data structure is a pattern for organizing, managing, and storing data in a computer. In practice, this means defining operations that a data structure can perform and data that it exposes. You've already encountered one already in JavaScript: Array:

![Diagram of an Array](assets/arrays.png)

* Stores a collection of data, usually of the same data type. Each item in the collection is called an element.
* The order that elements are stored in is important
* Randomly access any element of an array by its index
* Add an element to the end of an array with a method called `push`
* Remove an element from the end of an array with a method called `pop`
* Add an element to the beginning of an array with a method called `shift`
* Remove an element from the beginning of an array with a method called `unshift`
* See how many elements are in the array with a property called `length`

All of these facts about arrays are independent of arrays in JavaScript, because they also apply to arrays in C, Java, PHP, Ruby, Python, and any other language that uses them. They are an _abstract data type_ that gets a concrete implementation in each of those languages.

There are lots of other data structures, but few of them are used directly in JavaScript. However, the ideas behind those data structures are common and will help you understand computing concepts better and give you more tools to solve problems with.

## Watch Out!

A data structure is not the same thing as a data type. A string is a data type and it's used in data structures, but it's not a data structure itself. Data structures are made up of different data types, which are called _primitives_.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Video: What Are Data Structures?](https://www.youtube.com/watch?v=bum_19loj9A) | CS Dojo's intro to data structures |
Data Structure
JavaScript
Array
Computer Science
Data Type
Element
Random Access
Array: `push`
Array: `pop`
Array: `shift`
Array: `unshift`
Array: `length`
String
* Define each of these terms related to trees:
  * Node
    * Root Node
    * Leaf Node
    * Parent Node
    * Child Node
    * Ancestor Node
    * Descendant Node
    * Sibling Node
  * Depth
  * Breadth
  * Grafting
  * Pruning
* True or False: A node in a tree is aware of its children
* True or False: A node in a tree is aware of its grandchildren
* True or False: A node in a tree is aware of its parents
* True or False: A node in a tree is aware of its grandparents
* True or False: A node in a tree is aware of its siblings
* Describe one practical use for the tree data structure
# Data Structures: Trees

A common and useful data structure for web developers is trees.

## Anatomy of a Tree

![Diagram of a tree](assets/trees.png)

* **Node**: An item in the tree
  * **Root Node**: A node with no parents
  * **Leaf Node**: A node with no children
  * **Parent Node**: A node with children
  * **Child Node**: A node with parents
  * **Ancestor Node**: A node that can be accessed through parents
  * **Descendant Node**: A node that can be accessed through children
  * **Sibling Node**: A node with the same parent
* **Branch**: Path connecting two nodes
* **Depth**: How many levels of children the tree has
* **Breadth**: How many leaves the tree has

## Basic Concepts

### Nodes

Nodes in a tree can store any data. This includes simple things like numbers or strings, as well as more complex types like objects and array. A practical example of a node in a tree is a DOM element. Things that may be stored in a DOM element include:

* The tag that was used
* Any text content inside the tag
* Any tag attributes

Each tag also has a reference to its parent and a reference to each of its children. This is useful for searching for something inside of a tree or passing messages back up to parents in a tree.

### Grafting

![Grafting one tree onto another](assets/grafting.png)

Any part of the tree is also technically a tree itself. This is why we can make several connected DOM nodes at the same time and then append them all at once, which is called grafting.

```js
const div = document.createElement("div")
div.innerHTML = `
  <h2>Heading</h2>
  <p>Paragraph</p>
`
const body = document.querySelector("body")
body.append(div) // Grafting the tree in `div` to the tree in `body`
```

![Adding one DOM tree to another](assets/append-tree.png)

### Pruning

![Pruning one tree from another](assets/pruning.png)

```js
const section = document.querySelector("section")
section.remove()
```

![Removing one DOM tree from another](assets/remove-tree.png)

## Pracical Examples

Trees are used for:

* Site indexes
* Computer directory structures
* Evolutionary trees
* Family trees
* Management hierarchies
* Dewey decimal system
* Online shopping categories
* Phrase structure trees in linguistics
* Playoff brackets

## Additional Resources

| Resource | Description |
| --- | --- |
| [Data Structures: Trees](https://www.youtube.com/watch?v=oSWTXtMglKE) | HackerRank's guide to Trees with Gayle Laakmann-McDowell |
Data Structure
Tree
Tree: Node
Tree: Root Node
Tree: Leaf Node
Tree: Parent Node
Tree: Child Node
Tree: Ancestor Node
Tree: Descendant Node
Tree: Branch
Tree: Depth
Tree: Breadth
Number
String
DOM
Tree: Grafting
Tree: Pruning
[Deploy Static Websites](https://github.com/sikaeducation/deploy-static-websites)
* When a website is loaded and no file is specified, what happens?
* When you request a file that doesn't exist, what status code is returned?
* What does the "static" in static deployment mean?
* What is deployment?
* What happens when you update a deployment?
* What does it mean when you go to a website, and you get an error saying `Cannot GET /`?
# Deployment: Surge

No matter how great your site is, it won't matter if the files are only on your computer. That means you need to be able to deploy your files to the public internet so other people can get them with their browser. This site runs on a local computer, but no one else can see it:

![App deployed on localhost](assets/cli-deployment-3.png)

But once it's deployed:

![App deployed on Surge](assets/cli-deployment-4.png)

It's available on the public internet and everyone can go to it.

## Deploying Sites

There are many different static hosting providers, but the easiest to get started with is [Surge](https://surge.sh). To deploy to Surge, run `npx surge`. After it downloads, you'll be prompted to create an account:

![Creating an account on Surge](assets/cli-deployment-2.png)

Note that you won't see anything change on the screen while you're typing your password. This is normal.

Then, it will ask some questions about which folder you'd like to deploy and what you'd like the URL to be:

![Deploying an app with Surge](assets/cli-deployment-1.png)

The folder you deploy should have an `index.html` file in it, otherwise going to the URL in a browser will 404.

To update a site you've already deployed, give it the same URL as your old deployment.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Publishing Your Website](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Publishing_your_website) | MDN's overview of deployment |
Deployment
Static Hosting Provider
1. Build an app with Create React App.
2. Run the app and see its defaults render in the browser.
3. Download a picture of a dog and put it in the `public` folder
4. Replace the contents of `App.js` with the following:

```jsx
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <h1>React Rocks!</h1>
      <img src="name-of-dog-file-goes-here.jpg"
    </div>
  )
}

export default App
```

5. See the app update in the browser
6. Build the app.
7. Deploy the app to a static hosting provider like Surge.
8. Change the content of the `<h1>`.
9. Rebuild the app.
10. Redeploy the app.
* How do you a build a React app that was scaffolded with Create React App?
* How do you deploy React apps?
* You build a React app and deploy it. You realize something was wrong, so you make the fix and deploy again. Why isn't the fix showing up on the deployed site?
# React: Deployment

Deploying SPAs is a little different that deploying static websites. Your browser only understands HTML, CSS, and JavaScript; it can't process JSX, Node packages, and many other things used to build React apps. How do you translate between React apps and JSX and HTML, CSS, and JavaScript?

## Building

To build a React app that was created with `create-react-app`, use `npm run build`. This will take all of your React components, stylesheets, images, and other assets and transpile them to a format browsers can use. All of these files will be located in the `build` directory:

![File structure of a CRA build](assets/cra-build.png)

## Deploying

Once built, the `build` folder is like any other website and can be deployed with `npx surge` or any other static hosting provider.

## Watch Out!

Changes made to your app aren't automatically built or deployed. Every time you to redeploy, you must build and deploy again.

## Additional Resources

| Resource | Description |
| --- | --- |
| [CRA: Deployment](https://cra.link/deployment) | Official CRA docs on deployment |
* React
* Deployment
* SPA
* Static Website
* JSX
* Node Package
* Components
* Transpilation
# Dev Tools: Element Inspector & Network Inspector

When you're building a web page, what do you do when something isn't working the way you expect? Open up the browser's developer tools.

<figure>
  ![Using Firefox dev tools to inspect a page](assets/dev-tools-1.png)
  <figcaption>Dev tools in Firefox</figcaption>
</figure>

<figure>
  ![Using Chrome dev tools to inspect a page](assets/dev-tools-2.png)
  <figcaption>Dev tools in Chrome</figcaption>
</figure>

Browser dev tools are one of the most useful tools available to web developers, and offer tools for examining web pages, debugging code, watching network traffic, and much more.

## Keyboard shortcut

Dev tools are a minute-by-minute part of the web development process, so it's something you want to be able to open and close quickly. Memorize the keyboard shortcut for opening it, you'll use it often.

* MacOS: `Command` + `Shift` + `i`
* Other Operating Systems: `Control` + `Shift` + `i`

## Element Inspector

One of the most useful items in the dev tools is the element inspector. There are a few different ways it can be used:

* If you right-click on something like text or an image on a web page and select "Inspect Element", it will open the dev tools to the Element Inspector (if it's not open already) and highlight the HTML element it comes from
* This works in reverse as well. If you hover your cursor over an element in the Element Inspector, it will highlight the item on the page it corresponds to
* When the Dev Tools are already open, you can click this icon to select items from the page:

![Inspecting elements](assets/dev-tools-9.png)

Some things you can do with the element inspector:

* See where (or whether) an element is being rendered
* Temporarily change the content of an element, its tag name, or any of its attributes by double-clicking on the thing you want to change and typing new values. They will all change back when the page is refreshed. 

![Inspecting elements](assets/dev-tools-4.gif)

* See how the browser interpreted the HTML you wrote. What you see in the Element Inspector isn't necessarily what you wrote; If you didn't close tags correctly or otherwise wrote invalid HTML, the browser will make an effort to correct it. The HTML in the Element Inspector represents the browser's interpretation.

## Network Inspector

Another useful tool is the Network Inspector. This tab shows all network requests your browser made for HTML files, stylesheets, scripts, images, and more. This is useful for seeing whether any of those requests succeeded or failed, what the HTTP request looked like, and what the HTTP response looked like.

![Inspecting network requests](assets/dev-tools-3.png)

This can be used to isolate problems to either the browser or the server, as well as examining errors that are sent back from servers.

## Watch Out!

* It's common for browser plug-ins to add elements to the HTML you see in the Element Inspector
* The Network Inspector can get very "noisy" when a page is loading. You can use the filters to only look at the type of request you're interested in. It's easy to forget to reset this when you want to see all requests again!
* There are minor differences between the dev tools available in different browsers and the tools are regularly updated, so some of the terms and images may be different on your computer.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Firefox Dev Tools Reference](https://developer.mozilla.org/en-US/docs/Tools) | The official guide to Firefox dev tools |
| [Chrome Dev Tools Reference](https://developer.chrome.com/docs/devtools/) | The official guide to Chrome dev tools |
| [Free Code Camp: Video guide to Chrome Dev tools](https://www.freecodecamp.org/news/learn-how-to-use-the-chrome-devtools-to-troubleshoot-websites/) | Video tutorial on Chrome dev tools |
Browser: Dev Tools
Web Page
Debugging
Network Traffic
Keyboard Shortcut
Browser: Element Inspector
HTML Tag
HTML Element
HTML
HTTP Response
HTTP Request
HTML File
Stylesheet
Plug-in
# Dev Tools: Style Editor

After the element inspector and the network inspector, the next most important part of the browser dev tools is the style editor.

## Editing Styles

Styles can be added and edited for any selector, or for specific elements. If you edit a rule for a selector, it will also apply for every other element that uses that same rule:

![Changing a class in a stylesheet](assets/dev-tools-1.gif)

You can also apply it exclusively to that element:

![Changing an element in a stylesheet](assets/dev-tools-2.gif)

If you've made an edit you want to permanently apply, you can copy the rule into your stylesheet by highlighting the rule in the dev tools and copy and pasting it into your text editor.

## Style Editor Helpers

When you're editing a numeric value, you can use the up and down arrow keys to adjust them. This is especially useful for visually aligning elements.

![Changing an element in a stylesheet](assets/dev-tools-4.gif)

When editing a color value, you can use the built-in color picker to change the value.

![Changing an element in a stylesheet](assets/dev-tools-3.gif)

Each style rule has a checkbox next to it that can be used to turn it on and off.

![Changing an element in a stylesheet](assets/dev-tools-5.gif)

Each style rule has an autocomplete that shows you all the legal values for a property.

![Changing an element in a stylesheet](assets/dev-tools-6.gif)

## Style Editor Warnings

Any rules you write that have invalid syntax will be indicated in the style editor:

![Changing an element in a stylesheet](assets/dev-tools-7.png)

## Box Model

Another useful part of the style editor is being able to see which box model properties have been set, and what they're currently rendering as:

![Changing an element in a stylesheet](assets/dev-tools-8.png)

## Additional Resources

| Resource | Description |
| --- | --- |
| [Firefox Dev Tools Reference](https://developer.mozilla.org/en-US/docs/Tools) | The official guide to Firefox dev tools |
| [Chrome Dev Tools Reference](https://developer.chrome.com/docs/devtools/) | The official guide to Chrome dev tools |
| [Free Code Camp: Video guide to Chrome Dev tools](https://www.freecodecamp.org/news/learn-how-to-use-the-chrome-devtools-to-troubleshoot-websites/) | Video tutorial on Chrome dev tools |
Browser: Style Editor
Browser: Element Inspector
Browser: Network Inspector
Stylesheet
CSS: Rule
CSS: Property
CSS: Box Model
# Installing Docker

## Desktop

On a conventional machine, go to [the Docker page](https://www.docker.com/get-started) and download/run the installer. Boot up the Docker GUI once to start the daemon.

## Server

On a headless Ubuntu machine:

```bash
sudo apt update
sudo apt remove docker docker-engine docker.io containerd runc # Old runtimes
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs)  stable"
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
Given this HTML:

```html
<main>
  <h1>My Favorite Pokemon Is:</h1>
  <img id="pokemon-image" />
  <p id="pokemon-name"></p>
  <p id="error"></p>
</main>
```

Draw the DOM tree.
* Describe how HTML becomes the DOM
* After HTML has become the DOM, what happens to the HTML?
# DOM

How do HTML and JavaScript be used to make web pages dynamic and interactive?

## The Document Object Model

The Document Object Model, or DOM, is what enables you to manipulate web pages with JavaScript. The web pages you write in HTML go through a few steps before they're rendered on the screen:

1. The browser requests an HTML file from a file server
2. The file server gives the browser the HTML file
3. The browser steps through each element in the HTML file and turns them into a tree of DOM nodes
4. The DOM nodes are rendered to the screen

![Diagram of a browser requesting a file and rendering it](assets/dom-trees-2.png)

So when you write this HTML:

```html
<body>
  <header>
    <h1>Site Title</h1>
    <nav>
      <ul>
        <li>
          <a href="news.html">News</a>
        </li>
        <li>
          <a href="about.html">About</a>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <h2>A Heading</h2>
    <p>Some content, including <a href="page-2.html">links.</a></p>
  </main>
</body>
```

Your browser will create this DOM tree:

![HTML represented as a DOM tree](assets/dom-trees-1.png)

Browsers offer JavaScript a variety of methods for reading, writing, and otherwise interacting with this tree.

## Watch Out!

Once your browser reads HTML and builds out the DOM, it's not HTML anymore. Even when you look at HTML in the element inspector, your browser is recreating new HTML based on the current state of the DOM. You can think of HTML as a set of instructions for how to build the DOM.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) | MDN's introduction the DOM |
| [MDN: DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) | MDN's reference on the DOM |
| [Video: What Is The DOM in JavaScript?](https://www.youtube.com/watch?v=H63dVFDuJDM) | The Net Ninja's guide to the DOM |
DOM
HTML
JavaScript
Dynamic
Web Page
Render
HTML File
File Server
Write the implementation for the 3 buttons in this code:

```html
<!doctype html>
<html>
  <head>
    <title>Button Toggling</title>
    <meta charset="utf-8" />
  </head>
  <style>
    .hidden {
      display: none;
    }
  </style>
  <body>
    <h1>Primary Heading</h1>
    <ul class="list-items">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
    <ul>
      <li>
        <button id="all-list-items-toggle">Toggle All List Items</button>
      </li>
      <li>
        <button id="heading-toggle">Toggle Heading</button>
      </li>
      <li>
        <button id="first-list-item-toggle">Toggle the First List Item</button>
      </li>
    </ul>
    <script>
      document
        .querySelector(".all-list-items-toggle")
        .addEventListener("click", () => {
          // Code for all list items toggle here
        })

      document
        .querySelector("#heading-toggle")
        .addEventListener("click", () => {
          // Code for heading toggle here
        })

      document
        .querySelector("#first-list-item-toggle")
        .addEventListener("click", () => {
          // Code for first list item toggle here
        })
    </script>
  </body>
</html>
```
* What is the method for adding a class to a `classList`?
* What is the method for removing a class from a `classList`?
* What is the method for toggling a class in a `classList`?
* Given this HTML:

```html
<div class="red green blue"></div>
```

What will this JavaScript do?

```js
const div = document.querySelector("div")
div.classList.toggle("green")
```

* Given this HTML:

```html
<div></div>
```

What will this JavaScript do?

```js
const div = document.querySelector("div")
div.classList.toggle("green")
```

* Given this HTML:

```html
<div class="red green blue"></div>
```

What will this JavaScript do?

```js
const div = document.querySelector("div")
div.classList.add("green")
```

* Given this HTML:

```html
<div class="red green blue"></div>
```

What will this JavaScript do?

```js
const div = document.querySelector("div")
div.classList.remove("green")
```

* Given this HTML:

```html
<div class="red blue"></div>
```

What will this JavaScript do?

```js
const div = document.querySelector("div")
div.classList.remove("green")
```


# DOM: `.classList`

A common DOM manipulation task is adding, removing, and toggling CSS classes. Classes can display in any order, and manipulating them may involve splitting up a string and putting it back together. `.classList` is used to avoid all the pitfalls of manual class manipulation.

```html
<div class="active"></div>
```

```js
const div = document.querySelector("div")

// Adding and removing classes
console.log(div.classList.value) // "active"
div.classList.add("user")
console.log(div.classList.value) // "active user"
div.classList.remove("user")
console.log(div.classList.value) // "active"

// .toggle adds a class if present, removes it otherwise
div.classList.toggle("active")
console.log(div.classList.value) // "user"
div.classList.toggle("active")
console.log(div.classList.value) // "user active"

// You can see if an element currently contains a class with .contains
if (div.classList.contains("user")){
  console.log("This will run because 'user' is one of the classes")
}
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `.classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) | MDN's reference on `.classList` |
DOM: `.classList`
CSS Class
Recreate this HTML using only JavaScript:

```html
<div class="user">
  <h2>Bill Evans</h2>
  <p>Bill Evans was a popular jazz pianist.</p>
</div>
```

---

Make this HTML:

```html
<article>
  <h3>Breaking News!</h3>
  <p>Read all about it!</p>
</article>
```

Look like this HTML:

```html
<div class="recycle-content">
  <h3>Yesterday's news</h3>
  <p>Read all about it!</p>
</div>
```

Using only JavaScript.
* How do you create a DOM node in JavaScript?
* How do you add elements to a page with JavaScript?
* You write this code:

```js
const container = document.querySelector(".container")
const p = document.createElement("p")
p.textContent = "Hello, world!"
```

Nothing shows up on the page. What's missing?
# DOM: Creating and Appending Elements

You can select elements with `document.querySelector`, but what can you do with those elements once you have them?

## `document.createElement`

DOM nodes are created in JavaScript with  `document.createElement`:

```js
const p = document.createElement("p") // <p></p>
const img = document.createElement("img") // <img />
const li = document.createElement("li") // <li></li>
```

`document.createElement` creates a blank DOM node with the tag name that you pass in. After that, the DOM node can be freely modified:

```js
p.textContent = "This text will be in the paragraph"
img.src = "cute-puppy.jpg"
li.id = "primary"
```

The attributes you're familiar with in HTML elements are exposed as properties of DOM nodes.

## `.append`

Adding an element to a page has 4 steps:

1. Create an element
2. Give the element the desired content and attributes
3. Query for an existing element to add the new element to
4. Append the new element to the existing element

So if you start with:

```html
<div class="user"></div>
```

And then write this code:

```js
const p = document.createElement("p")         // Step 1
p.textContent = "This is new content"         // Step 2
const user = document.querySelector(".user")  // Step 3
user.append(p)                                // Step 4
```

The result will be:

```html
<div class="user">
  <p>This is new content</p>
</div>
```

## Watch Out!

* Just because an element has been created doesn't mean it's on the page yet. An element needs to be `append`ed to an element that's on the page before it renders.
* There is a similar method to `.append` called `.appendChild`. It works similarly, except it accepts fewer types, has a different return value, and can only append one DOM node at a time. Unless you have a strong reason not to, you should prefer `.append`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `document.createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) | MDN's reference on `document.createElement` |
| [MDN: `document.append`](https://developer.mozilla.org/en-US/docs/Web/API/Element/append) | MDN's reference on `document.append` |
| [Video: Learn DOM Manipulation in 18 Minutes](https://www.youtube.com/watch?v=y17RuWkWdn8) | Web Dev Simplified's guide to DOM manipulation |
DOM
JavaScript: `document.querySelector()`
DOM Node
JavaScript: `document.createElement()`
HTML Element
JavaScript: `element.append()`
HTML Attribute
HTML: `.appendChild()`
Attach a click listener to every element on this page that logs that element's text content.

```html
<section>
  <h2>About Us</h2>
  <p>The main thing we're about? Integrity.</p>
</section>
```
* What is an event?
* Where do events come from?
* What causes events?
* Name 3 different events
* What two arguments are given to the `.addEventListener` method?
* Can can the `.addEventListener` method be called on?
* What argument are event handler functions called with?
* What is the highest level node in the DOM that can fire an event?
* How many event listeners can a DOM node have?
* How do you attach more than one event listener to a DOM node?
# DOM: Events

Tools like `document.createElement`, `document.querySelector`, and `.append` are used to create parts of web pages with JavaScript. However, that isn't necessarily interactive; interaction is when the page changes in response to user behavior. This is accomplished with events.

## Events

Most actions that users take on web pages, such as clicking, double clicking, hovering, and submitting forms, are events. You can listen for these events and trigger functions in response to them:

```html
<button>Click Me</button>
```

```js
const button = document.querySelector("button")
button.addEventListener("click", event => {
  console.log("The button was clicked!")
})
```

`.addEventListener` is a method available on any DOM node. It takes two arguments:

1. A string with the name of the event. Common ones are "click", "dblclick", "submit", "mouseover", and "keydown".
2. A function that should be called when the event happens. The function will be called with an `event` object that has more details about the event that happened.

There are no limits to what or how much can be done in an event handling function. You can read things off the page, create elements and manipulate the DOM, make network requests, and anything you can do with JavaScript.

## Watch Out!

* Events always come from a specific DOM node. It's not always obvious which DOM node fired the event (such as typing on a keyboard or something happening on the network). In these cases, the DOM node is usually `document` itself:

```js
document.addEventListener("keydown", event => {
  console.log("Hey, someone's typing!")
})
```

* You can add an event listener to a DOM node, but not a list of DOM nodes. If you want the event to be added to a list of nodes that came back from `document.querySelectorAll`, you want to `.forEach` over the DOM nodes and use `.addEventListener` to each one.
* Be careful adding event listeners in loops because you can accidentally add multiple event listeners for the same event on the same DOM node. For example:

```js
const button = document.querySelector("button")
const lis = document.querySelectorAll("li")
lis.forEach(li => {
  button.addEventListener("click", event => { // Added to the button, not the li!
    console.log("Hi!")
  })
})
```

This adds an additional click listener to `button` for every `li` on the page. If there are 10 lis, "Hi!" will log 10 times when the button is clicked.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Events Tutorial](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events) | MDN's tutorial on DOM events |
| [MDN: Events Interface](https://developer.mozilla.org/en-US/docs/Web/Events) | MDN's reference on the DOM event interface |
| [MDN: Events Reference](https://developer.mozilla.org/en-US/docs/Web/Events) | MDN's reference on DOM events |
| [Video: Learn JavaScript Event Listeners in 18 Minutes](https://www.youtube.com/watch?v=XF1_MlZ5l6M) | Web Dev Simplified's guide to Events |
DOM
DOM Event
JavaScript: `document.createElement()`
JavaScript: `document.querySelector()`
JavaScript: `element.append()`
Function
JavaScript: `element.addEventListener()`
JavaScript: Event Object
Network Request
DOM Node
Loop
Event Listener
Go to a website. Open up the console and manipulate the DOM using only JavaScript.

---

Write the JavaScript to remove items 2 and 4 from this list:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```
* What's the difference between `.textContent` and `.innerHTML`?
* How do you change the picture on an `img` node?
* How would dynamically add this HTML:
# DOM Manipulation

You can get elements, create elements, and add them to the page. But what if you want to:

* Change an image
* Add HTML to an element
* Remove an element

You need to use new methods and properties of DOM nodes.

## `.textContent`

The most basic kind of DOM manipulation is setting a DOM node's `textContent` property:

```js
const p = document.querySelector("p")
p.textContent = "This is the text that will appear in the p tag"
```

## `.innerHTML`

If you have several HTML elements to add to something, you can do them all at once with `.innerHTML`:

```js
const user = document.createElement("div")
user.innerHTML = `
  <h2>Terry Cloth</h2>
  <p>Favorite activities:</p>
  <ul>
    <li>Washing</li>
    <li>Drying</li>
  </ul>
`
```

This is preferrable to using `document.createElement` on every element and appending them all manually.

## Setting Attributes

HTML attributes can be read, added, and changed by accessing the relevant property on the DOM node. For example, to set an image's `src` and `alt` attributes:

```
const img = document.createElement("img")
img.src = "images/cute-puppy.jpg"
img.alt = "Close-up of a cute puppy"
```

The result will be:

```html
<img src="images/cute-puppy.jpg" alt="Close-up of a cute puppy" />
```

## Removing Elements

To remove an element, query for it and then call its `.remove()` method. If you have:

```html
<h1>A heading</h1>
<p>A paragraph</p>
```

And you want to remove the paragraph, you can use:

```js
const p = document.querySelector("p")
p.remove()
```

And the DOM will look like this:

```html
<h1>A heading</h1>
```

## Watch Out!

* There's no need to make a bunch of individual elements, append them all together, and then append the resulting tree to the DOM. Use `.innerHTML` instead.
* There is a similar property to `.textContent` called `.innerText` that works almost identically. The difference is that `.innerText` is "CSS aware" and will not return any text that's been hidden by CSS (for example with `display: none;`). `.textContent` will also return text that's been hidden. You can think of `.innerText` as what would go on a user's clipboard if they highlighted the text in the browser and copied it.
* You can manually change an element's classes with `.class` (since `class` is an attribute), but you should use `.classList` and its associated methods instead.
* To add an element directly to the `<body>` of the document, use `document.querySelector("body")`
* Watch your capitalization; the correct property is `.innerHTML`, not `innerHtml`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Manipulating Documents](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents) | MDN's tutorial on DOM manipulation |
HTML Element
DOM Node
JavaScript: `element.textContent`
JavaScript: `element.innerHTML`
JavaScript: `document.createElement()`
JavaScript: `element.remove()`
JavaScript: `element.innerText`
DOM
CSS
HTML Attribute
Method
HTML Document
* If more than one element matches `.querySelector()`, what comes back?
* If more than one element matches `.querySelectorAll()`, what comes back?
* What can be passed into `.querySelector()`?
* What can be passed into `.querySelectorAll()`?
* What data type does `.querySelectorAll()` return?
* What is wrong with this code?

```html
<div class="user"></div>
```

```js
const user = document.querySelector("user")
console.log(user) // null
```

* What is wrong with this code?

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

```js
const list = document.querySelector("ul")
list.forEach(listItem => {
  console.log(listItem)
})
```

* What is wrong with this code?

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

```js
const lis = document.querySelector(li)
lis.forEach(li => {
  console.log(li)
})
```
# DOM: Getting Elements

Browsers build the DOM from HTML and JavaScript is used to interact with the DOM. This means that you can use JavaScript to get DOM elements from the page:

```html
<h1>Some Heading</h1>
```

```js
const h1 = document.querySelector("h1")
console.log(h1.textContent) // "Some Heading"
```

## `document.querySelector`

To read a DOM element, use the `document.querySelector()` method. Pass in any valid CSS selector and it will return the first element that matches:

```html
<article id="feature">
  <h2>Cat Retrieved From Tree</h2>
  <address class="byline">William Masterson</address>
</article>
```

```js
let heading
// All of these retrieve the same element
heading = document.querySelector("h2")
heading = document.querySelector("article > h2")
heading = document.querySelector("#feature h2")

let byline
// All of these retrieve the same element
byline = document.querySelector(".byline")
byline = document.querySelector("address")
byline = document.querySelector("#feature h2 + address")
```

Once you have a DOM node in JavaScript, you can change its content or attributes, add other elements to it, or delete it.

## `document.querySelectorAll`

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

```js
const listItems = document.querySelectorAll("li")
console.log(listItems[0].textContent) // "One"
console.log(listItems[1].textContent) // "Two"
console.log(listItems[2].textContent) // "Three"
```

`document.querySelectorAll` works the same as `document.querySelector`, except it returns every match instead of only the first one. Like `document.querySelector`, it accepts any valid CSS selector.

## Watch Out!

* `document.querySelector` only returns the first match, even if multiple matches are possible.
* Traditionally, elements were selected with the methods `document.getElementsByTagName`, `document.getElementsByClassName`, and `document.getElementById`. These methods are still in common use, but unless you have a reason not to you should prefer `document.querySelector` and `document.querySelectorAll` for consistency and flexibility.
* `document.querySelectorAll` returns a `NodeList`. A `NodeList` is very similar to an array, but it doesn't have all the same methods. For example, a `NodeList` has a `.forEach` method, but it does not have a `.map` method.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Locating DOM elements using selectors](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors) | MDN's article on locating DOM elements |
| [MDN: `document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) | MDN's introduction on `querySelector` |
| [MDN: `document.querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) | MDN's reference on the `querySelectorAll` |
DOM
Browser
HTML
JavaScript
JavaScript: `document.querySelector()`
CSS Selector
HTML Element
DOM Node
JavaScript: `document.querySelectorAll()`
JavaScript: `document.getElementById()`
JavaScript: `document.getElementsByTagName()`
JavaScript: `document.getElementsByClassName()`
DOM NodeList
Array
Method
* What is encoding?
* What is the base-10 number system?
* What is the base-2 number system?
* Describe base64.
* What is the advantage of using multiple number bases?
* What are two uses for base64 encoding?
# Encoding: Base64

In traditional counting, the numbers start at 0 and go up to 9. The next number adds a 1 to the tens place and the count starts over again. This system is called base-10 because there are 10 different possible values in each place.

There are other number bases that can be used in counting. For example, binary is base-2 since the only values are 0 and 1. Otherwise, the counts work the same:

| Base-10 | Base-2 |
| --- | --- |
| 0   | 0     |
| 1   | 1     |
| 2   | 10    |
| 3   | 11    |
| 4   | 101   |
| 5   | 111   |
| 6   | 1001  |
| 7   | 1011  |
| 8   | 1111  |
| 9   | 10001 |
| 10  | 10011 |
| 12  | 10111 |
| 13  | 11111 |

Base-2 is useful because many simple things, such as electricity going on and off, can be used represent and store numbers.

You don't have to use only numerals. The alphabet is often used a counting system that could be called base-26:

| Base-10 | Base-26 |
| --- | --- |
| 0   | a     |
| 1   | b     |
| 2   | c     |
| 3   | d     |
| 4   | e     |
| 5   | f     |
| ... | ...   |
| 25  | y     |
| 26  | z     |
| 27  | aa    |
| 28  | ab    |
| 29  | ac    |

One of the advantages of using a larger counting system is that one character can convey a denser amount of information. For example, the base-10 number `100` is `cw` in base-26, which means the same number can be represented with one fewer character. This is useful for things like sending data over a network where every character counts for speed.

Base64 is a counting system that uses all the uppercase and lowercase letters, the numbers 0-9, as well as the characters `-` and `_` for a total of 64 possible values in each position. There are two popular uses of Base64:

* **Encoding data in JWTs**: In this case, Base64 doesn't actually decrease the character count, but it allows many special characters like `{` and `:` to be represented with characters that are safe for URLs.
* **Encoding binary files**: Many binary assets such as images can be represented by Base64 data urls instead of binary. This reduces the overall size and makes it easier to embed assets directly into pages instead of linking to them.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: Base64](https://en.wikipedia.org/wiki/Base64) | Wikipedia's article on Base64 |
| [MDN: Base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) | MDN's reference on Base64 |
| [MDN: Data Urls](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) | MDN's guide to Data Urls |
Base64
Base10
Base2
Base26
Binary
JWT
URL
Data URL
Move the secret in this express app to an environment variable:

```js
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.get("/", (request, response) => {
  response.json({ secret: "This is a top secret." })
})

app.listen(port, () => {
  console.log("listening here ", port)
})
```
* List 3 places application data can be held
* How are environment variables accessed in Node.js?
* List 2 ways environment variables can be used to configure an application.
* How are environment variables used to protect secrets in an application?
* How do you document environment variables?
* How do you keep environment variables out of Git repositories?
* You hard-code a secret in your code and you commit it. You realize your mistake, delete the secret, and commit. Why is your secret still exposed?
# Environment Variables

Application data can be held in 3 places:

* In the application itself in the form of variables
* In external sources like databases, file systems, and APIs
* On the computer that's running the application, which is called the environment

Data on the computer that's running the application can be set with environment variables. In Node.js, environment variables are accessed with the `process.env` object:

```js
fetch(process.env.API_URL)
  .then(response => response.json())
```

Environment variables make it so the code doesn't need to change just because different environments need different values.

## Types of Environment Variable

There are two kinds of environment variables: Configuration options and secrets.

### Configuration Options

Configuration options are things the application needs to run, but change based on how the application is run. For example, the application may:

* Use one kind of database in development environments, another in testing environments, and another in production environments
* Log verbose errors to aid troubleshooting in development and testing, and log terse errors in production to preserve space
* Use a fake API URL in development and a real one in production
* Classify an environment as development, testing, or production

In Node.js, these might look like this in code:

```
database.type = process.env.DATABASE_TYPE
app.use(morgan(process.env.LOGGING_LEVEL))
const apiUrl = process.env.API_URL
const currentEnvironment = process.env.NODE_ENV
```

### Secrets

Another type of environment variables is secrets. Secrets are sensitive information that few people should have access to, like API access tokens and hash signature keys. Developers are often use dummy secrets to use on their own computers in development, while the production servers have the actual secrets accessed-controlled in the production environment.

## `.env` Files

Environment variables are commonly kept in a file called `.env` in the root of the project directory.

```bash
API_URL=https://api.product-stuff.com/some-path/
API_ACCESS_TOKEN=4fa2cbe90b32abeg8756b6b6aaef3a21ba8afaa0
JWT_SIGNING_KEY=0!$%fT_SE!
```

Traditionally, environment variable names are written in SCREAMING_SNAKE_CASE. Values aren't quoted, and there is no whitespace around the `=`.

## Hiding Environment Variables

Since configuration variables are specific to environments (not code) and secrets need to stay secret, the `.env` file should never be committed to Git repositories. Instead, `.env` should be added to every Node project's `.gitignore` file:

```js
node_modules
.env
```

## Documenting Environment Variables

Since `.env` files aren't committed, an easy way to document them is to create a file called `.env.example`. Copy all of your environment variables to this file, and obfuscate the values.

```
API_URL=https://api-url.com/goes/here
API_ACCESS_TOKEN=1234567890123456789012345678901234567890
JWT_SIGNING_KEY=s3cr3t
```

When the repo is cloned, the `.env.example` file is copied to `.env` and the values replaced with real ones.

## `dotenv`

npm's `dotenv` package is a tool for integrating environment variables in Node applications. To install `dotenv` on a project, run `npm install`:

```js
npm install dotenv
```

Then as early as possible in the application, invoke its `config()` method:

```js
require("dotenv").config()
```

This only needs to be done once. Afterward, all of the environment variables from the `.env` file will be available on the `process.env` object.

## Watch Out!

If you accidentally commit a `.env` file, deleting it and recommitting will not remove it from your project's Git history. Every file that's ever been committed to a repo can be retrieved. This means the repo should not be pushed to any public place, and if it already has it should be considered compromised. The only way to purge a `.env` file from a Git history is to follow the [repo purging instructions](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).

## Additional Resources

| Resource | Description |
| --- | --- |
| [An Introduction to Environment Variables and How to Use Them](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa) | Blog post on environment variables |
| [Wikipedia: Environment Variable](https://en.wikipedia.org/wiki/Environment_variable) | Wikipedia's article on environment variables |
| [Removing sensitive data from a repository](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) | GitHub's guide to purging sensitive data like .env files from repositories after they've been committed |
Environment Variable
Database
File System
API
Node.js
`process.env`
Environment
API Access Token
URL
Logging
Development Environment
Testing Environment
Production Environment
Access Control
SCREAMING_SNAKE_CASE
Whitespace
`.env`
`.gitignore`
Git
Git Repository
Git Commit
Git Clone
`dotenv`
Git History
Root
You are writing an app that checks if someone is 21 years or older today. What equivalence partitions and boundaries do you check?

---

You are writing an app that accepts a last name and a birth year to verify identity. What equivalence partitions and boundaries do you check?

---

You are writing an app that validates phone numbers. Which equivalence partitions and boundaries do you check?

---

You are writing an app that accepts an array of person objects and a boolean indicating whether to remove people over 18. What equivalence partitions and boundaries do you check?
* What is an equivalence partition?
* Why are equivalence partitions useful?
* What is an equivalence partition boundary?
* What are equivalence partition boundaries useful?
* List at least 4 equivalence partitions for any string
* List at least 8 equivalence partitions for any number
* How many equivalence partitions are there for booleans?
* List at least 5 equivalence partitions for dates
# Equivalence Partitioning

Equivalence partitions are ranges of values that can be treated the same for testing purposes. For example, given a function that adds two numbers together, it may be valuable to check that it can add `1` to `2`. However, once you've verified that, verifying that `1` can be added to `3` is unlikely to reveal any new insights into the code. That's because `2` and `3` are part of the same equivalence partition.

## Equivalence Partitions and Boundaries

Equivalence partitions are always specific to the context. For example, a function that should accept an array of no more than 10 string elements might have the following partitions:

* Empty array
* Array with between 1 and 10 strings
* Array with 11 or more strings

A boundary is where values change from one partition to another. For example, the above case has the following boundaries:

* Array with 1 string (boundary between empty and 1-10)
* Array with 10 strings (boundary between 1-10 and 11 or more)

Boundaries are also useful to test because they're the most likely place for mistakes to occur.

How many partitions and boundaries you test for a piece of code should be proportional to how likely or critical a missed failure is, as well as how generic the code is. If piece of code being used incorrectly has safety implications, it's probably useful to assert behavior for every partition and every boundary. Similarly, a generic utility library that could be used in any number of contexts should provide cover a lot of partitions and boundaries. The rest of the time, it's OK to stick to partitions and boundaries that are the most common or express the purpose of the code the best.

In formulating which boundaries and partitions you want to test, consider the following cases.

### Strings

* An empty string
* A single character
* Multiple characters
* String with newlines
* String with unicode characters
* The maximum string length on the platform. The longest string supported by the JavaScript spec is 2^53, but in practice the number supported by each runtime is much lower.

### Numbers

* `-1`
* `0`
* `1`
* Integers greater than 1
* Integers less than -1
* Postive rational numbers
* Negative rational numbers
* Positive irrational numbers
* Negative irrational numbers
* Postive integer boundary
* Highest integer supported on the platform
  * There's a built-in constant representing this which you can access with `Number.MAX_SAFE_INTEGER`
* Highest decimal supported on the platform
  * There's a built-in constant representing this which you can access with `Number.MAX_VALUE`
* Lowest integer supported on the platform
  * There's a built-in constant representing this which you can access with `Number.MIN_SAFE_INTEGER`
* Lowest decimal supported on the platform
  * There's a built-in constant representing this which you can access with `Number.MIN_VALUE`
* Positive infinity
  * There's a built in constant representing this which you can access with `Number.POSITIVE_INFINITY`
* Negative infinity
  * There's a built in constant representing this which you can access with `Number.NEGATIVE_INFINITY`

### Booleans

The only legal values for Booleans are `true` and `false`.

### Arrays

* Empty array
* Array with 1 element
* Array with more than one element

### Objects

* Empty object
* Array with 1 element
* Array with more than one element

### Dates

* Years, months, days, hours, and minutes
* Time periods that cross between days, months, and years
* Time periods that last less than a millisecond
* Time periods that last more than 24 hours
* December 31st, 2016 (contains a leap second)
* February 29th, 2020 (leap day)
* Second Sunday in March (Daylight Savings Time)
* First Sunday in November (Daylight Savings Time)

## Watch Out!

* You may want to check all data types with `null` and `undefined` as well, especially in untyped environments.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY) | MDN's guide to `Infinity`, which includes what different calculations with infinity should evaluate to. |
* Equivalence Partition
* Equivalence Partition Boundary
Write a history of linting tools in JavaScript. Include at least jslint, jshint, and eslint, and indicate what drove the creation of each tool and what was responsible for its popularity or lack thereof.
* Describe ESLint
# ESLint

The most popular way to lint JavaScript is with ESLint. For every project that you want to lint, you need an `.eslintrc.js` file in your root directory that describes the rules you want to apply. For now, make the file in the root of the project directory and paste this into it:

```js
/* global module */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs" ],
    "camelcase": "error",
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": "error",
    "comma-style": "error",
    "func-call-spacing": "error",
    "indent": ["error", 2],
    "key-spacing": "error",
    "keyword-spacing": "error",
    "max-len": "warn",
    "newline-per-chained-call": "error",
    "no-multiple-empty-lines": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "warn",
    "no-whitespace-before-property": "error",
    "nonblock-statement-body-position": "error",
    "object-curly-newline": "error",
    "object-curly-spacing": "error",
    "object-property-newline": "error",
    "one-var-declaration-per-line": "error",
    "operator-linebreak": "error",
    "padded-blocks": ["error", "never"],
    "prefer-object-spread": "error",
    "quote-props": ["error", "consistent-as-needed"],
    "quotes": ["error", "double"],
    "semi": ["error", "never"],
    "space-before-blocks": "error",
    "space-before-function-paren": "error",
    "space-in-parens": "error",
    "spaced-comment": "error",
    "switch-colon-spacing": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "no-shadow": "error",
    "no-useless-return": "error",
    "no-useless-concat": "error",
    "no-unused-expressions": "error",
    "no-self-compare": "error",
    "no-param-reassign": "error",
    "no-loop-func": "error",
    "no-lone-blocks": "error",
    "no-invalid-this": "error",
    "no-eval": "error",
    "no-implied-eval": "error",
    "no-floating-decimal": "error",
    "no-empty-function": "error",
    "no-alert": "error",
    "eqeqeq": "error",
    "dot-notation": "error",
    "curly": "error",
    "consistent-return": "error",
    "array-callback-return": "error",
  },
}
```

## Text Editor Plugin

You should install an ESLint integration for your text editor. Here are some ESLint text editor integrations:

* [VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Vim](https://vimawesome.com/plugin/eslint)
* [Atom](https://atom.io/packages/linter-eslint)

These plugins highlights errors in your text editor automatically, and depending on how you configure them may automatically fix errors as well.

## Using ESLint

Text editor plug-ins will usually do most of the work, but these commands that may be useful as well:

```bash
# This command prints any errors
npx eslint .

# This command prints any errors and tries to automatically fix them as well
npx eslint --fix .
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Video: ESLint Quickstart](https://www.youtube.com/watch?v=qhuFviJn-es) | FreeCodeCamp's guide to ESLint |
Lint
JavaScript
ESLint
`.eslintrc.js`
Directory
Project Root
Text Editor
Plug-in
Add click listeners to each element in this component that log the name of the element that was clicked and its text content:

```js
<div className="App">
  <p>The current count is 1</p>
  <button>Increment Count</button>
</div>
```

---

Build a form and prevent its default submission behavior using React.
* How do you handle DOM events in React?
* What is the equivalent of `.addEventListener("click", handler)` in React?
* How do you prevent native form submissions in React?
* How do you get the value of an input from its `change` event?
* What data type does a event handler take in React?
* What is the `onFocus` event?
* What's wrong with this code:

```jsx
<button onClick={setCount(count + 1)}>Increment Count</button>
```
# React Events

Since you don't interact with the DOM directly in React apps, how do you respond to DOM events?

```jsx
const Counter = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => setCount(count + 1)

  return (
    <div className="App">
      <p>The current count is {count}</p>
      <button onClick={handleClick}>Increment Count</button>
    </div>
  )
}
```

[Play with this code](https://codesandbox.io/s/sweet-gould-xdbwv?file=/src/App.js)

`onClick={handleClick}` is the React way to do `document.querySelector("button").addEventListener(handleClick)`. Traditional DOM events, like `click`, `submit`, `keydown`, and others are written directly in JSX templates by prefixing them with `on`. For example:

```jsx
<form onSubmit={submitHandler}></form>
<input onFocus={focusHandler} />
<input onChange={changeHandler} />
<div onScroll={scrollHandler}></div>
```

Handlers are plain JavaScript functions. Like regular DOM event handlers, they'll be called with an `event` object containing details about the event. For example, to prevent form submission in a submit handler, you can use:

```jsx
const LoginForm = () => {
  const submitHandler = event => {
    event.preventDefault()
    // Other handling logic
  }

  return (
    <form onSubmit={submitHandler}>
      {/* Form Inputs */}
    </form>
  )
}
```

Some other useful event properties:

* `event.target.value` is the value of an `<input />`
* `event.key` is the character of the key that was pressed in keyboard event
* `event.target.dataset` is the value of any data attributes

## Watch Out!

You can also inline handler functions in JSX:

```jsx
<button onClick={() => setCount(count + 1)}>Increment Count</button>
```

This is almost always harder to read than extracting the function and should be avoided.

---

Note that the value of an event handler in JSX must always be a function that will be called with the event. This code:

```jsx
<button onClick={setCount}>Increment Count</button>
```

Will set the value of `count` to the `event` object when clicked, which is not what you want. This code:

```jsx
<button onClick={setCount(count + 1)}>Increment Count</button>
```

Isn't valid because calling `setCount` doesn't evaluate to a function.


## Additional Resources

| Resource | Description |
| --- | --- |
| [React: Events](https://reactwithhooks.netlify.app/docs/handling-events.html) | React's official guide to events |
| [Video: Events](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=3556s) | React Hooks Crash Course: Events |
React
DOM
DOM Event
JSX
DOM Event Handler
React Event Handler
Add both a 404 handler and a general error handler to this Express app:

```js
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.get("/", (request, response) => {
  response.json({ message: "Hello, world!" })
})

app.listen(port, () => {
  console.log("listening here ", port)
})
```
* How are error-handling routes declared in Express?
* When routes throw errors in Express, how are they handled?
* What are two ways to deliberately throw errors in Express?
* List 3 different things that should cause errors in Express?
# Express: Errors

You can write Express routes that match different methods and paths. What do you do if nothing matches? What do you do if a route throws an error?

## Error-Handling Routes

Somewhat confusingly, an Express error handler is a middleware function that has 4 parameters:

```js
app.use((error, request, response, next) => {
  // Handle error here, for example:
  response.status(500).json({
    error: error.message
  })
})
```

Whenever Express encounters an error, it will throw control to this handler. It should usually the final middleware you declare, and you should have at least one catch-all error handler like the one above.

## Throwing Errors

Some errors are thrown directly by the framework, such as not finding a matching route handler or general JavaScript errors. Other times you want to throw an error yourself:

```js
app.post("/users", (request, response) => {
  const isValid = validate(request.body)
  if (!isValid){
    throw new Error("The user must be valid")
  }
  // Rest of route
})
```

These will be caught by `app`'s next error handler middleware. If the error comes back from an async operation like `fs.readFile`, you'll want to use the `next` parameter instead:

```js
app.get("/message", (request, response, next) => {
  fs.readFile("./some-file", "utf-8", (error, fileContents) => {
    if (error){
      next(error)
    }

    response.json({ message: fileContents })
  })
})
```

If `next` receieves anything other than `null` as its first argument, it considers it an error and will pass that error on to the error handler.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Express: Errors](https://expressjs.com/en/guide/error-handling.html) | Official guide to handling errors in Express |
HTTP Method
Middleware
Express Route
Express Error Handler
Throw
Express `.next()`
Express
Add Helmet to this Express app:

```js
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.get("/", (request, response) => {
  response.json({ message: "Hello, world!" })
})

app.listen(port, () => {
  console.log("listening here ", port)
})
```
* What does the `helmet` middleware do in Express?
* What is CSP?
* What is MIME-sniffing?
# Express: Security with Helmet

There are a couple of things you can do to improve basic security in an Express app. The Helmet middleware sets more secure defaults for Express, and is easy to use but very powerful:

```js
const helmet = require("helmet")
app.use(helmet())
```

Helmet is a wrapper around a dozen other security-related middleware libraries, which help protect against:

* [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) violations
* [Cross-Site Scripting](https://owasp.org/www-community/attacks/xss/) attacks
* [MIME Sniffing](https://www.denimgroup.com/resources/blog/2019/05/mime-sniffing-in-browsers-and-the-security-implications/) attacks

And many more. Helmet doesn't protect against all vulnerabilities, but it does handle a lot of low-hanging fruit.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Express: Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html) | Express's official list of security best practices |
| [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/) | Blog post outlining steps to secure an Express app |
| [Helmet](https://github.com/helmetjs/helmet) | Official Helmet repo and docs |
Middleware
Content Security Policy
Cross-Site Scripting
MIME types
MIME Sniffing
Express
Complete all the exercises in [Express: Getting Started](https://expressjs.com/en/starter/installing.html)
* What is Express?
* What is a `package.json` file?
* What is a dependency?
* What are the differences between JSON and JavaScript?
* How do you stop an Express server?
# Intro to Express

Node is a runtime for running general purpose JavaScript code, which can be used for API servers. The most basic Express app looks something like this:

```js
const express = require("express")
const app = express()

app.get("/", (request, response) => {
  response.send("It worked!")
})

app.listen(3000)
```

[Play with this code](https://codesandbox.io/s/nifty-dan-13d2p)

This code listens for GET requests to `http://localhost:3000`, and responds with the string "It worked!" when it gets one.

## Installing Express

To create a new Express app:

* Run `npm init -y`. This initializes a folder as a Node project by adding a `package.json` file, which allows you to install npm packages like Express.
* Run `npm install express`. This downloads Express and marks it in the `package.json` file as a dependency of the project.
* Copy this code into a new file called `index.js`:

```js
const express = require("express")
const app = express()

app.get("/", (request, response) => {
  response.send("It worked!")
})

app.listen(3000)
```

* In the `package.json` file change this line:

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

To this:

```js
  "scripts": {
    "start": "node app.js"
  },
```

When you run `npm start` on the command line, NPM will run `node app.js`, which will make your server start listening for requests. Go to `http://localhost:3000` in a browser to see the API.

## Watch Out!

* The code that goes into `package.json` is JSON, not JavaScript. That means keys must be quoted, everything must use double-quotes, and you can't use trailing commas.
* When you run an Express app, by default your terminal will appear to freeze. This is normal; Express is just waiting for requests to come in. To stop your server, press `control` + `c`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Express/Node Introduction](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction) | MDN tutorial on Express and Node |
| [Express: Getting Started](https://expressjs.com/en/starter/installing.html) | Official guide to getting started with Express |
| [Video: Express JS Crash Course](https://www.youtube.com/watch?v=L72fhGm1tfE) | Traversy Media's crash course on Express |
Node.js
API Server
Express
HTTP Request
HTTP GET
npm
Terminal
Add Morgan to this Express app:

```js
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.get("/", (request, response) => {
  response.json({ message: "Hello, world!" })
})

app.listen(port, () => {
  console.log("listening here ", port)
})
```
* What does the `morgan` Express middleware do?
* Where does the `morgan` Express middleware keep its logs?
# Express: Logging

When an Express app gets an HTTP request, the request itself is a valuable troubleshooting tool. Luckily, there's Express middleware that prints out information about every request and response to the console.

## Installing Morgan

To add the Morgan logging middleware to an Express app, use `npm install`:

```bash
npm install morgan
```

## Configuring Morgan

To configure Morgan for an express app, import it and pass it to `app.use()`:

```js
const morgan = require("morgan")
app.use(morgan("dev"))
```

`app.use()` matches every request, and the string passed to `morgan()` determines how the logs are formatted. These are the 5 predefined logging formats, from most to least verbose:

* `"combined"`
* `"common"`
* `"short"`
* `"dev"`
* `"tiny"`

For debugging purposes, `"dev"` is a good default:

![The 5 different logging formats](assets/logging-formats.png)

[Play with this code](https://codesandbox.io/s/affectionate-water-4gkgg)

## Additional Resources

| Resource | Description |
| --- | --- |
| [Express: `morgan`](http://expressjs.com/en/resources/middleware/morgan.html) | Express's documentation on Morgan |
HTTP Request
Morgan
Logging
Middleware
npm
Debugging
Express
[Express Login Exercise](https://github.com/sikaeducation/express-login-exercise)
* How do you verify a user's password without knowing what it is?
* How do verify a user's identity without requiring their username and password on every request?
* How do you compare an unhashed password with a hashed password using `bcrypt`?
# Express: Login

After a user has been created, the database will have their username and hashed password. When a user sends their username and password, the server looks up the user's database record by the supplied username, hashes the supplied password, and compares the password hashes. If the pasword hashes match, the user is authenticated. Once the user is authenticated, their user ID can be stored in a JWT and send back to the client. For example:

```js
class User extends Model {
  static tableName = "user"
  static async signup(user){
    // Signup logic
  }
  static async authenticate(suppliedUser){
    const retrievedUser = await this.query().where("username", suppliedUser.username).first()
    const isAuthenticated = await bcrypt.compare(suppliedUser.password, retrievedUser.password_hash)
    if (!isAuthenticated){
      throw new Error("Bad password")
    }

    return retrievedUser
  }
}
```

```js
app.post("/login", async (request, response) => {
  try {
    const user = await User.authenticate(request.body.user)
    const data = { username: user.username }
    const token = jwt.sign(data, JWT_SECRET, {
      subject: user.username,
      expiresIn: "1h",
      issuer: "api.myapp.com",
    })

    response.json({ token })
  } catch (error){
    console.error(error.message)
    response.status(401).json({
      error: "Bad username or password",
    })
  }
})
```

[Play with this code](https://codesandbox.io/s/bold-faraday-p74es)

1. The `User` model gets a static async method called `authenticate` that takes a `user` object with the `username` and `password` from the HTTP request.
2. The user is looked up by the username from the HTTP request.
3. The password from the HTTP request is compared to the stored password hash. Note that this must be done with the `bcrypt.compare` method, not be comparing the values with something like `===`.
4. If the password hash comparison works, it returns the user's database record. If not, it throws an error that will be caught by the route.
5. Once the user is authenticated, their ID is encoded in a JWT and signed with the `JWT_SECRET` environment variable. This JWT is sent back to the client.

This token will be sent with future requests that need to be authenticated on this server.

## Additional Resources

| Resource | Description |
| --- | --- |
| [How to Hash and Compare Passwords Using Bcrypt](https://hackthestuff.com/article/node-js-how-to-hashing-and-compare-password-using-bcrypt) | Blog post on using bcrypt |
Express
Hashing
Password Hash
JWT
JavaScript `class`
JavaScript `extends`
JavaScript `static`
JavaScript `async`
Model
HTTP Request
Environment Variable
Auth Token
Database Record
Draw a diagram of the middleware pattern in Express.

---

Write two middleware functions for the following route.

1. The first should log the HTTP request method and path to the console
2. The second should add a header to the HTTP response called "Access-Control-Allow-Origin" with a value of `*`.

Attach them to incoming requests using either approach.

```js
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.get("/", (request, response) => {
  response.json({ message: "Hello, world!" })
})

app.listen(port, () => {
  console.log("listening here ", port)
})
```
* What is middleware?
* What do middleware functions return?
* List 5 different uses for middleware functions.
* How do you declare which middleware functions will run on a route?
* How do you trigger the next middleware function in Express?
* How do you throw an error from a middleware function in Express?
* How do you run a middleware function on every HTTP request?
* Identify 2 times it's more appropriate for middleware be added directly to a route
* Identify 2 times it's more appropriate for middleware be matched to request matchers directly
# Express Middleware

There are some common things API servers need to do when fulfilling HTTP requests:

* Adding a particular header to the response
* Authenticating a user based on a token in the request
* Validating that the correct data was sent in the request

Since they're so common, it makes sense to extract them into functions:

```js
app.get("/", (request, response) => {
  response = addCORSHeader(response)
  request = lookupUser(request)
  request = validateRequest(request)

  // Rest of route
})
```

Putting these in every route is repetitive and adds a lot of bulk and noise to the code. How can you keep the resuability without the repetition?

## The Middleware Pattern

Express, like other API server software, is primarily based around HTTP requests and responses. A request comes into the server, a response comes out. Consider this example of a route that looks up a product:

```js
app.get("/products/:productId", addCORSHeader, lookupUser, validateRequest, (request, response, next) => {
  const product = Product.find(request.params.productId)
  if (!product){
    const error = new Error("Couldn't find product")
    next(error)
  }

  response.json({
    user: request.user,
    product,
  })
})

app.use((error, request, response, next) => {
  response.status(400).json({
    error: `There was error with this request: ${error.message}`,
  })
})

function addCORSHeader(request, response, next){
  response.set("Access-Control-Allow-Origin", "*")
  next()
}

function lookupUser(request, response, next){
  const authToken = request.get("Authorization")
  request.user = User.find(authToken)
  next()
}

function validateRequest(request, response, next){
  if (request.params.productId){
    next()
  } else {
    const error = new Error("product_id is required")
    next(error)
  }
}
```

[Play with this code](https://codesandbox.io/s/gifted-shadow-k0g4z)

1. All `GET` requests to `/products/:productId` add a CORS header to the `response` object
2. Next, a user is looked up and added to the `request` object
3. Next, the request is validated to ensure the product was requested correctly
4. Next, the requested product is looked up and the response is sent back to the user
5. If an error occurs at any step, the error handling middleware sends back a `400` HTTP response and a description of the error

The middleware pattern in Express has a `request` and `response` object that are passed one after the other into middleware functions. Each function takes in the `request` object, the `response` object, and an optional `next` function. When `next` is called with no arguments, it moves to the "next" middleware function until `.json()`, `.sendStatus()` or another response sender is called. If `next` is called with an argument, Express assumes that something went wrong and it passes control to an error handler middleware function. This allows us to abstract out all of the behavior for a route into individual functions, which greatly improves both readability and reusability.

![Diagram of the Express middleware pattern](assets/express-middleware.png)

## Routes As Middleware

If middleware functions look a lot like route handlers, it's because route handlers are just middleware.

```js
function routeHandler(request, response){
  response.sendStatus(200)
}

app.get("/", addCORSHeader, lookupUser, validateRequest, routeHandler)
```

Since route handlers typically send the HTTP response back to the client by calling `response.json()` or `response.sendStatus()`, they're intended to be the last middleware in the chain. As such, they usually only call `next()` if there's an error.

## Watch Out!

* Middleware functions don't `return` values. Data is shared between them by attaching values to the `request` and `response` objects, and the order of execution is determined by the order they're put in the route definition.
* `next()` doesn't need to be called with `request` and `response`, they'll automatically be available in the next middleware function. You should only call `next` with an argument if an error occurs.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Express: Using Middleware](https://expressjs.com/en/guide/using-middleware.html) | Official guide to Express middleware |
| [Express: Middleware](http://expressjs.com/en/resources/middleware.html) | Full list of popular middleware modules for Express |
| [Video: Learn Express Middleware in 14 Minutes](https://www.youtube.com/watch?v=lY6icfhap2o) | Walkthrough of the Express Middleware pattern |
Middleware
HTTP Header
Authentication
Validation
API Server
HTTP Request
HTTP Response
CORS
Express
* What is a token?
* How do you validate JWTs in Node?
* What middleware needs to run before Passport can be used?
* What is the `verify` function in `jwt-passport` called with?
* What is a Passport strategy?
* How do you use a configured `jwt-passport` middleware to protect a route?
* Why do you also need to handle authorization after authenticating a user with passport?
# Express: Protecting Routes with Passport

Once users can create accounts and login with them to get tokens, you can start protecting routes. This means that any HTTP request going to a protected route must contain a valid token. If the token is valid, the user associated with it is looked up and added to the `request` object as `.user` in all future middleware and routes. Otherwise, the HTTP request is rejected with a `401 Unauthorized` status.

## Passport

[Passport](http://www.passportjs.org/) is an npm package that helps authenticate users. There are many ways to authenticate users:

* Possession of a token, such as a JWT
* Having a cookie pointing to a valid session
* Social login with a third-party like Facebook or Google

One of the unique features of Passport is that it abstracts out all of these different authentication methods as modules called strategies. Passport has [over 500 different authentication strategies](http://www.passportjs.org/packages/). This abstraction allows Passport to be used similarly regardless of what the actual authentication mechanism is.

```
app.get("/some-secret", passport.authenticate("twitter", { failureRedirect: "/login" }), (request, response) => {
  // Protected with Twitter
})
app.get("/some-secret", passport.authenticate("jwt", { session: false }), (request, response) => {
  // Protected with JWTs
})
app.get("/some-secret", passport.authenticate("local", { failureRedirect: "/login" }), (request, response) => {
  // Protected with cookies and sessions
})
```

To help read and decode JWTs, use the `passport-jwt` strategy.

## Installing Passport

To install Passport, use `npm install` to add the `passport` and `passport-jwt` packages:

```
npm install passport passport-jwt
```

## Configuring Passport

To configure Passport, add `passport.initialize()` as an Express middleware before any protected routes are registered:

```js
app.use(passport.initialize())
```

Then, configure a Passport strategy:

```js
const passport = require("passport")
const { Strategy, ExtractJwt } = require("passport-jwt")
const User = require("../models/User")
const JWT_SECRET = process.env.JWT_SECRET

async function verify(payload, done){
  const user = await User.query().where("username", payload.username).first()
  if (!user){
    done(null, false)
  }
  done(null, user)
}

const jwtStrategy = new Strategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ["HS256"],
  issuer: "api.myapp.com",
}, verify)

passport.use(jwtStrategy)

const authenticate = passport.authenticate("jwt", { session: false })
```

[Play with this code](https://codesandbox.io/s/admiring-saha-ik32w)

1. Import `passport`, as well as the `Strategy` and `ExtractJwt` classes from the `passport-jwt` classes.
2. Import the `User` Objection model.
3. Get the `JWT_SECRET` environment variable from the environment.
4. Define a `verify` function that the JWT strategy will use to look up a user.
  * This function will be called with the decoded JWT payload, which should contain a user ID, username, or some other identifying value.
  * If the user isn't found, the supplied `done` function should be called with `null` and `false`, indicating that there was no user with that value. Otherwise, `done` should be called with `null` and the found user. If `done` is called with any value in the first position, it means there was an error processing the request.
5. Configure the `jwtStrategy` by creating a new `Strategy` object with options and the `verify` function.
  * The options are mostly for security, and will automatically verify that the signature on the JWT is valid, it was issued by this app, and that no one has tried to change the way it was signed to something less secure.
  * The `jwtFromRequest` property tells the strategy where to look for the token. `ExtractJwt.fromAuthHeaderAsBearerToken()` tells the strategy to look for the token in the `Authorization` header of the request, prefixed with the word `Bearer`.
6. Passport is given the configured strategy.
7. An `authenticate` middleware function is generated that can be used to protect routes.

## Protecting Routes

To require that a user be logged in for a route, import the `authenticate` function and add it to a route handler:

```js
const authenticate = require("./middleware/authentication")

app.get("/secrets", authenticate, (request, response) => {
  response.json({
    message: `Congratulations ${request.user.username}, you're logged in!`
  })
})
app.get("/more-secrets", authenticate, (request, response) => {
  response.json({
    message: "Only logged in users see this too",
  })
})
```

The `authenticate` middleware contains the configured Passport strategy. Any route that contains it will either add a `user` property to the `request` object containing the authenticated user's database record or reject the request with a `401 Unauthorized` status.

## Watch Out!

All passport does is verify that a user is who they say they are and adds their database record to `request.user`; it doesn't specify what that user is allowed to do. If you have different roles in your application, such as users who can manipulate their own data and admins that can manipulate everyone's data, you will need to code that separately. In particular, watch out for users being able to edit data that isn't owned by them. This can be as simple as:

```js
app.put("/posts/:postId", authenticate, async (request, response) => {
  if (request.params.postId !== request.user.id){
    response.status(403).json({
      error: "You're not authorized to do that."
    })
  }

  const post = await Post.query().findById(request.params.postId).patch(request.body.post)

  response.json({ post })
})
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Passort.js](http://www.passportjs.org/) | Official Passport site |
| [Passort: JWT Strategy](http://www.passportjs.org/packages/passport-jwt/) | Documentation on the Passport JWT strategy |
| [Wikipedia: Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern) | Wikipedia's article on the strategy pattern |
Express
HTTP 401
Express Route
Auth Token
Middleware
Authentication
JWT
Protected Route
Objection
Model
JWT Payload
Authorization
HTTP Authorization Header
Bearer Token
Express Route Handler
Database Record
In the following Express app:

* Add a route that accepts `POST` requests to the `/comments` path and adds comments to the `comments` array.
* Add a route that accepts `GET` requests to the `/comments` path and optionally filters out short comments through a query parameter. For example, a request to `/comments?min_length=4` should filter out comment 2.
* Add a route that accepts `GET` requests to the `/comments/:id` path and returns a comment with a matching ID.

```js
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

let nextId = 3
const comments = [{
  id: 1,
  content: "Great work!"
},{
  id: 2,
  content: "Hrm"
}]


app.listen(port, () => {
  console.log("listening here ", port)
})
```
* What are 3 different ways to get data into an Express route?
* What needs to be done to read HTTP request bodies in Express routes?
* List 2 examples of data that would be appropriate for a route parameter in Express.
* List 2 examples of data that would be appropriate for an HTTP body in Express.
* List 2 examples of data that would be appropriate for a query parameter in Express.
# Express: Request Data

There are 3 different ways to read data from an HTTP request: Route parameters, HTTP bodies, and query parameters.

## Route Parameters

Any part of a route path that contains `:` is a route parameter, also called a dynamic segment:

```js
app.get("/products/:productId", (request, response) => {
  response.json({
    message: `You just asked for product ${request.params.productId}`
  })
})
```

If you make an HTTP GET request to `https://api-example.com/products/34`, you will receive a JSON response saying:

```json
{
  "message": "You just asked for product 34"
}
```

This is useful to matching specific items from a database by their IDs.

## HTTP Bodies

Most data is send in the body of HTTP requests. To read JSON data from the body of an HTTP request, you need to parse the request first:

```js
const express = require("express")
const app = express()

app.use(express.json())

app.post("/", (request, response) => {
  response.send(request.body) // Prints whatever was sent in the body
})
```

Note that `app.use(express.json())` only needs to be run once.

## Query Parameters

To read query parameters from the query string of the request URL, use `request.query`:

```js
// HTTP GET https://api-example.com/products?filterDuplicates=true&sort=DESC
app.get("/products", (request, response) => {
  if (request.query.filterDuplicates === "true"){
    products = products.filter(product => product)
  }

  if (request.query.sort === "DESC"){
    products.sortDescending()
  } else {
    products.sortAscending()
  }
})
```

Express will automatically break the query string into separate key:value pairs in the `request.query` object.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Express: `express.json()`](http://expressjs.com/en/resources/middleware/body-parser.html) | Express's built-in JSON body parser |
| [Express: `req.body`](http://expressjs.com/en/4x/api.html#req.body) | Express's documentation on `request.body` |
| [Express: `req.params`](http://expressjs.com/en/4x/api.html#req.params) | Express's documentation on `request.params` |
| [Express: `req.query`](http://expressjs.com/en/4x/api.html#req.query) | Express's documentation on `request.query` |
HTTP Request
Express Route Parameters
HTTP Body
Query Parameters
HTTP GET Request
JSON
Database
Query String
Express
Referencing the official [Express.js documentation](https://expressjs.com/en/4x/api.html#req), log each of the request properties in a route handler. Make a request to the route and examine the values you get back. Does any of the data you see give you new ideas for what can you can with Express routes or middleware?
* Recall 3 properties or methods in the Express `request` object
* Recall 3 properties or methods in the Express `response` object
* How do you add a new property to the Express `request` object?
* How do you add a new property to the Express `response` object?
* What do you need to do to access `request.body`?
# Express: `request` and `response`

An HTTP server starts with an HTTP request and ends with an HTTP response. What do those look like in code?

## `request`

Every Express route handler gets a `request` object containing details about the HTTP request. For example:

* **`request.body`**: Contains the body of the HTTP request after it's been parsed
* **`request.params`**: Contains the Express route keys and their values
* **`request.query`**: Contains the query string of the request as keys and values
* **`request.get("header-name-here")`**: Returns the value of an HTTP request header

This is modifiable, as well. For example, it's possible to create a `user` object and add it to the `request` as `request.user`.

## `response`

Every Express route handler has access to a `response` object containing details about the HTTP response. Call methods on the `response` object to progressively build your eventual HTTP response. For example:

* **`response.status(statusCode)`**: Sets the HTTP status code
* **`response.set("header-name-here", "header value here")`**: Sets an HTTP response header

Additionally, there several `response` methods that end Express's processing and send the response back down to the client.

* **`response.json(someObject)`**: Encodes a JavaScript object as JSON and sends it in the HTTP response body
* **`response.send(someString)`**: Sends a string in the HTTP response body
* **`response.sendStatus(someStatusCode)`**: Sends an HTTP status code as the response with no HTTP response body

Refer to the [full list](https://expressjs.com/en/guide/routing.html#response-methods) for other options.

## Watch Out!

* `request.body` is not usable until it has been parsed with something like `express.json()`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Flavio Copes: Express, a Popular Node.js Framework](https://flaviocopes.com/express/) | A blog post with lots of details of Express's request and response objects |
| [Express: Request](https://expressjs.com/en/4x/api.html#req) | Official Express docs on the `request` object |
| [Express: Response](https://expressjs.com/en/4x/api.html#res) | Official Express docs on the `response` object |
| [Express: Response methods](https://expressjs.com/en/guide/routing.html#response-methods) | Guide to the different ways Express can respond to a request |
HTTP Server
HTTP Request
HTTP Response
Express
Expres Route
Query String
HTTP Body
Express Request Parameters
Query Parameters
HTTP Header
HTTP Status Code
JSON
[Express Router: Games Collection](https://github.com/sikaeducation/games-collection-router)
* What is a router?
* How do you mount a router?
* What is exported from a file that will be used as an express router?
* How do you make a file a router?
* What happens to the path a router is mounted with?
* Why use routers in Express?
# Express: Router

As you add more routes to an Express app, your `index.js` will start getting bloated:

```js

app.get("/users", getUsersHandler)
app.get("/users/:id", getUserHandler)
app.post("/users", createUsersHandler)
app.put("/users/:id", updateUsersHandler)
app.delete("/users/:id", deleteUsersHandler)

app.get("/products", getProductsHandler)
app.get("/products/:id", getProductsHandler)
app.post("/products", createProductsHandler)
app.put("/products/:id", updateProductsHandler)
app.delete("/products/:id", deleteProductsHandler)

// Same thing for 10 other models
```

How do you split these routes out to keep each file more focused?

## Express Router

Express's router matches a method and a path like every other Express route, but then it delegates the handling of that request to another module.

Routes related to users:

```js
// routes/users.js
const express = require("express")
const router = express.Router()

// Define a bunch of handlers...

router.get("/", getUsersHandler)
router.get("/:id", getUserHandler)
router.post("/", createUsersHandler)
router.put("/:id", updateUsersHandler)
router.delete("/:id", deleteUsersHandler)

module.exports = router
```

Routes related to products:

```js
// routes/products.js
const express = require("express")
const router = express.Router()

router.get("/", getProductsHandler)
router.get("/:id", getProductsHandler)
router.post("/", createProductsHandler)
router.put("/:id", updateProductsHandler)
router.delete("/:id", deleteProductsHandler)

module.exports = router
```

Loading both routers:

```js
// index.js
const userRoutes = require("./routes/users")
const productRoutes = require("./routes/products")

app.use("/users", userRoutes)
app.use("/products", productRoutes)
```

* Routers are typically mounted with `use`, which matches all request methods.
* The prefix a router was mounted with is assumed in all requests that router handles. That means that a router mounted with `app.use("/books", booksRouter)` can use `router.get("/")` to match a GET request to `/books`.
* A module that's going to be mounted as a router should export the `router` object.

## Watch Out!

* Remember the route paths are passed into the router, and every route you use will be prefixed with whatever path the router was mounted with
* Routes in a router are mounted with `router.methodName`, not `app.methodName`
* Remember to export the `router` object from a router file

## Additional Resources

| Resource | Description |
| --- | --- |
| [Express: Routing](https://expressjs.com/en/guide/routing.html) | Express's official router docs |
| [Express: Routing guide](https://expressjs.com/en/starter/basic-routing.html) | Express's guide to routing |
| [MDN: Routing tutorial](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes) | MDN's tutorial on Express routing |
| [Video: Express JS Router and Routes](https://www.youtube.com/watch?v=iM_S4RczozU) | Steve Griffith's guide to Express Router |
Express
Express Route
Model
Express Router
Module
Given this Express app:

```js
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

const words = []

app.listen(port, () => {
  console.log("listening here ", port)
})
```

Add the following routes:

* `POST /words/:word` should add `:word` to the `words` array and respond with the word it added
* `GET /words` should should response with all the words in the `words` array
* `PUT /words/:old/:new` should look for the `:old` word in the `words` array and replace it with `:new` if it finds it. Otherwise, it should add it. The route should respond with the new word.
* `PATCH /words/:old/:new` should have the same behavior as `PUT `/words/:old/:new`
* `DELETE /words/:word` should remove `:word` from the `words` array if it exists and respond with nothing.
* A request to `/` with any method should respond with the string "Hello, world!"
* After all of the other routes, a route that responds to any and any method should respond with the string "Can I help you?"
* What are HTTP requests matched on?
* List 5 HTTP methods and how to match them in Express
* What is a path?
* How are paths matched in Express apps?
* What's a route parameter?
* How do you access route parameters?
* What is the universal method matcher in Express?
* What is the universal path in Express?
# Express: Routes

Express is based around the idea of HTTP requests and responses. You declare routes, each of which matches a particular HTTP request pattern. Whenever a route is matched, the function attached to it executes.

## Route Matching

You can match a route based on the requests' HTTP method, its path, or both. If more than one route matches, Express will use the first one.

### Methods

Express `app` objects have methods corresponding to `GET`, `POST`, `PATCH`, `PUT`, `DELETE`, `OPTIONS`, and other HTTP methods:

```js
app.get("/", routeHandler) // Matches all GET requests for "/"
app.post("/", routeHandler) // Matches all POST requests for "/"
app.put("/", routeHandler) // Matches all PUT requests for "/"
app.patch("/", routeHandler) // Matches all PATCH requests for "/"
app.delete("/", routeHandler) // Matches all DELETE requests for "/"
app.options("/", routeHandler) // Matches all OPTIONS requests for "/"
```

Refer to the [full list](https://expressjs.com/en/4x/api.html#routing-methods) of supported HTTP methods.

### Paths

The first argument to a route is a path to match.

```js
app.get("/") // Matches all GET requests to `/`
app.get("/products") // Matches all GET requests to `/products`
app.get("/users") // Matches all GET requests to `/users`
app.get("/posts/:postId/comments") // Matches all GET requests that start with `/posts/` and end in `/comments`
```

The `/` path is the root of the server. That means if the server is hosted at `api-example.com`, this route will match `https://api-example.com`.

#### Route Parameters

Any part of a path that starts with `:` is a route parameter and will be available as a variable on the `request` object.

```js
app.get("/products/:productId", (request, response) => {
  response.json({
    message: `You just asked for product ${request.params.productId}`
  })
})
```

If you make an HTTP GET request to `https://api-example.com/products/34`, you will receive this JSON response:

```json
{
  "message": "You just asked for product 34"
}
```

This is useful for matching specific items from a database by their IDs. Note that you can have multiple route parameters:

```js
app.get("/posts/:productId/comments/:commentId/likes", routeHandler)
```

### Universal Matchers

To match every method for a path, use the `app.use()` method. To match every path for a method, leave the path argument off.

```js
app.get(routeHandler) // Matches every GET request to any path
app.use("/products", routeHandler) // Matches every HTTP request to `/products`
app.use(routeHandler) // Matches every HTTP request
```

`app.use` is commonly used in middleware plugins like logging and authentication that are intended to run on every request.

## Route Handlers

A route handler is a function that has an HTTP request object and an HTTP response object as parameters.

```js
const routeHandler(request, response){
  response.json({
    message: "Hello, world!"
  })
}
```

Route handlers are mounted on routes, and are called whenever the route is matched:

```js
app.get("/", routeHandler)
```

They can also be written inline on the route:

```js
app.get("/", (request, response) => {
  response.json({
    message: "Hello, world!"
  })
})
```

## Watch Out!

Paths always start with `/`. `app.get("products")` will not work, it must be `app.get("/products")`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Express: Routing](https://expressjs.com/en/guide/routing.html) | Official guide to routing in Express |
| [Video: Express JS Router and Routes](https://www.youtube.com/watch?v=iM_S4RczozU) | Steve Griffith's guide to Express Router |
Express
HTTP Request
HTTP Response
Express Route
HTTP GET
HTTP POST
HTTP PUT
HTTP PATCH
HTTP OPTIONS
HTTP DELETE
HTTP Method
Root
Server
Route Parameter
JSON
Middleware
Logging
Authentication
Route Handler
Path
[Express User Signup exercise](https://github.com/sikaeducation/express-user-signup-exercise)
* What's the difference between creating a user account and most other kinds of resources?
* Describe how to hash a password with `bcryptjs`.
* What is `bcrypt` hash cost?
# Express: User Creation

Creating a new user in an Express app is not very different from creating a new record of any kind. The only difference is that you need hash the user's password when you store it in the database.

## Installing `bcrypt`

There are several different implementations of the bcrypt algorithm on npm, but a good default is the `bcryptjs` package. Add it to your project with `npm install bcryptjs`. When you import it, it's common to change the name from `bcryptjs` to `bcrypt`:

```js
const bcrypt = require("bcryptjs")
```

## Setting up the app

The initial setup for creating a new user is the same as any resource. You need:

1. A database connection
  * Install `knex`, `objection`, and a database driver like `pg` or `sqlite3`.
  * Make a new `knex` file with `npx knex init` and configure it appropriately
  * Make a new migration to create the user table. When making the table, you should indicate that the password being stored is a hash by giving it a name like `password_hash` or `password_digest`. Don't forget to run the migration!
  * Make a database connection file that initializes `knex` with the correct configuration
2. An Objection `User` model that references the user table you migrated.
  * Don't forget to set the database connection on `Model.knex`
3. A route to accept new user signups. By REST standards this should be a `POST` request to `/users`, but it's acceptable to brand this with something like `/signup`.
  * This should use the `User` model to create a new user.

## Creating a New User

The only difference between creating a user and any other resource is how the password is handled. Consider this example of hashing a password on the way in:

```js
class User extends Model {
  static tableName = "user"
  static async signup(user){
    const hashedPassword = await bcrypt.hash(user.password, 12)
    delete user.password
    user.password_hash = hashedPassword

    return this.query().insert(user)
  }
}
```

[Play with this code](https://codesandbox.io/s/lingering-dawn-o70gt?file=/models/User.js)

This example adds a new static method to the `User` model that takes in a user object:

```js
{
  username: "miles",
  password: "d@v1$",
}
```

The password is then hashed with `bcrypt.hash()`. The first parameter for `.hash()` is the string to hash, and then second is a cost. The bcrypt algorithm allows you to control how secure the hash is at the cost of processing speed. The maximum is 37, the minimum acceptable number is 12.

With the password hashed, the original password is deleted from the `user` object and the hashed password is added to it. These are inserted into the database as any other record would be.

![Insomnia showing a successful user addition](assets/user-signup.png)

## Additional Resources

| Resource | Description |
| --- | --- |
| [npm: `bcryptjs`](https://www.npmjs.com/package/bcryptjs) | Documentation for the `bcryptjs` npm module |
| [Stack Exchange: "Why Should I hash passwords?"](https://security.stackexchange.com/questions/36833/why-should-i-hash-passwords) | Stack exchange answers on why passwords should be hashed. |
Express
Hashing
Password Hash
bcrypt
Knex.js
REST
HTTP POST
Model
* What user interactions cause a form submission?
* Differentiate between using `<input />` and `<button>` to submit a form.
* You submit a form, and the page refreshes and the values from the form are in query string. What happened?
* Why isn't this submit handler working?

```html
<form>
  <input type="submit" id="agree" value="Agree to terms" />
</form>
```

```js
const agree = document.querySelector("#agree")
agree.addEventListener("submit", event => {
  event.preventDefault()
  console.log("It worked!")
})
```

* Why isn't this submit handler working?

```html
<form>
  <input type="submit" id="agree" value="Agree to terms" />
</form>
```

```js
const form = document.querySelector("form")
form.addEventListener("submit", event => {
  console.log("It worked!")
})
```

* What's wrong with this form?

```html
<form>
  <button type="submit" id="agree">Agree to terms</button>
</form>
```

```js
const button = document.querySelector("#agree")
button.addEventListener("click", event => {
  console.log("It worked!")
})
```
# Form Submission

When a user fills out a form, how do you use the information they submitted?

## Submit Buttons

There are two ways to submit a form in HTML:

```html
<form>
  <label for="username">Username</label>
  <input type="text" name="username" id="username" />

  <label for="password">Password</label>
  <input type="password" name="password" id="password" />

  <input type="submit" value="Login" />
</form>
```

```html
<form>
  <label for="username">Username</label>
  <input type="text" name="username" id="username" />

  <label for="password">Password</label>
  <input type="password" name="password" id="password" />

  <button type="submit">Login</button>
</form>
```

They both do the same thing, with the following distinctions:

* An `<input />` is a self-closing tag and `<button>` is not, which means that `<input />` can only have text content while `<button>` can have any valid HTML in it (such as images).
* An `<input />` is mildly more correct semantically, since a `<form>` is supposed to be submitted by keyboard with "enter", while `<button>` interactions are supposed to happen with "spacebar".

Both are in common use. If you need a button in the form that doesn't submit the form, you can give it a `type` of `button`:

```html
<form>
  <button type="button">This won't submit the form when clicked</button>
</form>
```

## The `submit` event and `event.preventDefault()`

To intercept a form submission with JavaScript, listen for the `"submit"` event on the form:

```js
const form = document.querySelector("form")
form.addEventListener("submit", event => {
  event.preventDefault()

  // Handle form submission here
})
```

The first thing in a form submission handler should be `event.preventDefault()`. `event` is an object that's passed into the function, and `.preventDefault()` is a method that stops the browser from trying to submit the form and allows you to write your own logic to handle form submission.

## Getting Data From a Form

```js
const form = document.querySelector("form")
form.addEventListener("submit", event => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const firstName = formData.get("first-name")
  const lastName = formData.get("last-name")
  const email = formData.get("email")
})
```

To get data from a form, pass `event.target` into `new FormData()` and save the result into a variable. Then, use the `.get()` method to retrieve the values for each form input. These match the `name` attribute from the form input.

You can use this data to create DOM elements, send HTTP requests, and much more.

## Watch Out!

* The `submit` event is fired by the `<form>`, not the the submit button
* If the page reloads when you submit the form (look for a query string with the form values in the URL), the `submit` event did not have its default behavior prevented. This could be because `event.preventDefault()` wasn't called, or because the HTML page couldn't find the JavaScript file, or because the `submit` event listener was added to the wrong element.

## History

`<form>` tags have historically used `method` and `action` attributes to indicate how they should be handled:

```html
<form method="POST" action="http://www.website.com/some-server-side-script.php">
</form>
```

When the form is submitted, your browser makes the type of HTTP request indicated by `method` (although it can only be GET or POST) and the `action` indicates where the HTTP request will be sent to.

While there are still uses for this style of form, it's fallen out of favor. Submitting the form is effectively a page navigation, meaning the response from the server needs to tell the browser where to go and an entire page load is required. For the more modern asynchronous experience, you need to prevent this behavior, which is why the first part of a form submission handler is usually `event.preventDefault()`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Sending and Retrieving Form Data](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data) | MDN's tutorial on sending form data |
| [Video: How to Submit a Form with JavaScript](https://www.youtube.com/watch?v=2NRwiRZK7gI) | Junior Developer Central's guide to submitting forms with JavaScript |
HTML
HTML: `<form>`
HTML: `<input />`
HTML: `<label>`
HTML: `<button>`
DOM Event
DOM: Form Submission Handler
`event.preventDefault()`
DOM: `FormData`
Method
Query String
URL
HTML Page
HTML: Form Action
HTML: Form Method
Server
Browser
Asynchronous
* Describe a unit of work in your own words.
* What is something that is smaller than a unit of work?
* What is something that is larger than a unit of work?
* Is it better to make a commit too small or too big? Why?
* Recall 4 present-imperative verbs suitable for Git commits
* What happens if you leave off the `-m` flag on Git commits?
* How do you exit Vim?
# Git: Commits

Git commits represent a specific save point in the history of your code and should contain a single unit of work. This term is open to interpretation, but here are some examples:

* Fixing something that was broken
* Creating a new feature
* Removing a feature
* Reorganizing working code in a file
* Reorganizing files and folders in a repo

By contrast, these usually aren't single units of work:

* Multiple features
* Work in progress for multiple features
* Changing something from being broken in one way to being broken in a different way
* Adding a single line of code
* Changing the name of a variable
* Creating an empty file or folder

That said, you're better off making too many commits than too few. There are advanced techniques for reorganizing and combining previous commits that you've made if you end up with more commits than necessary.

## Staging Strategy

It's important to make your commits represent a single unit of work because that's what allows you to locate and undo those changes later. If all of the changes you've made represent a single unit of work, you can stage them all at once with `git add -A`. If you've made changes that represent more than one unit of work, you can stage and commit the changes separately.

## `git commit`

Once you've staged files you want to commit, run `git commit -m "Enter a message describing the single unit of work here"`. The `-m` stands for message, and will be attached to the commit so you can remember what work was done in it.

## Commit Messages

Commit messages should be written in present imperative,which is command in the present tense:

* `Fix the bug`
* `Add a feature`
* `Remove duplication`

This can feel awkward because it's often considered a rude way to communicate. A commit message is not a description of what **you** did in the commit, it's a description of what you're ordering the computer to do. This convention helps stay consistent with Git itself. Here's a partial list of present imperative verbs you can use to start commit messages:

* Add
* Drop
* Fix
* Make
* Start
* Stop
* Optimize
* Document
* Refactor
* Reformat
* Rearrange
* Reword

## Watch Out!

* By default, your terminal will open a text editor called Vim if you enter `git commit` without any other arguments. It looks like this:

![Vim commit messages](assets/vim.png)

Vim is a modal text editor, which means that each key on the keyboard does more than just type characters. For now, learn how to exit out of it:

1. Press `ESC` 3 times
2. Type `ZQ`. Note the capitals- that is `Shift` + `z`, followed by `Shift` + `q`. This quits without saving.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Git: Commit](https://git-scm.com/docs/git-commit) | Git's official reference on commiting |
| [Atlassian: Git Commit](https://www.atlassian.com/git/tutorials/saving-changes/git-commit) | Atlassian's guide to Git commits |
Git
Git Commit
Unit of Work
Git Staging
Present Imperative
Vim
Modal Text Editor
# Introduction to Git

Git is a tool for keeping track of different versions of files. Git helps you:

* Make save points in your projects that you can go back to
* Experiment with ideas in branches, discard them if they don't work, and then merge them in with the rest of the code if they do
* Enable multiple people (potentially thousands) working on the same files at the same time

It's like having a supercharged undo/redo for files, instead of just the contents of files.

## Git By Example

You're working on a project, and you make some files:

```bash
touch index.html index.css index.js
```

You decide to version control them with Git, so you initialize a repository, add your files to it, and make a commit:

```bash
git init
git add index.html index.css index.js
git commit -m "Initial commit"
```

A commit is like a save point for your project. You add some content to the HTML file, tell Git to add the change, and make another commit:

```bash
code index.html # Make some changes...
git add index.html
git commit -m "Add boilerplate content to index.html"
```

Then you add some styles to it:

```bash
code index.css
git add index.css
git commit -m "Add styles to index.html"
```

You're not crazy about these styles so you undo the last commit:

```bash
git reset --hard HEAD~1
```

Now your code has the changes you've made to the HTML but not the changes you made to the CSS. It's like you ran undo on your previous change.

## Git Is Complicated

Git is a really powerful tool that can do much more than this example. Unfortunately, even beginner Git tutorials can get intimidating very quickly. It's OK to just memorize a couple of Git commands to get started. It's not necessary to have a clear mental model of how Git works to use it and you can always go deeper later.

## Git Is Not GitHub

[Git](https://git-scm.com/) is a open-source command-line tool that keeps track of different versions of your files. You can even use it on personal files and documents that never leave your computer. It's near-ubiquitous today, but its most prominent alternative is [Mercurial](https://www.mercurial-scm.org/). Git largely replaced [SVN](https://subversion.apache.org/), which was previously the most common version control system.

GitHub is a commercial product by Microsoft that stores Git repositories, manages access to them, and offers a suite of tools for enabling efficient collaboration on them. Its major competitors are [SalesForce](https://www.salesforce.com/)'s [Bitbucket](https://bitbucket.org/) and [GitLab](https://about.gitlab.com/).

You'll work with both tools, but even early on it's important to distinguish between them.

## Trivia

The [first commit](https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290) made to the Git codebase explains the origin of the name:

```
GIT - the stupid content tracker

"git" can mean anything, depending on your mood.

 - random three-letter combination that is pronounceable, and not 
   actually used by any common UNIX command.  The fact that it is a
   mispronunciation of "get" may or may not be relevant.
 - stupid. contemptible and despicable. simple. Take your pick from the 
   dictionary of slang.
 - "global information tracker": you're in a good mood, and it actually
   works for you. Angels sing, and a light suddenly fills the room. 
 - "goddamn idiotic truckload of sh*t": when it breaks

This is a stupid (but extremely fast) directory content manager.  It  
doesn't do a whole lot, but what it _does_ do is track directory
contents efficiently.
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Free Code Camp: Learn the Basics of Git in Under 10 Minutes](https://www.freecodecamp.org/news/learn-the-basics-of-git-in-under-10-minutes-da548267cc91/) | Free Code Camp's tutorial on basic Git |
| [Atlassian's Git Tutorials](https://www.atlassian.com/git/tutorials) | The strongest collection of Git tutorials available. Free, covering everything from beginning to advanced tutorials. |
| [Video: Learn Git in 15 Minutes](https://www.youtube.com/watch?v=USjZcfj8yxE) | Colt Steele's guide to Git |
| [Video: Git and GitHub for Beginners](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=143s) | FreeCodeCamp's guide to Git and GitHub |
| [Dangit, Git!](https://dangitgit.com/) | Plain-english guide to getting through different Git situations |
Git
Git Branch
Git Merge
Version Control
Git Commit
HTML File
GitHub
Mercurial
SVN
Bitbucket
Using one of your local Git repositories, create a new repo on GitHub and push to it.

* What makes Git repos resilient to loss or corruption?
* How do Git remote services like GitHub help with collaboration?
* What's the difference between `git clone` and `git init`?
* Why do you need to authenticate when pulling or pushing from GitHub?
* What's the difference between authenticating with SSH and authenticating with HTTPS?
* What's the difference between pushing and pulling?
* A remote repo has changes you don't have. Why do you need to pull these changes before you can push new ones?
* You accidentally add the wrong repo as the `origin`. How do you fix it?
# Git: Remotes

One of the most powerful aspects of Git is that everyone who has a copy of a repo not only has all of the files in the repo, but they all individually have a copy of all every previous version. That means if one person's copy of a repo is lost or broken, they can easily get a new one from anyone else who has a copy without losing anything. Services like GitHub, Bitbucket, and GitLab are primarily tools for a storing a copy of a repo that other developers can make their own copy of.

## Cloning

The most common way to get a copy of a repo is to clone it from a service like GitHub:

```bash
git clone git@github.com:githubtraining/example-basic.git
```

This will copy the repo from GitHub's computers to your computer. In this example, it will clone the repo into a folder called `example-basic` in your current directory.

Cloning a repository from a remote repo usually means authenticating somehow. If you clone a repo using GitHub's SSH option:

![GitHub cloning dialog](assets/github-1.png)

It will look for an SSH key in your `~/.ssh` directory to send with your clone request. If that key is connected to your GitHub account, GitHub will check to see if your account has permission to clone that repo. If it does, it will be copied to your computer.

![Cloning from GitHub on the CLI](assets/github-2.png)

Alternatively, if you clone a repo using GitHub's HTTPS option, it will ask you to enter your GitHub username and password. The SSH option makes working with GitHub much easier, but requires generating an SSH key and connecting it to your GitHub account. Follow these [instructions to connect with SSH](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).

## Adding a Remote

Instead of cloning a repo, you can make one locally with `git init` and push it to a service like GitHub:

```bash
git remote add origin git@github.com:githubtraining/example-basic.git
```

This enables you to push your copy of the Git repo to GitHub and pull GitHub's copy of the repo to your computer to get the latest changes. If you make a mistake (such as adding the browser URL instead of the `.git` URL), you can fix it with `set-url`:

```
git remote set-url origin git@github.com:githubtraining/example-basic.git
```

## Pushing

When you make new commits in your local repo, `git push` adds your new commits to the remote's copy of the repo:

```bash
git push origin master
Everything up-to-date

git add new-file-to-stage.md
git commit -m "Make a new commit"

git push origin master
[master 5de05dd] Make a new commit
 1 file changed, 6 insertions(+)
```

## Pulling

When someone else makes new commits and pushes them to a Git remote, you can add those changes to your local repo with `git pull`:

```bash
git pull origin master
Already up to date.
Current branch master is up to date.

# Someone else pushes a new change to GitHub:

git pull origin master
emote: Enumerating objects: 97, done.
remote: Counting objects: 100% (94/94), done.
remote: Compressing objects: 100% (89/89), done.
remote: Total 89 (delta 68), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (89/89), 44.67 KiB | 109.00 KiB/s, done.
From github.com:github-user/repo-name
```

## Pull Before Push

If the Git remote has commits that you don't have yet, you'll need to `git pull origin master` before you can `git push origin master`. This is because if there are any problems syncing the two copies, you'll need to resolve them on your computer before pushing remotely.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Git: Remotes](https://git-scm.com/docs/git-remote) | Git's official reference for remotes |
| [Git: Git Basics - Working With Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) | Git's official guide to remotes |
| [Atlassian: Git Syncing](https://www.atlassian.com/git/tutorials/syncing) | Atlassian's guide to Git syncing |
Git
Git Repository
GitHub
Bitbucket
GitLab
Git Clone
SSH
Authentication
SSH Key
HTTPS
`git init`
Git Push
Git Pull
Git Commit
Git Remote
Make a folder. Initialize it as a Git repository. Create two files inside the repository. Stage and commit them.

---

Clone this [GitHub repo](https://github.com/sikaeducation/mad-libs) to your computer. Open the files in your text editor and look at them. Make some changes, then stage and commit them.
* Describe what repositories are in your own words.
* You clone a repository from GitHub, then the repository is deleted from GitHub. What are the consequences of this?
* How do you create a new repository locally?
* How do you copy a project from GitHub?
* What makes a folder a Git repository?
* You make a Git repository inside of another Git repository. How can you fix it?
# Git: Repositories

A Git repository, or repo, is a folder that contains more than just files; it also contains every version of those files. Git offers many tools for inspecting those different versions, and even rolling back your files to one of them if necessary. Git does all of this very efficiently, so the file sizes of repos stay very small. This makes it feasible for everyone working with a repository to maintain a complete copy.

## Local Respositories

To make a local repository, run `git init`. This allows the `git` CLI program to run commands when you're in that folder:

![Workflow of creating a new Git repo](assets/new-git-repo.png)

Once a folder has become a Git repo, you can stage and commit files in it.

## GitHub Repos

If a repository already exists on GitHub, you copy it to your computer with `git clone`:

![GitHub repo overview](assets/github-1.png)

![Cloning a repo from GitHub](assets/github-2.png)

You can look at this code, make changes to it, or even use it as the basis for your own code without affecting the repository on GitHub that you cloned from.

It doesn't make a difference if a repository was started on your computer or on GitHub. Both places end up with a complete copy of the repository.

## Watch Out

* Technically, a Git repo is any folder that has a `.git` folder in it. Removing the `.git` folder removes the repository and its history, but leaves all the rest of the files in their current state.
* You may find that your repo includes files that you're not expecting it to, or you may find that something unexpected is a repository. This is often caused by having `.git` folders in more than one level of the same hierarchy.
  1. Run `ls -a` to see if you have a `.git` folder in your present directory
  2. If you do, run `rm -rf .git` to remove it
  3. Otherwise, run `cd ..` to move up a directory
  4. Repeat until you find a folder with a `.git` folder in it to remove

## Additional Resources

| Resource | Description |
| --- | --- |
| [Git: Getting a Git Repository](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository) | Git's guide to Git repositories |
| [Atlassian: Setting up a repository](https://www.atlassian.com/git/tutorials/setting-up-a-repositoryGit) | Atlassian's guide to Git repositories |
Git
Git Repository
State
Command Line
Command
Shell
Folder
Git Stage
Git Commit
* What does `git status` do?
* What does `git add -A` do?
* What's the difference between `git add -A` and `git add .`?
* What's the difference between `git add` and `git add -p`?
* What is staging?
* What is unstaging?
* How do you unstage a file?
* How do see which files have been staged?
* What does it mean for a file to be untracked?
* When would you not want to commit all of your local changes at once?
# Git: Staging

Staging is selecting a group of files you've created or changed and preparing to commit them.

## Seeing The Current Status

`git status` shows you which files in the current directly are untracked, modified, staged, or staged-but-with-new-modifications.

## Staging Bulk Changes

`git add -A` or `git add --all` will stage every change you've made in the entire repo since your last commit. This is a common choice.

## Staging Individual Files

You can also stage individual files by passing the filenames to the `git add`:

```bash
git add file-1.md file-2.md ../../file-3.md some-folder/another-folder/file-4.md
```

You can also use `git add .` to stage every change you've made in the current folder, including any subfolders.

## Staging Individual Hunks

A hunk is a contiguous section of a file that's been changed. You can review each hunk in file with the `-p` or `--patch` flag:

```
git add -p file-1.md
```

This will bring up a dialog for each hunk. Press `y` to stage it, `n` to ignore it.

## Unstaging

Unstage files by using `git reset file-name-goes-here`. You can unstage all changes since your last commit with `git reset` without any arguments. Note that this doesn't undo any changes in the files, it only moves them from staged to unstaged.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Git: Recording Changes to the Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) | Git's guide to staging |
| [Atlassian: Saving Changes](https://www.atlassian.com/git/tutorials/saving-changes) | Atlassian's guide to staging |
Git
Git Staging
Git Commit
`git status`
Subfolder
Dialog
Git Unstage
[Bcrypt Exercise](https://github.com/sikaeducation/bcrypt-practice)

---

### The Bomb and the General

In pairs:

You are in a room with an open door. The room you are in is a nuclear bunker with a computer that controls a nuclear detonation. It is your task to detonate the bomb on command ONLY if commanded to by the Army General Commander Chief and nobody else. You are allowed to discuss a plan with the Army General Commander Chief on the other side of the door before the door closes. After the door closes, you have no more contact with the outside world for the rest of your life. You are only allowed to get messages via a printer in your room. How do you ensure the message is from the Army General Commander Chief and not from someone masquarading as her?
* Why is it important to hash passwords in a database?
* What is a hashing algorithm?
* If an application stores a hash, how can they verify the original password that's sent back?
# Intro to Hashing

Imagine you're running a coat check at a celebrity gala. Celebrities want to store their valuables with you, but those valuables are a high-target theft item--even among people working the event. To complicate matters, the celebrities drop off their items but their assistants will likely be the ones picking them up. How can you tell who's authorized to pick up items for a particular celebrity?

A reasonable first step is having each celebrity set a password when they drop off their valuables. The problem is that everyone else working at the coat check can look up the passwords, which they would need to do to verify that someone gave the correct one. What keeps them from copying down a list of passwords and selling them to the highest bidder?

When Brad Pitt drops off his coat, he enters the password `soap`. If you substitute each letter in `soap` for the number of the alphabet it represents, you get `19 15 1 16`. If you sum those numbers, you get `51`. If you sum `5` and `1`, you get `6`. Using this formula--get the alphabetical position of each character and add them until you have one number left--you can reliably generate the number `6` from the password `soap`.

There are a lot of ways to get to `6`: `aaaaaa`, `cc`, and `thisisareallylongone` all turn into `6` using this formula. This means that even if you get access to the `6` stored in the computer, there's no way to reliably turn that back into `soap`. It's also statistically unlikely that someone will be able to just guess a password that turns into `6` with this formula on their first try, and close words like `soapy` or `soak` result in totally different numbers (`4` and `1`).

Taking an input and turning it into something that can be reliably checked but never reversed is called hashing.

## Hashing

If you wrote the letter-number-sum formula as code, it might look like this:

```js
function simpleHash(string){
  let hash = getLetterPosition(string)

  hash = string.split("").map(getLetterPosition).reduce(accumulate, 0)

  while (`${hash}`.length > 1){
    hash = `${hash}`.split("").reduce(accumulate, 0)
  }

  return hash
}
```

[Play with this code](https://codesandbox.io/s/hungry-margulis-27msn?file=/index.js)

This is called a hashing algorithm. It turns an input string into something statistically likely to be unique, but is otherwise irreversible. Hashing algorithms are an active area of math research and have many applications.

## Hashing Passwords

On the web, hashing is used to securely store passwords. When you create a new account on a website, it should hash the password and store it in a database. This way, if the database were ever compromised, the attacker would only have access to the hashes. However, if a user logs in with their password, that password can be rehashed and compared with the stored hash to verify the passwords match.

![Diagram of logging in with a password and comparing it to a hashed password](assets/logging-in.png)

## Hashing Algorithms

A great hashing algorithm has these characteristics:

* Make full use of all the available output space
* It should be impossible to recreate the original input from the output
* It should be impossible to intentionally create a target output
* Small changes in the input should result in big changes in the output

Some popular hashing algorithms include:

* **MD5**: A hashing algorithm that was popular in the 90's until it was was declared broken because ways to intentionally create hashes were discovered.
* **SHA1**: A hashing algorithm that succeeded MD5, until similar vulnerabilities were discovered. It's no longer used for security, but has some other modern applications, such as identifying Git commits.
* **bcrypt**: One of the most popular hashing algorithms in web security. By design, it can be made more or less secure at the cost of processing power. This has helped it adapt over time; as cracking computers get faster, so do consumer computers.

Other modern hashing algorithms include SHA2, SHA3, BLAKE, and more. Each comes with different strengths and weaknesses, which make make them suitable for different applications.

## Watch Out!

It's possible for more than one input to generate the same hash. For example, Brad Pitt's `soap` password results in a `6` using the simple hashing algorithm, but so does the letter `f`. The point of hashing isn't to make it impossible for anything but the given input to generate the hash, just statistically unlikely.

Real hashing algorithms are far more complex. For example, running `soap` through the bcrypt hashing function results in the hash `$2a$10$S56gg7sK8OWUqZN9fzoP7eVVYK1JpF1jYJch9vpiNf5paG.HR.xy2`. If you had 340,000,000,000,000,000,000,000,000,000,000,000,000 (that's 340 undecillion) users and every one of them had a unique password, there's still only a 50% chance that two of them would have the same password hash.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: Hash Functions](https://en.wikipedia.org/wiki/Hash_function) | Wikipedia's article on hash functions |
| [Wikipedia: Cryptographic Hash Functions](https://en.wikipedia.org/wiki/Cryptographic_hash_function) | Wikipedia's article on cryptographic hash functions |
| [Wikipedia: bcrypt](https://en.wikipedia.org/wiki/Bcrypt) | Wikipedia's article on bcrypt |
Hashing
Password Hash
Hashing Algorithm
MD5
SHA1
bcrypt
[Express App Deployment](https://github.com/sikaeducation/express-app-deployment)
* How does Heroku connect to a database different from the one on your local computer?
* How do you run migrations on a production database?
* How is `process.env.NODE_ENV` set?
## Heroku: Databases

Deploying an app to Heroku gives you a way to run the server publicly, but you still need a way to host databases. Luckily, Heroku also offers a database service.

## Adding Heroku Postgres

Go to the Heroku app you want to add a database to, then go to "Resources" -> "Add-ons" and search for "Heroku Postgres". Select the appropriate level of support (the default free database offers 10,000 rows and 1GB of space) and click "Submit Order Form." Your database will automatically be associated with your app, and an environment variable called `DATABASE_URL` will be added to your config vars.

![Heroku Postgres](assets/heroku-postgres.png)

## Migrating a Heroku Postgres Database with Knex

To run your production database migrations with Knex, run `heroku -a app-name-goes-here run knex migrate:latest`. You can likewise run `heroku -a app-name-goes-here knex migrate:rollback` to roll back a migration.

You typically don't run seeds on a production database since doing so involves dropping all of your existing data, but if you need to reset a database for demo purposes you can also run `heroku -a app-name-goes-here knex seed:run`.

## Querying a Heroku Postgres Database with Knex

The point of Knex is to abstract out your database logic from your specific database connection, so you shouldn't need to change any of the code in your app. You do need a `production` key in your `knexfile.js` though:

```js
module.exports = {
  development: {
    client: "pg",
    connection: "postgres:///some-local-database",
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  }
}
```

As long as your database connection is using `process.env.NODE_ENV` to determine the environment, it will connect to the Heroku Postgres database in production. This is because Heroku sets the `NODE_ENV` environment variable to "production" by default.

```js
// database-connection.js
const config = require("./knexfile")[process.env.NODE_ENV || "development"]
module.exports = require("knex")(config)
```

## Watch Out!

* Running migrations requires [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) to be installed and for `heroku login` to have been run.
* If your database works locally but not on Heroku, try logging the `config` variable in your `database-connection.js` file or equivalent to make sure that Heroku is trying to load the right Knex configuration.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Prisma: How to set up a free PostgreSQL database on Heroku](https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1) | Blog post on how to set up a Heroku Postgres database |
| [Heroku: Heroku Postgres Docs](https://devcenter.heroku.com/articles/heroku-postgresql) | Heroku's official docs on Heroku Posgres |
| [Knex: Client Configuration](https://knexjs.org/#Installation-client) | Knex's official docs on configuring clients |
| [Video: Setting up a Postgres database in Heroku](https://www.youtube.com/watch?v=OZQWfW3VvhE) | Video tutorial on Heroku Postgres deployment |
Heroku
Database
Deployment
Environment Variable
Database Row
Knex.js
PostgreSQL
Database Migration
Database Seed
Database Connection
When this button is clicked, log the date and time the button was clicked.

```html
<button>Click me!</button>
```
* When should the `<button>` tag be used?
* How do you execute JavaScript when a button is clicked?
# HTML: Buttons

Once you're comfortable working with the DOM and events, you can start using one of the most practical means of interaction: HTML buttons.

```html
<button id="agreement">Click to Agree to Terms</button>
```

```js
const agreementButton = document.querySelector("#agreement")
let isAgreed = false
agreementButton.addEventListener("click", event => {
  isAgreed = true  
})
```

The example defaults the `isAgreed` variable to `false` when the page loads, and whenever the `agreementButton` is clicked, that variable is set to `true`. This can be read by other functions to determine whether or not the document has been agreed to yet.

## Button Styling

Buttons have one of the more distinctive default browser styles:

![Styled HTML button](assets/html-buttons-1.png)

These are the properties you want to override to make butons look consistent across browsers:

* `padding`
* `border`
* `background-color`
* `color`
* `box-shadow`

Using this CSS:

```css
button {
  padding: 16px;
  border: none;
  background-color: hsl(240, 50%, 80%);
  color: hsl(240, 50%, 20%);
  box-shadow: 0 1px 3px hsl(240, 50%, 20%);
}
```

The same button will look like this:

![Styled HTML button](assets/html-buttons-2.png)

## Watch Out!

Semantics still matter with buttons. Many elements can look button-like (such as checkboxes and navigation links), but a `<button>` element is specifically for issuing commands.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) | MDN's reference on the `<button>` element |
HTML: `<button>`
DOM
DOM Event
Variable
Default Browser Style
CSS
HTML: Semantic Markup
HTML Element
# HTML: `<div>` and `<span>`

HTML is for structuring content. What does that mean? When content is unstructured, it doesn't follow any particular format. For example, an unstructured menu at a restaurant might look like this:

```
We serve cheese pizza ($9.99), you can add pepperoni for 2 bucks, and we serve salads starting at $5.
```

The same content might look like this with structure:

```html
<div>
  <div>
    <span>Cheese Pizza</span> - <span>$9.99</span>
  </div>
  <div>
    <span>Pepperoni Pizza</span> - <span>$11.99</span>
  </div>
  <div>
    <span>Salad</span> - <span>$5.00+</span>
  </div>
</div>
```

When content is structured you can target specific parts of it, which helps with styling and programming it.

## Block and Inline Content

The simplest and most generic way that content can be structured is categorizing it as either "block" or "inline."

### Block content

Content that would ordinarily take up an entire row when presented. Examples include headings and paragraphs.

```html
<div>A heading</div>
<div>An entire paragraph of content could go here</div>
```

### Inline content

Content that would ordinarily not break the flow of content when presented. Examples include emphasized text in a passage and links.

```html
<div>An <span>emphasized</span> heading</div>
<div>An entire paragraph of <span>linked content</span> could go here</div>
```

Inline content usually occurs inside of block content.

### `<div>` and `<span>`

Generic block content is represented in HTML by putting it in between `<div>` tags. `<span>` is used the same way for inline content.

HTML features over 100 tags that are reserved for specific purposes (including headings, paragraphs, emphasis, and links). When none of the existing tags are appropriate for your structure, `<div>` and `<span>` can be used as custom tags.

## Watch Out!

It's tempting to use `<div>` and `<span>` for everything in an HTML document, and many developers do exactly this. This is a bad practice for web development. As you learn more semantic tags, you should use those first and only use `<div>` and `<span>` when there aren't existing tags that are more appropriate.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) | MDN's reference on `<div>` |
| [MDN: `<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) | MDN's reference on `<span>` |
HTML
Structured Content
Unstructured Content
HTML: Block Element
HTML: Inline Element
CSS: Document Flow
HTML: `<div>`
HTML: `<span>`
HTML: Heading
HTML: `<p>`
Build a form that collects a first name, a last name, and logs them when submitted.

---

Constrain this form input to only positive numbers:

```html
<input type="number" name="age" />
```

---

Constrain this form input to only numbers over 18 and under 120:

```html
<input type="number" name="age" />
```

---

Manually create a dropdown featuring all 12 months

---

Manually create a dropdown featuring all 12 months, grouped by quarter.

---

Manually create a multiselect featuring all 12 months

---

Create an input that allows a user to select a month from a datepicker.

---

Create an input that allows a user to select a color.

---

Create a form that collects an email address and a comment.
* What is the purpose of a label?
* What connects a label to a form input?
* How do you prevent a form from submitting without a value being entered in an input?
* List 5 input types
* What is the purpose of a placeholder attribute?
* Compare and contrast `value` on an `<input />` with `value` on an `<option>`
* How do make an option unselectable in a dropdown or multiselect?
* How do you create a multiselect?
* How do you group related options in a dropdown or multiselect?
* A user is selecting from one of 3 options. What is the appropriate input type?
* A user is selecting from one of 10 options. What is the appropriate input type?
* Compare and contrast multiselects, dropdowns, checkboxes, and radio buttons
* When should a textarea be used over an input?
* Why isn't this form working?

```html
<form>
  <label for="first-name">First Name</label>
  <input id="first-name" />

  <label for="last-name">Last Name</label>
  <input id="last-name" />

  <input type="submit" value="Create Account" />
</form>
```

```js
const form = document.querySelector("form")
form.addEventListener("submit", event => {
  event.preventDefault()

  const newUser = new FormData(event.target)

  const firstName = newUser.get("first-name")
  const lastName = newUser.get("last-name")

  console.log(firstName, lastName) // undefined, undefined
})
```

* Why isn't this form working?

```html
<form>
  <label for="first-name">First Name</label>
  <input id="first-name" name="first-name" />

  <label for="last-name">Last Name</label>
  <input id="last-name" name="last-name" />

  <input type="submit" value="Create Account" />
</form>
```

```js
const form = document.querySelector("form")
form.addEventListener("submit", event => {
  event.preventDefault()

  const newUser = new FormData(event.target)

  const firstName = newUser.firstName
  const lastName = newUser.lastName

  console.log(firstName, lastName) // undefined, undefined
})
```

* What's wrong with this form?

```html
<form>
  <label for="first-name">First Name</label>
  <input name="first-name" />

  <label for="last-name">Last Name</label>
  <input name="last-name" />

  <input type="submit" value="Create Account" />
</form>
```
# HTML: Form Inputs

A form is a way to collect user input. What kinds of user input can you collect?

## `name` and `value`

The most important attributes of any type of form input are the `name` and `value` attributes. When a form is submitted, the data from the form will show up as key-value pairs. The `name` attribute determines the key, and what a use enters or selects will be the value. This HTML form:

```html
<form>
  <input type="text" name="full-name" value="Steve Gadd" />

  <select name="occupation">
    <option value="guitarist">Guitarist</option>
    <option value="drummer" selected>Drummer</option>
    <option value="trumpeter">Trumpeter</option>
  </select>
</form>
```

Will generate this data:

```js
{
  "full-name": "Steve Gadd",
  "occupation": "drummer"
}
```

For inputs, you can prepopulate the value to either give a default value or represent an existing value that you're prompting the user to update. Otherwise, you can leave it blank and it will be filled with whatever the user enters.

## Labels

All inputs in a form should be described with `<label>`s, for both accessibility and general user experience.

```html
<form>
  <label for="first-name">Please enter your first name to get started:</label>
  <input type="text" name="first-name" id="first-name" />
</form>
```

A `<label>`'s `for` attribute should match an input's `id` attribute. This will both help assistive technologies navigate the form, as well as making an interaction with the label focus the correct input.

![Clicking a label to focus an input](assets/label-to-focus.gif)

## `required`

To indicate that a form input is required for submission, add the attribute `required` to the element:

```html
<form>
  <input type="checkbox" id="acceptance" name="acceptance" required />
  <label>Do you accept the terms and conditions?</label>

  <input type="submit" value="Sign Me Up!" />
</form>
```

This will prevent the browser from submitting the form until the input has a value.

## Inputs

[Form Input Playground](https://codesandbox.io/s/charming-pike-426kj)

### Regular Input

These are some common HTML inputs types:

* **`text`**: Collects short-form text
* **`password`**: Collects short-form text and obscures it on the screen
* **`email`**: Checks that the text input is a valid email address
* **`url`**: Checks that the text input is a valid URL
* **`number`**: Collects a number
* **`range`**: Collects a lower bound and an upper bounder
* **`date`**: Select a date from a calendar
* **`time`**: Select a time
* **`month`**: Select a month from a calendar (doesn't work on all browsers)
* **`color`**: Select a color from a pallette (outputs the hex code for that color)

Note that you can add placeholder text to an input box to hint at the kind of content expected by adding a `placeholder` attribute:

```html
<form>
  <label for="full-name">Please enter your full name</label>
  <input type="text" id="full-name" name="full-name" placeholder="Eg. Miles Dewey Davis III, Sergio Santos Mendes" />
</form>
```

You can also add several attributes that constrain or validate input with attributes like `min`, `max`, and `pattern`.

### Long-Form Text

HTML `<input />` tags are for short-form text, like names, email addresses, and urls. For longer-form text (like blog posts, comments, and feedback fields), use `<textarea>`:

```html
<form>
  <label for="email">Email Address</label>
  <input id="email" type="email" name="email" />

  <label for="message">What would you like to tell us?</label>
  <textarea id="message"></textarea>
</form>
```

### Dropdowns

A user can select one item from a list of predefined choices with the `<select>` and `<option>` tags.

```html
<select name="service-level">
  <option value="standard">Standard</option>
  <option value="twoday">2 day</option>
  <option value="overnight">Overnight</option>
</select>
```

When the form is submitted, the key will be the `name` of the `<select>` (`service-level` in this example), the value will be the `value` of whichever option was selected.

You can also give an option a `disabled` attribute to make it unselectable (good for group labels), and you can give something the `selected` attribute to preselect it:

```html
<select name="service-level">
  <optgroup>
    <option disabled>This is free</option>
    <option value="standard" selected>Standard</option>
  </optgroup>
  <optgroup>
    <option disabled>These cost extra</option>
    <option value="twoday">2 day</option>
    <option value="overnight">Overnight</option>
  </optgroup>
</select>
```

Note that you can optionally group related options in a select together with `<optgroup>`.

### Radio Buttons

A radio button is also a way for a user to select one option from many, like a dropdown. It's frequently used when there are fewer options to choose from. A radio button is an `<input />` with a `type` of `radio` that shares a `name` with other `<input />`s:

```html
<form>
  <input type="radio" id="under-18" name="age" value="<18" />
  <label for="under-18">Under 18</label>
  <input type="radio" id="18-39" name="age" value="18-39" />
  <label for="18-39">18-39</label>
  <input type="radio" id="over-40" name="age" value=">40" />
  <label for="over-40">Over 40</label>
</form>
```

Note that:

* All 3 options have the same `name`
* The `value` attribute should be preset with what the value of this key/value pair should be if this option is selected
* The `<label>` is what the user will actually see on the screen and tells them what the option does if they select it

### Multiselect

A multiselect is like a dropdown, except it allows users to select more than one option:

```html
<select name="toppings" multiple>
  <option value="cheese" selected>Cheese</option>
  <option value="pepperoni">Pepperoni</option>
  <option value="black-olives">Black Olives</option>
  <option value="sausage">Sausage</option>
  <option value="green-peppers">Green Peppers</option>
  <option value="mushrooms">Mushrooms</option>
  <option value="anchovies">Anchovies</option>
</select>
```

The only thing this requires is adding the `multiple` attribute to the `<select>` tag.

### Checkboxes

A checkbox is a type of multiselect, and is frequently used if there are fewer than 7 options.

```html
<form>
  <input type="checkbox" name="terms-and-conditions" id="terms-and-conditions" />
  <label for="terms-and-conditions">Do you accept the terms and conditions?</label>

  <input type="checkbox" name="email-list" id="email-list" />
  <label for="email-list">Would you like to join our email list?</label>
</form>
```

## Watch Out!

* `<input />` is a self-closing tag, but `<textarea>` is not.
* A label's `for` attribute will match a form input's `id` attribute, not its `name`. `name`s are how JavaScript's `FormData` will access the values.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `<input />`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | MDN's reference on `<input />` |
| [MDN: The HTML input types`](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) | MDN's overview of input types |
HTML: `<form>`
HTML: Input Name
HTML: Input Value
HTML Attribute
HTML: `<label>`
HTML: `required` Attribute
HTML: Input Type
HTML: Input Placeholder Text
Input Validation
HTML: `<select>`
HTML: `<option>`
HTML: `disabled` Attribute
HTML: `multiple` Attribute
HTML: `<optgroup>`
HTML: `<textarea>`
DOM: `FormData`
* What are forms for in HTML?
* What goes in a form?
# HTML: Forms

A key element of interactive web pages is users being able to input their own information. Semantically, a `<form>` denotes an area that a user will submit information. For example:

* Creating an account
* Logging in
* Setting preferences or configuration settings
* Giving feedback
* Sending a message

## Form Structure

Most HTML tags can be used in forms, but they primarily consist of different kinds of form inputs, including:

* `<input />`
* `<textarea>`
* `<select>`

There are also other elements that show up on forms less often, such as `<output>` and `<keygen>`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) | MDN's reference on `<form>` |
| [MDN: Working With User Data](https://developer.mozilla.org/en-US/docs/Learn/Forms) | MDN's tutorial on forms |
HTML: Semantic Markup
Web Page
HTML: `<form>`
HTML: `<input />`
HTML: `<textarea>`
HTML: `<select>`
# HTML: Headings and Paragraphs

How do you give your HTML documents more structure? One of the easiest ways is marking different spaces with headings and text content within them as paragraphs. A heading is a block element that describes upcoming content. The primary heading for a document is an `<h1>`, and generally describes the purpose of this particular page on the website. Subsections within that use `<h2>`, `<h3>`, and so on. A paragraph is a block element for regular text content.

```html
<div>
  <h1>The History of Jazz</h1>

  <h2>Pre-20th Century</h2>
  <p>Content about pre-jazz goes here</p>

  <h2>1920-1940</h2>
  <p>Swing music</p>
  <h3>Louis Armstrong</h3>
  <p>Super influential</p>

  <h2>1940-1960</h2>
  <p>Bop</p>
  <h3>Charlie Parker</h3>
  <p>Bop</p>
  <h3>Dizzy Gillespie</h3>
  <p>Bop</p>
</div>
```

## Watch Out

* For an HTML document to be valid, headings have to be used in order. You can't use an `<h3>` if there isn't already a `<h2>` for the content being structured.
* "Headings" are not the same as the "head" (which is HTML content that should not render on the screen, like linked stylesheets) or "headers", which are a parts of a document that often contain titles and navigation and are often displayed at the top.
* There are only 6 semantic headings (`<h1>` through `<h6>`). There is no `<h7>` or greater.
* Documents are only supposed to have one `<h1>` tag per page.
* `<p>` tags don't need to be used for labels or things that aren't otherwise narrative content.

## More Resources

| Resource | Description |
| --- | --- |
| [MDN Documentation: Headings](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) | MDN's documentation of the heading elements. |
| [MDN Documentation: `<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p) | MDN's documentation of the `<p>` element. |
HTML: Heading
HTML: `<p>`
Structured Content
HTML: Text Content
HTML: Block Element
HTML: Inline Element
HTML: `<head>`
HTML: `<header>`
HTML: Semantic Markup
HTML: Document
# HTML: Images

Images serve a lot of purposes on websites. They illustrate complex ideas, they can be used for iconography, and sometimes they are even the primary content. How can you embed images in HTML pages?

## `<img>`

The oldest and most widely-used HTML tag for images is the `<img>` tag. It's a self-closing tag that has 2 required attributes: `src` and `alt`.

```html
<img src="hillside.jpg" alt="A view of a serene hillside" />
```

* The `src` attribute takes a URL or path to the image, the `alt` attribute describes what's in the image for screen readers.
* The `<img>` tag supports JPEGs, PNGs, SVGs, and many other kinds of image files.
* By default, `<img>` is treated as an inline element (this can be changed with CSS)

Good alt text is succinct. Include any text that's part of the image, unless that text is already in the page or part of a caption. Don't write "Image of", but indicating the type of image can be helpful, such as  "Portrait of". Basically, include things that are important to understanding why the image was used.

## The `<figure>` Tag

A figure is either an image with a caption, or an image that's being referenced in the text but could theoretically be moved to another part of the document or an appendix and still make sense. This is especially common with reference material.

The `<figure>` tag usually wraps an `<img>` tag, and often a `<figcaption>` too:

```html
<figure>
  <img src="bear.jpg" alt="A Grizzly Bear fishing in a stream" />
  <figcaption>Bears are excellent at fishing</figcaption>
</figure>
```

## The `<picture>` Tag

This is a newer element. It allows different images to be loaded based on different situations, such as:

* Needing browser support for a particular image format
* Saving bandwidth by serving different resolutions for different screen sizes
* Art direction, where different images are more artistically appropriate based on the scenario

```html
<picture>
  <source srcset="bear-full-res.jpg" media="(min-width: 800px)" />
  <img src="bear-min-res.jpg" alt="A Grizzly Bear fishing in a stream" />
</picture>
```

If no `<source>` is more appropriate or the `<picture>` tag isn't supported, the browser will fallback to the `<img>`.

## Watch Out!

* The only `<img>` tags that don't need `alt` text are purely decorative images, such as a fleur de lis.
* Images can get really large, which slows down page load. Using CSS to shrink an image does not actually make the file any smaller, so either only use images that are already the largest they'll need to be, or use the `<picture>` tag to load different images for different screen sizes.

## More Resources

| Resource | Description |
| --- | --- |
| [MDN Documentation: `<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) | MDN's documentation of the `<img>` element. |
| [MDN Documentation: `<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) | MDN's documentation of the `<picture>` element. |
| [MDN Documentation: `<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source) | MDN's documentation of the `<source>` element. |
| [MDN Image Format Guide](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types) | MDN's guide to selecting and using different image formats. |
| [MDN Responsive Image Lesson](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) | MDN's guide to making images responsive. |
| [MDN Documentation: `<figure>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) | MDN's documentation of the `<figure>` element |
| [MDN Documentation: `<figcaption>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption) | MDN's documentation of the `<figcaption>` element |
| [How to Write Good Alt Text](https://supercooldesign.co.uk/blog/how-to-write-good-alt-text) | Great article with examples of good and bad alt text |
| [Writing Good Alt Text](https://twitter.com/whykristenburns/status/1391108176695726085) | An outstanding series of Tweets identifying characteristics of good alt text |
HTML: `<img />`
Iconography
HTML Page
HTML: Self-closing Tag
JPEG
SVG
PNG
CSS
HTML: Alt Text
HTML: `<figure>`
HTML: `<figcaption>`
HTML: `<picture>`
HTML: `<source>`
Decorative Image
# Introduction to HTML

The most important file type on the web is the HTML document. JavaScript files, stylesheets, media, and other kinds of files we use on the web are brought into browsers through HTML documents. When you go to a site on the web with your browser, your browser requests an HTML file, and then follows the instructions in it to render it on your screen. HTML files tell your browser:

* What content is part of this page? Where should it show up?
* How should this content be described to machines, search engines, and assistive technologies?
* Are there are any images or other media to show?
* Are there any other files like stylesheets or script files needed to make to the page work?

The code you write in an HTML document answers all these questions.

## History

HTML was originally designed as a way for researchers to share their research papers with each other. HTML's uses grew to include people sharing content of all kinds with each other, and eventually became a software application platform. This history is why we call HTML pages "documents" and why so much of the syntax on the web is centered around marking up content.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | MDN's collection of resources on HTML |
| [Video: HTML Tutorial For Beginners](https://www.youtube.com/watch?v=qz0aGYrrlhU) | Programming With Mosh's guide to HTML |
HTML Document
JavaScript File
Stylesheet
HTML File
Browser
Assistive Technology
# HTML: Links

One of the core ideas behind the web is that it's a series of interconnected documents. How do these documents actually "interconnect"?

## The Anchor Tag

```html
<a href="filename-to-link-to-goes-here.html">Link text goes here</a>
```

The anchor tag is what links pages together. When you click or tap the text for an anchor tag, your browser requests the HTML file in your `href` attribute.

## Opening Links In a New Tab

You can open a link in a new tab by giving the `target` attribute a value of `_BLANK`:

```html
<a href="https://google.com" target="_BLANK">Click this to open Google Search in a new tab</a>
```

Use this very carefully. This can violate a user's expectations of how the link will work, and doesn't give them the option of opening it in the same tab. It is only appropriate to do this when:

* You're linking to an external site
* You clearly indicate that the link will open in a new tab

![Good and bad examples of external links](assets/link.png)

## Linking Within A Page

In addition to providing a URL, you can link to a fragment:

```html
<a href="#second-heading">Click this to go to the next line</a>

<h2 id="second-heading">Click the link above will scroll here</h2>
```

This will scroll the screen until the first element with a matching ID is at the top. It does not reload the page. You can also use it to load another HTML file and scroll to a specific ID:

```html
<a href="another-file.html#second-heading">Click this to go to the first element with an ID of "second-heading" in `another-file.html`</a>
```

## Watch Out!

When linking to a URL, note the following conventions:

* `<a href="https://google.com">` - Links to an external site
* `<a href="second-page.html">` - Links to a file called `second-page.html` in the same folder as this HTML file
* `<a href="./second-page.html">` - Links to a file called `second-page.html` in the same folder as this HTML file
* `<a href="pages/second-page.html">` - Links to a file called `second-page.html`, which it will look for in a folder called `pages`, starting in the same folder as this HTML file
* `<a href="/second-page.html">` - Links to a file called `second-page.html` in the folder where the server was started
* `<a href="/pages/second-page.html">` - Links to a file called `second-page.html`, which it will look for in a folder called `pages`, starting in the folder where the server was started

There are several attributes in HTML that take URLs as values, but the attribute names are different.

* `<link>` and `<a>` use `href`
* `<script>` and `<img>` use `src`

It's easy to confuse `<a>` with `<link>`. `<link>` is for attaching external files like stylesheets to the document, not for linking to another page.

## More Resources

| Resource | Description |
| --- | --- |
| [MDN Documentation: `<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) | MDN's documentation of the `<a>` tag |
| [MDN: Creating Hyperlinks](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks) | MDN's lesson on hyperlinks |
HTML: Document
HTML: Anchor Tag
HTML: Attribute
HTML: `<a>`
HTML: Anchor Target
HTML: Fragment
HTML: `<link>`
# HTML: Lists

How do you represent lists and collections semantically in HTML?

## List Syntax

There are two types of lists in HTML: Ordered and unordered. Their syntax is the same:

```html
<!-- Ordered -->
<ol>
  <li>First Item</li>
  <li>Second Item</li>
  <li>Third Item</li>
</ol>

<!-- Unordered -->
<ul>
  <li>First Item</li>
  <li>Second Item</li>
  <li>Third Item</li>
</ul>
```


By default, unordered lists render with numbers and unordered lists render with bullets. However, remember the most important part of semantic markup: It doesn't matter what it looks like, only what it means. Semantically, an ordered list is one where the order of the items is significant, like steps in a recipe. An unordered list is one where the order is not significant, like a list of product features. This also means that lists are appropriate in lots of situations where neither bullets nor numbers would necessarily be appropriate:

```html
<!-- A list of links -->
<nav>
  <ul>
    <li>
      <a href="news.html">News</a>
    </li>
    <li>
      <a href="products.html">Products</a>
    </li>
    <li>
      <a href="about.html">About Us</a>
    </li>
  </ul>
</nav>
```

```html
<!-- A list of products -->
<ul>
  <li>
    <div class="product">
      <h2>Tennis Balls</h2>
      <h2>$4.99</h2>
    </div>
  </li>
  <li>
    <div class="product">
      <h2>Golf Balls</h2>
      <h2>$9.99</h2>
    </div>
  </li>
  <li>
    <div class="product">
      <h2>Baseballs</h2>
      <h2>$5.99</h2>
    </div>
  </li>
</ul>
```

## Nesting Lists

To nest a list, start a new list inside of a list item:

```
<ul>
  <li>1</li>
  <li>
    <ul>
      <li>2.1</li>
      <li>2.2</li>
      <li>2.3</li>
    </ul>
  </li>
  <li>3</li>
</ul>
```

You can nest these as deeply as you need to, and you can mix and match `<ul>` and `<ol>` lists. Browsers will indent nested lists by default, and will also apply different bullets and numbering systems. These numbering systems can be customized with CSS using the `list-style-type` property.

## More Resources

| Resource | Description |
| --- | --- |
| [MDN Documentation: `<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) | MDN's documentation of the `<ol>` element |
| [MDN Documentation: `<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) | MDN's documentation of the `<ul>` element |
| [MDN Documentation: `<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) | MDN's documentation of the `<li>` element |
| [MDN: Styling Lists](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Styling_lists) | MDN's lesson on styling lists |
HTML: Semantic Markup
HTML: Ordered List
HTML: Unordered List
Syntax
Render
Browser
CSS
CSS: `list-style-type`
* How many `<main>` elements are allowed on a page?
* What should the `<aside>` element contain?
* Does a `<header>` need to go at the top of the page? Why or why not?
* How many `<header>` elements are allowed on a page?
* What's the difference between `<div>` and `<section>`?
* What is the semantic meaning of `<article>`?
# HTML: Structure Semantics

All of these tags were added in HTML5 and help divide up an HTML document into major sections.

## Macro Sectioning: `<header>`, `<main>`, `<footer>`

These are typically used to semantically break up a page (or piece of standalone content, like an article).

* A `<header>` typically contains site information and navigation
* A `<main>` typically contains the primary content for the page
* A `<footer>` typically contains legal information, navigation, and site maps

Not every page needs to use any or all of these.

## Structural Sectioning

There are a few major structural elements that frequently show up on pages, and can be semantically marked up.

* `<nav>` contains the primary navigation for a page
* `<aside>` contains "sidebar" content, that is related to the main content but not critical to it
* `<article>` denotes that something could be independently redistributable, meaning another site or aggregator could lift all of the markup for the article and have everything they need
* `<section>` breaks up a page into sections. This is a generic container, much like `<div>`, but can be distinguished by the fact that it generally has a heading.

## More Resources

| Resource | Description |
| --- | --- |
| [MDN Documentation: `<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) | MDN's documentation of the `<header>` element. |
| [MDN Documentation: `<main>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) | MDN's documentation of the `<main>` element. |
| [MDN Documentation: `<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) | MDN's documentation of the `<footer>` element. |
| [MDN Documentation: `<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav) | MDN's documentation of the `<nav>` element. |
| [MDN Documentation: `<aside>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) | MDN's documentation of the `<aside>` element. |
| [MDN Documentation: `<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) | MDN's documentation of the `<article>` element. |
| [MDN Documentation: `<section>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section) | MDN's documentation of the `<section>` element. |
| [Video: What Is HTML5 Semantic Markup?](https://www.youtube.com/watch?v=naha1DIHK4E) | Colt Steele's guide to semantic HTML |
| [Video: Designing in the Browser](https://www.youtube.com/watch?v=arMgwKY52Bs) | Google's guide to the semantic web, focus on accessibility |
HTML: Semantic Markup
HTML5
HTML: `<header>`
HTML: `<main>`
HTML: `<footer>`
HTML: `<nav>`
HTML: `<aside>`
HTML: `<section>`
HTML: `<div>`
Write an HTML document from scratch 10 times. After each time, compare it to this reference and make sure it matches:

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Title Goes Here</title>
    <meta charset="utf-8" />
  </head>
  <body>
  </body>
</html>
```

---

Correct all the problems with this HTML:

```html
<html>
  <head>
    <title>Miles Davis</title>
  </head>
  <body>
    <header>
      <h1>Miles Davis
      <p>Trumpeter, composer, bandleader</p>
      <main>
    </header>
      <section>
        <h2>Favorite Albums</h2>
        <ul><li>
          Kind Of Blue
        </li><li>
          Miles Smiles
        </li><li>
          Workin'
        </li></ul>
      </section>
    </main>
  </body>
</html>
```

## Question Bank

* How could this HTML be reformatted to improve readability?

```html
<span id="some-id" class="class-one class-two class-three" data-some-attribute="some attributes value" data-some-other-attribute="some other attributes value">Some Content</span>
```

---

Does this use conventional HTML style? Why or why not?

```html
<p>You want the <em>truth?</em> You can't handle the <em>truth!</p></em>
```

Does this use conventional HTML style? Why or why not?

```html
<p>You want the <em>truth?</em> You can't handle the <em>truth!</em></p>
```

Does this use conventional HTML style? Why or why not?

```html
<img src="image.jpg" alt="Image description">
```

Does this use conventional HTML style? Why or why not?

```html
<img src = "image.jpg" alt = "Image description" />
```

Does this use conventional HTML style? Why or why not?

```html
<div>
  <div><ul><li>Item 1</li><li>Item 2</li></ul></div>
</div>
```

Does this use conventional HTML style? Why or why not?

```html
<div>
  <div>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
</div>
```

Does this use conventional HTML style? Why or why not?

```html
<div>
  <div>
    <ul><li>
      Item 1
    </li><li>
      Item 2
    </li></ul>
  </div>
</div>
```

Does this use conventional HTML style? Why or why not?

```html
<div>
  <ul><li>
  Item One
</li><li>
  Item Two
</li>
</ul>
</div>
```

Does this use conventional HTML style? Why or why not?

```html
<p>Content goes here</p>
```

Does this use conventional HTML style? Why or why not?

```html
<p>
  Content goes here
</p>
```

Does this use conventional HTML style? Why or why not?

```html
<p>Content <strong>goes</strong> here</p>
```

Does this use conventional HTML style? Why or why not?

```html
<p>Content
  <strong>goes</strong>
  here
</p>
```

Does this use conventional HTML style? Why or why not?

```html
<p>
  Content
  <strong>
    goes
  </strong>
  here
</p>
```

Does this use conventional HTML style? Why or why not?

```html
< p >Some content</ p >
```

Does this use conventional HTML style? Why or why not?

```html
<div>Some content
  <p>Some other content
  <p>Yet another content
</p></p></div>
```

Does this use conventional HTML style? Why or why not?

```html
<Div>Some Content</Div>
```

Does this use conventional HTML style? Why or why not?

```html
<div>Some Content</div>
```

---

Which of these is more conventional? Why?

```html
<P>Some Content</P>
<p>Some Content</p>
```

Which of these is more conventional? Why?

```html
<div>Some Content</div>
<Div>Some Content</Div>
```

Which of these is more conventional? Why?

```html
<div>Some Content</div>
< div >Some Content</ div >
```

Which of these is more conventional? Why?

```html
<div class=" content ">Some Content</div>
<div class="content">Some Content</div>
```
* What is a:
  * Tag
  * Attribute
  * Self-closing tag
  * Doctype
* What is the `lang` attribute for in HTML?
* What happens if you don't close an HTML tag?
* What is the difference between the `<head>` and `<body>` tags in HTML? 
* What is the current version of HTML?
* What are the required elements in the `<head>` tag?
* What does the `<title>` tag do?
# HTML Syntax

The syntax for HTML follows some comparatively simple rules, but there's still lots of room for both style and error. HTML is a markup language, rather than a programming language. Programming languages are concerned with logic- what order things happen in, the circumstances under which they happen, and how often they should happen. Markup languages annotate or "mark up" content to indicate what content is and how it should be treated.

For example, something that looks like this in a browser:

![Rendered article](assets/html-from-browser.png)

Might be be marked up like this in HTML:

```html
<article>
  <h1>Ska’s New Generation Is Here To Pick It Up Pick It Up</h1>
  <img src="ska.jpg" alt="SkaTune Network's Jer jumping" />
  <p>A look at the new book In Defense Of Ska and a network of artists giving the oft-maligned genre a fresh burst of life</p>
</article>
```

## Anatomy of a tag

![HTML tag](assets/anatomy-of-a-tag-double.png)
![HTML tag](assets/anatomy-of-a-tag-single.png)

* **Tag name**: These indicate what a tag means
* **Attributes**: These are properties of a tag that either configure it or further describe it
* **Opening and closing tag**: Most tags have an opening and closing pair that wrap the content they describe. Any attributes go inside the opening tag.
* **Self-Closing tag**: Some tags don't have closing tags and close themselves

## Nesting

HTML tags with opening and closing tags can be nested:

```html
<ul>
  <li>Item One</li>
  <li>Item Two</li>
</ul>
```

## Anatomy of a Document

HTML files are called "documents" and have a required structure to them:

```html
<!doctype>
<html lang="en">
  <head>
    <title>Google Search</title>
    <meta charset="utf-8" />
  </head>
  <body>
    <!-- Page content all goes here -->
  </body>
</html>
```

* **`<!doctype html>`**: This declares the document is written in HTML5, rather than a previous version of HTML.
* **`<html lang="en">`**: All HTML content must go inside this. It also indicates the language of the content.
* **`<head>`**: This is for content that's not intended to show up on the page, such as linked JavaScript and CSS files and meta information about the document.
  * **`<title>`**: This is what name will show up in the browser tab.
  * **`<meta charset="utf-8" />`**: This indicates the character encoding for the document. No need to understand character encoding yet, just accept that it's a required element of the page for now.
* **`<body>`**: This is for content that is intended to show up on the page.

## HTML Style

Since HTML is whitespace-insensitive, you have flexibility over whether something goes on one line or multiple lines. Here are some recommendations:

By default, each new opening, closing, and self-closing tag should get its own line:

```html
<section>
  <img />
  <p></p>
  <img />
</section>
```

Opening and closing tags should be at the same level of indentation, and when a tag is nested instead of another is should move right one indentation level:

```html
<div>
  <section>
  </section>
</div>
```

When a tag has text content, it's OK to leave the opening and closing tags on the same line:

```html
<p>Paragraph content</p>
```

It's OK to leave inline text tags on the same line as the text:

```html
<p>Really <strong>important</strong> content</p>
```

If a tag has a lot of attributes, it's OK to put each attribute on its own line:

```html
<input
  id="some-id"
  class="some-class another-class"
  type="text"
  required
  min="5"
  max="100"
/>
```

HTML is case-insensitive, which means that `<article>`, `<ARTICLE>` and `<Article>` will all work. However, it is conventional to write your HTML tags all lowercase.

Indentation matters. While HTML is whitespace-insensitive (meaning that it ignores spaces and returns), inconsistent indentation makes it very difficult to read. For example, writing your code like this:

```html
<div><p>Some paragraph content here
  <img src="image.jpg" alt="An image" /></section>
```

Makes it difficult to tell that neither the `<p>` tag or the `<div>` tag were closed, and that the `</section>` closing tag doesn't have a matching opening tag. Rewritten like this:

```html
<div>
  <p>Some paragraph content here
  <img src="image.jpg" alt="An image" />
</section>
```

Both of these problems are easier to notice.

## Watch Out!

Self-closing tags can be written with or without the close `/`. In other words, `<img>` and `<img />` are both valid. This convention has an interesting history, but presently it is conventional to include the `/` on self-closing tags.

HTML attributes can be technically be enclosed in single or double-quotes. In other words, `<img src='image.jpg' />` and `<img src="image.jpg" />` are both valid. It conventional to use to double-quotes for all HTML attributes.

Since HTML is whitespace-insensitive, it's often technically valid to leave lots of whitespace around your markup, like this: `< img src = " image.jpg " / >`. It is conventional to keep everything "trimmed" and only use spaces to separate multiple attributes: `<img src="image.jpg" alt="image description" />`.

Be careful of typographer's quotes! Most word processing programs like Word and Google Docs will substitute the `"` and `'` characters for `“`/`”` and `‘`/`’` characters (look for the curls). These are called "typographer's quotes", and cannot be used for HTML attributes. Always write your code in a text editor, not in a word processor.

There are a lot of mistakes with HTML that your browser will automatically correct for you, such as leaving off closing tags or other required elements. This doesn't mean that these things aren't problems, it just means they aren't problems for that browser, yet. Not every browser corrects the same errors the same way, there's no guarantee that the way they fix them now will be the way they fix them later, and the fixes may hide other problems later in development.

Tags need to be opened and closed in order. This is not valid:

```html
<div>
  <p>Some content
  </div>
</p>
```

## History

XML is a generic data format that stores any structured data, like this:

```xml
<person>
  <first-name>Alice</first-name>
  <last-name>Baker</last-name>
</person>
```

HTML was heavily influenced by this. At one point, there was an attempt to reconcile this and make HTML a "subset" of XML (meaning all HTML would also be valid XML). This was eventually abandoned in favor the current version of HTML, HTML5.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Getting started with HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started) | MDN's tutorial introducing HTML |
| [What The Tag?](https://whatthetag.com/#/) | Tool for deciding which HTML tag to use |
| [Can Include](https://caninclude.glitch.me/) | Tool for validating which tags can be nested |
HTML
Syntax
Markup Language
Programming Language
Annotate
HTML: Tag Name
HTML: Attribute
HTML: Opening Tag
HTML: Closing Tag
HTML: Self-closing Tag
HTML File
HTML Document
Whitespace
Whitespace-insensitive
Indentation Level
Case-insensitive
Typographer's Quotes
Word Processor
Text Editor
XML
HTML5
# HTML: Text Semantics

Once you've found the correct semantic tag to categorize a piece of content, such as `<p>`, `<li>`, or `<footer>`, how do you further classify semantic content within that? How do you indicate that a piece of content is emphasized or otherwise has a special meaning?

## Common Inline Text Markup

### `<em>` and `<strong>`

`<em>` and `<strong>` are both used for emphasis. By default, browsers will render them as italic and bold respectively, but it's important to underscore that what something means is unrelated to how it appears in semantic markup. For example:

```html
<p>I don't know if that's what he <em>really</em> meant to say</p>
<p>This needs to stop <strong>right now!</strong>.</p>
```

You can make text italic or bold with CSS without using the `<em>` or `<strong>` tags, so reserve those tags for when they add something to the content.

### `<time>` and `<address>`

`<time>` is used for any kind of date or time in markup. Some common uses:

* The date an article was published
* The last time a piece of content was updated
* The date and time an event is occurring

`<address>` is used for locations and email addresses. Some common uses:

* The contact email address for an author
* The location of an event

For example:

```html
<article>
  <header>
    <h2>This is an important headline!</h2>
    <p>Published on <time datetime="2021-07-19">Monday</time> by <address><a href="https://twitter.com/user-name-here">@usernamehere</a></address></p>
  </header>
</article>
```

This indicates that the "Monday" in the byline can be referenced by a specific date (using the `datetime` attribute), and that the Twitter link is a way to contact the author.

### `<small>`

Used primarily for legal text and copyright notices. You can remember this by thinking of it as "the small print."

```html
<footer><small>©1997 Apple, Inc.</small></footer>
```

## History

Before HTML5, the most common inline text markup elements were `<b>` (for bold), `<i>` for (italic), and `<u>` (for underline). All three of those describe what text looks like, rather than what it is. All three elements are still present in HTML, but have new semantic meanings and are much less common.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Inline Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements) | MDN's article on how the internet works |
| [MDN: Text Fundamentals](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals) | MDN's tutorial on how the internet works |
| [MDN: HTML Text Basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Test_your_skills:_HTML_text_basics) | MDN's assessment on HTML text skills |
HTML: Semantic Markup
HTML: Inline Text Markup
HTML: `<em>`
HTML: `<strong>`
HTML: `<time>`
HTML: `<address>`
HTML: `<small>`
[Validate this HTML](https://github.com/sikaeducation/invalid-html) 
* What is HTML validation?
* List 3 reasons why HTML validation is important
# HTML Validation

HTML has a lot of rules, such as:

* You can't nest a `<p>` tag inside of another `<p>` tag
* Every `<li>` needs to have have a `<ul>` or `<ol>` as an immediate ancestor
* `<img>` tags need `src` and `alt` attributes
* Tags must be opened and closed in order

There are hundreds of these rules, and you're bound to make mistakes. How can you find out what they are so you can correct them?

## The W3C Validator

The W3C, the organization that manages the standards for HTML and CSS, runs a service that will tell you if an HTML document follows the rules.

[W3C HTML Validation Service](https://validator.w3.org/)

There are 3 ways to use the service:

* You can give it a public URL to check, which is ideal for deployed sites
* You can upload a file to check, which is ideal if your site is not deployed
* You can copy/paste HTML into it, which is ideal for checking shorter segments of HTML

When you get the validator service an HTML file, it will return a list of errors to correct.

## Watch Out!

When you make mistakes with HTML, most browsers will make an effort to figure out what you meant and render the file anyway. There are still plenty of reasons to make sure you have conforming HTML:

* Browsers might be covering up mistakes that will confuse you as you add to and modify the page
* You may be ignoring accessibility features that people using assistive technologies rely on to use your site
* Browsers may add changes in the future that break non-conforming HTML

Something looking correct is not a replacement for validating it.

## History

The [HTML standard](https://html.spec.whatwg.org/multipage/) is a comprehensive list of all the rules for valid HTML. This is the reference that anyone who makes a browser (such as Google, Mozilla, and Microsoft) can use to make sure that the HTML you write will work on their browser.

## More Resources

| Resource | Description |
| --- | --- |
| [W3C Documentation on Validation](https://www.w3.org/wiki/Validating_your_HTML?TB_iframe=true) | The official W3C wiki document on HTML validation |
HTML
Validation
Render
Assistive Technology
Diagram a proxied HTTP request.

---

Add the `cors` middleware to this Express app:

```js
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.get("/", (request, response) => {
  response.json({ message: "Hello, world!" })
})

app.listen(port, () => {
  console.log("listening here ", port)
})
```

Verify that it worked by examining the HTTP response headers for the "Access-Control-Allow-Origin" header.
* What does it mean for something to be on the same domain?
* What is CORS?
* What is the primary HTTP header that CORS uses?
* What is preflighting?
* What is proxying an HTTP request?
* Why would an HTTP request need to be proxied?
* Why shouldn't you use browser plugins that disable restrictions on cross-origin requests?
# HTTP: CORS

When a browser makes an HTTP request with something like `fetch`, by default it will only make that request to a URL on the same domain for security reasons. Ordinarily, that would restrict websites from using any third-party API or even APIs on different subdomains.

Meanwhile, APIs often need to restrict which sites can make requests to them. If another server is requesting data from the API the IP address can be blocked or throttled, but this strategy doesn't work with web clients. All an attacker needs to do to send a request from a new IP address is move to a different wifi hotspot. Luckily, there's a strategy that helps address both problems. Cross-origin resource sharing, or CORS, is a strategy where servers use HTTP headers to tell browsers that it's OK to load resources them.

## `Access-Control-Allow-Origin`

The `Access-Control-Allow-Origin` HTTP response header specifies one of two things:

* A specific domain, ideally matching the one that issued the request
* `*`, a wildcard indicating that any domain can make requests to that URL

To allow an HTTP request from a domain other than the one the API is on, one of those needs to match.

![HTTP response highlighting the origin and the Access-Control-Allow-Origin header](assets/cors-response.png)

## Preflighting

Before browsers make certain HTTP requests to another origin, they check to see if that request will be allowed. This is done with an HTTP request using the `OPTIONS` method, and it expects an `Access-Control-Allow-Origin` header with an appropriate value to be present on the HTTP response. If the browser gets such a response, it executes the original HTTP request. This strategy is called preflighting. Browsers preflight automatically, but to be successful API servers need to respond to `OPTIONS` requests in addition to the actual API requests.

![HTTP preflight request](assets/preflight.png)

## Proxying

If an API lacks the `Access-Control-Allow-Origin` header and you don't control the API, you'll need to proxy the request:

![Diagram of using an HTTP proxy server](assets/proxy-server.png)

1. A script on your site, `website.com`, makes an HTTP request to an API you control, `proxy.com`
2. `proxy.com` makes an HTTP request to `api.com`
3. `api.com` sends a response to `proxy.com` because `api.com` is a server, not a browser
4. `proxy.com` adds the `Access-Control-Allow-Origin` header to the response from `api.com` and sends the whole thing back to `website.com`
5. The script on `website.com` receives the response from `proxy.com` with the `Access-Control-Allow-Origin` header, which includes the data from `api.com`

## Watch Out!

* If you get an error saying something like `No 'Access-Control-Allow-Origin' header is present on the requested resource.`, it means the response was missing an `Access-Control-Allow-Origin` header that either specified the URL the request came from or the wildcard (`*`). This is also the case with the `OPTIONS` preflight request.

![Image of a cross-origin error](assets/cors-error.png)

* Do not install browser plug-ins that disables cross-origin restrictions. The browser's cross-origin restrictions protect you from a type of attack called Cross-Site Scripting, or XSS.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) | MDN's reference on CORS |
| [MDN: CORS Errors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors) | MDN's reference on CORS errors |
| [Authoritative Guide to CORS](https://www.moesif.com/blog/technical/cors/Authoritative-Guide-to-CORS-Cross-Origin-Resource-Sharing-for-REST-APIs/) | Blog post about CORS |
| [Express: CORS](http://expressjs.com/en/resources/middleware/cors.html) | Express's CORS middleware |
| [OWASP: CSS](https://owasp.org/www-community/attacks/xss/) | OWASP's guide to XSS attacks |
HTTP
CORS
`fetch`
API
Browser
HTTP Header
Access-Control-Allow-Origin
HTTP Request
HTTP Response
Wildcard
Domain
URL
Preflighting
Proxy Server
Download and install the tool [Insomnia](https://insomnia.rest/) or another suitable headless browser.

Using this endpoint: https://httpbin.org/anything

* Make a `GET` and a `DELETE` request
  * Verify that the request information in the HTTP Response body matches the HTTP Request Headers in Postman
* Send a JSON string in a `POST` request
  * Verify that the response information in the HTTP Response body matches the HTTP Response Headers in Postman

---

Download and install the tool [Insomnia](https://insomnia.rest/) or another suitable headless browser.

Using the Pokemon API: https://pokeapi.co/api/v2/pokemon

* Visit the Pikachu endpoint (https://pokeapi.co/api/v2/pokemon)
* Find Pikachu's first ability, "Shock"
* Visit the Shock endpoint listed in Pikachu's response
* Find Pikachu's second ability, "Lightning Rod"
* Visit the Lightning Rod endpoint listed in Pikachu's response
* Explain how you could combine these three HTTP responses in JavaScript to make one object with the details of Shock and Lightning Rod in the abilities array of the Pikachu object
* Write the code to do this

---

## HTTP Request Warmups

A good portion of your software career as a web developer will involve getting and sending HTTP requests. 

The goal of this warm-up series Will be to parse HTTP headers, and turn the given information into useful data stored within an object.

### Part One: GET

If making a GET request to Spotify searching for the the Artist by the name of Bob Dylan, something like the following GET request header will be generated:

```
GET /v1/search?q=bob%20dylan&amp;type=artist HTTP/1.1
Host: api.spotify.com
Cache-Control: no-cache
Postman-Token: e2f09f98-f8e0-43f7-5f0e-b16e670399e2
```

The first line contains 3 parts:

* the HTTP verb, 
* the path, 
* and the protocol.

The remaining lines are the rest of the header.

Given this information, your goal will be to write a function that will parse this data to return an object with key value pairs in the following structure:

```
{ headers:
   { Host: ' api.spotify.com',
     'Cache-Control': ' no-cache',
     'Postman-Token': ' e2f09f98-f8e0-43f7-5f0e-b16e670399e2' },
  verb: 'GET',
  path: '/v1/search?q=bob%20dylan&amp;type=artist',
  protocol: 'HTTP/1.1' }
```

When the the header is passed to your function for any of these exercises, it will be a single string.

#### Starter Code

```js
const inputString = "GET /v1/search?q=bob%20dylan&amp;type=artist HTTP/1.1\nHost: api.spotify.com\nCache-Control: no-cache\nPostman-Token: e2f09f98-f8e0-43f7-5f0e-b16e670399e2";

const parseRequest = function (inputString) {
  //1. Change this http request into a string (add \n) so we can break it into pieces - replace spaces with \n
  //2. Need an empty request object to fill up
      //const request = {};
  //3. Need an empty request headers object
      //const request.headers = {};
  //4. Need to make each line into an array
      //split on \n
  //5. Split out GET request (1st array) by spaces
      //split on ' '
      //creates new array with method, path, and protocol
  //6. Take request object and set keys with values equal to the index of the value in the array:
    // - headers
    // - verb
    // - path
    // - protocol
  //7. Loop through the last 3 arrays (var i =1 since we already took care of the first array/line) in lineArray
  //8. Set a variable for current line
  //9. Split the line on : to get key value pairs
  //10. Set key from array[0]
  //11. Set value from array[1]
  //12. Add key to request.headers object and set value equal to value variable

// console.log(inputString);

    const request = {};
    request.headers = {};
    const lineArray = inputString.split('\n');
    // console.log(lineArray);
    const firstLine = lineArray[0].split(' ');
    // console.log(firstLine);
    // console.log(request);
    request.verb = firstLine[0];
    // console.log(request);
    request.path = firstLine[1];
    // console.log(request);
    request.protocol = firstLine[2];
    // console.log(request);

    for (let i = 1; i < lineArray.length; i++){
      // console.log(lineArray[i]);
      const currentLine = lineArray[i];
      // console.log(currentLine);
      const currentKeyValuePair = currentLine.split(':');
      // console.log(currentKeyValuePair);
      const key = currentKeyValuePair[0];
      // console.log('key', key);
      const value = currentKeyValuePair[1];
      // console.log('value', value);
      console.log(request.headers);
      request.headers[key] = value;
    }
    // console.log(request);
  return request;
}

parseRequest(inputString);
```

### Part Two: POST

If making a POST request to some api (Spotify in this case), something like the following POST request header will be generated (note that in practice the POST path will contain more information than in this simplified example). If making a POST request, something like the following POST request will be generated:

```
POST /v1/ HTTP/1.1
Host: api.spotify.com
Cache-Control: no-cache
Postman-Token: f6741a35-c20f-3051-e3f9-301904256b3f
Content-Type: application/x-www-form-urlencoded

fish=catfish&dog=dogfish
```

The line after the space in the example is the body of the POST request.

Modify your earlier function to determine if the string passed as a parameter is a GET or a POST request. 

* If it is a GET request, do the same behavior as listed in part one.
* If it is a POST request, add a body object as a value in your response object with a key of body. 
* In that body object, list all the key value pairs passed in the body of the input string.
* If POST, output from above example should be:

```
{ headers:
   { Host: ' api.spotify.com',
     'Cache-Control': ' no-cache',
     'Postman-Token': ' f6741a35-c20f-3051-e3f9-301904256b3f',
     'Content-Type': ' application/x-www-form-urlencoded' },
  verb: 'POST',
  path: '/v1/search?q=bob%20dylan&amp;type=artist',
  protocol: 'HTTP/1.1',
  body: { fish: 'catfish', dog: 'dogfish' } }
```

#### Starter Code

```js
const parseRequest = function (inputString) {
  return;
}
```

### Part Three: Query

Now let's start working with a query string! Taking a previous example where something like the following POST request header is generated, pull also pull out the query string into a seperate key/value pair inside the returned object.

If making a POST request, something like the following POST request will be generated:

```
GET /v1/search?q=bob%20dylan&amp;type=artist HTTP/1.1
Host: api.spotify.com
Cache-Control: no-cache
Postman-Token: f6741a35-c20f-3051-e3f9-301904256b3f
Content-Type: application/x-www-form-urlencoded

fish=catfish&dog=dogfish
```
The parts after the ? in the path are the query parameters

Modify your earlier function to determine if the string passed as a parameter contains a query string. 

* If the path contains a query string, grab each key/value pair being queried and add those to a query property inside the response object.

```
{ headers:
   { Host: ' api.spotify.com',
     'Cache-Control': ' no-cache',
     'Postman-Token': ' f6741a35-c20f-3051-e3f9-301904256b3f',
     'Content-Type': ' application/x-www-form-urlencoded' },
  verb: 'POST',
  path: '/v1/search?q=bob%20dylan&amp;type=artist',
  protocol: 'HTTP/1.1',
  query: { q: 'bob%20dylan', type: 'artist' },
  body: { fish: 'catfish', dog: 'dogfish' } }
```

#### Starter Code

```js
const parseRequest = function (inputString) {
  return;
}
```

### Tests

```js
const partOne = require('../partOne').parseRequest
const partTwo = require('../partTwo').parseRequest
const partThree = require('../partThree').parseRequest
const expect = require('chai').expect 


describe ('GET HTTP function', function() {
  it ('should when given a HTTP input string, return a properly formatted object' , function() {
    const str1 = "GET /v1/search?q=bob%20dylan&amp;type=artist HTTP/1.1\nHost: api.spotify.com\nCache-Control: no-cache\nPostman-Token: e2f09f98-f8e0-43f7-5f0e-b16e670399e2";
    const str2 = 'GET /api/v2/ability/4/ HTTP/1.1\nHost: pokeapi.co\nCache-Control: no-cache\nPostman-Token: b98466a7-6222-a4b5-dec3-1af3e4f866da'
    expect(partOne(str1)).to.eql(
      { 
      headers:
           { Host: ' api.spotify.com',
             'Cache-Control': ' no-cache',
             'Postman-Token': ' e2f09f98-f8e0-43f7-5f0e-b16e670399e2' },
      verb: 'GET',
      path: '/v1/search?q=bob%20dylan&amp;type=artist',
      protocol: 'HTTP/1.1' 
      }
    );
    expect(partOne(str2)).to.eql(
      { 
      headers:
         { Host: ' pokeapi.co',
           'Cache-Control': ' no-cache',
           'Postman-Token': ' b98466a7-6222-a4b5-dec3-1af3e4f866da' },
      verb: 'GET',
      path: '/api/v2/ability/4/',
      protocol: 'HTTP/1.1' 
      }
    );
  });
});

describe ('POST HTTP function', function() {
  it ('should when given a HTTP input string, return a properly formatted object' , function() {
    const str1 = "POST /v1/search?q=bob%20dylan&amp;type=artist HTTP/1.1\nHost: api.spotify.com\nCache-Control: no-cache\nPostman-Token: f6741a35-c20f-3051-e3f9-301904256b3f\nContent-Type: application/x-www-form-urlencoded\nfish=catfish&dog=dogfish";
    const str2 = 'POST /api/v2/ability/4/ HTTP/1.1\nHost: pokeapi.co\nCache-Control: no-cache\nPostman-Token: 80c0c09f-f995-fdb1-1d3a-9255c6842ff9\nContent-Type: application/x-www-form-urlencoded\nWhat...is+your+name%3F=Sir+Lancelot+of+Camelot.&What...is+your+quest%3F=To+seek+the+Holy+Grail.&What...is+your+favorite+color%3F=Blue.&Bridgekeeper=Right%2C+off+you+go.'

    expect(partTwo(str1)).to.eql(
      { headers:
         { Host: ' api.spotify.com',
           'Cache-Control': ' no-cache',
           'Postman-Token': ' f6741a35-c20f-3051-e3f9-301904256b3f',
           'Content-Type': ' application/x-www-form-urlencoded' },
        verb: 'POST',
        path: '/v1/search?q=bob%20dylan&amp;type=artist',
        protocol: 'HTTP/1.1',
        body: { fish: 'catfish', dog: 'dogfish' } }
    );

    expect(partTwo(str2)).to.eql(
      { headers:
         { Host: ' pokeapi.co',
           'Cache-Control': ' no-cache',
           'Postman-Token': ' 80c0c09f-f995-fdb1-1d3a-9255c6842ff9',
           'Content-Type': ' application/x-www-form-urlencoded' },
        verb: 'POST',
        path: '/api/v2/ability/4/',
        protocol: 'HTTP/1.1',
        body:
         { 'What...is+your+name%3F': 'Sir+Lancelot+of+Camelot.',
           'What...is+your+quest%3F': 'To+seek+the+Holy+Grail.',
           'What...is+your+favorite+color%3F': 'Blue.',
           Bridgekeeper: 'Right%2C+off+you+go.' } }
    );
  })
})

describe ('QUERY HTTP function', function() {
  it ('should when given a HTTP input with a query string, return a properly formatted object' , function() {
    const str1 = "POST /v1/search?q=bob%20dylan&amp;type=artist HTTP/1.1\nHost: api.spotify.com\nCache-Control: no-cache\nPostman-Token: f6741a35-c20f-3051-e3f9-301904256b3f\nContent-Type: application/x-www-form-urlencoded\nfish=catfish&dog=dogfish";

    expect(partThree(str1)).to.eql(
    { headers:
       { Host: ' api.spotify.com',
         'Cache-Control': ' no-cache',
         'Postman-Token': ' f6741a35-c20f-3051-e3f9-301904256b3f',
         'Content-Type': ' application/x-www-form-urlencoded' },
      verb: 'POST',
      path: '/v1/search?q=bob%20dylan&amp;type=artist',
      protocol: 'HTTP/1.1',
      query: { q: 'bob%20dylan', type: 'artist' },
      body: { fish: 'catfish', dog: 'dogfish' } }
    );
  })
})
```
* What is HTTP?
* What does HTTP stand for?
* Why doesn't the browser just send JavaScript objects?
* What happens if an HTTP request doesn't get a HTTP response?
* What are the parts of an HTTP request?
* What are the parts of an HTTP response?
* What language is HTTP?
* What's an HTTP method?
* What are the key-value pairs in an HTTP request called?
* What are 2 headers that you might see on an HTTP request?
* What are 2 headers that you might see on an HTTP response?
* When you request an HTML file from a server, how does that HTML file get to the browser?
* When you get data back from a server, where does the data go?
* Which HTTP requests generally have bodies?
* Which HTTP requests generally don't have bodies?
* Which HTTP responses generally don't have bodies?
* If an HTTP response contains JSON, how can a non-JavaScript language understand it?
## Intro to HTTP

When you request files on the internet or request data from an API, what is the browser actually sending? HyperText Transfer Protocol, or HTTP, is a format for sending and receiving messages over the internet. One computer, called the client, sends a message to another computer on the network called the server. Every request is expected to have a matching response to be considered complete. HTTP is language-agnostic, meaning that JavaScript can send an HTTP request that is received by a Ruby server, which can then generate a request that is sent to a Java server, and so on. HTTP can be thought of as a neutral format that most programming languages can read and write.

![Diagram of HTTP request](assets/http-request.png)

## HTTP Requests

An HTTP request looks like this:

```
GET / HTTP/1.1
Host: localhost:8080
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Pragma: no-cache
Cache-Control: no-cache
TE: Trailers
```

It's not important to understand every line of HTTP requests, but there are a couple of areas worth highlighting:

### Methods

`GET` is the "method" of this HTTP request. Methods are verbs that describe what you would like to do to the resource at the URL:

* `GET` - Read
* `POST` - Create
* `PUT` or `PATCH` - Update
* `DELETE` - Delete

When you're requesting HTML, CSS, and JavaScript files, your HTTP requests are all using the `GET` method. When working with APIs, sometimes you're also creating, updating, or deleting data, hence the need for other methods.

### URLs and Paths

The example HTTP Request is requesting the document at the root (`/`) of the domain `localhost:8080`. It could also be requesting the data at `/api/v2/pokemon/pikachu` from the domain `pokeapi.co`. Part of the HTTP process is looking up the IP address for the domain.

### Headers

The rest of the HTTP request is key/value pairs, which are called headers. Headers can do things like:

* Tell the server what kind of browser you're using, including whether you're on a mobile device
* Send secret keys that authorize you to get protected data
* Tell the server what kind of capabilities your browser has so the server can send the response in a format your browser understands
* What language you would prefer if multiple options are available
* Some custom data specific to your application

If the server is written in JavaScript, the headers might be parsed into a JavaScript object when received:

```js
{
  "Host": "localhost:8080",
  "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Encoding": "gzip, deflate, br",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  "Pragma": "no-cache",
  "Cache-Control": "no-cache",
  "TE": "Trailers",
}
```

The server can use this data to help generate its response. For example, the request might specify a particular language or format to be used, including authorization credentials, or specify what kinds of compression or encoding the browser understands.

### Body

If the HTTP request is adding data (such as creating a new user), it may also include that data in the HTTP request:

```
POST /users HTTP/1.1
Host: localhost:8080
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0
Accept: application/json,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Pragma: no-cache
Cache-Control: no-cache
TE: Trailers

{"username": "usernamegoeshere", "password": "s3cr3t"}
```

In this example, `{"username": "usernamegoeshere", "password": "s3cr3t"}` is the request body.

## HTTP Responses

An HTTP response looks like this:

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=3600
Content-Length: 106

<!doctype html><html><head><title>Website Name here</title></head><body><h1>Hello World!</h1></body><html>
```

Like requests, there a couple of parts worth knowing.

### Status

The status code indicates the general success or failure of the request.

### Headers

HTTP Responses have headers, and they work the same way as HTTP Request Headers. They might indicate:

* The data type the browser should treat the data in the body as
* How many characters the body has (so you can check to see if you got all of it)
* If the browser should store any data for future requests it makes (these are called cookies)
* How long the data being sent should be considered valid so the browser knows how long it can cache the data for

### Body

If the HTTP request was for a file, such as an HTML, CSS, JavaScript, or media file, the body contains the contents of that file. If the HTTP request was for data, the body contains the data that was requested, often formatted as JSON or XML.

## Watch Out!

* Just because it's called an "HTTP Request" doesn't mean that you always receive data in the response. For example, a `DELETE` request generally doesn't have a body in its HTTP response. "Request" in this sense just means that you're asking the server to do something, not necessarily send you data.
* `GET` requests generally don't have HTTP request bodies but do get HTTP response bodies. `POST`, `PUT`, and `PATCH` requests generally have both request and response bodies. `DELETE` requests generally have neither.
* HTTP requests and responses are untyped. That means there's no concept of objects, arrays, booleans, or strings- it's just a bunch of characters that are arranged in a particular pattern. It's up to the clients and servers to interpret the data in them as appropriate.
* HTTP requests were originally sent in plain text, meaning other computers like the router or the ISP could see all the data inside of them. The more secure variant of HTTP called HTTPS encrypts the body and headers of the request so that only the client and server know what's in them. These protocols are otherwise identical, and are both commonly referred to as HTTP.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) | MDN's collection of tutorials and references on HTTP. |
| [Video: HTTP Crash Course and Exploration](https://www.youtube.com/watch?v=iYM2zFP3Zn0) | Traversy Media's guide to HTTP |
HTTP
API
Internet
Client
Network
Server
JavaScript
HTTP Request
HTTP GET
HTTP POST
HTTP PUT
HTTP PATCH
HTTP DELETE
HTML
CSS
JS
HTTP Method
Key/Value Pair
Secret Key
Browser
HTTP Header
HTTP Request Header
HTTP Response Header
Authorization Credential
Compression
Encoding
HTTP Response
HTTP Status Code
HTTP Status Message
Data Type
Cookie
HTTP Body
Cache
JSON
XML
Object
Array
Boolean
String
Plain Text
Router
ISP
HTTPS
Encryption
Protocol
Using this list of the official [HTTP status codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) and any other resources, build a table that describes each one. Each status code should include:

* Status code
* Status message
* A description in your own words of when this status code should be used
* What is a status code?
* What is a status message?
* What is the range for success status codes?
* What is the range for error status codes?

For each of the following status codes, recall its status message and meaning:

* 200
* 201
* 204
* 301
* 304
* 400
* 401
* 403
* 404
* 500
# HTTP: Status Codes

One of the most useful parts of an HTTP response is its status. Each status has a number and a message that characterizes the nature of the response. Some examples:

* **`200 OK`**: The HTTP request was successful
* **`201 Created`**: The HTTP request was successful and created something new on the server
* **`400 Bad Request`**: The HTTP request was formatted incorrectly
* **`401 Unauthorized`**: The HTTP request was missing authorization credentials
* **`403 Forbidden`**: The HTTP request had authorization credentials, but they were insufficient
* **`404 Not Found`**: The HTTP request was for something that doesn't exist
* **`500 Internal Server Error`**: The HTTP request was fine but the server couldn't handle it

There are broad categories of status codes:

* **`1xx`**: General information
* **`2xx`**: Indicates that the response was generally successful.
* **`3xx`**: Indicates that the response was redirected
* **`4xx`**: Indicates that there's a mistake in the request
* **`5xx`**: Indicates that the server received the request but threw an error trying to fulfill it.

The `00` codes (`100`, `200`, `400`, `500`) are generic, and are used if a more specific code isn't available. For example, `400` means that there was something wrong with the request, `404` specifically means that request was for something that doesn't exist.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) | MDN's status code reference. |
| [Video: Learn HTTP Status Codes in 10 Minutes](https://www.youtube.com/watch?v=wJa5CTIFj7U) | Web Dev Simplified's guide to HTTP status codes |
HTTP Status Code
HTTP Response
HTTP 200
HTTP 400
HTTP 401
HTTP 403
HTTP 404
HTTP 500
HTTP 100-class Status Codes
HTTP 200-class Status Codes
HTTP 300-class Status Codes
HTTP 400-class Status Codes
HTTP 500-class Status Codes
Use Insomnia to explore the [Numbers API](http://numbersapi.com/#42)
* Why can't you just test APIs in a browser?
* How does API testing help with debugging?
# Debugging APIs With Insomnia

A normal browser can only make `GET` requests to URLs. Futhermore, they can't modify the headers, cookies, body, or any other aspect of the request. The only way to inspect the response of a request is through the dev tools, and everything you see may be subject to interference from browser plugins. This makes browsers a poor tool for inspecting and testing APIs, which need much more flexibility. Insomnia is a tool for crafting detailed HTTP requests and examining the responses, which makes it indispensible for testing APIs.

## Installing Insomnia

[Download and run the installer](https://insomnia.rest/download)

### Making Requests With Insomnia

1. Open Insomnia
2. Press `control`/`command`+`N` or press the `+` icon to start a new request
3. Give the request a label. Note that the method and any other options are modifiable in the interface after you make the request.
3. Design your HTTP request:
  * Method
  * URL
  * Body
  * Authorization tokens
  * Headers
  * Query String
4. Press "Send"
5. Inspect the response. The pane on the right will allow you to view the response body as rendered HTML, raw data, or formatted raw data. Additionally, you can inspect the status code and message, HTTP response headers, and any cookies that would be set by the response.

![Insomnia interface](assets/insomnia.png)

## Using Insomnia to Debug

A core aspect of debugging is removing as many variables as possible. If you're debugging a full-stack app, your first move should be figuring out whether the problem is happening on the front-end or back-end. A great way to do this is to design a request in Insomnia that you think should generate a particular response. If you're unable to generate the response you're expecting, the problem is likely on the back-end. If you are able to generate the response you're expecting, you need to figure out a way to generate a request on the front-end that matches the one you generated with Insomnia. You can use the browser dev tools to compare URLs, headers, etc. with your Insomnia request.

Note that you can also debug back-ends with Insomnia, verify that particular code paths are being exercised, etc. For more than one-off debugging, you'll benefit more from an API testing library like [SuperTest](https://www.npmjs.com/package/supertest) or a full API spec generator like [Swagger](https://swagger.io/).

## Watch Out!

When sending a JSON body, make sure you're formatting the body as JSON, not a JavaScript object. That means quoted keys, double-quotes for keys and string values, no trailing commas.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Insomnia](https://insomnia.rest/) | Insomnia, a headless browser |
| [Getting Started With Insomnia](https://support.insomnia.rest/article/157-getting-started-with-insomnia) | Official guide to getting started with Insomnia |
Debugging
API
Insomnia
HTTP GET
Browser
URL
Cookies
HTTP Body
HTTP Response
HTTP Request
HTTP Method
HTTP
Authorization Token
HTTP Header
Query String
HTML
HTTP Status Code
HTTP Status Message
Browser Dev Tools
JSON
## Network Diagram

In a group:

* Identify everyone's computers' IP address on your local network.
* Identify the IP address of your local network on the internet.
* Identify the IP address of 3 public websites.
* Make a diagram with:
  * Everyone's individual IP addresses
  * The network's IP address
  * Indicate how the network connects to the ISP
  * Show how the IP addresses of the 3 websites connect to your network

---

## Remote Login

Use SSH to login to your computer from another computer on your network.
* What is an IP address?
* Describe the internet in your own words.
* What is an ISP?
* How can one computer send a message to another computer on the same network?
* How can one computer send a message to another computer over the internet?
# Introduction to The Internet

While you probably use the internet every day, how much do you know about what the internet actually is and how it works?

## Networks

A network is a group of computers that can communicate with each other. They may be able to send each other files, messages, or commands; You can even log into one computer from another over a network. Each computer on a network has an address, called an IP address, that allows other computers to indentify it. This works just like a mailing address.

```bash
scp 192.168.0.105/some-file.txt .
```

This command copies a file from a computer on the network (which is called the remote computer) to the computer that's running the command (which is called the local computer).

Computers have been networked together for a long time. Originally, they were wired together in labs, then offices, then wired in homes, and then wirelessly. Any devices in your home or office that use the same internet connection are probably on the same network.

## The Internet

The internet is a network of networks. If a network is a group of computers that can communicate with each other, an internet is a group of networks that can communicate with each other. It works in much the same way an individual network does: Each network is given an IP address, and those networks can send each other files, messages, and commands.

Your IP address comes from your internet service provider, which is also called an ISP. Whenever you request a web page or do anything on the internet, your network makes a request to another network through your ISP:

![Private networks communicating over public networks](assets/internet-communication.png)

Your home network is connected to the public internet via your router, which has an private IP address on your private network and a public IP address that identifies it to other computers on the network.

## Watch Out!

* Your computer has an IP address on your network, and your network has an IP address on the internet. The two address are not related.
* Your computer can send a message to a network on the internet, but you can't send it to a specific computer on that network. It's that network's job to figure out which of its computers should handle a particular request.

## History

The internet was originally a US military project called ARPANET. It was later opened up to universities and researchers to help people share research, and around 1989 it was opened for commercial use. That coincided with Tim Berners-Lee's creation of the web around the same time, which began the internet as we know it today.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: How the Internet Works](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work) | MDN's article on how the internet works |
| [Wikipedia: Internet](https://en.wikipedia.org/wiki/Internet) | Wikipedia article on how the internet works |
| [Video: What is the Internet?](https://www.youtube.com/watch?v=Dxcc6ycZ73M) | Code.org's guide to the internet |
| [Video: IP addresses and DNS](https://www.youtube.com/watch?v=5o8CwafCxnU) | Code.org's guide to the IP addresses and DNS |
| [Video: Wires, Cables, and Wifi](https://www.youtube.com/watch?v=ZhEf7e4kopM) | Code.org's guide to the physical infrastructure of the internet |
Internet
Network
IP Address
ISP
Router
With a partner, practice negotiating out loud. Try:

* Justifying an increase in salary
* Asking for a hiring bonus
* Asking for salary review after 90 days
* What are 3 ways you can use to research market rates for different positions?
# Interviews: Negotiation

If someone makes you an offer and you say "can it be more?", the answer is likely "no."

Some tips on negotiation:

* The company's recruiter can be a useful resource in helping you gather information, including how flexible the salary or other perks are. Recruiters are often rewarded for successful hires, so they can be one of your best allies in closing the deal.
* You need to have a realistic perspective on what you're worth. Online tools like Glassdoor and Payscale can give you some of the picture, but they're very generic tools.
  * Talk to people in the industry about salaries, benefits and what people in your situation are making.
  * Identify any skills or knowledge you have such as your familiarity with the companies products or industry that might make you more valuable than a generic candidate
  * Find out if how closely the responsibilities and expectations of this job match the title. Titles like "Associate Developer", "Senior Engineer", and "Full-stack web developer" are ultimately arbitrary and have little alignment between companies.
* It's extremely unlikely that someone will rescind an offer because you try to negotiate. If you're polite and reasonable, the worst thing that will happen is they'll hold fast on their offer. If they've made you an offer, they'vde decided they like you enough to want to work with you. The only thing that will change their mind about that is you being rude or inconsiderate while negotiating.
* Contrary to popular wisdom, you don't have to be afraid of saying a number first. That said, any numbers you throw out anchor the rest of the negotiation, so you want the numbers to be:
  * Generous to yourself, because it's easier for you to negotiate down than up
  * Realistic enough that you won't be dismissed instantly
* Consider the total value of the compensation, because salary is only one factor. Some companies will pay 100% of your health insurance premiums, some will pay none. This can have a substantial difference in the value of an offer. While some things are likely to not be negotiable because they're the same for every employee, you may be able to find things that are more valuable to you than they are to the employer. For example, you may be able to push your start date back to give yourself a vacation before you start, or you may be able to negotiate a bonus or how flexible your hours are.
* If you don't get what you want in a negotiation, see if you can get the company to commit to reviewing your performance after 90 days.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Candor: Guide to Salary Negotiation](https://candor.co/guides/salary-negotiation) | Candor's guide to salary negotiation in tech, includes video simulations. |
With a partner, use the STAR technique to answer these questions:

* Tell me about a time when you made a mistake.
* Tell me about a time when you had a conflict with a coworker.
* Tell me about a project you enjoyed working on.
* Tell me about a time when you overcame adversity.
* Tell me about a project you're proud of.

---

With a partner, practice answering the question "Tell me about yourself." Ask your partner to give you feedback, and then repeat the exercise until you're confident in your answer.

---

With a partner, answer all of these questions out loud:

* What is your greatest weakness?
* How do you handle stress and pressure?
* What are your salary expectations?
* Why do you want to work here?
* What type of work environment do you prefer?
* What major challenges and problems did you face at your last position? How did you handle them?
* What challenges are you looking for in a position?
* What are your career goals?
* What is your greatest strength? 
* How would you describe the pace at which you work?
* What motivates you?
* If the people who know you were asked why you should be hired, what would they say?
* Do you take work home with you?
* Do you prefer to work independently or on a team?
* If you knew your boss were 100% wrong about something, how would you handle it?
* What are your pet peeves?
* What challenges are you looking for in a position?
* How do you evaluate success?
* What does the "question beneath the question" mean?
* Describe the STAR technique.
* Differentiate between the situation and task in the STAR technique.
* Differentiate between the task and the action in the STAR technique.
# Interviews: Non-Technical Screeners

## The Question Beneath the Question

A lot of the seemingly straight-forward questions you get asked are actually meant to reveal more complex things about you. You'll do a lot better if you address the real question being asked. Some examples:

| Question                 | Real Question                 |
| ------------------------ | ----------------------------- |
| Tell me about yourself!  | How does this job fit into your story? |
| Why do you want to work here? | Why should we hire you? |
| Tell me about a time when you... | How do you think through problems? |
| How did you hear about this position? | Do you know anyone here? |
| What do you know about the company? | Could you bothered to learn anything about us? |
| Where do you see yourself in 5 years? | What's your career plan and is this organization going to be a part of it? |
| What are your salary expectations? | Can I trick you into low-balling yourself? |
| Why did you leave your last job? | Are you hard to work with? |

## "Tell me about yourself."

This is the most common interview opener. Your answer should:

* Be brief- 3-5 sentences is plenty.
* Open with your profession. If the position is for a data analyst, you should say "I'm a data analyst." If it's for a Junior Associate Software Engineer II, you should say, "I'm a software engineer."
* Tell the story of how you ended up in the profession **backward**. The things you say first are the context for the things you say next, and you want the context to be "I'm a hireable professional", not "I've wanted to do this ever since I was a kid."
* End with 1-2 things you like to do in your free time. The point of this is to be unique and memorable.

## Story Questions: The STAR Technique

STAR is a framework that helps you tell stories about things you've done. You use it to answer questions like:

* Tell me about a time when you (demonstrated something)?
* What's the project that you feel the most (adjective) about?

STAR stands for:

1. **Situation** - What's the context of this story?
2. **Task** - What challenge did you have to overcome?
3. **Action** - What did you do to overcome it?
4. **Result** - What was the result of your work?

This framework helps your stories stay on track and be easier for people to follow. For example, if you're asked "Tell me about a time you overcame a challenge at work," you say:

1. "The situation was that I was working as a new engineer on a dev team, and had a we were trying to hit a deadline for a new app campaign. 3 days before the deadline, the client changed a bunch of important details about the app."
2. "The task we had to do was hit our deadline, and accomodate the changes. There wasn't enough time to do everything, and we also wanted to maintain a sustainable pace on the team."
3. "The action I took was to implement some static versions of the things they wanted that didn't scale especially well, but allowed us to hit the deadline and bought us the time to refactor the app correctly after the deadline. I hard-coded some values instead of pulling them from the database, which allowed us to move a lot faster."
4. "The result was that we were able to accomodate the last-minute changes, hit the deadline, and maintain our positive culture."

## Do You Have Any Questions For Me?

Most interviews will end with the interviewer asking if you have any questions. You should always have questions because it demonstrates your interest in the company and their work. Also, interviews are two-way streets, and this is your opportunity to find out if they're a place you want to work. Here are some ideas:

* Based on the research you did during your application, were there any parts that didn't make sense or anything you wanted more detail on?
* Ask questions about the company's products. For example, "Have you had any products or features that surprised you by not being as successful as you expected? How did you respond?"
* Ask questions about the interviewer's experience with company. For example, "What's a typical day like for you at this company?"
* Are there any controversies you uncovered about the company you'd like them to address? For example, "I noticed on Glassdoor that some employees feel the company isn't committed enough to creating an inclusive culture. Can you speak to what the company is doing to address this?"
* You can respond to something you've noticed in the interview process. For example, "In my technical interview, I noticed that you requested tests for the code. Do you have a strong culture of testing here?"

It may help you to write 2-4 questions ahead of time.

## Watch Out!

* Each of parts of STAR should take about the same amount of time. Don't linger too long on the situation and the task.
* It's common to not clearly dilineate between the situation, the task, and the action.
    * The situation is context- the company you worked for, the composition of the team, etc.
    * The task is a defined problem that needs to be solved
    * The action is a solution the problem that you came up with or implemented
* Do the STAR parts in order and don't double-back. It's confusing if you're talking about your solution and then start giving more context.
* Don't get too caught up in the details when using STAR. The stories need to be true, but they don't necessarily need to be factual. The point is for the interviewer to learn something about you, not to fact-check your memoir.
* Don't be afraid to literally say the words "situation," "task," "action," and "result" when using the STAR technique. You don't have to be sneaky about using this technique because knowing that someone is using STAR to explain something doesn't reduce its efficacy.
* Don't forget the result in STAR. There should be some positive outcome, even if the outcome is that you learned something valuable.


## Additional Resources

| Resource | Description |
| --- | --- |
| [Video: STAR Interview Questions](https://www.youtube.com/watch?v=8QfSnuL8Ny8) | CareerVidz's guide to STAR |
STAR Technique
### Store Inventory Manager

Complete the following take-home challenge. Make sure you include a README, include appropriate styling, and keep a clean commit history. As a bonus, add tests.

Welcome to team Gilded Rose. You are asked to help build our store inventory management system. All items have a `sell_in` value which denotes the number of days we have left to sell the item and a `quality` value which denotes how valuable the item is. At the end of each day our software should lower both values for every item by 1.

Pretty simple, right? There are some exceptions:

* Once the `sell_in` days is less then zero, `quality` degrades twice as fast;
* The `quality` of an item can never be negative or increase beyond 50;
* The "Aged Brie" goods actually increases in quality each passing day;
* "Sulfuras" goods, being legendary items, never change their `sell_in` or `quality` values;
* "Backstage passes", like aged brie, increases in `quality` as its `sell_in` value decreases;
* Not just that: for "backstage passes" `quality` increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but `quality` drops to 0 after the concert (`sell_in` 0 or lower).

Complicated enough, now? Well, there is a new item category that we would like to see added to the inventory management system: "Conjured" items degrade in quality twice as fast as normal items.

Just for extra clarification, an item can never have its `quality` increase above 50, however "Sulfuras" is a legendary item and as such its `quality` is 80 and it never alters.

You won't find mixed categories (like a "Conjured Sulfuras / Backstage pass of Doom"), but the category name may be not in the first position (ie: expect something like "SuperUberSword, Conjured" or "Mighty Sulfuras Armour of Ultimate Awesomeness").

Here are some sample items:

| Item | Sell In | Quality |
| --- | --- | --- |
| +5 Dexterity Vest | 10 | 20 |
| Aged Brie | 2 | 0 |
| Elixir of the Mongoose | 5 | 7 |
| Sulfuras, Hand of Ragnaros | 0 | 80 |
| Backstage passes to a TAFKAL80ETC concert | 15 | 20 |
| Conjured Mana Cake | 3 | 6 |

Write a web app that allows you add new items and displays the current state of the inventory. Degradation should be calculated based on the date the item was added. Note that you'll need to parse the name of the item to determine its type.

---

### Memory Game

Complete the following take-home challenge. Make sure you include a README, include appropriate styling, and keep a clean commit history. As a bonus, add tests.

In a simple [memory game](http://en.wikipedia.org/wiki/Concentration(game)) we need a grid of tiles representing different numbers. Pairs of numbers are randomly place around the board. Each turn, a player chooses a number to peek at, and then replaces it face down. If the player chooses the same number twice in a row, the tiles are removed from the grid. The aim is to clear the board in the lowest number of turns.

Start by building a web app to play this game with 8 tiles. Next, allow the player to choose the number of tiles before the game. Make sure to handle invalid input.
# Interviewing: Take-Home Challenges

A common part of interviewing for a technical job is a take-home challenge. Take-home challenges vary, but they generally involve building an app or feature on your own over a period of time. They were originally conceived as an alternative to whiteboarding, which many candidates found intimidating and an unrealistic measure of their programming ability. They come with their own drawbacks and considerations.

## What A Take-Home Challenge Shows

Here's what you want to demonstrate with a take-home challenges:

* Above all, can you follow directions? The instructions on a take-home challenge often feature a lot of nuance that is easy to miss. Read the instructions very carefully and identify anything that's ambiguous or could be interpretted multiple ways. If any part of what you're being asked to do is unclear, reach out for clarification quickly. The worst thing you can do is come up with an elegant solution to the wrong problem.
* Write your cleanest code. It's cheap to say you're "detail-oriented"; this is your chance to demonstrate it. You should have flawless indentation and code style, descriptive variable names, refactored code, tests, a thoughtful README, and meaningful commits. It's better to shine in these areas than solve the problem.

## How Long You Should Spend

Employers will often specify either how long they expect the challenge to take or how long they want you to spend on it. This is controversial. Some things to consider:

* Employers consistently underestimate how long a take-home challenge will take. This may make you feel bad when you're unable to complete it in the estimated time.
* Other applicants may either ignore a given time limit or lie about how long they took.
* Alternatively, companies may explicitly be looking for people trying to be dishonest about how long they took.
* Long take-home challenges can perpetuate inequities by privileging people who have the additional time to do them.

Ultimately, you need to decide how you feel about take-home challenges and how you want to approach them. As a baseline, stick to the given time estimate or time limit. If you're not done with the challenge, tell the employer how much time you've spent and send them your work. Ask them if they'd like you to take additional time to continue working on it.
Take-Home Challenge
Answer the following trivia questions out loud with a partner:

* What does it mean for a method or function to "return" a value?
* What is the difference between a procedure, a function, and a method?
* What's the difference between an array and an object?
* What's an object?
* What is mapping over an array?
* What is the difference between filtering and finding?
* What is a reducer?
* What's the difference between a class and an instance of a class?
* What's the difference between an instance method and a class method?
* What is a one to many relationship?
* What is a many to many relationship?
* How does a relational database relate 2 tables?
* What does an ORM do?
* What is an API?
* What is semantic HTML?
* What is the DOM?
* Describe the HTTP Request/Response cycle
* What's the difference between the web and the internet?
* What is a computer virus?
* What is validation, where can it occur, and what purpose does it serve?
* What is an event?
* What is event bubbling?
* What is referential transparency?
* What are the 4 pillars of OOP?
* What are some tenets of functional programming?
* What's the difference between authentication and authorization?
* How do you avoid storing plain-text passwords?
* What is serialization?
* Describe the MVC architecture pattern
* What is Big O?
* What is a closure?
* What is CORS?
* What's the semantic difference between PUT and PATCH?
* What is DRY?
# Interviewing: Trivia

## Why people ask trivia questions

Trivia questions are used for two reasons:

* To reject people whose resume exaggerated their knowledge
* To find out relative strengths and weaknesses

## What kinds of trivia questions get asked

The best answer to this question is to look them up on the internet; there's a reasonable chance that the person interviewing you is doing the exact same thing, and may even ask you the same questions you find.

Beyond that, these kinds of questions are common:

### Smoke Tests

These questions are often used early on to weed out fakers. Technology jobs pay well and require few (if any) credentials, so sometimes people try to fake their way through interviews and hope they'll learn on the job. Additionally, some people have a lot of credentials and no practical skills. For example:

* What is a string?
* What is a variable?

### Conceptual Questions

These are language-agnostic questions about concepts. For example:

* What is a closure?
* What is character encoding?
* What is polymorphism?
* Describe HTTP

### Language/Framework Questions

These are language- or framework-specific questions that are trying to determine your comfort level with the tool. For example:

* What is the difference between `==` and `===` in JavaScript?
* What's the difference between a hash and an object in Ruby?
* What's the difference between function declarations, function expressions, and arrow functions in JavaScript?

## Answering a question you don't know the answer to

If you don't know the answer to a question, don't just say "I don't know."

1. Admit you're not sure about the answer
2. Try to pull out any words or concepts that you recognize and create connections to them
3. Ask for help
4. Optionally, ask if you can look it up

For example, if you don't know the answer to "What is inheritance?", you could respond:

>"I'm not sure, but I can infer from the name it's about getting something from somewhere else, a parent maybe? Am I in the ballpark?"

You can use this as a springboard for a conversation or an opportunity to learn. Things your interviewer says may also trigger your memory for times you have used or seen the concept being discussed.
Smoke Test Inteview Questions
Conceptual Interview Questions
Language/Framework Interview Questions
Use the 4-step interview protocol on these problems. Remember to do them out loud in front of someone else. The problems are not especially difficult, but doing them with someone watching is the specific skill that you want to develop.

* [5 Gardens](#5-gardens)
* [Goat, Cabbage, Wolf](#goat-cabbage-and-wolf)
* [Reverse a String](#reverse-a-string)
* [Stable Employment Problem](#stable-employment-problem)
* [Weird Words](#weird-words)
* [Apple Building](#apple-building)
* [Credit Card Mask](#credit-card-mask)
* [Day to Date](#day-to-date)
* [Longest Sorted Distinct String](#longest-sorted-distinct-string)

---

### 5 Gardens

Five friends have their gardens next to one another, where they grow three kinds of crops: fruits (apple, pear, nut, cherry), vegetables (carrot, parsley, gourd, onion) and flowers (aster, rose, tulip, lily).

* They grow 12 different varieties.
* Everybody grows exactly 4 different varieties
* Each variety is at least in one garden.
* Only one variety is in 4 gardens.
* Only in one garden are all 3 kinds of crops.
* Only in one garden are all 4 varieties of one kind of crops.
* Pears are only in the two border gardens.
* Paul's garden is in the middle with no lily.
* Aster grower doesn't grow vegetables.
* Rose grower doesn't grow parsley.
* Nuts grower has also gourd and parsley.
* In the first garden are apples and cherries.
* Only in two gardens are cherries.
* Sam has onions and cherries.
* Luke grows exactly two kinds of fruit.
* Tulips are only in two gardens.
* Apples are in a single garden.
* Only in one garden next to the Zick's is parsley.
* Sam's garden is not on the border.
* Hank grows neither vegetables nor asters.
* Paul has exactly three kinds of vegetable.

Who has which garden and what is grown where?

---

### Goat Cabbage and Wolf

A farmer returns from the market, where he bought a she-goat, a cabbage and a wolf (what a crazy market :-). On the way home he must cross a river. His boat is small and won't fit more than one of his purchases. He cannot leave the she-goat alone with the cabbage (because the she-goat would eat it), nor he can leave the she-goat alone with the wolf (because the she-goat would be eaten).

How can the farmer get everything on the other side in this puzzle?

---

## Reverse a String

Write a function named reverse that takes a string argument and returns the string reversed. `.reverse()` should not be used.

---

### Stable Employment Problem

We're going to solve an age-old problem that has plagued mountain villages and startups alike. Given two entities that have preferences for matching, how do you ensure that these matchups are "stable"? When we talk about stability, we mean that if two entities prefer each other over the partner they are matched with, the arrangement is not stable.

Given a list of developers, match them to companies. Match them such that no developer prefers a company that also prefers that developer over the one they are matched with. The "preferences" property represents an ordered list of preferences, with the first element being the most preferred.

```js
const developers = [{
  name: "Lilly",
  preferences : ["AirBnB", "Facebook", "Pivotal", "Amazon", "Lyft", "Uber"]
},{
  name: "Terrence",
  preferences : ["Lyft", "Facebook", "Pivotal", "AirBnB", "Amazon", "Uber"]
},{
  name: "Ken",
  preferences : ["Uber", "Amazon", "Facebook", "AirBnB", "Pivotal", "Lyft"]
},{
  name: "Zan",
  preferences : ["AirBnB", "Pivotal", "Facebook", "Amazon", "Lyft", "Uber"]
},{
  name: "Rebecca",
  preferences : ["AirBnB", "Lyft", "Uber", "Facebook", "Pivotal", "Amazon"]
}]

const companies = [{
  name: "AirBnB",
  preferences : ["Lilly", "Terrence", "Ken", "Zan", "Rebecca"]
},{
  name: "Facebook",
  preferences : ["Ken", "Lilly", "Terrence", "Zan", "Rebecca"]
},{
  name: "Pivotal",
  preferences : ["Terrence", "Zan", "Lilly", "Ken", "Rebecca"]
},{
  name: "Amazon",
  preferences : ["Rebecca", "Terrence", "Ken", "Zan", "Lilly"]
},{
  name: "Lyft",
  preferences : ["Rebecca", "Ken", "Zan", "Lilly", "Terrence"]
},{
  name: "Uber",
  preferences : ["Lilly", "Terrence", "Ken", "Zan", "Rebecca"]
}]
```

---

### Weird Words

Change every letter in a given string to the next letter in the alphabet. The function will take a single string as a parameter.

EXAMPLES:

* "Hello" --> "Ifmmp"
* "What is your name?" --> "Xibu jt zpvs obnf?"
* "zoo" --> "app"
* "zzZAaa" --> "aaABbb"

Note: Spaces and special characters should remain the same. Capital letters should transfer in the same way but remain capitilized. 

---

### Apple Building

Input: Integer n
Output: String

Example:

`a(4)` prints as

```
   A   
  A A  
 A A A 
A     A
```

`a(8)` prints as

```
       A       
      A A      
     A   A     
    A     A    
   A A A A A   
  A         A  
 A           A 
A             A
```

`a(12)` prints as

```
           A           
          A A          
         A   A         
        A     A        
       A       A       
      A         A      
     A A A A A A A     
    A             A    
   A               A   
  A                 A  
 A                   A 
A                     A
```

Note:

* Each line's length is 2n - 1
* Each line should be concatenate by line break "\n"
* If n is less than 4, it should return ""
* If n is odd, a(n) = a(n - 1), eg a(5) == a(4); a(9) == a(8)

---

### Credit Card Mask

Usually when you buy something, you're asked whether your credit card number, phone number or answer to your most secret question is still correct. However, since someone could look over your shoulder, you don't want that shown on your screen. Instead, the credit card number is masked.

Your task is to write a function maskify, which changes all but the last four characters into '#'.

Examples:

```
maskify("4556364607935616") == "############5616"
maskify(     "64607935616") ==      "#######5616"
maskify(               "1") ==                "1"
maskify(                "") ==                 ""

# "What was the name of your first pet?"
maskify("Skippy")                                   == "##ippy"
maskify("Nananananananananananananananana Batman!") == "####################################man!"
```

---

### Date to Day

If I give you a date, can you tell me what day that date is? For example, December 8th, 2015 is a Tuesday.

Your job is to write the function `day(date)` which takes a string representation of a date as input, in the format 
`YYYYMMDD`. The example would be "20151208". The function needs to output the string representation of the day, so in this case "Tuesday".

Your function should be able to handle dates ranging from January 1st, 1582 (the year the Gregorian Calendar was introduced) to December 31st, 9999. You will not be given invalid dates. Remember to take leap years into account.

---

### Longest Sorted Distinct String

Take 2 strings including only letters from a to z. Return a new sorted string, the longest possible, containing distinct letters, - each taken only once - coming from s1 or s2.

Examples:

```py
a = "xyaabbbccccdefww"
b = "xxxxyyyyabklmopq"
longest(a, b) -> "abcdefklmopqwxy"

a = "abcdefghijklmnopqrstuvwxyz"
longest(a, a) -> "abcdefghijklmnopqrstuvwxyz"
```
* Recall 3 questions you can use to clarify the problem.
* Recall 3 questions you can use to enumerate possible approaches.
* Recall 3 questions you can use to work the problem.
* Recall 3 questions you can use to reflect on the problem.
# Interviewing: Whiteboarding

Whiteboarding is an intimidating part of interviewing, but it's ultimately a learnable skill. Practice using this 4-step whiteboarding protocol:

## 4-Step Whiteboarding Protocol

### Clarify the problem

Start by restating the problem in your own words. This does two things: It clarifies that you understand what you're being asked to do, and it buys you time to think about the problem more.

Next, try to extract the useful pieces of data from the prompt. What are the inputs? What are the outputs? What are the contraints? Write these on the board.

Next, draw an input/output table. The trick to this is that you want to cover a reasonable number of cases, but you also want them to be relatively fast to verify.

The Identify-Understand questions from Polya's 4-step process are useful here too:

#### Identify

* Are you being asked to find something or prove something?
* Can you separate out the data, the unknown, and conditions?
* Is all of the information relevant?
* Are there special cases?
* Do you understand all of the words in the problem? Is there any special terminology you need to distinguish?

#### Understand

* Can you restate the problem? How many different ways can you do it?
* Can you make an table that represents sample inputs and the outputs they should generate?
* Can you think of what the opposite of this problem is?
* Can you visualize the problem as a whole?
* Can you think of a picture or diagram that might help you understand the problem?
* Have you seen a problem like this before?
  * What's different about it?
  * Can we use the same solution?
  * Is the similarity biasing you?
* Is there an analogy for this problem?
* Are there multiple parts of the condition that can be separated out?
* Is there a notation you can use to rewrite the problem?
* If you simplify or round parts of the problem, how much precision do you lose?
* Can you stretch the parameters to absurd lengths?
* Is the sequence things happen in important?
* Can you think of a more specific example of this problem?
* Are any parts of the problem redundant?
* Are any parts of the problem contradictory?
* Is the problem solvable with the available information?
* What other data would be useful to have? If you don't have it, can you make it up?

### Enumerate Possible Approaches

Now that you understand the problem, think through different approaches. Consider:

* Any obvious solutions
* Solutions that take advantage of particular language features
* Different paradigms (functional, object-oriented, procedural)

Try to come up with at least two solutions, and pick the most promising one. "Promising" doesn't necessarily mean most elegant or most efficient; its perfectly reasonable to select an approach because it's the only one you're confident you can do under pressure.

The DAVE questions from Polya's 4-step process are helpful as well:

#### Deduce

* Can you eliminate some possibilities?
* You can just guess an answer?
  * Is the answer right? Can you figure out how to get to it?
  * Is the answer wrong? In what ways? How close was it?
  * Are you noticing patterns?
* Can you work backwards from the solution? How does the data become the unknown?
* Are there any patterns present?
* Are any parts of the problem interchangeable?

#### Associate

* Can it be translated into an equation or formula?
* Are any parts of the problem similar to other kinds of problems? Could you use their:
  * Unknowns?
  * Constraints?
  * Data?
  * Solutions?
  * Methods? 

#### Visualize

* Can you visualize it as a:
  * List?
  * Table?
  * Chart?
  * Tree diagram?
  * Model?
* Draw a picture
  * Does it help emphasize some parts?
  * Does it need different kinds of lines (solid, dotted, dashed)?
  * Should it use multiple colors?
  * Should it be 2D or 3D?

#### Ease-In

* Solve an easier problem
  * What if you didn't have to solve part of the problem? Can you remove one of the constraints?
  * What if you assume something you suspect to be true but can't prove yet? Can you add a piece of data?
  * Can you build something that would help solve the problem?
  * Could you change any part of the problem to make it easier? Could you make the start closer to the end?
* Change the number of parts
  * Combine: Can you combine parts of the problem into one whole?
  * Decompose: Can you split the problem into multiple parts?
* Change the scope
  * Can you make it more specific?
  * Can you make it more general?

### Work the Problem

If it's a programming puzzle, start by writing sandwich code: Name the function, write out the inputs, write out what the outputs will be. If it's a more general puzzle, see if you can do something to similarly make it clear what the inputs and outputs are so that you'll know when your solution successfully connects them.

Next, don't try to write syntactically correct code. What you're aiming for is pseudo-code, or code that identifies all the logical steps one would need to follow without prescribing any one language.

More than any other step, it is imperative that you narrate what you're doing the entire time. As you're working through the solution, note that it's OK to discover new problems (and go back through this process to solve them). Additionally, it's OK to make mistakes or have to double back.

As you're working through the solution, consider these questions:

* Are you making progress?
* Have you solved the problem? Did you meet all of the conditions?
* What are you positive about?
* What do you think is likely?
* Are you doing something you've already tried?
* Did you use all the data? Did you need to?

### Reflect

When you think you've solved the problem, go back to your input/output table from step 1. Run each input through your pseudo-code out loud and verify that it produces the expected result. It's common to identify problems with your solution during this step, especially around off-by-one errors and comparisons. That's much better than not finding them at all.

If you've validated your solution, start talking about how it could be improved. Are there inelegant parts of the code? Problems with scaling? Problems with speed? Talk about the trade-offs the code will have.

If your solution doesn't work, identify why. What would need to be true for your solution to work?

Consider these questions:

* Does this solution indicate a more general rule?
* Are there counter-examples at the extremes?
* Does the answer make sense?
* Could you use this method to solve other problems?
* Can you derive the same answer a different way?

## Practice

Reading and recalling these steps is not enough to become a good whiteboarder. Whiteboarding is an independent skill from programming, and the only way to get good at it is practicing. In particular, you need to practice out loud in front of another person. It will likely feel embarassing or awkward, but it's much better to get past that stage with a partner than have to develop these skills when an actual job is on the line.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Princeton: Pseudo-code Reference](https://www.cs.princeton.edu/courses/archive/spr11/cos116/handouts/Pseudocode_Reference.pdf) | Princeton's reference guide to writing pseudo-code |
| [Video: Whiteboard Coding Interviews](https://www.youtube.com/watch?v=DIR_rxusO8Q) | Fullstack Academy's guide to whiteboard interviews |
4-Step Whiteboard Protocol
Polya: Identity
Polya: Understand
Polya: DAVE
Polya: Work the Problem
Polya: Reflect
Pseudo-code
Using this array:

```js
[{
  id: 1,
  label: "Apple",
},{
  id: 2,
  label: "Banana",
},{
  id: 3,
  label: "Carrot",
}]
```

Render each one in a list item in a React component?
* What are keys used for in JSX?
* Why can't indexes be used as keys in JSX?
* How do you turn a list of items into a list of JSX elements?
# React: Iteration

Iteration in JSX templates is done with mapping. For example:

```jsx
const SomeList = () => {
  const list = [{
    id: 1,
    content: "A",
  },{
    id: 2,
    content: "B",
  },{
    id: 3,
    content: "C",
  }]

  const items = list.map(item => {
    return <li key={ item.id }>{ item.content }</li>
  })

  return <ul>{ items }</ul>
}
```

This produces the following HTML:

```html
<ul>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>
```

[Play with this code](https://codesandbox.io/s/loving-carson-uthpx)

## Keys

When iteratively generating JSX elements, each one is expected to have a unique `key` attribute, which React uses for several internal reasons. Keys can be any value as long as they're unique, but are most often ids generated by a database:

```jsx
const items = list.map(item => {
  return <li key={ item.id }>{ item.content }</li>
})
```

If some other value in each item is unique (such as an employee ID), you can use that instead.

## Watch Out!

Array indexes are not suitable for the `key` attribute because they can change. For example, if an array is sorted, elements will potentially have new indexes.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React: Lists and Keys](https://reactwithhooks.netlify.app/docs/lists-and-keys.html) | React's guide to iteration |
| [Video: Loop with Map](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=5951s) | React Hooks Crash Course: Iteration |
| [Video: The `key` Prop](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=6354s) | React Hooks Crash Course: Keys |
* React
* Iteration
* JSX
* HTML Template
* JavaScript: `.map`
* React: Keys
* Array Index
1. Create a new Node.js project
2. Install Jest
3. In an index.js file, write a simple math function
4. Create a test file that imports this file and tests its behavior
5. Add a test running script to `package.json`
6. Verify that the tests work

Repeat this process 5 times.
* What does the `--watch` flag do in Jest?
* What is `test` in Jest?
* What is `expect` in Jest?
* What is a Jest matcher?
* Why don't `test` and `expect` need to be imported?
# Intro to Jest

Jest is a testing tool for JavaScript with 3 parts:

* A syntax for declaring and organizing tests
* A library for asserting things about JavaScript code
* A CLI tool for running tests and reporting the results.

Jest tests look like this:

```js
describe("A group of tests", () => {
  it("is a test", () => {
    expect(1).toBe(1)
  })
  it("is another test", () => {
    const mockFunction = jest.fn(() => {})
    mockFunction()
    expect(mockFunction).toHaveBeenCalledTimes(1)
  })
})
```

## Installing and Configuring

To install Jest on a JavaScript project, run:

```bash
npm install -D jest
```

Jest is setup to run from an `npm` script:

```json
{
  "name": "some-project-name",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^27.2.0"
  }
}
```

Jest can now be run with `npm test` on the command line. By default Jest will try to execute any file ending in `.test.js`.

It's often useful to keep Jest running after tests complete so that it can rerun when files change. To do this, add the `--watch` flag to `jest`:

```json
{
  "name": "some-project-name",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
    "test:watch": "jest --watch"
  },
  "devDependencies": {
    "jest": "^27.2.0",
  },
```

## Test Files

The simplest test files import a JavaScript function or module, declare a new `test`, and then assert something about the code:

```js
const { add } = require("./math")

test("add sums two positive integers", () => {
  const sum = add(2, 3)
  expect(sum).toEqual(5)
})
```

* `test` is a built-in Jest function that takes a test name as a string and a function containing the test code.
* If anything inside the function throws an error, the test fails. Otherwise, it passes.
* `expect` is a built-in Jest function that accepts any expression. That expression will be compared against a "matcher" method that's chained from `expect()`.
* `.toEqual()` is the simplest matcher method. It asserts that whatever expression was given to `expect` is equal to some value. If it isn't, it throws an error.

When the tests are run, the name of the test will display with a red X or green checkmark indicating whether or not it was able to run the code inside of that test without an error being thrown.

## Watch Out!

* Jest tests are technically Node.js code, even if your project isn't otherwise a Node.js project. That means you may need to use `require` syntax to import modules instead of `import` unless you've configured your project to use `import`/`export` syntax. The code you're testing can export modules with either the standard `export` syntax or Node's `module.export` syntax.
* `test` and `expect` don't need to imported, Jest makes them available when it runs the tests.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Jest](https://jestjs.io/) | Official Jest documentation |
* Jest
* Test Watching
* Jest: `test`
* Jest: `expect`
* Jest: `.toEqual()`
* Jest: Matcher
* Node.js
Revise the following assertions to use more appropriate matchers:

```js
expect(undefined).toEqual(undefined)
```

```js
expect(!someString).toEqual(false)
```

```js
expect(!!someNumber).toEqual(true)
```

```js
const someString = "Hello, world!"
const containsHello = someString.includes("Hello")
expect(containsHello).toEqual(true)
```

```js
const someString = "Hello, world!"
const containsHello = (/hello/i).test(someString)
expect(containsHello).toEqual(true)
```

```js
const five = await Promise.resolve(5)
expect(five).toEqual(5)
```

```js
const array = [1, 2, 3]
expect(array.length).toEqual(3)
```

```js
const length = [1, 2, 3].length
expect(length).toEqual(3)
```

```js
const includesThree = [1, 2, 3].includes(3)
expect(includesThree).toEqual(true)
```

```js
const array = [{ id: 1 }, { id: 2 }, { id: 3 }]
const includesThree = array.filter(item => item.id = 3).length > 0
expect(includesThree).toEqual(true)
```

```js
const person = { id: 1, name: "Kyle" }
const hasName = person.hasOwnProperty("name")
expect(hasName).toEqual(true)
```

```js
const person = { id: 1, name: "Kyle" }
const isKyle = person.name === "Kyle"
expect(isKyle).toEqual(true)
```

```js
const includesThree = [1, 2, 3].includes(3)
expect(!includesThree).toEqual(true)
```

```js
let isError = false
try {
  await somePromise()
} catch(error){
  isError = true
}

expect(isError).toEqual(true)
```
* What is a Jest matcher?
* Why not use `.toEqual()` for all Jest assertions?
* What is the difference between the `.toEqual()` and `toBe()` matchers in Jest?
* Which Jest matcher asserts that a string is included in another string?
* Which Jest matcher asserts that a value is present when the specific value isn't important?
* Which Jest matcher asserts that something is `undefined`?
* Which Jest matcher tests a string against a regular expression?
* How do you invert an assertion in Jest?
* How do you make assertions about promises in Jest?
* Which Jest matcher asserts an object is present in an array?
* Which Jest matcher asserts a string is present in an array?
* What consideration must be made when making an assertion about promises?
# Jest: Basic Matchers

Matchers assert things about the values being examined by `expect`. The most simple matcher is `.toEqual`:

```js
expect(4).toEqual(4)
```

Using the other matchers has several benefits:

* They keep logic out of your tests. For example, using the `.resolves` chainer reduces the likelihood of making a mistake manually resolving a promise and asserting the resolved value.
* They make error messages more expressive.
* They serve as better documentation because they read more like sentences and less like code.

Jest comes with a large number of matchers. These are some of the most common and useful:

## Simple Values

| Matcher | Purpose |
| --- | --- |
| `expect(someTestResult).toBe(someValue)` | Basic assertion, used with strings, numbers, and booleans |
| `expect(someTestResult).toBeNull()`, `expect(someValue).toBeUndefined()` | Basic assertion, used with `null` and `undefined`. Note that those values should not be tested using `toBe` or `toEqual`. |
| `expect(someTestResult).toBeTruthy()`, `expect(someValue).toBeFalsy()` | Used to test either the presence or absence of something when its specific value is unimportant. |
| `expect(someTestResult).toContain(someValue)` | Tests that a string contains another string |
| `expect(someTestResult).toMatch(someValue)` | Tests that a string contains a regex match |
| `expect(someTestResult).not.someMatcher()` | `.not` negates whichever matcher follows it, which allows testing that a value doesn't equal, contain, etc. another value. |
| `expect(someTestResult).resolves.someMatcher())` | Tests that a promise resolves to a value |

## Arrays

| Matcher | Purpose |
| --- | --- |
| `expect(someTestResult).toEqual(someValue)` | Basic assertion, used with objects and arrays |
| `expect(someTestResult).toHaveLength(someCount)` | Asserts the length of an array or string |
| `expect(someTestResult).toContain(someValue)` | Tests that a string, number, or boolean is in an array |
| `expect(someTestResult).toContainEqual(someValue)` | Tests that an object or array is inside an array |

## Objects 

| Matcher | Purpose |
| --- | --- |
| `expect(someTestResult).toEqual(someValue)` | Basic assertion, used with objects and arrays |
| `expect(someTestResult).toHaveProperty(someKey, someValue)` | Asserts that an object has a property, optionally with a specific value |
| `expect(someTestResult).toMatchObject(someValue)` | Tests that an object is a subset of another object |

## Chainers

These are properties that modify the matchers that come after them.

| Matcher | Purpose |
| --- | --- |
| `expect(someTestResult).not.someMatcher()` | `.not` negates whichever matcher follows it, which allows testing that a value doesn't equal, contain, etc. another value. |
| `expect(someTestResult).resolves.someMatcher())` | Tests that a promise resolves to a value |
| `expect(someTestResult).rejects.someMatcher())` | Tests that a promise rejects to a value |

Note that testing a promise makes the test asynchronous. You'll either need to return the assertion or `await` it.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Jest `expect` API](https://jestjs.io/docs/en/expect) | Official reference for Jest matchers. |
* Jest: Matcher
* Jest: `expect`
* Asynchronous
Write tests for the following code without implementing the higher-order functions:

```js
function map(array, transform){
  const newArray = []

  for (let i = 0; i < array.length; i++){
    const oldElement = array[i]
    const newElement = transform(oldElement)
    newArray.push(newElement)
  }

  return newArray
}
```

```js
function filter(array, predicate){
  const newArray = []

  for (let i = 0; i < array.length; i++){
    const element = array[i]
    if (predicate(element)){
      const newElement = JSON.parse(JSON.stringify(element))
      newArray.push(newElement)
    }
  }

  return newArray
}
```

```js
function reduce(array, reducer, default){
  let accumulation = default

  for (let i = 0; i < array.length; i++){
    const element = array[i]
    accumulation = reducer(accumulation, element)
  }

  return accumulation
}
```

---

Assert that `console.log` was called with the provided string:

```js
function log(message){
  console.log(`LOG: ${message}`)
}
```

---

Assert that this function works:


```js
function someFunction(someString, somePromise){
  return somePromise.then(someValue => {
    return `${someString}: ${someValue}`
  })
}
```
* What is a test spy?
* What is a test mock?
* You pass a spy into a function. How would you verify that this spy was called exactly twice in Jest?
* Why is it important to keep mocks simple?
* What's the difference between `jest.fn()` and `jest.mock()`?
* What does the `.mock` property on Jest spy contain?
* How do you stub a promise?
# Jest: Spies and Mocks

To test code that accepts higher-order functions, create a spy with `jest.fn()`:

```js
const someSpy = jest.fn()
```

This is a function that records information about how or whether it was called, as well as which arguments it was given.

```js
const someSpy = jest.fn()
someFunction(someSpy)
expect(someSpy).toHaveBeenCalled()
```

Note that the assertion is happening on the spy, not on the actual code being tested. This is a common way to test the behavior of higher-order functions and components that accept functions as props.

## Spy Matchers

These are some common matchers called on spies:

| Matcher |
| --- |
| `expect(someSpy).toHaveBeenCalled()` |
| `expect(someSpy).toHaveBeenCalledWith(firstArgument, secondArgument, thirdArgument)` |
| `expect(someSpy).toHaveBeenCalledTimes(invocationCount)` |
| `expect(someSpy).toHaveBeenNthCalledWith(invocationNumber, firstArgument, secondArgument)` |

## Stubs and Mocks

Sometimes code that accepts functions also needs those functions to return a value. You can do this by returning a hard-coded value from a function passed into `jest.fn()`:

```js
const someSpy = jest.fn(() => "Hi")
printMessage(someSpy)
expect(someSpy).toHaveBeenCalled()
```

These functions can also accept arguments and use them in mock implementations:

```js
const someSpy = jest.fn(number => number * 2)

map(someSpy)(["a", "b", "c"])

expect(someSpy).toHaveBeenNthCalledWith(1, "a")
expect(someSpy).toHaveBeenNthCalledWith(2, "b")
expect(someSpy).toHaveBeenNthCalledWith(3, "c")
```

It's very important to keep your mock implementations simple; ignore arguments and return static values when possible. It's easy to start reimplementing functionality that already exists elsewhere. If you start feeling like you need to test your tests, your mocks are too complicated.

## Mocking Modules

If your code uses a third-party library or other module, you may want to mock it to prevent it from actually executing. To do:

1. Import the module into your test file
2. Pass the name of the module as a string into `jest.mock()`
3. Use methods like `mockReturnedValue` and `mockRejectedValue` on any methods that your application code uses

For example:

```js
import axios from "axios"
import someCode from "./some-code"

jest.mock("axios")

test("Some Test", async () => {
  axios.get.mockResolvedValue({ data: "Some Data" })

  expect(someCode()).resolves.toEqual({ data: "Some Data" })
})
```

## Promises

If the function you're spying on is a promise, you can mock its resolved or rejected values:

```js
const someSpy = jest.fn().mockResolvedValue({ result: "success" })
const someSpy = jest.fn().mockRejectedValue({ error: "Uh oh" })
```

## Different Responses For Different Invocations

To help keep logic out of your mock implementations, you can have the same spy return different values based on which time it's invoked by chaining `mockReturnValueOnce` calls:

```js
const someSpy = jest.fn(() => 4) // Default, returned from the fourth call and onward
  .mockReturnValueOnce(1) // Returned from the first call
  .mockReturnValueOnce(2) // Returned from the second call
  .mockReturnValueOnce(3) // Returned from the third call
```

This works the same way with promises:

```js
const someSpy = jest.fn()
  .mockResolvedValue({ result: "4" }) // Default, fourth call and onward
  .mockResolvedValueOnce({ result: "1" }) // First call
  .mockResolvedValueOnce({ result: "2" }) // Second call
  .mockResolvedValueOnce({ result: "3" }) // Third call

const someSpy = jest.fn()
  .mockRejectedValue({ error: "4" }) // Default, fourth call and onward
  .mockRejectedValueOnce({ error: "1" }) // First call
  .mockRejectedValueOnce({ error: "2" }) // Second call
  .mockRejectedValueOnce({ error: "3" }) // Third call
```

## Inspecting Spies and Mocks

Since tests are used to run your code, it may be useful to examine how spies are being called. Each spy has a `.mock` property containing information about how it's been used so far.

* **`someSpy.mock.calls`**: An array of arrays with all arguments the spy has been called with
* **`someSpy.mock.results`**: An array with all return values the spy has been called with

For example:

```js
const additionSpy = jest.fn((numberOne, numberTwo) => numberOne + numberTwo)
additionSpy(1, 2)
additionSpy(3, 4)
additionSpy(5, 6)
console.log(addSpy.mock.calls) // [[1, 2], [3, 4], [5, 6]]
console.log(addSpy.mock.results) // [3, 7, 11]
```

## Watch Out

Don't make assertions on the `.mock.calls` or `.mock.result` of a spy, use the appropriate matcher instead.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Mock Functions](https://jestjs.io/docs/mock-functions) | Official reference for Jest spies. |
| [Jest `expect` API](https://jestjs.io/docs/en/expect) | Official reference for Jest matchers. |
* Testing: Spy
* Testing: Mock
* Testing: Stub
* Argument
* Higher-order Function
* Promise
* Invocation
* Testing: Assertion
Write tests for the following functions:

```js
function purchaseTicket(name){
  return {
    owner: name,
    purchaseDate: Date.now(),
  }
}
```

---

```js
function verifyTicket(ticket){
  return ticket.purchaseDate < Date.now() + 1000 * 60 * 60 * 24
}
```
* Why is it important to mock time in automated tests?
* What two things does `jest.useFakeTimers()` do?
* How do you restore real timers after using fake ones in Jest?
* When are fake timers turned off after being set in Jest?
* How do you set the current date with fake timers in Jest?
* How do you move time forward by an hour when using fake timers in Jest?
# Jest: Mocking Time

Some apps and code use time as a significant factor. For example:

* Calendars
* Event bookings
* Messages that are only displayed for a few seconds
* States that expire after a period of time
* Things the reoccur on a schedule

It's usually impractical to wait the seconds, minutes, days, or years needed for the code to work. In these situations, use Jest's fake timers. Fake timers override the system clock for the tests, and allows you to start, stop, and manipulate how the application sees time freely.

## Using Fake Timers

* Before testing code that uses time, call `jest.useFakeTimers()`
* To set the time, use `jest.setSystemTime(someDate)`
* To move time forward, use `jest.advanceTimersByTime(timeInMilliseconds)

For example, to verify that a bus pass purchased at noon on September 21st, 2005 expires at midnight, you could write the following test:

```js
test("Purchased bus passes expire at midnight", () => {
  jest.useFakeTimers()
  jest.setSystemTime(new Date("2005-09-21T12:00:00"))

  const ticket = new Ticket()
  expect(ticket.isValid()).toBeTruthy()

  jest.advanceTimersByTime(1000 * 60 * 60 * 12) // (1000 * 60 * 60 * 12) is 12 hours in milliseconds

  expect(ticket.isValid()).toBeFalsy()
})
```

## Watch Out!

* Every call to `jest.useFakeTimers()` resets the clock
* If you need to turn off fake timers, you can do so with `jest.useRealTimers()`

## Additional Resources

| Resource | Description |
| --- | --- |
| [Jest: Timer Mocks](https://jestjs.io/docs/timer-mocks) | Official guide to Jest's timers |
| [Jest: Timer Mocks API](https://jestjs.io/docs/jest-object#mock-timers) | Official API docs for Jest's timers |
* Testing: Mock
Write answers to all of these questions down. Be honest. Refer back to your answers throughout your job search to help you stay on track.

* What kind of work are you most interested in doing? Consider technical and non-technical elements.
* What kind of work would you do under the right circumstances, such as a great team, great compensation, or a great mission?
* What kind of work are you not interested in doing? Again, consider technical and non-technical elements.
* How much money do you need to make to survive? To feel fulfilled professionally?
* How much money do people with your skill make in your area for the kinds of jobs you're looking for?
* What are your strongest technical skills? Non-technical skills?
* What are your weakest technical skills? Non-technical skills?
* What kinds of non-technical skills and experience do you have that not many other people have?
# Intro to Job Applications

## The Interview Process

The most common parts of the job application process are:

* [New Lead](#new-lead)
* [Application](#application)
* [Culture Screen](#culture-screen)
* [Technical Screen](#technical-screen)
* [Manager Interview](#manager-interview)
* [Offer](#offer)

Other than the lead and the offer, it's important to note that these steps don't occur in a fixed order. All of these scenarios are plausible:

* You interview first with the hiring manager, then do a technical screen with the rest of the team. At that point, you do a culture screen with HR, at which point you're asked to submit a formal application for their system.
* You start by applying for a job, at which point you are given a technical screen. Then, You go through a culture screen with HR, followed by an additional technical screen. Finally, you meet with the manager and get an offer in the same meeting.
* You do 2 culture screens, followed by 4 rounds of technical screens. Upon passing, you're invited to formally apply, at which point you're interviewed by a manager.

While these interview process have a high degree of variance in their sequencing, the underlying elements are usually similar and a common set of strategies can be applied to them.

## New Lead

To start the process, you need to generate leads. These can come from a lot of places:

* Referrals from people you know in the industry
* Companies people you know are applying to
* Former employers
* Recruiters
* Cold emails and LinkedIn promotions
* Company websites
* Tweets, blog posts or presentations by people at the company
* Networking events
* Technical roles in non-technical companies

If you're only looking for leads for new developers in high-visibility, easily searchable places, you will likely be let down. Generating high-quality leads takes a lot of work.

### Application

A job application generally has 3 components:

* A resume highlighting your skills and experience
* A cover letter pitching yourself for the job
* The application mechanism

The application mechanism can be as simple as an email and as complex as a multi-stage online application.

### Culture Screen

Culture screens, also called phone screens, are quick non-technical conversations. The purpose of them is to go beyond the resume and cover letter and assess whether the company should invest more time in interviewing you. These are usually done by a recruiter, and occasionally by a hiring manager or other team member.

These are the questions they're trying to answer:

* Do you have the skills you claim to have in your application?
* Are you a fit for the company's culture?
* Can the company afford you? Can the company lowball you?
* Do you have any important traits (positive or negative) that weren't in your application?
* Are you likely to accept an offer if they make one? Are you likely to stick around if you do?

These questions are also assessed at every stage of the process, but the culture screen is seen as a relatively inexpensive way to screen out applicants who look promising on paper, but have obvious problems that will prevent them from being successful later in the process.

### Technical Screen

Technical screens have the most variance. These are some common types of technical screen:

* Automated online coding tests
* In-person whiteboarding interviews, where you are given a problem and must work through it live in front of one of more people
* Portfolio reviews, where you present some of your work and talk through it
* Take-home challenges, where you're given a problem and asked to submit a solution after a period of time, usually a week
* Trivia, where you're asked to answer a series of technical questions

It's not unusual for a company to use a combination of these, or even have multiple rounds of the same type of technical screen. Other companies may use very limited technical screens or even none at all.

### Manager Interview

The manager interview is very similar to the culture screen, but is usually conducted by the hiring manager or even an executive at the company. Many of the questions will be the same or similar to those in the culture screen, but may involve more depth or follow-up questions. You may talk more specifically about compensation expectations, specific roles (if there are multiple roles they're considering you for), and long-term career goals. This interview may include an overview of the company's compensation strategy or even end in an offer or hiring decision.

### Offer

An offer consists of these elements:

* A title
* A start date
* A compensation package

If you don't have these, you don't have an offer yet. Especially with smaller companies, be careful about assuming that you've landed a job just because the people you've been interviewing with have been acting like you got it.

When you get an offer, there's still some work to do. You need to consider whether you'll accept the offer or attempt to negotiate it, and you need to weight it against other opportunities you've been interviewing for. You may be able to leverage the offer into speeding up your other application processes if there are some that you are especially interested in. You also need to weight the total value of the compensation package, including benefits. Especially for tech jobs, benefits can radically change the value of an offer.

Note that even when you get an offer, you can still pass if the job still isn't what you're looking for.

## Reflection

It's common to find yourself consistently getting stuck in one part of the process. For example:

* You can't generate any leads
* You throw a lot of applications out, but never get a response
* You get a lot of phone screens, but rarely get invited to do technical screens
* You consistently make it to final round of interviews, but haven't gotten an offer

This is normal. Consider it feedback from the market that something you're doing at the stage you're stuck at isn't working, and take it as an invitation to adjust your approach.

The most common feedback you'll get with any rejection is "We're looking for someone with more experience," which can become very disheartening. This is rarely true. This kind of rejection is called a polite no, and it just means you didn't pass that part of the interview.
Job Application: Interview Process
Job Application: New Lead
Job Application: Culture Screen
Job Application: Technical Screen
Job Application: Manager Interview
Job Application: Offer
* What is the most preferrable way for a company to find new candidates? The least preferrable?
* What is a cold application?
* What is a warm application?
* What are 3 ways you can warm up a cold application?
# Applications: Strategy For New Developers

Getting a job in tech is takes a long time and is emotionally exhausting. It helps to be organized.

## The Job Funnel From An Employer's Perspective

An employer would generally prefer to hire from these sources, in this order:

1. **Internal transfer**: They already know and trust the person, and just need to move them into a new role.
2. **Internal referral**: The person has already been vetted by someone they know and trust.
3. **Internal recruiter**: The company is already paying for an internal recruiter, and is relying on their expertise to locate the best people for their roles.
4. **Closed job posting**: These are job postings to smaller communities, such as meetups or local job boards, or just listings on the company's website. The company usually doesn't have to pay for them, and can often target a particular audience.
5. **External recruiter**: These are recruiters outside the company who take a fee for finding and vetting candidates.
6. **Open job posting**: These are job postings, usually paid, on large public boards like Monster or Indeed. The effort for applying to these is lowest, so the candidate quality is usually lowest too.

One of the most common issues you'll come across in a job search is none of the open postings are looking for developers without experience. While the job search is definitely hardest for new developers, a lack of open postings doesn't actually reflect any kind of absence of opportunity. Rather, it means that most companies are already able to easily fill those roles using one of the first 3 options, so they often only resort to the last 3 options if they're desperate.

## Types of Application

### Cold Applications

A cold application is when you see a job posting and apply to it. This is the least effective way to find a new job because your hit rate will be very low, but it occasionally works and should be a part of your job search strategy. Some tips:

* LinkedIn's "Easy Apply" feature is one of the easiest and most efficacious ways to cold-apply to jobs. These can be as easy as clicking a button.
* Don't be put off by experience or education requirements in a job posting. If you'd like to do the job, apply for it. Remember, it's never your job to filter yourself out. There's a good chance that even if you don't meet the posted qualifications, you may be the most qualified person who applies. You may also be interesting to the company for a different role.
* Look for opportunities to "warm up" your application by connecting with someone who already works there at a networking event.
* Even though they're cold applications, you should still put some effort into writing a tailored resume and cover letter. Look at them as opportunities to get faster at learning about companies and to try new things and hone your pitch.

### Warm Applications

Warm applications are one where you know someone at the company. The person doesn't need to be a former coworker or childhood friend-- they can be someone you met at a meetup or had a conversation with online. This can give you a name to reference in a cover letter, turn into an introduction to a recruiter or hiring manager, or otherwise be a valuable source of information about the company and the position. There's an old adage that if you ask for a job you'll get advice, and if you ask for advice you'll get a job. Frame your conversation in terms of what you'd like to learn and you'll have better results than if you just beg strangers for jobs.

### Recruitment

Recruitment is when a company recruiter finds you and asks you to apply to the company. This is a good thing, but note that it's not always a guarantee that you'll even get an interview. Recruiters are expected to generate a lot of applications. It's possible that they read all about you, checked out your portfolio, and decided that you're a great match for the company. It's also possible they found a keyword on your LinkedIn profile that matched something they were looking for and asked you to apply.

### Referrals

The easiest way to get a referral is if you already know someone at the company. If you don't already know someone, here are some ways to meet them:

* Network with software developers at non-tech events. Even if someone can't speak to your technical skills but knows you were a reliable and hard-working softball teammate, they may refer you.
* Speak at meetups. Meetups are always looking for speakers, even from newer developers. The industry is always changing, and you don't need to be an expert to know something that someone else doesn't yet. This is a great chance to advertise yourself to recruiters and other developers.
* Help other developers and recruiters find who they're looking for. This is the most underused strategy for ingratiating yourself to recruiters and developers. If you talk to enough people, you'll find opportunities to connect them with each other. If you know a senior developer who is looking for a new role and you can introduce them to someone who's looking for a new tech lead, you now have two people who want.

## Managing Your Applications

As you're applying for jobs, you need to stay organized. For each application, keep track of:

* The name of the company
* The details of the job you applied for (better to copy/paste them in the case the posting gets taken down)
* What you've learned about the company
* The names of anyone you know or have interacted with there, what you talked about, and when you talked to them
* The status of the application, such as "New Lead", "Applied", "In-process", "Rejected", and "Offer".

If you're following up on something you were asked to do, try to get back in a day. If they haven't gotten back to you with something you were expecting from them, a week is a reasonable period of time for a follow-up. When you follow-up, try to add new information instead of just asking "Any updates?" For example, follow-up on a question you were asked with new research you found or a new project you've been working.

You always need to be throwing job opportunities into the top of your funnel, even if you feel sure you're about to get an offer. The application process for tech jobs usually takes at least a month, and if all of your most promising applications fall through, you don't want to wait at least a month for something else to land.

Remember that getting rejected from a job doesn't mean getting rejected from the company forever. It's reasonable to reapply again in a couple of months (hopefully with new skills or projects to show), and doing so even demonstrates that you're interested in working for this specific company.
Job Application: Internal transfer
Job Application: Internal referral
Job Application: Internal recruiter
Job Application: Closed job posting
Job Application: External recruiter
Job Application: Open job posting
Job Application: Cold Application
Job Application: Warm Application
Job Application: Recruitment
Job Application: Referral
Convert these variables to an array:

```js
const user1 = "Pat"
const user2 = "Enrique"
const user3 = "Dominique"
```

---

Combine these two arrays:

```js
const firstArray = ["A", "B", "C"]
const secondArray = ["D", "E", "F"]
```
* Describe JavaScript arrays in your own words
* How do you tell how many elements are in an array?
* How do you add an element to the end of an array?
* How do you add an element to the start of an array?
* How do you remove an element from the start of an array?
* How do you remove an element from the end of an array?
* How do you read an element from the start of an array without removing it?
* How do you read an element from the end of an array without removing it?
* Describe 0-based indexing
* How would you read the 6th element of an array?
* What is spreading an array? Why would you use it?
* What is an array index?
* What is an off-by-one error?
* Define these terms:
  * Array
  * Elements
  * Index
  * Push
  * Shift
  * Pop
  * Unshift
* Given this array:

```js
["Apple", "Banana", "Carrot"]
```

How would you print the "Carrot" element?
# JavaScript: Arrays

You have a shopping list:

```js
const item1 = "Apple"
const item2 = "Banana"
const item3 = "Carrot"
```

How could you tell that you have 3 items on the list? How would get the second item? How would you perform some operation on every item in the list?

```js
const shoppingList = [
  "Apple",
  "Banana",
  "Carrot",
]

console.log(
  shoppingList.length, // 3, the number of items on the list
  shoppingList[1], // "Banana", the second item on the list
  shoppingList.forEach(console.log), // Prints each item
)
```

Arrays store collections of related items.

## Indexing

To get an individual item in an array, access its index:

```js
const shoppingList = [
  "Apple",
  "Banana",
  "Carrot",
]
console.log(
  shoppingList[0], // "Apple"
  shoppingList[1], // "Banana"
  shoppingList[2], // "Carrot"
)
```

Trying to access an index that doesn't exist (like `shoppingList[3]`) will throw an error.

Indexes are zero-based, meaning that the first item has an index of 0, the second item has an index of 1, and so on.

## Methods, Properties, and Operations

### Adding and Removing Elements

To add an element to an array:

* Use `.push` to add an element to the end of an array
* Use `.unshift` to add an element to the beginning of an array

To remove an element from an array:

* Use `.pop` to remove an element from the end of an array
* Use `.shift` to remove an element from the beginning of an array

For example:

```js
const shoppingList = [
  "Banana",
  "Carrot",
]

shoppingList.push("Dates") // Adds to the end
const thisWillBeDates = shoppingList.pop() // Removes "Dates" from `shoppingList`
shoppingList.unshift("Apple") // Adds to the beginning
const thisWillBeApples = shoppingList.shift() // Removes "Apple" from `shoppingList`
```

## Getting Part of an Array

To get part of an array, use the `.slice` method:

```js
const array = ["A", "B", "C", "D", "E", "F", "G"]
const substring = string.slice(2, 4) // ["C", "D", "E"]
```

`.slice` takes a starting index and an ending index. Note that both of these are zero-based.

### Spreading

`.push`, `.pop`, `.shift`, and `.unshift` each change the original array. An alternative way to add elements that preserves the original array is using the spread operator, `...`. Consider:

```js
const someArray = [1, 2, 3]
someArray.push(4)
const anotherArray = [...someArray, 5]
const yetAnotherArray = [0, ...someArray]
console.log(someArray) // [1, 2, 3, 4]
console.log(anotherArray) // [1, 2, 3, 4, 5]
console.log(yetAnotherArray) // [0, 1, 2, 3, 4, 5]
```

### `.length`

`.length` returns how many items are in the array. This is _not_ zero-based, so an array with 1 item in it will have a `.length` of 1. This can create some confusion when iterating, because the number of items will always be 1 more than the last valid index.

## Terminology

* Array: A collection of elements
* Elements: Each item in an array
* Index: A number representing the location of an individual element
* Push: Add an element to the end of an array
* Shift: Add an element to the front of an array
* Pop: Remove an element from the end of an array
* Unshift: Remove an element from the front of an array

## Watch Out!

* When you store an array in a variable, its name should be plural. An array of `person` is `people`, an array of `user` is `users`, an array of `number` is `numbers`. If the element is uncountable (like `pokemon`), consider distinguishing it with a modifier like `pokemonList`.
* Array indexes start at 0, not 1.
* When iterating through an array, make sure you don't accidentally try to access an index that doesn't exist:

```js
const someArray = ["a", "b", "c"]

for (let i = 0; i <= someArray.length; i++){
  console.log(someArray[i])
}
```

This will break because the length of the array is `3`, and `someArray[3]` doesn't exist. This works:

```js
const someArray = ["a", "b", "c"]

for (let i = 0; i < someArray.length; i++){
  console.log(someArray[i])
}
```

This is called an "off by one error" is a frequent source of frustration in programming.

## History

The reason array indexes start at 0 is because of how the data has historically been stored on the computer. Traditionally, every item in an array is stored next to each other in the computer's memory:

![Diagram of an array with indexes](assets/array-zero-indexing-2.png)

The memory address the computer stores for the location of the array is the location of the first element and the index you pass in is an "offset", or how many spaces over the computer should count to find the element you want.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | MDN's reference on arrays |
| [MDN: Array Tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | MDN's tutorial on arrays |
| [Video: JavaScript Arrays](https://www.youtube.com/watch?v=8FmBEN0XZyI) | Dev Ed's guide to JS Arrays |
Array
Array: Index
Zero-Based Index
Method
Property
Array: `push`
Array: `pop`
Array: `shift`
Array: `unshift`
Array: `slice`
Array: Spread
Array: Element
Variable
Iteration
Off-By-One Error
Memory Address
Offset
`fetch` the data at `https://pokeapi.co/api/v2/pokemon/pikachu` and log it using `async`/`await`

---

Convert this all of this `.then`/`.catch` code to `async`/`await`:

```
fetch(someUrl)
  .then(response => response.json())
  .then(console.log)
  .catch(error => {
    console.error(error.message)
  })
```

---

[Async / Await Refactoring Exercise](https://github.com/sikaeducation/async-await-refactoring)
* Does `async`/`await` replace `.then`/`.catch`? Why or why not?
* What is the relationship between `async`/`await` and promises?
* What is at least one advantage of `async`/`await`?
* What is at least one drawback to `async`/`await`?
* What is required to be able to use `await`?
* What do you need to consider when calling an async function?
* Which function syntaxes support async functions?
* What is a `try`/`catch` block?
* Why won't this code work?

```js
const response = await fetch(someUrl)
```

* What needs to be added to make this code work?

```js
function displayData(){
  const response = await fetch(someUrl)
}
```

* What is the least modification you could do to make this code work?

```
someForm.addEventListener("submit", event => {
  event.preventDefault()
  const response = await fetch(someUrl)
  console.log(response)
})
```
# JavaScript: `async` / `await`

`.then` / `.catch` is one syntax for working with promises, but it's not the only one. These are equivalent:

```js
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then(response => {
    return response.json()
  }).then(parsedResponse => {
    console.log(parsedResponse)
  })
```

```js
async function showPikachu(){
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  const parsedResponse = await response.json()
  console.log(parsedResponse)
}
```

`async` / `await` helps your asynchronous code look synchronous, which can make it easier to read and understand.

## `async` / `await`

To use `await` instead of `.then`, you need to be inside of an `async` function. To do this, add the word `async` in front of the `function` keyword:

```js
// A regular function
function someFunction(){
}

// An async function that can use await
async function someAsyncFunction(){
}
```

This will also work with all of the different function syntaxes:

```js
async function anAsyncFunction(){}
const anAsyncFunction = async function(){}
const anAsyncFunction = async () => {}
someElement.addEventListener(async event => {})
```

Once you're inside an `async` function, you can use the `await` keyword to use a promise the same way you would use a synchronous value:

```js
async function fetchSomeData(url){
  const response = await fetch(url)
  const parsedResponse = await response.json()

  return parsedResponse
}
```

Note that calling an async function is asynchronous:

```js
async function anAsyncFunction(){
  // Some async stuff
}

async function anotherAsyncFunction(){
  const result = await anAsyncFunction() // Needs to await to control flow
}
```

You can also mix and match `.then`/`.catch` and `async`/`await` since they're the same data type:

```js
async function anAsyncFunction(){
  const response = await fetch(someUrl).then(response => response.json())
  console.log(response)
}
```

## `try` / `catch`

Errors handling is less elegant in `async`/`await`. To handle errors, you need to use the built-in `try`/`catch` blocks:

```js
async function anAsyncFunction(){
  try {
    const response = await fetch(someUrl)
    const parsedResponse = await response.json()
  } catch (error){
    console.error(error.message)
  }
}
```

The browser will try to run all of the code in the `try` block. If any of it throws an error, it will move the `catch` block, with `error` representing an object with details about the error that occurred.

## Watch Out!

`async`/`await` is not a replacement for `.then`/`.catch`, it's an alternate syntax for working with promises. `async`/`await` comes with tradeoffs. You can come up with examples where `async`/`await` is clearly more readable:

```js
// .then / .catch
fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then(response => {
    return response.json()
  }).then(parsedResponse => {
    console.log(parsedResponse)
  })

// async/await
async function showPikachu(){
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
  const parsedResponse = await response.json()
  console.log(parsedResponse)
}
```

However, `async`/`await` loses a lot of its readability advantage once errors are handled and more advanced syntax is used:

```js
// .then / .catch
const parsedResponse = response => response.json()
const url = "https://pokeapi.co/api/v2/pokemon/pikachu"

fetch(url)
  .then(parsedResponse)
  .then(console.log)
  .catch(console.error)

// async/await
async function showPikachu(){
  const url = "https://pokeapi.co/api/v2/pokemon/pikachu"

  let response
  try {
    response = await fetch(url)
    const parsedResponse = await response.json()
    return parsedResponse
  } catch (error) {
    console.log(error)
  }
}
```

There are great uses for both syntaxes and you should be fluent in both.

---

You can only `await` inside of an `async function`. So, this works:

```js
async function someFunction(){
  const response = await fetch(someUrl)
}
```

This will not:

```js
const response = await fetch(someUrl)
```

Nor will this:

```js
function someFunction(){
  const response = await fetch(someUrl)
}
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Async Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) | MDN's reference on async functions |
| [MDN: Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) | MDN's reference on `await` |
| [MDN: Async/Await Tutorial](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) | MDN's tutorial on `async`/`await` |
| [Video: JavaScript Async Await](https://www.youtube.com/watch?v=V_Kr9OSfDeU) | Web Dev Simplified's guide to `async`/`await` |
JavaScript: `async`
JavaScript: `await`
JavaScript: `.then`
JavaScript: `.catch`
JavaScript: Promises
Syntax
Asynchronous Code
Synchronous Code
Function
Try
Catch
Brower
Block
Object
Error
Make a `fetch` request to https://pokeapi.co/api/v2/pokemon/pikachu and log the body of the response.
* How do you make HTTP requests in JavaScript?
* What is `fetch`'s first parameter?
* Which HTTP methods are available with `fetch`?
* What does the `response.json()` method do?
* What are the steps needed to get the body out of a `fetch` request?
# JavaScript: `fetch`

How do you use APIs in JavaScript?

```js
const url = "https://pokeapi.co/api/v2/pokemon/pikachu"
fetch(url)
  .then(response => {
    return response.json()
  }).then(parsedResponse => {
    console.log(parsedResponse.name) // "pikachu"
    console.log(parsedResponse.weight) // 160
    console.log(parsedResponse.id) // 25
  })
```

`fetch` is a built-in function that takes a URL as an argument. By default, it makes an HTTP GET request to that URL. To read the response, you need to use the `.then` methods:

```
fetch(url)
  .then(response => {
    console.log(response) // This is an object with data about the HTTP response, its headers, its status code, etc.

    return response.json() // This takes a HTTP response body that's formatted as JSON and turns it into a JavaScript object
  }).then(parsedResponse => {
    console.log(parsedResponse) // This is the data from the API. Anything logic that needs this data has to come after this.
  })
```

## Watch Out!

* Despite the name, `fetch` is used for all HTTP requests, not just requests that use the `GET` method.
* `response.json()` turns a JSON HTTP response body into a JavaScript object, not the other way around. It does not transform the response into JSON.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) | MDN's reference on `fetch` |
| [MDN: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) | MDN's guide to `fetch` |
| [MDN: Fetch Tutorial](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data) | MDN's tutorial on `fetch` |
| [Video: Learn Fetch API in 6 Minutes](https://www.youtube.com/watch?v=cuEtnrL9-H0) | Web Dev Simplified's guide to `fetch` |
JavaScript: `fetch`
JavaScript
API
Function
URL
Argument
HTTP GET
HTTP Request
JSON
HTTP Response Body
Object
Filter:

* `[1, 3, 5, 7, 9]` => `[5, 7, 9]`
* `[1, 2, 3, 4, 5]` => `[2, 4]`
* `["cat", "bird", "snake", "piggy", "walrus", "capybara"]`=> ["piggy", "walrus", "capybara"]
* `[{ name: "Alice", paid: true }, { name: "Bill", paid: false }, { name: "Carol", paid: true }]` => `[{ name: "Alice", paid: true }, { name: "Carol", paid: true }]`
* `[{ name: "Alice", age: 8 }, { name: "Bill", age: 20 }, { name: "Carol", age: 18 }]` => `[{ name: "Bill", age: 20 }, { name: "Carol", age: 18 }]`

---

Find:

* `["cat", "bird", "snake", "piggy", "walrus", "capybara"]`=> "walrus"
* `[{ name: "Alice", age: 8 }, { name: "Bill", age: 20 }, { name: "Carol", age: 18 }]` => `{ name: "Bill", age: 20 }`
* Describe filtering in your own words
* Describe finding in your own words
* Indicate whether this means that something should be a filter or a find based on the provided data:
  * It returns an array with the same number of values it started with
  * It returns an array with a different number of values than it started with
  * It returns something other than an array
  * It starts and ends with an array
  * It returns `null`
# JavaScript: `.find` and `.filter`

When you have an array, what happens when you need to locate a particular element in the array or find everything that matches some criteria?

## `.find`

`.find` searches an array for a single match:

```js
const people = [{
  id: 1,
  name: "Miles Davis",
  isAlive: false,
},{
  id: 2,
  name: "John Coltrane",
  isAlive: false,
},{
  id: 3,
  name: "Wayne Shorter",
  isAlive: true,
},{
  id: 4,
  name: "John Scofield",
  isAlive: true,
}]

const miles = people.find(person => {
  return person.id === 1
})
const trane = people.find(person => {
  return person.name === "John Coltrane"
})
```

The function passed into `.find` should return `true` for the match you're looking for.

## `.filter`

Instead of just the first match, `.filter` searches an array for every match:

```js
const people = [{
  id: 1,
  name: "Miles Davis",
  isAlive: false,
},{
  id: 2,
  name: "John Coltrane",
  isAlive: false,
},{
  id: 3,
  name: "Wayne Shorter",
  isAlive: true,
},{
  id: 4,
  name: "John Scofield",
  isAlive: true,
}]

const livingPeople = people.find(person => {
  return person.isAlive === true // You could also just return `person.isAlive` since it's already a boolean
})

console.log(livingPeople)
/*
[{
  id: 3,
  name: "Wayne Shorter",
  isAlive: true,
},{
  id: 4,
  name: "John Scofield",
  isAlive: true,
}]
*/
```

The function passed into `.filter` should return `true` if the element should be kept in the new array.

## Watch Out!

* If multiple things return `true` in a `.find`, `.find` will evalute to the first match.
* `.find` will evaluate to whatever data time the first match is.
* `.filter` will always evaluate to an array, even if there is only one match. If you ever write code that looks like `someArray.filter(someItem => someItem.someCondition)[0]`, you probably want `.find` instead.
* Don't get clever with names for the array and the argument passed into the function. Arrays should be plural, and the argument passed into the function should be the singular version of the plural whenever possible. `people.find(person => {})`, `users.find(user => {})`, `pokemonList.filter(pokemon => {})`

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) | MDN's reference on `.find` |
| [MDN: `.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | MDN's reference on `.filter` |
| [Video: JavaScript Array Filter](https://www.youtube.com/watch?v=4_iT6EGkQfk) | Programming With Mosh's guide to mapping |
| [Video: Array Find Method in JS](https://www.youtube.com/watch?v=N1QcR8F3xFY) | DCode's guide to finding |
JavaScript: `.find()`
JavaScript: `.filter()`
Array
Function: Return Statement
Argument
Function
Given an array of DOM nodes, add each of them to a list.

---

Given an array of messages, log them each to the console.
* Describe `forEach` in your own words
* What does `.forEach` return?
* What does the function passed into `.forEach` return?
# JavaScript: `.forEach`

Looping in JavaScript is traditionally done with `for` loops:

```js
const messages = ["Hi", "Hola", "Howdy", "How are you?"]

for (let i = 0; i < messages.length; i++){
  console.log(messages[i])
}
```

This is fine, and has advantages in some situations. It's also really easy to make mistakes:

[A diagram of places you can make mistakes in for loops](assets/bad-for-loop.png)

Luckily, there is a better way.

```js
const messages = ["Hi", "Hola", "Howdy", "How are you?"]

messages.forEach(message => {
  console.log(message)
})
```

## Functions That Take Functions As Arguments

It may look unusual, but you can pass a function into another function as an argument:

```js
function someFunction(anotherFunction){
  anotherFunction()
}

someFunction(() => console.log("Hi!"))
```

These are called higher-order functions. There are a lot of powerful ways to use them, but for now you only need to get comfortable with this syntax:

```js
[1, 2, 3].forEach(number => {
  console.log(number)
})
```

The function that was given to `.forEach` is called an arrow function. These are also called fat arrow functions or lambdas. You could also write the above example like this:

```js
[1, 2, 3].forEach(function(number){
  console.log(number)
})
```

Arrow functions have some other interesting features, but for now the important thing is getting used to thinking of them as normal functions.

## Using `.forEach`

`.forEach` is a method on arrays, and it takes one argument: A function definition. That function will be called with each element in the array, one after another. For example:

```js
const activeUsers = document.querySelector(".active-users")
const someElements = document.querySelectorAll(".user")
someElements.forEach(element => {
  activeUsers.append(element)
})
```

## Watch Out!

* `.forEach` is available on every array or node list, but _not_ most objects.
* `.forEach` doesn't evaluate to anything. It's just for doing an operation for every element in an array, so the function inside it shouldn't return anything.

```js
const numbers = [1, 2, 3].forEach(number => {
  return number
})

console.log(numbers) // undefined
```

* Don't get clever with names for the array and the argument passed into the function. Arrays should be plural, the argument passed into the function should be the singular version of the plural whenever possible. `people.forEach(person => {})`, `users.forEach(user => {})`, `pokemonList.forEach(pokemon => {})`

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) | MDN's reference on `.forEach` |
| [Video: `.forEach` Explained](https://www.youtube.com/watch?v=6Hb0qZ3PVWI) | Ania Kubow's guide to `.forEach` |
JavaScript
Looping
Function
Higher-Order Function
Syntax
JavaScript: Arrow Function
Array
Method
DOM: Node List
* Create a form that allows a user to input a screen name.
* Display their screen name on the page
* When the page loads, check to see if there is a screen name in `localStorage`. If there is, use it and don't display the form.

---

Go to a website that requires you to log in. Open up your browser's dev tools and see if it's storing anything in `localStorage`. If so, use the `localStorage` methods to print the contents to the console.
* What does `localStorage` do?
* How long does data saved in `localStorage` last?
* What data types can be stored in `localStorage`?
* How do you store an object in `localStorage`?
* Name 2 uses for `localStorage`
* What kinds of activities cause `localStorage` to be cleared out?
# JavaScript: `localStorage`

HTTP is normally stateless, meaning that one HTTP request or page load doesn't know anything about the requests that came before it. What if you want to keep some state between pages? For example:

* Rememering that a user is logged in
* Saving loaded data in the browser so that the browser doesn't have to make an HTTP request
* Saving preferences

To persist this kind of data, you can use the `localStorage` API.

## `localStorage`

`localStorage` is built into the browser as a way to store data that will stick around through page loads and refreshses.

```js
localStorage.setItem("username", "emilyremler")
```

`localStorage` uses key/value storage, just like objects. Some useful `localStorage` methods:

* `localStorage.setItem("someKey", "Some Value")` - Sets an item
* `localStorage.getItem("someKey")` - Retrieves an item
* `localStorage.removeItem("someKey")` - Removes an item
* `localStorage.clear()` - Removes all items

## Watch Out!

* `localStorage` can only store strings. If you want to keep an object in `localStorage`, you need to serialize it into something like JSON with `JSON.stringify()`, and turn it back into an object when you pull it out of `localStorage` with `JSON.parse`.
* You can't control how long a browser will keep something in `localStorage`, outside of manually setting and removing items. The implementation differs between browsers, but `localStorage` will often be cleared out when a user deletes history or cookies from their browser.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | MDN's reference documentation on `localStorage` |
| [MDN: Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) | MDN's guide to `localStorage` and `sessionStorage` |
| [Video: How to Use Local Storage in JavaScript](https://www.youtube.com/watch?v=k8yJCeuP6I8) | Dcode's guide to `localStorage` |
JavaScript: `localStorage`
HTTP
Stateless
HTTP Request
State
API
Key/Value Pair
JSON
Cookie
JavaScript: `JSON.stringify()`
JavaScript: `JSON.parse()`
* `[1, 2, 3]` => `[2, 4, 6]`
* `[1, 2, 3]` => `["1", "2", "3"]`
* `["pikachu", "squirtle", "bulbasaur"]` => `["Pikachu", "Squirtle", "Bulbasaur"]`
* `[{ name: "Pikachu" },{ name: "Squirtle"},{ name: "Bulbasaur" }]` => `["Pikachu", "Squirtle", "Bulbasaur"]`
* `[{ name: "Alice", age: 8 },{ name: "Bill", age: 20 },{ name: "Carol", age: 18}]` => `[{ name: "Alice", age: 8, isAdult: false },{ name: "Bill", age: 20, isAdult: true },{ name: "Carol", age: 18, isAdult: true}]`
* `[{ name: "Pikachu" },{ name: "Squirtle"},{ name: "Bulbasaur" }]` => `[<li>Pikachu</li>, <li>Squirtle</li>, <li>Bulbasaur</li>]` (These are DOM elements)
* Describe mapping in your own words
* Indicate whether this means that something should or shouldn't be a map based on the provided data:
  * It returns an array with the same number of values it started with
  * It returns an array with a different number of values than it started with
  * It returns something other than an array
  * It doesn't return anything
  * It changes the original array
  * It returns a transformed version of the original array
  * It starts and ends with an array
# JavaScript: Map

One of the more common tasks in programming is to take an array and do something with every item in it. For example if we have these users:

```js
const users = [{
  username: "Alice",
  active: true,
  age: 22,
},{
  username: "Bob",
  active: false,
  age: 54,
},{
  username: "Carrie",
  active: true,
  age: 30,
}]
```

How would you get a list of all their names? You could do it the long way:

```js
const usernames = []

for (let i = 0; i < users.length; i++){
  let user = users[i]
  let username = user.username
  usernames.push(username)
}

console.log(usernames) // ["Alice", "Bob", "Carrie"]
```

Or you could do something similar with `.forEach`:

```js
const usernames = []

users.forEach(user => {
  usernames.push(user)
})

console.log(usernames) // ["Alice", "Bob", "Carrie"]
```

The best way to do it is with `.map`:

```js
const usernames = users.map(user => user.username)

console.log(usernames) // ["Alice", "Bob", "Carrie"]
```

## Using `.map`

Mapping transforms an array from one thing to another. Some rules:

* You always start and end with the same number of elements. If there were 100 items in the source array, there will be 100 items in the destination array.
* The source array is unaffected by mapping
* The destination array is what `.map` evaluates to
* The function that's passed into map will be applied to every element in the array

## Examples

### Math

You can use `.map` to perform the same math operation on every number in an array.

```js
const doubledNumbers = [1, 2, 3].map(number => number * 2)
console.log(doubledNumbers) // [2, 4, 6]
```

### Data Wrangling

Also called "data munging", data wrangling is adding, removing, or transforming data from one format to another.

```js
const people = [{
  firstName: "Alice",
  lastName: "Coltrane",
  birthday: "1937-08-27",
},{
  firstName: "Bill",
  lastName: "Evans",
  birthday: "1929-08-16",
},{
  firstName: "Chet",
  lastName: "Baker",
  birthday: "1929-12-23",
}]

const transformedPeople = people.map(person => {
  const birthday = Date.parse(person.birthday)
  const today = Date.now()
  const age = Math.round((today - birthday) / (1000 * 60 * 60 * 24 * 365)) // Rough formula for calculating age

  return {
    firstName: person.firstName,
    lastName: person.lastName,
    fullName: `${person.firstName} ${person.lastName}`,
    age: age,
  }
})
console.log(transformedPeople)
/*
const people = [{
  firstName: "Alice",
  lastName: "Coltrane",
  fullName: "Alice Coltrane",
  age: 84,
},{
  firstName: "Bill",
  lastName: "Evans",
  age: 92,
},{
  firstName: "Chet",
  lastName: "Baker",
  age: 92,
}]
*/
```

### Plucking

Taking an array of objects and transforming it into an array of objects with only some of the original properties is called plucking.

```js
const usernames = users.map(user => user.username)

console.log(usernames) // ["Alice", "Bob", "Carrie"]
```

## Watch Out!

* If your map function does what you want and doesn't have a return value, you're not actually mapping.
* Arrow functions that fit on one line take implicitly return. That means that this:

```js
const usernames = users.map(user => user.username)
```

Is identical to this:

```js
const usernames = users.map(user => {
  return user.username
})
```
* Don't get clever with names for the array and the argument passed into the function. Arrays should be plural, the argument passed into the function should be the singular version of the plural whenever possible. `people.map(person => {})`, `users.map(user => {})`, `pokemonList.map(pokemon => {})`

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) | MDN's reference on `.map` |
| [FreeCodeCamp: How `Array.prototype.map` works](https://www.freecodecamp.org/news/how-array-prototype-map-works-b6b69379c3af/) | FreeCodeCamp's tutorial on `.map` |
| [Video: JavaScript Array Map](https://www.youtube.com/watch?v=G3BS3sh3D8Q) | Programming With Mosh's guide to mapping |
JavaScript
Array: Map
Array: Each
Array: Element
Number
Data Wrangling
Data Munging
Array: Pluck
Function: Return Statement
Given this object:

```js
const pokemon = {
  name: "Pikachu"
  images: [{
    alt: "Pikachu strutting",
    url: "pokemon-images.com/pikachu-1.jpg",
  },{
    alt: "Pikachu dancing",
    url: "pokemon-images.com/pikachu-2.jpg",
  }],
}
```
How would you access the alt text of the first image?

What is the value of `pokemon.images[1].url`? What is its data type?

---

Given this object:

```js
const message = {
  content: "Hello, world!",
  print: function(){
    console.log(this.content)
  },
}
```

How would you call the function?

---

Convert these variables into an object:

```js
const productName = "Apple"
const productPrice = 0.79
const productManufacturer = "Dole"
```
---

Convert these variables into a nested object:

```js
const productName = "Apple"
const productPrice = 0.79
const productManufacturerName = "Dole"
const productManufacturerCountry = "USA"
```
* Describe JavaScript objects in your own words.
* What is a key/value pair?
* What are 2 ways to access values in JavaScript objects?
* Define these terms:
  * Object
  * Property
  * Method
  * Dot notation
  * Bracket notation
# JS: Objects

How would you represent a person's attributes in code?

```js
const firstName = "Miles"
const lastName = "Davis"
const age = 100
```

This works pretty well, until we have more than one person.

```js
const firstName1 = "Miles"
const lastName1 = "Davis"
const age1 = 100

const firstName2 = "John"
const lastName2 = "Coltrane"
const age2 = 95
```

This is starting to get awkward. Even worse, how would I write code that gets John Coltrane's age? How can I keep all these related variables together?

## Objects

In JavaScript, an object is a collection of keys and values:

```js
const miles = {
  firstName: "Miles",
  lastName: "Davis",
  age: 100,
}
const john = {
  firstName: "John",
  lastName: "Coltrane",
  age: 95,
}
```

![Diagram of an object](assets/js-objects.png)

Objects generally group together related values. Keys are always strings and values can be any valid JavaScript expression, including strings, numbers, booleans, and even functions, arrays, and other objects:

```js
const miles = {
  firstName: "Miles",
  lastName: "Davis",
  age: 100,
  isAlive: false,
  play: () => {
    console.log("Doot doot")
  },
  saxophonists: ["John Coltrane", "Cannonball Adderly", "Wayne Shorter"],
}
```

## Nested Objects

Objects can also have objects as values:

```js
const musician = {
  id: 1,
  name: "Mike Stern",
  guitar: {
    brand: "Fender",
    model: "Telecaster",
    finish: "Natural"
    play: songTitle => {
      console.log(`I'm playing ${songTitle}!`)
    }
  },
}
```

To get the model of Mike Stern's guitar, you would access `musician.guitar.model`. When working with nested objects, it's easiest to think left-to-right. `musician` is the entire object:

```js
{
  id: 1,
  name: "Mike Stern",
  guitar: {
    brand: "Fender",
    model: "Telecaster",
    finish: "Natural",
    play: songTitle => {
      console.log(`I'm playing ${songTitle}!`)
    }
  },
}
```

`musician.guitar` is the musician's guitar:

```js
{
  brand: "Fender",
  model: "Telecaster",
  finish: "Natural",
  play: songTitle => {
    console.log(`I'm playing ${songTitle}!`)
  }
}
```

`musician.guitar.model` is the musician's guitar's finish:

```js
"Telecaster"
```

When you get a value out of an object or nested object, you do any operation you could normally do on that data type. For example, you can capitalize any string by using `.toUpperCase()`, so this is allowed:

```js
musician.guitar.model.toUpperCase()
```

If the value is a function, you can call it and pass in arguments, just like you would with any other function:

```js
musician.guitar.play("Chromazone") // prints "I'm playing Chromazone!"
```

## Terminology

* Object: A collection of keys and values
* Property: A key/value pair where the value is anything other than a function
* Method: A key/value pair where the value is a function
* Dot notation: Accessing properties and methods with `.`: `miles.age`
* Bracket notation: Accessing properties and methods with `[]`: `miles["age"]`

## Watch Out!

* The only reason to use bracket notation is if you need to look up a property or method with a variable or expression. Otherwise, use dot notation.
* The word "object" is used very differently in most other programming languages. JavaScript objects are more similar to dictionaries in Python, hashes in Ruby, and associative arrays in PHP than they are to objects in those languages.
* Objects are the most powerful data type in JavaScript. Arrays, functions, DOM Nodes, DOM Node Lists, and events are actually different kinds of objects.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Object Basics](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics) | MDN's overview of objects |
| [MDN: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects) | MDN's tutorial on objects |
| [MDN: Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | MDN's reference on objects |
JavaScript: Object
Variable
JavaScript: Object Key
JavaScript: Object Value
Expression
JavaScript
String
Number
Boolean
Function
Array
JavaScript: Nested Object
Argument
JavaScript: Bracket Notation
DOM: Node
DOM: NodeList
DOM: Event
Convert this JSON string to a JavaScript object by hand:

```json
{
	"name": "Luke Skywalker",
	"height": "172",
	"mass": "77",
	"hair_color": "blond",
	"skin_color": "fair",
	"eye_color": "blue",
	"birth_year": "19BBY",
	"gender": "male",
	"homeworld": "https://swapi.dev/api/planets/1/",
	"films": [
		"https://swapi.dev/api/films/2/",
		"https://swapi.dev/api/films/6/",
		"https://swapi.dev/api/films/3/",
		"https://swapi.dev/api/films/1/",
		"https://swapi.dev/api/films/7/"
	],
	"species": [
		"https://swapi.dev/api/species/1/"
	],
	"vehicles": [
		"https://swapi.dev/api/vehicles/14/",
		"https://swapi.dev/api/vehicles/30/"
	],
	"starships": [
		"https://swapi.dev/api/starships/12/",
		"https://swapi.dev/api/starships/22/"
	],
	"created": "2014-12-09T13:50:51.644000Z",
	"edited": "2014-12-20T21:17:56.891000Z",
	"url": "https://swapi.dev/api/people/1/"
}
```

---

Convert this JavaScript object to JSON by hand:

```js
const person = {
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],
};
```

---

Convert this JavaScript object to JSON by hand:

```js
{
  home: {
    teamName: 'Beboppers',
    colors: ['red, 'yellow'],
    players: [{
      playerName: 'Dizzy Gillespie',
      number: 0,
      shoeSize: 16,
      points: 22,
    },{
      playerName: 'Charlie Parker',
      number: 5,
      shoeSize: 12,
      points: 19,
    }]
  },
  away: {
    teamName: 'Modal Mayhem',
    colors: ['black', 'blue],
    players: [{
      playerName: 'Miles Davis',
      number: 25,
      shoeSize: 8,
      points: 17,
    },{
      playerName: 'John Coltrane',
      number: 16,
      shoeSize: 13,
      points: 30,
    }]
  },
}
```
* What is JSON?
* What kind of data is JSON?
* Where is JSON used?
* What did JSON replace? Why?
* List 3 differences between JSON and JavaScript objects
* What does the `.json()` method in an `fetch` `response` object do?
* How do you access properties in a JSON string?
# JSON

JSON is a common format for sending and receiving data on the web.

```json
{
  "name": "Pikachu",
  "abilities": [{
    "name": "static"
  },{
    "name": "lightning-rod"
  }],
  "weight": 60
}
```

If this looks very similar to JavaScript objects, that's because the format was inspired by it. There are some notable differences though:

* Keys always needed to be in double-quotes
* String values need to be in double-quotes (booleans and numbers don't)
* Trailing commas are not allowed

The increased strictness allows programming languages to process it quicker.

## JSON is Language-Agnostic

JSON is a format for sending data over HTTP. HTTP is language agnostic, which means JSON is language agnostic. While the syntax is inspired by JavaScript, JSON can be read and created by Java, PHP, Ruby, Python, and any other language used on the web. Some examples:

| Client Data Format | HTTP Data Format | Server Data Format |
| --- | --- | --- |
| JavaScript Object | JSON | JavaScript Object |
| JavaScript Object | JSON | Ruby Hash |
| JavaScript Object | JSON | Python Dictionary |
| Python Dictionary | JSON | Java Object |
| Ruby Hash | JSON | JavaScript Object |

No matter what the language generating or receiving the request is, JSON can be used to send data between them.

## Watch Out!

JSON strings look like JavaScript objects, but its very important to understand that it's not a JavaScript data type. Once something is JSON, you can't access properties or iterate over values anymore until it's parsed back into an object. It is a format for serializing data.

## History

The predecessor to JSON was XML. A piece of XML data might look like this:

```xml
<user>
  <first-name>Cannonball</first-name>
  <last-name>Adderly</last-name>
</user>
```

The equivalent data in JSON looks like this:

```json
{
  "user": {
    "firstName": "Cannonball",
    "lastName": "Adderly",
  }
}
```

So why the switch from XML to JSON? By not having closing tags like XML, the data has fewer characters. Since network requests are a major bottleneck on the web, saving characters in HTTP responses helps to speed up the web.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) | MDN's reference on JSON |
| [MDN: JSON Tutorial](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) | MDN's tutorial on JSON |
| [Video: Learn JSON in 10 Minutes](https://www.youtube.com/watch?v=iiADhChRriM) | Web Dev Simplified's guide to JSON |
JSON
Web
JavaScript: Object
Object Key
String
Boolean
Number
Trailing Comma
HTTP
Data Type
XML
HTTP Response
Network Request
1. Make a fetch request to `https://pokeapi.co/api/v2/pokemon` to get a list of 20 pokemon
2. Transform the response so that it's an array of the URLs for each individual pokemon
3. Transform that array so that it's an array of fetch requests
4. Run all the fetch requests at once
5. Turn each response into a DOM node the dislays the Pokemon's name and a sprite
* How do you issue multiple HTTP requests simultaneously with JavaScript?
* What does `Promise.all` do?
* What data type does `Promise.all` accept?
* What data type does `Promise.all` return?
# JavaScript: `Promise.all`

Promises normally run sequentially:

```js
const urls = [
  "https://data-source.com/1",
  "https://data-source.com/2",
  "https://data-source.com/2",
]

fetch(urls[0])
  .then(response => response.json())
  .then(response1 => {
    return fetch(urls[1])
      .then(response => response.json())
      .then(response2 => {
        return fetch(urls[2])
          .then(response => response.json())
          .then(response3 => {
            console.log(response1, response2, response3)
          })
      })
  })
```

Not only is this code hard to read and maintain, it's also slow. If you had 120 requests and each one only took 1 second, it would still take 2 minutes to load all the data. How can you speed this up?

## `Promise.all`

`Promise.all` is a built-in utility that allows you to execute multiple promises at the same time, and resolves their results as an array.

```js
const urls = [
  "https://data-source.com/1",
  "https://data-source.com/2",
  "https://data-source.com/2",
]

// This turns each URL into a fetch request
const requests = urls.map(url => {
  return fetch(url).then(response => response.json())
})

Promise.all(requests)
  .then(responses => {
    console.log(responses[0], responses[1], responses[2])
  })
```

`Promise.all` accepts an array of promises and evaluates to a promise, which means it can be `.then`ed or `await`ed.

## Watch Out!

* JavaScript is case-sensitive- `Promise.all` starts with a capital `P`
* When doing many HTTP requests with `Promise.all`, you're still limited by how many HTTP requests the browser will send at one time. In many cases this limit is 6, although HTTP/2 effectively allows for much more.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: `Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) | MDN's reference on `Promise.all` |
| [Video: `Promise.all`](https://www.youtube.com/watch?v=01RTj1MWec0) | Coding Train's guide to `Promise.all` |
JavaScript: Promise
JavaScript: `Promise.all()`
Sequential Execution
Parallel Execution
HTTP Request
Array
JavaScript: `.then`
JavaScript: `.catch`
JavaScript: `async`
JavaScript: `await`
HTTP/2
[Promise It Won't Hurt](https://github.com/stevekane/promise-it-wont-hurt)

* Describe promises in your own words
* Name something that returns a promise
* How do you ensure that some code runs after a promise resolves?
# JavaScript: Promises

Ordinarily in JavaScript, code executes immediately:

```js
const a = 1
console.log(a) // This will always be 1
```

There are other things, like network requests, that take time:

```js
const a = fetch(someUrl)
console.log(a) // Won't have a value until the HTTP response comes back
```

## Promises

A promise is a data type in JavaScript that represents an eventual value.

```js
const a = fetch(someUrl)
console.log(a) // Unresolved promise

a.then(eventualValue => {
  console.log(eventualValue) // The HTTP response
})
```

While it has some differences, you can think of promises in the same category as strings, booleans, numbers, and other JavaScript data types. To work with the value a promise represents, you need to resolve the promise first with `.then` or `await`. This allows you to indicate which parts of your program depend on the resolved data and which ones don't:

```js
fetch(someUrl)
  .then(response => {
    // Do things that depend on the response
  })

// Do things that don't depend on the response
```

## Watch Out!

If all of the code in your application depends on the result of a promise like an HTTP request, then all of the logic has to happen after a `.then` or `await`. There are techniques for making this more readable, but something like this will never work:

```js
const data = ""
fetch(someUrl)
  .then(response => response.json())
  .then(parsedResponse => {
    data = parsedResponse
  })

console.log(data) // ""
```

---

`.then`/`.catch` and `async`/`await` are two different techniques for working with the promise data type. You can freely mix and match them, there is nothing that can only be accomplished with one of them.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) | MDN's reference on promises |
| [MDN: Guide to Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) | MDN's guide to promises |
| [MDN: Promises Tutorial](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises) | MDN's tutorial on promises |
| [Video: JavaScript Promises in 10 Minutes](https://www.youtube.com/watch?v=DHvZLI7Db8E) | Web Dev Simplified's guide to promises |
JavaScript: Promise
Network Request
Data Type
JavaScript
String
Boolean
Number
HTTP Request
JavaScript: `.then`
JavaScript: `.catch`
JavaScript: `async`
JavaScript: `await`
* What are 3 ways to declare a string? Compare and contrast the methods.
* What does it mean to escape something?
* What is an escape character?
* How do you tell whether one string contains another string?
* How do you embed a JavaScript expression in a string?
* How do you replace part of a string with another?
* How do you replace all of a string with another?
* What is a line break?
* How would you turn the string "United States of America" into just "America"?
* How do you save multiline strings?
* How do you find out how many characters are in a string?
# JavaScript: Strings

Strings are one of the basic types in JavaScript. The most common things you'll do with strings include:

* [Declaring strings](#Declaring-Strings)
* [Including special characters](#Including-Special-Characters)
* [Including JavaScript expressions in strings](#Including-JavaScript-Expressions-In-Strings)
* [Getting part of a string](#Getting-Part-Of-A-String)
* [Determining if one string is in another](#Determining-If-One-String-Is-In-Another)
* [Replacing a part of a string](#Replacing-A-Part-Of-A-String)
* [Creating multiline strings](#Creating-Multiline-Strings)

## Declaring Strings

There are 3 ways to make a string in JavaScript:

```js
const singleQuotes = 'This is a string'
const doubleQuotes = "This is a string"
const backTicks = `This is a string`
```

They are mostly equivalent, although backticks allow string interpolation and multiple lines.

## Including Special Characters

If you declare a string with double quotes, how do you include the `"` character in the string?

```js
const message = "As they say, \"When in Rome\""
```

Putting the `\` before a character "escapes" it, which keeps JavaScript from considering it part of JavaScript syntax. There are also "escape sequences" that include things like newlines (`\n`) and tabs (`\t`).

## Including JavaScript Expressions In Strings

Also called template literals, strings that are declared with backticks allow you to embed JavaScript variables and expressions in the string:

```js
const firstName = "Herbie"
const lastName = "Hancock"
const message = `Hello, my name is ${firstName} ${lastName}`

console.log(message) // "Hello, my name is Herbie Hancock"
```

Inside of backticks, the `${}` characters denote that the JavaScript inside should be executed and the result should be put in the string. Simple variables are the most common, but any expression is valid.

## Getting Part of a String

A part of a string is called a substring. To get one, use the `.slice` method:

```js
const string = "Hello, world!"
const substring = string.slice(0, 4) // "Hello"
```

`.slice` takes a starting index and an ending index. Note that both of these are zero-based, like arrays.

## Determining If One String Is In Another

The easiest way to see if one string includes another string is with `.includes`:

```js
const needle = "oo"
const haystack = "Look at this!"

isMatch = haystack.includes(needle)

console.log(isMatch) // true
```

## Replacing a Part of a String

You can replace part of a string with `.replace()`:

```js
const message = "Hello, my name is Herbie Hancock"
const newMessage = message.replace("Herbie Hancock", "Dave Weckl")

console.log(newMessage) // "Hello, my name is Dave Weckl"
```

## Creating Multiline Strings

Strings that use quotes can't take up more than one line:

```js
const someString = "And a one
And a two
And a one
two
three" // Error
```

Within strings, the `\n` character indicate that a string should include a line break when displayed:

```js
const someString = "And a one\nAnd a two\nAnd a one\ntwo\nthree"
```

Additionally, backticks do allow multiple lines:

```js
const someString = `And a one
And a two
And a one
two
three`
```

## Watch Out!

You can also build strings with concatenation:

```js
const firstName = "Herbie"
const lastName = "Hancock"
const message = "Hello, my name is " +  firstName + " " + lastName

console.log(message) // "Hello, my name is Herbie Hancock"
```

Historically, this was the only way to accomplish this. Unforunately, it's difficult to read and easy to make mistakes writing strings this way, especially with spaces. With the wide support of template literals, there is no reason to use string concatenation anymore.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | MDN's reference on strings |
String
Data Type
JavaScript
String Interpolation
Escape Sequence
Template Literal
Expression
Variable
Zero-Based Index
Array
JavaScript: `.includes`
JavaScript: `.replace`
Concatenation
Make a fetch request to [https://httpstat.us](https://httpstat.us/) to intentionally generate an error. Check whether the status is OK, and if it's not throw an error with a custom message. Display this message in the DOM.
* What is the purpose of `.then`?
* What is the first parameter of `.then`?
* What is the first parameter of `.catch`?
* What is the argument given to a `.then` handler?
* What is the argument given to a `.catch` handler?
* What does a `.catch` do?
* Where does a `.catch` call go?
* What happens if you don't include a `.catch` in a promise chain?
# JavaScript: `.then` / `.catch`

When making calling an asynchronous function like `fetch`, how do you control the sequence of execution? HTTP requests can take a while to come back, and you don't want to freeze the browser while you wait. `fetch` returns a promise, which is a data type that represents a value that we don't have yet but expect to have in the future. If you want to do something that depends on that data, you need to indicate that by putting it in a `.then` handler.

```js
fetch(someUrl)
  .then(response => {
    return response.json()
  }).then(parsedResponse => {
    console.log(parsedResponse)
  })
```

The syntax can appear confusing when you write the handlers inline, but `.then` always takes a function definition:

```js
fetch(someString)
  .then(someFunctionDefinition)
  .then(someFunctionDefinition)
  .then(someFunctionDefinition)
```

That means the original example could be rewritten like this:

```js
const url = "https://pokeapi.co/api/v2/pokemon/pikachu"
function parseResponse(response){
  return response.json()
}
function logParsedResponse(parsedResponse){
  console.log(parsedResponse)
}

fetch(url)
  .then(parseResponse)
  .then(logParsedResponse)
```

Each successive `.then` handler function will be called with whatever the previous one returned. While the first thing in the chain (`fetch` in this case) must return a promise, every function after that can return a promise, a chain of promises, or static values:

```js
fetch(someUrl) // Promise
  .then(() => {
    return 5 // Static value
  }).then(theNumberFive => {
    console.log(theNumberFive) // 5

    return fetch(anotherUrl)
      .then(response => response.json()) // Chain of promises
  }).then(responseFromTheSecondFetch => {
    console.log(responseFromTheSecondFetch)
  })
```

## `.catch`

If something goes wrong with a promise, how will you find out?

```js
fetch(someUrl)
  .then(response => response.json())
  .then(parsedResponse => {
    console.log(parsedResponse)
  }).catch(error => {
    console.error(error.message)
  })
```

`.catch` also takes a function definition, and if any error occurs anywhere in the `.then` chain before it, the `.catch` block will be called with details about the error.

You can throw your own errors with `throw new Error()`:

```js
fetch(someUrl)
  .then(response => {
    if (!response.ok){
      throw new Error(`The response failed: ${response.statusMessage}`)
    }
    response.json()
  })
  .then(parsedResponse => {
    console.log(parsedResponse)
  }).catch(error => {
    console.error(error.message)
  })
```

In the example, if the HTTP request returns any status code 400 or greater, control will move to the `.catch` block.

## Watch Out!

If later `.then`s require data from previous `.then`s, they need to be nested so they can be accessed within scope:

```js
fetch(url1)
  .then(response => response.json())
  .then(parsedResponse1 => {
    return fetch(url2)
      .then(response => response.json())
      .then(parsedResponse2 => {
        console.log(parsedResponse1, parsedResponse2) // parsedResponse1 is still in scope because it's nested
      })
  })
```

This works because you can return chains of promises in any promise handler.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) | MDN promise reference |
| [MDN: `.then`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) | MDN `.then` reference |
| [MDN: `.catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) | MDN `.catch` reference |
| [MDN: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) | MDN guide to using promises |
JavaScript: `.then`
JavaScript: `.catch`
JavaScript: `async`
JavaScript: `await`
Asynchronous Function
Sequential Execution
JavaScript: `fetch`
Syntax
Function Definition
JavaScript: `.then` Handler
JavaScript: Promise Chain
Static Value
JavaScript: `.catch` Handler
Error
HTTP Request
HTTP 400-class Status Code
HTTP 500-class Status Code
Scope
Write a component that includes:

* A paragraph tag that displays a variable in its text
* An image tag that uses variables for its `src` and `alt` attributes
* What is a templating language?
* What is JSX?
* What does `{}` do in JSX?
* What's wrong with this JSX: `<img src="{imageUrl}" alt="descriptive text" />`?
* How you do you include a component in a JSX template?
* How you use variables in HTML attributes in JSX temlates?
* What is a JSX fragment?
# JSX

You can use basic DOM manipulation to put JavaScript values into a document. What if you want to include the values in the markup language itself? One way to do this is with a templating language and JSX is the most commonly used templating language in React.

## Keyword Changes

JSX is similar to HTML except You can't use HTML keywords that are already JavaScript keywords, so the following keywords are changed:

* `class` becomes `className`
* `for` becomes `htmlFor`
* Neither HTML or JS comment syntax is supported, so comments are done with `{/* Comment here */}`
* Self-closing tags must include the closing `/`

## Including JavaScript

To put JavaScript variables in a JSX template, use the `{}` characters:

```jsx
const firstName = "Lucy"
const template = <p>{firstName}</p>
```

This will render to the following HTML:

```jsx
<p>Lucy</p>
```

You can also put any kind of JavaScript expression inside the braces:

```jsx
const getFirstName = () => "Lucy"
const template = <p>{getFirstName()}</p>
```

```jsx
const firstName = "Lucy"
const template = <p>{`My name is ${firstName}`}</p>
```

```jsx
const template = <p>{["l", "u", "c", "y"].join("")}</p>
```

This also works inside of attributes:

```jsx
const url = "https://wikipedia.org"
const linkText = "Wikipedia"
const template = <a href={url}>{linkText}</a>
```

Lastly, you can include any component by writing it like a self-closing HTML element:

```jsx
const Heading = () => <h2>Breaking News!</h2>
const SomeArticle = () => <article><Heading /></article>
```

This renders to:

```html
<article>
  <h2>Breaking News!</h2>
</article>
```

## Using JSX in React

Modern React components are functions that should return JSX. A typical component might look like this:

```jsx
const Image = ({ url, altText }) => {
  return <img className="media image" src={url} alt={altText} />
}
```

JSX can also be saved in variables and returned from normal functions:

```jsx
const Images = ({ images }) => {
  const $images = images.map(image => {
    return <li><Image url={image.url} altText={image.altText} /></li>
  })

  return <ul>{$images}</li>
}
```

## Watch Out!

* When using braces for attributes, note that the braces replace the quotes. For example, a link with an `href` attribute would look like `<a href={url}></a>`, not `<a href="{url}"></a>`
* It's possible to nest `{}` in JSX. The rule is that `{}` creates a new block for JavaScript expressions, and opening a new element within one of those  goes back into JSX. For example:

```jsx
<div>
{
  someValue && <ElementNameHere attribute={someAttribute} />
}
</div>
```

* JSX expressions always need to run one and only one top-level element. This is invalid:

```jsx
const SomeComponent = () => (
  <p>Hello,</p>
  <p>World!</p>
)
```

If there are no suitable elements to wrap them in, you can use empty elements called fragments instead:

```jsx
const SomeComponent = () => (
  <>
    <p>Hello,</p>
    <p>World!</p>
  </>
)
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Introducing JSX](https://reactwithhooks.netlify.app/docs/introducing-jsx.html) | React's guide to JSX |
| [Video: JSX](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=1344s) | React Hooks Crash Course: JSX |
* DOM
* JSX
* React Component
Go to [https://jwt.io](https://jwt.io/).

* Examine the default token.
* See what changing the decoded values does to the token.
* Decode the token with the `jsonwebtoken` npm library.

---

* Make a token with the `jsonwebtoken` npm libary.
* Examine the token you made with [https://jwt.io](https://jwt.io/).
* Modify the token in the web interface.
* Try to verify the token using `jsonwebtoken`.
* How are JWTs encoded?
* What are the 3 sections of JWTs?
* What keeps a client from tampering with the information in a JWT?
* What can be stored in a JWT?
* Explain each of these JWT claims:
  * `sub`
  * `iat`
  * `exp`
  * `iss`
* How do JWT signatures work?
* How are JWTs stored on the client?
* How do you validate a JWT?
# JWTs

When you go to an event at a venue, you often present your ID and a ticket for the event. What if you need to leave and come back? You could present your ticket and ID again, but many venues will give you a hand stamp or bracelet instead that indicates that you've already checked in so you can get back in more quickly.

A similar system is commonly used in web authentication. When you log in, you send a username and password over HTTP. Instead of supplying those every time you make a request, the server gives you a token that you can attach to future requests that's considered a proof that you've been authenticated.

JSON web tokens, or JWTs (pronounced "jots"), are a popular method of storing a kind of handstamp or wristband with a user after they log in. After validating their username and password, a server sends a JWT to the user. The user sends that JWT with future requests as proof that they've logged in. This way, servers don't need to keep track of which users are currently logged in or ask users to send their username and password in every time. Instead, all the server needs to do is verify that the token is valid.

## JWT Format

JWTs are 3 sets of base64 characters separated by `.`, with each set representing a different part of the request.

### Header

The first section of a JWT contains information about the JWT itself. Most importantly, it defines how the signature was calculated. A typical JWT header looks like this decoded:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

[HS256](https://en.wikipedia.org/wiki/HMAC) is an algorithm for taking a string and creating a signature with it that's used to tell if a JWT has been tampered with.

### Payload

Payloads are the part of the JWT that contains data you want to store on the client. At a minimum you should store something that uniquely identifies the user, but you may store any data you like. Each part of a payload is called a claim and represents a key-value pair. Some claims are predefined:

* **sub**: _Subject_. Any kind of unique identifier for the user, like a database ID.
* **iat**: _Issued-at time_. The number of milliseconds since the token was issued.
* **exp**: Expiration. The epoch time after which the token should no longer be accepted.
* **iss**: Issuer. The domain of the site that issued the token.

Refer to the [full list](https://auth0.com/docs/tokens/json-web-tokens/json-web-token-claims) of existing claims. You may additionally add any of your own data to the payload.

### Signature

JWTs can be easily be read by users. What keeps a malicious user from examining their token in the browser, changing it to impersonate another user, and sending that to the server instead? For example, if a user's legitimate JWT payload is this:

```json
{
  "sub": 3412,
  "data": {
    "username": "miledavis"
  },
  "iat": 1629072783,
  "exp": 1629076383
}
```

And the user edits it to look like this:


```json
{
  "sub": 4137,
  "data": {
    "username": "wayneshorter"
  },
  "iat": 1629072783,
  "exp": 1629076383
}
```

What keeps Miles from successfuly impersonating Wayne?

JWT signatures are calculated by combining the data from the header and the payload and using a secret key to make a hash out of them. Since the user doesn't have this secret key, they won't be able to recalculate an accurate hash.

The reason this is important is JWTs aren't encrypted; the base64 encoding they use can easily be read by client code. If anything in the header or payload is tampered with, the signature will no longer match and any server receiving the JWT will know that it was tampered with. This allows the server to store information like user IDs in JWTs with the client and be confident that any JWTs received from users are authentic.

## Generating JWTs

The most popular node library for generating JWTs is [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken). It has a variety of features, but the basic JWT generation looks like this:

```js
const data = {
  username: "miledavis",
}

const secret = "p@s$w0rD"

const token = jwt.sign({
  data,
}, secret, {
  subject: 3412,
  expiresIn: "1h"
  issuer: "your-domain-goes-here.com"
})
```

[Play with this code](https://codesandbox.io/s/little-water-zijgq)

`token` will be a JWT that contains the `data` object, is signed with `p@s$w0rD`, and expires in an hour. This code will generate this JWT:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozNDEyLCJ1c2VybmFtZSI6Im1pbGVkYXZpcyJ9LCJpYXQiOjE2MjkwNzI3ODMsImV4cCI6MTYyOTA3NjM4M30.eJLVitNuZbulLSXVdNtrcVBCIord4f5ybz-tvHFVf_w
```

Decoded, that JWT looks like this:

**Header**

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload**

```json
{
  "data": {
    "username": "miledavis"
  },
  "sub": 3412,
  "iat": 1629072783,
  "exp": 1629076383
}
```

**Signature**

```
eJLVitNuZbulLSXVdNtrcVBCIord4f5ybz-tvHFVf_w
```

## Storing JWTs

Since JWTs are just strings of characters, they're great for storing in the browser with something like `localStorage`:

```js
fetch("https://example.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "milesdavis",
    password: "p@s$w0rD"
  }),
}).then(response => response.json())
.then(response => {
  const token = response.token
  localStorage.setItem("token", token)
})
```

## Sending JWTs

Once a token is in `localStorage`, it can be used in any request that needs it:

```js
const token = localStorage.getItem("token")

fetch("https://example.com/top-secret-info", {
  headers: {
    "Authorization": `Bearer ${token}`,
  }
}).then(response => response.json())
.then(response => {
  console.log("Top secret info here!", response)
})
```

Note that it's conventional to put these tokens in the `Authorization` header preceded by the word "Bearer" and a space. Doing this ensures compatibility with authentication libraries.

## Validating JWTs

To validate a JWT, use the `jsonwebtoken` npm package's `.verify` method:

```js
app.get("/top-secret-info", (request, response), () => {
  const token = request.get("Authorization").split(" ")[1] // Take the word `Bearer` out

  const secret = "p@s$w0rD"

  let payload
  try {
    payload = jwt.verify(token, secret) // An error in the signature or expiration will throw an error
  } catch (error){
    response.status(401).json({
      error: "There was an error with your token, please log in again",
    })
  }

  const user = User.query().findById(payload.data.id)

  response.json({
    message: `This is for logged-in users only, ${user.username}!`,
  })
})
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [JWT.io](https://jwt.io/) | Official JWT site featuring an interactive encoding/decoding tool. |
| [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) | Wikipedia's article on JWT |
| [AuthZero: JSON Web Tokens](https://auth0.com/docs/tokens/json-web-tokens) | AuthZero's guide to JWTs |
| [Video: What is JWT and why should you use JWT](https://www.youtube.com/watch?v=7Q17ubqLfaM) | Web Dev Simplified's guide to JWT |
JWT
JSON
HS256
Auth Token
`localStorage`
HTTP Authorization Header
Bearer Token
npm
Epoch Time
JWT Claim
[Brews: Database Connection](https://github.com/sikaeducation/brews-db-connection)
* What 3 tools does Knex.js provide?
* What two npm libraries need to be installed for Knex to work?
* What is a Knexfile?
* How do you add Knex to an Express app?
* How do you configure a Knexfile?
* How do you use different databases in development and production environments with Knex?
* What should a Knex database connection file include?
* What is the purpose of a database connection file in an Knex-powered Express app?
# Intro to Knex

Connecting an Express app to a database can be tricky. You need to:

* Establish a connection to the database using the libraries and methods specific to that database
* Write queries in the flavor of database you're using
* Devise a way to version your database structure so that you can match the version of the code to the version of the database structure
* Devise a way to add starter data to see your app in action
* Potentially do all of this with multiple database systems if you're using one for local development and a different one in production

There's an easier way to manage all of this in Node apps: Knex.js.

## Knex

Knex.js, also called simply Knex, is three tools:

* A tool for abstracting out database queries so that same code can be used with any database
* A tool for managing versions of a database's structure
* A tool for seeding a database with sample data

Each of these tools can be used independently of each other. For example, you can use SQL to manage versions and seed data and just use Knex's query builder, or you can use the just the version manager and write queries directly in SQL.

## Installation

To add Knex to a project, you need to install two things:

* The `knex` library itself: `npm install knex`
* At least one database driver that Knex will use to connect with the database or databases you're using:
  * SQLite: `npm install sqlite3`
  * PostgreSQL: `npm install pg`
  * MySQL: `npm install mysql`
  * Oracle: `npm install oracledb`
  * SQL Server: `npm install tedious`

## Configuration

Next, run `npx knex init` to generate a new `knexfile.js`.

```js
// knexfile.js
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
```

This file looks intimidating, but it's ultimately just a regular JavaScript object with keys and values. It contains information about how to connect to the database, such as the type of database, where it's located, any required credentials, etc). The file is auto-generated with a lot of different examples of how it can be used. One thing to note is that you can configure one connection for local development and a completely different connection for production. One of the most powerful things about Knex is that none of your code needs to change- only which key in this `knexfile` is referenced.

A Knexfile for a simple project might look like this:

```js
module.exports = {
  development: {
    client: "sqlite3",
    connection: "./dev.sqlite3",
  },
  production: {
    client: "pg",
    connection: "postgres://production-database-connection-string-goes-here",
  }
}
```

This says that Knex should use SQLite locally and it should store the database in a file called `dev.sqlite3`. In production, Knex should should PostgreSQL, and it should connect to a database located at `postgres://production-database-connection-string-goes-here`.

## Connection

Having a properly configured `Knexfile.js` file is all that's required to version your database and seed sample data. To connect the database to an application, you need to initialize Knex with the appropriate environment setup information from the Knexfile.

```js
// database-connection.js
const knexfile = require("./Knexfile")
const configuration = knexfile[process.env.NODE_ENV || "development"]
const knex = require("knex")
module.exports = knex(configuration)
```

This database connection file:

1. Reads in the object from the Knexfile
2. Gets the configuration info for the specific environment you're currently in, defaulting to "development"
3. Imports the Knex npm package
4. Exports a new database connection by calling the Knex package with the configuration

The database can now be queried by importing this database connection file.

```js
// index.js
const express = require("express")
const app = express()
const database = require("./database-connection")

app.get("/products", (request, response) => {
  database("product")
    .select()
    .then(products => {
      response.json({ products })
    }).catch(error => {
      console.error(error.message)
      response.sendStatus(500)
    })
})

const port = process.env.PORT || 3000
app.listen(port)
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Knex.js](https://knexjs.org/) | Official Knex.js site |
| [Knex Cheatsheet](https://devhints.io/knex) | Cheatsheet containing common Knex.js boilerplate |
Express
Database
Library
Node.js
Knex.js
SQL
Query Builder
`knexfile.js`
SQLite
PostgreSQL
npm
[Coffee Collection Migrations](https://github.com/sikaeducation/coffee-collection-migrations)

---

# Knex Seeds

Using Knex, build seed files for the following database tables.

| id | name                          | price |
|----|-------------------------------|-------|
| 1  | Capitol Hill Block Party 2016 | 49.99 |
| 2  | Bumbershoot 2016              | 64.99 |


| id | concert_id | name            | age |
|----|------------|-----------------|-----|
| 1  | 1          | Daniel Bailey   | 52  |
| 2  | 1          | Heidi McGuire   | 30  |
| 3  | 2          | Corey Reyes     | 26  |
| 4  | 2          | Kristi Sheridan | 45  |

Remember to delete all the existing rows from each table before inserting new ones.

Once you're satisfied, feel free to insert more rows to either table as you see fit.

---

# Knex Migrations

Using Knex, build migration files for the following one-to-many relationship.

```
              ┌───────────────────────────────────────────────────────────────┐
              │                           concerts                            │
              ├─────────────┬─────────────────────────┬───────────────────────┤
              │id           │serial                   │primary key            │
              │name         │varchar(255)             │not null default ''    │
              │price        │numeric(8, 2)            │not null default 1.00  │
              │started_at   │timestamp with time zone │not null default now() │
              │ended_at     │timestamp with time zone │not null default now() │
              └─────────────┴─────────────────────────┴───────────────────────┘
                                              ┼
                                              │
                                              │
                                              ○
                                             ╱│╲
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                        attendees                                         │
├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
│id           │serial                   │primary key                                       │
│concert_id   │integer                  │not null references concerts(id) on delete cascade│
│name         │varchar(255)             │not null default ''                               │
│age          │integer                  │not null default 0                                │
└─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘
```

Ensure all primary and foreign keys have an index. Rememember to drop any existing tables from the database before creating new ones.

Once you're satisfied, feel free to add more columns to either table as you see fit.

* What problem do migrations solve?
* What is rolling back a migration?
* Why would a migration need to be rolled back?
* What data type should a migration return?
* List 5 data types and their associated migration methods
* How do you create a table in a migration?
* How do you change a table in a migration?
* How do you drop a table in a migration?
* What's the difference between `.up` and `.down` in Knex migrations?
# Knex: Migrations

Imagine version 1 of an app has a table that looks like this:

| Key | Column      | Type          |
| --- | ----------- | ------------- |
| PK  | id          | int           |
|     | first_name  | varchar(255)  |
|     | last_name   | varchar(255)  |
|     | birth_date  | date          |

The code that uses this data looks like this:

```js
const person = {
  firstName: databaseRecord.firstName,
  lastName: databaseRecord.firstName,
  age: Date.now() - (new Date(databaseRecord.birthDate)).getTime(),
}
```

Then, the birth date is removed in version 2:

| Key | Column      | Type          |
| --- | ----------- | ------------- |
| PK  | id          | int           |
|     | first_name  | varchar(255)  |
|     | last_name   | varchar(255)  |

```js
const person = {
  firstName: databaseRecord.firstName,
  lastName: databaseRecord.firstName,
}
```

You find a problem with version 2 of the code, so you roll the code back to version 1. There's a problem though:

```js
const person = {
  firstName: databaseRecord.firstName,
  lastName: databaseRecord.firstName,
  age: Date.now() - (new Date(databaseRecord.birthDate)).getTime(),
}
```

`databaseRecord` no longer has a `birthDate` property because it was removed in the database. How can you keep your database structure and code synchronized?

## Migrations

Migrations describe the steps to create a database structure as code that can be version controlled. For example, to describe how to make the first version of the table, you may write this migration:

```js
exports.up = knex => {
  return knex.schema.createTable("person", table => {
    table.increments("id")
    table.string("first_name")
    table.string("last_name")
    table.date("birth_date")
  })  
}

exports.down = knex => {
  return knex.schema.dropTableIfExists("person")
}
```

When this migration is run, it will create a `person` table with 4 fields. Just as importantly, the migration can be "un-run", which will drop the table. This is called rolling back a migration.

Later, a second migration is made:

```js
exports.up = knex => {
  return knex.schema.table("person", table => {
    table.dropColumn("birth_date")
  })  
}

exports.down = knex => {
  return knex.schema.table("person", table => {
    table.date("birth_date")
  })
}
```

This says to drop the `birth_date` column when you run the migration and to re-add the column when the migration is rolled back. This can also be saved along with the code in version control. If you revert to an earlier version of the code, you can also roll back Knex's instructions on how to build the database.

## Creating a Migration

To create a migration, run:

```
npx knex migrate:make descriptive-name-of-what-will-be-in-the-migration
```

This creates a new migration file in the `migrations` folder by default. Since migrations are intended to be run and rolled back in a specific order, the file will have a timestamp with the date and time it was created added to the file name.

```js
exports.up = function(knex) {
  
};

exports.down = function(knex) {
  
};
```

The `.up` method defines what happens when the migration is run and the `.down` method defines what happens when the migration is rolled back. They should mirror each other; if you create a table in `.up` you should drop that table in `.down` and vice-versa.

## Creating a Table

To create a table in a migration function, use `knex.schema.createTable`:

```js
exports.up = knex => {
  return knex.schema.createTable("table_name_goes_here", table => {
    // Create columns here
  })  
}
```

The mirror action for `createTable` is `dropTableIfExists`:

```js
exports.down = knex => {
  return knex.schema.dropTableIfExists("table_name_goes_here")
}
```

The `table` parameter in the function passed into `createTable` has a few methods that help define columns. Some examples:

* <strong>`table.increments("column_name_here_defaults_to_id")`</strong>: An auto-incrementing ID
* <strong>`table.string("column_name_here")`</strong>: General string storage
* <strong>`table.integer("column_name_here")`</strong>: Integers
* <strong>`table.decimal("column_name_here")`</strong>: Decimals
* <strong>`table.date("column_name_here")`</strong>: YYYY-MM-DD dates
* <strong>`table.datetime("column_name_here")`</strong>: Dates with times
* <strong>`table.boolean("column_name_here")`</strong>: True/False

## Altering a Table

To alter a table, use `knex.schema.table`:

```js
exports.up = knex => {
  return knex.schema.table("table_name_goes_here", table => {
    // Alter table here
  })  
}
```

To create new columns, use the same methods used in `createTable`. To drop a column, use `table.dropColumn(column_name_here)`. Columns can be renamed with `table.dropColumn(old_name, new_name)`. Don't forget to mirror these alterations in the `exports.down` method.

## Watch Out!

* One of the easiest mistakes to make when writing a migration is that the `.up` and `.down` functions **must** return a promise. That means migration methods should look like this:

```
exports.up = knex => {
  return knex.schema.createTable("table_name_goes_here", table => {
    // Table schema here
  })  
}
```

Not this:

```
exports.up = knex => {
  knex.schema.createTable("table_name_goes_here", table => {
    // Table schema here
  })  
}
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Knex: Migrations](https://knexjs.org/#Migrations) | Official Knex docs on Migrations |
| [Knex: Seeds](https://knexjs.org/#Seeds-CLI) | Official Knex docs on Seeds |
| [Migrations and Seeding](https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261) | Blog post about migrations and seeds with Knex |
| [Video: Knex Migrations and Seeds](https://www.youtube.com/watch?v=ipAH7lMfq7k) | Troy Amelotte's guide to Knex migrations and seeds |
Knex.js
Database Migration
PK
Database Migration Rollback
Database Column
Database Alter
Promise
[Brews Migrations](https://github.com/sikaeducation/brews-migrations)
* How are database relationships written in Knex migrations?
* What does `.onDelete("CASCADE")` mean?
* What does `.onDelete("SET NULL")` mean?
* What does `.onDelete("RESTRICT")` mean?
* What happens if you try to create a relationship to a table that doesn't exist yet?
# Knex: Relations

You can create and modify database tables with Knex. How do you create relationships between tables?

## References

The most common way to create relationships between tables in a Knex migration is using a reference:

```js
module.exports.up = knex => {
  return knex.schema.createTable("student", table => {
    table.increments()
    table.string("name")
    table.integer("teacher_id").references("id").inTable("teacher")
  })
}
```

This example says that the `student` table will have a column called `teacher_id`, which is a foreign key to the `id` column in the `teacher` table.

![ERD of one teacher having many students](assets/teacher-student.png)

## Cascading

What should happen to a teacher's students if you delete the teacher from the database? There are three common scenarios:

* **The students should be deleted too**. This is common when one entity has a exclusive ownership relationship with another. In this case, the foreign key should be written as `table.integer("teacher_id").references("id").inTable("teacher").onDelete("CASCADE")`
* **The students should have no teacher until they're reassigned**. This is common when one entity has a temporary ownership relationship with another. In this case, the foreign key should be written as `table.integer("teacher_id").references("id").inTable("teacher").onDelete("SET NULL")`
* **The teacher should be prevented from being deleted if they still have students**. This is common when you want to enforce rules, such as never deleting a student but also ensuring that every student always has a teacher. In this case, the foreign key should be written as `table.integer("teacher_id").references("id").inTable("teacher").onDelete("RESTRICT")`

## Watch Out!

A table needs to exist already before you make references to it. More broadly, this means that generally you need to create tables that aren't used as references before you create tables that are used as references.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Knex: `.references`](https://knexjs.org/#Schema-references) | Official Knex docs on `.references` |
| [Knex: `.inTable`](https://knexjs.org/#Schema-inTable) | Official Knex docs on `.inTable` |
| [Knex: `.foreign`](https://knexjs.org/#Schema-foreign) | Official Knex docs on `.foreign` |
Database
Database Table
Primary Key
Foreign Key
Database Migration
Knex.js
Database Column
Database `CASCADE`
Look through the ESLint styleguides for Google, AirBnB, and Standard. Find 5 rules that used in all 3 of them.

---

Lint and fix this code:

[Sloppy Code](https://github.com/sikaeducation/sloppy-code)
* What problem does linting address?
* What is an example of a formatting error?
* What is an example of a linting error?
* What is an example of a syntax error?
# Linting

This code will run without errors:

```js
var message = 'A message'
let some_array = ["first item", 'second item', `third
item`
];
var some_buttons = document.getElementsByTagName("button");
some_button = some_buttons[  0  ]

  (
  some_array.forEach(   function  (  x  )
{
  console.log(    x);
})
);
```

It also has lots of problems:

* It uses the older `var` instead of the newer `let`/`const`
* `let` is used on a variable that isn't reassigned
* It uses snake_case for variable names instead of camelCase
* It uses single quotes, double quotes, and backticks inconsistently
* It uses semicolons inconsistently
* It has inconsistent line breaks
* It has inconsistent spacing around parentheses and brackets
* It has inconsistent indentation
* It has an unscoped variable (`some_button`) that doesn't use `var` / `let` / `const`, which makes it globally scoped
* It has variables that are declared and never used
* It uses `.getElementsByTagName` instead of `document.querySelector`
* It has more parentheses than it needs

These aren't bugs, but they do make the code hard to read and they certainly may lead to bugs as a result.

## Linting

Linting tools analyze your code and point out style problems:

![Linting errors](assets/linting.png)

Most of them will also do this in real-time, integrated into your text editor, and can even fix problems for you as you type.

![Autocorrecting a file with eslint](assets/lint-autocorrect.png)

After running the above code through a linter and fixing the errors, you may get something more like this:

```js
const someArray = ["first item", "second item", "third item"];
someArray.forEach(x => console.log(x));
```

## Linting Style Guides

There are many linting style guides available, each of which is characterized by a collection of rules. Some examples of rules:

* All strings must use single quotes, unless the string contains single quotes or include a template literal
* When functions are declared, there should be one space after the `function` keyword
* All arrays should have a trailing comma at the end of the list
* No line should be longer than 80 characters

You can configure a linter to use any combination of rules it supports, and can even control whether or not the linter should warn you (let you know that it happened but otherwise leave it alone) or throw an error (attempt to fix it).

Combinations of rules are published as style guides. Some companies and teams adopt a custom style guide so that all the code written in their company is consistent, and others reuse popular existing ones such as:

* AirBnB
* Standard
* Google

Even when using someone else's style guide, you can add or override your own rules.

## Watch Out!

* Strictly speaking, things like indentation and semicolon usage are classified as _formatting_ and things like naming conventions and language features you should or shouldn't use are _linting_. Both of them are commonly referred to as linting collectively.
* Linters will conveniently also catch most syntax errors, such as missing closing brackets

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: Lint](https://en.wikipedia.org/wiki/Lint_(software)) | Wikipedia's article on linting |
Linting
snake_case
camelCase
Indentation
Variable
Text Editor
Template Literal
Function
Array
Trailing Comma
Linter
Style Guide
Code Formatting
Syntax
Clone the [Mad Libs repository](https://github.com/sikaeducation/mad-libs).

Serve the app with a local file server.

---

Given this folder structure:

![WineFlix folder structure](assets/wineflix.png)

What would the URL to `red-wine.jpg` look like if the root of the folder were served up on port 8080 on localhost?
* Why do you need to run a local server? Why can't you serve files from the file system?
* How do you stop a local server?
* In which directory should you start a local server?
* What scheme does a local file server use?
* How do kill all running instances of lite-server?
* What does this error mean: `Cannot GET /`
* What is the IP address for `localhost`?
# Local File Servers

When you view a website in a browser:

1. You enter a URL into your browser
2. Your browser looks up the IP address for that URL
3. Your browser asks for the HTML file from the file server at that IP address
4. The file server at that IP address returns the contents of that file
5. Your browser renders a page based on the contents of that file

What if we just want to see a website that's stored on our computer? We can use a local file server.

## Running `lite-server`

`lite-server` is a program that runs a file server on your computer. To serve a website with `lite-server` on your computer, navigate to the folder containing the website in your terminal (it's the one with your `index.html` file) and run the command `lite-server`. It will likely open a browser tab at the correct URL automatically. If it doesn't, take a note of the local URL printed on the screen:

![Serving a local file system with lite-server](assets/local-server.png)

Going to this URL in your browser will render the site.

This will take a little bit longer to run the first time, but should be faster after that. There are many alternatives to `lite-server`, including Python's `simpleHTTPServer`, Node's `http-server`, and WAMP/MAMP/XAMPP. The major advantage of `lite-server` is that it will automatically refresh show changes to websites as you work on them.

The paths in this URL will mirror the directory structure:

![Directory structure](assets/local-server-2.png)
![Browser requests a file at a path](assets/local-server-3.png)

Note that all HTTP requests to the file server will be logged to the terminal. This can be helpful for debugging.

You can stop `lite-server` with `ctrl` + `c`.

## `localhost`

What is the URL for a server that's running on your computer? Generally, we use the URL `localhost`. Notice that it doesn't have a TLD or subdomain, so it's not `localhost.com` or `www.localhost`.

You may be wondering what IP address `localhost` resolves to. `localhost` is equivalent to the IP address `127.0.0.1`, which is a special IP address reserved for local computers.

## Ports

What if you want to serve multiple websites from your computer at the same time? You can run more than one file server on your computer at once, and they're differentiated by their port. `lite-server` will default to port `8080`. If that port is already being used by a program (including another `lite-server` instance), it will create the next server at `8081`, and so on.

## Watch Out!

* If you double-click on an HTML file in a folder, and your computer will probably render that page in a browser. This is not a substitute for using file server because there are problems that will result from not serving files correctly. Always use a real file server to view web pages.
* `localhost` addresses are generally served with HTTP, not HTTPS. Requests cannot be "secured" in any meaningful way within your computer. While you should only send data to a website over HTTPS normally, it's OK to use HTTP locally.
* If you get an error when running `npx lite-server` about `npx`, make sure Node has been installed.
* If you have multiple windows open for a website run by `lite-server`, you can get some unusual behavior with buttons and forms firing multiple times.
* If you get the `Cannot GET /` in the browser when starting `lite-server`, it means there was no file named `index.html` in the folder where you ran the `npx lite-server` command.
* If you suspect you have multiple instances of `lite-server` running and would like to terminate all of them, run the command `killall node`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: What is a web server?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_web_server) | MDN's article on web servers |
| [MDN: Set Up a Local Testing Server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) | MDN's tutorial on setting up a local server |
Local File Server
File Server
Website
Browser
HTML File
IP Address
Render
`lite-server`
URL
Folder
`localhost`
TLD
Subdomain
`127.0.0.1`
Port
Server
HTTP
HTTPS
# MadLibs Overview

In this workshop, you'll create an interactive web application using HTML, CSS, and JavaScript.

![Finished app](assets/app.png)

## The Parts of a Web App

The content of your application (words, pictures, buttons, inputs, outputs) will be written in a language called HTML. HTML is a tool used to structure content in a way that makes it easy to style with CSS and make interactive with JavaScript.

![HTML and what it renders](assets/html.png)

The appearance of the content will be written in a language called CSS. CSS can see your HTML, and it determines how big, small, wide, tall, bold, and colorful to display your content.

![CSS and what it renders](assets/css.png)

The interaction of the application will be written in a language called JavaScript. In our application, JavaScript will read the words people enter into the MadLibs app, and put those words into a story when the button is clicked.

![JS and what it does](assets/js.png)

Check out this example of a [finished MadLibs app](https://madlibs-workshop.web.app). You can also [play with the code](https://codesandbox.io/s/sparkling-shadow-qksuf).

## Steps

1. Read through the final activity. This the goal, so keep referring back to it throughout the workshop.
2. Read the HTML lesson.
3. Do the HTML exercises.
4. Read the JavaScript lesson.
5. Do the JavaScript exercises.
6. Read the CSS lesson.
7. Do the CSS exercises.
8. Start building your own MadLibs app.
HTML
CSS
JavaScript
Application
# Modern JavaScript

## Functions

All of these are equivalent:

```js
// Functional declaration - Hoists
function someFunction(someParameter){
  return someParameter
}

// Function expression - Doesn't hoist
const someFunction = function(someParameter){
  return someParameter
}

// Arrow function - Maintains `this` binding
const someFunction = (someParameter) => {
  return someParameter
}

// One-line Arrow function - Maintains `this` binding and has an implicit return
const someFunction = someParameter => someParameter


// As part of an object, method shorthand
{
  someFunction(someParameter) {
    return someParameter
  }
}

// As part of an object, function expression
{
  someFunction: function(someParameter) {
    return someParameter
  }
}
```

There are some slight differences between, but in Vue, these two rules will serve you well:

**At the component level, use method shorthand**

This goes for `data()` as well as all computed properties and methods:

```js
export default {
  data() {
  },
  computed: {
    someComputedProperty() {
    },
    anotherComputedProperty() {
    },
  },
  methods: {
    someMethod() {
    },
    anotherMethod() {
    },
  },
}
```

**Within those methods, use arrow functions**

```js
export default {
  computed: {
    someComputedProperty() {
      return this.someState.map(item => item * 2)
    },
  },
  methods: {
    someMethod() {
      return this.someState.forEach(item => {
        console.log(item)
      })
    },
  },
}
```

This keep the `this` binding consistent so that you can keep accessing other methods and computed properties.

## Variable Scoping

Once upon a time, you declared variables in JS like so:

```js
var someVariable = "some value"
```

RIP `var`. `var` was scoped to the function, while its sucessors (`let` and `const`) are scoped to the block. `const` can't be reassigned (but objects and arrays can still be mutated), `let` can be reassigned.

```js
const someVariable = "some value"
someVariable = "reassigning the value" // error

let anotherVariable = "some value"
anotherVariable = "reassigning the value" // fine

const someArrayOrObject = []
someArrayOrObject.push("New element") // fine
```

Default to using `const`. If you want to reassign something at some point, you can always switch it to a `let.` On the other hand, if you default to `let` and _don't_ want an assignment, you won't get an error if an assignment happens anyway.

## Object Shorthand

It's common in JS to need to assign a key in an object to a variable with the same name as the key:

```js
const user = { id: 1 }
const body = {
  user: user,
}
```

You can now condense those:

```js
const user = { id: 1 }
const body = {
  user,
}
```

## Template Strings

RIP string concatenation. Previously, you would put JS expressions in strings like this:

```js
const someString = "The highest number in this list is " + Math.max(list) + ", woah!"
```

Never again. Now you can use backticks (```) and interpolation (`${}`) to do them inline:

```js
const someString = `The highest number in this list is ${Math.max(list)}, woah!`
```

You can put any valid JS expression inside the interpolation.

## Spreading

You can spread arrays and objects with the `...` operator. This is the equivalent of dropping the `[]` or `{}` from the object:

```js
const oneList = [1, 2, 3]
const twoList = [4, 5, 6]
const bothLists = [...oneList, ...twoList]

const result = sum(...bothLists) // Can use to pass in an array of arguments separately

const person = {
  firstName: "Kyle",
  lastName: "Coberly",
}
const boatCaptain = {
  firstName: "Captain",
}

const captainKyle = {
  ...person,
  ...boatCaptain, // clobbers firstName: "Kyle"
  rank: "Captain",
}
```

These are handy for combining and making shallow copies of things.

## Modules

JavaScript has modules now!

```js
// some-module.js
function someFunction(){
}
function anotherFunction(){
}

export {
  someFunction,
  anotherFunction,
}

// another-module.js
import { someFunction, anotherFunction } from "./some-module.js"
```

In Vue, you'll mostly work with "default" imports and exports where files only export and import one thing:

```vue
// SomeComponent.vue
<script>
export default {
  name: "SomeComponent",
}
</script>

// AnotherComponent.vue
<script>
import SomeComponent from "./SomeComponent.vue"

export default {
  name: "AnotherComponent",
  components: {
    SomeComponent, // Also uses object shorthand!
  },
}
</script>
```

## Fetch and Promises

JS has a massive improvement to XHR for making asynchronous HTTP requests called `fetch`. It works like this:

```js
fetch("https://pokeapi.co/api/v2/pokemon")
  .then(response => response.json())
  .then(response => {
    console.log(response.results)
  }).catch(error => {
    console.error(error.message)
  })
```

Calls to `fetch()` return Promises. Promises represent "eventual values". Since JavaScript is non-blocking, you need to explicitly handle the parts of your app that are asynchronous. If you didn't, the entire UI would lock while you're waiting for the request to come back! The syntax works like this:

```js
somethingThatReturnsAPromise()
  .then(aFunctionThatWillBeCalledWithTheResult)
  .then(aFunctionThatWillBeCalledWithTheReturnValueOfTheLastFunction)
  .then(youCanKeepChainingAsMuchAsYouWant)
  .catch(aFunctionThatWillBeCalledIfAnyErrorsHappenInTheChain)
```

`fetch` in particular resolves to a raw HTTP response. If you want to parse a JSON body into a JavaScript object, you'd do it like this:

```js
fetch(someUrl)
  .then(rawResponse => response.json())
  .then(parsedResponse => {
    // parsedResponse is the JS representation of whatever the body of the HTTP response was
  })
```

You can also configure the request by passing a configuration object to `fetch` as the second argument:

```js
fetch(someUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ // Bodies **must** be JSONified prior to sending them, raw objects won't work!
    someKey: "some value"
  })
})
```
Write tests for the following functions:

```js
function fetchPokemon(name){
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
}
```

```js
function fetchAndDisplayPokemon(name){
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(response => {
      const $div = document.createElement("div")
      $div.innerHTML = `
        <h1>${response.name.toUpperCase()}</h1>
        <img src="${response.sprites.front_default}" />
      `
    })
}
```
* What does `msw` offer that Jest and Testing Library don't offer on their own?
* Why mock network requests in tests?
* What's the difference between a path and a URL?
* What are the parameters for an `msw` resolver?
* How do you send a response back from an `msw` resolver with a `201` status message and a JSON body of {"message": "Hello, world!"}
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

const server = server.setupServer()

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
* `msw`
* Network request
* Static
* Route
* Clobber
* REST
* HTTP Method
* Path
* URL
* Dynamic Segment
* `msw` Resolver
* `msw` Handler
* CRA
* Express.js
* `msw` Context Transformer
* Endpoint
# Installing Node

There are a lot of ways to install node, and most of them are wrong. You should **never** have to `sudo npm install` **anything**. NPM packages (and their dependencies) can be published by anyone, and installing them with `sudo` gives all of those people administrative access to your computer.

To see if you already have node installed, run `which node`. If you see nothing, you don't have it installed. If you see anything other than a path that looks like `/home/username/.nvm/versions/node/v12.19.1/bin/node` (or you get `EACCES` errors when installing packages), it's probably installed wrong.

## To uninstall node

Using the directions from [this Stack Overflow answer](https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x?rq=1), try to purge it from your system. Try:

```bash
sudo rm -rf /usr/local/{lib/node{,/.npm,_modules},bin,share/man}/{npm*,node*,man1/node*}
sudo rm -rf /opt/local/bin/node /opt/local/include/node /opt/local/lib/node_modules
sudo rm -rf /usr/local/bin/npm /usr/local/share/man/man1/node.1 /usr/local/lib/dtrace/node.d
sudo rm -rf ~/.npm ~/.nvm
brew uninstall --force node
```

## To install node correctly

Use [nvm](https://github.com/nvm-sh/nvm):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install node
```

You should be able to install node packages without `sudo` now!
Go through the first 3 exercises in [`learnyounode`](https://github.com/workshopper/learnyounode). Start it by running `npx learnyounode`.

---

Write a Node.js script that takes a command line argument for a filename, then uses fs.readFile and fs.writeFile to produce a copy of the file in which all of the lines have been reversed and the additional extension .reverse has been added. Here is what usage looks like:

```js
// in file.txt
a
b
c
d
```

```bash
// at the CLI:
$ node reverse_file.js foo.txt
$ ls
foo.txt   foo.txt.reverse

$ cat foo.txt.reverse
d
c
b
a
```
* What is the difference between JavaScript and Node.js?
* What's a runtime?
* What problem does Node.js solve?
* List 5 differences between Node JavaScript and Browser JavaScript
# Intro to Node.js

Traditionally, JavaScript is thought of as part of front-end development because JavaScript is usually compiled and executed by web browsers. However, this isn't the only place you can write code. Code is used for file servers, API servers, robots, embedded software for devices like TVs, and more. These situations call for general-purpose programming languages which aren't tied to a specific programming tasks like web development. How can you leverage the JavaScript you already know for general-purpose tasks?

```js
function add(number1, number2){
  return number + number2
}

const [ firstNumber, secondNumber ] = process.argv.slice(2)

console.log(
  add(firstNumber, secondNumber)
)
```

On the surface, there's nothing special about this code; it calculates something and logs it to the console. Ordinarly, this JavaScript file would have to be brought into an HTML file through a `<script>` tag and run in a browser. With Node, you can run this code directly in the CLI:

```bash
node add.js 3 6 # Prints 9
```

## Node

Node is way to run JavaScript outside the browser. It's not a language; JavaScript is still the programming language used in Node. Almost all the keywords, operators, methods, and techniques used in the browser still apply. Node is a runtime, which is what actually executes the code. On the front-end, the runtime is the browser. Everywhere else, it's Node.

## Uses for Node

* **Working with file systems.** Browser JavaScript can't read or create files, but Node has no such restrictions. This makes it a popular tool for creating folder and file structures and is used in command-line tools like `create-react-app`.
* **API servers.** JavaScript is a great language for API servers because it was designed for asynchronous code, which means that it's well-suited to handling a large amount of small tasks like HTTP requests. There are a variety of frameworks such as Express that make this even easier.
* **Hardware**. JavaScript can integrate with hardware platforms like Raspberry Pi to create smart appliance, robots, and more.

## Differences from Browser JavaScript

* Since Node runs outside the browser, it doesn't come with all the tools for interacting with web pages- there is no `document`, no `window`, and no DOM.
* Conversely, Node has built-in tools for reading and writing files and otherwise controlling things on the computer that's running the code.
* Node has a built-in module system called CommonJS. When Node was designed, there was no `import`/`export` or modules in the language.
* Node has a robust system for managing and installing other people's code called [npm](https://www.npmjs.com/).

## Additional Resources

| Resource | Description |
| --- | --- |
| [Node.js](https://nodejs.org/en/) | Official Node.js webpage |
| [Wikipedia: Node.js](https://en.wikipedia.org/wiki/Node.js) | Wikipedia's article on Node.js |
| [Why the hell would I use Node.js?](https://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js) | Blog post outlining the uses of Node |
| [Video: Node.js Tutorial For Beginners](https://www.youtube.com/watch?v=TlB_eWDSMt4) | Video overview of Node |
Node.js
JavaScript
Compilation
File Server
API Server
Embedded Software
Web Development
HTML
CLI
Runtime
Raspberry Pi
HTTP Request
Asynchronous Code
Express
Framework
`document`
`window`
DOM
Module
CommonJS
npm
For each of the following NPM packages, write a short summary describing what it does:

* `express`
* `lodash`
* `socket.io`
* `validator`
* `date-fns`
* `jsonwebtoken`
* `bcrypt`
* `uuid`
* `rimraf`
* `typescript`
* `jest`
* `nodemon`
* `dotenv`
* `chalk`
* `axios`
* `nodemailer`
* What is a package manager?
* How do you install packages from npm?
* How do you use installed npm packages?
* What is an npm script?
* How would you run an npm script named `start`?
* How would you run an npm script named `dev`?
* How would you run an npm script named `test`?
* How would you run an npm script named `build`?
* You clone a Node.js project from npm and run it. It fails because of missing dependencies. What did you forget to do?
* Why should you add `node_modules` to `.gitignore`?
* What is the difference between `import { map } from "lodash"` and `import { map } from "./lodash"`?
* What are the differences between JavaScript and JSON?
* What is a `package-lock.json` file?
* What is a `package.json` file?
# npm

npm, or Node Package Manager, is a tool for installing and using code that others have written and shared.

## Searching for Packages

When you have a problem you suspect already has a published solution, you can look for a package on [npmjs.com](https://www.npmjs.com/). For example, if you're looking for ways to work with weather data, you might search for "weather":

![Searching for weather packages on NPM](assets/npm-1.png)

You can view details about any package here, including instructions on how to use it, source code, how recently it's been updated, and more.

![Weather package details](assets/npm-2.png)

In general, packages with more weekly downloads can be expected to be more robust and reliable than packages with fewer weekly downloads. Consider this when selecting packages.

## Installing Packages

Add npm packages to projects with `npm install package-name-here`. For example, to install the popular library Lodash:

```bash
npm install lodash
```

Installing a package adds information about the install to the `package.json` and `package-lock.json` files that other users can use to redownload the packages when they run your code.

## Using Packages

Once a package has been installed, it can be used by importing it:

```js
import _ from "lodash"

const someArray = [1, 2, 3]
const someOtherArray = [2, 4, 6]

console.log(_.intersection(someArray, someOtherArray)) // [2]
```

If a package has specific parts available as named exports, you can import them too:

```js
import { intersection } from "lodash"

const someArray = [1, 2, 3]
const someOtherArray = [2, 4, 6]

console.log(intersection(someArray, someOtherArray)) // [2]
```

Note that this syntax is similar to the syntax for JavaScript object destructuring, but works very differently. You can't destructure an object while importing a package.

## Using npm Scripts

`package.json` files have a `scripts` key that defines different scripts that can be run from the command line. For example, React apps built with CRA come with these by default:

![Contents of a package.json file](assets/npm-3.png)

This app has 4 scripts: `start`, `build`, `test`, and `eject`. `start` and `build` are special keywords in npm that can be run as follows:

```bash
npm test
npm start
```

For all other scripts, such as `build` and `eject`, add the keyword `run`:

```bash
npm run build
npm run eject
```

This is useful for adding utility scripts to your projects that others can use.

## Installing Dependencies

When you clone a new repo that uses npm packages or pull Git commits that add new dependencies, the first thing you need to do is install the dependencies. To do this in a Node.js project, run `npm install` without any other arguments.

## Watch Out!

In every project with npm packages, you should have a file called `.gitignore` in the root of the project directory with at least the following contents:

```
node_modules
```

This prevents Git from adding all of your installed npm packages to your repository. A `node_modules` folder can be extremely large; even larger than sites like GitHub will allow you to store. The `package.json` and `package-lock.json` files contain all the necessary instructions for other users to download the dependencies themselves, so version controlling these 2 small files is sufficient for tracking all the dependencies your project uses.

---

Importing an npm package  is similar to importing a JavaScript module you've written, such as a component. The difference is that npm packages are imported by their name, and a regular module import must start with `.` or `..`. For example:

```react
import lodash from "lodash" // npm package
import SomeComponent from "./SomeComponent" // Same folder
import SomeOtherComponent from "../some-folder/SomeOtherComponent" // Adjacent folder
```

---

**Never** `sudo npm install` any package. Npm packages can be made and published by anyone, and not all of those people have your best interests in mind. `sudo npm install`ing a package can give the package maintainer administrative control of your computer.

---

`package.json` is JSON, not JavaScript. All keys and string values must be double-quoted, no trailing commas are allowed.

## Additional Resources

| Resource | Description |
| --- | --- |
| [npm](https://www.npmjs.com/) | npm's officially site |
| [Toptal: A guide to npm](https://www.toptal.com/javascript/a-guide-to-npm-the-node-package-manager) | Overview of npm's features |
* npm
* Package Manager
* Package
* Library
* `package.json`
* JavaScript: `import`
* JavaScript: `export`
* Dependency
* `.gitignore`
* `node_modules`
* JSON
* When adding `objection` to an Express app, what other two libraries are required?
* What is the primary class provided by Objection?
* What is a JavaScript class?
* What is a static method?
* What is a instance method?
* What is a static getter?
* What is an instance getter?
* What does `extends` do in JavaScript?
* How do you declare methods in JavaScript classes?
* How do you declare properties in JavaScript classes?
* What does the `new` keyword do?
# Intro to Objection

Objection is a JavaScript ORM built on top of Knex. It offers a `Model` class that can be extended to create related models, making it easier to create, read, update, and delete data from the database.

## Installing Objection

To install Objection in a Node project:

```bash
npm install objection
```

Keep in mind that Objection requires Knex, so a full install requires also installing that and a database driver as well:

```js
npm install objection knex pg
```

## Configuring Objection

After you configure Knex, pass it into the `.knex` method of the `Model` class:

```js
const { Model } = require("objection")
const database = require("./database-connection")
const Model.knex(database)
```

The `Model` class is the primary way to interact with Objection.

## JavaScript Classes

Classes are a kind of blueprint for creating objects that are used in many programming languages, and are now available in JavaScript. Objection makes heavy use of classes. Some key concepts and vocabulary:

* Classes are blueprints for creating objects.
* Classes contain methods and properties, just like JavaScript objects.
* Static methods and properties belong to class, instance methods and properties belong to objects created with the class
* Classes can inherit methods and properties from other classes, which allows you to create hierarchies of classes that go from general to specific.


Classes have a lot of features, but these are the ones relevant to using Objection:

```js
class SomeClass extends SomeOtherClass {
  someProperty = "Some value"
  static someStaticProperty = "Some other value"
  someMethod(){
    return "Some value"
  }
  static someStaticMethod(){
    return "Some other value"
  }
  get someGetterProperty(){
    return "Some value"
  }
  static get someStaticGetterProperty(){
    return "Some other value"
  }
}

class SomeOtherClass {
  someInheritedProperty = "Some inherited value"
  someInheritedMethod(){
    return "Some inherited value"
  }
  static someStaticInheritedMethod(){
    return "Some inherited value"
  }
  static someStaticInheritedProperty = "Some inherited value"
}

const someObject = new SomeClass()
someObject.someProperty // "Some value"
someObject.someMethod() // "Some value"
someObject.someGetterProperty // "Some value"
someObject.someInheritedProperty // "Some inherited value"
someObject.someInheritedMethod() // "Some inherited value"

SomeClass.someStaticProperty // "Some other value"
SomeClass.someStaticMethod() // "Some other value"
SomeClass.someStaticGetterProperty // "Some other value"
SomeClass.someStaticInheritedProperty // "Some inherited value"
SomeClass.someStaticInheritedMethod() // "Some inherited value"
```

1. Classes are declared with the `class` keyword and the names are traditionally PascalCased.
2. The `extends` keyword allows one class to inherit all the methods and properties from another class, meaning that any property or method in the class being extended can be used by the extending class.
3. Properties are declared similarly to variables, but don't use `const` or `let`
4. Methods use a function syntax called method shorthand that otherwise works identically to other kinds of functions
5. The `get` keyword is used to create properties that are calculated like methods. Unlike regular properties, this allows them to be calculated dynamically.
6. Objects are created from classes using the `new` keyword.

## Watch Out!

* Objection still requires that knex and a suitable database driver are installed. Additionally, the database needs to be migrated and seeded and the database connection needs to be established.
* Properties and methods aren't separated by commas in classes the way they are in regular JS objects

## Additional Resources

| Resource | Description |
| --- | --- |
| [Objection.js](https://vincit.github.io/objection.js/) | The official Objection.js docs |
| [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) | MDN's reference on JavaScript classes |
| [Video: Objection.js Tutorial](https://www.youtube.com/watch?v=zbIl2kuP7tE) | Productioncoder's guide to Objection |
Objection.js
Knex.js
ORM
Model
Node.js
npm
JavaScript: `class`
JavaScript: `extends`
JavaScript: `get`
JavaScript: `new`
Class
Object
Static Method
Instance Method
Static Property
Instance Property
Class Inheritance
Getter
Database Driver
[Teams and Athletes ORM Modeling](https://github.com/sikaeducation/teams-and-athletes-orm-modeling)_
* What is `relationMappings` in Objection?
  * An instance method
  * A static method
  * An instance getter property
  * A static getter property
* List 2 relationship classes in Objection.
* What is a `modelClass` in Objection?
* What does the `join` object in an Objection `relationMappings` define?
# Objection: One-to-Many

Building models with Objection is elegant and has some benefits, but you really see its power when you start working with related data.

## Modeling One-to-Many Relationships

![ERD showing one owner having many dogs](assets/dog-erd-1m.png)

To model relationships with Objection, use the `relationMappings` static getter on a model:

```js
class Dog extends Model {
  static tableName = "dog"

  static get relationMappings(){
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: require("./Person"),
        join: {
          from: "dog.owner_id",
          to: "person.id"
        },
      },
    }
  }
}
```

```js
class Person extends Model {
  static tableName = "person"

  static get relationMappings(){
    return {
      dogs: {
        relation: Model.HasManyRelation,
        modelClass: require("./Dog"),
        join: {
          from: "person.id",
          to: "dog.owner_id",
        },
      },
    }
  }
}
```

[Play with this code](https://codesandbox.io/s/gifted-tree-2jm56)

Some things to note:

* Each key in the object returned from the `relationMappings` getter is what you want to name a relationship. In general, you should use the plural of the model if it's a `hasManyRelation` and the singular of the model if it's a `BelongsToOneRelation`, but you can name them anything you wish.
* The `Model` object has specific classes that define the type of relationship. The two relevant to 1:M relationships are:
  * `Model.HasManyRelation`, which should be used to reference the _many_ side of a relationship
  * `Model.BelongsToOneRelation`, which should be used to reference the _one_ side of a relationship
* The `modelClass` property needs to reference the actual class of the model you're creating a relationship with, not just the name of it. The safest way to do this is by putting it in an external file and requiring directly into the property.
* Putting the `require` statement in the `modelClass` itself helps resolve situations where two models depend on each other.
* The `join` object describes which columns should match in the database, meaning one should be a primary key and the other a foreign key. `from` should always be the table of the model you're writing the relationship on. Both values are strings describing the table and the column in the database.

## Reading Related Records

To read related records, use the `.withGraphFetched` method of a model:

```js
const peopleWithDogs = Person.query().withGraphFetched("dogs")

/*
[{
  id: 1,
  name: "Kyle",
  dogs: [{
    id: 1,
    name: "Bixby",
  }]
},{
  id: 2,
  name: "Elyse",
  dogs: [{
    id: 1,
    name: "Mesa",
  },{
    id: 2,
    name: "Harmony",
  }]
}]
*/
```

You can also use combine it with the query methods you already know:

```js
const personWithDogs = Person.query().findById(2).withGraphFetched("dogs")

/*
[{
  id: 2,
  name: "Elyse",
  dogs: [{
    id: 1,
    name: "Mesa",
  },{
    id: 2,
    name: "Harmony",
  }]
}]
*/
```

## Inserting Related Records

To insert several related records, use `.insertGraph`:

```js
Person.query().insertGraph([{
  name: "Kyle",
  dogs: [{
    name: "Bixby",
  }]
},{
  name: "Elyse",
  dogs: [{
    name: "Mesa",
  },{
    name: "Harmony",
  }]
}])
```

This inserts 2 people and 3 dogs into the database and correctly associates the records.

## Watch Out!

`HasManyRelation` and `BelongsToOneRelation` are classes (not properties or methods) so they start with capital letters

## Additional Resources

| Resource | Description |
| --- | --- |
| [Objection: Relations](https://vincit.github.io/objection.js/guide/relations.html#examples) | Official Objection docs on relations |
One-to-Many Relationship
Objection.js
Knex.js
Model
`Model.withGraphFetched`
`Model.insertGraph`
Static Getter
Primary Key
Foreign Key
[Students and Courses ORM Modeling](https://github.com/sikaeducation/student-course-mn)
* What relationship class does a many-to-many relationship use in Objection?
* How are related records retrieved in Objection?
* How are related records created in Objection?
* When creating a M:N relationship, what is different about the `join` object in a model's `relationMappings` in Objection?
# Objection: Many-to-Many

Many-to-Many relationships have one of the largest Object-Relational impedance mismatches and as such they benefit the most from ORMs.

## Modeling Many-to-Many Relationships

![ERD showing a many to many relationship between owners and dogs](assets/dog-erd-mn.png)

Like One-to-Many relationships, Many-to-Many relations use the `relationMappings` static getter:

```js
class Dog extends Model {
  static tableName = "dog"

  static get relationMappings(){
    return {
      owners: {
        relation: Model.ManyToManyRelation,
        modelClass: require("./Person"),
        join: {
          from: "dog.id",
          through: {
            from: "dog_owner.dog_id",
            to: "dog_owner.owner_id",
          },
          to: "person.id"
        },
      },
    }
  }
}
```

```js
class Person extends Model {
  static tableName = "person"

  static get relationMappings(){
    return {
      dogs: {
        relation: Model.ManyToManyRelation,
        modelClass: require("./Dog"),
        join: {
          from: "person.id",
          through: {
            from: "dog_owner.owner_id",
            to: "dog_owner.dog_id",
          },
          to: "dog.id"
        },
      },
    }
  }
}
```

[Play with this code](https://codesandbox.io/s/relaxed-shannon-5y30d)

Most of this is the same as One-to-Many relationships. The key differences are using the `Model.ManytoManyRelation` class and adding the `through` object to the relation mapping.

```js
{
  join: {
    from: "dog.id",
    through: {
      from: "dog_owner.dog_id",
      to: "dog_owner.owner_id",
    },
    to: "person.id"
  },
}
```

The `through` object describes how each model table maps to the join table in the Many-to-Many relationships. It may be helpful to think of both `from`s matching and both `to`s matching.

## Reading Related Records

Reading related records in a Many-to-Many relationship works the same as One-to-Many:

```js
const ownersWithDogs = Person.query().withGraphFetched("dogs")
const dogsWithOwners = Dog.query().withGraphFetched("owners")
const personWithDogs = Person.query().findById(2).withGraphFetched("dogs")
Person.query().insertGraph([{
  name: "Kyle",
  dogs: [{
    name: "Bixby",
  },{
    name: "Mesa"
  }]
},{
  name: "Elyse",
  dogs: [{
    name: "Mesa", // Both Kyle and Elyse own Mesa
  },{
    name: "Harmony",
  }]
}])
```

## Watch Out!

The join table doesn't need its own Objection model unless you need to query that model directly.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Objection: Relations](https://vincit.github.io/objection.js/guide/relations.html#examples) | Official Objection docs on relations |
Many-to-Many Relationship
One-to-Many Relationship
Join Table
Objection.js
Knex.js
Model
`Model.withGraphFetched`
`Model.insertGraph`
Static Property
[New Year's Resolutions - Add Queries](https://github.com/sikaeducation/new-years-resolution-add-queries)
* What is an Objection model?
* How do you tell an Objection model which database table it should query?
* How do you query an Objection model?
* What is a virtual attribute in Objection?
* List 5 examples of virtual attributes in Objection.
* How do you include virtual attributes in query responses in Objection?
* How do you create a new instance of an Objection model?
* How do you use an Objection model to update records in a database?
* How do you use delete records using Objection models?
* What does `.first()` do in Objection?
# Objection: Simple Modeling and Querying

Objection models are streamlined way to create, read, update, and delete data from databases with JavaScript. These are some examples of how to model and query single tables in a database:

## Modeling

To create Objection models that can talk to database tables, make a class that extends the `Model` class and set it's `static tableName` to the name of the table in the database.

```js
class Dog extends Model {
  static tableName = "dog"
}
```

These models are usually put into individual JavaScript files and exported as modules.

```js
// models/Dog.js
const { Model } = require("objection")

class Dog extends Model {
  static tableName = "dog"
}

module.exports = Dog
```

Any file that needs to query something from the `dog` table can now import the `Dog` model:

```js
// index.js
const Dog = require("./models/Dog")
```

## Finding

Once a model has been imported, the `.query()` method can be used to retrieve every dog record from the database. Chaining the `.findById(id)` method to the end of it will only return the given ID, while `.where(column, value)` allows you to search on any property. If you only want the first match from `.where()`, add `.first()` to the end.

```js
const dogs = await Dog.query()
const dog = await Dog.query().findById(1)
const dog = await Dog.query().where("color", "black")
const dog = await Dog.query().where("age", ">" 10)
const dog = await Dog.query().where("name", "Scruffers").first()
```


Note that these, and all other query methods in Objection return promises and must be `await`ed in an `async function` or `.then`ed.

```js
app.get("/dogs", async (request, response) => {
  const dogs = await Dog.query()

  response.json({ dogs })
})
```

`async`/`await` syntax works well in Express because errors are automatically caught by error handling routes.

### Virtual Attributes

Rather than doing calculations based on data in routes, you can store them as part of models. For example, a `dog` database record might store a dog's birthdate, but its age is calculated dynamically. This is called a virtual attribute.

```js
class Dog extends Model {
  static tableName = "dog"
  age(){
    return (Date.now() - Date.parse(this.birthdate)) / 1000 / 60 / 60 / 24 / 365
  }
  static get virtualAttributes(){
    return ["age"]
  }
}
```

Note that the `age` method isn't static, and properties from database records are referred to from the built-in `this` object.
Additionally, the static getter `virtualAttributes` returns an array with the names of every virtual attribute that should be included along with query results.

## Creating

To create new database records with models, chain `.insert()` to the `.query()` method and pass it an object with the values you would like to add to this table.

```js
const newDog = await Dog.query().insert({
  name: "Scruffers",
  birthdate: "2020-01-14",
})
```

Make sure that the keys in the object match the column names. It's conventional for database column names to be snake_case, so you may need to convert them.

## Updating

Existing data can be updated by finding a relevant record with `.findBy()` or `.findById()` and calling `.patch()` with the data that should be updated.

```js
const updatedDog = await Dog
  .query()
  .findById(1)
  .patch({
    name: "Mr. Scruffers",
  })

const anotherUpdatedDog = await Dog
  .query()
  .patch({
    name: "Mr. Scruffers",
  }).where("name", "Scruffers")
```

## Deleting

To delete records from the database, either use the `.deleteById()` method or the `.delete()` method along with the `.where()` method.

```js
await Dog
  .query()
  .delete()
  .where("color", "white")

await Dog
  .query()
  .deleteById(1)
```

You can also chain `.first()` to `.where()` queries here.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Objection: Modeling](https://vincit.github.io/objection.js/guide/models.html#examples) | Official Objection docs on models |
| [Objection: Querying](https://vincit.github.io/objection.js/guide/query-examples.html) | Official Objection docs on querying |
| [Knex: Query Builder](https://knexjs.org/#Builder) | Official Knex docs on querying syntax |
Objection.js
Model
Database Table
Static Property
Module
JavaScript: `async`
Virtual Attribute
CRUD
Database Record
snake_case
Database Column
* What is an ORM?
* What problem do ORMs solve?
* Why shouldn't ORMs be used for all database interactions?
# Intro to ORMs

Relational data is stored flat:

**teacher**

| id | name
| --- | --- |
| 1 | Zeke |
| 2 | Yvette |

**student**

| id | name | teacher_id |
| --- | --- | --- |
| 1 | Alice | 1 |
| 2 | Bob | 2 |
| 3 | Carrie | 1 |

However, that data is usually nested in applications:

```js
[{
  id: 1,
  name: "Alice",
  teacher: {
    id: 1,
    name: "Zeke",
  },
},{
  id: 2,
  name: "Bob",
  teacher: {
    id: 2,
    name: "Yvette",
  },
},{
  id: 3,
  name: "Carrie",
  teacher: {
    id: 1,
    name: "Zeke",
  },
}]
```

How do you translate between these two styles? This problem is called the object-relational impedance mismatch and it's a common issue with database-backed applications. It can be solved a variety of ways, but most of them involve programmatically translating between the two formats. Doing this by hand in Node.js might look like this:

```js
const teachers = await Teacher.query()
const students = await Student.query()

const studentsWithTeachers = students.map(student => {
  student.teacher = teachers.find(student.teacher_id)
  delete student.teacher_id
  return student
})
```

This works, but it's inefficient and gets exponentially more difficult to read when additional 1:M and M:N relationships are added.

## ORMs

Another solution to the object-relational impedance mismatch is to use an object-relational mapper, or ORM. ORMs rely on models that represent each table and define what relationships exist between them. Once these models are established, the ORM gives you efficient ways to declare what relational data you want to read, create, update, or delete and outputs the data in a way that's useful to applications. You query the database for related records using the ORM and let it design the query and format the response for you. For example, using the Node.js ORM Objection:

```js
const studentsWithTeachers = await Student.query().withGraphFetched("teacher")

/*
[{
  id: 1,
  name: "Alice",
  teacher: {
    id: 1,
    name: "Zeke",
  },
},{
  id: 2,
  name: "Bob",
  teacher: {
    id: 2,
    name: "Yvette",
  },
},{
  id: 3,
  name: "Carrie",
  teacher: {
    id: 1,
    name: "Zeke",
  },
}]
*/
```

## Watch Out!

ORMs are powerful, but they're also too general-purpose to work efficiently in every scenario. In particular, the N+1 problem occurs when an ORM executes separate database queries for a large list of related items instead of making one large query and associating the related records in memory. Most ORMs have a way to work around this called eager loading.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: Object-Relational Mapping](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) | Wikipedia's article on ORMs |
| [Wikipedia: Object-Relational Impedance Mismatch](https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch) | Wikipedia's article on the object-relational impedance mismatch |
| [Stack Overflow: What is the N+1 Problem?](https://stackoverflow.com/questions/97197/what-is-the-n1-selects-problem-in-orm-object-relational-mapping) | Stack Overflow answers describing the N+1 query problem |
| [Video: Introduction to Object-Relational Mapping](https://www.youtube.com/watch?v=dHQ-I7kr_SY) | LaunchCode's overview of Object-Relational mapping |
ORM
Object-Relational Impedance Mismatch
1:M
M:N
Model
SQL Query
Node.js
N+1 Problem
Eager Loading
## List and Diagram

Draw a picture or diagram that visualizes an approach to solving these problems. Note that your visualization may incidentally solve the problem, but that's not a requirement.

* List the different combinations of heads and tails that are possible when a penny and a nickel are flipped.
* Use the numbers 1, 2, 3, and 4 to make as many ordered pairs as you can. For example, (1, 3) is a pair, as is (3, 1). Repeats are allowed, so (1, 1) counts as a pair.
* How many ways can two different 6-sided dice be rolled?
* How many ways can a 4-sided die and a 12-sided die be rolled?

---

## Simplify

Come up with simpler versions of these problems that may yield useful insights in the original problem:

* 10 people are being honored for their work. How many different ways can you line them up to take a picture?
* If you guess at 10 true/false questions, how many different ways can you fill out the 10 answers?
* Using all the letters of the alphabet, how many two letter codes can you form if you're allowed to use the same letter twice and the order of the letters is significant?
* A family has 7 children, some of whom have black hair, some of whom have red hair. If you list them (eg. `bbrbrrb`), how many lists are possible?
* A car comes with 7 options: upgraded tires, front heated seats, polished rims, front parking sensor, carbon interior trim, fender shields, and custom seat covers. You can buy the car with any combination of these, including none. How many possibilities are there?

---

## Problems

Come up with at least two different approaches to solving this problem. Note that you don't actually need to solve the problem, just enumerate at least two possible approaches.

* The local government wants to preserve two buildings. The combined age of the buildings is 451 years. If one building is twice as old as the other, what are the ages of the two buildings?
* You worked 15 hours last week. One job as a clerk in a sporting goods store paid you $7.25 an hour, and your job teaching guitar paid $12 an hour. If you earned $137.25 between the two jobs, how many hours did you work at each job?
* Last season, you carried the football 2 times more than your friend Steve, and 68 times less than your friend Jack. If all 3 of you carried the ball 1,110 times, how many times did each carry the ball?
* Two baseball players, Lisa and May, had a total of 295 runs batted in. If Lisa had 7 more than May, how many did each have?
* To number the pages of a bulky volume, the printer used 2989 digits. How many pages has the volume?
* Given a regular hexagon and a point in its plane, draw a straight line through the given point that divides the given hexagaon into two parts of equal area.
* How is understanding the problem distinct from devising the plan?
* What does DAVE stand for?
* What benefits do you get from just guessing an answer and seeing if you're right?
* What does it mean to make a model as part of devising a plan?
* What is a tree diagram? What kinds of problems are they well-suited to?
* Describe two examples of making a problem more specific.
* Describe two examples of making a problem more general.
* What is a special case of a problem?
# Polya's Problem-Solving Method: Devising a Plan

The second step of Polya's problem-solving method is to devise a plan to solve the problem. This is distinct from actually solving the problem; all you're doing at this stage is thinking of ways the problem could be solved. Not all questions will relevant to all problems, but even seemingly irrelevant questions may yield useful insights.

## Strategies For Finding Solutions

When looking for ways to design a solution, remember DAVE:

### Deduce

* Can you eliminate some possibilities?
* You can just guess an answer?
  * Is the answer right? Can you figure out how to get to it?
  * Is the answer wrong? In what ways? How close was it?
  * Are you noticing patterns?
* Can you work backwards from the solution? How does the data become the unknown?
* Are there any patterns present?
* Are any parts of the problem interchangeable?

### Associate

* Can it be translated into an equation or formula?
* Are any parts of the problem similar to other kinds of problems? Could you use their:
  * Unknowns?
  * Constraints?
  * Data?
  * Solutions?
  * Methods? 

### Visualize

* Can you visualize it as a:
  * List?
  * Table?
  * Chart?
  * Tree diagram?
  * Model?
* Draw a picture
  * Does it help emphasize some parts?
  * Does it need different kinds of lines (solid, dotted, dashed)?
  * Should it use multiple colors?
  * Should it be 2D or 3D?

### Ease-In

* Solve an easier problem
  * What if you didn't have to solve part of the problem? Can you remove one of the constraints?
  * What if you assume something you suspect to be true but can't prove yet? Can you add a piece of data?
  * Can you build something that would help solve the problem?
  * Could you change any part of the problem to make it easier? Could you make the start closer to the end?
* Change the number of parts
  * Combine: Can you combine parts of the problem into one whole?
  * Decompose: Can you split the problem into multiple parts?
* Change the scope
  * Can you make it more specific?
  * Can you make it more general?

## Evaluating solutions

If you think you've crafted an approach, these questions will help you assess its viability:

* Can you check the answer using this strategy? Does it solve it?
* Does it handle special cases?
* Did you use all of the data you were given? Did you need to?
* Is it efficient?
* Do you think you can implement it?
Polya: DAVE
Polya: Constraint
Tree Diagram
Model
## Parts of the Problem

For each of these, determine:

* What is the given data?
* What is unknown?
* What constraints are present?

Note that you are not required to actually solve the problem.

* How many ways can you change 1 dollar?
* Four campers, Adliya, Benjamin, Christine, and Dari, have just arrived at the Seeds of Peace Camp in Maine for an orientation session. Each will shake hands with all of the others. Draw a picture to illustrate this situation, and determine the number of handshakes.
* Bob has 10 pockets and 44 silver dollars. He wants to put his dollars in his pockets so distributed that each pocket contains a different number of dollars. Can he do so?
* Bob, Peter, and Paul travel together. Peter and Paul are good hikers; each walk `p` miles per hour. Bob has a bad foot and drives a small car in which two people can ride, but not three. The car covers `c` miles per hour. The three friends adopted the following scheme: They start together, Paul rides in the car with Bob, Peter walks. After a while, Bob drops Paul, who walks on. Bob returns to pick up Peter, and then Bob and Peter ride in the car till they overtake Paul. At this point, they change. Paul rides and Peter walks just as they started and the whole procedure is repeated as often as necessary. How much progress in miles does the company make per hour? Through which fraction of the travel time does the car carry just one man? Check the extreme cases `p = 0` and `p = c`.
* How can you get exactly 6 quarts of water from a river when you have only 4 quart and 9 quart buckets?

---

## Unsolvable Problems

These problems aren't solvable. Why?

* Among grandfather's papers, a bill was found: `72 turkeys $_67.9_`. The first and last digit of the number that obviously represented the total price of those fowls are replaced here by blanks, for they have faded and are now illegible. What are the two faded digits and what was the price of one turkey?
* A bear, starting from the point P, walked one mile due south. Then he changed direction and walked one mile due east. Then he turned again to the left and walked one mile due north, and arrived exactly at the point P he started from. What color was the bear?
* Bob wants a piece of land, exactly level, which has 4 boundary lines. Two boundary lines run exactly north-south, the two others exactly east-west, and each boundary line measures exactly 100 feet. Can Bob buy such a piece of land in the US?

---

## Visualizing Problems

Draw a picture or diagram that represents each of these:

* You make a 40ft long sub sandwich for a party. The sandwich is cut into 3 unequal pieces. The longest piece is three times as long as the middle piece, and the shortest piece if 5 feet shorter than the middle piece.
* Five liters of a 10% sugar solution are mixed with pure water to get a 5% solution.
* 6 people clink each other's classes in a toast.
* Messages are sent between three spies: Austin Powers, James Bond, and Chloe O'Brien.
* The Democratic, Republican, and Green political parties have no members in common.
* Assume that one group of students who are interested in physical fitness is taking Zumba classes and another is taking Pilates.
* Suppose a standard 8x8 chessboard has two diagonally opposite corners removed, leaving 62 squares. Is it possible to place 31 dominoes of size 2x1 so as to cover all of these squares?
* A solar panel is 3 times as long as it is wide.

---

## Sequence

Is the sequence of these operations important? Support your answer with examples.

* Square a number, add 5; Add 5 to a number, square the result
* Square two numbers, subtract the results; Subtract the reults, square the difference
* Add two numbers then divide by 3; Divide two numbers by 3 then add them together
* Multiple two numbers by 5 then add them together; Add two numbers together and then multiply the result by 5

---

## Veracity

Are these statements true? Support your answer with examples.

* Months of the year have 31 days
* (a / b) + (c / d) = (a + c) / (b + d)
* If a < b, then a + c < b + c
* If a < b, then a^2 < b^2
* x + y - z = x + z - y
* If the lengths of the sides of a square are doubled, then the area of the square is also doubled
* If a price is increased by 10% and then decreased by 10%, the price will be the same as the original price.
* Many people skip over the first step of Polya's problem-solving methodology. Why do you think that is?
* What is an example of a problem where you are being asked to find something? What is an example of a problem where you need to  prove something?
* What can you learn from stretching the parameters of a problem to absurd lengths?
* Why can it be useful to make up data that you don't have to understand a problem?
# Polya's Problem-Solving Method: Understanding the Problem

The first step in Polya's problem-solving method is understanding the problem. While seemingly obvious, this is the most critical part to get right and the most commonly skipped. It's easy to come up with great solutions to the wrong problem and small changes in wording can result in large changes in what's being asked. When faced with a new problem, first identify the facts and then try to understand them.

## Identify

Most problems have some data that will be supplied, at least one unknown element, and conditions that must be met. Some questions to help pull those out of the problem:

* Are you being asked to find something or prove something?
* Can you separate out the data, the unknown, and conditions?
* Is all of the information relevant?
* Are there special cases?
* Do you understand all of the words in the problem? Is there any special terminology you need to distinguish?

## Understand

Identifying the parts of a problem is the first step but it's not enough to stop there. These questions help you shape the facts into an understanding:

* Can you restate the problem? How many different ways can you do it?
* Can you make an table that represents sample inputs and the outputs they should generate?
* Can you think of what the opposite of this problem is?
* Can you visualize the problem as a whole?
* Can you think of a picture or diagram that might help you understand the problem?
* Have you seen a problem like this before?
  * What's different about it?
  * Can we use the same solution?
  * Is the similarity biasing you?
* Is there an analogy for this problem?
* Are there multiple parts of the condition that can be separated out?
* Is there a notation you can use to rewrite the problem?
* If you simplify or round parts of the problem, how much precision do you lose?
* Can you stretch the parameters to absurd lengths?
* Is the sequence things happen in important?
* Can you think of a more specific example of this problem?
* Are any parts of the problem redundant?
* Are any parts of the problem contradictory?
* Is the problem solvable with the available information?
* What other data would be useful to have? If you don't have it, can you make it up?
Polya: Data
Polya: Unknown
Polya: Constraint
1. Install PostgreSQL.
2. Start the PostgreSQL process.
3. Create a new database.
4. Enter it with `sudo -u postgres psql database-name-goes-here`
5. Exit with Control + D.
* Why do you need to run Postgres CLI commands as the `postgres` user?
* How do you start PostgreSQL on your computer?
* When do you need to start PostgreSQL on your computer?
* How do you create new databases?
# PostgreSQL Installation and Setup

To integrate databases into your applications, you need to install the database software.

## Installing and Running PostgreSQL

Follow these instructions to install the PostgreSQL database management system on your operating system:

### Linux

Run this command to install PostgreSQL:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

If you ever need to restart Postgres, run:

```bash
sudo service postgresql restart
```

### MacOs

Run this command to install PostgreSQL:

```bash
brew install postgresql
```

If you ever need to restart Postgres, run:

```bash
brew services restart postgresql
```

## Creating Databases

To create a new Postgres database, use the `createdb` command. For example, to create a database called `imdb`, run:

```bash
sudo -u postgres createdb imdb
```

You can now connect to `imdb` with a database connection tool like `pg` or a CLI tool like `psql`.

## Watch Out!

The `sudo -u postgres` command run `createdb` as the `postgres` user on your computer. This user is added during the PostgreSQL installation, and by default is the only user allowed to issue commands to the databse.

## Additional Resources

| Resource | Description |
| --- | --- |
| [PostgreSQL: Downloads](https://www.postgresql.org/download/) | Official PostgreSQL installers |
PostgreSQL
RDBMS
DATABASE
`createdb`
`sudo`
Database Driver
`psql`
Load the [Hair and Eye Color](assets/hair-and-eye-color.sql) SQL file into a PostgreSQL database. Explore it with `psql`:

* Examine the structure of the database
* Select everything from one table
* Select one thing from the table
* Select multiple things from one table
* What's the difference between `psql` and `postgresql`?
* How do you run `psql` commands as the `postgres` user?
* How do you quit `psql`?
* How do you save the output of a `psql` query to a file?
* How do you run a `.sql` file in `psql`?
# Postgres: `psql`

## Launching `psql`

To start `psql`, use the `psql` command followed by the name of the database you want to connect to:

```bash
sudo -u postgres psql database_name_goes_here
```

The `sudo -u postgres` prefix runs the `psql` command as the `psql` command as the `postgres` user on your local computer.

You can also use `psql` with PostgreSQL connection strings used to connect to remote databases:

```bash
psql postgresql://username:password@database.server.com:5432/database_name
```

Once inside `psql`, you can run any SQL command on the database by typing it in and pressing enter. You can quit with `\q` or by pressing `ctrl` + `d`. Note that this is different than the command used to kill other processes in the CLI, `ctrl` + `c`.

## Common `psql` Commands

* **`\d`**: Lists all the tables in the database
* <strong>`\d table_name_goes_here`</strong>: List all the columns in a table
* **`\l`**: List all the databases
* **`\q`**: Quit `psql`
* **`\?`**: Display help on PostgreSQL commands
* **`\h`**: Display help on SQL commands

Note that none of these commands end with `;`; These commands display metadata about the database, but they're not SQL commands.

## Running an External SQL File

To run a `.sql` file with `psql, use the `-f` flag:

```bash
sudo -u postgres psql database_name_goes_here -f some-sql-file.sql
```

If you want to save the result of running a query to a file, use the `>` redirect operator:

```bash
sudo -u postgres psql database_name_goes_here -f some-sql-file.sql > sql-results.txt
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Postgres Guide: `psql`](http://postgresguide.com/utilities/psql.html) | Postgres Guide's cheatsheet on `psql` |
| [SQL Zoo: `psql`](https://sqlzoo.net/wiki/Starting_Postgres) | SQL Zoo's cheatsheet on `psql` |
| [PostgreSQL: `psql` reference](https://www.postgresql.org/docs/13/app-psql.html) | Official `psql` documentation |
`psql`
Database
PostgreSQL
SQL
Database Table
Database Column
CLI Flag
CLI
Redirect Operator
# Intro to Problem Analysis

When you start programming your natural inclination will be to immediately start coding. You'd be well-served by exercising the discipline to analyze the problem first.

Computers aren't smart, they don't understand natural language, and they can't infer your intention. They can only understand what you want if you tell them very literally. On the other hand, human problems are rarely so neat and tidy. That means that we need to do a lot of interpretation before telling the computer what to do.

There is an excellent problem-solving methodology that can guide your thinking. Polya's 4-step problem-solving methodology is a battle-hardened tool for approaching and solve any computational problem. For now, focus on the first two steps of the methods: Understanding the problem and devising a plan.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: How To Solve It](https://en.wikipedia.org/wiki/How_to_Solve_It) | George Polya's book describing this technique in detail. |
| [Texas A&M: Polya Tutorial](https://www.wtamu.edu/academic/anns/mps/math/mathlab/int_algebra/int_alg_tut8_probsol.htm) | A tutorial showing examples of applying Polya's techniques to Algebra. |
| [Berkley Math: Polya summary](https://math.berkeley.edu/~gmelvin/polya.pdf) | A popular PDF summary of all 4 steps in the process. |
| [Video: Polya's Problem Solving Process](https://www.youtube.com/watch?v=zhL3EMFSm6o) | Math Videos That Motivate's guide to Polya's process |
Natural Language
Methodology
Computational Problem
[The Human Async Program](https://github.com/sikaeducation/human-async-program)
# Asynchronous Programming

Tracing the flow of execution in synchronous programs is, if not easy, at least straight-forward. Asynchronous programs add a significant layer of complexity. When a JavaScript program contains asynchronous elements, it starts executing them top to bottom like synchronous code:

```js
console.log("First")

const a = 1
console.log("Second")

fetch(someUrl) // This is asynchronous
console.log("Third")
```

Things that depend on something asynchronous usually generally happen after all the synchronous parts have finished:

```js
console.log("First")

const a = 1
console.log("Second")

fetch(someUrl)
  .then(() => {
    console.log("Fourth")
  }).then(() => {
    console.log("Fifth")
  })

console.log("Third")
```

Techniques for working with asynchronous programs, like promises, allow you to separate your code into parts that must occur in a particular sequence from code that doesn't. For example, in a web program that allows you delete files from a server, you might send the HTTP request to delete the file to the server and then immediately remove that item from the UI without waiting for the response to come back.

## Why Async?

What would the problem be with just waiting for the fetch to resolve before moving on with the rest of the program?

```js
const result = fetch(someUrl) // Wait until this comes back
console.log(result) // Then move on with the program
```

The problem is that when a computer is waiting on something, it usually can't do anything else. In some environments (like servers), that's not always a big deal. In a browser though, that means while you're waiting for the fetch to come back the entire browser becomes unresponsive, which would make it look like the app has frozen. Techniques like promises allow you to make the computer multi-task while still having control over the sequence.

## Watch Out!

Async is not the same as real-time. Real-time data is pushed from the server every time data changes, such as messages in a chat room. While these are usually also handled asynchrously, most fetch requests are done once and not updated again until explicitly requested.


## Additional Resources

| Resource | Description |
| --- | --- |
| [Video: Asynchronous vs. Synchronous Programming](https://www.youtube.com/watch?v=Kpn2ajSa92c) | Web Dev Simplified's guide to async programming |
Asynchronus Code
Synchronus Code
JavaScript: Promise
HTTP Request
UI
Server
Browser
Async
Real-Time Data
JavaScript: `fetch`
Simplify these logic expressions:

* `(5 === 5 && 5 < 3) || ("Hello, world!" || !true) = true`

```js
const someArray = [] 
const someOtherArray = ["1", "2", "3", "4", "5"]
const message = "H"
const isActive = true
(someArray.length === 5 && someOtherArray.length < 3) || (message || !isActive)
```
* What does the `===` comparison do?
* What does the `<=` comparison do?
* What does the `>` comparison do?
* Which of these is correct, `>=` or `<=`?
* What does `!==` comparison do?
# Programming: Boolean Logic 2: Comparisons

Another application of Boolean logic is making statements that compare the values of two things.

## Boolean Comparison Operators

There are four basic boolean comparison operators:

* **`===`**: Equal to
* **`!==`**: Not equal to
* **`<`/`<=`**: Less than / Less than or equal to
* **`>`/`>=`**: Greater than / Greater than or equal to

### Equal to

The equality comparison operator `===` evaluates to `true` if the things being compared are the same type of data and value, and false otherwise.

* `5 === 5` is true because they're the same type (number) and value (5)
* `5 === 3` is false because they're the same type (number), but not the same value (3 and 5)
* `"5" === 5` is false because the not the same type (string and number), even though they're the same value (5)
* `5 === "Hello, world!" is false because they're neither the same type (number and string) or value (5 and "Hello, world!")

### Not Equal To

The inequality comparison operator `!==` evaluates to `false` if the things being compared have have the same type and value, and `true` otherwise. It's the inverse of the equality operator `===`.

* `5 !== 5` is false because they're the same type and value
* `5 !== 3` is true because they're the same type, but not the same value
* `"5" !== 5` is true because the not the same type, even though they're the same value
* `5 !== "Hello, world!" is true because they're neither the same type or value.

### Greater Than / Less Than

The greater than operator `>`/`>=` and the less than operator `<`/`<=` are used to compare numbers. A number is greater than if it's higher than another number, `less than` if it's lower than another number, and `equal` if they're the same.

* `5 > 3` is true because 5 is more than 3
* `5 >= 3` is true because 5 is more than 3
* `5 >= 5` is true because 5 is equal to 5
* `5 > 5` is false because 5 isn't more than 5
* `5 < 3` is false because 5 is less than 3
* `5 <= 3` is false because 5 is less than 3
* `5 <= 5` is true because 5 is equal to 5
* `5 < 5` is false because 5 isn't less than 5

## Using Boolean Comparisons in Boolean Expressions

Since Boolean comparisons evaluate to true or false, they can be used in the same kinds of expressions that `NOT`, `AND`, and `OR` can be used in. If you take this expression:

```
(true && false) || (true || !true) = true
```

You could swap `true` and `false` for comparisons and end with the same result:

```js
(5 === 5 && 5 < 3) || ("Hello, world!" || !true) = true
```

And you could replace those comparisons with variables that evaluate to those values:

```js
const someArray = ["a", "b", "c", "d", "e"] 
const someOtherArray = ["1", "2", "3", "4", "5"]
const message = "Hello, world!"
const isActive = true
(someArray.length === 5 && someOtherArray.length < 3) || (message || !isActive) // this evaluates to true
```

## Watch Out!

It's easy to get the order wrong on the characters for greater than or equal to and less than or equal to. Remember that they follow the same order as how they're commonly said:

* `>=` is "Greater than or equal to"
* `<=` is "Less than or equal to"

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Comparison Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#comparison_operators) | MDN's guide to comparison operators in JavaScript |
| [W3Schools: JavaScript Comparison and Logical Operators](https://www.w3schools.com/js/js_comparisons.asp) | W3School's tutorial on boolean comparison |
Boolean
Boolean Logic
`===`
`!==`
`!`
`<`
`>`
`>=`
`<=`
Evaluation
Data Type
Equality
Inequality
Data Value
Boolean Comparison
Boolean Expression
Simply these Boolean expressions:

* true OR false
* true AND false
* true AND NOT false
* NOT true AND NOT false
* NOT true OR NOT false
* (NOT true AND false) OR NOT false
* true AND (false OR NOT false)
* true OR (false OR NOT false)
* `65` OR `""`
* `"Hello, world!"` AND NOT `0`
* `{} || "" && true`
* `{} && []`
* `{} || ["Apple"]`
* `65 && !["Apple", "Banana"] || "Hello, world!"`
* `"" || !true && ["Carrot"]`
* Explain what NOT does.
* Explain what AND does.
* Explain what OR does.
* What symbol is commonly used for NOT in programming?
* What symbol is commonly used for AND in programming?
* What symbol is commonly used for OR in programming?
* What does OR NOT mean?
* What does AND NOT mean?
* Distinguish true and false from truthy and falsy
* What are the falsy values in JavaScript?
* What are the truthy values in JavaScript?
# Programming: Boolean Logic

Boolean logic is a type of math that's used to determine whether something is true or false. There are three basic boolean operators: AND, OR, and NOT.

## Boolean Operators

### AND

`AND` is a confirmation of two values. It's true if both values are true.

* `true AND true` is true
* `true AND false` is false
* `false AND true` is false
* `false AND false` is false

In many programming languages, `AND` is written as `&&`, so:

* `true && true` is true
* `true && false` is false
* `false && true` is false
* `false && false` is false

### OR

`OR` is an option between two values. It's true if either value is true.

* `true OR true` is true
* `true OR false` is true
* `false OR true` is true
* `false OR false` is false

In many programming languages, `OR` is written as `||`, so:

* `true || true` is true
* `true || false` is true
* `false || true` is true
* `false || false` is false

### NOT

`NOT` is a negation of one value. It's the opposite of whatever the value is.

* `NOT true` is false
* `NOT false` is true

In many programming languages, `NOT` is written as `!`, so:

* `!true` is false
* `!false` is true

### Logic Expressions

These three operators can be grouped together with `()` and combined to make logic expressions:

```
(true AND false) OR (true OR NOT true) = true
```

This simplifies to:

```
false OR (true OR false) = true
```

Then:

```
false OR true = true
```

Then:

```
true = true
```

This could also be written as:

```
(true && false) || (true || !true) = true
false || (true || false) = true
false || true = true
true = true
```

## Truthy and Falsy

In programming, the only values that are true and false are `true` and `false`. Many other values can be truthy or falsy; when used in boolean logic, they are treated as either true or false.

For example, in JavaScript:

* `false` is falsy, `true` is truthy
* An empty string (`""`) is falsy, every other string string is truthy
* `0` is falsy, every other number is truthy
* Every object (`{}`) and array (`[]`) is truthy, even if it's empty
* `null` and `undefined` are always falsy

So:

```
(true && false) || (true || !true) = true
```

And:

```
(1 && null) || ("hi" || !{ someProperty: false}) = true
```

Are effectively the same statement because:

* `1` is a non-zero number, so it's truthy
* `null` is always falsy
* `"hi"` is a non-empty string, so it's truthy
* `{ someProperty: false }` is an object, so it's truthy

## Additional Resources

| Resource | Description |
| --- | --- |
| [JavaScript Tutorial: `AND`, `OR`, and `NOT`](https://en.wikipedia.org/wiki/Boolean_algebra) | Wikipedia's article on Boolean Algebra |
| [MDN: Boolean](https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion) | MDN's guide to booleans |
| [Wikipedia: Boolean Data Type](https://en.wikipedia.org/wiki/Boolean_data_type) | Wikipedia's guide to the boolean data type |
| [MDN: Logical OR](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR) | MDN's guide to `OR`|
| [MDN: Logical AND](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) | MDN's guide to `AND`|
| [MDN: Logical NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT) | MDN's guide to `NOT`|
| [MDN: Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) | MDN's guide to truthy values |
| [MDN: Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) | MDN's guide to falsy values |
| [MDN: Type Conversion](https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion) | MDN's guide to type conversion |
| [Wikipedia: Boolean Algebra](https://en.wikipedia.org/wiki/Boolean_algebra) | Wikipedia's article on Boolean Algebra |
| [Video: Boolean Logic](https://www.youtube.com/watch?v=udOU0gagZqg) | Programming With Anthony's guide to Boolean logic |
Boolean Logic
Boolean
Boolean Operator
Boolean `AND`
Boolean `OR`
Boolean `NOT`
`&&`
`||`
`!`
Logic Expression
`true`
`false`
Truthy
Falsy
Identify what's wrong with the following code:

```js
if (phoneNumber.length = 10){
  // Code to run if true
}
```

---

Reverse the order of these so that the ideal case is last:

```js
if (phoneNumber.length === 10){
  console.log("Calling you now!")
} else {
  console.log("Please enter a 10 digit phone_number.")
}
```
* What kind of data is given to an `if` statement?
* What does the expression passed to an `if` statement determine?
* How do you specify an alternative to run if the expression passed to `if` statement is false?
* Can you have more than one alternative in an `if` statement?
* How do you specify multiple alternatives in an `if` statement?
# Programming: Conditional Logic

One of the fundamental things every programming language must do is selection, or running different code in different circumstances.

## `if`

`if` is the most basic form of conditional logic. If an expression given to `if` is `true` or truthy, the code in the `if` block runs:

```js
if (true){
  console.log("This will always print")
}
```

If its `false` or falsy, it won't run:

```js
if (false){
  console.log("This will never print")
}
```

The power in conditional logic comes from combining them with Boolean expressions:

```js
const zipCode = "802394"
if (zipCode.length !== 5){
  console.log("Please enter a 5 digit ZIP code.")
}
```

## `else`

If an `if` condition is false, you can specify an alternate behavior with `else`:

```js
if (zipCode.length === 5){
  console.log("Your shipping estimate is being calculated now.")
} else {
  console.log("Please enter a 5 digit ZIP code.")
}
```

You can always be sure that one of the two blocks will run.

## `else if`

You can also specify multiple conditions with `else if`:

```js
if (zipCode.length === 5){
  console.log("Your general shipping estimate is being calculated now.")
} else if (zipCode.length === 10){
  console.log("Your specific shipping estimate is being calculated now.")
} else {
  console.log("Please enter a 5 or 9 digit ZIP code.")
}
```

## Watch Out!

The most common mistake when using comparisons in conditional logic is to mix up the assignment operator `=` with the comparison operator `===`. The result of an assignment in JavaScript is the falsy value `undefined`, so this will never run:

```js
const zipCode = "80239"
if (zipCode.length = 5){
  console.log("No chance")
}
```

---

If you reverse the condition of an `if` statement you can reorder the blocks. These are the same:

```js
if (zipCode.length === 5){
  console.log("Your shipping estimate is being calculated now.")
} else {
  console.log("Please enter a 5 digit ZIP code.")
}

if (zipCode.length !== 5){
  console.log("Please enter a 5 digit ZIP code.")
} else {
  console.log("Your shipping estimate is being calculated now.")
}
```

In general, it's easier to read negative cases first and the ideal case last.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Video: JavaScript If/Else Tutorial](https://www.youtube.com/watch?v=IsG4Xd6LlsM) | Programming With Mosh's guide to If/Else |
Conditional Logic
`if`
`true`
`false`
Boolean
Truthy
Falsy
Boolean expressions
Block
`else if`
Assignment Operator
Condition
Negative Case
# Programming: Data Types 2: Arrays and Objects

Two data types in JavaScript are more complex than strings, booleans, and numbers: Arrays and Objects.

## Arrays

An array is a list of items. Rather than keep related items in separate variables:

```js
const name1 = "Alice"
const name2 = "Bill"
const name3 = "Carol"
```

You can put them in one array:

```js
const names = ["Alice", "Bill", "Carol"]
```

This makes it easy to do something to every item in the array while still having access to individual items:

```js
for (name of names){
  console.log(name) // Prints "Alice", then "Bill", then "Carol"
}
```

Individual items are accessed by their position in the array, which is called an index. Counter-intuitively, indexes start at 0 rather than 1:

```js
console.log(name[0]) // Prints "Alice"
console.log(name[1]) // Prints "Bill"
console.log(name[2]) // Prints "Carol"
console.log(name[3]) // Error, no such index
```

You can add a new item to the end of an array with `.push` and take it off of the end with `.pop`:

```js
names.push("Dave")
console.log(name[3]) // Prints "Dave"
names.pop()
console.log(name[3]) // Error, no such index
```

## Objects

Objects are a way to collect related attributes of something in one place. So instead of:

```js
const firstName = "Alice"
const lastName = "Coltrane"
const email = "alice.coltrane@jazz.com"
```

You can have:

```js
const alice = {
  firstName: "Alice",
  lastName: "Coltrane",
  email: "alice.coltrane@jazz.com",
}

console.log(alice.firstName) // Prints "Alice"
console.log(alice.lastName) // Prints "Coltrane"
console.log(alice.email) // Prints "alice.coltrane@jazz.com"
```

Objects are made up of keys and values. Keys are always strings, but values can be any legal JavaScript value, including strings, numbers, booleans, arrays, functions, and even other objects. Access values in objects by their keys:

```js
const alice = {
  firstName: "Alice",
  lastName: "Coltrane",
  email: "alice.coltrane@jazz.com",
  instruments: ["piano", "harp"],
  birthplace: {
    city: "Detroit",
    state: "Michigan",
  },
  play: function(song){
    console.log(`I'm playing ${song}`)
  }
}

console.log(alice.firstName)                // Prints "Alice"
for (let instrument of alice.instruments){
  console.log(instrument)                   // Prints "piano", then "harp"
}
console.log(alice.birthplace.city)          // Prints "Detroit"
console.log(alice.birthplace.state)         // Prints "Michigan"
console.log(alice.play("Blue Nile"))        // Prints "I'm playing Blue Nile"
```

## Arrays of Objects

One of the most common data patterns in programming is arrays of objects:

```js
const albums = [{
  id: 1,
  artist: "Alice Coltrane",
  album: "A Monastic Trio",
  year: 1968,
},{
  id: 2,
  artist: "Alice Coltrane",
  album: "Universal Consciousness",
  year: 1971,
},{
  id: 3,
  artist: "Alice Coltrane",
  album: "Turiya Sings",
  year: 1982,
}]
```

```js
const users = [{
  id: 1,
  username: "alicecoltrane",
  passwordHash: "h4fas3JiPa",
},{
  id: 2,
  username: "billevans",
  passwordHash: "we5xaCa9bm",
},{
  id: 3,
  username: "carolkaye",
  passwordHash: "3xgmasdfu8",
}]
```

```js
const songs = [{
  id: 1,
  artist: "Alice Coltrane",
  title: "Blue Nile",
  duration: 420, // 7 minutes in seconds
},{
  id: 2,
  artist: "Alice Coltrane",
  title: "Om Supreme",
  duration: 569, // 9:29 in seconds
},{
  id: 3,
  artist: "Alice Coltrane",
  title: "Spiritual Eternal",
  duration: 178, // 2:58 in seconds
}]
```

This combination of data types allows you to build and work with collections that can represent almost any type of real-world data.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | MDN's guide to arrays |
| [Modern JavaScript Tutorial: Arrays](https://javascript.info/array) | Modern JavaScript Tutorial's article on arrays |
| [Video: Objects and Arrays in JS](https://www.youtube.com/watch?v=FLGzeTHAbqQ) | Programming with Avelx's guide to objects and arrays |
Data Type
String
Boolean
Number
Array
Index
Object
Object Key
Object Value
# Programming: Data Types

Any piece of data in programming has two characteristics: A value and a type.

* `5` - The value is 5 and the type is number
* `"5"` - The value is 5 and the type is string
* `true` - The value is true and the type is boolean

## Common Data Types

There are three basic data types in JavaScript:

### Strings

A string is a collection of characters:

* `"Hello, world!"`
* `"H"`
* `"500"`
* `"true"`
* `"false"`
* `"0"`
* `""`
* `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`
* The entire text of the novel _The Great Gatsby_ by F. Scott Fitzgerald

Strings can be short, long, or even empty, and they can contain any characters or words. The easiest way to tell if something is a string is to look for surrounding quotes.

#### Escape Characters and Sequences

How do you make a string with quotation marks in it?

```js
const message = "This is Jill's message: "See you at 8!""
```

If you try to run this as written, you'll end up with:

* The string `"This is Jill's message: "`
* The JavaScript `See you at 8!`, which will likely cause an error immediately because `See` is not a valid JavaScript command
* The string `""`

The solution is to use an escape character:

```js
const message = "This is Jill's message: \"See you at 8!\""
```

In many languages, `\` functions as an escape character in strings. When you put the `\` in front of a character that might otherwise have a special meaning, it removes the special meaning and becomes a normal character again. You escape the escape character by repeating it: `\\` will display as `\`.

The escape character is also used in escape sequences:

```
const message = "Dear Beverly,\n\nI hope this letter finds you well.\nIt has been many days and nights since our last communication,"
```

The `\n` character is an escape sequence that creates a new line. The above string will print like this:

```
Dear Beverly,

I hope this letter finds you well.
It has been many days and nights since our last communication,
```

#### Quotes

In JavaScript, it doesn't matter if you use single quotes `'` or double quotes `"`.

```js
const someString = "This is a string with double quotes"
const anotherString = 'This is a string with single quotes.'
```

If you use double quotes for strings, you'll get free apostrophes but need to escape quotation marks:

```js
const message = "This is Jill's message"
const message = "This is Jill's message: \""See you at 8!\""
```

If you use single quotes for strings, you'll get free quotation marks but need to escape apostrophes:

```js
const message = 'This is Jill\'s message: "See you at 8!"'
const message = 'This is Jill\'s message'
```

### Numbers

Numbers are things you can do math with. All of these are numbers:

* `1`
* `0`
* `-1`
* `6.0`
* `13453834`
* `-2342.2342`

Any number value can be either a number type or a string type. For example, `5` is the value 5 with the type number, while `"5"` is the value 5 with the type string. Which type you use for a number depends on what kinds of operations you want to do. If you could conceivably do math with the value, such as an age, it should be a number type. If you're displaying or formatting a value or if the numbers aren't used for math *(such as a phone or social security number), the value is a string.

### Booleans

Booleans are either `true` or `false`. They get used in Boolean logic, such as indicating whether an option or checkbox has been selected or storing whether some condition has been met.

## Type Operations

One of the features of types is they dictate what kinds of operations can be performed on the values.

* Get the number of characters in a string by calling `.length`; `"Hello!".length` is `6`
* Perform math operations on numbers; `9 / 3` is `3`, `3 * 4` is 12, and so on.
* Perform Boolean operations and comparisons on booleans; `true || false` is `true`, `6 >= 10` is `false`

## Type Coercion

Type coercion is keeping the value of a piece of data but changing the type:

* **`+`**: To coerce a boolean or string into a number, put a `+` in front of it:
  * `+"5"` is `5`
  * `+true` is `1`
  * `+false` is `0`
* **``${}``**: To coerce a number or boolean into a string, wrap it with ``${}``:
  * ``${1234}`` is "1234"
  * ``${false}`` is `"false"`
* **`!!`**: To coerce a string or number into a boolean, put `!!` in front of it:
  * `!!"Hello, world!"` is `true`
  * `!!0"` is `false`

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: JavaScript Data Types and Data Structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) | MDN's guide to JS Data types |
| [Modern JavaScript Tutorial: JavaScript Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) | MDN's guide to JS Data types |
| [Video: JavaScript Variables and Data Types](https://www.youtube.com/watch?v=edlFjlzxkSI) | Dev Ed's guide to types in JS |
Data Type
Data Value
Number
String
Boolean
Escape Character
Escape Sequence
Type Coercion
What do the following expressions evaluate to?

* `6 - 4`
* `2 + 4 * 3`
* `true`
* `!42`
* `"Ahoy".length`
* `[2, 4, 6, 8].includes(three)`
* What is an expression?
* Are values expressions? Why or why not?
# Programming: Expressions

Different data types contain different kinds of values:

* **Strings**: "Hello, world!", "true", "50", ""
* **Booleans**: true, false
* **Numbers**: -1, 0, 50, 3.42

An _expression_ is something that evaluates to a value. For example, the `.length` property of a string evaluates to a number:

```js
"Hello, world!".length // 13
```

What's powerful about expressions is you can use an expression and the value it evaluates to interchangeably. If you have a function that needs a number:

```js
function isGreaterThan10(number){
  return number > 10
}
```

You can call that function with a number:

```js
isGreaterThan10(13) // true
```

Or you can call it with any expression that evaluates to a number:

```js
const helloWorld = "Hello, world!"
isGreaterThan10(helloWorld.length) // true
```

Some examples of expressions:

* `1 + 5` is the same as `6`
* `6 + 8 * 42` is the same as `342`
* `4` is the same as `4`. Even though `4` is a simple value, it also technically evaluates to that value so it counts as an expression.
* `!someTruthyValue` is the same as `false`
* `theNumberTen / theNumberFive` is the same as `2`
* `[2, 4].includes(four)` is the same as `true`

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators) | MDN's guide to expressions |
| [MDN: Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators) | MDN's reference for expressions |
| [Video: Expressions vs. Statements in Code](https://www.youtube.com/watch?v=WVyCrI1cHi8) | Codexpanse's guide to expressions and statements |
Expression
String
Boolean
Number
Object Property
Value
Consider the following function:

```js
function reverseWords(string){
  let reverse = []
  let words = string.split(" ")
  words = words.reverse()

  for (word in words){
    reverse.push(word.reverse())
  }
  return reverse.join(" ")
}
```

* What's the name of the function?
* What data type is the return value?
* What parameters does this function have?
* What are functions for?
* What is the relationship between functions and programs?
* What is a function parameter?
* What is a function argument?
* Distinguish between function parameters and arguments.
* What is calling a function?
* What is the return value of a function?
* What is the body of a function?
* What's the difference between logging something and returning something in a function?
* What is invoking a function?
# Programming: Functions

Functions do two things:

* Make a set of code easier to reuse and repeat
* Transform inputs into an output

The second item should sound familiar because it's also what a program does. This is not a coincidence. In the process of transforming inputs into outputs, the problem may be split into smaller pieces:

![Diagram of functions inside a program](assets/functions.png)

You can think of many programs as being made up of smaller and smaller programs. For example, a function that title-cases a string:

```js
titleCase("hello, world!") // "Hello, World!"
```

The implementation of `titleCase` might use a function that splits a string into words, and another function that capitalizes the first letter:

```js
function splitIntoWords(someString){
  return someString.split(" ")
}

function capitalizeFirstLetter(word){
  const firstLetter = word[0]
  const capitalizedFirstLetter = firstLetter.toUpperCase()
  const restOfWord = word.slice(1)

  return capitalizedFirstLetter + restOfWord
}

function titleCase(someString){
  const words = splitIntoWords(someString)
  let capitalizedWords = []

  for (let word in words){
    const titleCasedWord = capitalizeFirstLetter(word)
    capitalizedWords.push(titleCasedWord)
  }

  const titleCasedString = capitalizedWords.join("")

  return titleCasedString
}

titleCase("hello, world!") // "Hello, World!"
```

This feature of functions lets you decompose big problems into small ones and reuse more of your work.

## Declaring functions

There are several ways to create a function in JavaScript, but the simplest follows this pattern:

```js
function nameOfFunctionGoesHere(parameters, go, here){
  // Body of the function goes here
  return "return value goes here"
}
```

* **`function`**: The `function` keyword identifies the code that comes after it as a function definition.
* **`nameOfFunctionGoesHere`**: This is the name of the function, and it's how the function will be referred to by other code.
* **`(parameters, go, here)`**: These are function parameters, which are variables given to the function when it's called. They're available throughout the body of the function.
* **`{}`**: This is the body of the function, and it holds the code that will run whenever the function is called.
* **`return`**: Any expression that follows the `return` keyword will be what a called function will evaluate to.

For example, in the `capitalizeFirstLetter` function:

```js
function capitalizeFirstLetter(word){
  const firstLetter = word[0]
  const capitalizedFirstLetter = firstLetter.toUpperCase()
  const restOfWord = word.slice(1)

  return capitalizedFirstLetter + restOfWord
}
```

1. The function is called `capitalizeFirstLetter`
2. It takes a single parameter called `word` that will be available throughout the function body
3. The function body has 4 statements that that uppercase the first letter of a word
4. The function returns the word with the first letter capitalized

When the function is called with a string, it will evaluate to the word with the first letter capitalized.

```js
const greeting = capitalizeFirstLetter("hi!")
const status = capitalizeFirstLetter("warning")
const message = capitalize("wait")

console.log(greeting, status, message) // "Hi!", "Warning", "Wait"
```

## Calling Functions

Calling, also called invoking, running, or executing, a function means telling it to execute the code inside of it.

```js
// This defines the function

function sayHelloWorld(){
  console.log("Hello, world!")
}

// This calls the function 3 times
sayHelloWorld() // prints "Hello, world!" to the screen
sayHelloWorld() // prints "Hello, world!" to the screen
sayHelloWorld() // prints "Hello, world!" to the screen
```

You can also call a function with a value that can be used inside the function:

```js
function saySomething(message){
  console.log("Hello, " + message)
}

saySomething("Frank") // Prints "Hello, Frank" to the screen
saySomething("Mabel") // Prints "Hello, Mabel" to the screen
```

In this example, `message` is a parameter of the function, and `"Frank"` and `"Mabel"` are arguments to the function.

## Return values

Functions often, but don't have, to return a value.

```js
function getCompanyName(){
  return "Apple"
}

const companyName = getCompanyName()
console.log(companyName) // "Apple"
```

The return value of a function is what function will evaluate to when called. For example, since the `getCompanyName` function has a return value of "Company Name Here", you can use `getCompanyNameHere()` anywhere you want to use that string:

```js
console.log("Congratulations on your first day at " + getCompanyNameHere())
```

## Parameters and Arguments

### Parameters

The variables at the top of a function definition are called parameters:

```js
function double(number){
  return number * 2
}
```

In this example, `number` is a parameter. You can pass more than one parameter into a function by separating them with commas:

```js
function add(number1, number2){
  return number1 + number2
}
```

In this example, `number1` and `number2` are parameters.

### Arguments

When you call a function, you give it arguments:

```js
double(someNumber)
add(someNumber, 5)
```

In this example, `someNumber` and 5 are both arguments. You can think of parameters as a placeholder for the _theoretical_ way something could be used in a function and arguments as the _actual_ way something will be used.

## Watch Out!

Returning a value from a function does not output anything to the screen. This program doesn't output anything:

```js
function getName(){
  return "Kevin"
}
getName()
```

To output something to the screen, you'd have to use `console.log`. You could either do that this way:

```js
function printName(){
  console.log("Kevin")
}
printName()
```

Or this way:

```js
function getName(){
  return "Kevin"
}
console.log(getName())
```

The advantage of the second way is that by separating out getting the name from printing the name, you can use the `getName` function for other things like building another string.

---

It's easy to confuse returning a value from a function with printing something to the screen. This returns:

```js
function getGreeting(){
  return "Hi, how are you today?"
}
```

This prints something to the screen:

```js
function printGreeting(){
  console.log("Hi, how are you today?")
}
```

This difference becomes apparent when you save the result of a function call into a variable:

```js
const greeting = getGreeting()
const nothing = printGreeting()

console.log(greeting) // "Hi, how are you today?"
console.log(nothing) // Undefined
```

`greeting` is equal to `"Hi, how are you today?"` because that's what the `getGreeting` function returns when its called. The `printGreeting` function doesn't return anything.


## Additional Resources

| Resource | Description |
| --- | --- |
| [Video: JavaScript Functions](https://www.youtube.com/watch?v=N8ap4k_1QEQ) | Programming With Mosh's guide to functions |
Function
Program
String
Decomposition
Function Parameter
Return Statement
Evaluation
Function Body
Function Call
Function Invocation
Function Argument
Function Definition
Variable
`console.log`
You have this code:

```js
function (string){
  let reverse = []
  let words = string.split(" ")
  words = words.reverse()

  for (word in words){
    reverse.push(word.reverse())
  }
  return reverse.join(" ")
}
```

When you run it, you get an error saying that `string.split is not a function`. Strings definitely have a `.split` method. How can you use `console.log` to debug your program?
* Describe 3 examples of inputs in programming
* Describe 3 examples of outputs in programming
* How do you print something to the console in JavaScript?
* How do you open the console in a browser?
* How do you output multiple expressions to the console in JavaScript?
# Programming: Input and Output

Programming is about transforming inputs into outputs. How do you collect inputs and generate outputs?

## Input

There are a many ways to collect input:

* In a CLI program, input comes from flags, arguments, and the contents of other files
* In a web program, input comes from forms and user interactions
* In a data API program, input comes from HTTP requests
* In a hardware program, input comes from either passive sensors on the device or user interactions

## Output

There are also many ways to generate output:

* In a CLI program, the output is printed to the terminal
* In a web program, the output is rendered to the screen or sent to a server as an HTTP request
* In a data API program, the output is an HTTP response
* In a hardware program, the output is some visualization or change in behavior of the device

## Logging in JavaScript

The easiest way to output to the screen with JavaScript is with `console.log`:

```js
const message = "Hello, world!"
console.log(message) // Prints "Hello, world!" to the screen
```

To open up the console in a browser:

* Mac: ⌘ + ⇧ + `j`
* Windows and Linux: `Control` + ⇧ + `j`

This is where anything passed to `console.log` will be shown.

Note that you can also pass multiple things to `console.log` separated by commas:

```js
const one = 1
const two = 2
const three = 3
console.log(one, two, three) // Prints "1, 2, 3" to the screen
```

Logging is a great tool for inspecting the value of different variables and expressions at different points in a program's execution. For example:

```js
let message = "hello, world!"
message = titleCase(message)

console.log(message)

renderToPage(message)
```

This `console.log` can help inspect `message` if what's rendering on the page isn't what you expect.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Geeks For Geeks: `console.log` with Examples](https://www.geeksforgeeks.org/javascript-console-log-with-examples/) | Geeks for geeks' guide to `console.log` |
Program Input
Program Output
`console.log`
Logging
# Introduction to Programming

Programming is fundamentally about turning inputs into outputs.

![Inputs going into a program and turning into outputs](assets/programming-1.png)

In a social media app, the inputs might be your posts, your comments, and names or topics you want to read. The outputs might be other people's posts and comments.

![Social media inputs going into a program and turning into outputs](assets/programming-2.png)

In scientific programming, the inputs might be each occurrence of an event, and the output might be a statistical summary of the events.

![Scientific inputs going into a program and turning into outputs](assets/programming-3.png)

In television programming, the inputs might be button presses on a remote control, and the output might be streams of TV shows on the screen.

![TV inputs going into a program and turning into outputs](assets/programming-4.png)

In each case, a program transforms some kind of inputs into some kind of outputs.

## Elements of Programming

It may surprise you to learn that almost all programming is based on a relatively small set of concepts. The complexity in programming isn't based on a large number of ideas, but rather the near-limitless ways they can be explored and combined. The three most basic elements of programming are sequence, selection, and iteration. This three ideas form the building blocks of everything from the tiniest programming exercise to sprawling enterprise software. 

### Sequence

Sequence is controlling the order your code executes in. If you print 4 things to the screen in order, you're using the idea of sequence:

```js
console.log("You put your right foot in")
console.log("You put your right foot out")
console.log("You put your right foot in (again)")
console.log("You shake it all about")
```

Programs can also be a tangle of redirections where the sequence isn't immediately clear. This program does the same thing:

```js
const hokeyPokey = () => console.log("You shake it all about")
console.log("You put your right foot in")
fetch("https://api.hokey-pokey.com")
  .then(parseJSON)
  .then(result => {
    console.log("You put your right foot in (again)")
    hokeyPokey()
  })

function parseJSON(response){
  console.log("You put your right foot out")
  return response.json()
}
```

Even simple ideas in programming can have a lot of depth and nuance.

### Selection

Another core element of programming is selection, which is only running parts of the program under certain circumstances. At its simplest, selection looks like this:

```js
if (television.isOn){
  westWorld.show()
}
```

However, this is also selection:

```js
if(television.isOn, () => {
  channels[currentChannel].show()
}, () => {
  switch(default){
    case "ABC":
      return true
      break
    case "CBS":
      return true
      break
    case "NBC":
      return true
      break
    default:
      return false
  }
})
```

Like sequence, selection can have a lot of complexity.

### Iteration

The last core element of programming is iteration, or looping. Often, you want to do the same operation multiple times. For example, you might want to print every video in a list of videos:

```js
for (video in videos){
  console.log(video)
}
```

Just like sequence and selection, however, iteration can become very complex. This code is also a series of iterations over a list of videos:

```js
function filterIds(){
    return this.videos
        .filter(video => {
            const searchStrings = [ video.label ]
            if (video.tags){
                searchStrings.push(...video.tags.map(tag => tag.label))
            }
            return searchStrings
                .map(searchString => searchString.toLowerCase())
                .map(searchString => this.removeSpaces(searchString))
                .some(searchString => searchString.includes(
                    this.removeSpaces(this.searchTerm.toLowerCase())
                ))
        }).map(video => video.id)
}
```

## Programming Languages

Sequence, selection, and iteration are in just about every programming language, often even in similar ways. For example, all of these programs do the same thing:

```js
// JavaScript
for (item in list){
  console.log(item)
}
```

```java
// Java
for (str item : list){
  System.out.println(item)
}
```

```python
# Python
for item in list
  print(item)
```

```ruby
# Ruby
for item in list
  print item
end
```

Different programming languages encourage thinking about programs in particular ways and have different tradeoffs regarding speed, readability, ease of learning, and types of tasks they were designed for. These examples and exercises are given in JavaScript, but ultimately different programming languages have more in common than they don't. The skills learned in one language tends to not only transfer to other languages, but may even enrich your understanding and abilities in that language as well.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Video: Sequences, Selections, and Loops](https://www.youtube.com/watch?v=eSYeHlwDCNA) | GCFLearnFree.org's guide to sequence, selection, and iteration |
| [SheCodes: JavaScript Cheatsheet](https://www.frontendcheatsheets.com/javascript) | SheCode's searchable JavaScript reference |
Programming
Program Inputs
Program Outputs
Program
Programming: Sequence
Programming: Selection
Programming: Iteration
Looping
What do the following programs print to the screen?

```js
const numbers = [2, 4, 6, 8]
let product = 1

for (let number of numbers){
  product = product * number
}

console.log(product)
```

```js
const words = ["Excellent", "weather", "we're", "having", "today"]
let string = ""

for (let word of words){
  string = `${string} ${word}`
}

console.log(`${string}!`)
```

```js
const users = [{
  id: 1,
  username: "milesdavis"
},{
  id: 2,
  username: "johncoltrane"
},{
  id: 3,
  username: "billevans"
}]
const ids = []

for (let user of users){
  ids.push(user.id)  
}

console.log(ids)
```
* What is iteration?
* What is the first thing given to a `for...of` loop in JavaScript?
* What is the second thing given to a `for...of` loop in JavaScript?
# Programming: Iteration

Another thing that programming languages has to be able to do is do an operation repeatedly, or iteration. There are a lot of ways to do this, but the simplest in JavaScript is `for..of` loops.

## `for..of` Loops

You can do something for every item in an array with a `for...of` loop:

```js
const numbers = [1, 2, 3, 4, 5]
for (const number of numbers){
  console.log(number)
}
// Prints 1, 2, 3, 4, then 5 to the screen
```

In a `for..of` loop, you pick a variable name to represent each item in the array. This variable will be available inside the block. You can name it anything you want, but it's typical for an array to be plural and the item to be singular.

```js
for (const user of users){
}
for (const word of words){
}
for (const pokemon of pokemonList){ // Good for uncountable words
}
```

## Watch Out!

* Make sure you get the order right: the first thing in the parentheses is the variable for each item, the second thing is the array to loop over.
* If you declare a variable inside of the block of a `for..of` loop, that variable will be reset for every item and won't be available outside the block. If there's a counter that needs to change for every item, it needs to be declared outside the block. For example, if you declare it outside the block:

```js
const numbers = [1, 2, 3, 4, 5]

for (const number of numbers){
  let sum = 0
  sum = sum + number
}

console.log(sum) // undefined, sum is not in scope
```

```js
const numbers = [1, 2, 3, 4, 5]
let sum = 0

for (const number of numbers){
  sum = sum + number
}

console.log(sum) // 15
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [How to Use Iterators in JavaScript](https://www.youtube.com/watch?v=2oU-DfdWM0c) | How to use iterators in JavaScript |
Programming: Iteration
JavaScript: `for..of`
Variable
Array
Block
Evaluate these expressions:

```js
9 % 2
9 % 3
23 % 7
5 % 2
```
* What's wrong with the JavaScript statement `const nine = 3 x 3`?
* Is the JavaScript expression `const four = 10 - 2 - 4` valid?
* How would you write "4 to the 10th power" in JavaScript?
* What does the JavaScript expression `"1" + "2"` evaluate to?
* What is the purpose of the modulo operator?
# Programming: Math

Most of the math operators commonly used in programming are self-explanatory:

```js
1 + 1 // 2
2 - 1 // 1
3 * 3 // 9
4 / 2 // 2
```

Note that multiplication is done with the `*` symbol, not `x`.

There are two additional math symbols that are common in programming and bear more explanation: Exponentiation and modulo.

## Exponentiation

To raise something to an exponent, use `**` twice. So, `2³` would be written:

```js
2**3 === 8 // true
```

## Modulo

`%`, the modulo operator, evaluates to the remainder in a division. For example, 4 does not divide into 3 evenly; it leaves a remainder of 1. So, `4 % 3` is 1. Some other examples:

```js
4 % 2 === 0
8 % 3 === 2
7 % 7 === 0
3 % 2 === 1
```

Modulo has a few uses, but the most common one is telling whether something is even/odd, doing something every third item, and so on.

```js
const someNumber = 42

if (someNumber % 2 === 0){ // An even number is one that divides evenly into 2
  console.log("It's even!")
} else {
  console.log("It's odd!")
}
```

## Watch Out!

You can only do math with values with a number data type. This also means you can't do math with strings that look like numbers, like `"3" + "2"`.
Operator
Exponentiation
Modulo
In this code:

```js
const a = "a"

if (true){
  const b = "b"

  if (true){
    const c = "c"
  }

  const d = "d"
}

const e = "e"
```

* Which variables are in scope when `a` is assigned?
* Which variables are in scope when `b` is assigned?
* Which variables are in scope when `c` is assigned?
* Which variables are in scope when `d` is assigned?
* Which variables are in scope when `e` is assigned?
* What symbols are used to indicate blocks in JavaScript?
* What control structures in JavaScript use blocks?
* Can outer scopes see inner scopes?
* Can inner scopes see outer scopes?
* What does it mean for something to be in a shared scope?
* How can you tell whether something is a block or an object?
## Programming: Variable Scoping

You may wonder why you can't just make everything a variable in the highest scope so that it can be seen by every other scope. As a program grows, the distance between where a variable is defined and where it's used will continue to grow until it becomes very difficult to tell where different variables are used. When can you be confident you can get safely get rid of a variable? How can you control which parts of the program are allowed to see or change variables? How can you be confident no one else wrote a something that unexpectedly changed a variable?

The solution is to keep where a variable is defined as close to where it's used as possible. This communicates the purpose of the variable better, prevents the wrong part of the code from accidentally changing it, and allows you to reuse names in different scopes.

## Block Scope

In JavaScript, a scope is created with blocks, which are formed by the `{}` characters next to control structures like `if` and `for`:

```js
if (){
  // This is a block
} else if (){
  // This is a block
} else {
  // This is a block
}

for (){
  // This is a block
}

function(){
  // This is a block
}
```

With block scoping, you can see out of the scope but you can't see in. So this works:

```js
const someVariable = "Hi!"
if (true){
  console.log(someVariable) // "Hi!"
}
```

But this doesn't:

```js
if (true){
  const someVariable = "Hi!"
}
console.log(someVariable) // Undefined
```

A scope can see out through many levels:

```js
const a = "a"

if (true){
  const b = "b"

  if (true){
    const c = "c"

    console.log(a, b, c) // "a", "b", "c"
  }
}
```

## Sharing Scopes

If a variable needs to be used in more than one scope, it should be in a shared scope:

```js
const name = "Clifford"

if (name){
  console.log(name)
}

for (let index = 0; i < name.length; i++){
  console.log(name[i])
}
```

## Watch Out!

* Blocks use a similar syntax to objects in JavaScript. Blocks are specifically attached to keywords like `if`, `else`, `else if`, `for`, and `function`.
* Variables in modern JavaScript are all block scoped. Formerly, they were scoped only to functions. This kind of scoping was done with the `var` keyword in older JavaScript code.

## Additional Resources

| Resource | Description |
| --- | --- |
| [JavaScript Scope: Local vs. Global](https://www.youtube.com/watch?v=iJKkZA215tQ) | Programming With Mosh's Guide to Scope |
Variable
Scope
Program
Block
Block Scope
Shared Scope
JavaScript: `var`
What are the 4 parts of this JavaScript statement?

```js
let age = 31
```
* What are the two variable keywords in JavaScript?
* What's the difference between the two variable keywords in JavaScript?
* What is the assignment operator?
* How do you copy a variable?
* Why do you have to declare a variable before you use it?
# Programming: Variables

A variable assignment statement is made of a few parts:

```js
const firstName = "Erin"
```

* **`const`**: This is the variable keyword, either `let` or `const`.
* **`firstName`**: This is the name of the variable. You get to pick this. It's how this variable will be referred to throughout the program.
* **`=`**: This is the assignment operator. It's important to note that this is the only use of this symbol in JavaScript. It does say that two things are equal (that's `===`) like it does in math, but rather that the variable name should be given the value.
* **`"Erin"`**: This is the value that will be given to the variable name.

## Variable Keywords

Despite the name, most variables don't change once they're set. Use `const` to represent these.

```js
const pi = 3.14159
```

Sometimes, a variable has one value at one point in time, and a different value at a later point in time. Use `let` to represent these.

```js
let name = "Saul"
name = "Paul"
```

## Variable Names

Variable names should be succinct and descriptive. Some guidelines:

* Use complete words. Your code doesn't run faster, look more professional, or take appreciably less time to type if you abbreviate words ("prgrmmrAbbrevs"), use nonsense words ("foo"), or use single letters ("x"). It just makes them harder to read, pronounce, and remember.
* Don't include the type in the name. Call a name `name`, not `nameString` or `nameStr`.

## Variable Values

Variables can contain any value, and variables declared with `const` always need an initial value. Variables declared with `let` may have optionally have an initial value.

To change a variable, reference it by name and use the assignment operator:

```js
let someNumber = 1
console.log(someNumber) // Prints "1" to the screen

someNumber = 2
console.log(someNumber) // Prints "2" to the screen
```

## Copying Variables

If you assign a string, number, or boolean to a variable and make a copy of that variable, you will make separate copy of that value.

```js
let a = 1
let b = a
b = 2

console.log(a, b) // Prints "1, 2" to the screen
```

## Watch Out!

* You need to declare a variable before you can use it.
* `let` and `const` are needed to declare variables, but they're not needed for reassigning the value of a variable.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Storing the information you need](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables) | MDN's tutorial on variables |
Variable
JavaScript: `const`
JavaScript: `let`
Variable Name
Assignment Operator
Value
Initial Value
String
Number
Boolean
`console.log`
Variable Declaration
Variable Reassignment
Write the JavaScript to log this `lastName` parameter in this URL: `https://example.com/users?firstName=Bill&lastName=Evans`
* What are query strings used for?
* What does it mean for the web to be "stateless"?
* How do you access the current URL in JavaScript?
* How do you access the query string in JavaScript?
* How do you access individual key/value pairs in query strings in JavaScript?
* When is it more appropriate to use a query string over a path?
* What is URL encoding?
* Why is URL encoding necessary?
* Are query strings safe for sensitive information? Why or why not?
# Query Strings

URLs are designed to be "stateless", meaning that a URL will load the same web page whether its your first time or your hundredth. Sometimes a URL needs more data than just the path to do this correctly. For example, if you have a search page at `https://website.com/search.html`, how can you bookmark a specific search or share it with someone else?

You add a query string to the URL:

```
website.com/search.html?search_term=cute+puppies
```

Query strings are key-value pairs, just like objects in JavaScript. This object:

```js
const person = {
  firstName: "John",
  lastName: "Coltrane",
  age: 95
}
```

Would look like this in a query string:

```
?firstName=John&lastName=Coltrane&age=95
```

A query string starts with a `?`, keys and values are separated with `=`, and pairs are separated with `&`.

## Query Strings in JavaScript

To access a query string in JavaScript, use the built-in `URLSearchParams` object:

```js
// https://website.com/search.html?search_term=cute+puppies&is_favorite=yes

const queryString = window.location.search
const queryParams = new URLSearchParams(queryString)
console.log(
  queryParams.get("search_term"), // "cute puppies"
  queryParams.get("is_favorite") // "yes"
)
```

## Watch Out!

* Not every character can be used in a URL, and so some strings need to be "encoded" to work in query strings. For example, spaces aren't allowed in URLs, so to include one in a query string we need to either use the `+` character or `%20`. Those characters can be "decoded" back into spaces.
* Anything in a query string can be seen by your router, your ISP, and every computer in between you and the server. It can't be encrypted, and it can be bookmarked and shared. This makes it inappropriate for any kind of sensitive data, such as usernames or passwords.
* There is no theoretical limit to how long a query string can, but browsers have a practical limit of 2000 characters for URLs.
* If you include the same key multiple times, only the last one will be available. You can add `[]` to the key (as in `?favorite[]=milk&favorite[]=cookies` to make them available as an array.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Wikipedia: Query String](https://en.wikipedia.org/wiki/Query_string) | Wikipedia's query string article |
| [MDN: `URLSearchParams`](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) | MDN's reference on `URLSearchParams` |
| [Video: Query Parameters](https://www.youtube.com/watch?v=qv5XK91OhFo) | Udacity's guide to query parameters |
| [Video: `URLSearchParams` in JavaScript](https://www.youtube.com/watch?v=-D5YGTkTBH4) | Dcode's guide to constructing query strings |
Query String
Stateless
URL
Web Page
Key/Value Pair
JavaScript: Object
DOM: `URLSearchParams`
Encoding
Router
ISP
Server
Encryption
Refactor this code to use Context instead of props:

```js
function Outer(){
  const message = "Hello, world!"
  return (
    <Middle message={ message } />
  )
}

function Middle({ message }){
  return (
    <Inner message={ message } />
  )
}

function Inner({ message }){
  return (
    <p>{ message }</p>
  )
}
```

---

Refactor this code to use Context instead of props:

```js
function Outer(){
  const [user, setUser] = useState("Bill")
  const logout = () => setUser("null")

  return (
    <Middle logout={ logout } />
  )
}

function Middle({ logout }){
  return (
    <Inner logout={ logout } />
  )
}

function Inner({ logout }){
  return (
    <button onClick={ logout }>Logout</button>
  )
}
```
* Why is tunneling application state through the component hierarchy useful?
* What is React Context?
* What is the purpose of a Context Provider?
* What does the `useContext` hook do?
* What does `createContext()` return?
* When using React Context, where is the state held?
# Intro to React Context

React's Context API is a tool for tunneling state from one part of an app to another. For example, you can track a logged-in user in the `App` component, and then use a Context Provider and the `useContext` hook to send it to other components. For example, in an app that has a header bar with a user profile in it, you can store the data in the `<App />` component and tunnel it to the `<UserProfile />` component without needing to go through the `<HeaderBar />` component.

```jsx
import { createContext, useState } from "react"
import Avatar from "../assets/miles.jpg"

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: "Miles Davis",
    imageUrl: Avatar,
  })

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}
```

1. A new `UserContext` object is created, as well as exported
2. Some state is declared to track the current user
3. A `UserContext` Provider is wrapped around any children that are given to this component, which makes any of those children able to access this state

```jsx
import { UserContextProvider } from "./contexts/user-context"
import HeaderBar from "./components/HeaderBar"
import "./App.css"

const App = () => {

  return (
    <div className="App">
      <UserContextProvider>
        <HeaderBar />
      </UserContextProvider>
    </div>
  )
}

export default App
```

The context provider component wraps the `<HeaderBar />` component and all its children.

```jsx
import NavBar from "./NavBar"
import UserProfile from "./UserProfile"
import "./HeaderBar.css"

const HeaderBar = () => {
  return (
    <header className="HeaderBar">
      <h1>Star Lucky Coffee</h1>
      <NavBar />
      <UserProfile />
    </header>
  )
}

export default HeaderBar
```

The `<HeaderBar />` component is not given anything as props.

```jsx
import { useContext } from "react"
import { UserContext } from "../contexts/user-context"
import "./UserProfile.css"
import avatar from "../assets/miles.jpg"

const UserProfile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)
  const handleLogout = () => setCurrentUser(null)
  const handleLogin = () => setCurrentUser({
    name: "Miles Davis",
    imageUrl: avatar,
  })

  return (
    <div className="UserProfile">
      {
        currentUser
          ? (
            <>
              <img src={currentUser.imageUrl} alt={`Avatar of ${currentUser.name}`} />
              <button onClick={handleLogout}>Logout</button>
            </>
          )
          : <button onClick={handleLogin}>Login</button>
      }
    </div>
  )
}

export default UserProfile
```

[Play with this code](https://codesandbox.io/s/sad-neumann-rgm1k)

A child of `<HeaderBar />` can import the original context object, pass it into the `useContext` hook, and access anything in the `value` the provider was given. It bypassed the hierarchy entirely, tunneling the state from the context provider to the context consumer.

---

Some key concepts with React Context:

* React Context is not itself a tool for state management; React already has `useState` for that. Rather, Context is a tool for making that state easily available throughout the app.
* The Context provider's `value` property determines what will be available to child components. It can contain anything from a static value to a complex object.
* An app can have an arbitrary number of Context objects and Context providers.
* The Context object itself can be thought of as a reference that connects a `useContext` hook to a specific Context provider.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React: Context](https://reactwithhooks.netlify.app/docs/context.html) | React's complete guide to Context |
| [React Context: Updating state from a nested component](https://reactwithhooks.netlify.app/docs/context.html#updating-context-from-a-nested-component) | Official guide to updating state from a nested component |
| [Video: React State Management Tutorial](https://www.youtube.com/watch?v=35lXWvCuM8o) | Dev Ed's tutorial on the context API |
* React: Context
* Context Provider
* React: `useContext`
* React: `useState`
* Component
* State Management
* Static value
Do all the exercises in the [React DevTools Tutorial](https://react-devtools-tutorial.vercel.app/)
* Which button in the React Dev Tools logs details about a component to the console?
* How do you see which DOM element a React component rendered in the element inspector?
* How do you see the source code for a React component using React Dev Tools?
* Which button in the React Dev Tools allows you to click something on the page to see what component rendered it?
# React Dev Tools: Components

React is an abstraction on top of the DOM. While this abstraction is powerful, it limits the usefulness of the existing DOM-based browser dev tools. For example, how can you see the component hierarchy or examine the state of a component? The React Dev Tools browser extension adds new tabs to your dev tools that allow you to examine components the same you inspect DOM elements in the Element Inspector.

## Installation

React Dev Tools are available for Chrome and Firefox as browser extensions.

* [Chrome Installer](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Firefox Installer](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

You may need to restart your browser or reload pages after installing the extensions.

## Components

![React Dev Tools Overview](assets/react-dev-tools-1.png)

The components tab shows a complete hierarchy of the components in your app. Selecting a component will show you the current state of the component and any props it was given.

| Button | Function |
| --- | --- |
| ![Pointer Icon](assets/react-dev-tools-3.png) | Select an item on the screen to see what component it's part of |
| ![Eye Icon](assets/react-dev-tools-2.png) | Examine the DOM element a component rendered in the element inspector |
| ![Bug Icon](assets/react-dev-tools-4.png) | Log a component's data to the console |
| ![Brackets Icon](assets/react-dev-tools-5.png) | See the source code for a component |

The function of other buttons can be determined by hovering over them and reading the tool tip.

## Watch Out!

The pointer icon that allows you to select a component on the page is the same as the regular dev tools element selector. This is intentional. The top icon selects DOM elements, the bottom icon selects React components.

![Pointer icons](assets/react-dev-tools-6.png)

## Additional Resources

| Resource | Description |
| --- | --- |
| [Flavio Copes: How to use the React Dev Tools](https://flaviocopes.com/react-developer-tools/) | Blog post on using React dev tools |
| [Chrome: React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) | The Chrome installer for React Dev Tools |
| [Firefox: React Dev Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) | The Firefox installer for React Dev Tools |
| [GitHub: React Dev Tools](https://github.com/facebook/react/tree/main/packages/react-devtools) | The GitHub source code and README |
* Component
* Browser Extension
* Element Inspector
* Console
Fetch and display a list of characters from the [Star Wars API](https://swapi.dev/)
* What is a side-effect?
* How are side-effects handled in React?
* How are HTTP errors handled in React?
* What is `useEffect` for?
* What are the parameters of `useEffect`?
* What is wrong with this code:

```js
useEffect(() => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  fetch(url)
    .then(response => response.json())
    .then(pokemon => {
      setError(false)
      setPokemon(pokemon)
    }).catch(error => setError(true))
}, [])
```
# React: `fetch`

Integrating with APIs is a core part of most React apps. While React apps still use `fetch` to make HTTP requests in the same way that websites do, extra care needs to be taken with how the response data is handled. The most straightforward way to handle an API integration looks like this:

```js
import { useState, useEffect } from "react"

const PokemonCard = ({ name }) => {
  const [pokemon, setPokemon] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    fetch(url)
      .then(response => response.json())
      .then(pokemon => {
        setError(false)
        setPokemon(pokemon)
      }).catch(error => setError(true))
  }, [name])

  return (
    <div className="PokemonCard">
      {
        pokemon.name
          ? (
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          )
          : <span>Loading...</span>
      }
      {
        error
          ? <span>There was a problem loading this Pokemon.</span>
          : null
      }
    </div>
  )
}
```

[Play with this code](https://codesandbox.io/s/epic-mendel-7ys34?file=/src/PokemonCard.js)

1. The `useEffect` hook is imported, along with the `useState` hook.
2. The `pokemon` stateful variable is initialized to an empty object
3. An `error` stateful variable is initialized to `false`.
3. The `useEffect` hook is called with a function and an array with the `name` variable. The function fetches a given pokemon, and then when it comes back it calls `setPokemon` with the response body.
  * If there's an error, the `error` stateful variable is set to `true`.
4. The template checks to see if the `pokemon` stateful variable has a name set.
  * If it does, it renders the rest of the template
  * If it doesn't, it displays a loading message
5. If the `error` stateful variable is truthy, it displays an error message.

The `useEffect` hook is used for code that generates side-effects. For example, making the API call has the side-effect of changing the `pokemon` or `error` states. Other examples of side-effects include using `localStorage` and changing the title of a page.

`useEffect` takes two arguments: A function that contains the side-effect generating code and an array. The array should contain a list of variables that should be watched. If any of the variables given to the array change, the function will execute again. If you only want the function to run the first time the component is rendered, give it an empty array.

## Watch Out!

Note that if you're referencing a variable inside a `useEffect` hook, it should be tracked.

---

If you don't give the `useEffect` hook a second argument, it will re-run on every component render. This will usually cause an infinite loop.

---

It's very important to initialize state to the same data type as it will eventually be. For example:

```js
import { useState, useEffect } from "react"

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([])

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon`
    fetch(url)
      .then(response => response.json())
      .then(pokemon => {
        setPokemonList(pokemon)
      })j
  }, [])

  const pokemon = pokemonList.map(pokemon => {
    return <li key={pokemon.id}>{pokemon.name}</li>
  })

  return (
    <ul className="PokemonList">{pokemon}</ul>
  )
}
```

If `pokemonList` is initialized to anything other than an array, the component will break on the first render. This is because `.map` can only performed on arrays, including empty arrays. When the first render happens, trying to `.map` over any value other than an array will throw an error.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React: AJAX and APIs](https://reactwithhooks.netlify.app/docs/faq-ajax.html) | Official React guide to `fetch` |
| [Video: `useEffect`](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=7760s) | React Hooks Crash Course: `useEffect` |
React
JavaScript: `fetch`
HTTP Request
HTTP Response
API
React: `useState`
React: `useEffect`
Side-effect
State
Data Type
Initialize
JavaScript: `.map`
Stateful Variable
JavaScript: `localStorage`
Argument
Build a React component that display 2 images: One linked, one imported.
* What are 2 ways to include images in React apps?
* Compare and contrast importing and linking images in React apps.
* When linking to a local image in a CRA app, what are the file paths relative to?
# React: Images

There are two ways to use images in React apps: Linking a public URL and importing images to components.

## Linking to Images

The simplest way to link to an image is to include it in the URL, the same as you would in traditional HTML:

```jsx
const someComponent = () => {
  return (
    <img src="https://example.com/assets/image.jpg" alt="Descriptive text" />
  )
}
```

This works well for URLs that come from API responses. In a CRA app, this can also be done with any file in the `public` directory. If there's a file called `image.jpg` in the `public` directory, you can refer to it this way:

```jsx
const someComponent = () => {
  return (
    <img src="image.jpg" alt="Descriptive text" />
  )
}
```

Putting files in the `public` directory also works with any file, which is useful for things like CSS fonts and favicons.

## Importing Images

For static images in apps like logos, you're better off importing them the same way you import JavaScript modules.

```jsx
import image from "./assets/image.jpg"

const someComponent = () => {
  return (
    <img src={image} alt="Descriptive text" />
  )
}
```

When the app is compiled, the image will be moved to a different directory and given a different name. When you import the file and use it in JSX braces, CRA will figure out what the correct file name should be for you. The reason this is preferrable to including it in the `public` folder and referencing it by URL is that CRA can perform certain performance optimizations when the file is imported.

## Watch Out!

Importing any file type other than JavaScript is not normally supported in JavaScript environments. This particular behavior is powered by a tool CRA uses called [webpack](https://webpack.js.org/).

JavaScript modules don't need the `.js` extension when being imported, but images, CSS, and all other file types do.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Create React App: Adding Images, Fonts, and Files](https://reactwithhooks.netlify.app/) | CRA's guide to images |
* React
* URL
* CRA
* Favicon
* Static file
* Webpack
Complete the [Your First Component](https://beta.reactjs.org/learn/your-first-component), including the 4 exercises at the bottom.
* What's the difference between a website and a web app?
* What is transpilation?
* What is an SPA?
* How does a single-page display more than one view?
* What is a component?
* What is one-way data flow?
* What is the virtual DOM?
# Intro to React

## Web Applications

Websites are primarily focused on content and are designed to be consumed. By contrast, web applications are designed to be used. Web applications can be social media apps like Facebook and Twitter, productivity applications like Gmail and Google Docs, eCommerce applications like Amazon and Home Depot, and much more. The common factor between them is that people use them as tools.

Early web applications were rendered by servers. Instead of sending back API data, servers would programmatically build HTML documents and send them to browsers. The downside of building HTML this way is when a user interacts with a server-rendered page the browser needs to send an HTTP request and render an entirely new HTML document every time. This adds some lag between each interaction and keeps them from feeling as smooth as desktop or phone apps.

## Single-Page Applications

Single Page applications, or SPAs, are a style of modern web application. Instead of a server rendering new HTML pages for every interaction, a single HTML page is loaded one time. Whenever users interact with the page, an asynchronous HTTP request is sent with something like `fetch` to retrieve new data. This data is applied to different HTML templates that are stored in JavaScript, and the browser adds and removes DOM elements to make the page appear to have changed.

There are many tools for helping build SPAs and one of the most popular is React. React is a JavaScript library that helps developers build interfaces for web applications using units called components, as well as hosting a larger ecosystem of application development tools.

## React

The core concepts in React applications include components, one-way data flow, the virtual DOM, and transpilation.

### Components

The basic units of React apps and most SPAs are components, which you can think of as custom HTML elements. They're made up of templates consisting of traditional HTML elements and other components, as well as any related JavaScript variables and functionality.

For example, you might have a component that represents a collection of HTML elements in an application's top bar:

```jsx
const TopBar = () => {
  return (
    <header>
      <img src="logo.png" id="logo" alt="InvestoCorp Logo" />
      <h1>InvestoCorp</h1>
    </header>
  )
}
```

Then you can use that component in other components just like any other HTML element:

```jsx
import TopBar from "./TopBar"

const App = () => {
  return (
    <div id="app">
      <TopBar />
      <main>
        <p>New website coming soon!</p>
      </main>
    </div>
  )
}
```

What's more, you can pass data into these components to make them more generic and reusable:

```jsx
const NameBadge = ({ firstName, lastName }) => {
  return <p className="NameBadge">{ firstName } { lastName }</p>
}
```

```jsx
const firstName = "Miles"
const lastName = "Davis"
const UserProfile = () => {
  return (
    <div className="UserProfile">
      <span>User:</span>
      <NameBadge firstName={firstName} lastName={lastName} />
    </div>
  )
}
```

This renders the following HTML:

```html
<div class="UserProfile">
  <span>User:</span>
  <p class="NameBadge">Miles Davis</p>
</div>
```

These uses of components are powerful for making your code reusable and expressive, but the true power of React is the way it handles interactivity:

```jsx
import { useState } from 'react'
import './App.css';

const App = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => setCount(count + 1)

  return (
    <div className="App">
      <p>The current count is {count}</p>
      <button onClick={handleClick}>Increment Count</button>
    </div>
  )
}
```

[Play with this code](https://codesandbox.io/s/sweet-gould-xdbwv?file=/src/App.js)

This component displays a count and a button. Whenever the button is clicked, the count increases and the component renders again with the new count. This pattern can be used to collect user input, interact with data from APIs, and dynamically filter content.

### One-Way Data Flow

A recurring theme in all modern SPAs is one-way data flow. The original SPA frameworks used two-way data flow, which means the value of things like form inputs can be set by the application or by the user interacting with the page. Two-way data flow uses a complicated method of synchronizing these two things. React popularized a simpler pattern called one-way data flow, which involves data in the application being bound to HTML and events from the HTML updating the values.

### Virtual DOM

Another core idea in all single-page apps is that you don't work directly with the DOM. That means React apps don't use any of the following:

* `document.querySelector()`
* `document.querySelectorAll()`
* `document.createElement()`
* `element.addEventListener()`
* `element.append`
* `element.classList`
* `element.innerHTML`
* `element.textContent`

One of the slowest parts of web performance is making changes to the DOM. One of the ways to work around this limitation is to use an abstraction called the virtual DOM that manages how and when to update the actual DOM. The virtual DOM doesn't actually render to the screen, so it can be updated much faster than the actual DOM. Instead of grabbing elements out of the DOM and updating them, you bind variables to them in templates using a language called JSX. Instead of adding event listeners with the DOM, you call event handlers from templates.

### Transpilation

Some of the syntax used in making React apps and other SPAs isn't valid JavaScript, HTML, or CSS. Since those are the only files your browser understands, you need another tool to transform the code you're writing into HTML, CSS, and JavaScript. These kinds of tools are called transpilers, and the one of the most common transpilers for React apps is [webpack](https://webpack.js.org/).

## Additional Resources

| Resource | Description |
| --- | --- |
| [React With Hooks](https://reactwithhooks.netlify.app/) | Comprehensive guide to React |
| [React Interactive Tutorial](https://reactwithhooks.netlify.app/tutorial/tutorial.html) | React tutorial |
| [Thinking in React](https://reactwithhooks.netlify.app/docs/thinking-in-react.html) | Overview of React philosophy |
| [Video: What Is React?](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=143s) | React Hooks Crash Course: Intro |
* Website
* Web Application
* Server
* API Data
* Programmatic
* HTML Document
* SPA
* DOM Element
* Component
* One-Way Data Flow
* Virtual DOM
* Transpilation
* HTML Template
* JSX
* Event Listener
* Webpack
Complete the following [ES2015](https://github.com/rithmschool/es2015-exercises) exercises.
* What is an arrow function?
* What is a JavaScript module?
* What is object destructuring?
* What is array destructuring?
* What is spreading?
* What is a ternary expression?
* When does an arrow function need to wrap its parameters in parentheses?
* When can an arrow function wrap its parameters in parentheses?
* What is an implicit return and how is it used in arrow functions?
* How do you export a module from a file?
* What is the purpose of destructuring?
# React: JavaScript

One of React's advantages is that it's mostly just JavaScript and introduces little additional React-specific syntax. However, some of the JavaScript syntax used in React is more advanced than the syntax used in websites and bears review.

* [Arrow Functions](#arrow-functions)
* [Modules](#modules)
* [Object Destructuring](#object-destructuring)
* [Array Destructuring](#array-destructuring)
* [Spreading](#spreading)
* [Ternary Expressions](#ternary-expressions)

## Arrow Functions

All of these are the same:

```js
// Functional declaration
function someFunction(someParameter){
  return someParameter
}

// Function expression
const someFunction = function(someParameter){
  return someParameter
}

// Arrow function
const someFunction = (someParameter) => {
  return someParameter
}

// Short arrow function, used if the function body is only the return statement
const someFunction = someParameter => someParameter
```

In React, arrow functions (both syntaxes) are preferred. This is a valid component:

```jsx
function SomeComponent(){
  return (
    <p>Hello, world!</p>
  )
}
```

But you're more likely to see this:

```jsx
const SomeComponent = () => {
  return (
    <p>Hello, world!</p>
  )
}
```

Or even this:

```jsx
const SomeComponent = () => <p>Hello, world!</p>
```

When writing arrow function, the following rules apply to parameters

* If there are no parameters, you must use `()`
* If there is one parameter, `()` is optional
* If there are two or more parameters, you must use `()`

For example:

```jsx
const SomeFunction = () => "Hello, world!"
let SomeOtherFunction = (place) => `Hello, ${place}!`
SomeOtherFunction = place => `Hello, ${place}!`
const YetAnotherFunction = (greeting, place) => `${greeting}, ${place}!`
```

## Modules

JavaScript allows you to export variables from one file and import them into another. You'll mostly work with default imports and exports in React, where files only export and import one thing:

```jsx
// SomeComponent.js
export default const SomeComponent = () => {
  return (
    <p>Hello, world!</p>
  )
}
```

```jsx
// AnotherComponent.js
import SomeComponent from "./SomeComponent.js"

export default const AnotherComponent = () => {
  return (
    <SomeComponent />
  )
}
```

## Object Destructuring

Destructuring is a way to pull properties out of an object and assign them to variables.

```js
const user = {
  displayName: "Zoolander",
  username: "bluesteel",
  password: "p@$$w0rd",
}

// Without destructuring
let getUserString = (user) => {
  const username = user.username
  const displayName = user.displayName
  return `${displayName} (${username})`
}

// With destructuring
getUserString = ({ username, displayName }) => {
  return `${displayName} (${username})`
}
```

This is especially useful in React because each component is called with an object that's conventionally called `props`. `props` contains any values given that were passed into the component as attributes:

```jsx
const UserBadge = props => {
  const username = props.username
  const displayName = props.displayName

  return (
    <p>{displayName} ({username})</p>
  )
}
// <UserBadge username="milesdavis" displayName="Prince of Darkness" />
```

The same component with props destructured is more condensed:

```jsx
const UserBadge = ({username, displayName}) => {
  return (
    <p>{displayName} ({username})</p>
  )
}
// <UserBadge username="milesdavis" displayName="Prince of Darkness" />
```

## Array Destructuring

You can also use the idea of destructuring with arrays:

```js
const someArray = [1, 2, 3]
const [one, two, three] = someArray

console.log(one, two, three) // 1, 2, 3
```

In React, this is often used to pull values out of hooks:

```jsx
const hookArray = useState(0)
const someState = hookArray[0] // 0
const updateSomeState = hookArray[1] // Function that updates the value in hookArray[0]

// Same thing in one line
const [someState, updateSomeState] = useState(0)
```

## Spreading

You can spread arrays and objects with the `...` operator. This is the equivalent of dropping the `[]` or `{}` from the object:

```js
const oneList = [1, 2, 3]
const twoList = [4, 5, 6]
const bothLists = [...oneList, ...twoList]

const result = sum(...bothLists) // Can use to pass in an array of arguments separately

const person = {
  firstName: "Jack",
  lastName: "Sparrow",
}
const boatCaptain = {
  firstName: "Captain",
}
const captainJack = {
  ...person, // Everything from `person`
  ...boatCaptain, // Everything form `boatCaptain`, overwrites firstName: "Jack" from `person`
  rank: "Captain", // New property
}

/*
{
  firstName: "Captain",
  lastName: "Sparrow",
  rank: "Captain",
}
*/
```

These are handy for combining and making shallow copies of things. You can also use it to pass all of the props given to a component through to another component:

```jsx
const InnerComponent = ({ someProp, someOtherProp }) => <p>I was given {someProp} and {someOtherProp}.</p>
const OuterComponent = props => <InnerComponent {...props} />

// <OuterComponent someProp="one thing" someOtherProp="another" />
```

## Ternary Expressions

Ternary expressions, also called ternaries, are a condensed way to write `if`/`else` statements. This `if`/`else` statement:

```jsx
let rsvpResponse

if (isAttending){
  rsvpResponse = "Attending"
} else {
  rsvpResponse = "Not attending, with regrets"
}
```

Can be written in one line using a ternary:

```jsx
const rsvpResponse = isAttending ? "Attending" : "Not attending, with regrets"
```

You can often improve the readability of a ternary expression by putting the condition and each branch on their own lines:

```jsx
const rsvpResponse = isAttending
  ? "Attending"
  : "Not attending, with regrets"
```

These are important in React because JSX doesn't support many other forms of conditional logic such as a `if`/`else` and `switch`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) | MDN's documentation on arrow functions |
| [MDN: ES6 in Depth: Arrow functions](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/) | MDN's deep-dive on arrow functions |
| [MDN: `import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) | MDN's documentation on `import` |
| [MDN: `export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) | MDN's documentation on `export` |
| [MDN: Modules Tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) | MDN's tutorial on JS modules |
| [MDN: Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) | MDN's documentation on destructuring |
| [JavaScript.info: Destructuring Assignment](https://javascript.info/destructuring-assignment) | The modern JavaScript tutorial on destructuring assignment |
| [MDN: Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) | MDN's documentation on spread |
| [Free Code Camp: An introduction to spread syntax](https://www.freecodecamp.org/news/an-introduction-to-spread-syntax-in-javascript-fba39595922c/) | Free code camp's overview of spread |
| [MDN: Conditional (ternary) Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) | MDN's documentation on the ternary operator |
* React
* Syntax
* JavaScript: Arrow Function
* Component
* Function Parameter
* Module
* JavaScript: `import`
* JavaScript: `export`
* JavaScript: Destructuring
* React Props
* JavaScript: Spreading
* Shallow Copy
* Ternary Expression
* JavaScript: `if`/`else`
* JSX
* Conditional Logic
* Hooks
Fix this code to make the components work:

```js
function NightLight(){
  const [isOn, setIsOn] = useState(false)

  return (
    <Switch />
  )
}

function Switch(){
  return (
    <button>Turn Switch _____</button>
  )
}
```
* Why would you pass a function as a component prop?
* Describe how to change state in a parent component from a child component.
* What is lifting state?
* What is a side-effect?
* How are side-effects handled in React?
* What is `useEffect` for?
* What are the parameters of `useEffect`?

* What is wrong with this code:

```js
useEffect(() => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  fetch(url)
    .then(response => response.json())
    .then(pokemon => {
      setError(false)
      setPokemon(pokemon)
    }).catch(error => setError(true))
}, [])
```
# React: Lifting State

Data is passed from one component to another by props. These only move one direction though; you can't pass data from a child component up to a parent component. How can child components update state in their parent components?

## Passing Down Functions

This is the React counter example written as 3 components: One to display the count, one to increment the count, and one to hold the other two.

```js
const CounterDisplay = ({ count }) => {
  return <p>{ count }</p>
}

const CounterButton = ({ increment }) => {
  return <button onClick={ increment }>Increment</button>
}

const Counter = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)

  return (
    <div className="Counter">
      <CounterDisplay count={count} />
      <CounterButton increment={increment} />
    </div>
  )
}
```

[Play with this code](https://codesandbox.io/s/awesome-gauss-xyw1r)

1. The `CounterDisplay` component takes a `count` as a prop and displays it. It doesn't need to know that this prop is actually a stateful variable in the `Counter` component, which makes it a much simpler component to understand. These are sometimes called dumb components.
2. The `CounterButton` component takes a function called `increment` as a prop. When the button is clicked, this function is called. Note that the definition of the function is passed in, not an execution of the function. Likewise, the `onClick` handler accepts a function definition.
3. The `Counter` component's responsibility is keep track of and modifying the state of the count, as well as rendering the other two components with the correct props.

The trickiest part of the entire flow is passing in the `increment` function to `CounterButton`. Follow this very carefully:

1. When `increment` is defined in the `Counter` component, `count` and `setCount` are in scope. If the button existed in this component, you could pass it to the `onClick` handler directly.
2. Since the button is in the child component `CounterButton`, the `increment` function is passed to that component as a prop.
3. When the button is clicked, the `increment` function is called from the `CounterButton` component. Even though `CounterButton` can't see `count` or `setCount`, the function `increment` can because they were in scope when it was defined.

When the `increment` function calls `setCount`, `count` changes, and `CounterDisplay` re-renders. This pattern works no matter how many components the function or state travel through.

---

The ideas of lifting state can be summarized as:

* Data can only be passed down.
* Functions that directly change state must be defined in the same component as the state, but these functions can be passed down as props.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React: Lifting State Up](https://reactwithhooks.netlify.app/docs/lifting-state-up.html) | React's official guide to lifting state |
| [Video: Update State](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=6620s) | React Hooks Crash Course: Lifting state |
React
Component
React Props
Child Component
Parent Component
State
React Event Handler
React: `useState`
React: Stateful Variable
Dumb Components
React Props
Rerendering
Create an app that displays blog posts and links to comments for that post.
* What is a sub-route?
* How does React Router handle sub-routes?
* What is a RESTful resource?
* Which path is more conventional, `user/3` or `users/3`?
* What is an index?
* What does the `useRouteMatch` hook return?
* What is `useRouteMatch` used for?
* Do nested routes in React Router use their own `<Switch>`?
* Do nested routes in React Router use their own `<Router>`?
* Differentiate between `useParams` and `useMatch`.
# React Router: Nested Routing

Some routes have sub-routes, such as displaying a specific comments for a specific post: `/posts/23423/comments`. React Router nests routes by putting additional `<Switch>`s in views that have been routed to.

## Path Conventions

Most paths in SPAs are based around resources and IDs. Resources are usually models, and IDs are anything that can uniquely identify a single item within those. When designing nested paths, observe the following conventions:

* Resource names are plural. That means that the URL for a product with the ID of 3 should be `example.com/products/3`, not `example.com/product/3`.
* Individual items should be linked to by a unique identifier in the URL, usually a database-generated ID. That means that the url for a T-shirt should something like `example.com/shirts/23421` rather than `example.com/shirts/blue-tee`. You can use descriptive words in the path, but you need to take care to ensure that they're unique or you won't be able to display the correct item. Things that are naturally unique such as departments in an organization are a good fit for this.
* A resource without an ID is called an index, and is often used to display a list of resources. For example, `example.com/albums` might display a list of albums, while `example.com/albums/34` might display details about a particular album.
* The suffixes `create`, `edit`, and `delete` are standard for displaying forms that offer options about each related action, but can customized or branded as necessary. For example, a URL to edit a participant might look like `example.com/participants/34/edit` or `example.com/participants/34/update`.

## The `useRouteMatch` Hook

The `useRouteMatch` hook evaluates to an object containing information about the current path. This is used to dynamically fill out the `to` attribute of links and the `path` attribute of nested routes:

```jsx
const match = useRouteMatch()

// ...

<Link to={`${match.url}/${someDynamicValue}`}>Arts and Culture Management</Link>

// ...

<Route path={`${match.url}/:someDynamicValue`}>
  <SomeMatchingComponent />
</Route>
```

`match` contains the current path in its `url` property and all dynamic segments in its `params` property.

## Nesting Routes

In React Router, a nested route is a component that has its own switch. For example:

```jsx
const App = () => {
  return (
    <div className="App">
      <Router>
        <header>
          <h1><Link to="/">The University of Denver</Link></h1>
          <nav>
            <ul>
              <li>
                <Link to="/career">University College</Link>
              </li>
              <li>
                <Link to="/law">Sturm College of Law</Link>
              </li>
              <li>
                <Link to="/business">Daniels College of Business</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/law">
              <LawSchoolView />
            </Route>
            <Route path="/business">
              <BusinessSchoolView />
            </Route>
            <Route path="/career">
              <CareerSchoolView />
            </Route>
            <Route exact path="/">
              <UniversityHomeView />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  )
}
```

```jsx
const CareerSchoolView = () => {
  const { url, path } = useRouteMatch()
  const departments = [{
    id: "ict",
    label: "Information and Communications Technology",
  },{
    id: "acm",
    label: "Arts and Culture Management",
  },{
    id: "cm",
    label: "Communication Management",
  }]

  return (
    <div className="CareerSchoolView">
      <h2>Welcome to the University of Denver's University College</h2>
      <nav>
        <ul>
          {departments.map(({id, label}) => (
            <li key={id}>
              <Link to={`${url}/${id}`}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Switch>
        <Route path={`${path}/:departmentName`}>
          <DepartmentView />
        </Route>
        <Route exact path={path}>
          <DepartmentIndexView />
        </Route>
      </Switch>
    </div>
  )
}
```

```jsx
const DepartmentView = () => {
  const { departmentName } = useParams()
  const [greeting, setGreeting] = useState("Loading...")

  useEffect(() => {
    fetch("/university-college.json")
      .then(response => response.json())
      .then(({ departments }) => {
        const department = departments[departmentName]
        setGreeting(department.greeting)
      })
  }, [departmentName])

  return (
    <p>{ greeting }</p>
  )
}
```

[Play with this code](https://codesandbox.io/s/bold-butterfly-bifmk)

In this example:

1. The `<App />` component wraps the entire application in a `<Router>`, has `<Link>`s that sets new paths, and a `<Switch>` that determines which school component to display based on the path.
2. The `<CareerSchoolView />` gets the `url` and the `path` from the `useRouteMatch` hook. These will both be `/career` in this case.
3. The `<CareerSchoolView />` makes nested links to each department using the `url`.
4. Another `<Switch>` matches paths that contain career school's department ID. These are what the `<Link>` tags in this component will link to. It also has a default view that will display when the route first loads.
5. The `<DepartmentView />` gets the department ID from the `useParams` hook. It uses this to look up and display that department's unique greeting from a local JSON file with `fetch`.

## Watch Out!

`match.url` is used in `<Link>`s, `match.path` is used in `<Route>`s. A linking URL should contain the entire path, while a route only needs the new parts of the path since the last `<Route>` component.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React Router: `useRouteMatch`](https://reactrouter.com/web/api/Hooks/useroutematch) | React Router's official docs for the `useRouteMatch` hook |
| [React Router: Nested Routes example](https://reactrouter.com/web/example/nesting) | React Router's official nested routes example |
React Router
Route
Sub-Route
Resource
ID
URL
Path
Database-generated ID
React: `useRouteMatch`
React: `useParams`
Dynamic Segment
Nested Route
Component
JSON
JavaScript: `fetch`
Model
Write a React app that displays a 3-step recipe. Each recipe step should use the same component, the navigation controls for all 3 steps should be visible at all times, and selecting a step should display details about that step.

---

Write a React app that displays Lego instructions. Each step should use the same component, the navigation controls for all steps should be visible at all times, and selecting a step should display details about that step. Add forward and backward navigation controls.
* Describe owner/member views.
* Where is the state for the currently selected component held in an owner/member view?
* How do you change the state of the currently selected component?
# React: Owner/Member Views

If you have a list of items, any of which can be selected to show more detail, how would you implement it? Where would the selected item state be held? How would that state be changed?

The owner/member pattern in React app involves:

* Keeping track of the currently selected item in state in an owner component
* Passing that object into a member component
* Changing the currently selected item in the owner component when a different item is clicked

```jsx
const ItemList = ({items}) => {
  const [selectedItem, setSelectedItem] = useState(items[0])
  const select = id => {
    const item = items.find(item => item.id === id)
    return setSelectedItem(item)
  }

  const $items = items.map(item => {
    const isSelected = item.id === selectedItem.id
    return <ItemSummary
      key={item.id}
      select={select}
      id={item.id}
      title={item.title}
      isSelected={isSelected}
    />
  })

  return (
    <div className="ItemList">
      <ul>{$items}</ul>
      <ItemDetail title={selectedItem.title} details={selectedItem.details} />
    </div>
  )
}
```

The `<ItemList />` component:

1. Declares `selectedItem` as a stateful variable, defaulting it to the first item in the array
2. Declares a function called `select` that accepts an ID and then looks up an item with that ID to set the `selectedItem` to
3. Maps over the `items` prop to create elements. It checks each item's ID to determine whether it's the selected element
4. Displays both the `<ItemDetail />` and the collection of `<ItemSummary />` components

```jsx
const ItemSummary = ({ id, title, isSelected, select }) => {
  const handleClick = () => select(id)
  return (
    <li
      onClick={ handleClick }
      className={`ItemSummary ${isSelected ? "active" : "inactive"}`}
    >{ title }</li>
  )
}
```

The `<ItemSummary />` component:

* Takes in an id, title, whether or not the element is selected, and a function to change the selected item as props
* Calls a function to change the selected item with the id of them when it's clicked
* Always has a class of `ListItem`, and has a class of `active` if `isActive` is true and `inactive` otherwise. Watch the braces on this carefully; it's a JSX expression with a template string inside of it

```jsx
const ItemDetail = ({ title, details }) => {
  return (
    <div className="ItemDetail">
      <h2>{ title }</h2>
      <p>{ details }</p>
    </div>
  )
}
```

The `<ItemDetail />` component is a dumb component that takes in a title and details and displays them.

[Play with this code](https://codesandbox.io/s/brave-wind-boc7m?file=/src/ItemList.js)_

## Additional Resources

| Resource | Description |
| --- | --- |
| [React: Composition vs. Inheritance](https://reactwithhooks.netlify.app/docs/composition-vs-inheritance.html) | Official React guide to composing components |
Owner/Member Views
State
React
Owner View
Member View
React: Stateful Variable
JavaScript: `.map`
React: Event Handler
Expression
JSX
JavaScript: Template Literal
Component
Dumb Component
## Building a Counter

1. Make a component that keeps track of a count in state
2. Add a button that increments the counter
3. Make a second component that will display the current count
4. Pass the current count into the count display as a prop
* What is a prop?
* Which direction is state passed in React components?
* Where must state changes occur?
* What is the syntax for giving a component a prop?
* What is the syntax for receiving a prop from a component?
# React: Props

Data can be passed from a parent component to a child component, and whenever the data changes in the parent it will rerender the child with the new data. The data in the child component is called a prop, which is short for property. You can pass simple values as props:

```jsx
// ParentComponent.js
import ChildComponent from "./ChildComponent"

module.exports = function ParentComponent(){
  return (
    <ChildComponent someProp="Hello, world!" />
  )
}
```

```jsx
// ChildComponent.js
module.exports = function ChildComponent({ someProp }){
  return (
    <p>{{ someProp }}</p>
  )
}
```

You can also pass state:

```jsx
// ParentComponent.js
import ChildComponent from "./ChildComponent"

module.exports = function ParentComponent(){
  const [someState, updateSomeState] = useState(1)

  return (
    <>
      <ChildComponent someProp={someState} />
      <Button @click="() => someState += 1"> Increment</Button>
    </>
  )
}
```

```jsx
// ChildComponent.js
module.exports = function ChildComponent({ someProp }){
  return (
    <p>{{ someProp }}</p>
  )
}
```

This state will be bound, meaning that any change in the parent immediately triggers a rerender of the child component with the new value.

## Watch Out!

In the example above, pressing the button changes the state and that state change is reflected down through the props. If a child component needs to change state in its parent, it needs to do it by passing in a function that changes the original value. State changes need to happen in the same place the state is held.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Hooks: State](https://reactwithhooks.netlify.app/docs/hooks-state.html) | Official React docs on the `useState` hook |
| [Components and Props](https://reactwithhooks.netlify.app/docs/components-and-props.html) | Official React docs on props |
| [Video: Props](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=2948s) | React Hooks Crash Course: Props |
* React Props
* Component
* Child Component
* Parent Component
* State
* React State
* Bound State
* React Rerender
* What is React Router?
* What is the role of the `<Router>` component in React Router?
* What is the role of the `<Switch>` component in React Router?
* What is the role of the `<Route>` component in React Router?
* What is the role of the `<Link>` component in React Router?
* How do you add classes to the anchor tag through a `<Link>` component?
* What is a view?
# Intro to React Router

[React Router](https://reactrouter.com/) is a popular third-party library for integrating SPA routing into React apps. You can install it in an existing React app with `npm install react-router-dom`.

React Router has 4 basic components:

* **`<Router>`**: This component must surround the part of the app that's using the router. It's common to put this around the entire app.
* **`<Switch>`**: This component wraps the route definitions. When navigating to a `<Link>`, the `<Switch>` will render the first route that matches the definition. You can define sub-routers by nesting another `<Switch>`.
* **`<Route>`**: This component defines each route within a `<Switch>`, and determines which component will display when a route matches. Has a to `path` attribute that contains the URL that should be matched.
* **`<Link>`**: This component links to a route. It has a `to` attribute that sets the URL it should go to. It turns into an `<a>` element when it's rendered.

This app routes between a home, about, and product view:

```jsx
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"

import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import AboutView from "./views/AboutView"
import ProductView from "./views/ProductView"

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <Switch>
          <Route path="/about">
            <AboutView />
          </Route>
          <Route path="/products">
            <ProductView />
          </Route>
          <Route exact path="/">
            <ProductView />
          </Route>
        </Switch>
        <AppFooter />
      </div>
    </Router>
  )
}
```

```jsx
const AppHeader = () => {
  return (
    <header className="AppHeader">
      <h1>Our Site</h1>
      <nav>
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
```

[Play with this code](https://codesandbox.io/s/awesome-payne-4wkvd)

Some highlights:

1. The necessary components from `react-router-dom` are imported, `BrowserRouter` is renamed to `Router` in the process.
2. Components that are routed to are in a `views` folder, everything else is in a `components` folder.
3. The `<Router>` component wraps the entire app.
4. The `<Switch>` component will resolve to component inside the first `<Route>` `path` that matches the current URL.
5. The `<Route exact path="/">` component is a default that will render if no other URL matches. The `exact` attribute ensures that the route with only match if there's nothing after the `/`.
6. The `<Link>` component `to` attribute will change the URL.

## Watch Out!

* The `react-router-dom` package doesn't have a `Router` export, it has a `BrowserRouter` export. To name it `<Router>` in your app, import it as `import { BrowserRouter as Router } from "react-router-dom"`.
* Having more than one `<Router>` in the same hierarchy will cause problems that are difficult to diagnose. Be especially careful when renaming the import.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React Router: Quick Start](https://reactrouter.com/web/guides/quick-start) | Official guide to React Router |
| [Video: React Router Tutorial](https://www.youtube.com/watch?v=Law7wfdg_ls) | Dev Ed's React Router tutorial video |
React Router
React
npm
SPA
SPA Routing
Route
Router
View
Create an app that displays blog posts and links to specific posts.
* What is a dynamic segment?
* Why you hard-code every path for a route?
* What does the `useParams` hook return?
# React Router: Dynamic Segments

Some views apply to an arbitrary number of paths. For examples, a `ProductView` component may have a route for every product in the company's catalog. Dynamic segments allow you to use things like product ids as variables in a path. That gives each product a unique URL, while also exposing the variable to the code so that specific product can be looked up.

## The `useParams` Hook

The core idea in dynamic segments is that you can define a part of a path that will be treated as a variable. For example, the path `/users/3242` might have the route `<Route path="users/:userId">`. The part of the path after the colon will be available in the component the route renders with the `useParams` hook as the variable `userId`.

```jsx
const Users = () => {
  return (
    <Switch>
      <Route path="/users/:userId">
        <UserProfile />
      </Route>
      <Route path="/users">
        <UserList />
      </Route>
    </Switch>
  )
}
```

```jsx
const UserProfile => {
  const { userId } = useParams()

  // Fetch user with `userId`, etc.
}
```

## Routing with Dynamic Segments

This example routes to different product categories. Each one uses the same `<ProductView />` component, but uses the `useParams` hook to get the data specific to that product category when it's rendered.

```jsx
const App = () => {
  return (
    <Router>
      <h1>Products</h1>
      <ul>
        <li>
          <Link to="/hammers">Hammers</Link>
          <Link to="/saws">Saws</Link>
          <Link to="/hardware">Hardware</Link>
        </li>
      </ul>
      <Switch>
        <Route path="/:productCategoryLabel">
          <ProductView />
        </Route>
        <Route path="/">
          <ProductIndexView />
        </Route>
      </Switch>
    </Router>
  )
}
```

```jsx
const ProductView = () => {
  const { productCategoryLabel } = useParams()
  const [ productCategory, setProductCategory ] = useState({})
  const [ error, setError ] = useState(false)

  useEffect(() => {
    fetch(`products/${productCategoryLabel}`)
      .then(response => response.json())
      .then(productCategory => {
        setProductCategory(productCategory)
      }).catch(error => {
        console.error(error.message)
        setError(true)
      })
  }, [ productCategory ])

  return (
    <div className="ProductCategory">
      {
        productCategory.title
          ? <>
            <h2>{ productCategory.title }</h2>
            <p>{ productCategory.details }</p>
          </>
          : <span className="loading-indicator">Loading...</span>
      }
      {
        error && <p className="error">There was an error loading this product category</p>
      }
    </div>
  )
}
```

The part of the URL following the `:` will be available as a variable with that name from the `useParams` hook. So if you request `/hammers`, `productCategory` will be equal to `hammers`. This is especially useful for passing IDs:

```jsx
const App = () => {
  const items = [{
    id: 1,
    label: "Apple",
  },{
    id: 2,
    label: "Banana",
  },{
    id: 1,
    label: "Carrot",
  }]


  return (
    <Router>
      <ul>
      {items.map(item => (
        <li>
          <Link to={`items/${item.id}`}>{item.name}</Link>
        </li>
      ))}
      </ul>
      <Switch>
        <Route path="/items/:itemId">
          <Item />
        </Route>
      </Switch>
    </Router>
  )
}
```

```jsx
const Item = () => {
  const { itemId } = useParams()
  // Fetch the item with this `itemId`
}
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [React Router: `useParams`](https://reactrouter.com/web/api/Hooks/useparams) | Official React Router docs for the `useParams` hook |
| [React Router: URL Params Example](https://reactrouter.com/web/example/url-params) | Official example of using dynamic segments |
React Router
Route
Component
Path
View
React: `useParams`
Render
Hook
Dynamic Segment
Write content for 3 completely different resumes that emphasize different parts of your skillset. Next, select or design 3 completely different resume layouts that range from casual to formal. Last, apply all 3 sets of content to all 3 resume layouts, for a total of 9 resumes.
# Intro to Resumes

A resume is the document you will be asked for the most in your job search process. A resume is a product advertisement, except the product is you. It's an opportunity to highlight which parts of your background make you especially well-suited for a particular position. A resume is not a list of everything you've ever done (that's a Curriciulum Vitae), it's not a legal document like a contract, and it's not a place to be humble or indirect.

## Resume Sections

Here are the most common sections people use in technical resumes:

### Contact Information

Include:

* **Name**
* **A title to describe yourself**. Ideally, this is the same as the title of the job you're applying for. Examples include "Software Engineer", "Software Developer", "Technologist", "Application Engineer", and "Fullstack Developer."
* **City and state/municipality**. This does not necessarily need to be the city you currently live in, but it should be a city you're willing to live in if you get the job. It's usually not necessary to be any more specific than the city.
* **Email address**. Your professional email address should be very straight-forward, and ideally be from a custom domain.
* **Personal website**. Optional. Ideally hosted at a custom domain.
* **Phone number**. Optional.

### Work experience

You are not obligated to include every job you've ever had. Focus on:

* **Recent jobs**
* **Jobs where you were especially successfu or celebrated**
* **Jobs that have skills relevant to where you're applying.** Note that these don't need to be technical skills! You may have worked in a similar industry as the company you're applying to or otherwise have experience that translates well.

For each job, include:

* **Name of the company**
* **Name of the position.** Note that this doesn't need to precisely match the title you had at the company, it just needs to accurately reflect the work you did. For example, if your official title was "Associate Web Engineer II", it's OK to list the job on your resume as "Web Engineer," "Software Engineer," or any other title that matches the work you did. This is especially true of companies that use unconventional titles. If you served in different roles at the company, you can include them as separate entries if they were very different jobs or just include the most recent one if they were similar.
* **Start and end years**. If you were there less than a year, also include the month. If you're still employed there, write the date as "Present". Date ranges are separated by an "em-dash" (like a hyphen, but longer) with no spaces on either side. For example, "November 2019—June 2020" or "2018—Present".
* **Description of your work and accomplishments**. Use past tense if it's a former job, present tense if it's a current job. Use sentence fragments that don't have subjects. For example, instead of writing "I generated $1 million in revenue," write "Generated $1 million in revenue." Doing so drops the repetition of using "I" in every sentence, and allows you to start the fragment with a strong action verb.

Focus on the benefits you provided to the company more than the tasks you performed. "Waited tables" is a task, "Served over 5000 customers" also includes the impact you had on the company. Whenever possible, quantify your work. Include how much time was saved by a process you designed, how much revenue was generated by a project you worked on, or how many customers used your product. Companies hire people to save them time, make them money, or help them pursue a mission. Frame all of your work in terms of how you've successfully done this in the past. Remember, it's not your biography, it's a sales pitch.

### Skills

List your revelant technical skills. Ideally, these match some of the key skills outlined in the job description you're applying for. Three things to leave off:

* Don't include a laundry list of every technology you've ever used; stick with your most relevant, impressive, and strongest skills.
* Don't include skills that are common to any professional. These include things like the Microsoft Office suite, browsers, critical thinking skills, punctuality, teamwork, or communication skills. These things should be inferred by how you handle the application process.
* Don't include skills that are implied by other skills. If you list React, you don't need to also list HTML and CSS. If you list Express, you don't also need to list Node.

Skills should be listed from most to least relevant to the position.

Be extremely careful in how you list a technology. Many common technologies are spelled counterintuitively and inconsistently. A few for reference:

* React (not React.js, ReactJS, or REACT)
* Express (not Express.js)
* Node.js (not Node, NodeJS, or NODE)
* Ruby on Rails (not Rails)
* Sass (not SASS)
* Jest (not Jest.js)
* Cypress (not Cypress.io or Cypress.js)
* AWS (not Aws or Amazon Web Services)
* Unix (not UNIX)

Always check the official website or documentation to verify spelling and punctuation.

### Education

List any formal education, including university programs and code schools. In most cases, these should be listed in reverse-chronological order. For each, include:

* **The name of the institution**.
* **The name of the credential you earned**. Be very careful about how you format credentials. While we colloquilliary say "bachelor's degree" and "master's degree," the correct titles are singular and include the discline (e.g. "Master of Arts, English Literature", "Bachelor of Science, Chemistry"). You can also abbreviate the credentials (e.g. "M.A., English Literature", "B.S., Chemistry").
* **The year you earned or will earn the credential**.
* **A list of key subjects studied, memberships, and accomplishments.**

### Accomplishments

Awards, volunteer work, or unique credentials. This section serves a couple purposes:

* Showcasing impressive parts of your background that don't fit into any of the other sections
* Signaling attractive values or attributes that are hard to quantify otherwise, such as dedication and generosity
* Giving the reader something unique to remember you by. When you're reviewing dozens or hundreds of resumes, anything that helps you stand out is good. "That one guy with the pretty good project" isn't as good as "that one guy with the pretty good project who ran 10 marathons in 30 days."

Accomplishments sections should have at least 5 entries, each one should be a single sentence. When relevant, include the year.

### Portfolio

A list of 2-4 projects you've done that highlight skills you have that are relevant to the job. It's unlikely that someone reading your resume will look at all of your projects, and it's likely they'll only look at one. By limiting your portfolio to your absolute best work, you increase the likelihood that employers will see it. Prioritize:

* **Complete projects.** Don't include a project that's in any kind of broken or half-finished state. Delete work-in-progress features if necessary. Make sure that each project has a complete README.md, a strong commit history, and no sloppy or broken code.
* **Technologies the company uses**. Optional, but ideal.
* **A range of technologies or problems**. If what you're pitching to the company is your range and adaptability, your portfolio should show If what you're pitching to the company is your depth of knowledge in one technology, your portfolio should show a wide range of problems you've solved with it.

For each project in your portfolio, include:

* Name of the project
* **A deployed URL where it can used**. This should be a custom URL, and clicking the URL should go to the site.
* **Technology highlights.** "React, SCSS." is more impressive than "React, HTML, CSS, JavaScript, SCSS, Node, Bash, Git."
* **Repo where the code can be found**. If it's on GitHub, `username/repo-name` is sufficient text. Additionally include a link to the repo for the digital version.
* **A 1-2 sentence description of what the app does**. Focus on the problem it solves more than how you solved it. For example, "Matches foster dogs with homes using the PetFinder API" is better than "A React app that use the PetFinder API for dog matching."

## Section Ordering

To be effective as an advertisement for yourself, you should prioritize sections by how impressive they are likely to be to the person reading your resume. Here are some scenarios:

If you have some relevant technology experience already and some formal education:

1. Contact
1. Work Experience
1. Education
1. Accomplishments
1. Skills

If you have no technology experience and no formal education and few accomplishments:

1. Contact
1. Portfolio
1. Work Experience
1. Skills
1. Accomplishments

Some principles:

* Always lead with your contact information
* Work experience is usually the most valuable because it represents you delivering value to an organization
* A portfolio is usually used in place of technical work experience if none exists
* Skills are usually the lowest priority, because they're less concrete than education or accomplishments. If you can include skills in the descriptions of jobs or portfolio items, this section can be omitted.

## Applicant Tracking Systems

Applicant Tracking Systems, or ATSs, are automated tools that scan resumes from incoming applications and help recruiters manage the flow. You may come across a lot of advice about optimizing your resume for ATSs, often people or companies selling resume services. This is rarely necessary. ATS keyword matching is notoriously unreliable, and most recruiters know it. Recruiters are afraid of missing applications from great candidates because they were filtered by the ATS, so there's a good chance a human will scan your resume.

## Resumes are Scanned, Not Read

When you read a book you typically read each word sequentially. Resumes are rarely read this closely. Instead, people reading resumes scan through the page looking for words and phrases that jump out to them. It's one of the reasons your position descriptions should use sentence fragments instead of full sentences.

## Digital vs. Print

When applying directly to companies, always send your resume as a PDF. When applying to a recruiting agency, always send it as a text document (they generally remove your name when sending it to clients). In both cases, companies still print out resumes fairly often (they're useful to take physical notes on during interviews), so check that your resume doesn't have blue text and underlines for links and that all the information in your resume prints well.
Resume
Resume: Contact Information
Resume: Work Experience
Resume: Skills
Resume: Education
Resume: Accomplishment
Resume: Portfolio
Applicant Tracking System
Complete the exercises in [Simple Unit Testing](https://github.com/sikaeducation/simple-unit-testing)
* What is a pure function?
* Why are pure functions easier to test?
* What is the difference between arranging, acting, and asserting in a test?
* What is the primary benefit of organizing your tests as AAA tests?
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
* Primitive Value
* Argument
* Pure function
* Testing: Arrange
* Testing: Act
* Testing: Assert
* State
Build an app with two views, and switch between them to navigate instead of using traditional anchor navigation.
* How is SPA routing different from regular routing?
# Intro to Single-Page Application Routing

In a traditional website, using a navigation link sends an HTTP request to a server, which sends back a new HTML file. The defining feature of single-page apps or SPAs is that there's only one HTML page. How can you have an application with one HTML page and multiple views?

A web page is made up of DOM elements, each of which are rendered to the screen. JavaScript can add, remove, or modify those DOM nodes. In an SPA, a view is a collection of DOM nodes. When you navigate in a SPA, old DOM nodes are removed and new ones are added. For example, in pure JavaScript:

```html
<body>
  <div id="app"></div>
</body>
```

```js
const app = document.querySelector("#app")

const header = document.createElement("header")
header.innerHTML = `
  <h1>Our Site</h1>
  <nav>
    <ul>
      <li>
        <a href="#" id="products">Products</a>
      </li>
      <li>
        <a href="#" id="about">About Us</a>
      </li>
    </ul>
  </nav>
`

const products = document.createElement("main")
products.innerHTML = `
  <h2>Products</h2>
  <ul>
    <li>Briefcase</li>
    <li>Backpacks</li>
    <li>Satchels</li>
  </ul>
`

const about = document.createElement("main")
about.innerHTML = `
  <h2>About Us</h2>
  <p>We've been making great products since the year we were founded.</p>
`

const footer = document.createElement("footer")
footer.innerHTML = `
  <small>© 2020, by Us</small>
`

header.querySelector("#products").addEventListener("click", event => {
  event.preventDefault()
  app.innerHTML = ""
  app.append(header, products, footer)
})
header.querySelector("#about").addEventListener("click", event => {
  event.preventDefault()
  app.innerHTML = ""
  app.append(header, about, footer)
})

app.append(header, products, footer)
```

[Play with this code](https://codesandbox.io/s/hardcore-lalande-hwewm)

Notice how the view loads instantly, without the slight lag that normally occurs with HTTP requests. Whenever a navigation link is clicked:

1. Navigation is prevented
2. The existing content is removed from the `#app` element
3. New DOM nodes are added to replace them

This is the essence of what SPA routing tools do, while also supporting improved syntax and support for features like path matching, dynamic segments, and nested routes.

## Additional Resources

| Resource | Description |
| --- | --- |
| [dev.to: Routing in SPAs](https://dev.to/marcomonsanto/routing-in-spas-173i) | Blog post on SPA routing |
SPA
HTTP Request
HTML
View
Web Page
DOM Element
JavaScript
DOM Node
Lag
Routing
Dynamic Segment
Nested Routes
Path
Draw a diagram of an app with 3 components. In the diagram, indicate how data is passed through props, then indicate how application state is passed.
* Describe application state in your own terms
* List 5 different types of data that would ideally be application state rather than local state
# Intro to SPA State Management

For many types of data, it makes sense to pass the data through a hierarchy of components. For example, a `<Product />` component might accept a `product` object. That `<Product />` component can then continue passing that object or parts of it down through the hierarchy. This may include components that display the name of the product and other attributes, display reviews and related products, and so on. There also types of data that are owned by the app itself, including:

* The currently logged in user
* Authorization tokens from servers
* The display theme
* A music player that can be controlled from multiple parts of the app
* Currently configured options
* Modal dialogs

It doesn't make sense to think of this data in terms of which component should own the state. Rather, think of it as state that is owned by the application, or application state. Different SPA libraries and frameworks have different tools for handling application state:

* **React**: Context, Redux
* **Vue**: Vuex
* **Angular, Ember**: Service objects

All of them follow a similar pattern: Bypass the component hierarchy to make application state available in any component that needs it. This application state isn't part of any one component and could reasonably be used in many places.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Managing State in an SPA](https://medium.com/@szpytfire/managing-state-in-an-spa-9a375c353c4e) | Blog post on SPA state management |
* Component Hierarchy
* Component
* Application State
[W3Schools: SQL Inner Join](https://www.w3schools.com/sql/sql_join_inner.asp)

---

[SQL Zoo: Joins](https://sqlzoo.net/wiki/The_JOIN_operation)
* What is a SQL inner join?
* How are database tables joined?
* Describe the syntax of a SQL inner join statement?
* What SQL keyword must be present before you can use `INNER JOIN`?
# SQL: Inner Joins

Writing queries for one table is straight-forward:

```sql
SELECT *
FROM student;

SELECT *
FROM instructor;
```

How would you get all of one instructor's students?

## Joins

```sql
SELECT student.*
FROM student
INNER JOIN student.instructor_id = instructor.id
WHERE instructor.name = "Joe Satriani";
```

Joins add more tables to a query that you can display with `SELECT` and filter with `WHERE`. Columns in the `SELECT` and `WHERE` clauses are prefixed with the table. Joins happen between the primary key of one table (usually the ID) and the foreign key of another table. In other words, if Joe Satriani is an `instructor` with an ID of `9` (primary key), than his students probably have an `instructor_id` column with a `9` in it (foreign key). The join statement says that you want to match up the primary key to the foreign key.

## Writing a Join

![4 table ERD](assets/inner-join-erd.png)

In this model:

* Each band has multiple musicians, but each musician is in one band
* Each musician has multiple instruments, but each instrument is owned by one musician
* Each instrument model has multiple instruments, but each instrument is of one model

If you want to find out all of the instrument models used by the band 311, you need to traverse these 4 tables with joins.

```sql
SELECT DISTINCT band.name, instrument_model.label
FROM band
INNER JOIN musician.band_id = band.id
INNER JOIN instrument.musician_id = musician.id
INNER JOIN instrument.model_id = instrument_model.id
WHERE band.name = '311';
```

This will result in something like:

| band.name | instrument_model.label
| --- | --- |
| 311 | Pearl |
| 311 | Tama |
| 311 | GHS |
| 311 | PRS Guitars |
| 311 | Warwick |

Don't worry too much about the logic of the joins. If you need data from two tables, just find a way to walk from one to the other. The logic of what to display is handled by `SELECT`, the logic of what to filter out is handled by the `WHERE` clause. The order of the columns in a join statement is not important.

## Watch Out!

Much like an `AND` or `OR` depends on the presence of a `WHERE` to start the clause, you need a `FROM` clause before you can use `INNER JOIN`.

## Deep Dive

When you make an INNER JOIN, the database starts by making a cartesian product of the two tables. The clauses in your INNER JOIN eliminate everything except the records in the cartesian product where the primary key matches the foreign key.

## Additional Resources

| Resource | Description |
| --- | --- |
| [W3Schools: SQL Inner Join](https://www.w3schools.com/sql/sql_join_inner.asp) | W3Schools' tutorial on inner joins |
| [SQL Zoo: Joins](https://sqlzoo.net/wiki/The_JOIN_operation) | SQL Zoo's interactive tutorial on inner joins |
SQL
SQL Query
Inner Join
Database
Database Table
ERD
Database Column
Database Row
Foreign Key
Primary Key
Cartesian Product
[W3Schools: Introduction to SQL](https://www.w3schools.com/sql/sql_intro.asp)

---

[W3Schools: Syntax](https://www.w3schools.com/sql/sql_syntax.asp)
* What is SQL?
* What is a SQL Query?
* Differentiate by querying a database with SQL and using an ORM.
* Why is SQL worth learning when ORMs abstract out much of their complexity?
# Intro to SQL

Sometimes you need to interact directly with the database rather than through a query builder or ORM. For example:

* Viewing ad hoc data
* Debugging a database without also running a web server
* Tuning a query to be more efficient than one generated by a query builder or ORM
* Working with embedded databases in hardware devices
* Verifying that data exists or was correctly added
* Examining the schema of a database

SQL is the language to use in these situations.

## SQL

Structured Query Language, or SQL, is a language for issuing commands to databases. For example, to display the `first_name` and `last_name` of every `person` record in the database, you could write this query:

```sql
SELECT first_name, last_name
FROM person;
```

Despite the implications of the word "query", SQL queries do more than read data. You can also add data:

```sql
INSERT INTO person (first_name, last_name)
VALUES ('Art', 'Blakey');
```

update data:

```sql
UPDATE person
SET first_name = "Cannonball"
WHERE last_name = "Adderly";
```

and delete data:

```sql
DELETE FROM person
WHERE id = 13;
LIMIT 1;
```

Additionally, there are SQL queries that control the structure of databases:

```sql
CREATE DATABASE jazz;
```

```sql
CREATE TABLE person (
  id INT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255)
);
```

```sql
ALTER TABLE person 
ADD COLUMN birthday DATE;
```

There are many different relational database platforms, such as PostgreSQL, MySQL, Oracle, SQL Server, MariaDB, and many more. While there are some syntax and feature differences between them, they all support many of the exact same queries. This is because the syntax for SQL is standardized by the standards body ANSI.

SQL is a relatively small language at approximately 30 keywords, but it can do everything needed to administer a database.

## Additional Resources

| Resource | Description |
| --- | --- |
| [W3Schools: Introduction to SQL](https://www.w3schools.com/sql/sql_intro.asp) | W3Schools' intro to SQL |
| [W3Schools: Syntax](https://www.w3schools.com/sql/sql_syntax.asp) | W3Schools' syntax reference |
| [Video: SQL Tutorial](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=143s) | Free Code Camp's comprehensive tutorial on SQL |
SQL
Debugging
Database
Embedded Database
SQL Query
ANSI
PostgreSQL
[SQL Zoo: Using Null](https://sqlzoo.net/wiki/Using_Null)
* Differentiate between `LEFT JOIN` and `INNER JOIN`
* Differentiate between `LEFT JOIN` and `RIGHT JOIN`
* What are `LEFT JOIN`s used for?
# SQL: LEFT JOIN

An `INNER JOIN` finds every column where there's a match. For example, to get all of a customer's orders you might write something like:

```sql
SELECT customer.*, order.*
FROM customer
INNER JOIN order on order.customer_id = customer.id;
```

There's a catch: If the customer doesn't have any orders, neither the order information nor customer information will display. For example, consider a user table and an agreement agreement table representing whether each user has agreed to a change in the terms of service. Only Bill Bellamy has agreed so far:

**customer**

| id | name |
| --- | --- |
| 1 | Bill Bellamy |
| 2 | Kennedy Montgomery |
| 3 | Peter King |

**agreement**

| id | is_signed | customer_id |
| --- | --- | --- |
| 1 | true | 1 |

If you try to list all of the customers and whether they've signed the agreement with an inner join, you may be surprised:

```sql
SELECT customer.name, order.product
FROM customer
INNER JOIN agreement ON agreement.customer_id = customer.id
```

| customer.name | order.product |
| --- | --- |
| Bill Bellamy | true |

`INNER JOIN` only returns results that have matches. If you want every customer whether or not there's a match, use `LEFT JOIN`:

```sql
SELECT customer.name, order.product
FROM customer
LEFT JOIN agreement ON customer.id = agreement.customer_id
```

| customer.name | order.product |
| --- | --- |
| Bill Bellamy | true |
| Kennedy Montgomery | |
| Peter King | |

`LEFT JOIN` will include everyone right in the first ("left") column in the join clause, even if there's not match in the second column.

## Watch Out!

`RIGHT JOIN` does the same thing as a `LEFT JOIN` but tolerates absences in the second column instead of the first. You can often rewrite a query to use on or the other, but use whichever one makes your query easier to follow.

## Additional Resources

| Resource | Description |
| --- | --- |
| [W3Schools: `LEFT JOIN`](https://www.w3schools.com/sql/sql_join_left.asp) | W3Schools' `LEFT JOIN` reference |
| [SQL Zoo: Using Null](https://sqlzoo.net/wiki/Using_Null) | SQL Zoo's interactive tutorial on `LEFT JOIN` |
Left Join
SQL
Database Column
Database Table
Right Join
[SQL Queries on SQL Bolt](https://sqlbolt.com/lesson/select_queries_introduction)

---

[SQL Zoo Basics](https://sqlzoo.net/wiki/SELECT_basics)

---

[SQL Zoo Basics Quiz](https://sqlzoo.net/wiki/SELECT_Quiz)
* What do the words given to a SELECT statement determine?
* What does `FROM` do?
# SQL: `SELECT`

The most useful type of SQL query is `SELECT`, which has this format:

```sql
SELECT first_name, last_name
FROM user;
```

This means that you want to return the `first_name` and `last_name` columns for every record in the `user` table. You can also use `*` to return every column:

```sql
SELECT *
FROM user;
```

## Watch Out!

* SQL is white-space insensitive. Putting clauses on new lines is a convention for readability, a query doesn't terminate until a `;`.
* It's conventional to put SQL keywords in UPPERCASE and things specific to your database (like column names) in snake_case. This helps the structure of the query stand out from the data.
* Don't forget the semicolon, semicolons are required in all SQL queries

## Additional Resources

| Resource | Description |
| --- | --- |
| [W3Schools: `SELECT`](https://www.w3schools.com/sql/sql_select.asp) | W3Schools' `SELECT` reference |
| [SQL Zoo: `SELECT` basics](https://sqlzoo.net/wiki/SELECT_basics) | SQL Zoo's interactive `SELECT` basics tutorial |
| [SQL Zoo: `SELECT` names](https://sqlzoo.net/wiki/SELECT_names) | SQL Zoo's interactive `SELECT` names tutorial |
SQL
White Space
Database Column
snake_case
[SQL Queries with Constraints 1 on SQL Bolt](https://sqlbolt.com/lesson/select_queries_introduction)

---

[SQL Queries with Constraints 2 on SQL Bolt](https://sqlbolt.com/lesson/select_queries_introduction)

---

[SQL Zoo World](https://sqlzoo.net/wiki/SELECT_from_WORLD_Tutorial)

---

[SQL Zoo BBC Quiz](https://sqlzoo.net/wiki/BBC_QUIZ)

---

[SQL Zoo SELECT card game](https://sqlzoo.net/40289347/sql3)

---

[SQL Zoo Nobel Laureates](https://sqlzoo.net/wiki/SELECT_from_Nobel_Tutorial)

---

[SQL Zoo Nobel Quiz](https://sqlzoo.net/wiki/Nobel_Quiz)
* What do the words given to a SELECT statement determine?
* What does `FROM` do?
# SQL: `WHERE`

SQL statements are made up of several sections called clauses. `SELECT` clauses declare what you want to see and a `FROM` clause declares where to get the data from. The `WHERE` clause declares which data to keep and which data to filter out. For example, if you're trying to get the username and display name for a user with an ID of `3`, you might write this query:

```sql
SELECT username, display_name
FROM user
WHERE id = 3;
```

If you want to search a user by their username:

```sql
SELECT username, display_name
FROM user
WHERE username = 'trumpet_against_darkness';
```

You can also get every user that matches some criteria:

```sql
SELECT *
FROM user
WHERE is_active = 1
```

In each case, the `WHERE` clause filters out records from the `FROM` clause that don't meet the criteria.

## `AND` and `OR`

`AND` allows you to have multiple `WHERE` clauses. Just like boolean logic, `AND` requires both conditions to be true:

```sql
SELECT *
FROM user;
WHERE first_name = 'Miles'
AND last_name = 'Davis';
```

While `OR` requires only one of the conditions to be true:

```sql
SELECT *
FROM user;
WHERE instrument = 'trumpet'
OR instrument = 'guitar';
```

## `NOT`

Ordinarily in a `WHERE` clause, `=` defines the condition. You can also invert conditions with `NOT`:

```sql
SELECT *
FROM user;
WHERE first_name NOT 'Miles';
```

This gives us every `user` whose `first_name` is not `'Miles'`.

## `LIKE`

You can also use `LIKE` and `%` to return partial matches, which is great for searching:

```sql
SELECT *
FROM user;
WHERE last_name LIKE '%vi%';
```

This returns every `user` whose name contains `vi`, such as Marvin and Vivian. You can also restrict it to names that start or end with things by moving the `%`, such as `'Mil%'`, `'%les'`, or `'M%s'`.

## Watch Out!

* String comparisons in SQL must be done with single quotes
* Don't forget the semicolon in SQL statements
* Columns that you use in your `WHERE` clause do not have to also be in your `SELECT` clause. `SELECT` what you want to see in the result, use `WHERE` to determine what to filter on.

## Additional Resources

| Resource | Description |
| --- | --- |
| [W3Schools: `WHERE`](https://www.w3schools.com/sql/sql_where.asp) | W3Schools' `WHERE` reference |
| [W3Schools: `LIKE`](https://www.w3schools.com/sql/sql_like.asp) | W3Schools' `LIKE` reference |
| [W3Schools: `AND` and `OR`](https://www.w3schools.com/sql/sql_and_or.asp) | W3Schools' `AND` and `OR` reference |
| [SQL Zoo: `SELECT` from `world`](https://sqlzoo.net/wiki/SELECT_from_WORLD_Tutorial) | SQL Zoo's interactive `SELECT` from `world` tutorial |
| [SQL Zoo: `SELECT` from `nobel`](https://sqlzoo.net/wiki/SELECT_from_Nobel_Tutorial) | SQL Zoo's interactive `SELECT` from `novel` tutorial |
| [SQL Zoo: `SELECT` within `SELECT`](https://sqlzoo.net/wiki/SELECT_within_SELECT_Tutorial) | SQL Zoo's interactive `SELECT` within `SELECT` tutorial |
| [SQL Zoo: `SUM` and `COUNT`](https://sqlzoo.net/wiki/SUM_and_COUNT) | SQL Zoo's interactive `SUM` and `COUNT` tutorial |
| [SQL Zoo: `SELECT` card game](https://sqlzoo.net/40289347/sql3/) | SQL Zoo's interactive `SELECT` game |
SQL Clause
SQL
SQL FROM Clause
SQL WHERE Clause
SQL AND
SQL OR
SQL NOT
SQL LIKE
Make this component interactive:

```js
function MultipleChoice(){
  const correctAnswer = "B"
  const answer = ""
  const isAnswered = false

  return (
    <div>
      <p>Question text goes here</p>
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
      </ul>
      {
        isAnswered && (
          <p>
            {
              correctAnswer === answer
                ? "Correct!"
                : "Incorrect."
            }
          </p>
        )
      }
    </div>
  )
}
```
* What is state?
* How is state declared in a React component?
* What is returned from the `useState` hook?
* What is the parameter for the `useState` hook?
# React: State

Some components receive their data through props while other components maintain data of their own that can change. Think of:

* Data being entered into forms
* One of multiple options being selected
* Data that comes from an API server

This kind of data is called state. State is any data that can change value over time. To simplest way to manage state in React is with the `useState` hook:

```jsx
import { useState } from "react"

const SomeComponent = () => {
  const [someState, updateSomeState] = useState("Hello, world!")

  console.log(someState) // "Hello, world!"
  updateSomeState("¡Aloha, mundo!")
  console.log(someState) // "¡Aloha, mundo!"
}
```

There are a couple of key elements of this:

1. Importing the `useState` hook, which is a function from the `react` npm library
2. Calling the `useState` hook with an initial value. In this case, it's the string "Hello, world!"
3. This hook evaluates to an array with two elements: A variable representing the state, and a function that will update that state when called. The syntax looks unusual; it's called array destructuring.
4. `someState` is logged, showing its initial value.
5. `updateSomeState` is called with a new value.
6. `someState` is logged again with its new value.

Remember the syntax of array destructuring:

```jsx
const hookArray = useState(0)
const someState = hookArray[0] // 0
const updateSomeState = hookArray[1] // Function that updates the value in hookArray[0]

// Same thing in one line
const [someState, updateSomeState] = useState(0)
```

Some notes on state:

* If something never changes, it's not state. You can still store static values in variables without needing to declare them as state.
* State in one component may be passed into another component as a prop. Whenever the state is updated, it will update the prop as well, causing the component to rerender.

## Additional Resources

| Resource | Description |
| --- | --- |
| [React: State and Lifecycle](https://reactwithhooks.netlify.app/docs/state-and-lifecycle.html) | Official React docs on state |
| [Video: State](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=3769s) | React Hooks Crash Course: State |
| [Video: State as Props](https://www.youtube.com/watch?v=9U3IhLAnSxM&t=5516s) | React Hooks Crash Course: Passing state |
State
React
API Server
React: `useState`
React: Hook
React: Component Rerender
Write responses to each of these reasons not to write tests:

* "Testing takes too long, I feel like I spend more time screwing around with the tests than I do writing code"
* "Unit tests only guarantee that the little parts work, but doesn't verify that any of them work together"
* "We really high test coverage, but we still have lots of bugs and I'm not sure what our tests are actually doing"
* "We don't have time to write tests, the investors really need us to write features"
* "We'll just write the tests later"
* "I'm developer, not a tester!"

---

Describe the following scenarios as unit tests, integration tests, e2e tests, or static tests:

* A guarantee that an addition function only accepts numbers
* A test that opens a web page, clicks a button, and verifies that something appears on the page
* A test that verifies that a function returns the correct values
* A test that verifies that the code for a feature works correctly
* How do tests create confidence?
* How do tests serve as documentation?
* Why does it save time to have tests run code?
* Describe the difference between unit, integration, and E2E tests
* What is a static test?
* What is the testing pyramid?
* What is the trophy testing strategy?
* What shouldn't be tested?
* What makes code difficult to test?
# Intro to Testing

Tests verify that something does what you think it does. Some examples of tests:

* Opening an app, clicking a button, checking that the right screen loads
* Console logging that a function is getting called
* Checking that a function runs without changing another value
* Code that automates any of the above

Most developers tests their code, they just do it manually and infrequently and don't keep the tests when they're done. Using dedicated testing tools helps developers write more accurate and expressive tests and gives them real-time feedback about their code.

Tests can be written at any point in the development process, but there are some distinct advantages to using tests as a design tool. This is admittedly counter-intuitive. Writing tests before you write you code forces you to define the interface for the code you want to test, which naturally leads to decoupled and modular designs.

## Why Write Tests?

* **Tests create confidence**. Tests allow you to fearlessly change your code. You can delete files, rework implementations, and try alternatives and get instant feedback from your tests about what is no longer working. Without this feedback, developers become afraid to change or remove things, and even start creating duplicate implementations out a fear of breaking something.
* **Test are documentation**. Tests are executable examples of how your code works. Since it's not possible for your tests and your actual code to get out of sync, tests end up more reliable than prose documentation.
* **Tests run your code.** One of the most time-consuming parts of developing software is manually testing code as you're writing it. Tests do this automatically.

## Why Don't Developers Write Tests?

If automated tests are so valuable, why do developers resist using them?

* **Developers lack fluency with their testing tools.** A `console.log` is always going to be right there. If installing and configuring testing tools is awkward, if the developer has to look up all the syntax, if they're constantly fighting against the testing tools, they won't get used.
* **Most books, blog posts, and general advice relies too heavily on unit tests.** Unit tests are a valuable part of any testing strategy, but they're often so close to the parts of the code that change the most. This often means throwing away tests nearly as quickly as they're written, which is disheartening.
* **It's hard to know what's actually valuable to test.** The tests that are easiest to write often are the least useful. TDD in particular relies on being able to predict what you'll eventually need, which takes experience.
* **There's always more features to write.** It's easy to fall into the trap of thinking that testing slows down development. It often does... at first. As soon as the app gets too big for developers to hold the in their heads at the same time, tests are the only thing that will enable speed.
* **Adding tests to legacy code is difficult**. One of the advantages of writing tests first is that it encourages writing modular, testable code. It follows that without tests, it's easy to write highly coupled code that can't be isolated for tests.
* **Developers think testing is for testers.** There's a pervasive belief that testing is a skill that requires a particular mindset that only some possess. This is untrue, any developer can learn to write great tests. Additionally, many developers feel that testing is beneath them and should be farmed out to dedicated testing teams. Remember, tests don't only verify behavior; they also run and document the code and provide real-time feedback to the developer.

## What Gets Tested?

While definitions and divisions vary between testers, these are most commonly used levels of test:

* **End-to-End (E2E)**: Sometimes called or feature or UI tests, these simulate how a user uses an application. For web apps, this means opening a browser, going to a URL, clicking and typing, and asserting that things are visible on the string.
* **Integration**: These test significant pieces of your app, like features. These are generally combinations of smaller pieces of code (like units), and are tested by isolating that part of the code and asserting that they behave as expected.
* **Unit**: Unit tests are for the smallest parts of your code like functions and methods. They assert that correct values are returned or correct state changes occur under particular circumstances.
* **Static**: These are done via types. A lot of potential errors can be eliminated by limiting what types are allowed to be used in your code.

Historically, these were described as a pyramid. Unit tests are fast and specific and E2E tests are slow and general, so you were supposed to target a lot of unit tests and not as many integration or E2E tests. In modern development, the "trophy" strategy advocated by Kent C. Dodds is preferred. Trophy testing has a smaller proportion of unit and E2E tests, and primarily relies on integration tests.

At each level of test, the goal is the same: Describe how the code should work. This is often as simple as automating what you would manually do to verify that something works. For example, if you have a list of items, you may want to verify that you can add new items to it. If you were doing that manually, you might follow these steps:

1. Go to the list page
2. Verify that there are only 3 items on it
3. Click the link to add a new item
4. Fill out the form to add a new item
5. Verify that you were redirected back to the list page
6. Verify that there are 4 items on the list and the last one is the item you just entered

Written as an E2E test in Playwright, that might look like this:

```js
describe("list page", () => {
  it("adds items to an existing list", async ({ page }) => {
    await page.goto("/list")

    const items = await page.$$(".item")
    expect(items).toHaveLength(3)
    await page.click("text=New")

    await page.fill("[placeholder=New item here]", "New Item")
    await page.click("text=Add")

    expect(page.url).toContain("/list")
    const newItems = await page.$$(".item")
    expect(newItems).toHaveLength(4)
    const content = await newItems[3].textContent()
    expect(content).toBe("New Item")
  })
})
```

A supporting integration test in Jest might verify that the form can be filled out and rejects blank input:

```jsx
describe("<ItemFormNew />", () => {
  it("accepts valid input", () => {
    const submitHandler = jest.fn()
    render(<ItemFormNew submitHandler={submitHandler}>)

    const input = screen.getByLabelText("Content")
    type(input, "New Item{enter}")

    expect(submitHandler).toHaveBeenCalledWith("New Item")
  })

  it("doesn't accept blank input", () => {
    const submitHandler = jest.fn()
    render(<ItemFormNew submitHandler={submitHandler}>)

    const input = screen.getByLabelText("Content")
    type(input, "{enter}")

    expect(submitHandler).not.toHaveBeenCalled()
  })
})
```

A supporting unit test might verify that an individual item renders correctly:

```jsx
describe("<Item />", () => {
  it("renders given content", () => {
    render(<Item content="Hello, world!">)

    const content = screen.getByText("Hello, world!")

    expect(content).toBeVisible()
  })
})
```

In every case, it's also important to note what isn't tested. Don't test internal variables, class names, or anything that a consumer of the code wouldn't care about. You're testing the interface or contract of the code, **not** its implementation. You should be able to completely change an implementation, and as long as the interface is the same the test should still pass. Conversely, if the interface or behavior of the code changes, the tests should fail.

* E2E: Only test things that a user can see and interact with, and try to describe everything in terms a normal user would understand. For example, target a form input by its label or placeholder text, not its tag name or other CSS selector.
* Integration and Unit: Only test parameters, events, public methods, props, or other things a consumer of the code would work directly with. Don't test internal variables, private methods, or other implementation details.

Tests are a conversation with your code. You might not write the correct test the first time, and that's OK. Your tests should shape your code, but it's also OK for your code to influence your tests too. As long as your tests are giving you confidence, documenting how the code works, and running your code, you're writing tests correctly.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Test Automation Panda](https://automationpanda.com/) | Outstanding blog full of articles on testing techniques and philosophy |
| [The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) | Kent C. Dodd's blog post on different types of testing. |
* Testing
* E2E tests
* Integration tests
* Unit tests
* Static tests
* Playwright
* Jest
* Test get/find/query
  * Single and multiple
* Forms can be filled out

* toBeVisible, toBeInDocument, toHaveTextContent
* toHaveValue, toHaveFormValues
* What does Testing Library add to Jest?
* What's the difference between `get`, `find`, and `query` queries in Testing Library?
* `getByRole("region")` will get the first HTML element with an ARIA role of `region`. How do you make it get every one?
* What is the advantage of getting elements by ARIA role?
* What is the advantage of getting form inputs by their label text?
* What is a test ID?
* Which queries are asynchronous in Testing Library?
* What's the difference between a black box assertion and a white box assertion?
* Why are black box assertions preferrable to white box assertions?
## Intro to Testing Library

Jest comes with everything needed to run and make assertions about JavaScript code. However, it doesn't have any tools for making assertions about the DOM. Testing Library is a tool for easily getting elements out of the DOM and making assertions about them.

Testing Library is intended to be a generic base that can be extended for different applications. For example, there are versions of testing library for plain DOM, React, Vue, React Native, Angular, Svelte, and more. All of them use the same concepts and a similar syntax, which makes it easier for developers to move between frameworks.

## Installing

To install the most basic version of Testing Library (vanilla DOM app with the Jest test framework):

```bash
npm install --save-dev @testing-library/jest-dom
```

To use it in your Jest tests, make sure this line is included once per app in the test setup:

```js
import '@testing-library/jest-dom'
```

Additionally, the following ESLint plug-ins will add Testing Library-specific rules to ESLint:

* `eslint-plugin-jest-dom`
* `eslint-plugin-testing-library`

## Getting elements

The most important terms to understand in Testing Library are `get`, `find`, and `query`.

**`get`**: Find an element that's already in the DOM
**`find`**: Find an element that will soon be in the DOM (must be `await`ed!)
**`query`**: Look for an element that shouldn't be in the DOM

All the of them can be modified to find multiple matches by adding `All` to them: `getAll`, `findAll`, `queryAll`.

To get elements from the page, add a query to the end of the query type:

**Form Inputs**:

| Priority | Query | Description |
| --- | --- | --- |
| 1 | `ByLabelText(labelText)` | Matches form inputs by looking at the text of their attached `<label>`s or elements with the `aria-label` attribute |
| 2 | `ByPlaceholderText(placeholderText)` | Matches form inputs by their placeholder text, only use if the input is unlabeled |
| 3 | `ByDisplayValue(currentValue)` | Matches form inputs that currently have the provided value, good for update forms |

**Other Elements**:

| Priority | Query | Description |
| --- | --- | --- |
| 1 | `ByRole(ariaRole)` | Matches elements with the provided ARIA role, can be furthered narrowed by passing the `aria-label` name: `getByRole("header", { name: "primary header" })` |
| 2 | `ByText(text)` | Matches elements containing the provided text. Accepts strings or regex. |
| 3 | `ByAltText(altText)` | Matches images by their alt text |
| 4 | `ByTitle(title)` | Matches elements by their title attribute |
| 5 | `ByTestId(testId)` | Matches elements by their `data-testid` attribute, only use if no other query is appropriate |

For example:

* `getByRole("header")` will return the first element with an ARIA role of `header` and throw an error if it isn't already in the DOM.
* `await findByRole("header")` will do the same thing as `getByRole("header")`, but it will wait up to a few seconds for the element to appear in the DOM. This is useful if something needs to resolve or finish rendering.
* `getAllByText("Hello, world!")` will return every element containing the text "Hello, world!"
* `getByLabelText(/username/i)` will return the first form input with an attached label of "username" (case-insensitive)
* `queryByAltText("happy pig")` will return any images containing the alt text "happy pig", but will not error if it doesn't find any
* `await findAllByTestId("product")` will return every element with an HTML attribute of `data-testid="product"`

## Async DOM Assertions

If you need to wait for an element to show up in the DOM, use a `findBy` query. If you need to assert something asynchronous, use `waitFor` and `waitForElementToBeRemoved`. This retries the assertion for 1 second by default:

```js
const someAsyncSpy = jest.fn()
makeAnAsyncRequest(someAsyncSpy)

await waitFor(() => {
  expect(someAsyncSpy).toHaveBeenCalledTimes(1)
})
```

This waits up to 1 second by default for the queried element to not be in the DOM:

```js
showToastMessage()
await waitForElementToBeRemoved(queryByText("Registered!"))
```

## Jest DOM Matchers

The built-in Jest matchers work with any of JavaScripts native values, but none of them are designed to work specifically with DOM elements. By importing the `@testing-library/jest-dom` package at the beginning of a test file, new Jest matchers are added to `expect` for DOM elements.

### Black Box Assertions

These are common assertions made from a user's perspective:

| Matcher | Purpose |
| --- | --- |
| `expect(someElement).toBeVisible()` | Asserts that something is on the page and not obstructed. |
| `expect(someElement).toBeInTheDocument()` | Commonly combined with `.not` to assert that something isn't on the page. |
| `expect(someElement).toHaveTextContent(someRegexOrString)` | Asserts that an element contains a string or matches a regex. Use `/^text goes here$/` to do a precise match. |

### White Box Assertions

These are a little more dangerous and should be used less often because they look at the page's implementation, not its actual content.

| Matcher | Purpose |
| --- | --- |
| `expect(someElement).toHaveAttribute(attributeName, attributeValue)` | Asserts that an element has an attribute with a particulary value |
| `expect(someElement).toHaveClass(className)` | Asserts that a class is present on an element |
| `expect(someElement).toHaveStyle(someCSSPropertyValuePairs)` | Asserts that an element has any number of CSS styles applied to it |

### Form Assertions

| Matcher | Purpose |
| --- | --- |
| `expect(someFormInput).toHaveValue(someValue)` | Asserts that a form input has a particular value |
| `expect(someFormInput).toHaveFocus()` | Asserts that the form input is currently active |
| `expect(someForm).toHaveFormValues(someNameValuePairs)` | Asserts that the entire form has particular values. The keys of the object will use the `name` attribute of the elements, the values of each of them are the associated values. |
| `expect(someFormInput).toBeChecked()` | Asserts that a checkbox or radio button is selected |

## Watch Out!

* If you're waiting for an element to appear in the DOM, use `find` queries rather than using `waitFor` to wait for the element to show up.
* `query` and `queryAll` queries should only be used to get elements if you're going to assert that something _isn't_ in the DOM.
* `ByRole` should be your default query because it uses the accessibility API to find elements. Always try to use semantic elements rather than putting ARIA roles on non-semantic elements.
* `get` and `find` queries can act like implicit assertions since they throw errors that fail the test if the element isn't present. Additionally using an explicit matcher like `.toBeVisible()` or `.toBeInTheDocument()` helps document the desired behavior better.
* It's possible to extract query functions from the `render` method that are already scoped to the rendered DOM, but you should still prefer querying with the `screen` object to simulate what the user is actually presented with.
* When doing async assertions, use `waitFor` and `waitForElementToBeRemoved` on the assertion, not the behavior that triggers the async behavior.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Guiding Principles](https://testing-library.com/docs/guiding-principles/) | Official principles of Testing Library |
| [Which query should I use?](https://testing-library.com/docs/queries/about/#priority) | Official Testing Library guide to choosing a query |
| [ARIA Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) | MDN's reference on different ARIA roles |
| [Guide to Disappearance](https://testing-library.com/docs/guide-disappearance) | Official testing library guide to working with elements that aren't in the DOM |
* Jest
* Testing Library
* DOM
* ESLint
* Testing Library: `find`
* Testing Library: `get`
* Testing Library: `query`
* Jest Matcher
* Black box testing
* White box testing
* Testing: Assertion
* ARIA Role
Using Jest and RTL, write tests for [React controlled form](https://github.com/sikaeducation/react-controlled-form-no-tests)
* What's the difference between Testing Library and React Testing Library?
* Why can't you just use the `jest-dom` version of Testing Library to test React components?
* How do you add React Testing Library to a CRA app?
* How does Jest know that a file contains tests?
* Why don't `test` and `expect` need to be imported in Jest tests?
* How do make an app rerender in React Testing Library?
* Why should you use `async`/`await` in tests instead of `.then`/`.catch`?
# Testing React Components with Jest and RTL

Testing React components is similar to testing anything with Testing Library and Jest DOM. All of the same queries and matchers are available. Since React uses JSX instead of DOM elements, React Testing Library adds a way to render JSX elements to a fake DOM and then query them.

## Installation and Configuration

### Create React App

If you're using Create React App, `jest`, `@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event` are already installed and configured.

Any file in any directory that ends in `.test.js` will be run when `npm test` is run.

### Existing React Apps

To set up testing for an existing React project, install the following dependencies:

```bash
npm i -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Then define a testing script in the project's `package.json`:

```json
{
  "scripts": {
    "test": "jest src/**/*.test.js"
  }
}
```

## Creating Tests

To create a test, create a file ending in `.test.js`. By convention, it's common to have one test file per component file, and they should both be named the same as the component. For example, a component called `LoginForm` should be in a file called `LoginForm.js` and have a test file called `LoginForm.test.js`. There are no requirements for where any of these files live in the folder hierarchy.

A simple test file imports the component being tested, as well as testing functions as needed:

```jsx
import SomeComponent from "./SomeComponent"
import { render, screen } from "@testing-library/react"

test("Test name goes here", () => {
  render(<SomeComponent>)

  const someElement = screen.getByRole("header")

  expect(someElement).toBeInTheDocument()
})
```

It's not necessary to import `jest`, `test`, `describe`, `it`, `beforeAll`, `beforeEach`, or `expect`. They will added to the environment by Jest when running the tests.

## Basic Parts of React Component Test

The two most critical parts of React Testing Library are `render` and `screen`.

### `render`

Components are added to the test DOM with with the `render` method:

```jsx
render(<p>Hi!</p>)
render(<SomeComponent someProp="Some Value" />
```

Note that you can pass elements, components, and even entire hierarchies into `render`:

```jsx
render(
  <SomeContext.Provider value="Hi!">
    <div>
      <SomeComponent someProp="Aloha!" />
    </div>
  </SomeContext.Provider>
)
```

### `screen`

DOM elements are retrieved by querying `screen`:

```jsx
const element = screen.findByRole("Heading")
```

This element is a regular DOM element rather than a component instance. Rather than running assertions on parts of the element, it's common to use the Jest matchers that are added by `@testing-library/jest-dom`.

## Rerendering

Occasionally, it may be useful to test how a component re-renders. To do this, destructure the `rerender` function out of the original call to `render`. This `rerender` function accepts a new JSX element.

```jsx
import { render, screen, waitFor } from "@testing-library/react"
import { click } from "@testing-library/user-event"
import SomeComponent from "./SomeComponent"

test("loads and displays greeting", async () => {
  const { rerender } = render(<SomeComponent url="/greeting" />)

  expect(screen.getByRole('heading')).toHaveTextContent('hello there')

  rerender(<SomeComponent url="/greeting" />)

  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
})
```

## Running Tests

To run tests, run `npm test`. The `jest` test runner will automatically keep running and wait for changes and rerun the tests in response.

## Watch Out!

* `@testing-library/jest-dom` (which adds DOM matchers to Jest) is automatically imported into each test with Create React App, but must be added if you're configuring testing manually.
* `render` is a function, `screen` is an object
* You only need to `waitFor` one thing, even if you're waiting for multiple changes to render.
* Async tests can either use `async`/`await` or just return a promise, but shouldn't do both.
* Within tests, always use `async`/`await` rather than `.then`/`.catch`. The enhanced readability of error handling in `.then`/`.catch` chains isn't useful in tests since all errors are automatically handled by the testing framework.

## Additional Resources

| Resource | Description |
| --- | --- |
| [CRA: Running Tests](https://create-react-app.dev/docs/running-tests/) | Create React App's guide to testing |
| [Configuring Jest](https://jestjs.io/docs/configuration) | Guide to configuring Jest |
| [Common Mistakes With React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) | Kent C. Dodds' blog post on React Testing Library usage |
* Testing Library: Query
* Testing Library: Matcher
* JSX
* DOM
* React Testing Library: `render`
* React Testing Library: `screen`
* React Component
* Rerender
Add tests for [React User Profile Context](https://github.com/sikaeducation/react-user-profile-context)
* What does the `render` method of React Test Library accept?
* Why is it necessary to include the provider when testing a component that uses context?
* When does a React component need to have a context provider wrappped around it for testing?
# Testing React Context

To test a component that consumes a context, wrap the component being tested in a context provider when it's rendered:

```jsx
import SomeContext from "./some-context"
import ComponentBeingTested from "./ComponentBeingTested.js"

test("Something", () => {
  render(
    <SomeContext.Provider value="Hi">
      <ComponentBeingTested />
    </SomeContext.Provider>
  )
})
```

If the `ComponentBeingTested` uses the `useContext` hook with `SomeContext`, it will have access to `"Hi"` since the context provider is its tree.
* React Context
* React Context Provider
* React: `useContext`
* React: Component Tree
Write a `user-event` string that types the word "me test", and then:
  * Uses the home key to go the beginning of the line
  * Uses the shift and arrow keys to highlight the word "me"
  * Uses control and `x` to cut it
  * Deletes the extra space
  * Use the end key to go the end of the line
  * Add a space to it
  * Uses control and `v` to paste "me"

---

Complete [Sudoku Solver]()
* Why should you use the `user-event` library instead of using Testing Library's built-in `fireEvent`?
* How do you press a modifier key in a `user-event` string?
* How do you add delays between keystrokes to simulate typing in `user-event`?
* If you add delays to an action in `user-event`, what do you always have to do?
* How do you release a modifier key in a `user-event` string?
# Testing User Actions with Jest

To take actions on an app, use the `userEvent` library:

## Installation

```bash
npm install --save-dev @testing-library/user-event
```

Once installed, each action can be imported from `@testing-library/user-event`:

```js
import {
  click,
  type,
} from "@testing-library/user-event"
```

## Events

### Form Events

| Action | Notes |
| --- | --- |
| `type(inputElement, text)` | The text can also a variety special characters to represent keys that can't be displayed, like enter. Accepts an options object as a third argument that can be used to add time between keystrokes. |
| `upload(inputElement, file)` |  Mock files can be created using the `File` API |
| `clear(inputElement)` | Removes the contents of an `<input />` or `<textarea>` |
| `selectOptions(selectElement, values)` | Given an array of string values, selects each matching option from a `<select>` element |
| `deselectOptions(selectElement, values)` | Given an array of string values, deselects each matching option from a `<select>` element |

### Other Events

| Action | Notes |
| --- | --- |
| `click(element)` | Clicks the element |
| `dblClick(element)` | Double clicks the element |
| `keyboard(text)` | Enters characters without first focusing an element |
| `tab()` | Simulates pressing the tab key without focusing an element first. Take options object as an argument. In the object, `shift` is a boolean for whether the shift key should be held to reverse tab order, `focusTrap` is an element that tabbing should be restricted to. |

## Special Typing Characters

Add these to text strings to simulate pressing the keys:

* `{enter}`
* `{esc}`
* `{backspace}`
* `{del}`
* `{arrowup}`, `{arrowright}``{arrowdown}``{arrowleft}`

You can also use modifiers. These will stay "held down" until explicitly released:

* `{shift}`
* `{control}`
* `{alt}`
* `{meta}`
* `{capslock}`

To release a modifier, but a slash in the first position (eg. `{/shift}, `{/control}`)

```js
const input = screen.getByRole("textinput")
type(input, "{shift}{arrowright}{arrowright}{/shift}{del}")
```

## Watch Out!

* You can't use `{shift}` and `{/shift}` to capitalize characters, just type the actual character case you want to use
* Adding delays to typing makes the action async
* There's a built-in DOM event library in `js-dom` called `fireEvent`. It works like this:

```js
fireEvent.click(someElement, eventDetails)
```

This requires very low-level mocking that gets dangerously close to reimplementing browser functionality. `userEvent` should be preferred for app testing.

## Additional Resources

| Resource | Description |
| --- | --- |
| [User Event](https://testing-library.com/docs/ecosystem-user-event/) | Official User Event docs |
| [Special Characters](https://testing-library.com/docs/ecosystem-user-event/#specialchars) | A list of all of the special characters that can be typed with User Event |
| [MDN: File](https://developer.mozilla.org/en-US/docs/Web/API/File/File) | Documentation on the `File` API |
* Testing Library: `user-event`
* Testing: Mock
* Key modifiers
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
* What 3 questions should every test name answer?
* What are the distinguishing characteristics of RSpec-style naming?
* What is the difference between `describe` and `it` when using RSpec-style tests?
* What is the distinguishing characteristic of XUnit-style names?
# Test Naming

Test names should describe:

* What's being tested
* What behavior it should be have
* Under which conditions

Traditional test names fall into 3 different styles: Simple, RSpec, and xUnit.

## Naming Styles

### Simple Test Naming

A simple test follows the format `{name of what's being tested} {result} {behavior}`.

```js
test("add returns sum when given two positive integers", () => {
  // Test code
})
```

Test names are typically written in present tense declarative.

### RSpec-style Naming

RSpec-style naming typically uses `describe` blocks to group tests by things like class and method, and `it` blocks to describe individual test cases.

```ruby
describe Math do
  describe "#add" do
    it "should return sum when given two postive integers" do
      # Test code
    end
  end
end
```

This case should be read as as "Math#add should return sum when given two positive integers". By convention, static methods start with `.` and instance methods start with `#`. Additionally, it's common to start each test case with the word "should".

### xUnit-style Naming

Frameworks like `JUnit` and `xUnit.NET` are designed for OOP code, and each test case is written as an instance method. By convention, the names are written in three sections separated by underscores, such as `MethodBeingTested_ExpectedResult_Condition`.

```java
class MathTests extends Math {
  public void Add_ReturnsSum_WhenGivenTwoPositiveIntegers(){
    // Test code
  }
}
```

## Watch Out!

* The purpose of the naming guidelines is to help reduce the cognitive load of coming up with test naming conventions. jUltimately, as long as the test names communicate what the test is doing, don't worry too much if your tenses are correct or the name follows a precise pattern.
* Describe the behavior that's being tested, don't just repeat the contents of the assertion. "Add returns the sum of two positive integers" is a better test name that "Add returns 2 when given 1 and 1".
* RSpec
* xUnit
* Instance Method
* Static Method
For the following test cases, organize them using nesting and `before` handlers

```js
test("Delivery estimate is calculated when user is in the delivery zone and has an account in good standing", ({ page }) => {
  page.goto("/delivery")
  const customer = getCustomer("good", "90210")
  const store = getStore("90210")

  expect(getDeliveryEstimate(customer, store)).toBeTruthy()
})
test("Delivery estimate is not calculated when user isn't in the delivery zone but has an account in good standing", () => {
  page.goto("/delivery")
  const customer = getCustomer("good", "10000")
  const store = getStore("10000")

  expect(getDeliveryEstimate(customer, store)).not.toThrow()
})
test("Delivery estimate is not calculated when user is in the delivery zone but the account isn't in good standing", () => {
  page.goto("/delivery")
  const customer = getCustomer("bad", 90210)
  const store = getStore("90210")

  expect(getDeliveryEstimate(customer, store)).not.toThrow()
})
```
* What are the benefits of nesting `describe` and `context` blocks?
* What are the disadvantages of nesting `describe` and `context` blocks?
* Describe two strategies for organizing test files
* What makes Jest recognize a file as a test file?
* What does `beforeEach` do in Jest?
* What does `beforeAll` do in Jest?
* Describe the relationship between DRY and test code
* What is given/when/then in testing?
* What is the difference between `describe` and `context` in Jest?
* What's wrong with `afterEach`?
* Why do tests need to be order independent?
# Test Organization with Jest

## Levels of Organization In Tests

Test organization happens on 3 levels: The file system, within a test file, and within a test.

## Organizing Test Files

Files are the primary unit of test organization. In Jest, every test file must end in `.test.js` to be recognized by the test runner, but aside from that the test files can be placed anywhere. Here are some suggestions:

* Keep test files in the same directory as the code they test. This makes them easy to find, which means they'll be more likely to be read and maintained. This is especially useful for unit and component tests, where it's easy to maintain a 1-to-1 correspondence between code files and test files.
* Keep all test files in a separate folder from the source code. This keeps both folder hierarchies less noisy and makes it easier to jump between different test files. This is especially useful for E2E and integration tests that aren't associated with any particular part of the source code.
* Split tests into separate folder hierarchies for unit, integration, and E2E tests files.
* Organize test files by putting them in directories named after the features they're primarily used in.

You can also mix and match these into your own strategy. All of these are equally valid approaches, just make sure they make sense for the kind of code you're testing and you apply your file organization strategy consistently so other developers can find the files.

## Organizing Within Test Files

The only level of organization test files are required to have is calling `test()` or `it()` to declare test cases. There are even [strong arguments](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing) for why intentionally keeping the organizational complexity low improves test readability. That said, there are some structures built into Jest that may improve your test code.

### Grouping Tests with `describe()` and `context()`

To group tests, wrap them in a `describe` or `context` function:

```js
describe("Bank ledger", () => {
  context("Starting with a positive balance", () => {
    it("allows withdrawals up to the balance", () => {
      // Test code
    })
    it("doesn't allow withdrawals over the balance", () => {
      // Test code
    })
  })
  context("Starting with a zero balance", () => {
    it("doesn't allow withdrawals", () => {
      // Test code
    })
  })
  context("Starting with a negative balance", () => {
    it("doesn't allow withdrawals", () => {
      // Test code
    })
  })
}
```

Creating a hierarchy like this allows for tests to easily reuse setup with `before` and `beforeEach` calls and is common in BDD-style testing. It can make it easier to see what is and isn't being tested from a high level, but it's also harder to see what any one test case is doing since it requires so much additional context.

### Setting Up Tests With `beforeEach()` and `beforeAll()`

Jest ships with two functions that allow you to run setup code before each of your tests. `beforeAll()` runs once before any of your tests, `beforeEach()` runs before every once of your tests. These can either run for the entire file or for a particular `describe` or `context` block.

```js
describe("Bank ledger", () => {
  beforeAll(() => createBankAccount())
  beforeEach(() => {
    resetBankAccount()
  })

  context("Starting with a positive balance", () => {
    beforeEach(() => {
      setBalance(10000)
    })
    it("allows withdrawals up to the balance", () => (/* Test code */))
    it("doesn't allow withdrawals over the balance", () => (/* Test code */))
  })
  context("Starting with a zero balance", () => {
    beforeEach(() => {
      setBalance(0)
    })
    it("doesn't allow withdrawals", () => (/* Test code */))
  })
  context("Starting with a negative balance", () => {
    beforeEach(() => {
      setBalance(-10000)
    })
    it("doesn't allow withdrawals", () => (/* Test code */))
  })
}
```

Extracting this kind of test setup into `before` hooks is common in BDD, but hurts test readability. Application code generally strives to be DRY and abstract out all shared code. In contrast, since tests need to function as documentation it's desirable to repeat yourself often so that everything needed to understand the test is in one place. For example, compare these two approaches:

```js
describe("Bank ledger", () => {
  beforeAll(() => createBankAccount())
  beforeEach(() => {
    resetBankAccount()
  })

  context("Starting with a positive balance", () => {
    beforeEach(() => {
      setBalance(10000)
    })
    it("allows withdrawals up to the balance", () => (/* Test code */))
    it("doesn't allow withdrawals over the balance", () => (/* Test code */))
  })
}
```

vs.

```js
beforeAll(() => createBankAccount())

test("Bank ledgers with positive balances allow withdrawals up to the balance", () => {
  resetBankAccount()
  setBalance(10000)
  // Test code
})

test("Bankledgers with positive balances don't allow withdrawals over the balance", () => {
  resetBankAccount()
  setBalance(10000)
  // Test code
})
```

Both test suites are the same, but the second one is much easier to follow. Don't be afraid of repeating yourself and avoid hasty abstractions.

## Within Tests

Within a test, keep the arrangement of conditions, action execution, and assertion separate. This helps tests from doing too many things at once. Another way to think of these is Given/When/Then:

* Given the system being tested is in a particular state
* When a certain action is taken
* Then a particular thing happens

For example:

```js
test("Bank ledgers with positive balances allow withdrawals up to the balance", () => {
  // Given I have a correctly setup bank account with a positive balance
  resetBankAccount()
  setBalance(10000)

  // When I withdraw up to my balance
  const cash = withdraw(10000)

  // Then I have that money as cash
  expect(cash).toBe(10000)
})
```

Sometimes `expect` assertions put the action directly in the call:

```js
expect(withdraw(10000)).toBe(10000)
```

There are no hard rules on this. Consider whether having an extra variable makes the test easier or harder to follow. In the above case, it probably hurts readability. In this case it probably helps:

```js
expect(withdraw(10001)).toThrow()
```

Use whichever style has the least noise and the most clarity for that particular test.

### Watch Out!

* Keep test files small, prefer them as a unit of organization over lots of describes and nesting.
* `describe()` and `context()` are the same, as are `it()` and `test()`. `describe` and `it` come from RSpec and a testing philosophy called BDD. `context` and `test` are more agnostic. Use whichever one makes your tests easier to read.
* `describe()` and `context()` functions can be nested within each other to create subgroups of tests. `test()` and `it()` functions always represent individual tests and cannot be nested.
* Any one test can have as many assertions as you like, but be careful about asserting too many things in one test. Each test should represent one reason why the system could fail. If you use multiple assertions in a test, they should all fail for the same reason.
* There are `afterEach` and `afterAll` hooks, but they should be avoided as there is no guarantee they will run. Initial conditions for each test should be ensured either in the test itself or in `beforeEach` and `beforeAll` hooks.
* Tests should be able to run in any order. That means one test shouldn't rely on the state from another test. Use `beforeEach` or manually reset state at the beginning of each to make them order-independent.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Avoid Nesting When You're Testing](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing) | Thoughtful blog post on the benefits of not using abstractions in testing |
* File System
* Test Runner
* E2E Test
* Integration Test
* Unit Test
* Jest
* Jest: `context`
* Jest: `describe`
* Jest: `test`
* Jest: `it`
* Jest: `beforeEach`
* Jest: `beforeAll`
* BDD
* Testing: Given
* Testing: When
* Testing: Then
* Jest: `expect`
Identify all of the parts of these URLs:

* `https://docs.google.com/spreadsheets/d/1Om4PbxYET2HJUAd_ekYYm9jI5fmvoPAlWHKmsOmfIPE/edit#gid=0`
* `https://canvas.school.edu/conversations#filter=type=inbox`
* `https://www.google.com/search?channel=fs&client=ubuntu&q=css+flexbox`
* `https://codesandbox.io/s/optimistic-sun-y8bo8`
* `https://cloud.digitalocean.com/networking/domains?dropletId=229831123&fleetUuid=6552fa926-3ae2-4032-8512-c2d2jn8712d37&i=8f4ba3`

---

Build a URL out of these parts:

* Scheme: HTTPS
* Top-Level Domain (TLD): com
* Subdomain: www
* Domain google.com
* Port: 443
* Path: mail/me
* Query String: secure: true, latest: true
* Fragment: latest
* What part of the URL is the traditional www prefix?
* If you leave off the port in the URL in an HTTP request, what will the port be?
* If you leave off the port in the URL in an HTTPS request, what will the port be?
* What is the purpose of subdomains?
* Define these in your own words:
  * Scheme
  * Top-Level Domain (TLD)
  * Subdomain
  * Domain
  * Port
  * Path
  * Query String
  * Fragment
# URLs

You likely use URLs daily, but do you know what the different parts of the URL mean? URL stands for "Uniform Resource Locator." This means that it's a standardized way to locate resources on the internet- no two HTML pages, images, stylesheets, etc. need to have the same address.

## Anatomy of a URL

![https://mail.example.com:443/topics/promotional#featured?unread=true&mode=dark](assets/url.png)

* **Scheme**: This indicates the "protocol" that the browser will use on the URL. The most common protocols on the web are `http://`, and its more secure variant `https://`.
* **Subdomain**: This allows a website to be split into multiple logical components. Browsers treat each one as a completely separate website, with no history or settings shared between them.
* **Domain**: A nickname for an IP address.
* **Top-Level Domain (TLD)**: This indicates who a URL is registered with, and may indicate how something about its purpose.
  * `.com` - Licensed by [Verisign](https://www.verisign.com/), originally intended for for-profit commercial activity. Today, it's mostly a generic TLD.
  * `.org` - Licensed by [Affilias](https://afilias.info/), originally intended for not-for-profit organizations. Today, there are no restrictions on who may use a `.org` address.
  * `.edu` - Licensed by [Educause](https://www.educause.edu/), this is only licensed to degree-granting accredited institutions.
  * `.gov` - Licensed by the [US General Services Administration](https://www.gsa.gov/), this is only licensed to government entitites.
  * There are hundreds more, and more being added regularly.
* **Port**: This is usually not explicitly used on the consumer web. If left off, it defaults to `80` for HTTP and `443` for HTTPS. It is more common to specify a port when accessing sites on a local network.
* **Path**: Everything after the domain but before the query string. It's common for this to mirror the directory structure of the folder serving the website by default, but this behavior can be customized. If no file name is specified in the path, most servers default to looking for a file called `index.html`.
* **Fragment**: A fragment will scroll the page to the first element that has the fragment as its `id` attribute.
* **Query String**: A set of key/value pairs that are sent to the server. This can be used to send data, filter the results, or otherwise send options along with the request. These aren't encrypted, and can be bookmarked or shared with others.

## Watch Out!

* While it was once common to prefix URLs with `www`, this is just a regular subdomain and does not otherwise confer any special meaning.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: What is a URL?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL) | MDN's article on URLs |
| [Video: How Do URLs work?](https://www.youtube.com/watch?v=OvF_pnJ6zrY) | Techquickie's guide to URLs |
URL
Uniform Resource Locator
Scheme
Subdomain
Domain
TLD
Port
Path
Fragment
Query String
Directory
1. Make a component that keeps track of a count in state
2. Add a button that increments the counter
3. Make a second component that will display the current count
4. Pass the current count into the count display as a prop
# Vue: 1-Way Binding

Data can be passed from a parent component to a child component, and whenever the data changes in the parent it will rerender the child.

```vue
// ParentComponent.vue

<template>
  <ChildComponent :someProp="someState" />
  <Button @click="() => someState += 1"> Increment</Button>
</template>

<script>
import ChildComponent from "./ChildComponent"

export default {
  components: {
    ChildComponent,
  },
  data() {
    return {
      someState: 1,
    }
  },
}
</script>

// ChildComponent.vue
<template>
  <p>{{ someProp }}</p>
</template>

<script>
export default {
  props: {
    someProp: Number,
  },
}
</script>
```

## Watch Out!

It's called 1-way binding for a reason! In the example above, pressing the button changes the state, and that state change is reflected down through the props. We can't also have a button in the child that changes the state in the parent. If a child component needs to change state in its parent, it needs to do it through events. State changes need to happen in the same place the state is held.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: Props](https://v3.vuejs.org/guide/component-props.html) | Official Vue docs on props |
# Vue: 2-Way Binding

Most props in Vue are bound in one direction only- a change in the source is reflected in the destination:

```vue
<template>
  <p>{{ counter }}</p>
  <button @click="() => data += 1">Increment</button>
</template>

<script>
export default {
  data() {
    return {
      counter: 1
    }
  }
}
</script>
```

Any time `counter` is changed, the value in the `<p>` tag updates and that's the single source of truth for what the counter currently is.

With form inputs however, we usually want the binding to go both ways: A change in the state is reflected in the input, *and* a change in the input is reflected in state. In Vue, we do this with the `v-model` property:

```vue
<template>
  <form>
    <input v-model="searchTerm" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: ""
    }
  }
}
</script>
```

Now, the state can be changed from either direction. This is a shorthand for binding the value of the input to state and updating the state on the `change` event.

## 2-way Binding On Components

You *can* use `v-model` on components (not just HTML elements), but it's a little trickier:

```vue
// SomeComponent.vue
<template>
  <form>
    <MyCoolCustomInput v-model:searchTerm="searchTerm" />
  </form>
</template>

<script>
import MyCoolCustomInput from '@/components/MyCoolCustomInput';

export default {
  components: {
    MyCoolCustomInput,
  },
  data() {
    return {
      searchTerm: ""
    }
  }
}
</script>

// MyCoolCustomInput.vue
<template>
  <form>
    <input :value="searchTerm" @input="$emit('update:searchTerm', $event.target.value)" />
  </form>
</template>

<script>
export default {
  props: {
    searchTerm: ""
  }
}
</script>
```

Watch the syntax on that *very* carefully. Some notes:

* `v-model:searchTerm="searchTerm"` - The first `searchTerm` is what the prop will be called in the child component, the second is what it's called in the parent
* The binding on the child component is *1-way*. Bind the value of the HTML element on the child component to whatever you named the prop.
* Fire an event when the child component changes in the format `update:propName`. `v-model` will listen for this change automatically.
* Pass the updated value into the event. You can access this on `<input />` elements with `$event.target.value`.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: Forms](https://v3.vuejs.org/guide/forms.html) | Official Vue docs on 2-way binding |
# Vue: Active States

It's common to indicate certain items in a list as being active. Vue Router even automatically appends an `.active` class to any currently active route. For smaller things like routeless pages, steps in a sequence, or a settings menu, you may have to handle them manually. This is accomplished by keeping track of the active item in state and binding a class to it:

```vue
<template>
    <nav>
      <ul>
        <li>
          <a
            @click.prevent="switch('one')"
            href="#"
            :class="{ active: currentItem == 'one'}"
          >One</a>
        </li>
        <li>
          <a
            @click.prevent="switch('two')"
            href="#"
            :class="{ active: currentItem == 'two' }"
          >Two</a>
        </li>
        <li>
          <a
            @click.prevent="navigate('about-page')"
            href="#"
            :class="{ active: currentItem == 'three' }"
          >Three</a>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      currentItem: 'one',
    };
  },
  methods: {
    switch(destination){
      this.currentItem = destination;
    },
  },
}
</script>
```

This pattern can be combined with dynamic components to create a full routing system.
* Bind a class to state
* Toggle between two classes using a class biding
# Vue: Applying Styles

Classes can be bound to components with a special syntax:

```vue
<template>
  <p :class="{ "this-class-shows-up": ifThisIsTruthy }">
    Hi
  </p>
</template>

<script>
export default {
  computed: {
    ifThisIsTruthy() {
      return true
    }
  },
}
</script>

<style>
.this-class-shows-up {
  color: red;
}
</style>
```

The thing that's bound to the `style` attribute is just a regular key/value object, and you can also supply that object through something like a computed property if it helps clean up the syntax.

You do static and dynamic class bindings at the same time:

```vue
<SomeComponent class="this-will-always-be-here" :class="{ thisMightNotBe: someState }"
```

You can also do ternary expressions inside of arrays to toggle between two classes:

```vue
<SomeComponent :class="[ ifThisIsTruthy ? 'this-class-will-there' : 'otherwise-this-will' ]"
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: Class and Style Bindings](https://v3.vuejs.org/guide/class-and-style.html#class-and-style-bindings) | Official Vue docs on style bindings |
Which of these are valid component names?

* `<CartItem />`
* `<Item />`
* `tab.vue`
* `<cart-item-heading />`
* `<cartItemDisabled />`
* `<AppSidebar />`
* `import BlogPost from "BlogPost";`
* `<StarRating />`
* `user-addr.vue`
* `<comments />`
# Vue: Build Components

A component needs 3 things:

* Name
* File
* Registration

## Names

Vue component names follow a set of rules:

### Components should be multiple words

To ensure compatibility with the web component spec, your component name should be at least two words.

### No snake_case, no camelCase

There are no circumstances where snake_case or camelCase are appropriate for components.

### Variables are PascalCase

Within a script, components should always be written in PascalCase, like this:

```vue
import SomeComponent from "./SomeComponent"

export default {
  components: {
    SomeComponent,
  },
}
```

### File names are either PascalCase or kebab-case

PascalCase is more common due to ease of code completion and because it mirrors the variable usage, but either are acceptable:

```
SomeComponent.vue
some-component.vue
```

### Template names are PascalCase with build tools, kebab-case otherwise

If you're using Vue CLI or webpack, use PascalCase in your templates:

```vue
<SomeComponent />
```

If you're not using a build tool, you'll need to use kebab-case:

```vue
<some-component />
```

### No Abbrevs

Write out the entire word, every time.

### Names go general-to-specific

Instead of `TextFormInput`, name it `FormInputText`. This helps with alphabetization in file directories.

### Use `App` and `Base` as Prefixes

* `App` - Indicates that there should only be one instance of something in the app, such as `AppHeader` and `AppSidebar`
* `Base` - Indicates that something is providing some base functionality or styling and intended to be extended, such as `BaseInput` and `BaseButton`

## File

There are no rules about where files must go, but it's common to separate them into a `views` and `components` folder. There is no technical difference between these, but semantically a view is something that is routed directly to, and a component is anything else. You can nest folders inside of these as needed.

## Registration

In a Vue CLI app, components are registered within a router or directly within the component hierarchy:

```vue
<script>
import SomeComponent from "./SomeComponent"
import SomeOtherComponent from "./SomeComponent"

export default {
  name: "App",
  components: {
    SomeComponent,
    SomeOtherComponent,
  },
}
</script>
```

In an app without a build process, components are registered globally:

```vue
const SomeComponent = {
  template: "<p>Hi!</p>",
}
const SomeOtherComponent = {
  template: "<p>Yo!</p>",
}
const App = {
  template: "<div><some-component /><some-other-component /></div>", // Will look up the registration on render
}

const app = Vue.createApp(App) // Bootstraps the app
app.component('some-component', SomeComponent) // Registers the component
app.component('some-other-component', SomeOtherComponent) // Registers the component
app.mount('#app') // Renders the app inside of a DOM element with the ID "app"
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: Style Guide](https://v3.vuejs.org/style-guide/) | Official Vue style guide |
# Vue CLI

Vue CLI is a great way to maintain a decoupled Vue front-end, or learn and experiment with Vue without needing a build system.

## Installation

```bash
npm i -g @vue/cli
```

## Creating New Projects

`vue create project-name` (You can also use `vue create .` to start new project in the current directory)

Recommendation for beginners:

1. Manually select features
2. Use `j`/`k`/`spacebar` to select:
  * Choose Vue version
  * Babel
  * CSS Pre-processors
  * Linter / Formatter
3. 3.x (Preview)
4. Sass/SCSS (with dart-sass)
5. ESLint + Airbnb config
6. Lint on save
7. In package.json
8. No

## Using Vue CLI

While in a Vue CLI project, you can use the following scripts:

* `npm run serve` - Run a development server
* `npm run build` - Make a production build in the `/dist` directory
* `npm run lint` - Run the linter
Given this data:

```js
[{
  band: "Reel Big Fish"
  instruments: ["guitar", "drums", "bass", "voice", "trumpet", "sax", "trombone"],
},{
  band: "The Weakerthans"
  instruments: ["guitar", "drums", "bass", "voice"],
},{
  band: "Giveton Gelin Quintet"
  instruments: ["piano", "drums", "bass", "trumpet", "sax"],
},{
  band: "Deadmau5"
  instruments: ["computer"],
},{
  band: "311"
  instruments: ["drums", "guitar", "bass", "voice", "turntable"],
}]
```

Generate a computed property that returns all unique instruments.
* What does derivative state mean?
* Why shouldn't you use watchers?
* What is an alias?
# Vue: Computed Properties

Computed properties are derivative state, and an understanding of them is critical to good component design. At a simple level, they just return values that are available elsewhere in your component and in your templates:

```vue
<template>
  <h1>{{ heading }}</p>
  <p>{{ message }}</p>
</template>

<script>
export default {
  computed: {
    heading() {
      return "Toyota"
    },
    message() {
      return `${this.heading}: Let's go places`
    },
  },
}
</script>
```

In practice, they serve several useful purposes.

## Working with lists

Lists are often presented in a variety of ways. The same data may be sorted differently, have properties added or removed, or be filtered. These presentations aren't different states, they're different derivatives of the same state. Computed properties can help:

```vue
<script>
export default {
  computed: {
    pokemon() {
      return this.$store.state.pokemon
    },
    pokemonSorted() {
      return this.pokemon.sort()
    },
    pokemonGrass() {
      return this.pokemon.filter(p => p.type === "grass")
    },
    pokemonEveryOther() {
      return this.pokemon.filter((_, index) => index % 2 === 0)
    },
  },
}
</script>
```

Any of these can be iterated through in templates. Changes to the source state will cause them to recalculate when used.

## Keeping components declarative

One of the earliest traps developers fall into with components is trying to manually manage reactive state:

```vue
<script>
export default {
  data() {
    return {
      firstName: "Kyle",
      lastName: "Coberly",
      fullName: "Kyle Coberly",
    }
  },
  watch: {
    firstName(newFirstName){
      this.fullName = `${newFirstName} ${this.lastName}`
    },
    lastName(newLastName){
      this.fullName = `${this.firstName} ${newLastName}`
    },
  }
}
</script>
```

If you find yourself reaching for a watcher, stop! There's almost always a better way to represent what you're doing with a computed property instead:

```vue
<script>
export default {
  data() {
    return {
      firstName: "Kyle",
      lastName: "Coberly",
    }
  },
  computed: {
    fullName(){
      return `${this.firstName} ${this.lastName}`
    },
  },
}
</script>
```

## Aliasing

When you pass an object into a component, it can be cumbersome to drill into the component everywhere you use it:

```vue
<template>
  <div>
    <p>{{ user.username }}</p>
    <p>{{ user.name }}</p>
    <p>{{ user.company }}</p>
  </div>
</template>
```

You can use computed properties to alias these properties, which makes their usage read a little cleaner:

```vue
<template>
  <div>
    <p>{{ username }}</p>
    <p>{{ name }}</p>
    <p>{{ company }}</p>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  computed: {
    username() {
      return this.user.username
    },
    name() {
      return this.user.name
    },
    company() {
      return this.user.company
    },
  },
}
</script>
```

This is extra useful when working with Vuex or services:

```vue
<script>
export default {
  computed: {
    user() {
      return this.$store.state.currentlyLoggedInUser
    },
    pokemon() {
      return this.$store.state.pokemon
    },
  },
}
</script>
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: Computed Properties](https://v3.vuejs.org/guide/computed.html) | Official Vue docs on Computed Properties |
# Vue: Conditional Rendering

Conditionally rendering in Vue templates is achieved through `v-if`, `v-else-if`, and `v-else` directives. Their use closely mirrors the `if`/`else if`/`else` syntax in JavaScript:

```vue
<template>
  <div v-if="someConditionIsMet">Something</div>
  <p v-else-if="someOtherConditionIsMet">Something Else</p>
  <span v-else>Something Else</span>
</template>

<script>
export default {
  computed: {
    someConditionIsMet() {
      return false
    },
    someOtherConditionIsMet() {
      return true
    },
  },
}
</script>
```

This example would render:

```html
<p>Something Else</p>
```

Notes:

* The bindings for the directives are looked up on the component. You can also do arbitrary JS expressions (eg. `<ul v-if="list.length > 0">`).
* The elements you put the different directives on don't need to be the same, but they should be at the same level of hierarchy
* You can have as many `v-else-if` conditions as you want
* `v-else` doesn't accept any arguments
# Vue Dev Tools

## Installation

Vue 3 may not work with the normal dev tools from the browser app stores.

### Firefox

Use the [releases](https://github.com/vuejs/vue-devtools/releases) directly:

* Click on the latest release
* Click on the `.xpi` file
* Approve the permisions for your browser

### Chrome

Install the [beta channel](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)

---

You should have a new tab on your dev tools when you're on a Vue app.

## Usage

The most common reasons you would pull open the Vue Dev Tools:

* **To see the component hierarchy.** In the regular element inspector, you only see the rendered HTML. The component hierarchy as you originally made it shows up in Vue Dev Tools.
* **To inspect the current state of props, computed properties or state.** When you click on any individual component, you'll see what all of its current values are. You can also edit them manually from here.
* **To inspect events.** If you switch from "Inspector" to "Timeline" in the settings, you'll see a chart of every event (including regular DOM events). If you click on one, you can see all the relevant data about it, including who fired it and any data that was sent with it.
* **Seeing which component an element is in.** If you click the "target" icon, you can click something in the UI to see the component it's in (you can also do this by right-clicking and picking "Inspect Vue component" from the context menu).
* **See your current route hierarchy (Vue Router only).** Useful for figuring out which components came with which routes.
* **Time-travel your global state (Vuex only).** You can time-travel your Vuex state backward and forward from the dev tools.

## Watch Out!

It only works on development versions of Vue. If you've done a minified build, the plug-in turns off automatically.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue Dev Tools](https://github.com/vuejs/vue-devtools) | Official Vue Dev Tools documentation |
# Vue: Dynamic Components

Sometimes the type of component you're rendering is determined dynamically. There's a special built-in component fittingly called `<component />`. It takes an `:is` attribute binding that determines the name of the component it will render:

```vue
<template>
  <component :is="dynamicComponentName" />
</template>

<script>
import ComponentOne from './ComponentOne'
import ComponentTwo from './ComponentTwo'
import ComponentThree from './ComponentThree'

export default {
  components: {
    ComponentOne,
    ComponentTwo,
    ComponentThree,
  },
  computed: {
    dynamicComponentName() {
      return "ComponentTwo"
    },
  },
}
</script>
```

## Common Patterns

### Grouping Props

You can pass props into a dynamic component, but you can easily run into a situation where different components need different props:

```vue
<template>
  <component
    :propForComponentOne="someState"
    :propForComponentTwo="someOtherState"
  />
</template>
```

You can abstract these into a single "data" prop that has different shapes:

```vue
<template>
  <component :is="componentName" :data="currentComponentPropsData" />
</template>

<script>
export default {
  data() {
    return {
      componentName: "ComponentTwo",
    }
  },
  computed: {
    currentComponentPropsData() {
      const props = {
        ComponentOne: {
          message: "Hi!",
        },
        ComponentTwo: {
          heading: "Welcome!",
        },
      }

      return props[this.componentName]
    },
  }
}
</script>
```

## Watch Out!

Watch the capitalization! `<component />` is the built-in, not `<Component />`.
# Vue: Events

## In templates

You attach event handlers in Vue with the `@` syntax:

```vue
<template>
  <button @click="handleClick"></button>
</template>

<script>
export default {
  methods: {
    handleClick(event){
      // Behavior
    }
  }
}
</script>
```

Like binding, this has a longer syntax: `v-on:click="handleClick"`. The syntaxes are otherwise equivalent, and you should always use the `@` syntax. Note that unlike React, you can attach listeners to HTML elements *and* components.

### Passing in arguments

In addition to giving the event a method, you can alternately invoke the method and pass in any other arguments you want:

```vue
<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <button @click="handleClick(item)"></button>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    handleClick(item){
      // Behavior
    }
  }
}
</script>
```

If you need to pass something in and have access to the original event, you can pass in the special `$event` argument:

```vue
<template>
  <button @click="handleClick"></button>
  <button @click="handleClick($event)"></button> // Same as above
  <button @click="handleClick($event, item)"></button> // With other arguments
  <button @click="handleClick(item, $event)"></button> // Position isn't important
</template>
```

## Types of events

All normal DOM events have Vue equivalents:

* `@click`
* `@submit`
* `@keydown`
* `@focus`
* `@change`
* [DOM Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)

There are also built-in modifiers for common tasks:

```vue
<template>
  <form @submit.prevent="formHandler"></form>       // Adds `event.preventDefault()`
  <buton @click.stop="buttonHandler">Click</button> // Adds `event.stopPropagation()`
  <buton @click.self="buttonHandler">Click</button> // Only fires if this element fired the event, not a child
</template>
```

## Custom Events

You can also fire custom events from components with `this.$emit`:

```vue
//NewButton.vue
<template>
  <button @click="addNew">New</button>
</template>

<script>
export default {
  name: "NewButton",
  methods: {
    addNew() {
      this.$emit("add-new", "Any parameters", { you: "want" })
    },
  },
}

//ItemForm.vue
<template>
  <new-button @add-new="addNew" />
</template>

<script>
export default {
  name: "ItemForm",
  methods: {
    addNew(someString, someObject) {
      // Whatever
    },
  },
}
</script>
```

This is the primary way you communicate from child components to parent components.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: Multiple Event Handlers](https://v3.vuejs.org/guide/events.html#multiple-event-handlers) | Official Vue docs on event handling |
# Vue: Fetch

It's common for a component to require external data over an API. Vue doesn't require any special syntax for this- you can use `fetch`, `axios`, or any other HTTP library. For a fetch that happens when a component loads, these should go in the `created` hook for a component:

```vue
<script>
export default {
  data() {
    return {
      pokemon: [],
      error: null,
    }
  },
  created() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(response => response.json())
      .then(response => {
        this.pokemon = response.results
      }).catch(error => {
        this.error = error.message
      })
  },
}
</script>
```

## Watch Out!

Vue lifecycle hooks do _not_ block rendering. In the example above, the component will first render with `this.pokemon` as `[]`, and then when the fetch completes it will render a second time with `response.result`. This requires defaulting data to something of the same type.

This means you need to account for loading spinners, etc. in your template logic:

```vue
<template>
  <p v-if="error">{{ error }}</p>
  <ul v-else-if="pokemon.length > 0">
    <li v-for="p in pokemon" :key="p.id">{{ pokemon.name }}</li>
  </ul>
  <LoadingSpinner v-else />
</template>
```
# Vue: Form Submission

This is an example of handling a form submission in Vue:

```vue
<template>
  <p v-if="!result">{{ result }}</p>
  <form v-else @submit.prevent="search">
    <label for="search-term">Search Term</label>
    <input id="search-term" v-model="searchTerm" />

    <input type="submit" value="Search!" />
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: "",
      searchTerm: "",
      result: ""
    }
  },
  methods: {
    search(){
      this.error = ""
      const body = {
        search_term: this.searchTerm,
      }

      post("http://search-url.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then(response => response.json())
      .then(response => {
        this.result = response.result
      }).catch(error => {
        this.errorMessage = error.message
      })
    },
  },
}
</script>
```

## Parts of a Form Submission

### Attaching Event Handler

```vue
<form @submit.prevent="methodToHandleSubmissionEvent">
```

The browser will try to handle the HTML form submission on its own, so we need to call `event.preventDefault()` to keep that from happening. The `.prevent` syntax will do that automatically.

Also, make sure you handle form submission with the `@submit` event on the form, not the `@click` event of the submit button.

The value of the attribute is the name of the method you want to fire when a submission occurs.

### Getting the Form Data

While you can get the form data manually with `event.target`, it's more Vue-like to ignore the DOM and pull the data directly out of the bindings:

```vue
<script>
export default {
  data() {
    return {
      searchTerm: "",
      sortOrder: "ASC",
    }
  },
  props: {
    userId: Number,
  },
  methods: {
    search(){
      const body = {
        search_term: this.searchTerm,
        sort_order: this.sortOrder,
        user_id: this.userId,
      }
    },
  },
}
</script>
```

### Make the request

Vue is indifferent to how this is done. You can use native `fetch`, `axios`, or the HTTP library of your choice:

```js
post("http://search-url.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ some_key: this.someValue }),
}).then(response => response.json())
```

### Handle Errors

Lastly, handle errors. Any HTTP connection can fail for reasons outside your control; you want to control what your application will do when it does. It's common to have a field that shows up if an error is present, and is reset on subsequent retries:

```vue
<template>
  <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: "",
    }
  },
  methods: {
    search(){
      this.errorMessage = ""

      post("something-that-fails.com")
        .catch(error => {
          this.errorMessage = error.message
        })
    },
  },
}
</script>
```
Using this array:

```js
[{
  id: 1,
  label: "Apple",
},{
  id: 2,
  label: "Banana",
},{
  id: 3,
  label: "Carrot",
}]
```

Render each one in a list item.
# Vue: Iteration

Iteration in templates is achieved through the `v-for` directive:

```vue
<template>
  <ul>
    <li
      v-for="item in list"
      :key="item.id"
    >{{ item.content }}</li>
  </ul>
</template>
```

The syntax is similar to JavaScript's `for..in` statement. Some notes:

* You *must* include the `:key` binding, which needs to be set to some unique value. IDs are a natural choice, but in the absence of an available ID any unique attribute will do.
* If you also need the index, you can get it like so: `v-for="(index, item) in list"`
* The item and the index in a `v-for` are scoped to the element you put the directive on and anything inside of them

## Common Patterns

### Including a default option

You can _also_ hard-code items in a list, including multiple lists, etc. This is especially common for making disabled defaults in drop-downs or separators:

```vue
<template>
  <select>
    <option disabled>Please select an option below:</option>
    <option disabled>North America</option>
    <option v-for="countries in northAmericanCountries" :key="country.code">{{ country.name }}</option>
    <option disabled>Europe</option>
    <option v-for="countries in europeanCountries" :key="country.code">{{ country.name }}</option>
  </select>
</template>
```

## Watch Out!

### Don't use the index as the key

It may be tempting to make the key the index:

```vue
<li v-for="(item, index) in list" :key="index"></li>
```

This doesn't work. Don't do it. Vue uses these keys to figure out which items to re-render, and it can't do that if the key is generated by the looping mechanism itself.

### Make sure the `:key` is bound

It's easy to forget the binding in the template:

```vue
<li v-for="item in list" key="item.id"> // No!
<li v-for="item in list" :key="item.id"> // Yes!
```

If you leave off the `:`, you'll set the key to the static string `"item.id"`, which is not what you're looking for.

### Don't combine `v-if` and `v-for`

The same element should never have a `v-if` *and* a `v-for`:

```vue
<template>
  <ul>
    <li
      v-for="item in list"
      :key="item.id"
      v-if="list.length > 0"
    >{{ item.text }}</li>
  <ul>
</template>
```

Instead, try to split them up:

```vue
<template>
  <ul v-if="list.length > 0">
    <li
      v-for="item in list"
      :key="item.id"
    >{{ item.text }}</li>
  <ul>
</template>
```

Or use a computed property to make a custom list:

```vue
<template>
  <ul>
    <li
      v-for="item in activeList"
      :key="item.id"
    >{{ item.text }}</li>
  <ul>
</template>

<script>
export default {
  computed: {
    list() {
      return [...]
    },
    activeList() {
      return this.list.filter(item => item.isActive)
    },
  },
}
</script>
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: Lists](https://v3.vuejs.org/guide/list.html) | Official Vue docs on lists |
# Vue: Lifecycle Hooks

There are technically 8 lifecycle hooks in Vue:

* `beforeCreate`
* `created`
* `beforeMount`
* `mounted`
* `beforeUpdate`
* `updated`
* `beforeUnmount`
* `unmounted`

These describe moments in the "lifecycle" of a Vue component that you can "hook" into.

In practice, the only one you're likely to need in most circumstances is `created`. This is where `fetch`es that should fire off as soon as a component loads go, and most other setup tasks.

## Using a lifecycle hook

These methods already exist on every Vue component, so you're just overriding them when you declare them on a component. They go at the same level as `data()`, `components`, `methods`, and `props`:

```vue
<script>
export default {
  data() {
    pokemon: [],
  },
  created() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(response => response.json())
      .then(response => {
        this.pokemon = response.results
      })
  },
}
</script>
```

Inside of lifecycle hooks, you can access state, computed properties, methods, and props.

## The Other Lifecycle Hooks

* When a component is `mounted`, the DOM is available
* `updated` and `beforeUpdate` can be used to slow down how often a component is rerendering, even if the data is reacting much faster
* `unmounted` is used to clean up things like timers or things that might leak memory over time

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: Lifecycle Diagram](https://v3.vuejs.org/guide/instance.html#lifecycle-diagram) | Official Vue docs on Lifecycle Hooks |
# Vue Performance: Show vs. Render

When you do conditional logic with `v-if`/`v-else` or make dynamic lists with computed properties, DOM elements are added and removed as different conditions are met:

```vue
<ul class="video-list">
  <li
    v-for="video in displayedVideos"
    :key="video.id"
  >
    <VideoListing :video="video" />
  </li>
</ul>
```


Adding and removing stuff in the DOM is relatively expensive though, and this is especially true with large lists. One way to improve performance is to use `v-show`:

```vue
<ul class="video-list">
  <li
    v-for="video in allVideos"
    :key="video.id"
    v-show="displayedIds.includes(video.id)"
  >
    <VideoListing :video="video" />
  </li>
</ul>
```

This keeps all of the elements in the DOM, but toggles their visibility with CSS (`display: none;`). This results in a massive improvement in how quickly the list can render. Note that initial render times are slower with v-show, so conditional logic may still be better if the list isn't likely to change much after render.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: `v-show`](https://v3.vuejs.org/guide/conditional.html#v-show) | Official Vue docs on v-show |
* Build 3 components that take static and dynamic props
* What's the difference between `:someProp="someState"` and `someProp="someState"` in Vue?
* What's the difference between `:someProp="someState"` and `v-bind:someProp="someState"` in Vue?
* What types can you pass into a prop in Vue?
# Vue: Props

Props are variables on a parent component that you want to make available on a child component. You can pass in simple values (like strings and booleans), complex values (like objects), and even functions.

```vue
// ParentComponent.vue
<template>
  <ChildComponent
    :someProp="someState"                 <!-- Name on the left is what the prop will be called in the child -->
    :someOtherProp="someComputedProperty" <!-- Name on the right is what it's called in the parent -->
    :yetAnotherProp="someMethod"
  />
</template>

<script>
import ChildComponent from "@/components/ChildComponent"

export default {
  name: "ParentComponent",
  components: {
    ChildComponent,
  },
  data() {
    return { someState: "Hi!" }
  },
  computed: {
    someComputedProperty() {
      return "Yo!"
    },
  },
  methods: {
    someMethod() {
      return "Oi!"
    },
  },
}
</script>
```

```vue
// ChildComponent.vue
<template>
  <p>{{ someProp }}</p>
  <p>{{ someOtherProp }}</p>
  <p>{{ resultOfYetAnotherProp }}</p>
</template>

<script>
export default {
  name: "ChildComponent",
  props: {
    someProp: String,
    someOtherProp: String,
    yetAnotherProp: Function,
  },
  computed: {
    resultOfYetAnotherProp() {
      return this.yetAnotherProp()
    },
  },
}
</script>
```

There are two legal syntaxes for passing dynamic props into a component:

```vue
<SomeComponent v-bind:someProp="someState" />
<SomeComponent :someProp="someState" />
```

There is no difference between them, and you should always use the shorter syntax.

The `:` syntax is always looking on the component for state, props, computed properties, methods, or arbitrary JS expressions. If you leave it off, you can pass in simple static values:

```vue
<SomeComponent :someProp="someState" />     <!-- Looks for this.someState on the component -->
<SomeComponent :someProp="{ someState }" /> <!-- Passes in the object { someState: this.someState } -->
<SomeComponent someProp="someState" />      <!-- Passes in the string "someState" -->
```

## Common Patterns

### Aliasing Long Property Lookups

You can use a computed property to make an abstraction for a deeply nested property, which can destructure out properties from props and make the rest of the code easier to read.

```vue
<script>
export default {
  props: {
    someObject: Object,
  },
  computed: {
    someProperty() {
      return this.someObject.someDeep.nested.property
    },
  },
}
</script>
```

### Prop Drilling

Props can be props! You can keep passing components down your hierarchy, which is called "prop drilling":

```vue
// OuterComponent.vue
<template>
  <MiddleComponent someProp="Hi!" />
</template>

// MiddleComponent.vue
<template>
  <InnerComponent :someProp="someProp" />
</template>

// InnerComponent.vue
<template>
  <p>{{ someProp }}</p> <!-- "Hi! -->
</template>
```

## Watch Out!

Some common mistakes with props:

### Saving Props in State

There's no need to save props into state:

```vue
<script>
export default {
  props: {
    someProp: String,
  }
  data() {
    return {
      someState: this.someProp // Don't do this!
    }
  },
}
</script>
```

### Mutating Props

Use your props, but never modify them. Change them at their source by bubbling up events. You can also make derivative properties with computed properties.

```vue
<script>
export default {
  props: {
    someProp: String,
  },
  methods: {
    mutateSomeProp() {
      this.someProp = "Some other string" // Don't do this!
      this.$emit("updateSomeProp", "Some other string") // Do this instead
    },
  },
}
</script>
```

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: Passing Static or Dynamic Props](https://v3.vuejs.org/guide/component-props.html#passing-static-or-dynamic-props) | Official Vue docs on Props |
# Vue: Slots

Slots are a way to wrap components around elements or other components:

```vue
<template>
  <ListWrapper>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
  </ListWrapper>
</template>
```

They're mainly useful for applying a base style to a variety of more specific components and/or keeping an outer scope available to an inner scope.

## Base Styles

```vue
// BaseButton.vue
<template>
  <span class="base-button">
    <slot></slot>
  </span>
</template>

<style>
.base-button > button {
  background-color: hsl(240, 50%, 50%);
  color: hsl(0, 0%, 100%);
  padding: 12px 24px;
}
</style>

// SuccessButton.vue
<template>
  <BaseButton class="success-button">
    <button :someProp="dataInScopeForSuccessButton" @click="methodInScopeForSuccessButton">Add</button>
  </BaseButton>
</template>

<style>
.success-button {
  background-color: hsl(120, 50%, 50%);
}
</style>
```

The `<slot></slot>` will be replaced by whatever you pass into it.
# Vue: State

State in Vue components is held in a property called `data`:

```vue
<template>
  <div v-unless="error">
    <p :class="{ active: isActive}">{{ count }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      error: null,
      isActive: true
    }
  },
  methods: {
    logState() {
      console.log("The values in state are:", this.count, this.error, this.isActive)
    }
  }
}
</script>
```

Note that `data` is set to a *function* that returns an *object*. This is different than `computed` and `methods`, which are set to objects. This is really easy to forget!

Some notes on state:

* If something never changes, it's not state. Return static values from computed properties instead.
* State in one component may be passed into another component as props
* State values are accessed with `this` in scripts, but don't require the `this` prefix in templates
* Vue doesn't require anything special to set state like in React. You can assign new values directly, but you should only do it within the same component the state is kept in.

## Watch Out!

Property names in state share the same namespace as computed properties and methods. This will error out:

```vue
<script>
export default {
  data() {
    return {
      message: "",
    }
  },
  computed: {
    message() {},
  },
  methods: {
    message() {},
  }
}
</script>
```
* What's the relationship between HTML and Vue templates?
* What are two ways you can use templates in Vue?
* What specific considerations do you need to make for using Vue in a server-templated environment?
* Where will Vue look for `{{someProp}}` in a template?
# Vue Templates

Templates are how HTML is represented in Vue. They work similar to templating mechanisms in other languages and frameworks. Some high-level ideas:

* All regular HTML is valid (unlike JSX which requires special words for things like `class` or Pug which is an entirely new syntax)
* It relies on a directive syntax which adds attributes to elements (similar to Angular, different than Handlebars)
* Any HTML attribute can be bound to anything on the component or most arbitrary JS expressions (like JSX, unlike HTMLBars)
* Event listeners can and should be attached in the template syntax since you shouldn't work directly with the DOM
* Values can be used in templates with `{{}}` (like Handlebars, unlike React)

This template:

```vue
<template>
  <div class="some-component">
    <h2>{{ heading }}</h2>
    <ul v-if="listShowing">
      <li v-for="listItem in listItems" :key="listItem.id">{{ listItem.content }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    heading() {
      return "These are a few of my favorite things"
    },
    listShowing() {
      return true
    },
    listItems() {
      return [{
        id: 1,
        content: "Raindrops on roses",
      }, {
        id: 2,
        content: "Whiskers on kittens",
      }]
    },
  },
}
</script>
```

Will render as this HTML:

```html
<div class="some-component">
  <h2>These are a few of my favorite things</h2>
  <ul>
    <li>Raindrops on roses</li>
    <li>Whiskers on kittens</li>
  </ul>
</div>
```

Templates in Vue 1.x and 2.x were required to have a single top-level element. This is still a sound practice, but it's no longer required in Vue 3.x.

## Syntax

There are two syntaxes for using templates:

### Single-File Components

Templates in SFCs are contained between `<template>` tags:

```vue
<template>
  <p>Hi!</p>
</template>

<script>
</script>

<style>
</style>
```

Use these with webpack or Vue CLI.

### Inline Components

Inline components use a `template` attribute:

```vue
const SomeComponent = {
  computed: {},
  methods: {},
  template: "<p>Hi!</p>",
}
```

Use this syntax when you're making components without a build system. Other than challenges around escaping quotes, it has the same features as the SFC syntax.

## Additional Resources

| Resource | Description |
| --- | --- |
| [Vue: Template Syntax](https://v3.vuejs.org/guide/template-syntax.html#template-syntax) | Official Vue docs on template syntax |
# Vue: Validations

Vue doesn't have any built-in validation tools, but here's some helpful patterns:

## HTML5 Validations

The [existing HTML5 validations](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) will take you a long way:

```vue
<template>
  <form>
    <input type="text" min="5" max="20" required />
    <input type="email" min="5" max="20" />
    <input type="color" />
    <input type="text" pattern="/^pre(\w)+?!$" />
  </form>
</template>
```

Inputs that pass validation will have a `:valid` CSS pseudoclass, and inputs that don't pass validation will have an `:invalid` CSS pseudoclass. Forms can't be submitted while HTML5 validations are failing.

## Putting Errors in an Array

```vue
<template>
  <form @submit.prevent="submitEmail">
    <ul v-if="errors.length > 0">
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
    <input type="email" v-model="email" />
    <input type="submit" value="Submit" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      email: "",
    }
  },
  methods: {
    submitEmail() {
      this.errors = []

      if (!this.email.match(/mycompany.com$/)){
        errors.push("Email address must be from mycompany.com")
      }

      if (this.errors.length === 0){
        // Submit form
      }
    },
  },
}
</script>
```

## Real-time Validations

You can also do validations in real-time:

```vue
<template>
  <form @submit.prevent="submitEmail">
    <input :class="{ isValid }" type="txt" v-model="tweet" />
    <input type="submit" value="Submit" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      tweet: "",
    }
  },
  methods: {
    submitEmail() {
      if (this.isValid){
        // Submit form
      }
    },
  },
  computed: {
    isValid() {
      return tweet.length < 255
    },
  },
}
</script>
```
You enter `google.com` into your browser's URL bar. Draw a diagram of what happens next.
* What is a domain?
* What is a browser?
* What is HTTP?
* What is HTML?
* What is CSS?
* What is JavaScript?
# Introduction to the Web

In common language, we use the terms "internet" and "web" interchangeably, but they're actually different things. The internet is a network of networks; the web is a set of technologies that runs on top of it.

## Web Technologies

These are some common technologies that make up the web:

### Domains

Look at these IP address:

```
172.217.1.206
31.13.93.35
104.244.42.129
```

Could you remember them? Maybe you'll recognize them better by their nicknames:

```
172.217.1.206 => google.com
31.13.93.35 => facebook.com
104.244.42.129 => twitter.com
```

A domain is an easier-to-remember shortcut to a IP address. When you use a domain to look up a network, your computer looks up the matching IP address for that domain.

### Browsers

A browser is a program that can request and display files from the internet. It provides a non-technical way to generate HTTP requests, render HTML and CSS files to the screen, display multimedia content, and run programs written in JavaScript. Additionally, browsers often provide tools for making it easier to use the web such as bookmarking URLs and keeping track of sites you've been to.

### HTTP

Networked computers can share all kinds of things with each other. One way they can do that is with HTTP, which is a format for sending and receiving messages over the internet.

### HTML, CSS, and JavaScript

HTML and CSS are instructions on how to display content that your browser understands. JavaScript is a programming language your browser understands that makes that content interactive. This are usually stored in files that your browser can request with HTTP.

## Putting it all together

When you type a URL into a browser and hit enter:

![Diagramming web requests](assets/web-diagram.png)

1. The browser looks up the IP address for that URL
2. It sends an HTTP request to that IP address asking for an HTML file, and then starts rendering it to the screen
3. If the HTML file contains instructions to include CSS, JavaScript, images, or other files, it does so following the same process until the entire HTML file has been processed

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: How the Web Works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works) | MDN's article on how the internet works |
| [Video: How the Web Works](https://www.youtube.com/watch?v=hJHvdBlSxug) | Academind's guide to the web |
| [Simmer: Web Browsers](https://www.teamsimmer.com/2021/09/07/web-browsers-with-simo-ahava/) | Podcast on what happens when you enter a URL in a browser |
Web
Internet
Network
Domain
IP Address
Browser
HTTP
HTML
CSS
JavaScript
Render
You have a component that renders a countdown timer. Its public interface looks like this:

```js
<Countdown target={new Date("2025-01-01")} message="Register before the deadline!" textColor="#fa00cc" />
```

Write the test cases for it.

---

You have a component that displays a filtered list of results. Its public interface looks like this:

```js
<ProductList products=[{ id: 1, name: "Pikachu"}] searchTerm="Some Search Term" isDescending={true} />
```

Write the test cases for it.

---

You have a search form component component. It's public interface looks like this:

```js
<SearchForm placeholderText="Search for a flight" searchHandler={(searchTerm) => {}} />
```

Write the test cases for it.
* What should be tested in a React component?
* What shouldn't be tested in a React component?
* What is the public API of a component?
* Why shouldn't you try to test the internal state of a component?
* Why shouldn't you test static text?
* What should cause your tests to fail?
* What kinds of styles should be tested?
# What To Test: React Components

One of the most difficult things in testing is deciding what to test and what not to test. When testing React components, consider the following questions:

* **What does the component do with its props?** Statically display them? Invoke them? Use them to conditionally render things?
* **What state does the component have, and under what circumstances does it change?** These usually point toward test cases.
* **What other components does this component render, and what are their props?** What state do they have and how does it change?
* **What kinds of interactions can users have with the component?** Are there things that can be clicked on, typed in, or changed?
* **What happens when child components invoke functions?** Do the functions change state or otherwise alter what's rendered?

The answers to these questions will guide you toward the things you need to test. Some general guidelines:

## What To Test

Test the public API of the component.

### Props

* You may want separate cases for any equivalence partitions and boundaries for those props
* If a prop is optional, test what happens with and without it
* Test different combinations of props, including their partitions and boundaries
* If the component has child components, make sure they render
* Are there styles bound to props?

### State

* Don't try to test the state directly, always read and modify the state the way a user would
* Look for conditional logic
* Look for all the ways the state can be changed, including user actions and higher-order functions
* If a component has multiple pieces of state, test combinations
* Are there styles bound to state?

### User Actions

* What should happen when things are clicked, typed in, dragged, or otherwise used? How would that be observed by a user?
* Look for network calls, higher-order functions being called, or context changing

## What Not To Test

Don't test things that aren't in the public API or aren't owned by the component you're testing.

### Implementation Details

* Static content
* Internal functions, variable names, or signatures that aren't part of the component's API
* The APIs of child components that are never used independently of the parent
* The APIs of functions that are only used in this component
* Anything that isn't visible to or interactable by a user
* Internal styles that aren't bound to anything

## External Code

* Any external styles
* Third-party libraries, including React
* External web services
* File systems
* Utilities that aren't owned by the component

## Watch Out!

* If your tests break a lot as you're doing normal development, your tests are probably too coupled to the implementation. You should be able to refactor your code freely without any of your tests failing as long as the component's API and behavior stays the same.
* Conversely, if you change the API of a component or its behavior, your tests _should_ fail. If they don't, your tests aren't giving you enough confidence that your code still works.
* React: Props
* React: State
* React: Callback
* Public API
* Conditional Logic
* Network Call
* React Context
* Higher-Order Function
* Static Content
* API
