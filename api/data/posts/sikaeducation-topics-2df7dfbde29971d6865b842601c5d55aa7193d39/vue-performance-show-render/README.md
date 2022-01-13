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
