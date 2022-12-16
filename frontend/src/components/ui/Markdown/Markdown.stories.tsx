import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withReactContext } from "storybook-react-context";
import { withRouter } from "storybook-addon-react-router-v6";
import { programContext } from "../../../contexts/program";

import Markdown from ".";
import { performanceContext } from "../../../contexts/performance";

export default {
  title: "UI/Markdown",
  component: Markdown,
  decorators: [
    withReactContext({
      Context: programContext,
      initialState: {
        postsBySlug: { "some-slug": { content: "Some post" } },
      },
    }),
    withReactContext({
      Context: performanceContext,
      initialState: {
        lastQuestionPerformancesBySlugByLearnerByQuestion: {},
        lastPerformanceBySlugByLearner: {},
      },
    }),
    withRouter,
  ],
} as ComponentMeta<typeof Markdown>;

const Template: ComponentStory<typeof Markdown> = (args) => (
  <Markdown {...args} />
);

const typography = `# Primary Header

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Secondary Header

Whereupon we find **bold text**, as well as _italic text_, and even \`some monospace text\`.

![large](https://via.placeholder.com/1000)

![medium](https://via.placeholder.com/500#medium)

![small](https://via.placeholder.com/150#small)

### Tertiary Header

These are some [Internal Links](some-slug) and some [External Links](https://sikaeducation.com).


| Tables | Look | Like | This |
| --- | --- | --- | --- |
| Thing 1 | Thing 2 | | Thing 3 |
| Thing 4 | Thing 5 | Thing 6 | |
| | Thing 7 | Thing 8 | |

---

This is a horizontal rule ^^

### Quaternary Header

\`\`\`ts
type HelloWorld = string;

function thisIsACodeBlock(message: HelloWorld) {
  console.log(message);
}
\`\`\`

> This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote. This is a block quote.
`;

const headers = `# Primary Header

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Secondary Header

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Tertiary Header

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Quaternary Header

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

const lists = `# Lists

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

export const OnlyContent = Template.bind({});
OnlyContent.args = {
  content: typography,
  className: "some-class",
};
OnlyContent.storyName = "Basic Configuration";

export const Headers = Template.bind({});
Headers.args = {
  content: headers,
  className: "some-class",
};

export const Lists = Template.bind({});
Lists.args = {
  content: lists,
  className: "some-class",
};
