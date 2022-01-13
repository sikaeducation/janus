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
