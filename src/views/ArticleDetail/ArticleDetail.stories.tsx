import { ComponentStory, ComponentMeta } from "@storybook/react";

import ArticleDetail from ".";
// eslint-disable-next-line max-len, no-useless-escape
const cssSyntaxSample = `# CSS: Syntax\n\nUnstyled pages look like undifferentiated research white papers. It's difficult to find what you're looking for, and it's difficult to tell one site from another.\n\n![Unstyled homedepot.com home page](https://ik.imagekit.io/sikaeducation/css-syntax/home-depot_ZrPpQ2KHQlB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1645606420843)\n\nIf you use them correctly, stylesheets help people read and understand your content, navigate and use your apps, and relate them to the company's brand and experience.\n\n![Styled homedepot.com home page](https://ik.imagekit.io/sikaeducation/css-syntax/home-depot-2_LlvVjIzDsxEM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1645606420914)\n\n## Adding CSS to HTML\n\nThere are 3 ways to apply CSS to a page:\n\n### Linked\n\nLinked stylesheets are references to CSS files that go in the \`<head>\` of documents.\n\n\`\`\`html\n<html lang=\"en\">\n  <head>\n    <title>Web Page</title>\n    <meta charset=\"utf-8\">\n    <link rel=\"stylesheet\" href=\"index.css\">\n  </head>\n  <body>\n    <div></div>\n  </body>\n</html>\n\`\`\`\n\nThe \`href\` attribute accepts any valid file path. Note that absolute paths that start with \`/\` will go to folder the site was served from, not the root of the computer.\n\n### Inline\n\nInline styles are applied directly to an element:\n\n\`\`\`html\n<div style=\"display: flex; justify-content: center;\"></div>\n\`\`\`\n\nThese styles can't be overriden by custom style sheets and should be avoided.\n\n### Embedded\n\nAn embedded stylesheet is added to the \`<head>\` of an HTML file directly:\n\n\`\`\`html\n<html lang=\"en\">\n  <head>\n    <title>Web Page</title>\n    <meta charset=\"utf-8\">\n    <style>\n      div {\n        display: flex;\n      }\n    </style>\n  </head>\n  <body>\n    <div></div>\n  </body>\n</html>\n\`\`\`\n\nThese styles clutter up HTML documents and should be avoided as well.\n\n## CSS Syntax\n\nCSS is made up of selectors, which target elements to apply styles, and rules, which are styles to apply to those elements. There are many kinds of selectors:\n\n\`\`\`css\nform {\n}\n.profile > h2 {\n}\n#logo img::before {\n}\n\`\`\`\n\nEach one targets one or more elements, and then opens up a block to declare the style rules that should be applied. Within that block:\n\n\`\`\`css\nform {\n  display: flex;\n  flex-flow: column nowrap;\n  padding: 24px;\n}\n\`\`\`\n\nStyle declarations can be added. Each one has property and a value, separated by \`:\` and ending with \`;\`. Not all declarations apply to all elements.\n\n## Watch Out!\n\n* Browsers apply something called a user-agent stylesheet to every web page, which is why headings are large and bold and links are blue and underlined even if you don't add your own stylesheet. Any styles you write will override these browser defaults.\n* Semicolons are required at the end of style declarations in CSS.\n* CSS rules are applied top to bottom. If two styles conflict, the style that happens later in the stylesheet will generally be applied. The exception to this is called specificity. In short, IDs always override classes, classes always override tags, and styles with more classes and tags in their selector will override styles with fewer classes and tags in their selector.\n* Don't forget to add \`rel=\"stylesheet\"\` to \`<link>\` tags.\n\n## Additional Resources\n\n| Resource | Description |\n| --- | --- |\n| [MDN CSS Syntax reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax) | MDN official reference for CSS syntax |\n| [Video: Anatomy of CSS Syntax](https://www.youtube.com/watch?v=XHkIU8Wom2Q) | London App Brewery's guide to CSS syntax |\n| [Video: Learn CSS in 20 Minutes](https://www.youtube.com/watch?v=1PnVor36_40) | Web Dev Simplified's guide to CSS |\n| [CSS Tricks: Almanac](https://css-tricks.com/almanac/) | Comprehensive guide to CSS vocabulary |\n`;

export default {
  title: "ArticleDetail",
  component: ArticleDetail,
} as ComponentMeta<typeof ArticleDetail>;

const Template: ComponentStory<typeof ArticleDetail> = (args) => (
  <ArticleDetail {...args} />
);

export const Default = Template.bind({});
Default.args = {
  activity: {
    _type: "Article",
    title: "CSS Syntax",
    post_slug: "css_syntax",
    description: "Curly braces, tag/class/id selectors, file locations",
    notes: "Solid",
    content: cssSyntaxSample,
    published: true,
  },
};
