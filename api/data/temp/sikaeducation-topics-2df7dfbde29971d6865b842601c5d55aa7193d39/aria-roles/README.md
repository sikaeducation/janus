# ARIA Roles

Accessible Rich Internet Applications, or ARIA, is a technique for improving accessibility in HTML. When someone using an assistive technology accesses a page in an app, knowing the role an element serves in the application is critical for correct navigation and use of the app. The easiest way to ensure that a page is accessible is to use the correct semantic elements; these are always assigned appropriate ARIA roles. In situations where that's not possible, the roles can be assigned directly using the `role` attribute.

```html
<div class="some-totally-custom-form-input" role="textbox"><div>
```

ARIA roles are also popular in DOM testing frameworks, because they map directly to how users perceive elements.

## Elements and their Natural ARIA Roles

### Structural Elements

| ARIA Role | Elements that have this role | Notes |
| --- | --- | --- |
| `header` | `<header>` | Landmark role, only applies if it's not a child of a sectioning element like `<article>` or `<main>` or one of the ARIA roles corresponding to them |
| `main` | `<main>` | Landmark role, only applies if it's not a child of a sectioning element like `<article>` or `<main>` or one of the ARIA roles corresponding to them |
| `footer` | `<footer>` | Landmark role, only applies if it's not a child of a sectioning element like `<article>` or `<main>` or one of the ARIA roles corresponding to them |
| `article` | `<article>` | Standalone content |
| `region` | `<section aria-label="some name here">` | Landmark role |
| `heading` | `<h1>`-`<h6>` | Heading to a page or section |
| `complementary` | `<aside />` | Landmark role |
| `navigation` | `<nav>` | Landmark role |
| `table` | `<table>` | |

Landmark roles can be directly navigated to with assistive technologies. Use these sparingly to prevent too much noise.

### Other Elements

| ARIA Role | Elements that have this role | Notes |
| --- | --- | --- |
| `button` | `<button>`, `<input type="button" />`, `<input type="submit" />`, `<input type="reset" />`, `<input type="image" />` | Clickable elements that trigger a response |
| `link` | `<a>` | Hyperlink to a resource |
| `img` | `<img />` | Should be treated as an image |
| `list` | `<ol>`, `<ul>` | |
| `listitem` | `<li>` | |

### Forms

| ARIA Role | Elements that have this role | Notes |
| --- | --- | --- |
| `form` | `<form>` | Landmark role |
| `textbox` | `<input type="text">`, `<textarea>` | Text input |
| `checkbox` | `<input type="checkbox">` | Checkable interactive control |
| `spinbutton` | `<input type="number" />` | |
| `radio` | `<input type="radio" />` | |
| `slider` | `<input type="range" />` | |
| `combobox` | `<select>` | |
| `option` | `<option>` | |
| `button` | `<button>`, `<input type="button" />`, `<input type="submit" />`, `<input type="reset" />`, `<input type="image" />` | Clickable elements that trigger a response |

Note that if the form is a search form, `role="search"` should be added to the `<form>` element.

## Watch Out!

Setting an ARIA role doesn't add any new functionality to an element, it only changes how elements are presented to the browser's accessibility API.

## Additional Resources

| Resource | Description |
| --- | --- |
| [MDN: Using ARIA: Roles, States, and Properties](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques) | MDN's documentation on ARIA |
| [W3C: ARIA in HTML](https://www.w3.org/TR/html-aria/) | Official reference for how HTML elements align to ARIA roles. |
