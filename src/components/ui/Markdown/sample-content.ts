export const inline = `# Inline Text

Whereupon we find **bold text**, as well as _italic text_, and even \`some monospace text\`.

---

↑ These are horizontal rules ↓

---

These are some [Internal Links](some-slug) and some [External Links](https://sikaeducation.com).

`;

export const headers = `# Primary Header \`withCode()\`

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Secondary Header \`withCode()\`

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Tertiary Header \`withCode()\`

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

#### Quaternary Header \`withCode()\`

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

export const lists = `# Lists

Unordered?

* This
* Is an
* Unordered list
    * With nested values
        * And even deeply nested values

But also:

1. This
2. Is an
    1. With ordered items
    2. Under it
        1. And another ordered list!
3. Ordered list

And even:

1. This
2. Is an
    * With unordered items
    * Under it
        1. And another ordered list!
3. Ordered list
`;

export const images = `# Images

## Large

![large](https://via.placeholder.com/1000)

## Medium

Add \`#medium\` to the end of the image URL

![medium](https://via.placeholder.com/500#medium)

## Small

Add \`#small\` to the end of the image URL

![small](https://via.placeholder.com/150#small)
`;

export const formatted = `# Formatted Text

Untyped:

\`\`\`
type HelloWorld = string;

function thisIsACodeBlock(message: HelloWorld) {
  console.log(message);
}
\`\`\`

TypeScript:

\`\`\`ts
type HelloWorld = string;

function thisIsACodeBlock(message: HelloWorld) {
  console.log(message);
}
\`\`\`

JavaScript:

\`\`\`ts
function thisIsACodeBlock(message) {
  console.log(message);
}
\`\`\`

Shell:

\`\`\`bash
#!/bin/bash

if [[$1]]
then
  echo "$SOME_VALUE"
fi
\`\`\`

> This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote.
`;

export const tables = `# Tables

| Tables | Look | Like | This |
| --- | --- | --- | --- |
| Thing 1 | Thing 2 | | Thing 3 |
| Thing 4 | Thing 5 | Thing 6 | |
| | Thing 7 | Thing 8 | |
`;
