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
