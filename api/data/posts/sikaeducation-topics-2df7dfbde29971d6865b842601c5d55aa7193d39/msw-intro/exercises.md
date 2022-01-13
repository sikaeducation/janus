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
