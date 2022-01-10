type programData = {
  program: {
    id: number;
    label: string;
    posts: post[];
  };
};
const data: programData = {
  program: {
    id: 1,
    label: "Ford: Full-Stack Web Development",
    posts: [
      {
        id: 1,
        type: "unit",
        label: {
          full: "Websites",
          short: "Websites",
          tiny: "1",
        },
        slug: "websites",
        path: "websites",
        content:
          "# Websites \n\n Check these [links](websites/websites-1) to sections",
        children: [2, 6],
      },
      {
        id: 2,
        type: "section",
        label: {
          full: "Websites 1",
          short: "Websites 1",
          tiny: "",
        },
        slug: "websites-1",
        path: "websites/websites-1",
        content:
          "# Websites 1\n\n Check this out: [content](websites/websites-1/html-div-span)",
        children: [3, 4, 5],
      },
      {
        id: 3,
        type: "topic",
        label: {
          full: "HTML: <div> and <span>",
          short: "<div> & <span>",
          tiny: "",
        },
        slug: "html-div-span",
        path: "websites/websites-1/html-div-span",
        content:
          "# HTML: `<div>` and `<span>`\r\n\r\nHTML is for structuring content. What does that mean? When content is unstructured, it doesn't follow any particular format. For example, an unstructured menu at a restaurant might look like this:\r\n\r\n>We serve cheese pizza ($9.99), you can add pepperoni for 2 bucks, and we serve salads starting at $5.\r\n\r\nThe same content might look like this with structure:\r\n\r\n```html\r\n<div>\r\n  <div>\r\n    <span>Cheese Pizza</span> - <span>$9.99</span>\r\n  </div>\r\n  <div>\r\n    <span>Pepperoni Pizza</span> - <span>$11.99</span>\r\n  </div>\r\n  <div>\r\n    <span>Salad</span> - <span>$5.00+</span>\r\n  </div>\r\n</div>\r\n```\r\n\r\nWhen content is structured you can target specific parts of it, which helps with styling and programming it.\r\n\r\n## Block and Inline Content\r\n\r\nThe simplest and most generic way that content can be structured is categorizing it as either \"block\" or \"inline.\"\r\n\r\n### Block content\r\n\r\nContent that would ordinarily take up an entire row when presented. Examples include headings and paragraphs.\r\n\r\n```html\r\n<div>A heading</div>\r\n<div>An entire paragraph of content could go here</div>\r\n```\r\n\r\n### Inline content\r\n\r\nContent that would ordinarily not break the flow of content when presented. Examples include emphasized text in a passage and links.\r\n\r\n```html\r\n<div>An <span>emphasized</span> heading</div>\r\n<div>An entire paragraph of <span>linked content</span> could go here</div>\r\n```\r\n\r\nInline content usually occurs inside of block content.\r\n\r\n### `<div>` and `<span>`\r\n\r\nGeneric block content is represented in HTML by putting it in between `<div>` tags. `<span>` is used the same way for inline content.\r\n\r\nHTML features over 100 tags that are reserved for specific purposes (including headings, paragraphs, emphasis, and links). When none of the existing tags are appropriate for your structure, `<div>` and `<span>` can be used as custom tags.\r\n\r\n## Watch Out!\r\n\r\nIt's tempting to use `<div>` and `<span>` for everything in an HTML document, and many developers do exactly this. This is a bad practice for web development. As you learn more semantic tags, you should use those first and only use `<div>` and `<span>` when there aren't existing tags that are more appropriate.\r\n\r\n## Additional Resources\r\n\r\n| Resource | Description |\r\n| --- | --- |\r\n| [MDN: `<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) | MDN's reference on `<div>` |\r\n| [MDN: `<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) | MDN's reference on `<span>` |\r\n",
        children: [],
      },
      {
        id: 4,
        type: "exercise",
        label: {
          full: "HTML: <div> and <span>: Exercise",
          short: "<div> & <span> Exercises",
          tiny: "",
        },
        slug: "html-div-span-exercises",
        path: "websites/websites-1/html-div-span-exercises",
        content: "# HTML: <div> and <span> Exercises\nGo here",
        children: [],
      },
      {
        id: 5,
        type: "topic",
        label: {
          full: "CSS: Block Layout",
          short: "Block Layout",
          tiny: "",
        },
        slug: "css-block-layout",
        path: "websites/websites-1/css-block-layout",
        content: "# CSS: Block Layout`\r\n\r\nThis is the content",
        children: [],
      },
      {
        id: 6,
        type: "section",
        label: {
          full: "Misc.",
          short: "Misc",
          tiny: "",
        },
        slug: "misc",
        path: "websites/misc",
        content: "",
        children: [7],
      },
      {
        id: 7,
        type: "topic",
        label: {
          full: "CS: Binary",
          short: "Binary",
          tiny: "",
        },
        slug: "binary",
        path: "websites/misc/binary",
        content: "# Binary\n\nThis is how binary works.",
        children: [],
      },
      {
        id: 8,
        type: "unit",
        label: {
          full: "Web Apps",
          short: "Web Apps",
          tiny: "2",
        },
        slug: "web-apps",
        path: "web-apps",
        content: "# Web apps\n\nand that's all, folks.",
        children: [],
      },
    ],
  },
};

export default data;
