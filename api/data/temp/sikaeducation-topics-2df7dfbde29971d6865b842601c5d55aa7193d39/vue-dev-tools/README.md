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
