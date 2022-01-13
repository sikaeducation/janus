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
