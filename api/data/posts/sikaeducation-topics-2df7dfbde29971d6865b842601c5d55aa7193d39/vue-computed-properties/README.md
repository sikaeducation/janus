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
