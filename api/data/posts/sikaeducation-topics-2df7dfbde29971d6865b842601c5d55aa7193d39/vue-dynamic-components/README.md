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
