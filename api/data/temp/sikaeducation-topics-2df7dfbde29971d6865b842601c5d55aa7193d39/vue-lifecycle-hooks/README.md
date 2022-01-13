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
