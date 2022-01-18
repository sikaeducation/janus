export default function getProgram() {
  return {
    id: 1,
    label: "Ford: Full-Stack Web Development",
    root: {
      id: -1,
      type: "root",
      label: {
        full: "Root",
        short: "Root",
        tiny: "1",
      },
      slug: "some-root",
      path: "/",
      content:
        '# Example Root Post\n\n## Heading 2\n\n### Heading 3\n\n#### Heading 4\n\n##### Heading 5\n\n###### Heading 6\n\nInline text semantics include **bold**, _italic_, ~~strikethrough~~, and `monospace`.\n\nIf you had a second paragraph, it would look like this. If you had a second paragraph, it would look like this. If you had a second paragraph, it would look like this. If you had a second paragraph, it would look like this. If you had a second paragraph, it would look like this. If you had a second paragraph, it would look like this.\n\nLinks look like [this](/).\n\n>Blockquotes look like this. They can span multiple lines. Blockquotes look like this. They can span multiple lines. Blockquotes look like this. They can span multiple lines. Blockquotes look like this. They can span multiple lines. Blockquotes look like this. They can span multiple lines.\n\n* Unordered list 1\n  * Nested unordered list 1\n* Unordered list 2\n  * Nested unordered list 2\n  * Nested unordered list 2\n    * Nested unordered list 2\n* Unordered list 3\n\n1. Ordered list 1\n2. Ordered list 2\n   * Nested unordered list\n3. Ordered list 3\n   1. Nested ordered list 2\n   2. Nested ordered list 2\n\nHorizontal rule:\n\n---\n\n* [ ] - Checkbox 1\n* [ ] - Checkbox 2\n* [ ] - Checkbox 3\n\n| Heading 1 | Heading 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |\n| Cell 2 | Cell 4 |\n\n```ts\nconst someVariable: someType = "Goes here";\n\nfunction someFunction(someParameter: someType){\n    const result = something();\n    return result;\n}\n```\n\nSmall:\n\n![Alt Text](https://picsum.photos/200/200#small)\n\nMedium:\n\n![Alt Text](https://picsum.photos/400/400#medium)\n\nLarge:\n\n![Alt Text](https://picsum.photos/800/800)\n',
      children: [1, 2],
    },
    posts: [
      {
        id: 1,
        type: "unit",
        label: {
          full: "Unit 1",
          short: "Unit 1",
          tiny: "1",
        },
        path: "/unit-1",
        slug: "unit-1",
        content: "# Unit 1",
        children: [3, 4, 5],
      },
      {
        id: 2,
        type: "Unit",
        label: {
          full: "Unit 2",
          short: "Unit 2",
          tiny: "2",
        },
        path: "/unit-2",
        slug: "unit-2",
        content: "# Unit 2",
        children: [],
      },
      {
        id: 3,
        type: "topic",
        label: {
          full: "Topic 1",
          short: "Topic 1",
          tiny: "",
        },
        path: "/unit-1/topic-1",
        slug: "topic-1",
        content: "# Topic 1",
        children: [],
      },
      {
        id: 4,
        type: "section",
        label: {
          full: "Some Long Section Name",
          short: "Section Name",
          tiny: "",
        },
        path: "/unit-1/section-1",
        slug: "section-1",
        content:
          "# Section 1\n\nLinks: \n\n* [Exercise 1](unit-1/section-1/exercise-1)\n* [Exercise 2](unit-1/section-1/exercise-2)",
        children: [6, 7],
      },
      {
        id: 5,
        type: "topic",
        label: {
          full: "Another Long Topic Name",
          short: "Long Topic Name",
          tiny: "",
        },
        path: "/unit-1/topic-2",
        slug: "topic-2",
        content: "# Topic 2",
        children: [],
      },
      {
        id: 6,
        type: "exercise",
        label: {
          full: "Some Exercise 1",
          short: "Some Exercise",
          tiny: "",
        },
        path: "/unit-1/section-1/exercise-1",
        slug: "exercise-1",
        content: "# Exericse 1",
        children: [],
      },
      {
        id: 7,
        type: "exercise",
        label: {
          full: "Some Exercise 2",
          short: "Some Other Exercise",
          tiny: "",
        },
        path: "/unit-1/section-1/exercise-2",
        slug: "exercise-2",
        content: "# Exercise 2",
        children: [],
      },
    ],
  };
}
