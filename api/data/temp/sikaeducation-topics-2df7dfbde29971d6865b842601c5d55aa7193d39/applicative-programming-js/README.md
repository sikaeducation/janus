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
